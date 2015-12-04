var PostsView = Backbone.View.extend({
    el: "#postslist-posts",
    // template: Handlebars.templates['postsListViewTpl'],
    template_list: Handlebars.templates['postsListViewTpl'],
    events: {
        "click li": "activate",
    },
    initialize: function() {
         // this.render()
         this.listenTo(this.collection,'change',this.render)
        this.listenTo(this.collection,'add',this.render)
        // this.listenTo(this.collection, 'sync', this.render)
        return this
    },
    refetch: function(url){

// console.log("refetch url:");
        // console.log(url);

    } //refetch
    ,
    activate: function(e){

e.preventDefault()

var dt = $(e.currentTarget).attr("data-id")

// AP=
appState.set({"slug":dt})

return this


    }//activate
    ,

//         merge: function(){

// this.collection = _.merge

// return this
// .render()
//         }//merge
//         ,
    render: function() {
        
        $(this.el).html(this.template_list({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        // 
        $("#postsgeom-fake").html("<a href='"+appQuery.get("cartostring")+"'>"+appQuery.get("cartostring")+"</a>"
            );
        return this
    }
});