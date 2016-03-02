var Route = Backbone.Router.extend({
    routes: {
        // "(:q)(/:slug)(/:bbox)(/:panestate)(/:agob)(/:basemap)(/)": "default",
        "(:slug)(/:panestate)(/:agobs)(/:bbox)(/)": "default",
        // "slug:slug(/:bbox)(/:basemap)(/)": "post",
        "debug/:q/:slug/:bbox/:basemap(/)": "audit"
            // "search/lll:hash": "searchWithHashed",
    },
    initialize: function() {},
    defaultOG: function(slug, panestate, agobs, bbox) {
        if (verbose == true) {
            console.log("running default_queryless route");
            console.log("slug:");
            console.log(slug);
            console.log("bbox:");
            console.log(bbox);
            console.log("panestate:");
            console.log(panestate);
            console.log("agobs:");
            console.log(agobs);
            console.log("basemap:");
            console.log(basemap);
        }
        // if slug, set activePost to slug, it should ONLY activat the right pane, scrollto the right div
        // if bbox, set map bounds to same
        // if panestate, set collapsed state on panes
        // if agobs, set activeGeom to this (it will pull the geom from the corresponding post), geomview will zoomto
        // if basemap, set baselayers collection to active for this, basemapview will update from listento
    }, //default
    default: function(slug, panestate, agobs, bbox){
        if (typeof bbox !== 'undefined' && bbox !== null) {
            appBasemap.set({
                "bbox": bbox
            })
        }
        if (typeof panestate !== 'undefined' && panestate !== null) {
            appState.set({
                "panestate": panestate
            }, {
                silent: true
            })
        }
        if (typeof agobs !== 'undefined' && agobs !== null) {
        
                appState.set({
                    "agobs": agobs
                }, {
                    silent: true
                })
        }
        // we're gonna let slug trump tab unless we find that's unexpected behavior
        if (typeof slug !== 'undefined' && slug !== null && slug !== "null") {
            appState.set({
                "slug": slug
            }, {
                silent: true
            })
        } // if slug
        
        appContents.fetch()

        //        yes, we're cascading these. so what!
        // appContentsAbout.fetch({
        //     success: function() {
        //         if (typeof appContentsAboutView == 'undefined') {
        //             window.appContentsAboutView = new ContentsAboutView({
        //                     collection: appContentsAbout
        //                 })

        // appContentsCV.fetch({
        //     success: function() {
        //         if (typeof appContentsCVView == 'undefined') {
        //             window.appContentsCVView = new ContentsCVView({
        //                     collection: appContentsCV
        //                 })
        //                 // appContentsCVView.render()
        //             var slu = appState.get("slug")
        //             if (typeof slu !== 'undefined' && slu !== null && slu !== "null") {
        //                 var az = appContentsCV.findWhere({
        //                     id: slu
        //                 })
        //                 az.set({
        //                     active: true
        //                 })
        //             }
        //             //
        //         }
        //     },
        //     error: function(collection, response, options) {
        //         $("#cv-container").html("CVView failed to fetch and/or render. Refresh?")
        //     }
        // });

        //             //
        //         } //about success
        //     },
        //     error: function(collection, response, options) {
        //         $("#about-container").html("AboutView failed to fetch and/or render. Refresh?")
        //     }
        // });

// window.appContentsCVView = new ContentsCVView({
//                             collection: appContentsCV
//                         })
                        


        appGeoms.fetch({
            success: function(a, b) {
                // console.log("geoms success:");
                // console.log("appgeoms success");
                // console.log(a);
                // console.log(b);
            },
            error: function(collection, response, options) {
                console.log("Geoms error:g");
                console.log(response);
            }
        });
        // appContentsCV.fetch({
        //             success: function() {
        //                 if(typeof appContentsCVView !== 'undefined'){
        //                 appContentsCVView.render()
        //                 } else {
        //                     // oh, then create it
        //                     window.appContentsCVView = new ContentsCVView({collection:appContentsCV})
        //                 }
        //             }
        //             ,
        //             error: function(collection, response, options){
        //                 appContentsCVView.render_error()
        //             }
        //         });
        return this
            // .fetch()
    }, // end default
    defaultOG: function(q, slug, bbox, basemap) {
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
            if (typeof panestate !== 'undefined' && panestate !== null) {
                appState.set({
                    "panestate": panestate
                }, {
                    silent: true
                })
            } else {
                appState.set({
                    "panestate": 1
                }, {
                    silent: true
                })
            }
            if (typeof agobs !== 'undefined' && agobs !== null) {
                appState.set({
                    "agobs": agobs
                }, {
                    silent: true
                })
            }
            if (typeof slug !== 'undefined' && slug !== null) {
                appState.set({
                    "slug": slug
                }, {
                    silent: true
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
        // appPosts.fetch()
        // appContents.fetch()
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