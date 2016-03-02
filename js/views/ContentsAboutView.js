var ContentsAboutView = Backbone.View.extend({
    el: $("#about-container"),
    template: Handlebars.templates['contentsAboutViewTpl'],
    events: {
        "click .copy-trigger": "trigger",
    },
    initialize: function(options) {

        this.options = options;
        // this.el=$("#"+this.options.cf+"-container");
        this.render()
            // this.listenTo(this.collection, 'sync', this.render)
        this.listenTo(this.collection, 'change', this.render)
        return this
    },
    wirescroll: function(azid) {

        console.log("azid in wirescroll:");console.log(azid);
        
        $(this.el).find("li.section").each(function(index, el) {
            var elementWatcher = scrollMonitor.create(el);
            elementWatcher.enterViewport(function() {
        console.log("azid in wirescroll event:");console.log(azid);

                                appState.set({slug:$(el).attr("data-id")})

            });
            // elementWatcher.exitViewport(function() {
            //     console.log('I have left the viewport');
            //     console.log(el);
            // });
        });
        return this
    },
    trigger: function(ev) {
        $(ev.currentTarget).addClass("seen")
        ev.preventDefault()
        var trtyp = $(ev.currentTarget).attr("data-type")
        var trdat = $(ev.currentTarget).attr("data-id")
        copyTriggerTrigger(trtyp, trdat)
        return this
    },
    scroll: function(az) {
        var azid = az.get("id")
        $('body,html').animate({
            scrollTop: $('li.section[data-id="' + azid + '"]').offset().top
        }, 0);
        return this
        // .wirescroll(azid)
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
            return this
            .scroll(az)
            // .wirescroll()
        } else {
            return this
            // .wirescroll()
        }
    },
    render_error: function() {
        $(this.el).html("this view errored out");
        return this
    }
});