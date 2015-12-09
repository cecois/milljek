var PostsListView = Backbone.View.extend({
    el: "#postslist-posts",
    template: Handlebars.templates['postsListViewTpl'],
    events: {
        "click li": "log",
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
        // this.listenTo(this.collection,'change',this.render)
        // this.listenTo(this.collection,'add',this.render)
        // this.listenTo(this.collection,'reset',this.render)
        // this.collection.on('change', this.render, this);
        return this
    }
    ,
    log: function(e){

e.preventDefault()
var di = $(e.currentTarget).attr("data-id")

        var the = this.collection.findWhere({id:di})
        console.log(the.toSource());
        return this
    } //log
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

console.log("collx at beginning of PLV render:"); console.log(this.collection.models);

            $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));


        return this
    }

});