(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['postsListViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<li data-target=\""
    + escapeExpression(lambda((depth0 != null ? depth0.location : depth0), depth0))
    + "\" data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"pick";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.seen : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n    <div class=\"\">\n"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.location : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n    </div>\n</li>\n";
},"2":function(depth0,helpers,partials,data) {
  return " active";
  },"4":function(depth0,helpers,partials,data) {
  return " seen";
  },"6":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "("
    + escapeExpression(lambda((depth0 != null ? depth0.location : depth0), depth0))
    + ")";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});
})();