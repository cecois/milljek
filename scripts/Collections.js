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
    activate: function() {

        if (verbose == true) {
            console.log("DEactivating Posts...")
        }

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
    actually: function(slug) {
        var act = slug
        if (verbose == true) {
            console.log("activating Posts with: " + act)
        }

        // _.every(this.models),function(m){

        //     if(verbose==true){ console.log("setting (silently) to false:");console.log(m.get("slug"))}
        //     m.set({active:false},{silent:true})

        // }

        // var tat = cxPosts.findWhere({slug:"im-this-first-thing"})
        var tat = this.findWhere({slug:appState.get("slug")})
        if(verbose==true){ console.log("setting (loudly) to true:");console.log(tat.get("slug"))}
        tat.set({active:true})

 //        _.each(this.models,function(m){

 //            if(m.get("slug")!==appState.get("slug"))
 //                {m.set({active:false},{silent:true});}


 // }); //each

        // var ive = this.findWhere({
        //     slug: act
        // }).set({
        //     active: true
        // })
        return this
        } //actxivate
    });