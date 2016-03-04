var PostsMetaView = Backbone.View.extend({
    // el: "#postslist-posts",
    // template: Handlebars.templates['postsListViewTpl'],
    // template: Handlebars.templates['postsListViewTpl'],
    events: {
        // "click li": "activate",
    },
    initialize: function() {
         // this.render()
         // this.listenTo(this.collection,'change',this.render)
        // this.listenTo(this.collection,'add',this.render)
        // this.listenTo(this.collection, 'reset', this.zip)
        return this
    },
    refetch: function(url){

// console.log("refetch url:");
        // console.log(url);

    } //refetch
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
                var raw = m.get("location")[0]
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

// var carl = "https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q="+actualsql
var carl = "offline/cartodb-query.geojson"

appQuery.set({"cartostring":carl})


$.getJSON( carl, function( data ) {
  // var items = [];
  $.each( data, function( key, val ) {
    // items.push( "<li id='" + key + "'>" + val + "</li>" );
    // DIP INTO THIS.COLLECTION, APPLYING GEOM WHERE THE IDS MATCH
    //
    //
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});

// window.cartos = $.getJSON(carl, {}, function(json, textStatus) {
//         /*optional stuff to do after success */

//         console.log("textStatus:");console.log(textStatus);
//         console.log("json.features:");console.log(json.features);
//         return json.features

// });

console.log("cartos:");
        console.log(cartos);

            // return this
            this.zip(cartos)
        } //extract
        ,

        zip: function(cartos){

console.log("in zip, cartos:");
console.log(cartos);



// this.collection.each(function(m, index) {

//     var geom = _.findWhere(cartos, {properties.cartodb_id: 5});
//     m.set({"geom":geom})
// });

// this.collection({cartos})

return this
.render()
        }//merge
        ,
    render: function() {

        // this.extract()

        // $(this.el).html(this.template({
        //     count: this.collection.models.length,
        //     rows: this.collection.toJSON()
        // }));
        //
        // $("#postsgeom-fake").html("<a href='"+appQuery.get("cartostring")+"'>"+appQuery.get("cartostring")+"</a>");
        return this
    }
});