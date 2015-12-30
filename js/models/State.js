var State = Backbone.Model.extend({
    defaults: {
        "q": null,
        "slug": null,
        "bbox": null,
        "basemap": null,
        "ap": {
            "slug": null,
            "geomid": null
        }
    },
    initialize: function(options) {
        options || (options = {});
        // this.listenTo(appQuery, 'change:rawstring', this.update)
        this.listenTo(appQuery, 'change:solrstring', this.test_appquerysolrstring)
        this.on('change:ap', this.test_thisapchange, this)
        return this
    },
    test_appquerysolrstring: function() {
        console.log("State: appQuery.solrstring changed");
    },
    test_mapmoveend: function() {
        console.log("State: map moved");
    },
    test_thisapchange: function() {
        console.log("State: appstate ap changed");
    },
    update: function() {
            console.log("State: updating in State...");
            this.set({
                q: appQuery.get("solrstring"),
            });
            appRoute.navigate(this.pullurl())
        } //update
        ,
    pullurl: function() {
        var aslug = this.get("ap").slug
        var state =
            //thishost+"/#"+
            appQuery.get("solrstring") + "/" + aslug + "/" + map.getBounds().toBBoxString() + "/pencil"
        return state
    }
});