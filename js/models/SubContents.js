var SubContentsCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.options = options;
        // options || (options = {});
        // this.cfilter = options.cfilter
        // this.on('sync', this.activate, this);
        // this.listenTo(appState, 'change:slug', this.activate)
        // this.listenTo(this.collection, 'change:sync', this.divide)
            // this.on('sync', this.refetch, this);
            // 
        return this
    },
    url: function() {
        return solrhost + "cvjek/select?json.wrf=cwmccallback&rows=999&wt=json&q="+this.options.cf;
        // return ""
        // return "api/jekyllfetcher.php?cb=cwmccallback&spatialgo=false&solrstring=subject:" + this.options.cf
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
        console.log("in parse: of SubContents");

// var respa = _.findWhere(resp.response.docs,{id:appState.get("slug")})
// var resp = this.collection.models
// console.log(resp);
// console.log("resp:");console.log(resp.response.docs);
// console.log("respa:");console.log(respa);
// respa.set({active:true})

        // var hitdocs = resp.response.docs
        // var hitdocs = resp
        return resp
    }
});