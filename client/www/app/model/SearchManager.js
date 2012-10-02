
window.SearchManager = {

    apiUrl:"http://localhost:3000/api?",

    search:function (searchString, successCallback, errorCallback) {
        //console.log(searchString);
        var searchURL = this.apiUrl + "q=" + encodeURIComponent(searchString) + "&ll=" + window.GeoWatcher.position.latitude + "," + window.GeoWatcher.position.longitude + "&d=" + new Date().getTime();
        //var searchURL = this.apiUrl + "q=" + encodeURIComponent(searchString) + "&ll=37.772089,-122.400945&d=" + new Date().getTime();
        //console.log(searchURL);

        $.ajax({
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
