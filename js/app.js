/* -------------------------------------------------- GLOBALS -----------------------  */
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.agent = "mobile";
} else {
    window.agent = "desktop";
}
window.offline = "true"
window.solrhost = "http://localhost:8983/solr/"
    // window.thedomain="trainertothestarsseekingstars.org"
// window.thedomain = "eolapp-lbones.rhcloud.com"
window.gpre_point = "g."
window.gpre_poly = "gD"
window.gpre_line = "g|"
window.gseens = ["g.20", "gD888", "g|3", "g|12"]
    // agent="mobile"
    // NProgress.configure({
    //     parent: '#postslist-container'
    // });
function pullEOLID(idin) {
    var idina = idin.split(":")
    switch (idina[0]) {
        case 'line':
            var id = gpre_line + idina[1]
            break;
        case 'poly':
            var id = gpre_poly + idina[1]
            break;
        case 'point':
            var id = gpre_point + idina[1]
            break;
        default:
            var id = null
    }
    return id
}

/* -------------------------------------------------- IN-COPY TRIGGER -----------------------  */

function copyTriggerTrigger(trtyp,trdat){

switch (trtyp) {
        case 'gob':
            appState.set({"agob":trdat})
            break;
        case 'slug':
            appState.set({"slug":trdat})
// rough biz here #returnto
// if(trdat.split("-")[0]=="about"){
//     var az = appContentsAbout.findWhere({id: trdat})
//     appState.set({tab:trdat.split("-")[0]})
//     // appContentsAboutView.scroll(az)
// } else if(trdat.split("-")[0]=="cv"){
//     var az = appContentsCV.findWhere({id: trdat})
//     appState.set({tab:trdat.split("-")[0]})
//     // appContentsCVView.scroll(az)
// }

            break;
        default:
            console.log("no case observed");
    }

}

