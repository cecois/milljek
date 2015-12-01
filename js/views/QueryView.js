var QueryView = Backbone.View.extend({
    el: null,
    template: Handlebars.templates['queryViewTpl'],
    events: {
    },
    initialize: function() {
    },
    render: function() {
        if (verbose == true) {
            console.log("rendering QueryView")
        }
        
        return this
    }
});