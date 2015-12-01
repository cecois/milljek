var PostsActiveView = Backbone.View.extend({
    el: "#posts-active",
    template: Handlebars.templates['postsActiveViewTpl'],
    events: {
    },
    initialize: function() {
        this.render()
        this.listenTo(this.collection,'change:active',this.render)
        return this
    },
    render: function() {
       
       var a = this.collection.findWhere({"active":true})

       if(typeof a !== 'undefined' && a !== null){
                  
                   $(this.el).html(this.template(a.toJSON()))} else {
                    $(this.el).html("no active post")
                   }
       
        return this
    }

});