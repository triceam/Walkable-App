
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    //console.log( "READY" );

    window.GeoWatcher.watch();

    loadTemplates( appTemplatesLoaded );
}

function appTemplatesLoaded() {
    //console.log( "VIEW TEMPLATES LOADED" );

    $("body").empty();



    var homeView = new HomeView();
    
    
    //Setup the ViewNavigator
    window.viewNavigator = new ViewNavigator( 'body' );	
    window.viewNavigator.pushView( homeView );
    document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
    if ( window.viewNavigator.history.length > 1 ){
        event.preventDefault();
        window.viewNavigator.popView();
        return false;
    }
    navigator.app.exitApp();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
