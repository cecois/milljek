var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        // return solrhost + "miljek/select?json.wrf=cwmccallback&rows=999&wt=json&q=" + encodeURIComponent(appQuery.get("solrstring"));
        return "api/jekyllfetcher.php?cb=cwmccallback"
    },
    initialize: function(options) {
        this.on('sync', this.activate, this);
        // this.on('sync', this.refetch, this);
        options || (options = {});
        return this
    },
    sync: function(method, collection, options) {
        if (verbose == true) {
            console.log("syncing PostsCollection")
        }
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    // refetch: function() {
    //         return this
    //     } //refetch
    //     ,
    parse: function(resp) {
        if (verbose == true) {
            console.log("parsing PostsCollection:")
        }
        var hitdocs = resp.response.docs
        return hitdocs

    },

    deactivate: function() {
        _.every(this.models, function(d, index) {
                d.set({
                    active: false
                }, {
                    silent: true
                })
            }) // every
        return this
    },
    activate: function() {
            if(verbose==true){console.log("activating...")}

        if(typeof AP !== 'undefined' && AP !== null){
            if(verbose==true){console.log("AP is set, activating and deactivating in Posts...")}
                    this.deactivate()
                    _.each(this.models, function(d, index) {
                        if (d.id == window.AP.slug) {
                            d.set({
                                "active": true
                            })
                        }
                    }); //each}
                }
            return this
        } //actxivate
});