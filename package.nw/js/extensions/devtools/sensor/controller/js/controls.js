window.addEventListener( 'load', function() {

	var url = new URL( document.location );

	var loader = new THREE.XHRLoader();

	loader.load( 'data/app.json', function( text ) {

		var player = new APP.Player();
		window.player = player
		player.load( JSON.parse( text ) );
		player.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( player.dom );

		window.addEventListener( 'resize', function() {
			player.setSize( window.innerWidth, window.innerHeight );
		} );

		var currentScreenOrientation = 0;

		// Listen for device orientation events fired from the emulator
		// and dispatch them on to the parent window
		window.addEventListener( 'deviceorientation', function( event ) {

			if ( !window.parent ) return;

			sendMessage(
				window.parent, {
					'action': 'newData',
					'data': {
						'alpha': event.alpha,
						'beta': event.beta,
						'gamma': event.gamma,
						'absolute': event.absolute,
						'screen': currentScreenOrientation,
						'roll': event.roll
					}
				},
				url.origin
			);

		}, false );

		var actions = {
			'start': function( data ) {
				player.play();
			},
			'restart': function( data ) {
				player.stop();
				player.play();
			},
			'setCoords': function( data ) {
				player.setManualOrientation( data.alpha, data.beta, data.gamma );

				if ( window.parent ) {
					sendMessage(
						window.parent, {
							'action': 'updatePosition'
						},
						url.origin
					);
				}
			},
			'rotateScreen': function( data ) {
				player.updateScreenOrientation( data );

				currentScreenOrientation = ( 360 - data.totalRotation ) % 360;

				if ( window.parent ) {
					sendMessage(
						window.parent, {
							'action': 'updatePosition'
						},
						url.origin
					);
				}
			},
			'playback': function( data ) {
				player.playback( data );
			}
		};

		// Receive messages from window.parent
		window.addEventListener( 'message', function( event ) {

			if ( event.origin != url.origin ) return;

			var json = JSON.parse( event.data );

			if ( !json.action || !actions[ json.action ] ) return;

			actions[ json.action ]( json.data );

		}, false );

		// Kick off the controller by telling its parent window that it is now ready
		if ( window.parent ) {

			sendMessage(
				window.parent, {
					'action': 'connect'
				}, url.origin
			);
		}

	} );
}, false );
