/* -------------------------------------------------- GLOBALS -----------------------  */
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.agent = "mobile";
} else {
    window.agent = "desktop";
}
window.offline = "true"
    // window.thedomain="trainertothestarsseekingstars.org"
window.thedomain = "eolapp-lbones.rhcloud.com"
window.gpre_point = "g."
window.gpre_poly = "gD"
window.gpre_line = "g|"
window.gseens = [
        "g.20",
        "gD888",
        "g|3",
        "g|12"
    ]
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
/* -------------------------------------------------- HANDLEBARS START -----------------------  */
Handlebars.registerHelper('debug', function(options) {
    // if(verbose==true){
    //     console.log("debug hb:");
    console.log(this);
    // }
    return new Handlebars.SafeString("check console");
});
/* -------------------------------------------------- BASEMAPS -----------------------  */
var baselayersmobile = {
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
        // "thumb": "file:///Users/ccmiller/Sites/mstroke/src/images/2877247_jkms-25-888-g002.png",
        "mapis": "dark",
        "definition": {
            // "subdomains": ["a", "b", "c"],
            "maxZoom": 18,
            "url": "offline/dummy-thumb.png",
            // "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
            "noWrap": true
        }
    }]
}
var baselayersdummified = {
    "layers": [{
        "name": "dummy",
        "active": true,
        "source": "localhost",
        "nom": "A Real Dummy",
        "thumb": "offline/dummy-thumb.png",
        "mapis": "dark",
        "definition": {
            "maxZoom": 18,
            "url": "offline/dummy-thumb.png",
            "noWrap": true
        }
    }, {
        "name": "dummy",
        "active": false,
        "source": "localhost",
        "nom": "A Real Dummy",
        "thumb": "offline/dummy-thumb.png",
        "mapis": "dark",
        "definition": {
            "maxZoom": 18,
            "url": "offline/dummy-thumb.png",
            "noWrap": true
        }
    }]
}
baselayers = baselayersmobile
    /* -------------------------------------------------- BASEMAP -----------------------  */
window.appBasemap = new Basemap(
    // {tileset:"mapquest"}
);
window.appBasemapView = new BasemapView({
    model: appBasemap
});
/* -------------------------------------------------- QUERY -----------------------  */
window.appQuery = new Query();
window.appQueryView = new QueryView({
    model: appQuery
});
appBaseLayers = new BaseLayersCollection(baselayers.layers);
// ...for which we need a menu
// appBaseLayersMenuView = new BaseLayersMenuView({
//     collection: appBaseLayers
// });
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
window.metaContent = new Content();
window.metaContents = new ContentsCollection();
window.appContentsAbout = new ContentsCollection([], {
    cf: "about"
});
window.appContentsCV = new ContentsCollection([], {
    cf: "cv"
});
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
    // $( "#search-container .btn" ).click(function() {
    // var q = $("#search-container > input").val()
    // // appPostsListView.query(q)
    // appQuery.set({"rawstring":q})
    // }); //search-container btn click
}); //ready
$(document).keydown(function(e) {
    if (e.keyCode == 17) {
        // $("#postslist-posts").toggleClass("collapsed")
        $("#postslist-container").toggleClass("collapsed")
        $("#active-container").toggleClass("collapsed")
        if (appState.get("panestate") == 1) {
            appState.set({
                "panestate": 0
            })
        } else {
            appState.set({
                "panestate": 1
            })
        }
        $('body').find('[data-toggle="tooltip"]').tooltip('hide');
    }
});