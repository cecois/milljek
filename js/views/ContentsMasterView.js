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
    render: function() {

$(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));

        return this
    }
});