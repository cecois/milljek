var ContentsCollection = Backbone.Collection.extend({
    model: Content,
    initialize: function(models, options) {
        this.options = options;
        // options || (options = {});
        // this.cfilter = options.cfilter
        // this.on('sync', this.activate, this);
        // this.listenTo(appState, 'change', this.activate)
            // this.on('sync', this.refetch, this);
        return this
    },
    url: function() {
        // return solrhost + "eoljek/select?json.wrf=cwmccallback&rows=999&wt=json&q=*";
        return "api/jekyllfetcher.php?cb=cwmccallback&spatialgo=false&solrstring=subject:" + this.options.cf
    },
    sync: function(method, collection, options) {
        if (verbose == true) {
            console.log("syncing ContentsCollection using filter:"+this.options.cf)
        }
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    // activate: function(slug) {
    //     this.invoke('set', {
    //         "active": false
    //     }, {
    //         silent: true
    //     });
    //     var at = this.findWhere({
    //         id: slug
    //     })
    //     at.set({
    //         active: true
    //     })
    //     return this
    // }, //activate
    parse: function(resp) {
        var hitdocs = resp
        return hitdocs
    }
});