templates.homeView = "app/views/HomeView.html";

window.HomeView = Backbone.View.extend({

    title: "Walkable Restaurants",
    destructionPolicy:'never',

    initialize: function(options) {
        this.render();
        this.view = this.$el;
    },  
    
    events:{
        "click #search":"performSearch",
        "click #selectCuisine":"selectCuisine",
        "click .searchlink":"performSearchForLink"
    },
    
    render:function (eventName) {
        var template = _.template(templates.homeView);
        var model = {isTablet:NativeUtil.isTablet()};
        this.$el.html(template(model));

        if ( model.isTablet ) {
            this.$el.css("height", "100%");
            this.$el.css("margin", "0px");
            this.$el.css("padding", "0px");
            this.$el.find("#homeView").css("height", "100%");


            var wrapper = this.$el.find("#wrapper");
            wrapper.css("margin", "0px");
            wrapper.css("padding", "0px");
            
            var well = this.$el.find(".well");
            well.css("width", "460px");
            well.css("margin", "0px");
            well.css("padding", "30px");
            well.find(".input-append").css("max-width", "101%");

            well.css("position", "absolute");
            var hOffset = ($(window).width() - well.width())-70;
            
            hOffset = hOffset/2;
            /*
            if ( $(window).width() > 700) {
            	hOffset = hOffset/3;
            }
            else {
            	hOffset = hOffset/4;
            }*/
            
            well.css("left", hOffset+"px");
            well.css("top", "180px");
        }

        this.headerActions = $("<li class='btn btn-inverse' style='padding: 5px 5px;'><i class='icon-info-sign icon-white'></i></li>");

        var self = this;
        this.headerActions.on( "click", function(event){
            self.headerButtonClick(event);
        } )

        return this;
    },

    performSearch:function () {

    	if ( !this.lastTimestamp || (new Date().getTime()-this.lastTimestamp) > 500) {
	        var searchString = $("#searchString").val();
	
	        //todo: add error checking?
	        var view = new SearchView( {searchString:searchString} );
	        window.viewNavigator.pushView( view );
    	}
        this.lastTimestamp = new Date().getTime();
    },

    selectCuisine:function () {

        var view = new CuisineView();
        window.viewNavigator.pushView( view );
    },

    performSearchForLink:function (event) {

        var target = $( event.target )
        var searchString = target.text();
        $("#searchString").val(searchString);

        this.performSearch();
    },

    headerButtonClick: function (event) {

        var view = new AboutView();
        window.viewNavigator.pushView( view );
    }
});