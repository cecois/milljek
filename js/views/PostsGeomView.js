var PostsGeomView = Backbone.View.extend({
    el: "#postsgeom-fake",
    template: Handlebars.templates['postsGeomFakeViewTpl'],
    events: {},
    initialize: function() {
         // this.render()
         // this.refetch()
        // this.listenTo(this.collection, 'add', this.render)
        this.listenTo(this.collection, 'change', this.render)
        // this.listenTo(this.collection, 'parse', this.refetch)
        //

        /* -------------------------------------------------- MAP CONTENT -----------------------  */

// a group for all of the post-specific geoms
mjItems = L.geoJson().addTo(map);


        return this
    },
    style: function(){

console.info("in PGV style...")
// _.each(mjItems._layers, function(value, key, list){

// console.log("value")
// console.log(value)

// console.log("key")
// console.log(key)

// // console.log("cartodb_id in PGV findwhere...")
// // console.log(cartodb_id)
// // console.log("AP.geomid in PGV findwhere...")
// // console.log(AP.geomid)

// if(typeof al !== 'undefined' && al !== null){
//     console.log("al")
//     console.log(al)
// }

// });//each

var al = _.findWhere(mjItems._layers,{"options":AP.geomid})
if(typeof al !== 'undefined' && al !== null){
    console.log("al")
    console.log(al)
}
    return this
    }//style
    ,
    render: function() {

appActivity.set({
            message: "preparing map objects..."
        })
        mjItems.clearLayers();

        this.collection.each(function(hit, i) {
            var hitTemplate = Handlebars.templates['hitMarkerViewTpl']
            var pu = hitTemplate(hit.toJSON());

            if(typeof hit.get("the_geom") !== 'undefined'){

console.log("hit:"); console.log(hit);

            var the_geom = hit.get("the_geom")
            var geomtype = the_geom.geometry.type

// here we kinda reconstruct the post for map display
            var hitm = {
                "type": "Feature",
                "properties": {
                    // "name": the_geom.properties.name,
                    "name": "the_geom.properties.name",
                    "active":hit.get("active"),
                    "cartodb_id": the_geom.properties.cartodb_id,
                    "geom_type": geomtype,
                    // "anno": the_geom.properties.anno,
                    "anno": "the_geom.properties.anno",
                    // "created_at": the_geom.properties.created_at,
                    "created_at": "the_geom.properties.created_at",
                    // "updated_at": the_geom.properties.updated_at
                    "updated_at": "the_geom.properties.updated_at"
                },
                // "geometry": $.parseJSON(the_geom.geometry)
                "geometry": the_geom.geometry
            };


            if (geomtype == "Point") {

// var dStyle = markernew
            var foot = L.geoJson(hitm, {
                    seen: false,
                    active: hitm.properties.active,
                    cartodb_id: hitm.properties.cartodb_id,
                    name: hitm.properties.name,
                    anno: hitm.properties.anno,
                    geom_type: hitm.properties.geomtype,
                    style:function(){
console.log("seen"); console.log(seen);
if(hitm.seen==true){
    return markerseen;
} else if(hitm.properties.active==true){
                        return markeractive} else {
                            return markernew
                        }
                    },
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, this.style);
                    }
                })
                // foot.bindPopup(pu).addTo(mjItems)
                foot.addTo(mjItems)
            } else {
                // var dStyle = markernew
                var foot = L.geoJson(hitm, {
                    seen: false,
                    active: hitm.properties.active,
                    cartodb_id: hitm.properties.cartodb_id,
                    name: hitm.properties.name,
                    anno: hitm.properties.anno,
                    geom_type: hitm.properties.geomtype,
                    style:function(){

if(hitm.seen==true){
    return markerseen;
} else if(hitm.properties.active==true){
                        return markeractive} else {
                            return linenew
                        }
                    },
                })
                // foot.bindPopup(pu).addTo(mjItems)
                foot.addTo(mjItems)
            }

            } //typeof the_geom
}) //collection.each

        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));

appActivityView.stfu()

        return this
        .style()
    }
});