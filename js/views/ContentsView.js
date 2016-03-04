var ContentsView = Backbone.View.extend({
    // el: $("#about-container"),
    el: null,
    template: function() {
        var tst = this.options.cf.toUpperCase() + "ViewTpl"
        return Handlebars.templates[tst]
    },
    events: {
        "click .copy-trigger": "trigger",
    },
    initialize: function(options) {
        this.options = options;
        console.log("setting el with this.options in CView init");
        this.el = $("#" + this.options.cf + "-container")
        this.listenTo(this.collection, 'sync', this.dbsync)
        this.listenTo(this.collection, 'change', this.dbchange)
        return this
    },
        dbsync: function(){

        console.log("in dbsync of CAV");
        return this

    },
    dbchange: function(){

        console.log("in dbchange of CAV");
        return this

    },
    //     splitem: function(){
    // console.log("da og");console.log(this.collection);
    // var that = this
    // var deez = _.filter(this.collection.models, function(e) {
    //             return e.get("id").split("-")[0]== that.options.cf;
    //         })
    // console.log("deez:");console.log(deez);
    // // var deez = this.collection.
    // return deez
    //     },
    render: function() {
        // var deezmodz = this.splitem()
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        return this
    },
    render_error: function() {
        $(this.el).html(this.options.cf + " view errored out");
        return this
    }
});