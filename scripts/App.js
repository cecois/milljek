---
---

/*
----------------------------------------------------------------------  GLOBALS
*/
window.verbose=true
window.gpre_point = "g."
window.gpre_poly = "gD"
window.gpre_line = "g|"


{% capture posts %}
[
{% for post in site.posts %}
{
	"title"    : "{{ post.title }}",
	"url"      : "{{ post.url }}",
	"slug"      : "{{ post.slug }}",
	"date"     : "{{ post.date | date: "%B %d, %Y" }}",
	"content"  : "{{ post.content | escape }}"
} {% if forloop.last %}{% else %},{% endif %}
{% endfor %}
]
{% endcapture %}


var appState = new State({});

/* -------------------------------------------------- MAP STUFF -----------------------  */

/* -------------- MAP STYLES -----------------------  */

function pullCVJEKStyle(gtype,active,seen){
  /**
        in here we nudge the style definitions a little bc it's not always a 1:1 match between 
        geomtype and the name of the style applies (e.g. linestring vs. multilinestring 
        or the fact that polys get line styles, too)
        **/

// first let's normalize for beauty:
if(gtype.toLowerCase()=='point'){var gtypa=gtype.toLowerCase()}
	if(gtype.toLowerCase()=='poly'){var gtypa=gtype.toLowerCase();}
if(gtype.toLowerCase()=='multipolygon'){var gtypa='poly';}
if(gtype.toLowerCase()=='polygon'){var gtypa='poly';}
if(gtype.toLowerCase()=='line'){var gtypa=gtype.toLowerCase();}
if(gtype.toLowerCase()=='multilinestring'){var gtypa='line';}
if(gtype.toLowerCase()=='linestring'){var gtypa='line';}

// 


var fill = "#384754";
var filla = "#C7E048";
var fills = "#E0E0E0";
var bord = "#C7E048";
var borda = "#C7E048";
switch (gtypa) {
	case 'point':
	if (seen==1) {
		var style = {
			radius: 8,
			fillColor: fill,
			color: fills,
			weight: 10,
			opacity: .6,
			fillOpacity: 0.2,
		};
	} else if (active==1) {
		var style = {
			radius: 18,
			fillColor: filla,
			color: borda,
			weight: 13,
			opacity: 1,
			fillOpacity: 0.8,
		};
	} else {
		var style = {
			radius: 8,
			fillColor: fill,
			color: fills,
			weight: 10,
			opacity: 1,
			fillOpacity: 0.8,
		};
	}
	break;
	case 'poly':
	if (seen==1) {
		var style = {
			fillColor: fill,
			color: fills,
			weight: 10,
			opacity: .2,
		};
	} else if (active==1) {
		var style = {
			fillColor: filla,
			color: borda,
			weight: 13,
			opacity: 1,
		};
	} else {
		var style = {
			fillColor: fill,
			color: fills,
			weight: 10,
			opacity: .8,
		};
	}
	break;
	case 'line':
	if (seen==1) {
		var style = {
			fillColor: fill,
			color: fills,
			weight: 10,
			opacity: .2,
		};
	} else if (active==1) {
		var style = {
			fillColor: filla,
			color: borda,
			weight: 13,
			opacity: 1,
		};
	} else {
		var style = {
			fillColor: fill,
			color: fills,
			weight: 10,
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

// function pullEOLStyle(gtype, gstate) {
//     /**
//         in here we nudge the style definitions a little bc it's not always a 1:1 match between 
//         geomtype and the name of the style applies (e.g. linestring vs. multilinestring 
//         or the fact that polys get line styles, too)
//         **/
//         var fill = "#384754";
//         var filla = "#C7E048";
//         var fills = "#50667A";
//         var bord = "#C7E048";
//         var borda = "#384754";
//         switch (gtype.toLowerCase()) {
//         	case 'point':
//         	if (gstate == "seen") {
//         		var style = {
//         			radius: 8,
//         			fillColor: fill,
//         			color: fills,
//         			weight: 1,
//         			opacity: .6,
//         			fillOpacity: 0.2,
//         		};
//         	} else if (gstate == "active") {
//         		var style = {
//         			radius: 18,
//         			fillColor: filla,
//         			color: borda,
//         			weight: 1,
//         			opacity: 1,
//         			fillOpacity: 0.8,
//         		};
//         	} else {
//         		var style = {
//         			radius: 8,
//         			fillColor: fill,
//         			color: fills,
//         			weight: 1,
//         			opacity: 1,
//         			fillOpacity: 0.8,
//         		};
//         	}
//         	break;
//         	case 'poly':
//         	if (gstate == "seen") {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .2,
//         		};
//         	} else if (gstate == "active") {
//         		var style = {
//         			fillColor: filla,
//         			color: borda,
//         			weight: 8,
//         			opacity: 1,
//         		};
//         	} else {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .8,
//         		};
//         	}
//         	break;
//         	case 'multipolygon':
//         	if (gstate == "seen") {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .2,
//         		};
//         	} else if (gstate == "active") {
//         		var style = {
//         			fillColor: filla,
//         			color: borda,
//         			weight: 8,
//         			opacity: 1,
//         		};
//         	} else {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .8,
//         		};
//         	}
//         	break;
//         	case 'polygon':
//         	if (gstate == "seen") {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .2,
//         		};
//         	} else if (gstate == "active") {
//         		var style = {
//         			fillColor: filla,
//         			color: borda,
//         			weight: 8,
//         			opacity: 1,
//         		};
//         	} else {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .8,
//         		};
//         	}
//         	break;
//         	case 'line':
//         	if (gstate == "seen") {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .2,
//         		};
//         	} else if (gstate == "active") {
//         		var style = {
//         			fillColor: filla,
//         			color: borda,
//         			weight: 8,
//         			opacity: 1,
//         		};
//         	} else {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .8,
//         		};
//         	}
//         	break;
//         	case 'multilinestring':
//         	if (gstate == "seen") {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .2,
//         		};
//         	} else if (gstate == "active") {
//         		var style = {
//         			fillColor: filla,
//         			color: borda,
//         			weight: 8,
//         			opacity: 1,
//         		};
//         	} else {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .8,
//         		};
//         	}
//         	break;
//         	case 'linestring':
//         	if (gstate == "seen") {
//         		var style = {
//         			fillColor: fill,
//         			color: fills,
//         			weight: 10,
//         			opacity: .2,
//         		};
//         	} else if (gstate == "active") {
//         		var style = {
//         			fillColor: filla,
//         			color: borda,
//         			weight: 8,
//         			opacity: 1,
//         		};
//         	} else {
//         		var style = {
//         			fillColor: fill,
//         			color: bord,
//         			weight: 10,
//         			opacity: .8,
//         		};
//         	}
//         	break;
//         	default:
//         	var style = {
//         		fillColor: "gray",
//         		color: "gray",
//         		weight: 3,
//         		opacity: .3
//         	};
//         }
//         return style
//     }

/* ---------- BASELAYERS ------------ */

var baselayers = {
	"layers": [{
		"name": "mapquest",
		"active": false,
		"source": "mapquest",
		"nom": "MapQuest OSM",
		"thumb": "http://otile1.mqcdn.com/tiles/1.0.0/osm/3/4/2.png",
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
		"thumb": "assets/offline/dummy-thumb.png",
		"mapis": "dark",
		"definition": {
			"maxZoom": 18,
			"url": "assets/offline/dummy-thumb.png",
			"noWrap": true
		}
	}

	]
}

var mapBaseLayers = new BaseLayersCollection(baselayers.layers);
var mapBaseView = new BaseLayersView({
	collection: mapBaseLayers
});


/* -------------------------------------------------- POSTS -----------------------  */
var posts = {{posts | strip_newlines}}

var cxPosts = new PostsCollection(posts, {});
var vPostsView = new PostsView({
	collection: cxPosts
});
var vPostsMenu = new PostsMenuView({
	collection: cxPosts
});

/* -------------------------------------------------- GEOMS -----------------------  */

var mapGeoms = new GeomsCollection();
var mapGeomsView = new GeomsView({
	collection: mapGeoms
});
mapGeoms.fetch()

/* -------------------------------------------------- HANDLEBARS START -----------------------  */
Handlebars.registerHelper('debug', function(options) {
	console.log("this in HB debug:");
	console.log(this);

	return new Handlebars.SafeString("check console");
});

/* -------------------------------------------------- FUNCS -----------------------  */

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


function leafletize_Bbox(bboxstring){
	// what we could do in here is add some validation, fix the syntax for ppl who don't send form West,South,East,North but get with it yo!
	var ba = bboxstring.split(",")
	return [
	[ba[1], ba[0]],
	[ba[2], ba[3]]
	]
}

/* -------------------------------------------------- READY -----------------------  */
$(document).ready(function() {
	// $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
	// 	e.preventDefault();
	// 	var tid = $(e.currentTarget).attr('id').split("-")[2]
	// 	$(this).siblings('a.active').removeClass("active");
	// 	$(this).addClass("active");
	// 	var index = $(this).index();
	// 	$("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
	// 	$("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
 //    }); //click

 $(document).keydown(function(e){
 	if(e.keyCode == 17){
 		if(appState.get("panestate")=="down"){
 			appState.set({panestate:"out"});
 		} else {
 			appState.set({panestate:"down"});
 		}
 	}
 })

// if(appState.get("panestate")=="down"){
//             $("#postslist-container").addClass("collapsed")
//         $("#active-container").addClass("collapsed")
// $('body').find('[data-toggle="tooltip"]').tooltip('hide');

});