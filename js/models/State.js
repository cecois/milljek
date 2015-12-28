var State = Backbone.Model.extend({
    defaults: {
        "q":null,
"slug":null,
"bbox":null,
"basemap":null,
"ap":{"slug":null,"geomid":null}
    },
    initialize: function(options) {
        options || (options = {});
        // this.listenTo(appQuery, 'change:rawstring', this.update)
        this.listenTo(appQuery, 'change:solrstring', this.update)
        this.on('change', this.update, this)
        return this
    },
    update: function(){
console.log("updating in State...");
appRoute.navigate(this.pullurl())

    } //update
    ,
    pullurl: function() {

var aslug = appState.get("ap").slug

var state = 
//thishost+"/#"+
appQuery.get("solrstring")+"/"+aslug+"/"+map.getBounds().toBBoxString()+"/pencil"

return state


    }
});