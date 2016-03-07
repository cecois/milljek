var PostsView = Backbone.View.extend({
    el: "#post-list",
    template: Handlebars.templates['postsListViewTpl'],
    events: {
        "click li": "log",
        "click li": "activate"
    },
    query: function(q){


            var q = q
appQuery.set({"rawstring":q})
return this

    },
    initialize: function() {
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