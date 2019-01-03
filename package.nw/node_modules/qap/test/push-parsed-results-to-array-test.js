var log = console.log
    , assert = require( 'assert' )
    , Qap = require( '../' )
    , crlf = '\r\n'
    , data =  new Buffer( '\r' + crlf + crlf + 'tregallinesulcomo' + crlf + '\r' )
    , qcrlf = Qap( crlf )
    ;

log( '- passing a array != null to the parse method' );
var arr = [ 'a-weird-result' ],
    results = qcrlf.parse( data, 0, 0, arr );

log( '- check if the new results length is 4' );
assert.equal( 4, results.length, 'something goes wrong with the array argument for parse' );

log( '- check if the first result in the array was preserved' );
assert.equal( 'a-weird-result', results[ 0 ], 'something goes wrong with the array argument for parse' );

log( '- check all added results in the array match with real results' );
results.shift();
assert.deepEqual( qcrlf.parse( data ), results, 'something goes wrong with the array argument for parse' );

log( '- passing a null array argument to the parse method' );
arr = null;
results = qcrlf.parse( data, 0, 0, arr );

log( '- check if null array is yet null' );
assert.equal( null, arr, 'a null array argument should remain equal to null' )

log( '- check if results is not null' );
assert.notEqual( null, results, 'array of results should be different from null' )

log( '- check if results length is 3' );
assert.equal( 3, results.length, 'the resulting array length should be equal to 3' )
