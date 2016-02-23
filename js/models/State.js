var State = Backbone.Model.extend({
    defaults: {
        "q": null,
        "slug": null,
        "panestate": 1, // or 0 for collapsed
        "tab": "about", // prefix this with menu-a for use
        "bbox": null,
        "basemap": null,
        "geom":null
        // "ap": {
        //     "slug": null,
        //     "geomid": null
        // }
    },
    initialize: function(options) {
        options || (options = {});
        // this.listenTo(appQuery, 'change:rawstring', this.update)
        // this.listenTo(appQuery, 'change:solrstring', this.test_appquerysolrstring)
        // this.listenTo(appQuery, 'change:solrstring', this.update_q)
        this.listenTo(appBaseLayers, 'change', this.update_b),
        // this.listenTo($("div.bhoechie-tab-menu>div.list-group>a"), 'click', this.update_t),
            // this.on('change:ap', this.test_thisapchange, this)
            // this.on('change:bbox', this.update, this),
            // this.on('change:panestate', this.update, this),
            this.on('change', this.update, this)
        return this
    },
    update_m: function() {
        appRoute.navigate(this.pullurl())
        return this
    },
    update_b: function() {
        var tl = appBaseLayers.findWhere({
            active: true
        })
        this.set({
            basemap: tl.get("name")
        })
        return this
    }, //update_b
    update_t: function() {
        
// $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        // e.preventDefault();
        // console.log("e:");console.log(e);
        // $(e).siblings('a.active').removeClass("active");

        // $(this).addClass("active");
        // var index = $(this).index();
        // $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        // $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");


var tabstring = "yoyoyo";

        this.set({
            tab: tabstring
        })
        return this
    }, //update_b
    // update_q: function() {
    //     this.set({
    //         // q: appQuery.get("solrstring"),
    //         ap: {
    //             "slug": null,
    //             "geomid": null
    //         }
    //     });
    //     return this
    // },
    update: function() {
            appRoute.navigate(this.pullurl(), {
                trigger: true
            })
        } //update
        ,
    pullurl: function() {
        // var aslug = this.get("ap").slug
        var aslug = this.get("slug")
        var abbox = this.get("bbox")
        var apanestate = this.get("panestate")
        var aagob = this.get("agob")
        var apane = this.get("pane")
        var abase = this.get("basemap")
        var atab = this.get("tab")
        var state =
            //thishost+"/#"+
            // appQuery.get("solrstring") + "/" + apane + "/" + aslug + "/" + abbox + "/" + apanestate + "/" + aagob + "/" + abase
            "#"+ aslug + "/" + abbox + "/" + atab +"/" + apanestate + "/" + aagob + "/" + abase
        return state
    }
});