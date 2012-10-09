window.GeoWatcher = {

    position:null,
    timestamp:null,

   watch:function(){
       var self = this;

       this.onSuccess = function(event){
           self.success(event);
       }
       this.onError = function(event){
           self.error(event);
       }

       //console.log("watch");
       this.watchID = navigator.geolocation.watchPosition(this.onSuccess, this.onError, { timeout: 30000 });
   },

   unwatch:function() {
       //console.log("unwatch");
       navigator.geolocation.clearWatch(this.watchID);
   },

   success:function(position) {
       //console.log("success");
       this.timestamp = new Date();
       this.position = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           altitude: position.coords.altitude,
           accuracy: position.coords.accuracy,
           altitudeAccuracy: position.coords.altitudeAccuracy,
           heading: position.coords.heading,
           speed: position.coords.speed,
           timestamp: position.timestamp
       }

       //console.log( this.position );
   },

   error:function(err) {
       //console.log("error");
        $(document).trigger("geoWatcherError");
   },

   isValidLocation: function() {
	   
        return  this.position != undefined &&
            !isNaN(this.position.latitude)&&
            !isNaN(this.position.longitude);

   }
}

/*
 // onSuccess Callback
 //   This method accepts a `Position` object, which contains
 //   the current GPS coordinates
 //
 function onSuccess(position) {
 var element = document.getElementById('geolocation');
 element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
 'Longitude: ' + position.coords.longitude     + '<br />' +
 '<hr />'      + element.innerHTML;
 }

 // onError Callback receives a PositionError object
 //
 function onError(error) {
 alert('code: '    + error.code    + '\n' +
 'message: ' + error.message + '\n');
 }

 // Options: throw an error if no update is received every 30 seconds.
 //
 var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
    */