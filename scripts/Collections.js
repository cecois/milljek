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
        // return "api/jekyllfetcher.php?cb=cwmccallback&solrstring="
        return null
    },
    initialize: function(options) {
        // this.on('change', this.activate, this);
        this.listenTo(appState, 'change:slug', this.activate);
        options || (options = {});
        // this.activate(appState.get("slug"));
        return this
    },
    activate: function() {


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
    subdivide: function(wich){



        var rows = _.partition(this.models,function(m){ 
            var mt = m.get("title").toLowerCase()
            var mtr = (mt.indexOf("the ")> -1) ? mt.split("the ")[1] : mt;
            var regx = /[wich[0]-wich[1]]+$/;
            var mtrregx = mtr[0].match(regx);
            if(mtrregx !== null){
                return m;
            }
        });

        return rows

    },
    actually: function(slug) {
        // var act = slug

        var tat = this.findWhere({slug:appState.get("slug")})
        if(typeof tat !== 'undefined'){
            
            tat.set({active:true})}


            return this
        } //actxivate
    });