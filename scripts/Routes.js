var Route = Backbone.Router.extend({
    routes: {
        // "(:slug)(/:panestate)(/:agobs)(/:bbox)(/)": "default",
        "(:slug)(/)": "default",
    },
    initialize: function() {
        if(verbose==true){console.log("initing Route");}
        // this.report()
        // this.listenTo(appState, 'change', this.report)
    },
    report: function(){

if(verbose==true){console.log("reporting from route:");}
console.log(appState.get("slug"));

    },
    default: function(slug, panestate, agobs, bbox){
        
        // if (typeof slug !== 'undefined' && slug !== null && slug !== "null") {appState.set({"slug": slug})} // if slug
        if (typeof slug !== 'undefined' && slug !== null && slug !== "null") {cxPosts.activate(slug)} // if slug
        
        return this
    }, // end default
});
var appRoute = new Route();
Backbone.history.start();