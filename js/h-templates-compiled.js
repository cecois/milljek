(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['activityViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "  <span class=\"activity-message pull-left\">";
  stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n  <span class=\"activity-cancel glyphicon glyphicon-remove-sign\" style=\"margin-left:10px;\"></span>";
},"useData":true});
templates['hitMarkerViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  return "";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <h5>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n";
},"5":function(depth0,helpers,partials,data) {
  return "    <h5>(no name string)</h5>\n";
  },"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<p class=\"text-muted\">"
    + escapeExpression(((helper = (helper = helpers.anno || (depth0 != null ? depth0.anno : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"anno","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div class=\" pu-copy pu-copy-marker col-sm-12\">\n";
  stack1 = ((helpers.debug || (depth0 && depth0.debug) || helperMissing).call(depth0, (depth0 != null ? depth0.bit : depth0), {"name":"debug","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.name : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.anno : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div> <!-- marker -->\n\n<div class=\" content-wrap col-sm-12 hidden pu-copy pu-copy-episodes\">\n        <p class=\"text-muted\">HEYOOOOOO eps</p>\n</div> <!-- episodes -->\n\n<div class=\"hidden pu-copy pu-copy-feedback content-wrap col-sm-12\">\n            <p class=\"text-muted\">\n            Until we have a full-on crowd-source component to this, it will have to suffice to anonymously create an issue at <a href=\"https://github.com/cecois/bitmap/issues\">this project's GitHub repo</a>. Go ahead! Try to be specific, but anything that comes in I'll check out.\n            </p>\n            <p class=\"text-muted\">\n            If you really gotta know what becomes of your submission, enter some handle of yours in the handle field (use Twitter, email, GitHub username, InstaGram handle I suppose -- don't get too crazy). I'll let you know what becomes of it. Seriously! I have 0% interest in doing anything else w/ this datum, but be aware it will be part of the public GitHub issue.\n            </p>\n        <div class=\"pu-copy pu-copy-feedback pu-copy-feedback-form\">\n                <label for=\"\">Feature in Question (this)</label>\n            <input data-class=\"pu-issue-title\" class=\"form-control input-sm\" type=\"text\" placeholder=\""
    + escapeExpression(((helper = (helper = helpers.bit || (depth0 != null ? depth0.bit : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bit","hash":{},"data":data}) : helper)))
    + " ("
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + ":"
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + ")\" disabled>\n            <label for=\"\">Issue Body</label>\n            <textarea data-class=\"pu-issue-body\" placeholder=\"What's wrong with this one? (All suggestions will be investigated.)\" class=\"form-control\" rows=\"3\"></textarea>\n            <label for=\"\">Contact Handle (totally optional)</label>\n            <input data-class=\"pu-issue-contact\" class=\"form-control input-sm\" type=\"text\" placeholder=\"e.g. @toddglass or just github.com/huellhowser or something\">\n        </div> <!-- form -->\n\n            <div style=\"margin-top:5px;\"><button class=\"btn btn-default btn-xs btn-block\" type=\"submit\">Submit</button></div>\n</div> <!-- feedback -->\n\n\n<div class=\"btn-group btn-group-xs pull-right\" style=\"margin-bottom:8px;\" role=\"group\">\n\n<button data-toggle=\"tooltip\" data-target=\"marker\" type=\"button\" title=\"marker info\" class=\"btn btn-default btn-pu-nav active\"><span class=\"bt-cartoobj bt-cartoobj-feedback carto-plain-geomtype icom-"
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\"></span></button>\n\n <!--  <button data-toggle=\"tooltip\" data-target=\"episodes\" data-id=\"episodes\" type=\"button\" class=\"btn btn-default btn-pu-nav\"><span data-id=\""
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of referencing episodes\"></span></button> -->\n\n  <button data-toggle=\"tooltip\" data-target=\"feedback\" data-id=\"feedback\" type=\"button\" class=\"btn btn-default btn-pu-nav\"><span data-id=\""
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + "\" class=\"glyphicon glyphicon-flag bt-cartoobj bt-cartoobj-feedback\" title=\"something wrong? anonymously flag this one\"></span></button>\n\n</div>";
},"useData":true});
templates['postsActiveViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "    <div class=\"\">\n";
  stack1 = lambda((depth0 != null ? depth0.content : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        \n    </div>";
},"useData":true});
templates['postsGeomFakeViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.the_geom : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"pick ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n    <div class=\"\">\n"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.the_geom : depth0)) != null ? stack1.type : stack1), depth0))
    + "\n\n    </div>\n</li>\n";
},"3":function(depth0,helpers,partials,data) {
  return "active";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});
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