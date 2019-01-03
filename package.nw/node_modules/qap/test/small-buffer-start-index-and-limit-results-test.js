var log = console.log
    , assert = require( 'assert' )
    , Qap = require( '../' )
    , pattern = '-----hellofolks!\r\n\r\n'
    , bpattern = new Buffer( pattern )
    , plen = pattern.length
    , mb = 10
    , dlen = mb * 1024 * 1024
    , data = new Buffer( dlen )
    , qap = Qap( bpattern )
    , occ = Math.floor( dlen / plen / plen / plen / plen )
    , i = 0
    , indexes = []
    , stime = Date.now()
    ;

log( '- creating test buffer..(' + mb +' MB)' );
for ( ; i < dlen - pattern.length; i += pattern.length + ++occ ) {
    indexes.push( i );
    bpattern.copy( data, i );
};

log( '- buffer data copied in',( Date.now() - stime ) / 1000, 'secs' );
log( '- pattern length:', bpattern.length, 'bytes' );
log( '- patterns written:', indexes.length );
log( '- parse data from beginning..' );

var sptime = Date.now(),
    offset = Math.floor( indexes.length / 2 ),
    // parse data from the middle index
    results = qap.parse( data, indexes[ offset ] ),
    presults = null;

log( '- input data was parsed from the middle index in', ( ( Date.now() - sptime ) / 1000 ).toFixed( 2 ), 'secs' );
log( '- total results:', results.length );

assert.equal( results.length, indexes.length -offset, 'parsed results don\'t match with existing patterns ' + results.length + '!==' + indexes.length );
assert.deepEqual( results, indexes.slice( offset ), 'indexes and parsed indexes don\'t match' );

log( '- successfully compared parsed results and pre-recorded indexes..' );

log( '- re-parse data from result with index ' + offset + ' and limit results to 10..' );
presults = qap.parse( data, indexes[ offset ], 10 );

log( '- check partial results length (' + ( presults.length ) + ' === 10)' );
assert.equal( presults.length, 10, 'partial results length test failed' );

log( '- compare partial and limited results with pre-recorded results' );
assert.deepEqual( presults, indexes.slice( offset, offset + 10 ) , 'results don\'t match' );

log( '- all small buffer tests passed in',( ( Date.now() - stime ) / 1000 ).toFixed( 2 ), 'secs');