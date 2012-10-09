templates.mapView = "app/views/MapView.html";

window.MapView = Backbone.View.extend({

    title: "Map",
    backLabel: "Back",
    scroll:false,
    
    initialize: function(options) {
        this.render();
        this.view = this.$el;
        this.initMap();
    },
    
    events:{
        "click a":"openExternalLink"
    },
    
    render:function (eventName) {
        this.$el.width( "100%" );
        this.$el.height( "100%" );
        this.$el.html(templates.mapView);

        this.headerActions = $("<li class='btn btn-inverse' style='padding: 5px 5px;'><i class='icon-info-sign icon-white'></i></li>");

        var self = this;
        this.headerActions.on( "click", function(event){
            self.headerButtonClick(event);
        } )
        return this;
    },
    
    showPOIDetail: function(id) {
        //console.log(id);
        var poi = SearchManager.findPointById( id, this.model.points );
        var detailView = new ItemDetailView( {model: poi} );
        window.viewNavigator.pushView( detailView );
    },
    
    initMap:function() {
        var self = this;
        //use a timeout b/c it hasn't been added to dom yet, which causes a leaflet error
        setTimeout( function() {
        
            window.showDetail = function(id) {
                self.showPOIDetail(id);
            }
            self.showCallback = self.restoreMapCallback;


            var map = L.map('map', {
                center: [window.GeoWatcher.position.latitude, window.GeoWatcher.position.longitude],
                zoom: 15
            });

            var osmMapAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
            var osmDataAttr = 'Map data ' + osmMapAttr;

            var tileURL = 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
                attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' + osmDataAttr,
                tileLayer = new L.TileLayer(tileURL, {attribution:attribution, subdomains:['a','b','c','d'], minZoom:0, maxZoom:20});
            
            map.addLayer(tileLayer);

            if ( self.model.polygons && self.model.polygons.length ) {

                for (var x=0; x<self.model.polygons.length; x++ ) {
                    map.addLayer( new L.Polygon([self.getBounds(), self.array2Leaflet(self.model.polygons[x])], {
                        stroke:true,
                        color:"#0F0",
                        opacity:0.5,
                        fill:true,
                        fillColor:"#000",
                        fillOpacity:0.45
                    }) );
                }
            }

            
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

            if ( self.model.points && self.model.points.length ) {
            
                for ( var x=0; x<self.model.points.length; x++ ) {
                    var poi = self.model.points[x];
                    
                    var lat = poi.latitude;
                    var lon = poi.longitude;
                    if ( lat != "" && lon != "" ) {
                    
                        var latLng = new L.LatLng(lat, lon);
                        var marker = new L.Marker(latLng);
            
                        var popupContent = "<a class='button maplink' id='mapMarker' href='javascript:showDetail(\"" + poi.factual_id + "\")'>" + poi.name + "</a>";
                        
                        var popup = marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
                        markersLayer.addLayer(marker);
                        
                        if ( !southWestBounds ) {
                            southWestBounds = { lat:lat, lon:lon};
                            northEastBounds = { lat:lat, lon:lon};
                        }
                        else {
                            southWestBounds.lat = Math.min( southWestBounds.lat, lat );
                            southWestBounds.lon = Math.min( southWestBounds.lon, lon );
                            northEastBounds.lat = Math.max( northEastBounds.lat, lat );
                            northEastBounds.lon = Math.max( northEastBounds.lon, lon );
                        }
                    }
                }
                    
                if ( southWestBounds ) {
                    //console.log(southWestBounds, northEastBounds);
                    var southWest = new L.LatLng(southWestBounds.lat,southWestBounds.lon),
                        northEast = new L.LatLng(northEastBounds.lat,northEastBounds.lon),
                        bounds = new L.LatLngBounds(southWest, northEast);
                }
                map.addLayer(markersLayer);
            }
        
            if ( bounds ) {
                map.fitBounds(bounds);
            }
            self.map = map;
            self.tileLayer = tileLayer;
            self.markersLayer = markersLayer;

            self.$el.find("a").bind( "click", self.openExternalLink );

        
        }, 100 );
    },  
    
    restoreMapCallback: function() {
        return;
        //this is to work around a weird issue in Leaflet maps in iOS, where 
        //dragging stops working after a new view has been pushed onto the stack

        var map = this.map;
        var latLng = map.getCenter();
        var zoom = map.getZoom();
        map.removeLayer( this.tileLayer );
        map.removeLayer( this.markersLayer );
        
        $('#mapContainer').children().remove();
        $('#mapContainer').append( $("<div id='map' style='width:100%; height:100%'></div>") );
        map = new L.Map('map');
        
        map.addLayer( this.tileLayer );
        map.addLayer( this.markersLayer );
        map.setView( latLng, zoom, true );
        map.invalidateSize();
        self.map = map;
    },

    getBounds:function() {
        var points = [];
        var center = {latitude: window.GeoWatcher.position.latitude, longitude:window.GeoWatcher.position.longitude};

        var segments = 12;
        var interval = (2*Math.PI)/segments;
        var radius = 2;
        for (var x=0; x< segments; x++) {
            var angle = interval * x;
            var _lat = radius * Math.cos( angle );
            var _lon = radius * Math.sin( angle );
            points.push( [(center.latitude + _lat), (center.longitude + _lon) ] )
        }

        return this.array2Leaflet(points);
    },

    array2Leaflet:function(segments) {
        var result = [];

        for (var x=0; x< segments.length; x++) {
            result.push( new L.LatLng(segments[x][0], segments[x][1] ) );
        }

        return result;
    },

    polygons2Leaflet: function(polygons) {
        var res = [];
        for (var y=0; y<polygons.length; y++) {
            res.push( this.array2Leaflet(polygons[y]));
        }
        return res;
    },

    headerButtonClick: function (event) {

        var view = new MapDetailsView();
        window.viewNavigator.pushView( view );
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