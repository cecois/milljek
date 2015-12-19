var Route = Backbone.Router.extend({
    routes: {
        "(:q)(/:slug)(/:bbox)(/:basemap)(/)": "default",
        // "slug:slug(/:bbox)(/:basemap)(/)": "post",
        "debug/:q/:slug/:bbox/:basemap(/)": "audit"
            // "search/lll:hash": "searchWithHashed",
    },
    initialize: function() {}
    ,
    default: function(q, slug, bbox, basemap) {
            if (verbose == true) {
                console.log("running default route");
                console.log("q:");
                console.log(q);
                console.log("bbox:");
                console.log(bbox);
                console.log("slug:");
                console.log(slug);
                console.log("basemap:");
                console.log(basemap);
            }
            if (typeof bbox !== 'undefined' && bbox !== null) {
                appBasemap.set({
                    "bbox": bbox
                })
            }
            if (typeof basemap !== 'undefined' && basemap !== null) {
                appBasemap.set({
                    "tileset": basemap
                })
            }
                        if (typeof slug !== 'undefined' && slug !== null) {

            // var the = appPosts.findWhere({
            //     id: slug
            // })


                appState.set({ap:
                {"slug":slug}
            },{silent:true})
            
            }
            // we do query last bc other incomings might inform it
            if (typeof q !== 'undefined' && q !== null) {
                appQuery.set({
                    "rawstring": q
                })
            }
            appState.set({"basemap":basemap,"q":appQuery.get("solrstring"),
                // "bbox":map.getBbox().toString()
            },{silent:true})
            return this.reset()
        } // end default
        ,
    reset: function() {
        if (verbose == true) {
            console.log("resetting in route, fetching posts...")
        }
            
            // appActivity.set({"message":"fetching..."})
        appPosts.fetch()
        return this
    },
    audit: function(q, slug,bbox, basemap) {
        console.log("running audit route");
        console.log("q:");
        console.log(q);
        console.log("bbox:");
        console.log(bbox);
        console.log("slug:");
        console.log(slug);
        console.log("basemap:");
        console.log(basemap);
        if (typeof bbox !== 'undefined' && bbox !== null) {
            console.log("bbox set as " + bbox + " passing to appropriate models...");
            appBasemap.set({
                "bbox": bbox
            })
        }
        if (typeof basemap !== 'undefined' && basemap !== null) {
            console.log("basemap set as " + basemap + " passing to appropriate models...");
            appBasemap.set({
                "tileset": basemap
            })
        }
        // we do query last bc other incomings might inform it
        if (typeof q !== 'undefined' && q !== null) {
            console.log("q set as " + q + " passing to appropriate models...");
            appQuery.set({
                "rawstring": q
            })
        }
        // appAuditView.render()
        return this.reset()
    }
});
var appRoute = new Route();
Backbone.history.start();