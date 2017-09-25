/**
 * -------
 * Modified version of threeVR (https://github.com/richtr/threeVR)
 * -------
 *
 * Author: Rich Tibbett (http://github.com/richtr)
 * License: The MIT License
 *
 **/

var DeviceOrientationEmulatorControls = function( object, domElement ) {

	this.object = object;
	this.element = domElement || document;

	this.enableManualDrag = true; // enable manual user drag override control by default
	this.enableManualZoom = true; // enable manual user zoom override control by default

	this.useQuaternions = true; // use quaternions for orientation calculation by default

	// Manual rotate override components
	var startX = 0,
		startY = 0,
		currentX = 0,
		currentY = 0,
		scrollSpeedX, scrollSpeedY,
		tmpQuat = new THREE.Quaternion();

	// Manual zoom override components
	var zoomStart = 1,
		zoomCurrent = 1,
		zoomP1 = new THREE.Vector2(),
		zoomP2 = new THREE.Vector2(),
		tmpFOV;

	var CONTROLLER_STATE = {
		AUTO: 0,
		MANUAL_ROTATE: 1,
		MANUAL_ZOOM: 2
	};

	var appState = CONTROLLER_STATE.AUTO;

	var CONTROLLER_EVENT = {
		MANUAL_CONTROL: 'userinteraction', // userinteractionstart, userinteractionend
		ZOOM_CONTROL: 'zoom', // zoomstart, zoomend
		ROTATE_CONTROL: 'rotate', // rotatestart, rotateend
	};

	// Consistent Object Field-Of-View fix components
	var startClientHeight = window.innerHeight,
		startFOVFrustrumHeight = 2000 * Math.tan( THREE.Math.degToRad( ( this.object.fov || 75 ) / 2 ) ),
		relativeFOVFrustrumHeight, relativeVerticalFOV;

	var deviceQuat = new THREE.Quaternion();

	var fireEvent = function() {
		var eventData;

		return function( name ) {
			window.setTimeout(function() {
				eventData = arguments || {};

				eventData.type = name;
				eventData.target = this;

				this.dispatchEvent( eventData );
			}.bind( this ), 1);
		}.bind( this );
	}.bind( this )();

	this.constrainObjectFOV = function() {
		relativeFOVFrustrumHeight = startFOVFrustrumHeight * ( window.innerHeight / startClientHeight );

		relativeVerticalFOV = THREE.Math.radToDeg( 2 * Math.atan( relativeFOVFrustrumHeight / 2000 ) );

		this.object.fov = relativeVerticalFOV;
	}.bind( this );

	this.onDocumentMouseDown = function( event ) {
		event.preventDefault();

		appState = CONTROLLER_STATE.MANUAL_ROTATE;

		tmpQuat.copy( this.object.quaternion );

		startX = currentX = event.pageX;
		startY = currentY = event.pageY;

		// Set consistent scroll speed based on current viewport width/height
		scrollSpeedX = ( 1200 / window.innerWidth ) * 0.2;
		scrollSpeedY = ( 800 / window.innerHeight ) * 0.2;

		this.element.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
		this.element.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
		this.element.addEventListener( 'mouseout', this.onDocumentMouseUp, false );

		fireEvent( CONTROLLER_EVENT.MANUAL_CONTROL + 'start' );
		fireEvent( CONTROLLER_EVENT.ROTATE_CONTROL + 'start' );
	}.bind( this );

	this.onDocumentMouseMove = function( event ) {
		currentX = event.pageX;
		currentY = event.pageY;
	}.bind( this );

	this.onDocumentMouseUp = function( event ) {
		this.element.removeEventListener( 'mousemove', this.onDocumentMouseMove, false );
		this.element.removeEventListener( 'mouseup', this.onDocumentMouseUp, false );
		this.element.removeEventListener( 'mouseout', this.onDocumentMouseUp, false );

		appState = CONTROLLER_STATE.AUTO;

		fireEvent( CONTROLLER_EVENT.MANUAL_CONTROL + 'end' );
		fireEvent( CONTROLLER_EVENT.ROTATE_CONTROL + 'end' );
	}.bind( this );

	this.onDocumentTouchStart = function( event ) {
		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {
			case 1: // ROTATE

				appState = CONTROLLER_STATE.MANUAL_ROTATE;

				tmpQuat.copy( this.object.quaternion );

				startX = currentX = event.touches[ 0 ].pageX;
				startY = currentY = event.touches[ 0 ].pageY;

				// Set consistent scroll speed based on current viewport width/height
				scrollSpeedX = ( 1200 / window.innerWidth ) * 0.1;
				scrollSpeedY = ( 800 / window.innerHeight ) * 0.1;

				this.element.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
				this.element.addEventListener( 'touchend', this.onDocumentTouchEnd, false );

				fireEvent( CONTROLLER_EVENT.MANUAL_CONTROL + 'start' );
				fireEvent( CONTROLLER_EVENT.ROTATE_CONTROL + 'start' );

				break;

			case 2: // ZOOM

				appState = CONTROLLER_STATE.MANUAL_ZOOM;

				tmpFOV = this.object.fov;

				zoomP1.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				zoomP2.set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY );

				zoomStart = zoomCurrent = zoomP1.distanceTo( zoomP2 );

				this.element.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
				this.element.addEventListener( 'touchend', this.onDocumentTouchEnd, false );

				fireEvent( CONTROLLER_EVENT.MANUAL_CONTROL + 'start' );
				fireEvent( CONTROLLER_EVENT.ZOOM_CONTROL + 'start' );

				break;
		}
	}.bind( this );

	this.onDocumentTouchMove = function( event ) {
		switch ( event.touches.length ) {
			case 1:
				currentX = event.touches[ 0 ].pageX;
				currentY = event.touches[ 0 ].pageY;
				break;

			case 2:
				zoomP1.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				zoomP2.set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY );
				break;
		}
	}.bind( this );

	this.onDocumentTouchEnd = function( event ) {
		this.element.removeEventListener( 'touchmove', this.onDocumentTouchMove, false );
		this.element.removeEventListener( 'touchend', this.onDocumentTouchEnd, false );

		if ( appState === CONTROLLER_STATE.MANUAL_ROTATE ) {

			appState = CONTROLLER_STATE.AUTO; // reset control state

			fireEvent( CONTROLLER_EVENT.MANUAL_CONTROL + 'end' );
			fireEvent( CONTROLLER_EVENT.ROTATE_CONTROL + 'end' );

		} else if ( appState === CONTROLLER_STATE.MANUAL_ZOOM ) {

			this.constrainObjectFOV(); // re-instate original object FOV

			appState = CONTROLLER_STATE.AUTO; // reset control state

			fireEvent( CONTROLLER_EVENT.MANUAL_CONTROL + 'end' );
			fireEvent( CONTROLLER_EVENT.ZOOM_CONTROL + 'end' );

		}
	}.bind( this );

	this.updateManualMove = function() {

		var lat, lon;
		var phi, theta;

		var rotation = new THREE.Euler( 0, 0, 0, 'YXZ' );

		var rotQuat = new THREE.Quaternion();
		var objQuat = new THREE.Quaternion();

		var tmpZ, objZ, realZ;

		var zoomFactor, minZoomFactor = 1; // maxZoomFactor = Infinity

		return function() {

			if ( appState === CONTROLLER_STATE.MANUAL_ROTATE ) {

				lat = - ( startY - currentY ) * scrollSpeedY;
				lon = - ( startX - currentX ) * scrollSpeedX;

				phi = THREE.Math.degToRad( lat );
				theta = THREE.Math.degToRad( lon );

				// Reset objQuat
				objQuat.set(0,0,0,1);

				// Apply y-based mouse rotation
				rotQuat.set( 0, Math.sin( theta / 2 ), 0, Math.cos( theta / 2 ) );
				objQuat.multiply( rotQuat );

				// Apply z-based mouse rotation
				rotQuat.set( Math.sin( phi / 2 ), 0, 0, Math.cos( phi / 2 ) );
				objQuat.multiply( rotQuat );

				// Apply existing object rotation to calculated mouse rotation
				objQuat.multiply( tmpQuat );

				this.object.quaternion.copy( objQuat );

			} else if ( appState === CONTROLLER_STATE.MANUAL_ZOOM ) {

				zoomCurrent = zoomP1.distanceTo( zoomP2 );

				zoomFactor = zoomStart / zoomCurrent;

				if ( zoomFactor <= minZoomFactor ) {

					this.object.fov = tmpFOV * zoomFactor;

					this.object.updateProjectionMatrix();

				}

				// Add device's current z-axis rotation

				if ( deviceQuat ) {

					tmpZ = rotation.setFromQuaternion( tmpQuat, 'YXZ' ).z;
					realZ = rotation.setFromQuaternion( deviceQuat, 'YXZ' ).z;

					rotQuat.set( 0, 0, Math.sin( ( realZ - tmpZ ) / 2 ), Math.cos( ( realZ - tmpZ ) / 2 ) );

					tmpQuat.multiply( rotQuat );

					this.object.quaternion.copy( tmpQuat );

				}

			}

		};

	}();

	this.update = function() {
		if ( appState !== CONTROLLER_STATE.AUTO ) {
			this.updateManualMove();
		}
	};

	this.updateScreenOrientation = function( diffRotation ) {
		var screenTransform = new THREE.Quaternion();
		var minusHalfAngle = 0;

		// Add new screen rotation
		minusHalfAngle = -( THREE.Math.degToRad( diffRotation ) ) / 2;
		screenTransform.set( 0, 0, Math.sin( minusHalfAngle ), Math.cos( minusHalfAngle ) );
		this.object.quaternion.multiply( screenTransform );
	};

	this.connect = function() {
		window.addEventListener( 'resize', this.constrainObjectFOV, false );

		this.element.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
		this.element.addEventListener( 'touchstart', this.onDocumentTouchStart, false );

		this.element.style.cursor = 'move';
	};

	this.disconnect = function() {
		window.removeEventListener( 'resize', this.constrainObjectFOV, false );

		this.element.removeEventListener( 'mousedown', this.onDocumentMouseDown, false );
		this.element.removeEventListener( 'touchstart', this.onDocumentTouchStart, false );

		this.element.style.cursor = 'not-allowed';
	};

};

DeviceOrientationEmulatorControls.prototype = Object.create( THREE.EventDispatcher.prototype );
