module.exports = {
    // bad char table
    bcTable : function ( p ) {
        var m = p.length,
            bc = ( m > 255 ) ? [] : new Buffer( 256 ),
            i = 0,
            blen = bc.length || m;
        for ( ; i < blen; bc[ i++ ] = m );
        for ( i = 0; i < m - 1; ++i ) bc[ p[ i ] ] = m - i - 1;
        return bc;
    }
};