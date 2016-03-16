var State = Backbone.Model.extend({
    defaults: {
        "q": null,
        // "slug": "about-cover-letter-gloss",
        "slug": "im-this-first-thing",
        // "panestate": 1, // or 0 for collapsed
        "panestate": "out", // or 0 for collapsed
        // "tab": "about", // prefix this with menu-a for use
        "bbox": null,
        "basemap": null,
        "agobs": [],
        "agob": null,
        "gobseens": []
    },
    initialize: function(options) {
        options || (options = {});
        if(verbose==true){ console.log("initing State");}
        //         this.listenTo(appBaseLayers, 'change', this.update_b),
        // this.up_slug()
        this.on('change:slug', this.update, this)
        this.on('change:panestate', this.update, this)
        this.on('change:bbox', this.update, this)
        this.on('change:agobs', this.up_gobs, this)
        //             this.on('change:agobs', this.upGobs, this)
        return this
    },
    up_slug: function() {
        // when a slug comes in or is set, we parse it for the major category so in display we can show that stuff's pane
        // this used to be a routing param but basically pointless there, trumped by the slug every time
        this.set({
            tab: this.get("slug").split("-")[0]
        })
        if(verbose==true){ console.log("up_slug, manually activating cxp...");}
        cxPosts.activate(this.get("slug"))
        appRoute.navigate(this.pullurl());
        return this
    },
    up_gobs: function() {
        // if agobs is an array, we can really only have one be THE active one
        // we could let users pass this in (or web app logic) but for now we'll just choose...kinda randomly
        this.set({
            agob: _.last(this.get("agobs"))
        })
        return this
    },
    update_tab: function() {
        appRoute.navigate(this.pullurl(), {
            trigger: true
        });
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
    update: function() {
        if(verbose==true){console.log("update in appState")}
            appRoute.navigate(this.pullurl());
        return this
        } //update
        ,
        upGob: function() {
            this.get("agobs").push(appState.get("agob"))
            return this
        } //update
        ,
        getAgobString: function() {
            var str = this.get("agobs")
            if (str.length == 0 || typeof str == 'undefined') {
                return "null"
            } else {
                return str.join(",")
            }
            return str
        },
        pullurl: function() {
            var aslug = this.get("slug")
            var abbox = this.get("bbox")
            var apanestate = this.get("panestate")
            var agobs = this.getAgobString()
            var apane = this.get("pane")
            var abase = this.get("basemap")
            var atab = this.get("tab")
            // var state = "#" + aslug + "/" + abbox + "/" + atab + "/" + apanestate + "/" + agobs
            var state = "#" + aslug+"/"+apanestate+ "/" + agobs+"/"+abbox
            return state
        }
    });

var BaseLayer = Backbone.Model.extend({

    defaults:{
        active:false
    },
    initialize:function(){

    }
});

var BaseLayersCollection = Backbone.Collection.extend({
    model: BaseLayer,
    url:function(){
        return null
    },
    initialize: function(options) {
        options || (options = {});
    }

});
var Geom = Backbone.Model.extend({});
var GeomsCollection = Backbone.Collection.extend({
    model: Geom,
    url: function() {
        return "assets/offline/cartodb-query.geojson";
    },
    initialize: function(options) {

        options || (options = {});
        return this
    },
    activate: function(){

        this.deactivate()

        var ags = appState.get("agobs")

        return this

    },
    deactivate: function() {
        if (verbose == true) {
            console.log("deactivating all geoms...");
        }
        // i don't know about this silent thing - could bite later
        this.invoke('set', {
            "active": false
        }, {
            silent: true
        });
        return this
    },

    parse: function(response) {

        var feats = _.each(response.features,function(f,i) {

            if(_.indexOf(appState.get("agobs"), pullEOLID(f.properties.mjid))>=0){
                if(verbose==true){console.log("this one is in appstate's arr, setting to active")}
                    f.properties.active=1
            } else {
                f.properties.active=0
            }

            if(_.indexOf(appState.get("gobseens"), pullEOLID(f.properties.mjid))>=0){
                f.properties.seen=1
            } else {
                f.properties.seen=0
            }

        });

        return feats
    },
});

var Post = Backbone.Model.extend({


    url: function() {
        return "api/jekyllfetcher.php"
    },
    initialize: function(options) {
        options || (options = {});
        return this
    }
}); //Post