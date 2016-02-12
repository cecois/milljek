var State = Backbone.Model.extend({
    defaults: {
        "q": null,
        "slug": null,
        "panestate":1, // or 0 for collapsed
        "tab":"about", // prefix this with menu-a for use
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
        // this.listenTo(appQuery, 'change:solrstring', this.test_appquerysolrstring)
        this.listenTo(appQuery, 'change:solrstring', this.update_q)
        // this.on('change:ap', this.test_thisapchange, this)
        this.on('change:bbox', this.update_m, this)
        this.on('change', this.update, this)
        return this
    },
    test_appquerysolrstring: function() {
        console.log("State: appQuery.solrstring changed - url should change AND followed");
    },
    test_mapmoveend: function() {
        console.log("State: map moved - url should change");
    },
    test_thisapchange: function() {
        console.log("State: appstate ap changed - url should change AND followed");
    },
    update_m: function(){

appRoute.navigate(this.pullurl())
return this

    },
    update_q: function(){


this.set({
                q: appQuery.get("solrstring"),
                ap:
                {"slug":null,"geomid":null}

            });


return this
    },
    update: function() {
            console.log("State: updating in State...");

            appRoute.navigate(this.pullurl(), {trigger: true})
        } //update
        ,
    pullurl: function() {
        var aslug = this.get("ap").slug
        var abbox = this.get("bbox")
        var state =
            //thishost+"/#"+
            appQuery.get("solrstring") + "/" + aslug + "/" + abbox + "/pencil"
        return state
    }
});