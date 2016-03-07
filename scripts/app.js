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
cxPosts = new PostsCollection(posts, {});
vPostsView = new PostsView(cxPosts, {});