/* -------------------------------------------------- MAP STYLES -----------------------  */
function pullEOLStyle(gtype, gstate) {
    /**
        in here we nudge the style definitions a little bc it's not always a 1:1 match between 
        geomtype and the name of the style applies (e.g. linestring vs. multilinestring 
        or the fact that polys get line styles, too)
    **/
    var fill = "#384754";
    var filla = "#C7E048";
    var fillb = "#50667A";
    var bord = "#C7E048";
    var borda = "#384754";
    switch (gtype.toLowerCase()) {
        case 'point':
            if (gstate == "seen") {
                var style = {
                    radius: 8,
                    fillColor: fill,
                    color: fillb,
                    weight: 1,
                    opacity: .6,
                    fillOpacity: 0.2,
                };
            } else if (gstate == "active") {
                var style = {
                    radius: 18,
                    fillColor: filla,
                    color: borda,
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                };
            } else {
                var style = {
                    radius: 8,
                    fillColor: fill,
                    color: fillb,
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                };
            }
            break;
        case 'poly':
            if (gstate == "seen") {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .2,
                };
            } else if (gstate == "active") {
                var style = {
                    fillColor: filla,
                    color: borda,
                    weight: 8,
                    opacity: 1,
                };
            } else {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .8,
                };
            }
            break;
        case 'multipolygon':
            if (gstate == "seen") {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .2,
                };
            } else if (gstate == "active") {
                var style = {
                    fillColor: filla,
                    color: borda,
                    weight: 8,
                    opacity: 1,
                };
            } else {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .8,
                };
            }
            break;
        case 'polygon':
            if (gstate == "seen") {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .2,
                };
            } else if (gstate == "active") {
                var style = {
                    fillColor: filla,
                    color: borda,
                    weight: 8,
                    opacity: 1,
                };
            } else {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .8,
                };
            }
            break;
        case 'line':
            if (gstate == "seen") {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .2,
                };
            } else if (gstate == "active") {
                var style = {
                    fillColor: filla,
                    color: borda,
                    weight: 8,
                    opacity: 1,
                };
            } else {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .8,
                };
            }
            break;
        case 'multilinestring':
            if (gstate == "seen") {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .2,
                };
            } else if (gstate == "active") {
                var style = {
                    fillColor: filla,
                    color: borda,
                    weight: 8,
                    opacity: 1,
                };
            } else {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .8,
                };
            }
            break;
        case 'linestring':
            if (gstate == "seen") {
                var style = {
                    fillColor: fill,
                    color: fillb,
                    weight: 6,
                    opacity: .2,
                };
            } else if (gstate == "active") {
                var style = {
                    fillColor: filla,
                    color: borda,
                    weight: 8,
                    opacity: 1,
                };
            } else {
                var style = {
                    fillColor: fill,
                    color: bord,
                    weight: 6,
                    opacity: .8,
                };
            }
            break;
        default:
            var style = {
                fillColor: "gray",
                color: "gray",
                weight: 3,
                opacity: .3
            };
    }
    return style
}
/* -------------------------------------------------- HANDLEBARS START -----------------------  */
Handlebars.registerHelper('debug', function(options) {
    // if(verbose==true){
    //     console.log("debug hb:");
    console.log(this);
    // }
    return new Handlebars.SafeString("check console");
});
/* -------------------------------------------------- BASEMAPS -----------------------  */
var baselayers = {
    "layers": [{
        "name": "mapquest",
        "active": false,
        "source": "mapquest",
        "nom": "MapQuest OSM",
        // "thumb": "http://otile1.mqcdn.com/tiles/1.0.0/osm/3/4/2.png",
        "thumb": "offline/mapquest.jpg",
        "mapis": "light",
        "definition": {
            "subdomains": ["otile1", "otile2", "otile3", "otile4"],
            "maxZoom": 18,
            "url": "http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png",
            "noWrap": true
        }
    }, {
        "name": "dummy",
        "active": true,
        "source": "localhost",
        "nom": "A Real Dummy",
        "thumb": "offline/dummy-thumb.png",
        "mapis": "dark",
        "definition": {
            // "subdomains": ["a", "b", "c"],
            "maxZoom": 18,
            "url": "offline/dummy-thumb.png",
            // "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
            "noWrap": true
        }
    },
    {
            "name": "pencil",
            "active": false,
            "source": "mapbox",
            "nom": "Aj Ashton's Pencil Map",
            "thumb": "offline/mapbox-mario.png",
            "mapis": "dark",
            "definition": {
                "subdomains": ["a", "b", "c"],
                "maxZoom": 18,
                "url": "https://{s}.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A",
                // "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
                "noWrap": true
            }
        }
    ]
}

// baselayers = baselayersmobile
    /* -------------------------------------------------- BASEMAP -----------------------  */
window.appBasemap = new Basemap(
    // {tileset:"mapquest"}
);
window.appBasemapView = new BasemapView({
    model: appBasemap
});
/* -------------------------------------------------- QUERY -----------------------  
window.appQuery = new Query();
window.appQueryView = new QueryView({
    model: appQuery
});
*/
appBaseLayers = new BaseLayersCollection(baselayers.layers);
// ...and an actual map
appBaseLayersView = new BaseLayersView({
    collection: appBaseLayers
});
/* -------------------------------------------------- STATE -----------------------  */
window.appState = new State({});
/* -------------------------------------------------- POSTS -----------------------  */
// window.appPosts = new PostsCollection();
/* -------------------------------------------------- GEOMS -----------------------  */
window.appGeoms = new GeomsCollection();
window.appGeomsView = new GeomsView({
    collection: appGeoms
});
/* -------------------------------------------------- Contents -----------------------  */
// window.appContentsAbout = new ContentsCollection();
// window.appContentsCV = new ContentsCollection();
// window.appContents = new ContentsCollection();
// window.appContentsAbout = new ContentsCollection([]);
// window.appContentsMasterView = new ContentsMasterView({
//     collection: appContents
// });
// window.appContentsAboutView = new ContentsView({
//     collection: appContents,
//     el:"#about-container",
//     cfilter:"about"
// });
// window.appContentsCVView = new ContentsMasterView({
// collection: appContentsCV,
// el:"#cv-container"
// ,
// template: Handlebars.templates['AboutViewTpl']
// });
// window.appPostsActiveView = new PostsActiveView({
//     collection: appPosts
// });
// window.appPostsListView = new PostsListView({
//     collection: appPosts
// });
// window.appPostsGeomView = new PostsGeomView({
//     collection: appPosts
// });
// window.metaContent = new Content();
// window.metaContents = new ContentsCollection();
// window.MetaContents = new MetaContentsCollection([]
//     , {
//     // cf: "*"
// }
// );


