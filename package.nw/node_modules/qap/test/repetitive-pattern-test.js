var log = console.log
    , assert = require( 'assert' )
    , Qap = require( '../' )
    , spattern = '-----hello'
    , splen = spattern.length
    , n = 1
    // 2^n times
    , tlen = splen * n
    , indexes = []
    , data = new Buffer( 256 )
    , dlen = data.length
    , bpattern = null
    , i = 0
    , qap = null
    , results = null
    ;

log( '- create pattern with 2 sub-pattern side by side' );
for ( ; i < n; ++i ) {
    spattern += spattern;
};

log( '- create a Buffer copying 2 patterns side by side' );
bpattern = new Buffer( spattern );
bpattern.copy( data, bpattern.length );
bpattern.copy( data, ( bpattern.length * 2 ) );

log( '- parse data for patterns and get results' );
qap = Qap( bpattern );
results = qap.parse( data );

log( '- check if the parse method returns exactly 3 results' );
assert.equal( results.length, 3, 'results length is wrong, must be 3, now it\'s ' + results.length );
assert.deepEqual( results, [ 20, 30, 40 ], 'results don\'t match' );
