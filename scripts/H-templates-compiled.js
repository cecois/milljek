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
templates['postsMenuViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<a data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.slug : depth0), depth0))
    + "\" href=\"#\" class=\"list-group-item text-center ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " ";
  stack1 = ((helpers.groupem || (depth0 && depth0.groupem) || helperMissing).call(depth0, (depth0 != null ? depth0.slug : depth0), {"name":"groupem","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n	<br/>\n	"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "\n</a>\n";
},"2":function(depth0,helpers,partials,data) {
  return "active";
  },"4":function(depth0,helpers,partials,data) {
  return "";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});
})();