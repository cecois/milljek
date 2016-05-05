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
	"location"      : "{{ post.location }}",
	"date"     : "{{ post.date | date: "%B %d, %Y" }}",
	"content"  : "{{ post.content | escape }}"
} {% if forloop.last %}{% else %},{% endif %}
{% endfor %}
]
{% endcapture %}

var posts = {{posts | strip_newlines}}

/* -------------------------------------------------- POSTS -----------------------  */

var cxPosts = new PostsCollection();

/* -------------------------------------------------- MAP -----------------------  */

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
		"thumb": "/spatialtrack/assets/offline/thumb-dummy.png",
		"mapis": "dark",
		"definition": {
			"maxZoom": 18,
			"url": "/spatialtrack/assets/offline/thumb-pencil.png",
			"noWrap": true
		}
	},{
		"name": "pencil",
		"active": false	,
		"source": "mapbox",
		"nom": "Aj Ashton's Pencil Map",
		"thumb": "/spatialtrack/assets/offline/thumb-pencil.png",
		"mapis": "dark",
		"definition": {
			"subdomains": ["a", "b", "c"],
			"maxZoom": 18,
			"url": "https://{s}.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A",
			"noWrap": true
		}
	}

	]
}

var MILLERIA = new Util();

var mapBaseLayers = new BaseLayersCollection(baselayers.layers);
var mapBaseView = new BaseLayersView({
	collection: mapBaseLayers
});

var mapGeoms = new GeomsCollection();
var mapGeomsView = new GeomsView({
	collection: mapGeoms
});

var pActive = new PostView();


/* -------------------------------------------------- READY -----------------------  */
$(document).ready(function() {

	cxPosts.reset(posts)

	$(document).keydown(function(e){
		if(e.keyCode == 18){
			$(".wrapper").toggleClass("down")
		}
	})

});