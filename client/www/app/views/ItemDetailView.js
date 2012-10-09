templates.itemDetailView = "app/views/ItemDetailView.html";

window.ItemDetailView = Backbone.View.extend({

    template:undefined,
    backLabel: "Back",
    title:"",
    
    initialize: function(options) {

        if ( this.model.travel_time >= 0 ) {
            this.title = "Walk: " + this.model.travel_time_formatted;
        }
        else {
            this.title = "Dist: " + this.model.distance +" miles";
        }
        this.template = _.template( templates.itemDetailView ),
        this.render();
        this.view = this.$el;
    },  
    
    events:{
        "click #directions":"getDirections",
        "click #web":"webSearch",
        "click #mapImage":"getDirections",
        "click #website": "websiteClick"
    },
    
    render:function (eventName) {
        this.model.mapSize = $(window).width();
        if ( this.model.hours ) {
            this.model.parsedHours = JSON.parse(this.model.hours);
        }
        var model = this.model;
        this.$el.html( this.template( model ));
        this.$el.css("background", "white");


        //init map

        var self = this;
        //use a timeout b/c it hasn't been added to dom yet, which causes a leaflet error
        setTimeout( function() {

            var map = L.map('map'+self.model.factual_id, {
                center: [window.GeoWatcher.position.latitude, window.GeoWatcher.position.longitude],
                zoom: 15
            });


            var osmMapAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
            var osmDataAttr = 'Map data ' + osmMapAttr;

            var tileURL = 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
                attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' + osmDataAttr,
                tileLayer = new L.TileLayer(tileURL, {attribution:attribution, subdomains:['a','b','c','d'], minZoom:0, maxZoom:20});

            map.addLayer(tileLayer);


            var markersLayer = new L.LayerGroup();
            var southWestBounds, northEastBounds, bounds;

            var myIcon = L.icon({
                iconUrl: './libs/leaflet/images/marker-icon-red.png',
                shadowUrl: './libs/leaflet/images/marker-shadow.png',
                iconSize: new L.Point(25, 41),
                iconAnchor: new L.Point(13, 41),
                popupAnchor: new L.Point(1, -34),
                shadowSize: new L.Point(41, 41)
            });


            var marker = new L.Marker([window.GeoWatcher.position.latitude, window.GeoWatcher.position.longitude], {icon: myIcon});
            var popupContent = "You are here";

            var popup = marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
            markersLayer.addLayer(marker);

            southWestBounds = { lat:window.GeoWatcher.position.latitude, lon:window.GeoWatcher.position.longitude};
            northEastBounds = { lat:window.GeoWatcher.position.latitude, lon:window.GeoWatcher.position.longitude};

            if ( self.model ) {

                    var poi = self.model;

                    var lat = poi.latitude;
                    var lon = poi.longitude;
                    if ( lat != "" && lon != "" ) {

                        var latLng = new L.LatLng(lat, lon);
                        var marker = new L.Marker(latLng);

                        var popupContent = poi.name;

                        var popup = marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
                        markersLayer.addLayer(marker);

                        southWestBounds.lat = Math.min( southWestBounds.lat, lat );
                        southWestBounds.lon = Math.min( southWestBounds.lon, lon );
                        northEastBounds.lat = Math.max( northEastBounds.lat, lat );
                        northEastBounds.lon = Math.max( northEastBounds.lon, lon );

                    }


                var bufferLL = 0.002;
                var southWest = new L.LatLng(southWestBounds.lat - bufferLL, southWestBounds.lon + bufferLL),
                    northEast = new L.LatLng(northEastBounds.lat + bufferLL, northEastBounds.lon - bufferLL),
                    bounds = new L.LatLngBounds(southWest, northEast);

                map.addLayer(markersLayer);

                map.fitBounds(bounds);

                var startEvent = NativeUtil.touchSupported() ? "touchstart" : "mousedown";
                //console.log( startEvent );
                $("#map" + self.model.factual_id).bind( startEvent, function(event){
                    event.stopPropagation();
                    event.preventDefault();
                    return false;
                } )
            }

            self.map = map;
            self.tileLayer = tileLayer;
            self.markersLayer = markersLayer;


            self.$el.find('#mapContainer').find("a").bind( "click", self.openExternalLink );

        }, 500 );

        return this;
    },
    
    getDirections: function(event) {
        NativeUtil.getDirections( this.model.latitude, this.model.longitude );
    },
    
    webSearch: function(event) {
        NativeUtil.webSearch( this.model.name +", "+ this.model.address + ", " + this.model.locality );
    },

    websiteClick: function(event) {
        var target = $( event.target );
        var href = target.attr("href");
        NativeUtil.openExternalURL(href);

        event.preventDefault();
        event.stopPropagation();
        return false;
    },

    openExternalLink:function (event) {

    	if ( !this.lastTimestamp || (new Date().getTime()-this.lastTimestamp) > 500) {
	    
	        var target = $( event.target )
	        if (!target.hasClass("maplink")) {
	            var href = target.attr("href");
	            if ( href != "#"  && href.length > 0 ) {
	                NativeUtil.openExternalURL( href );
	                event.stopImmediatePropagation();
	                event.preventDefault();
	                event.cancelBubble();
	                return false;
	            }
	        }
	    }
        this.lastTimestamp = new Date().getTime();
    }
});