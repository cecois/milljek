var PostsGeomView = Backbone.View.extend({
    el: "#postsgeom-fake",
    template: Handlebars.templates['postsGeomFakeViewTpl'],
    events: {},
    initialize: function() {
         // this.render()
         // this.refetch()
        // this.listenTo(this.collection, 'change', this.render)
        // this.listenTo(this.collection, 'parse', this.refetch)
        return this
    },
    refetch: function(url){

console.log("REFETCHING FROM WITHIN PGV...")
var lopoints = []
        var lolines = []
        var lopolys = []
            //
        var lols = this.collection.map(function(m, i, t) {

            var raw = m.get("location")
            // var raw = m.location[0]
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
        if (lopoints.length > 0) {
            var prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id IN (" + lopoints.join(",") + ")"
        } else {
            var prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id = 00"
        }
        if (lolines.length > 0) {
            // var prtlline = "SELECT cartodb_id*"+plierline+",the_geom FROM cbb_line where cartodb_id IN ("+lolines.join(",")+")"
            var prtlline = "SELECT cartodb_id,the_geom FROM cbb_line where cartodb_id IN (" + lolines.join(",") + ")"
        } else {
            var prtlline = "SELECT cartodb_id,the_geom FROM cbb_line where cartodb_id = 00"
        }
        if (lopolys.length > 0) {
            // var prtlpoly = "SELECT cartodb_id*"+plierpoly+",the_geom FROM cbb_poly where cartodb_id IN ("+lopolys.join(",")+")"
            var prtlpoly = "SELECT cartodb_id,the_geom FROM cbb_poly where cartodb_id IN (" + lopolys.join(",") + ")"
        } else {
            var prtlpoly = "SELECT cartodb_id,the_geom FROM cbb_poly where cartodb_id = 00"
        }
        var actualsql = prtlpoint + " UNION ALL " + prtlline + " UNION ALL " + prtlpoly
            // var carl = "https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q="+actualsql
        var carl = "offline/cartodb-query.geojson"
        appQuery.set({
            "cartostring": carl
        })
        var cartos = $.getJSON(carl, function(data) {
            $.each(data.features, function(key, val) {
                var gt = val.geometry.type
                var i = val.properties.cartodb_id
                switch (gt) {
                    case 'Point':
                        // var i = val.properties.cartodb_id
                        var d = 'point'
                        break;
                    case 'MultiLineString':
                        // var i = val.properties.cartodb_id*plierline
                        // var i = val.properties.cartodb_id
                        var d = 'line'
                        break;
                    case 'Polygon':
                        // var i = val.properties.cartodb_id*plierpoly
                        // var i = val.properties.cartodb_id
                        var d = 'poly'
                        break;
                    default:
                        i = null;
                }
                var id = d + ":" + i

_.extend(
// destination
// _.findWhere(hitdocs, {id:"spatial-track-tom-waits-johnsburg-illinois"})
this.collection[6]
// source
,
{age: 50}
    )//extend


            }); //each

        }); //getjson


return this.render()

    } //refetch
    ,
//     extract: function() {
//             // var rawlols = this.collection.pluck("locations")
//             // can't use pluck cuz we gotta process them more specifically
//             //
//             var lopoints = []
//             var lolines = []
//             var lopolys = []
//                 //
//             var lols = this.collection.map(function(m, i, t) {
//                 var raw = m.get("locations")[0]
//                 var l = raw.split(":")
//                 switch (l[0]) {
//                     case 'line':
//                         var i = l[1] * plierline
//                         lolines.push(i)
//                         break;
//                     case 'poly':
//                         var i = l[1] * plierpoly
//                         lopolys.push(i)
//                         break;
//                     case 'point':
//                         var i = l[1];
//                         lopoints.push(i)
//                         break;
//                     default:
//                         i = null;
//                 }
//             })
//             // console.log("lopoints:");
//             // console.log(lopoints);
//             // console.log("lolines:");
//             // console.log(lolines);
//             // console.log("lopolys:");
//             // console.log(lopolys);

// // var sql = new cartodb.SQL({ user: 'pugo' });
// // sql.execute("SELECT * FROM cbb_point WHERE cartodb_id IN (3,5,6)")

// if(lopoints.length>0){
// var prtlpoint = "point_table where cartodb_id IN ("+lopoints.join(",")+")"
// // console.log("prtlpoint:");
// // console.log(prtlpoint);
// } else {
// var prtlpoint = "point_table where cartodb_id = 00"
// }

// if(lolines.length>0){
// var prtlline = "line_table where cartodb_id*"+plierline+" IN ("+lolines.join(",")+")"
// // console.log("prtlline:");
// // console.log(prtlline);
// } else {
// var prtlline = "line_table where cartodb_id = 00"
// }
// if(lopolys.length>0){
// var prtlpoly = "poly_table where cartodb_id*"+plierpoly+" IN ("+lopolys.join(",")+")"
// // console.log("prtlpoly:");
// // console.log(prtlpoly);
// } else {
// var prtlpoly = "poly_table where cartodb_id = 00"
// }

// // var actualsql = "SELECT * FROM cbb_point WHERE cartodb_id IN (3,5,6)"
// var actualsql = "SELECT * FROM "+prtlpoint+" UNION ALL "+prtlline+" UNION ALL "+prtlpoly

// // https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20cbb_point%20WHERE%20cartodb_id%20IN%20%283,5,6%29
// // https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT the_geom,cartodb_id FROM cbb_point where cartodb_id=5 UNION ALL SELECT the_geom,cartodb_id FROM cbb_line where cartodb_id=5

// // console.log("actualsql:");
// // console.log(actualsql);

// // appQuery.set({"cartostring":actualsql})

//             return this
//         } //extract
//         ,
    render: function() {
        // this.extract()
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        // $(this.el).html(appQuery.get("carl"));
        return this
    }
});