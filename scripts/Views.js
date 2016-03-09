var PostsView = Backbone.View.extend({
    el: ".post-list",
    template: Handlebars.templates['postsListViewTpl'],
    events: {
        // "click li": "log",
        "click li": "activate"
    },
    initialize: function() {
        this.listenTo(this.collection, 'change:active', this.render);
        return this
    },
    log: function(e) {
        if(verbose==true){ console.log("in log of PV, e.target:"); console.log($(e.currentTarget)); }
        e.preventDefault()
        var di = $(e.currentTarget).attr("data-id")

        return this
        } //log
        ,
        activate: function(e) {
            e.preventDefault()


            var ds = $(e.currentTarget).attr("data-id")
            var dg = $(e.currentTarget).attr("data-target")

            appState.set({"slug":ds})

            return this
        } //activate
        ,
        render: function() {
            $(this.el).html(this.template({
                count: this.collection.models.length,
                rows: this.collection.toJSON()
            }));
            return this
        }
    });