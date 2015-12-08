var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        return solrhost + "miljek/select?json.wrf=cwmccallback&rows=999&wt=json&q=" + encodeURIComponent(appQuery.get("solrstring"));
    },
    initialize: function(options) {
        this.on('sync', this.activate, this);
        options || (options = {});
        return this
    },
    sync: function(method, collection, options) {
        if (verbose == true) {
            console.log("syncing PostsCollection")
        }
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    parse: function(resp) {
        if (verbose == true) {
                console.log("parsing PostsCollection:")
            console.log(resp.response.docs)
                console.log("but now we'll extract and merge...")
        }



        var hitdocs = resp.response.docs

        // appGeoms.set({"sources":hitdocs})
        // var cartos = this.extract();

// var docs_w_carto = this.extract(resp.response.docs)

        return hitdocs
        // return docs_w_carto
    }
        ,
//         zip: function(jekylldocs,cartodocs){

// console.log("in zip...");
// console.log("jekylldocs");
// console.log(jekylldocs);
// console.log("cartodocs");
// console.log(cartodocs);

// return this

//         },
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
            this.deactivate()
            _.each(this.models, function(d, index) {
                if (d.id == window.AP) {
                    d.set({
                        "active": true
                    })
                }
            }); //each
            return this
        } //actxivate
});