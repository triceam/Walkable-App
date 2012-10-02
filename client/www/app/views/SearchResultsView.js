templates.searchResults = "app/views/SearchResultsView.html";

window.SearchResultsView = Backbone.View.extend({

    destructionPolicy:'never',
    title: "What's Nearby?",
    backLabel: "Back",
    
    initialize: function(options) {

        //this.model = options.result;
        this.searchString = options.searchString;

        this.render();
        this.view = this.$el;
    },  
    
    events:{
        "click li":"listItemClick",
        "click #mapView":"showMapView"
    },
    
    render:function (eventName) {
        var template = _.template(templates.searchResults);
        this.$el.css("background", "white");
        this.$el.html(template( {searchString:this.searchString, points:this.model.points, walking:(this.model.polygons.length > 0)} ));
        var $list = this.$el.find("#list");

        var self = this;
        var index = 1;
        _.each(this.model.points, function (poi) {
            poi.__index = index;
            poi.__svgColor = window.POIUtil.getCalculatedColor(poi);
            $list.append(new ListItemView({model:poi}).render().el);
            index += 1;
        }, this);
        
        return this;
    },
    
    showMapView: function(event) {
        var mapView = new MapView({model:this.model})
        window.viewNavigator.pushView( mapView );
    },
    
    listItemClick: function( event ) {
        //console.log(event);
        
        this.$el.find( "li" ).removeClass( "listSelected" );
        var target = $( event.target )
        while (target.get(0).nodeName.toUpperCase() != "LI") {
            target=target.parent();
        }
        
        target.addClass( "listSelected" );
        var id = target.attr( "id" );
        var poi = SearchManager.findPointById( id, this.model.points );
        //console.log( poi );
        
        var detailView = new ItemDetailView({model:poi})
        window.viewNavigator.pushView( detailView );
        
    }
});