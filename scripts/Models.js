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
        // "agobs": [],
        "agob": null,
        // "gobseens": []
    },
    initialize: function(options) {
        options || (options = {});

        if( !this.get('agobs') ){ 
            this.set({agobs: new Array()});
        }

        if( !this.get('gobseens') ){ 
            this.set({gobseens: new Array()});
        }

        //         this.listenTo(appBaseLayers, 'change', this.update_b),
        // this.up_slug()
        this.on('change:slug', this.update, this)
        this.on('change:panestate', this.update, this)
        this.on('change:bbox', this.update, this)
        // this.on('change:agob', this.up_gobs, this)
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
        cxPosts.activate(this.get("slug"))
        appRoute.navigate(this.pullurl());
        return this
    },
    up_gobs: function() {

        var agobs = this.get("agobs")
        
        // if agobs is an array, we can really only have one be THE active one
        // we could let users pass this in (or web app logic) but for now we'll just choose...kinda randomly
        
        if(agobs.indexOf(",")>-1){
            var agobsa = agobs.split(",")
            this.set({agob:agobsa[0]})
        } else {
            // it's just one coming in, so that's agob
            this.set({agobs})
        }



        return this
        .update()

    },
    up_gobsAGOB: function() {
        // if agobs is an array, we can really only have one be THE active one
        // we could let users pass this in (or web app logic) but for now we'll just choose...kinda randomly
        
        if(this.get("agobs").length<2){
            this.set({agobs:[this.get("agob")]})
        } else {

            var agbs = this.get("agobs")

            if(typeof agbs == 'object'){
                agbs.push(this.get("agob"))

                this.set({agobs:_.uniq(agbs)})
            } else {
                this.set({agobs:this.get("agob")})
            }

        }

        return this
        .update()

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
            } else if(typeof str == 'object'){
                return str.join(",")
            } else {
                return str}
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


var Geom = Backbone.Model.extend({});


var Post = Backbone.Model.extend({


    url: function() {
        return "api/jekyllfetcher.php"
    },
    initialize: function(options) {
        options || (options = {});
        return this
    }
}); //Post