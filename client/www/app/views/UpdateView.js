templates.updateView = "app/views/UpdateView.html";

window.UpdateView = Backbone.View.extend({

    title: "About",
    backLabel: "Back",
    
    initialize: function(options) {
        this.render();
        this.view = this.$el;
    },  
    
    events:{
    },
    
    render:function (eventName) {
        this.$el.html(templates.updateView);
        return this;
    }
});