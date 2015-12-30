var QueryView = Backbone.View.extend({
    el: "#search-container",
    template: Handlebars.templates['queryViewTpl'],
    events: {
"click #bt-search-search": "query",
"click #bt-search-reset": "reset",
    },
    initialize: function() {
        this.model.bind("change", this.render, this);
        return this.render();
    },
    reset: function(){

appQuery.set({"rawstring":"*"})
return this

    },
    query: function(){

console.log("in query event from QVIEW")
appQuery.set({"rawstring":$(this.el).find("input").val()})
// $( "#search-container .btn" ).click(function() {

// var q = $("#search-container > input").val()
// // appPostsListView.query(q)

// appQuery.set({"rawstring":q})

// }); //search-container btn click
return this
    },
    render: function() {
        if (verbose == true) {
            console.log("rendering QueryView")
        }

$(this.el).html(this.template(this.model.toJSON()))

        return this
        .rewire()
    },
    rewire: function(){

$(this.el).find('[data-toggle="tooltip"]').tooltip({container:'body'})

$(this.el).find("input").click(function(event) {
 $(this.el).find('[data-toggle="tooltip"]').tooltip('hide')
});

return this
    }
});