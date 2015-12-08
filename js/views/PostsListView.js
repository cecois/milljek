var PostsListView = PostsMetaView.extend({
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
        // this.render()
        this.listenTo(this.collection,'change',this.render)
        this.listenTo(this.collection,'add',this.render)
        // this.listenTo(this.collection,'reset',this.render)
        // this.collection.on('change', this.render, this);
        return this
    }
    ,
    activate: function(e){

e.preventDefault()

var dt = $(e.currentTarget).attr("data-id")

// AP=
appState.set({"slug":dt})

return this


    }//activate
    ,
    render: function() {

            $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
       
        return this
    }

});