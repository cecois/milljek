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
        this.on('change:slug', this.up_slug, this)
        //             this.on('change:agobs', this.upGobs, this)
        return this
    },
    up_slug: function() {
        // when a slug comes in or is set, we parse it for the major category so in display we can show that stuff's pane
        // this used to be a routing param but basically pointless there, trumped by the slug every time
        this.set({
            tab: this.get("slug").split("-")[0]
        })
        if(verbose==true){ console.log("up_slug");}
        appRoute.navigate(this.pullurl());
        return this
    },
    upGobs: function() {
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
        appRoute.navigate(this.pullurl(), {
                // trigger: true
            })
        } //update
        ,
        upGob: function() {
            this.get("agobs").push(appState.get("agob"))
            return this
        } //update
        ,
        getAgobString: function() {
            var str = this.get("agobs")
            if (str.length == 1) {
                return str
            } else if (str.length == 0) {
                return ''
            } else {
                return str.join(",")
            }
        },
        pullurl: function() {
            var aslug = this.get("slug")
            var abbox = this.get("bbox")
            var apanestate = this.get("panestate")
            var agobs = this.getAgobString()
            var apane = this.get("pane")
            var abase = this.get("basemap")
            var atab = this.get("tab")
            var state = "#" + aslug + "/" + abbox + "/" + atab + "/" + apanestate + "/" + agobs
            return state
        }
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