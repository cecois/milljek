var AuditView = Backbone.View.extend({
    el: $("#auditContainer"),
    events: {},
    initialize: function() {
        // this.render();
        // this.listenTo(appPosts,'change',this.render)
        // this.listenTo(appQuery,'change',this.render)
    },
    render: function() {
        if (verbose == true) {
            console.log("rendering AuditView")
        }
        $(this.el).removeClass("hidden")
        $(this.el).html("appActivity:" + appActivity.attributes.toSource() + "<br/>" + "appQuery:" + appQuery.attributes.toSource() + "<br/>" + "appBasemap:" + appBasemap.attributes.toSource() + "<br/>" + "appPosts.length:" + appPosts.length + "<br/>"); //this.el.html
        appActivityView.stfu()
        return this
    }
});