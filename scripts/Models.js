var State = Backbone.Model.extend({
    defaults: {
        "q": null,
        "slug": "about-cover-letter-gloss",
        "panestate": "out", // or 0 for collapsed
        "bbox": null,
        "basemap": null,
        "agob": null,
    },
    initialize: function(options) {
        options || (options = {});

        if( !this.get('gobseens') ){ 
            this.set({gobseens: new Array()});
        }

        this.on('change:slug', this.update, this)
        this.on('change:panestate', this.update, this)
        this.on('change:bbox', this.update, this)
        this.on('change:agob', this.up_gob, this)

        return this
    },
    up_gob: function() {


        return this
        .update()

    },
    update: function() {
        appRoute.navigate(this.pullurl());
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

                var state = "#" + this.get("slug")+"/"+this.get("panestate")+ "/" + this.get("agob")+"/"+this.get("bbox")
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