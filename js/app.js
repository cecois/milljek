/* -------------------------------------------------- GLOBALS -----------------------  */

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
window.agent = "mobile";
} else {
window.agent = "desktop";
}

// window.thedomain="trainertothestarsseekingstars.org"
window.thedomain="bitmap-lbones.rhcloud.com"

// agent="mobile"

// NProgress.configure({
//     parent: '#postslist-container'
// });

/* -------------------------------------------------- HANDLEBARS START -----------------------  */
Handlebars.registerHelper('debug', function(options) {

    // if(verbose==true){
    //     console.log("debug hb:");
        console.log(this);
    // }
    return new Handlebars.SafeString("check console");
});

/* -------------------------------------------------- BASEMAPS -----------------------  */
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
        },{
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

baselayers=baselayersdummified

/* -------------------------------------------------- QUERY -----------------------  */
window.appQuery = new Query();
window.appQueryView = new QueryView({
    model: appQuery
});

/* -------------------------------------------------- STATE -----------------------  */
window.appState = new State({});

appBaseLayers = new BaseLayersCollection(baselayers.layers);
// ...for which we need a menu
// appBaseLayersMenuView = new BaseLayersMenuView({
//     collection: appBaseLayers
// });
// ...and an actual map
appBaseLayersView = new BaseLayersView({
    collection: appBaseLayers
});

/* -------------------------------------------------- POSTS -----------------------  */
window.appPosts = new PostsCollection();
// window.appGeoms = new GeomsCollection();

// window.appPostsMetaView = new PostsMetaView({
//     collection: appPosts
// });

window.appPostsActiveView = new PostsActiveView({
    collection: appPosts
});

window.appPostsListView = new PostsListView({
    collection: appPosts
});


window.appPostsGeomView = new PostsGeomView({
    collection: appPosts
});




/* -------------------------------------------------- BASEMAP -----------------------  */
window.appBasemap = new Basemap({tileset:"mapquest"});
window.appBasemapView = new BasemapView({
    model: appBasemap
});

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


map.on('moveend',function(){

appState.set({bbox:map.getBounds().toBBoxString()})

}); //on

/* -------------------------------------------------- FLOATERS -----------------------  */

function puFactory(p){
    /* -------
    this receives one-time fires of popup events and completely wipes their guts, replacing them with...well, the same thing cept it's all bound up in Backbone goodness
    ---- */

    // first grab the pu's container node
    var nel = p.popup._contentNode

    // and since the p obj has been affixed with the original leaflet object's model ("model") we just pass it along like so
// but also we affix the leaflet id of the feature so we can close this mofo later (among other ops maybe)
    var pm = new Popup(p.model).set({leafletid:p.layer._leaflet_id});
    var pv = new PopupView({model:pm,el: nel})
    console.log("pv:"); console.log(pv);

}

function cwmccallback(r){
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
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });

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

$('body').find('[data-toggle="tooltip"]').tooltip('hide');

    }
});