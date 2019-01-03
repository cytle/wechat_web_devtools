var log = console.log
    , assert = require( 'assert' )
    , QuickParser = require( '../' )
    //megabytes
    , defaultSize = 700.1
    // pre-record indexes
    , indexes = []
    // build a weird buffer
    , buildTestBuffer = function ( p, MBsize, gapFactor ) {
        var s = Date.now(),
            mtime = 0,
            len = p.length,
            gap = Math.pow( len, ( gapFactor && gapFactor > 1 ) ? gapFactor : 3 ),
            mb =  1024 * 1024,
            size = MBsize || defaultSize,
            tSize = parseInt( size * mb, 10 ),
            str = '\r\nContent-Disposition: form-data\r\nLorem\
                    Ipsum et Dolor sit amet, Quisquisce\r\n\r\n';

        for ( var i = 0,  t = new Buffer( tSize ); i + len < tSize; i += len  ){
            if ( ( i % ( gap ) ) === 0 ) {
                t.write( p.toString() + str, i );
                indexes.push( i );
            } else {
                t[ i ] = i % 255;
            } 
        }
        mtime = Date.now() - s;
        log( '- current pattern:', JSON.stringify( p.toString() ) );
        log( '- pattern length is %d bytes', len );
        log( '- current gap factor is', ( gapFactor ) ? gapFactor : 3 ); 
        log( '- patterns gap (distance) is %d KBytes', ( gap / 1024 ).toFixed( 2 ) );
        // log( ' - plength / pgap:', len / gap );
        log( '- buffer creation time:', mtime / 1000, 'secs' ); 
        return t;
    }
    , bsize
    , gapfactor
    , pattern = '---------------------------2046863043300497616870820724\r\n'
    ;

process.argv.forEach( function ( val, index, array ) {
    ( index === 2 ) ? ( bsize = parseInt( val, 10 ) )  : null; 
    ( index === 3 ) ? ( gapfactor = parseInt( val, 10 ) )  : null;
    ( index === 4 ) ? ( pattern = ( ( val.length > 1 ) && ( val.length < 255 ) ) ? ( '--' + val + '\r\n' ) : pattern ) : null;  
} );

var p = new Buffer( pattern )
    , t = buildTestBuffer( p, bsize, gapfactor )
    , smem = process.memoryUsage()
    , qap = QuickParser( p )
    , emem = process.memoryUsage()
    , stime = Date.now()
    , results = qap.parse( t )
    , elapsed = Date.now() - stime
    ;

log( '- test buffer size is %d MBytes', bsize || defaultSize );

log( '- check if results length is equal to', indexes.length );
assert.equal( results.length, indexes.length );

log( '- compare results and pre-defined indexes' );
assert.deepEqual( results, indexes );

log( '- tables memory usage is %d KBytes', ( ( emem.rss - smem.rss ) / 1024 ).toFixed( 1 ) );
log( '- tables v8++ heap usage is %d KBytes', ( ( emem.heapUsed - smem.heapUsed ) / 1024 ).toFixed( 1 ) );
log( '- results matched are', results.length );
log( '- total elapsed time is %d secs', elapsed / 1000 );
log( '- parsing data rate is %d Gbit/s', ( ( 8 * ( bsize || defaultSize ) / ( elapsed / 1000 ) ) / 1024 ).toFixed( 2 ) );
