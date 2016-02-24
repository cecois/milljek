var Route = Backbone.Router.extend({
    routes: {
        // "(:q)(/:slug)(/:bbox)(/:panestate)(/:agob)(/:basemap)(/)": "default",
        "(:slug)(/:bbox)(/:tab)(/:panestate)(/:agob)(/:basemap)(/)": "default_queryless",
        // "slug:slug(/:bbox)(/:basemap)(/)": "post",
        "debug/:q/:slug/:bbox/:basemap(/)": "audit"
            // "search/lll:hash": "searchWithHashed",
    },
    initialize: function() {},
    default: function(slug, bbox, tab, panestate, agob, basemap) {
if (verbose == true) {
            console.log("running default_queryless route");
            console.log("slug:");console.log(slug);
            console.log("bbox:");console.log(bbox);
            console.log("panestate:");console.log(panestate);
            console.log("agob:");console.log(agob);
            console.log("basemap:");console.log(basemap);
        }


            // if slug, set activePost to slug, it should ONLY activat the right pane, scrollto the right div
            // if bbox, set map bounds to same
            // if panestate, set collapsed state on panes
            // if agob, set activeGeom to this (it will pull the geom from the corresponding post), geomview will zoomto
            // if basemap, set baselayers collection to active for this, basemapview will update from listento


    }, //default
    default_queryless: function(slug, bbox, tab, panestate, agob, basemap) {
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
        if (typeof panestate !== 'undefined' && panestate !== null) {
            appState.set({
                "panestate": panestate
            })
        } else {
            appState.set({
                "panestate": 1
            })
        }



        if (typeof agob !== 'undefined' && agob !== null) {
            appState.set({
                "agob": agob
            })
        }


// we're gonna let slug trump tab unless we find that's unexpected behavior
        if (typeof slug !== 'undefined' && slug !== null && slug !== "null") {

tab = slug.split("-")[0]

            appState.set({
                "slug": slug
            })

        } // if slug


        if (typeof tab !== 'undefined' && tab !==null && tab !=="null") {

// this is duplicative - better to do it w/ a view or something, but itsa #returnto for now

var sel = "#menu-a-"+tab

$(".bhoechie-tab-menu > .list-group > a").removeClass("active")

        $(sel).addClass("active");
        var index = $(sel).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");

            appState.set({
                "tab": tab
            })
        }



 // appContentsCV.fetch({
 //            success: function() {
 //                appContentsCVView.render()
                
 //            },
 //            error: function(collection, response, options){
 //                // console.log(response);
 //                appCBBContentsCVView.render_error()

 //            }
 //        })        
appContentsAbout.fetch({
            success: function() {
                if(typeof appContentsAboutView == 'undefined'){

                    window.appContentsAboutView = new ContentsAboutView({collection:appContentsAbout})
                // appContentsAboutView.render()
                var slu = appState.get("slug")
                if(typeof slu !== 'undefined' && slu!==null && slu!=="null"){
                    var az = appContentsAbout.findWhere({id:slu})
                    az.set({active:true})
                }
                // 
                
                }
            }
            ,
            error: function(collection, response, options){


                $("#about-container").html("AboutView failed to fetch and/or render. Refresh?")

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
                })
            } else {
                appState.set({
                    "panestate": 1
                })
            }
            if (typeof agob !== 'undefined' && agob !== null) {
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