window.cxabout = new SubContentsCollection([], {
    cf: "about"
});

window.cxcv = new SubContentsCollection([], {
    cf: "cv"
});


window.cxMetaContents = new ContentsCollection([], {
    // cf: "about"
});

window.vabout = new ContentsView({
    collection: cxabout,
    cf:"about"
});

// 
// window.appContentsAbout = new ContentsCollection([], {
//     cf: "about"
// });
// window.appContentsCV = new ContentsCollection([], {
//     cf: "cv"
// });
// appContentsAbout.fetch({
//             success: function() {
//                 appContentsAboutView.render()
//             }
//             ,
//             error: function(collection, response, options){
//                 // console.log(response);
//                 appContentsAboutView.render()
//             }
//         });
//  appContentsCV.fetch({
//             success: function() {
//                 appContentsCVView.render()
//             },
//             error: function(collection, response, options){
//                 // console.log(response);
//                 appCBBContentsCVView.render_error()
//             }
//         })
/* -------------------------------------------------- AUDIT -----------------------  */
window.appAudit = new Audit();
window.appAuditView = new AuditView({
    model: appAudit
});
/* -------------------------------------------------- ACTIVITY -----------------------  */
window.appActivity = new Activity({});
window.appActivityView = new ActivityView({
    model: appActivity
});
map.on('moveend', function() {
    appState.set({
        bbox: map.getBounds().toBBoxString()
    })
}); //on
/* -------------------------------------------------- FLOATERS -----------------------  */
function puFactory(p) {
    /* -------
    this receives one-time fires of popup events and completely wipes their guts, replacing them with...well, the same thing cept it's all bound up in Backbone goodness
    ---- */
    // first grab the pu's container node
    var nel = p.popup._contentNode
        // and since the p obj has been affixed with the original leaflet object's model ("model") we just pass it along like so
        // but also we affix the leaflet id of the feature so we can close this mofo later (among other ops maybe)
    var pm = new Popup(p.model).set({
        leafletid: p.layer._leaflet_id
    });
    var pv = new PopupView({
        model: pm,
        el: nel
    })
    console.log("pv:");
    console.log(pv);
}

function cwmccallback(r) {
    // catch-all callback can debug if we want it to
    // console.log("allback sez:");
    // console.log(r);
}
// function splitLocation(str){
//     // given one of our stored/index location strings (e.g. "point:66" or "poly:6666")
//     // we bust it up, test its type, return the doctored version for pulling out of cartodb
// var sp=str.split(":");var t = sp[0];var i = sp[1];
// switch(t) {
//     case 'line':
//     var id = i*plierline
//         break;
//     case 'poly':
//     var id = i*plierpoly
//         break;
//     default:
//         var id = i
// }
// return id
// }
//

$(document).keydown(function(e) {
    if (e.keyCode == 17) {
        // $("#postslist-posts").toggleClass("collapsed")
        $("#postslist-container").toggleClass("collapsed")
        $("#active-container").toggleClass("collapsed")
        if (appState.get("panestate") == "down") {
            appState.set({
                "panestate": "out"
            })
        } else {
            appState.set({
                "panestate": "down"
            })
        }
        $('body').find('[data-toggle="tooltip"]').tooltip('hide');
    }
});


/* -------------------------------------------------- READY -----------------------  */
$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        var tid = $(e.currentTarget).attr('id').split("-")[2]
        appState.set({
            tab: tid
        })
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    }); //click


if(appState.get("panestate")=="down"){
            $("#postslist-container").addClass("collapsed")
        $("#active-container").addClass("collapsed")
$('body').find('[data-toggle="tooltip"]').tooltip('hide');
}

cxMetaContents.fetch()
appGeoms.fetch();

}); //ready