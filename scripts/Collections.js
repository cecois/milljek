var GeomsCollection = Backbone.Collection.extend({
    model: Geom,
    url: function() {
        return "/spatialtrack/assets/offline/cartodb-query.geojson";
    },
    initialize: function(options) {

        options || (options = {});
        // this.listenTo(cxPosts,'reset',this.fetch)
        return this
        .fetch()
    },
    activate: function(){


        _.each(this.models,function(m){
            if(m.get("cvjekid")==appState.get("agob")){
                m.properties.active=1
            }
            
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


        });

        // return feats
        return response.features
    },
});

var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        return null
    },
    initialize: function(options) {
        options || (options = {});
        // this.listenTo(this, 'change', this.activate);
        return this
    },
    sync: function(method, collection, options) {

        console.log("sync of POSTS");
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    activate: function(){

        var slugall = window.location.pathname.split("spatialtrack")[1]
        if(typeof slugall !== 'undefined'){
            var slughtml = slugall.split(".html")[0]
            if(typeof slughtml !== 'undefined'){
                var slug = slughtml.split("/")[4]}}

                console.info("window.location.pathname");console.log(window.location.pathname);
                console.info("slugall");console.log(slugall);
                console.info("slughtml");console.log(slughtml);
                console.info("slug");console.log(slug);

                console.log("typeof");
                console.log(typeof slug);

                console.info("mods");console.log(this);

                if(typeof slug == "string"){
                    // var am = this.findWhere({slug:slug})
                    var am = this.models[0]
                } else {
                    var am = this.models[0]
                }
                
        // var am = (slug == "/") ? this.collection.models[0] : ;

        // am.set({active:true})
        console.info("am");console.log(am);

        return this

    }

});

var BaseLayersCollection = Backbone.Collection.extend({
    model: BaseLayer,
    url:function(){return null},
    initialize: function(options) {options || (options = {});}
});