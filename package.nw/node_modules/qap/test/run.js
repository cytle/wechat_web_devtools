#!/usr/bin/env node
( function () {
    var log = console.log
        , fs = require( 'fs' )
        , util = require( 'util' )
        , iopt = {
            showHidden : false
            , depth : 10
            , colors : true
            , customInspect : true 
        }
        , inspect = function ( el ) {
            return util.inspect( el, iopt );
        }
        , tpath = __dirname
        , minfo = require( '../package.json' )
        , mname = minfo.name.charAt( 0 ).toUpperCase() + minfo.name.slice( 1 )
        , mver = minfo.version
        ;

    // catch SIGINT
    process.on( 'SIGINT', function () {
        log( '\nExit tests with SIGINT.\n' );
        process.exit( 0 );
    } );

    fs.readdir( tpath,  function ( err, files ) {
        if ( err ) return 1;

        var flen = files.length
            , fname = files[ 0 ]
            , f = 0
            , failed = {}
            , fails = 0
            , success = 0
            , executed = 0
            ;

        for ( ; f < flen; fname = files[ ++f ] ) {
            if ( ~ fname.indexOf( '-test.js' ) ) {
                ++executed;
                // run script
                log( '\n[ %s v%s - %s ]\n', mname, mver, inspect( fname ) );
                try {
                    require( './' + fname );
                    ++success
                } catch ( e ) {
                    ++fails;
                    if ( ! failed[ fname ] ) failed[ fname ] = [];
                    failed[ fname ].push( e, Date.now() );
                }
            }
        }
        log( '\n%s test files executed.', inspect( executed ) );
        log( '%s test files succeeded.', inspect( success ) );
        log( '%s test files failed.%s', inspect( fails ), fails ? '\n' + inspect( failed ) +'\n' : '\n' );
    } );
} )();