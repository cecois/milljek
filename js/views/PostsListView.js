var PostsListView = Backbone.View.extend({
    el: "#postslist-posts",
    template: Handlebars.templates['postsListViewTpl'],
    events: {
        "click li": "log",
        "click li": "activate",
    },
    // activate: function(e) {
    //         e.preventDefault()
    //         var dt = $(e.currentTarget).attr("data-id")
    //             // AP=
    //         appState.set({
    //             "slug": dt
    //         })
    //         return this
    //     } //activate
    //     ,
    initialize: function() {
        // this.render()
        this.listenTo(this.collection, 'add', this.render)
        this.listenTo(this.collection, 'change:active', this.render)
            // this.listenTo(this.collection,'reset',this.render)
            // this.collection.on('change', this.render, this);
        return this
    },
    log: function(e) {
            e.preventDefault()
            var di = $(e.currentTarget).attr("data-id")
            var the = this.collection.findWhere({
                id: di
            })
            console.log(the);
            return this
        } //log
        ,
    activate: function(e) {
            e.preventDefault()
            var ds = $(e.currentTarget).attr("data-id")
            var dg = $(e.currentTarget).attr("data-target")
            // var dg = ???
                // AP=
            appState.set({ap:
                {"slug":ds,"geomid":dg}
            })
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