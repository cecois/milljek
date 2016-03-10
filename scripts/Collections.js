var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        return "api/jekyllfetcher.php?cb=cwmccallback&solrstring="
    },
    initialize: function(options) {
        if(verbose==true){ console.log("initing PostsCollection");}
        // this.on('change', this.activate, this);
        options || (options = {});
        // this.activate(appState.get("slug"));
        return this
    },
    deactivate: function() {

        if (verbose == true) {
            console.log("DEactivating Posts...")
        }

        _.every(this.models, function(d, index) {
            d.set({
                active: false
            }, {
                silent: true
            })
            }) // every
        return this
    },
    activate: function(slug) {
        // this.deactivate()
        var act = slug
        if (verbose == true) {
            console.log("activating Posts with: " + act)
        }

        _.each(this.models,function(m){

            if(m.get("slug")!==appState.get("slug"))
                {m.set({active:false},{silent:true});}
            else {m.set({active:true});}

 }); //each

        // var ive = this.findWhere({
        //     slug: act
        // }).set({
        //     active: true
        // })
        return this
        } //actxivate
    });