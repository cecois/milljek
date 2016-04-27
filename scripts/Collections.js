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
        this.listenTo(this, 'reset', this.activate);
        return this
    },
    activate: function(){

        var slug = window.location.pathname.split("spatialtrack")[1]


        var am = this.findWhere({url:slug}).set({active:true})

        console.info("am");console.log(am);

        return this

    }

});

var BaseLayersCollection = Backbone.Collection.extend({
    model: BaseLayer,
    url:function(){return null},
    initialize: function(options) {options || (options = {});}
});