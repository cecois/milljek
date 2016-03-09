var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        return "api/jekyllfetcher.php?cb=cwmccallback&solrstring="
    },
    initialize: function(options) {
        // this.on('change', this.activate, this);
        options || (options = {});
        this.activate(appState.get("slug"));
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
        this.deactivate()
        var act = slug
        if (verbose == true) {
            console.log("activating Posts with: " + act)
        }
            // this.each(function(m){
            //     console.log("m:");
            //     console.log(m.get("slug"));
            // })
            var ive = this.findWhere({
                slug: act
            }).set({
                active: true
            })
            return this
        } //actxivate
    });