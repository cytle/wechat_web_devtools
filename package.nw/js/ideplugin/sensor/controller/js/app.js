var APP = {

	Player: function() {

		var scope = this;

		var loader = new THREE.ObjectLoader();
		var camera, scene, renderer;

		var controls;

		var events = {};

		this.dom = undefined;

		this.width = 500;
		this.height = 500;

		var prevTime, request;

		var euler = new THREE.Euler();
		var deviceOrientation = new FULLTILT.Euler();

		var worldQuat = new THREE.Quaternion( -Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) );

		var camQuat = new THREE.Quaternion();

		var rotation = new THREE.Euler( 0, 0, 0, 'YXZ' );
		var rotQuat = new THREE.Quaternion();

		var tweenInProgress = false;

		this.load = function( json ) {

			renderer = new THREE.WebGLRenderer( {
				antialias: true
			} );
			renderer.setClearColor( 0xFFFFFF, 1 );
			renderer.setPixelRatio( window.devicePixelRatio );
			this.dom = renderer.domElement;

			this.setScene( loader.parse( json.scene ) );
			this.setCamera( loader.parse( json.camera ) );

			events = {
				update: []
			};

			for ( var uuid in json.scripts ) {

				var object = scene.getObjectByProperty( 'uuid', uuid, true );

				var scripts = json.scripts[ uuid ];

				for ( var i = 0; i < scripts.length; i++ ) {

					var script = scripts[ i ];

					var functions = ( new Function( 'player, scene, update', script.source + '\nreturn { update: update };' ).bind( object ) )( this, scene );

					for ( var name in functions ) {

						if ( functions[ name ] === undefined ) continue;

						if ( events[ name ] === undefined ) {

							console.warn( 'APP.Player: event type not supported (', name, ')' );
							continue;

						}

						events[ name ].push( functions[ name ].bind( object ) );

					}

				}

			}

			// Rotate the phone group in the scene, not the camera as usual
			var phoneGroupObj = scene.getObjectByProperty( 'uuid', 'D5083881-7A5B-40AF-8A5F-19F401AF1C70', true );

			// Set up device orientation emulator controls
			controls = new DeviceOrientationEmulatorControls( phoneGroupObj, scope.dom );
			controls.enableManualZoom = false;
			controls.connect();

			// Tell parent window to update its URL hash whenever interfaction with controls ends
			controls.addEventListener( 'userinteractionend', function() {
				if ( window.parent ) {

					sendMessage(
						window.parent, {
							'action': 'updatePosition'
						}
					);

				}
			}, false );

		};

		this.setCamera = function( value ) {

			camera = value;
			camera.aspect = this.width / this.height;
			camera.updateProjectionMatrix();

		};

		this.setScene = function( value ) {

			scene = value;

		};

		this.setSize = function( width, height ) {

			if ( renderer._fullScreen ) return;

			this.width = width;
			this.height = height;

			camera.aspect = this.width / this.height;
			camera.updateProjectionMatrix();

			renderer.setSize( width, height );

		};

		this.setManualOrientation = ( function() {

			var _q = new THREE.Quaternion();

			return function( alpha, beta, gamma ) {

				var _x = THREE.Math.degToRad( beta || 0 );
				var _y = THREE.Math.degToRad( alpha || 0 );
				var _z = THREE.Math.degToRad( gamma || 0 );

				euler.set( _x, _y, -_z, 'YXZ' );

				// Apply provided deviceorientation values to controller
				_q.setFromEuler( euler );
				_q.multiply( worldQuat );

				controls.object.quaternion.copy( _q );

			};

		} )();

		this.playback = ( function() {

			var source, destination;
			var _this;

			var _a0, _b0, _g0;

			return function( data ) {

				_this = this;

				// Disconnect controls
				controls.disconnect();

				// Store original device orientation values
				_a0 = deviceOrientation.alpha;
				_b0 = deviceOrientation.beta;
				_g0 = deviceOrientation.gamma;

				var frameNumber = 0;

				sendMessage(
					window.parent, {
						'action': 'playbackStarted'
					}
				);

				// Tween through each of our animation frames
				data.frames.reduce( function( chain, frame ) {
					// Add these actions to the end of the promise chain
					return chain.then( function() {
						sendMessage(
							window.parent, {
								'action': 'playbackTransition',
								'data': frameNumber++
							}
						);

						if ( frame.type === 0 ) { // SET
							return _this.set( frame );
						} else { // ANIMATION
							return _this.tween( frame );
						}
					} );
				}, Promise.resolve() ).then( function() {
					// Rollback to original device orientation values
					window.setTimeout( function() {
						sendMessage(
							window.parent, {
								'action': 'playbackEnded'
							}
						);

						_this.setManualOrientation( _a0, _b0, _g0 );

						// Re-connect controls
						controls.connect();
					}, 1000 );
				} ).catch( function() {
					// Clean-up on error
					sendMessage(
						window.parent, {
							'action': 'playbackEnded'
						}
					);

					_this.setManualOrientation( _a0, _b0, _g0 );

					// Re-connect controls
					controls.connect();
				} );

			};

		} )();

		this.set = ( function() {

			var _this;

			var waitTime, playTime;

			return function( frame ) {

				_this = this;

				var setPromise = new Promise( function( resolve, reject ) {

					waitTime = frame.offset * 1000;
					playTime = frame.duration * 1000;

					window.setTimeout( function() {

						_this.setManualOrientation( frame.data.alpha, frame.data.beta, frame.data.gamma );

						window.setTimeout( function() {
							resolve(); // this Promise can never reject
						}, playTime );

					}, waitTime );

				} );

				return setPromise;

			};

		} )();

		this.tween = ( function() {

			var waitTime, playTime;

			var destRot = new THREE.Euler(); // input euler values

			var qa = new THREE.Quaternion(); // source quaternion
			var qb = new THREE.Quaternion(); // destination quaternion
			var qm = new THREE.Quaternion(); // worker

			return function( frame ) {

				var tweenPromise = new Promise( function( resolve, reject ) {

					tweenInProgress = true;

					waitTime = frame.offset * 1000;
					playTime = frame.duration * 1000;

					var _x = THREE.Math.degToRad( frame.data.beta || 0 );
					var _y = THREE.Math.degToRad( frame.data.alpha || 0 );
					var _z = THREE.Math.degToRad( frame.data.gamma || 0 );

					destRot.set( _x, _y, -_z, 'YXZ' );

					// Obtain target quaternion from provided Euler angles
					qb.setFromEuler( destRot );
					qb.multiply( worldQuat );

					// Set source as the current camera's quaternion
					qa.copy( controls.object.quaternion );

					// Reset our worker quaternion
					qm.set( 0, 0, 0, 1 );

					var throwError = window.setTimeout( function() {
						tweenInProgress = false;
						reject();
					}, waitTime + 5000 );

					var o = {
						t: 0
					};

					new TWEEN.Tween( o )
						.delay( waitTime )
						.to( {
							t: 1
						}, playTime )
						.onStart( function() {
							window.clearTimeout( throwError );
						} )
						.onUpdate( function() {
							THREE.Quaternion.slerp( qa, qb, qm, o.t );
							controls.object.quaternion.copy( qm );
						} )
						.onComplete( function() {
							tweenInProgress = false;
							resolve();
						} )
						.start();

				} );

				return tweenPromise;

			};

		} )();

		this.updateScreenOrientation = function( data ) {

			// Update the screen display bars

			var screenTop = scene.getObjectByProperty( 'name', 'screen_top', true );
			var screenBottom = scene.getObjectByProperty( 'name', 'screen_bottom', true );
			var screenTopInv = scene.getObjectByProperty( 'name', 'screen_top_inverse', true );
			var screenBottomInv = scene.getObjectByProperty( 'name', 'screen_bottom_inverse', true );

			var screenLeft = scene.getObjectByProperty( 'name', 'screen_left', true );
			var screenRight = scene.getObjectByProperty( 'name', 'screen_right', true );
			var screenLeftInv = scene.getObjectByProperty( 'name', 'screen_left_inverse', true );
			var screenRightInv = scene.getObjectByProperty( 'name', 'screen_right_inverse', true );

			if ( data.totalRotation % 180 !== 0 ) {

				screenTop.visible = false;
				screenBottom.visible = false;
				screenTopInv.visible = false;
				screenBottomInv.visible = false;

				if ( data.totalRotation == 90 ) {

					screenLeft.visible = true;
					screenRight.visible = true;
					screenLeftInv.visible = false;
					screenRightInv.visible = false;

				} else {

					screenLeft.visible = false;
					screenRight.visible = false;
					screenLeftInv.visible = true;
					screenRightInv.visible = true;

				}

			} else {

				screenLeft.visible = false;
				screenRight.visible = false;
				screenLeftInv.visible = false;
				screenRightInv.visible = false;

				if ( data.totalRotation == 180 ) {

					screenTop.visible = false;
					screenBottom.visible = false;
					screenTopInv.visible = true;
					screenBottomInv.visible = true;

				} else {

					screenTop.visible = true;
					screenBottom.visible = true;
					screenTopInv.visible = false;
					screenBottomInv.visible = false;

				}

			}

			if ( data.updateControls ) {

				controls.updateScreenOrientation( data.rotationDiff );

			}

		}

		var dispatch = function( array, event ) {

			for ( var i = 0, l = array.length; i < l; i++ ) {

				array[ i ]( event );

			}

		};

		var animate = function( time ) {

			request = requestAnimationFrame( animate );

			dispatch( events.update, {
				time: time,
				delta: time - prevTime
			} );

			if ( tweenInProgress ) {
				TWEEN.update( time );
			}

			controls.update();

			// *** Calculate device orientation quaternion (without affecting rendering)
			camQuat.copy( controls.object.quaternion );
			camQuat.inverse();
			camQuat.multiply( worldQuat );
			camQuat.inverse();

			// Derive Tait-Bryan angles from calculated device orientation quaternion
			deviceOrientation.setFromQuaternion( camQuat, 'YXZ' );

			// Calculate required emulator screen roll compensation required
			var rollZ = rotation.setFromQuaternion( controls.object.quaternion, 'YXZ' ).z;
			deviceOrientation.roll = THREE.Math.radToDeg( -rollZ );

			// Dispatch a new 'deviceorientation' event based on derived device orientation
			dispatchDeviceOrientationEvent( deviceOrientation );

			// Render the controller
			renderer.render( scene, camera );

			prevTime = time;

		};

		this.play = function( url ) {

			controls.object.quaternion.set( 0, 0, 0, 1 );

			request = requestAnimationFrame( animate );
			prevTime = performance.now();

		};

		this.stop = function() {

			cancelAnimationFrame( request );

		};

	}

};
