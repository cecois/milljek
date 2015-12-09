var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        // return solrhost + "miljek/select?json.wrf=cwmccallback&rows=999&wt=json&q=" + encodeURIComponent(appQuery.get("solrstring"));
        return "api/jekyllfetcher.php?cb=cwmccallback"
    },
    initialize: function(options) {
        this.on('sync', this.activate, this);
        // this.on('sync', this.refetch, this);
        options || (options = {});
        return this
    },
    sync: function(method, collection, options) {
        if (verbose == true) {
            console.log("syncing PostsCollection")
        }
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    refetch: function() {
            console.log("REFETCHING FROM WITHIN POSTS.js...")
            return this
        } //refetch
        ,
    parse: function(resp) {
        if (verbose == true) {
            console.log("parsing PostsCollection:")
        }
        console.log(resp)
        var hitdocs = resp.response.docs
        return hitdocs;

//         var lopoints = []
//         var lolines = []
//         var lopolys = []
//             //
//         var lols = hitdocs.map(function(m, i, t) {
//             if (typeof m.location !== 'undefined') {
//                 var raw = m.location
//                 var l = raw.split(":")
//             } else {
//                 l = 00000
//             }
//             switch (l[0]) {
//                 case 'line':
//                     var i = l[1] // * plierline
//                     lolines.push(i)
//                     break;
//                 case 'poly':
//                     var i = l[1] // * plierpoly
//                     lopolys.push(i)
//                     break;
//                 case 'point':
//                     var i = l[1];
//                     lopoints.push(5)
//                     break;
//                 default:
//                     i = null;
//             }
//         })
//         if (lopoints.length > 0) {
//             var prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id IN (" + lopoints.join(",") + ")"
//         } else {
//             var prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id = 00"
//         }
//         if (lolines.length > 0) {
//             // var prtlline = "SELECT cartodb_id*"+plierline+",the_geom FROM cbb_line where cartodb_id IN ("+lolines.join(",")+")"
//             var prtlline = "SELECT cartodb_id,the_geom FROM cbb_line where cartodb_id IN (" + lolines.join(",") + ")"
//         } else {
//             var prtlline = "SELECT cartodb_id,the_geom FROM cbb_line where cartodb_id = 00"
//         }
//         if (lopolys.length > 0) {
//             // var prtlpoly = "SELECT cartodb_id*"+plierpoly+",the_geom FROM cbb_poly where cartodb_id IN ("+lopolys.join(",")+")"
//             var prtlpoly = "SELECT cartodb_id,the_geom FROM cbb_poly where cartodb_id IN (" + lopolys.join(",") + ")"
//         } else {
//             var prtlpoly = "SELECT cartodb_id,the_geom FROM cbb_poly where cartodb_id = 00"
//         }


// /* -------------------------------------------------- CARL ------------------------------------------------ */
//         var actualsql = prtlpoint + " UNION ALL " + prtlline + " UNION ALL " + prtlpoly
//             // var carl = "https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q="+actualsql
//         var carl = "offline/cartodb-query.geojson"
// /* -------------------------------------------------- /CARL ------------------------------------------------ */


//         appQuery.set({
//             "cartostring": carl
//         })
//         $.getJSON(carl, function(data) {
//             $.each(data.features, function(key, val) {

//                 var gt = val.geometry.type
//                 var i = val.properties.cartodb_id
//                 switch (gt) {
//                     case 'Point':
//                         // var i = val.properties.cartodb_id
//                         var d = 'point'
//                         break;
//                     case 'MultiLineString':
//                         // var i = val.properties.cartodb_id*plierline
//                         var d = 'line'
//                         break;
//                     case 'Polygon':
//                         // var i = val.properties.cartodb_id*plierpoly
//                         var d = 'poly'
//                         break;
//                     default:
//                         i = null;
//                 }
//                 var id = d + ":" + i;
//                 val.id = id

//             }); //each

//             _.each(hitdocs, function(value, key, list) {
//                 _.extend(value, _.omit(_.findWhere(data.features, {
//                     id: value.location
//                 }), 'id')); //extend
//             });

//             return data.features
//         }); //getjson


//         return hitdocs
//             // return docs_w_carto
    },

    deactivate: function() {
        _.every(this.models, function(d, index) {
                d.set({
                    active: false
                }, {
                    silent: true
                })
            }) // every
        return this
    },
    activate: function() {
            this.deactivate()
            _.each(this.models, function(d, index) {
                if (d.id == window.AP) {
                    d.set({
                        "active": true
                    })
                }
            }); //each
            return this
        } //actxivate
});