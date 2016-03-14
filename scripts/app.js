---
---

/*
----------------------------------------------------------------------  GLOBALS
*/
window.verbose=true

if(verbose==true){console.log("appjs in da house");}

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

var posts = {{posts | strip_newlines}}

var cxPosts = new PostsCollection(posts, {});
var vPostsView = new PostsView({
	collection: cxPosts
});
var vPostsMenu = new PostsMenuView({
	collection: cxPosts
});

/* -------------------------------------------------- HANDLEBARS START -----------------------  */
Handlebars.registerHelper('debug', function(options) {
	console.log("this in HB debug:");
	console.log(this);

	return new Handlebars.SafeString("check console");
});

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
 		console.log("key up")
 	}
 })

// if(appState.get("panestate")=="down"){
//             $("#postslist-container").addClass("collapsed")
//         $("#active-container").addClass("collapsed")
// $('body').find('[data-toggle="tooltip"]').tooltip('hide');

});