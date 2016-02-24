var ContentsCollection = Backbone.Collection.extend({
    model: Content,
    initialize: function(models, options) {
        this.options = options;
        // options || (options = {});
        // this.cfilter = options.cfilter
        // this.on('sync', this.activate, this);
        // this.listenTo(appState, 'change:slug', this.activate)
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
//     activate: function(){

// var slug = appState.get("slug")
// if(typeof slug !== 'undefined' && slug !== null && slug !== 'null' ){

// var respa = this.findWhere({id:appState.get("slug")})
// respa.set({active:true})

// }

//         return this
//     },
    // activate: function() {

    //     var ass = appState.get("slug")

    //     console.log("ass:");console.log(ass);
    //     console.log("this:");console.log(this);

    //     this.invoke('set', {
    //         "active": false
    //     }, {
    //         silent: true
    //     });
    //     var at = this.findWhere({
    //         id: ass
    //     })
    //     at.set({
    //         active: true
    //     })
    //     return this
    // }, //activate
    parse: function(resp) {

// var respa = _.findWhere(resp,{id:appState.get("slug")})
// respa.set({active:true})

//         var hitdocs = respa
        var hitdocs = resp
        return hitdocs
    }
});