
window.SearchManager = {

    //apiUrl:"http://localhost:3000/api?",
    apiUrl:"http://walkable.aws.af.cm/restaurants-api?",

    search:function (searchString, successCallback, errorCallback) {
        //console.log(searchString);
        //https://maps.google.com/maps?q=San+Francisco,+CA&hl=en&ll=37.772089,-122.400945&spn=0.006852,0.013937&sll=37.6,-95.665&sspn=55.236004,114.169922&oq=san+fr&hnear=San+Francisco,+California&t=m&z=17
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

//https://maps.google.com/maps?q=new+york+city&ll=40.714354,-74.005977&spn=0.008262,0.006362&hnear=New+York&gl=us&t=m&z=17