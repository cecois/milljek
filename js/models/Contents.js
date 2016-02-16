var ContentsCollection = Backbone.Collection.extend({
    model: Content,
    url: function() {
        // return solrhost + "eoljek/select?json.wrf=cwmccallback&rows=999&wt=json&q=*";
        return "api/jekyllfetcher.php?cb=cwmccallback&spatialgo=false&solrstring=*"
        
    },
    initialize: function(options) {
        // this.on('sync', this.activate, this);
        // this.listenTo(appState, 'change', this.activate)
        this.on('change',this.debug,this)
        // this.on('sync', this.refetch, this);
        options || (options = {});
        return this
    },
    sync: function(method, collection, options) {
        if (verbose == true) {
            console.log("syncing ContentsCollection")
        }
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    // refetch: function() {
    //         return this
    //     } //refetch
    //     ,
    debug: function(){

        console.log("debug of contents 29:");
        return this
    },
    divide: function(d){


        // appContentsAbout.set({collection:d.about})
        // appContentsCV.set({collection:d.cv})
        appContentsAbout.reset(d.about)
        appContentsCV.reset(d.cv)
        // 
        return this

    },
    parse: function(resp) {
        // if (verbose == true) {
        //     console.log("about in ContentsCollection:")
        //     console.log(resp.cv)
        // }
        var hitdocs = resp
        return this.divide(hitdocs)


    },

//     deactivate: function() {
//         _.every(this.models, function(d, index) {
//             console.log("priortodeactivating: ");
//             console.log(d);
//                 d.set({
//                     active: false
//                 }, {
//                     silent: true
//                 })

//                 console.log("afterdeactivating: ");
//             console.log(d);

//             }) // every
//         return this
//     },
//     activate: function() {
//             if(verbose==true){console.log("activating...")}

//         if(typeof appState.get("ap") !== 'undefined' && appState.get("ap") !== null){
//                     // this.deactivate()
//                     _.each(this.models, function(d, index) {


//                         if (d.id !== appState.get("ap").slug) {
// d.set({
//                                 "active": false
//                             },{silent:true})
//                         } else {
// d.set({"active":true,"seen":true})
//                         }
//                     }); //each}
//                 }
//             return this
//         } //actxivate
});