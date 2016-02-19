var ContentsMasterView = Backbone.View.extend({
    el: null,
    template: Handlebars.templates['contentsSubViewTpl'],
    events: {},
    initialize: function() {
        // this.render()
        this.listenTo(this.collection, 'reset', this.render)
        this.listenTo(this.collection, 'change', this.render)
        return this
    },
        activate:function(slug){
// a proxy activator: helps decide in which actual collection the slug will activate a model

// because jekyll dashes its slugs, we know the first index is the cateogry
var a = slug.split("-")[0]

if(a=="about"){
    appContentsAbout.activate(slug)
}

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