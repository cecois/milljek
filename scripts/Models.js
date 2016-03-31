var State = Backbone.Model.extend({
    defaults: {
        "q": null,
        "slug": "about-cover-letter-gloss",
        "panestate": "out", // or 0 for collapsed
        "bbox": null,
        "basemap": null,
        "agob": null,
        "gogob":false
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

        var gbseens = this.get("gobseens")

        console.info("gobseens prev:");console.log(this.get("gobseens"));

        gbseens.push(this.previousAttributes().agob)
        this.set({gobseens:_.unique(gbseens)})
                // 
        // this.get("gobseens").push(this.previousAttributes().agob)

        console.info("gobseens now:");console.log(this.get("gobseens"));

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
            // pushurl: function(PAIR){

            //     // for some reason (laziness) i thought it might be easier to once in a while let some other entity to all this

            //     console.info("PAIR:");console.log(PAIR);

            //     console.info("PAIRkey");console.log(PAIR.key);
            //     console.info("PAIRvalue");console.log(PAIR.value);

            //     switch (PAIR.key) {
            //         case 'slug':
            //         var state = "#" + PAIR.value +"/"+this.get("panestate")+ "/" + this.get("agob")+"/"+this.get("bbox")                
            //         break;
            //         case 'agob':
            //         var state = "#" + this.get("slug")+"/"+this.get("panestate")+ "/" + PAIR.value 
            //         // +"/-86.98794364929199,40.41205832879732,-86.86709403991699,40.45178039961496"
            //         // 
            //         // +this.get("bbox")
            //         break;
            //         default:
            //         var id = null
            //     }

            //     console.info("state");console.log(state);
            //     appRoute.navigate(state,{trigger:true});

            //     return this

            // },
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