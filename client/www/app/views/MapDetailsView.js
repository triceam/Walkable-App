templates.mapDetailsView = "app/views/MapDetailsView.html";

window.MapDetailsView = Backbone.View.extend({

    title: "Information",
    backLabel: "Back",
    
    initialize: function(options) {
        this.render();
        this.view = this.$el;
    },  
    
    events:{
    },
    
    render:function (eventName) {
        this.$el.html(templates.mapDetailsView);
        return this;
    }
});