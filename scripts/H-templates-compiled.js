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
  return "<div id=\"posts-menu\" class=\"list-group\"><a class=\"list-group-item text-center active about\" href=\"#\" data-id=\"about-cover-letter-gloss\">\n	<br>\n	Set But Ambitious\n</a>\n<a class=\"list-group-item text-center  about\" href=\"#\" data-id=\"about-portfolio\">\n	<br>\n	Portfolio\n</a>\n<a class=\"list-group-item text-center  cv\" href=\"#\" data-id=\"cv-positions\">\n	<br>\n	Cv Positions\n</a>\n<a class=\"list-group-item text-center  cv\" href=\"#\" data-id=\"cv-publications\">\n	<br>\n	Publications &amp; Presentations\n</a>\n<a class=\"list-group-item text-center  cv\" href=\"#\" data-id=\"cv-awards-and-recognition\">\n	<br>\n	Awards &amp; Recognition\n</a>\n</div>";
  },"useData":true});
})();