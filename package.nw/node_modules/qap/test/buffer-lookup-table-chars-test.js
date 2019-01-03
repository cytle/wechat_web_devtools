// ✔
var log = console.log
    , assert = require( 'assert' )
    , Qap = require( '../' )
    , bpattern = new Buffer( 255 )
    , qap = Qap( bpattern )
    , i = 0
    ;

log( '. create %d pattern long, with all bytes equal to 0xff', bpattern.length );
for ( ; i < 255; ++i ) {
    bpattern[ i ] = 0xff;
}

log( '- check if the lookup table is an istance of Buffer.' );
assert.equal( true, Buffer.isBuffer( qap.plkb ), 'lookup table should be a Buffer!' );

log( '- check if the lookup table is 256 bytes long [0,255].' );
assert.equal( 256, qap.plkb.length, 'lookup table for this pattern should be 256 bytes long!' );

log( '- check 255th lookup table value, should be >= 0 and != undefined', qap.plkb[ 255 ] );
assert.notEqual( undefined, qap.plkb[ 255 ], 'lookup table for this pattern should be 256 bytes long!' );

log( '- test array creation if pattern length is >= 256' );

bpattern = new Buffer( 257 );

qap = Qap( bpattern );

log( '. create %d pattern long, with all bytes equal to 0xff', bpattern.length );
for ( i = 0; i < 257; ++i ) {
    bpattern[ i ] = 0xff;
};

log( '- check if the pattern is an istance of Array.' );
assert.equal( true, Array.isArray( qap.plkb ), 'pattern should be an Array!' );

log( '- check if the lookup table is 256 bytes long [0,255].' );
assert.equal( 256, qap.plkb.length, 'lookup table for this pattern should be 256 bytes long!' );
