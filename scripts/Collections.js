var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        return "api/jekyllfetcher.php?cb=cwmccallback&solrstring="
    },
    initialize: function(options) {
        // this.on('change', this.activate, this);
        options || (options = {});
        // this.activate();
        return this
    },
    deactivate: function() {
        _.every(this.models, function(d, index) {
                d.set({
                    active: false
                }, {
                    silent: true
                })

            console.log(d);

            }) // every
        return this
    },
    activate: function() {

var act = appState.get("slug")

            if(verbose==true){console.log("activating Posts with "+act)}

if(typeof this.collection.findWhere() !== 'undefined'){
var ive = this.collection.findWhere({slug:act})
}

if(typeof ive !== 'undefined'){
ive.set({active:true})}
console.log("ive:");console.log(ive);

            return this
        } //actxivate
});