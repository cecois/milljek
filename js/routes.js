var Route = Backbone.Router.extend({
    routes: {
        // "(:q)(/:slug)(/:bbox)(/:panestate)(/:agob)(/:basemap)(/)": "default",
        "(:slug)(/:bbox)(/:panestate)(/:agob)(/:basemap)(/)": "default_queryless",
        // "slug:slug(/:bbox)(/:basemap)(/)": "post",
        "debug/:q/:slug/:bbox/:basemap(/)": "audit"
            // "search/lll:hash": "searchWithHashed",
    },
    initialize: function() {},
    default_queryless: function(slug, bbox, panestate, agob, basemap) {
        if (verbose == true) {
            console.log("running default_queryless route");
            console.log("slug:");console.log(slug);
            console.log("bbox:");console.log(bbox);
            console.log("panestate:");console.log(panestate);
            console.log("agob:");console.log(agob);
            console.log("basemap:");console.log(basemap);
        }
        if (typeof bbox !== 'undefined' && bbox !== null) {
            appBasemap.set({
                "bbox": bbox
            })
        }
        if (typeof basemap !== 'undefined' && basemap !== null) {
            var tl = appBaseLayers.findWhere({
                name: basemap
            })
            tl.set({
                    active: true
                })
                // we'll also set State manually here (it will watch for changes)
            appState.set({
                "basemap": basemap
            }, {
                silent: true
            })
        } else {
            var tl = appBaseLayers.findWhere({
                name: "dummy"
            })
            tl.set({
                    active: true
                })
                // we'll also set State manually here (it will watch for changes)
            appState.set({
                "basemap": "dummy"
            }, {
                silent: true
            })
        }
        if (typeof panestate !== 'undefined' && panestate != null) {
            appState.set({
                "panestate": panestate
            })
        } else {
            appState.set({
                "panestate": 1
            })
        }
        if (typeof agob !== 'undefined' && agob != null) {
            appState.set({
                "agob": agob
            })
        }
        if (typeof slug !== 'undefined' && slug !== null) {
            // var the = appPosts.findWhere({
            //     id: slug
            // })
            appState.set({
                "slug": slug
            }, {
                silent: true
            })
        } // if slug
        return this.reset()
    }, // end default
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
            // else {
            //     appState.set({
            //         "bbox": map.getBounds().toBBoxString()
            //     })
            // }
            if (typeof basemap !== 'undefined' && basemap !== null) {
                var tl = appBaseLayers.findWhere({
                    name: basemap
                })
                tl.set({
                    active: true
                })
            } else {
                var tl = appBaseLayers.findWhere({
                    name: "dummy"
                })
                tl.set({
                    active: true
                })
            }
            if (typeof panestate !== 'undefined' && panestate != null) {
                appState.set({
                    "panestate": panestate
                })
            } else {
                appState.set({
                    "panestate": 1
                })
            }
            if (typeof agob !== 'undefined' && agob != null) {
                appState.set({
                    "agob": agob
                })
            }
            if (typeof slug !== 'undefined' && slug !== null) {
                appState.set({
                    ap: {
                        "slug": slug
                    }
                })
            }
            appState.set({
                "basemap": basemap,
                // "q": appQuery.get("solrstring"),
                // "bbox":map.getBbox().toString()
            }, {
                silent: true
            })
            return this.reset()
        } // end default
        ,
    reset: function() {
        if (verbose == true) {
            console.log("resetting in route, fetching posts...")
        }
        // appActivity.set({"message":"fetching..."})
        appPosts.fetch()
        appContents.fetch()
        return this
    },
    audit: function(q, slug, bbox, basemap) {
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