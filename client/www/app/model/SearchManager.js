
window.SearchManager = {

    apiUrl:"http://localhost:3000/restaurants-api?",
    
    search:function (searchString, successCallback, errorCallback) {
        var searchURL = this.apiUrl + "q=" + encodeURIComponent(searchString) + "&ll=" + window.GeoWatcher.position.latitude + "," + window.GeoWatcher.position.longitude + "&d=" + new Date().getTime();

        $.ajax({
            timeout:20000,
            url:searchURL,
            success:function(result){
                if ( successCallback ) {
                    successCallback( result );
                }
            },
            error:function(error){
                if ( errorCallback ){
                    errorCallback( error );
                }
            }
        });

    },

    findPointById:function (id, collection) {
        for (var x=0; x<collection.length; x++) {
            var poi = collection[x];
            if (poi.factual_id == id){
                return poi;
            }
        }
        return null;
    }
}
