function dispatchDeviceOrientationEvent( values ) {
	var data = values || {};

	// Create and dispatch an emulated device orientation event at window
	// object
	var event = document.createEvent( 'Event' );
	event.initEvent( 'deviceorientation', true, true );

	var eventData = {
		'alpha': data.alpha % 360,
		'beta': data.beta,
		'gamma': data.gamma,
		'absolute': true,
		'roll': data.roll || 0 // custom attribute for emulator roll adjustment
	};

	for ( var key in eventData ) event[ key ] = eventData[ key ];
	event[ 'simulation' ] = true; // add 'simulated event' flag

	window.dispatchEvent( event );
}

function sendMessage( target, json, origin ) {
	target[ 'postMessage' ]( JSON.stringify( json ), origin || '*' );
}
