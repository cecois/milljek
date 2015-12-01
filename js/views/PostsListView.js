var PostsListView = Backbone.View.extend({
    el: "#postslist-posts",
    template: Handlebars.templates['postsListViewTpl'],
    events: {
        "click li": "activate",
    },
    activate: function(e){

e.preventDefault()

var dt = $(e.currentTarget).attr("data-id")

// AP=
appState.set({"slug":dt})

return this


    }//activate
    ,
    initialize: function() {
        this.render()
        this.listenTo(this.collection,'change',this.render)
        return this
    },
    render: function() {
       
            $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
       
        return this
    }

});