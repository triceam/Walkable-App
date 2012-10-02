templates.cuisineView = "app/views/CuisineView.html";

window.CuisineView = Backbone.View.extend({

    destructionPolicy:'never',
    title: "Select A Cuisine",
    backLabel: "Back",
    //cuisines:[ "Afghan", "American", "Argentine", "Asian", "Austrian", "Bagels", "Bakery", "Barbecue", "Belgian", "Bistro", "Brazilian", "British", "Buffet", "Burgers", "Cafe", "Cajun", "Californian", "Calzones", "Cambodian", "Caribbean", "Catering", "Cheesesteaks", "Chicken", "Chinese", "Chowder", "Coffee", "Colombian", "Contemporary", "Continental", "Creole", "Crepes", "Cuban", "Cuban", "Czech", "Deli", "Dim Sum", "Diner", "Dominican", "Donuts", "Eastern European", "Eclectic", "English", "Ethiopian", "European", "Fast Food", "Filipino", "Fish and Chips", "Fondue", "French", "Frozen Yogurt", "Fusion", "Gastropub", "German", "Greek", "Grill", "Gyros", "Haitian", "Halal", "Hawaiian", "Healthy", "Hookah Bar", "Hot Dogs", "Ice Cream", "Indian", "Indonesian", "International", "Irish", "Israeli", "Italian", "Japanese", "Juices", "Korean", "Korean Barbeque", "Kosher", "Latin", "Latin American", "Lebanese", "Malaysian", "Mediterranean", "Mexican", "Middle Eastern", "Mongolian", "Moroccan", "Nepalese", "Noodle Bar", "Norwegian", "Organic", "Oysters", "Pacific Rim", "Pakistani", "Pan Asian", "Pasta", "Pasteries", "Persian", "Peruvian", "Pho", "Pizza", "Polish", "Polynesian", "Portuguese", "Pub Food", "Puerto Rican", "Ribs", "Salad", "Salvadoran", "Sandwiches", "Seafood", "Singaporean", "Smoothies", "Soul Food", "Soup", "South American", "South Pacific", "Southern", "Southwestern", "Spanish", "Steak", "Subs", "Sushi", "Taiwanese", "Tapas", "Tea", "Tex Mex", "Thai", "Tibetan", "Traditional", "Turkish", "Ukrainian", "Vegan", "Vegetarian", "Venezuelan", "Venusian", "Vietnamese", "Wings", "Wraps" ],


    initialize: function(options) {

        //this.model = options.result;

        this.render();
        this.view = this.$el;
    },  
    
    events:{
        "click ul":"listItemClick"
    },
    
    render:function (eventName) {
        /*var template = _.template(templates.cuisineView);
        var html = template({model:{cuisines:this.cuisines}});*/
        this.$el.html(templates.cuisineView);
        //this.$el.addClass("gpu")
        
        return this;
    },
    
    listItemClick: function( event ) {

        this.$el.find( "li" ).removeClass( "listSelected" );
        var target = $( event.target )
        if (target.get(0).nodeName.toUpperCase() != "LI") {
            target=target.parent();
        }
        
        target.addClass( "listSelected" );


        var view = new SearchView( {searchString:target.text()} );
        window.viewNavigator.pushView( view );
    }
});