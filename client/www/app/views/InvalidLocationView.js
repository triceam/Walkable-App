templates.invalidLocation = "app/views/InvalidLocationView.html";

window.InvalidLocationView = Backbone.View.extend({

    title: "Error",
    backLabel: "Back",
    
    initialize: function(options) {
        this.render();
        this.view = this.$el;
    },  
    
    events:{
    },
    
    render:function (eventName) {
        this.$el.html(templates.invalidLocation);
        return this;
    }
});