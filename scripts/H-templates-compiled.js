(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['postsActiveViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  return "active";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.slug : depth0), depth0))
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n	"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "\n</li>\n";
},"useData":true});
templates['postsMenuViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<a class=\"list-group-item text-center "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ap : depth0)) != null ? stack1.active : stack1), depth0))
    + "\" href=\"#\" id=\"active-post-menu-item\" data-id=\"menu-active-post\">\n	<br>\n	Active Post <div class=\"subtitle\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ap : depth0)) != null ? stack1.title : stack1), depth0))
    + "</div>\n</a>\n\n<a class=\"list-group-item text-center "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.akrowsno : depth0)) != null ? stack1.active : stack1), depth0))
    + " az\" href=\"#\" data-id=\"menu-ak\">\n	<br>\n	A-K ("
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.akrowsno : depth0)) != null ? stack1.length : stack1), depth0))
    + ")\n</a>\n\n<a class=\"list-group-item text-center "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.lsrowsno : depth0)) != null ? stack1.active : stack1), depth0))
    + " az\" href=\"#\" data-id=\"menu-ls\">\n	<br>\n	L-S ("
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.lsrowsno : depth0)) != null ? stack1.length : stack1), depth0))
    + ")\n</a>\n<a class=\"list-group-item text-center "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.tzrowsno : depth0)) != null ? stack1.active : stack1), depth0))
    + " az\" href=\"#\" data-id=\"menu-tz\">\n	<br>\n	T-Z ("
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.tzrowsno : depth0)) != null ? stack1.length : stack1), depth0))
    + ")\n</a>\n<a class=\"list-group-item text-center\" href=\"#\" data-id=\"menu-search\">\n	<br>\n	Search\n</a>\n<a class=\"list-group-item text-center\" href=\"#\" data-id=\"menu-about\">\n	<br>\n	About\n</a>";
},"useData":true});
})();