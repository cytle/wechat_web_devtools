var log = console.log
    , dlength = 700
    , stime = 0
    , boundary = new Buffer( 57 )
    // build test data to parse
    , data = ( function () {
        var test = new Buffer( dlength * 1024 * 1024)
            , t = 0
            , tlen = test.length
            ;
        log( '- now building a %d GB test buffer..', ( dlength / 1024 ).toFixed( 2 ) );
        for ( ; ++t < tlen; ) {
            test[ t ] = t % 256;
        }
        log( '- test buffer created..' );
        return test;
    } )()
    // crook parse method
    , magicParse = function ( pattern, data ) {
        var i = 0
            , dlen = data.length
            , plen = pattern.length
            , pchar = pattern[ plen - 1 ]
            ;

        log( '- now parsing test buffer with magic algorithm..' );

        for( stime = Date.now(); i < dlen; i += plen ) {
            /*
             * access data and compare current byte with the last byte of pattern,
             * then skip plen bytes, no other comparison.
             * best performance O(n/m)
             */
            if( pchar === data[ i ] ) {
                // ..
            }
        }
        return [];
    }
    , results = magicParse( boundary, data )
    , duration = ( Date.now() - stime )
    , datarate = ( ( dlength / duration ) * ( 7.8125 ) )
    ;

log( '- elapsed time is; %d millis (I\'m the best!)', duration );
log( '- datarate is: %d Gbit/sec (Magic!)', ( datarate ).toFixed( 2 ) );
log( '- results: 0 found (Sorry, I\'m a crook!)' );