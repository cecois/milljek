var PostsGeomView = PostsMetaView.extend({
    el: "#postsgeom-fake",
    template: Handlebars.templates['postsGeomFakeViewTpl'],
    events: {},
    initialize: function() {
         this.render()
        this.listenTo(this.collection, 'sync', this.render)
        return this
    },
    refetch: function(url){

// console.log("refetch url:");
        // console.log(url);

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