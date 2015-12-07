var PostsView = Backbone.View.extend({
    el: "#postslist-posts",
    // template: Handlebars.templates['postsListViewTpl'],
    template_list: Handlebars.templates['postsListViewTpl'],
    events: {
        "click li": "activate",
    },
    initialize: function() {
         // this.render()
         this.listenTo(this.collection,'change',this.render)
        this.listenTo(this.collection,'add',this.render)
        // this.listenTo(this.collection, 'sync', this.render)
        return this
    },
    refetch: function(url){

// console.log("refetch url:");
        // console.log(url);

    } //refetch
    ,
    activate: function(e){

e.preventDefault()

var dt = $(e.currentTarget).attr("data-id")

// AP=
appState.set({"slug":dt})

return this


    }//activate
    ,
    extract: function() {
            // var rawlols = this.collection.pluck("locations")
            // can't use pluck cuz we gotta process them more specifically
            //
            var lopoints = []
            var lolines = []
            var lopolys = []
                //
            var lols = this.collection.map(function(m, i, t) {
                var raw = m.get("locations")[0]
                var l = raw.split(":")
                switch (l[0]) {
                    case 'line':
                        var i = l[1] // * plierline
                        lolines.push(i)
                        break;
                    case 'poly':
                        var i = l[1] // * plierpoly
                        lopolys.push(i)
                        break;
                    case 'point':
                        var i = l[1];
                        lopoints.push(5)
                        break;
                    default:
                        i = null;
                }
            })
            // console.log("lopoints:");
            // console.log(lopoints);
            // console.log("lolines:");
            // console.log(lolines);
            // console.log("lopolys:");
            // console.log(lopolys);

// var sql = new cartodb.SQL({ user: 'pugo' });
// sql.execute("SELECT * FROM cbb_point WHERE cartodb_id IN (3,5,6)")

if(lopoints.length>0){
var prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id IN ("+lopoints.join(",")+")"
// console.log("prtlpoint:");
// console.log(prtlpoint);
} else {
var prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id = 00"
}

if(lolines.length>0){
var prtlline = "SELECT cartodb_id*"+plierline+",the_geom FROM cbb_line where cartodb_id IN ("+lolines.join(",")+")"
// console.log("prtlline:");
// console.log(prtlline);
} else {
var prtlline = "SELECT cartodb_id,the_geom FROM cbb_line where cartodb_id = 00"
}
if(lopolys.length>0){
var prtlpoly = "SELECT cartodb_id*"+plierpoly+",the_geom FROM cbb_poly where cartodb_id IN ("+lopolys.join(",")+")"
// console.log("prtlpoly:");
// console.log(prtlpoly);
} else {
var prtlpoly = "SELECT cartodb_id,the_geom FROM cbb_poly where cartodb_id = 00"
}

// var actualsql = "SELECT * FROM cbb_point WHERE cartodb_id IN (3,5,6)"
var actualsql = prtlpoint+" UNION ALL "+prtlline+" UNION ALL "+prtlpoly

// https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20cbb_point%20WHERE%20cartodb_id%20IN%20%283,5,6%29
// https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT the_geom,cartodb_id FROM cbb_point where cartodb_id=5 UNION ALL SELECT the_geom,cartodb_id FROM cbb_line where cartodb_id=5

var carl = "https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q="+actualsql

// console.log("actualsql:");
// console.log(actualsql);

appQuery.set({"cartostring":carl})

var cartos = $.getJSON(carl, {}, function(json, textStatus) {
        /*optional stuff to do after success */
        
});

console.log("cartos:");
        console.log(cartos);

            return this
            .merge()
        } //extract
        ,

        merge: function(){

// this.collection = _.merge

return this
.render()
        }//merge
        ,
    render: function() {

        // this.extract()
        
        $(this.el).html(this.template_list({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        // 
        $("#postsgeom-fake").html("<a href='"+appQuery.get("cartostring")+"'>"+appQuery.get("cartostring")+"</a>"
            );
        return this
    }
});