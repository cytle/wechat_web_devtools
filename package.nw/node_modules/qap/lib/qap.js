/*
 * Qap is a quick parser/matcher for string or buffer patterns.
 * It is optimized for using with pattern strings/buffers <= 255 bytes.
 * Better results are achieved with sparse and long patterns in the data to be parsed.
 * It is an implementation of QuickSearch algorithm :
 * http://www-igm.univ-mlv.fr/~lecroq/string/node19.html#SECTION00190.
 *
 * Copyright(c) 2013-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */
exports.Qap = ( function () {
    var isArray = Array.isArray
        , isBuffer = Buffer.isBuffer
        // shifting table
        , lookupTable = function ( p ) {
            var m = p.length
                , t = m > 255 ? [] : new Buffer( 256 )
                , i = 255
                , j = 0
                ;
            for ( ; i >= 0 ; t[ i ] = 0, i-- );
            for ( ; m > 0; t[ p[ j++ ] ] = m-- );
            return t;
        }
        , convert = function ( data ) {
            if ( ! isBuffer( data ) ) {
                // obviously, string conversion is slow
                if ( typeof data  === 'string' ) return new Buffer( data );
                else throw new TypeError( 'the argument type should be Buffer or String' );
            }
            return data;
        }
        , set = function ( pattern ) {
            var me = this
                ;
            me.p = convert( pattern );
            me.plkb = lookupTable( me.p );
            return me.p;
        }
        // Quick Parser
        , Qap = function ( pattern ) {
            var me = this
                , is = me instanceof Qap
                ;
            if ( ! is ) return new Qap( pattern );
            set.call( me, pattern );
        }
        , qproto = Qap.prototype
        ;

    qproto.set = set;

    qproto.parse = function ( data, start, rlimit, array ) {
        var me = this
            , d = convert( data )
            , plkb = me.plkb
            , p = me.p
            , m = p.length
            , n = d.length
            , ixs = isArray( array ) ? array : []
            , j = start || 0
            , ok = 1
            , z = 0
            , x = p[ 0 ]
            , pos = 0 + j
            , y = d[ pos ]
            , i = m + j
            , c = d[ i ]
            , offset = n - m
            , l = rlimit || Infinity
            ;
        for ( ; j <= offset;
                i = j + m,
                c = d[ i ],
                z = 0,
                ok = 1,
                pos = j,
                x = p[ 0 ],
                y = d[ pos ] ) {
            for ( ; z < m ;
                    z++,
                    pos++,
                    x = p[ z ],
                    y = d[ pos ] ) {

                if ( x === y ) continue;
                else {
                    ok = 0;
                    break;
                }
            }
            // if ( ok && ( ixs.push( j, pos ) >= l ) ) {
            if ( ok && ( ixs.push( j ) >= l ) ) break;
            j += plkb[ c ] || m + 1;
        }
        return ixs;
    };

    return Qap;
} )();
