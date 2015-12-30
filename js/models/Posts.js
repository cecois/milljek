var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        // return solrhost + "miljek/select?json.wrf=cwmccallback&rows=999&wt=json&q=" + encodeURIComponent(appQuery.get("solrstring"));
        return "api/jekyllfetcher.php?cb=cwmccallback&solrstring="+appState.get("q")
    },
    initialize: function(options) {
        this.on('sync', this.activate, this);
        this.listenTo(appState, 'change', this.activate)
        // this.on('change:active',this.activate,this)
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
            console.log("priortodeactivating: ");
            console.log(d);
                d.set({
                    active: false
                }, {
                    silent: true
                })

                console.log("afterdeactivating: ");
            console.log(d);

            }) // every
        return this
    },
    activate: function() {
            if(verbose==true){console.log("activating...")}

        if(typeof appState.get("ap") !== 'undefined' && appState.get("ap") !== null){
                    // this.deactivate()
                    _.each(this.models, function(d, index) {
                        

                        if (d.id !== appState.get("ap").slug) {
d.set({
                                "active": false
                            },{silent:true})
                        } else {
d.set({"active":true,"seen":true})
                        }
                    }); //each}
                }
            return this
        } //actxivate
});