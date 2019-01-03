var log = console.log
    , assert = require( 'assert' )
    , Qap = require( '../' )
    , pattern = '-----hellofolks!\r\n\r\n'
    , bpattern = new Buffer( pattern )
    , plen = pattern.length
    , mb = 700
    , dlen = mb * 1024 * 1024
    , data = new Buffer( dlen )
    , qap = Qap( bpattern )
    , occ = Math.floor( dlen / plen / plen / plen / plen )
    , i = occ
    , indexes = []
    , stime = Date.now()
    ;

log( '- creating test buffer..(' + mb +' MB)' );

// occ should be >> pattern.length
for ( ; i < dlen - 1; i += occ ) {
    indexes.push( i );
    bpattern.copy( data, i );
};

log( '- buffer data copied in',( Date.now() - stime ) / 1000, 'secs' );
log( '- pattern length:', bpattern.length, 'bytes' );
log( '- patterns written:', indexes.length );
log( '- parse data from beginning..' );

var sptime = Date.now(),
    results = qap.parse( data ),
    presults = null,
    offset = Math.floor( results.length * Math.random() );

log( '- input data was parsed in', ( ( Date.now() - sptime ) / 1000 ).toFixed( 2 ), 'secs' );
log( '- total results:', results.length );

assert.equal( results.length, indexes.length, 'parsed results don\'t match with existing patterns' );
assert.deepEqual( results, indexes, 'indexes and parsed indexes don\'t match' );

log( '- successfully compared parsed results and pre-recorded indexes..' );
log( '- re-parse data from result with index ' + offset + ' to obtain partial results..' );
presults = qap.parse( data, indexes[ offset ] + 1 );

log( '- check partial results length (' + ( presults.length ) + ' === ' + ( results.length - offset - 1 ) + ')' );
assert.equal( presults.length + offset + 1, results.length, 'results don\'t match' );

log( '- all big buffer tests passed in',( ( Date.now() - stime ) / 1000 ).toFixed( 2 ), 'secs');