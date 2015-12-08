var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: function() {
        return solrhost + "miljek/select?json.wrf=cwmccallback&rows=999&wt=json&q=" + encodeURIComponent(appQuery.get("solrstring"));
    },
    initialize: function(options) {
        this.on('sync', this.activate, this);
        options || (options = {});
        return this
    },
    sync: function(method, collection, options) {
        if (verbose == true) {
            console.log("syncing PostsCollection")
        }
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    parse: function(resp) {
        if (verbose == true) {
                console.log("parsing PostsCollection:")

        }

var hitdocs = resp.response.docs

var lopoints = []
            var lolines = []
            var lopolys = []
                //
            var lols = hitdocs.map(function(m, i, t) {
                // var raw = m.get("locations")[0]
                var raw = m.locations[0]
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

if(lopoints.length>0){
var prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id IN ("+lopoints.join(",")+")"
} else {
var prtlpoint = "SELECT cartodb_id,the_geom FROM cbb_point where cartodb_id = 00"
}

if(lolines.length>0){
var prtlline = "SELECT cartodb_id*"+plierline+",the_geom FROM cbb_line where cartodb_id IN ("+lolines.join(",")+")"
} else {
var prtlline = "SELECT cartodb_id,the_geom FROM cbb_line where cartodb_id = 00"
}
if(lopolys.length>0){
var prtlpoly = "SELECT cartodb_id*"+plierpoly+",the_geom FROM cbb_poly where cartodb_id IN ("+lopolys.join(",")+")"
} else {
var prtlpoly = "SELECT cartodb_id,the_geom FROM cbb_poly where cartodb_id = 00"
}

var actualsql = prtlpoint+" UNION ALL "+prtlline+" UNION ALL "+prtlpoly

// var carl = "https://pugo.cartodb.com/api/v2/sql?format=GeoJSON&q="+actualsql
var carl = "offline/cartodb-query.geojson"

appQuery.set({"cartostring":carl})


var cartos = $.getJSON( carl, function( data ) {
  // var zipd = [];
  $.each( data.features, function( key, val ) {
    // items.push( "<li id='" + key + "'>" + val + "</li>" );
    // DIP INTO COLLECTION, APPLYING GEOM WHERE THE IDS MATCH
    console.log("val:"); console.log(val.geometry.type);

var gt = val.geometry.type

switch (gt) {
                    case 'Point':
                        var i = val.properties.cartodb_id
                        break;
                    case 'MultiLineString':
                    var i = val.properties.cartodb_id*plierline
                        break;
                    case 'Polygon':
                    var i = val.properties.cartodb_id*plierpoly
                        break;
                    default:
                        i = null;
                }

// var match = hitdocs.findWhere({"cartodb_id":i})

console.log("shoppin id of:"); console.log(i);
var match = $.grep(hitdocs, function(e,i){ return e.cartodb_id == i; });

console.log("match:"); console.log(match);

    //
  }); //each

// var zipd=_.zip(data.features, hitdocs);

// console.log("data.features in posts parse:"); console.log(data.features);
// console.log("hitdocs in posts parse:"); console.log(hitdocs);
// console.log("zipd in posts parse:"); console.log(zipd);
}); //getjson


        // var hitdocs = resp.response.docs

        // appGeoms.set({"sources":hitdocs})
        // var cartos = this.extract();

// var docs_w_carto = this.extract(resp.response.docs)

        return hitdocs
        // return docs_w_carto
    }
        ,
//         zip: function(jekylldocs,cartodocs){

// console.log("in zip...");
// console.log("jekylldocs");
// console.log(jekylldocs);
// console.log("cartodocs");
// console.log(cartodocs);

// return this

//         },
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