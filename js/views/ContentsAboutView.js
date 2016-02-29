var ContentsAboutView = Backbone.View.extend({
    el: $("#about-container"),
    template: Handlebars.templates['contentsAboutViewTpl'],
    events: {},
    initialize: function(options) {
        this.options = options;
        // this.el=$("#"+this.options.cf+"-container");
        this.render()
            // this.listenTo(this.collection, 'sync', this.render)
        this.listenTo(this.collection, 'change', this.render)
        return this
    },
    // activate:function(){
    // a proxy activator: helps decide in which actual collection the slug will activate a model
    // var a = appState.get("slug")
    // if(a=="about"){
    //     appContentsAbout.activate(slug)
    // }
    // return this
    //     },
    scroll: function(az) {
        var azid = az.get("id")
            // $(selector).scrollTop(position)
        // $('body,html').animate({
        $('#active-container').animate({
            scrollTop: $('[data-id="' + azid + '"]').offset().top
        }, 500);
        return this
    },
    render: function() {
        var az = this.collection.findWhere({
            active: true
        })
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        if (typeof az !== 'undefined') {
            return this.scroll(az)
        } else {
            return this
        }


    },
    render_error: function() {
        $(this.el).html("this view errored out");
        return this
    }
});