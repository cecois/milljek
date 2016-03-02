var ContentsView = Backbone.View.extend({
    // el: $("#about-container"),
    el: null,
    template: Handlebars.templates['contentsAboutViewTpl'],
    events: {
        "click .copy-trigger": "trigger",
    },
    initialize: function(options) {

        this.options = options;

        console.log("setting el with this.options in CView init");
this.el=$("#"+this.options.cf+"-container")        
        // this.el=$("#"+this.options.cf+"-container");
        // this.render()
            // this.listenTo(this.collection, 'sync', this.render)
        // this.listenTo(this.collection, 'change', this.render)
        return this
    },
    splitem: function(){

var deez = this.collection.split(":")[1]
            var nfgroup = newfat.split(":")[0]

    },
    render: function() {
        
        var deezmodz = this.splitem()

        $(this.el).html(this.options.cf+" stuff goes here");

        return this
    },
    render_error: function() {
        $(this.el).html(this.options.cf+" view errored out");
        return this
    }
});