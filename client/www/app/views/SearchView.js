templates.searchView = "app/views/SearchView.html";

window.SearchView = Backbone.View.extend({

    title: "Searching...",

    initialize: function(options) {

        this.render();
        this.view = this.$el;

        if(GeoWatcher.isValidLocation()) {
            var self = this;
            this.searchString = options.searchString;

            this.onSearchResult = function(result){
                self.searchResult(result);
            }
            this.onSearchError = function(error){
                self.searchError(error);
            }

            //delay long enough for transition to complete
            setTimeout(function(){SearchManager.search( self.searchString, self.onSearchResult, self.onSearchError );}, 401 );
        }
        else {
            var view = new InvalidLocationView();
            window.viewNavigator.pushView( view );
        }
    },

    events:{
    },

    render:function (eventName) {
        this.$el.html(templates.searchView);

        this.$el.css("height", "100%");
        return this;
    },

    searchResult: function(result) {
        //console.log(result);

        try {
            var jsonResult = JSON.parse(result);
            var view = new SearchResultsView({ model:jsonResult, searchString:this.searchString });
            window.viewNavigator.replaceView( view );
        }
        catch(e){
            alert(e.toString())
        }
    },

    searchError: function(error) {
       // console.log(error);
        var self = this;

        //wait for transition to finish, then cleanup once removed from view
        setTimeout(function(){

            var view = new SearchResultsView({ model:{points:[], polygons:[]}, searchString:self.searchString });
            window.viewNavigator.replaceView( view );
        }, 550 );
    }



});