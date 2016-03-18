var GeomsCollection = Backbone.Collection.extend({
    model: Geom,
    url: function() {
        return "assets/offline/cartodb-query.geojson";
    },
    initialize: function(options) {

        options || (options = {});
        this.listenTo(appState, 'change:agobs', this.deactivate)
        return this
    },
    activate: function(){

        // this.deactivate()

        var ags = appState.get("agob")

        _.each(this.models,function(m){
            console.log("m:");console.log(m);
            if(_.indexOf(appState.get("agobs"), m.get("cvjekid"))>=0){
                if(verbose==true){console.log("this one is in appstate's arr, setting to active")}
                    m.properties.active=1
            } 
            
            console.log("156 m: "+m.get("cvjekid"));console.log(m);
        })

        return this

    },
    deactivate: function() {

        // i don't know about this silent thing - could bite later
        this.invoke('set', {
            "active": false
        }, {
            silent: true
        });
        return this
        .activate()
    },

    parse: function(response) {

        var feats = _.each(response.features,function(f,i) {

            // console.log("appState.get(agobs):");console.log(appState.get("agobs"));
            // console.log("pullEOLID(f.properties.mjid):");console.log(pullEOLID(f.properties.mjid));

            // if(_.indexOf(appState.get("agobs"), pullEOLID(f.properties.mjid))>=0){
            //     if(verbose==true){console.log("this one is in appstate's arr, setting to active")}
            //         f.properties.active=1
            // } else {
            //     f.properties.active=0
            // }

            // if(_.indexOf(appState.get("gobseens"), pullEOLID(f.properties.mjid))>=0){
            //     f.properties.seen=1
            // } else {
            //     f.properties.seen=0
            // }
            // 
            // start w/ none active
// f.properties.active=0
// f.properties.cvjekid=pullEOLID(f.properties.mjid);

            // and translate to our vernacular

        });

        // return feats
        return response.features
    },
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

var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        return "api/jekyllfetcher.php?cb=cwmccallback&solrstring="
    },
    initialize: function(options) {
        if(verbose==true){ console.log("initing PostsCollection");}
        // this.on('change', this.activate, this);
        options || (options = {});
        // this.activate(appState.get("slug"));
        return this
    },
    activate: function() {

        if (verbose == true) {
            console.log("DEactivating Posts...")
        }

        this.each(function(d, index) {
            d.set({
                active: false
            }, {
                silent: true
            })
            }) // every
        return this
        .actually()
    },
    actually: function(slug) {
        var act = slug
        if (verbose == true) {
            console.log("activating Posts with: " + act)
        }

        // _.every(this.models),function(m){

        //     if(verbose==true){ console.log("setting (silently) to false:");console.log(m.get("slug"))}
        //     m.set({active:false},{silent:true})

        // }

        // var tat = cxPosts.findWhere({slug:"im-this-first-thing"})
        var tat = this.findWhere({slug:appState.get("slug")})
        if(verbose==true){ console.log("setting (loudly) to true:");console.log(tat.get("slug"))}
        tat.set({active:true})

 //        _.each(this.models,function(m){

 //            if(m.get("slug")!==appState.get("slug"))
 //                {m.set({active:false},{silent:true});}


 // }); //each

        // var ive = this.findWhere({
        //     slug: act
        // }).set({
        //     active: true
        // })
        return this
        } //actxivate
    });