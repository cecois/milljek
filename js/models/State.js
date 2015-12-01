var State = Backbone.Model.extend({
    defaults: {
        "q":null,
"slug":null,
"bbox":null,
"basemap":null
    },
    initialize: function(options) {
        options || (options = {});
        this.listenTo(appQuery, 'change', this.update)
        return this
    },
    update: function(){

appRoute.navigate(this.pullurl())

    } //update
    ,
    pullurl: function() {


var state = thishost+"/#"+appQuery.get("solrstring")+"/"+window.AP+"/"+null+"/pencil"

console.log("state:");console.log(state);
return state


    }
});