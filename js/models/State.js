var State = Backbone.Model.extend({
    defaults: {
        "q": null,
        "slug": null,
        // "panestate": 1, // or 0 for collapsed
        "panestate": "out", // or 0 for collapsed
        "tab": "about", // prefix this with menu-a for use
        "bbox": null,
        "basemap": null,
        "agobs":[],
        "agob":null,
        "gobseens":[]
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
            this.on('change:bbox', this.update, this),
            this.on('change:panestate', this.update, this),
            this.on('change:tab', this.update, this),
            this.on('change:slug', this.update, this),
            this.on('change:agobs', this.update, this),
            this.on('change:gobseen', this.update, this)
            // this.on('change', this.nonny, this)
        return this
    },
    gobsdebug: function(){

        console.log("agobs");
        console.log(this.get("agobs"));
        console.log("gobseens");
        console.log(this.get("gobseens"));

        return this

    },
    nonny: function(){
        console.log("url would be:");
        console.log(this.pullurl());
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
update_s: function() {

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
                // trigger: true
            })
        } //update
        ,
        pullagobstring: function(){


var str = this.get("agobs")

if(str.length==1){
    return str
} else if(str.length==0){
    return ''

    }
    else {
            return str.join(",")
        }

        },
    pullurl: function() {
        // var aslug = this.get("ap").slug
        var aslug = this.get("slug")
        var abbox = this.get("bbox")
        var apanestate = this.get("panestate")
        var agobs = this.pullagobstring()
        var apane = this.get("pane")
        var abase = this.get("basemap")
        var atab = this.get("tab")
        var state =
            //thishost+"/#"+
            // appQuery.get("solrstring") + "/" + apane + "/" + aslug + "/" + abbox + "/" + apanestate + "/" + aagob + "/" + abase
            "#"+ aslug + "/" + abbox + "/" + atab +"/" + apanestate + "/" + agobs
             // + "/" + abase
        return state
    }
});