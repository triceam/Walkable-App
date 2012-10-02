templates.listItemView = "app/views/ListItemView.html";

window.ListItemView = Backbone.View.extend({

    tagName:'li',
    template:undefined,
    
    initialize: function(options) {
    
        this.template = _.template( templates.listItemView ),
        this.render();
        this.view = this.$el;
    },  
    
    events:{
    },
    
    render:function (eventName) {
        var model = this.model;
        this.$el.html( this.template( model ));
        this.$el.attr('id', model.factual_id );
        return this;
    }
});