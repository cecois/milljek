var GeomsCollection = Backbone.Collection.extend({
    model: Geom,
    url: function() {
        // IDEALLY I COULD LEAVE THIS AS STRAIGHT CALL TO CARTODB
        // return solrhost + "miljek_geom/select?json.wrf=cwmccallback&rows=999z&wt=json&q=" + encodeURIComponent(appQuery.get("solrstring"));
        // this.cartostring = "cartodb_id:(" + encodeURIComponent(arr.join(" ")) + ")"
        return appQuery.get("carl")
    },
    initialize: function(options) {
        // this.on('sync', this.activate, this);
        options || (options = {});
        return this
    },
    // sync: function(method, collection, options) {
    //     if (verbose == true) {
    //         console.log("syncing PostsCollection")
    //     }
    //     // By setting the dataType to "jsonp", jQuery creates a function
    //     // and adds it as a callback parameter to the request, e.g.:
    //     // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
    //     // If you want another name for the callback, also specify the
    //     // jsonpCallback option.
    //     // After this function is called (by the JSONP response), the script tag
    //     // is removed and the parse method is called, just as it would be
    //     // when AJAX was used.
    //     options.dataType = "jsonp";
    //     options.jsonpCallback = 'cwmccallback';
    //     return Backbone.sync(method, collection, options);
    // },
    // parse: function(response) {
    //     if (verbose == true) {
    //         if (verbose == true) {
    //             console.log("parsing GeomsCollection:")
    //         }
    //     }
    //     var docs = response.response.docs
    //     return docs
    // },
    // deactivate: function() {
    //     _.every(this.models, function(d, index) {
    //             d.set({
    //                 active: false
    //             }, {
    //                 silent: true
    //             })
    //         }) // every
    //     return this
    // },
    // activate: function() {
    //         this.deactivate()
    //         _.each(this.models, function(d, index) {
    //             if (d.id == window.AP) {
    //                 d.set({
    //                     "active": true
    //                 })
    //             }
    //         }); //each
    //         return this
    //     } //actxivate
});