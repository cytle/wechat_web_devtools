var log = console.log
    , assert = require( 'assert' )
    , Qap = require( '../' )
    , plen = 10 * 1024 * 1024
    , pattern = new Buffer( plen )
    , i = 0
    , rand = 0
    , mb = 300
    , dlen = mb * 1024 * 1024
    , data = new Buffer( dlen )
    , indexes = [ dlen / 1024, plen + dlen / 1024 ]
    , qap = null
    , results = null
    ;

for ( ; i < plen; ++i ) {
    rand = Math.floor( Math.random() * 255 * plen ) % 255;
    pattern[ i ] = rand; 
};

qap = Qap( pattern );

// log( Math.log( ( Math.log( plen ) / Math.log( 2 ) ) ) );

log( '- copy', indexes.length, 'big patterns in test data' );
pattern.copy( data, indexes[ 0 ] );
pattern.copy( data, indexes[ 1 ] );

log( '- parse test data for big patterns' );
results = qap.parse( data );

log( '- check if results length is equal to', indexes.length );
assert.equal( results.length, indexes.length );

log( '- compare results and pre-defined indexes' );
assert.deepEqual( results, indexes );