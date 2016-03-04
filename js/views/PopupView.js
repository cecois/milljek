var PopupView = Backbone.View.extend({
    // el: $("#activityContainer"),
    template: Handlebars.templates['hitBackboneViewTpl'],
    initialize: function() {
        this.ogwidth = null;
        // this.model.bind("change", this.render, this);
        // this.model.bind("change", this.triage, this);
        // this.listenTo(appCBB, 'change:active', this.triage);
        return this.render();
    },
    events: {
        "click .pu-slug-trigger": "read",
        // "click .bt-cartoobj-feedback": "ghsubmit",
        // "click .bt-cartoobj-leafletcloser": "reset"
        // "click button[type='submit']": "issue_submit",
        // "click .btn-pu-nav": "navinternal"
    },
    read: function(e){

e.preventDefault()

 var ds = $(e.currentTarget).attr("data-id")
            var dg = $(e.currentTarget).attr("data-target")


appState.set({ap:
                {"slug":ds,"geomid":dg}
            })

return this
    },
    rewire: function() {
        // wire up those tooltips
        // $(this.el).find('[data-toggle="tooltip"]').tooltip({
        //         position: "right"
        //     })
            // and the submit button
            //
            // $(this.el).find("button[type='submit']").click(function(t){
            // this.issue_submit()
            // });
            return this
            // .triage()
    },
    render: function() {
        // bc we'll be messing with this width once in a while, we sock away the original
        this.ogwidth = $(".leaflet-popup-content").width()
        $(this.el).html(this.template(this.model.toJSON()))
        return this
        // .triage()
    }
});