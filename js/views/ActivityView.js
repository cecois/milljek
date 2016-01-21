var ActivityView = Backbone.View.extend({
    el: $("#activityContainer"),
    template: Handlebars.templates['activityViewTpl'],
    events: {
        "click .activity-cancel": "stfu",
    },
    initialize: function() {
        NProgress.configure({
            // parent: "#postslist-container"
            // parent: "#search-container"
            parent: "#activityContainer"
        });
        this.model.bind("change", this.render, this);
        // this.listenTo(appPosts,'request',this.render)
        // this.listenTo(appPosts,'change',this.stfu)
    },
    stfu: function(delay) {
        NProgress.done()

        $(this.el).addClass("hidden")
        $(this.el).removeClass('warn')
        return this
    },
    warn: function() {
        NProgress.done()
        $(this.el).addClass('warn')
        setTimeout(_.bind(this.stfu, this), 4000);
        return this
    },
    render: function() {
        if (verbose == true) {
            console.log("rendering activityview")
        }
        $(this.el).removeClass("hidden")
        NProgress.start();
        $(this.el).html(this.template(this.model.toJSON()))
        return this
    }
});