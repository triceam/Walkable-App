NativeUtil = {
    getDirections: function( latitude, longitude ){
    
        var url = 'http://maps.google.com/maps?daddr=' + latitude + ',' + longitude;
        this.openExternalURL( url );
    },
    
    webSearch: function( string ){
        this.openExternalURL( "http://www.google.com/#hl=en&output=search&sclient=psy-ab&q=" + string + "&oq=" + string + "&fp=1" );
    },
   
    openExternalURL: function ( url ) {
        this.confirmLeaveApp( function( button ) {
            if (button==2 || button == undefined) {
                var android = navigator.userAgent.search( "Android" ) >= 0;
                
                if (android) {
                    navigator.app.loadUrl( url );
                }
                else {
                    window.open( url, '_blank' );
                }
            }
        });
    },
    
    confirmLeaveApp: function( callback ) {
        if ( navigator.notification && navigator.notification.confirm ){
            navigator.notification.confirm(
                "You will leave the Walkable Restaurants App.  Would you like to continue?",
                callback,              
                'Confirm',           
                'No,Yes'          
            );
        }
        else {
            callback();
        }
    },

    touchSupported: function() {
        return "ontouchstart" in window;
    },

    isTablet: function() {

        var win = $(window);
        var w = win.width();
        var h = win.height();
        var _w = Math.min( w,h );
        var _h = Math.max( w,h );
        
        //alert( _w );
        //alert( _h );

        return (_w > 640 && _h > 960 );
    }
}