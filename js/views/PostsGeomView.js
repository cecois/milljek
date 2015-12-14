var PostsGeomView = Backbone.View.extend({
    el: "#postsgeom-fake",
    template: Handlebars.templates['postsGeomFakeViewTpl'],
    events: {},
    initialize: function() {
        // this.render()
        // this.refetch()
        // this.listenTo(this.collection, 'add', this.render)
         this.listenTo(this.collection, 'sync', this.render)
        this.listenTo(this.collection, 'change:active', this.render)
            // this.listenTo(this.collection, 'parse', this.refetch)
            //
            /* -------------------------------------------------- MAP CONTENT -----------------------  */
            // a group for all of the post-specific geoms
        mjItems = L.geoJson().addTo(map);
        return this
    },
    // style: function() {
                
    //         var al = _.findWhere(mjItems._layers, {
    //             "options": AP.geomid
    //         })
    //         if (typeof al !== 'undefined' && al !== null) {
    //             console.log("al")
    //             console.log(al)
    //         }
    //         appActivityView.stfu()
    //         return this
    //     } //style
    //     ,
    render: function() {
        appActivity.set({
            message: "preparing map objects..."
        })
        mjItems.clearLayers();
        this.collection.each(function(hit, i) {
                
                var template_geom = Handlebars.templates['hitMarkerViewTpl']
                var pu = template_geom(hit.toJSON());

                if (typeof hit.get("the_geom") !== 'undefined') {
                    var the_geom = hit.get("the_geom")
                    var geomtype = the_geom.geometry.type
                        // here we kinda reconstruct the post for map display
                    var hitm = {
                        "type": "Feature",
                        "properties": {
                            // "name": "the_geom.properties.name",
                            "name": the_geom.properties.name,
                            "active": hit.get("active"),
                            "seen": hit.get("seen"),
                            "cartodb_id": the_geom.properties.cartodb_id,
                            "geom_type": geomtype,
                            "anno": the_geom.properties.anno,
                            // "anno": "the_geom.properties.anno",
                            "created_at": the_geom.properties.created_at,
                            // "created_at": "the_geom.properties.created_at",
                            "updated_at": the_geom.properties.updated_at
                            // "updated_at": "the_geom.properties.updated_at"
                        },
                        // "geometry": $.parseJSON(the_geom.geometry)
                        "geometry": the_geom.geometry
                    };

var stnew = null;
var stact = null;
var stsen = null;

if (geomtype == "Point") {
stnew = marker_new;
stact = marker_act;
stsen = marker_sen;}
else {
stnew = polin_new
stact = polin_act
stsen = polin_sen
}
                        // var dStyle = markernew
                        var foot = L.geoJson(hitm, {
                                // seen: false,
                                seen: hitm.properties.seen,
                                active: hitm.properties.active,
                                cartodb_id: hitm.properties.cartodb_id,
                                name: hitm.properties.name,
                                anno: hitm.properties.anno,
                                geom_type: hitm.properties.geomtype,
                                // style: markernew,
                                style: stnew,
                                pointToLayer: function(feature, latlng) {
                                    if (geomtype == "Point") {
                                        return L.circleMarker(latlng, this.style);
                                    }
                                }
                            })
                            foot.bindPopup(pu).addTo(mjItems)

//                             .setStyle(function(s){

//     console.log("s in setstyle");
//     console.log(s);

//     return stnew
// })
if (foot.options.active == true) {
    console.log("setting to active, foot:")
    console.log(foot);
foot.setStyle(stact)
// this.model.set({seen:true})
// foot.options.seen=true
} else {
    if(foot.options.seen == true) {
        console.log("setting to seen, foot:")
    console.log(foot);
        foot.setStyle(stsen)
    }//seen
}
//                         if (foot.options.seen == true) {
//                             foot.setStyle(stsen)
//                         } else if (foot.options.active == true) {
//                             // console.log("this foot's active:");
//                             // console.log(foot);
//                             foot.setStyle(stact)
// console.log("foot before seen=true:");
// console.log(foot);
//                             console.log("foot after seen = true:");
//                             console.log(foot);
//                         }
//                         
// console.log("foot");
// console.log(foot);
// if (foot.options.seen == true) {
//                             foot.setStyle(stsen)

// }
//                             foot.options.seen=true
                        foot.addTo(mjItems)

                    // } else {
                    //     // var dStyle = markernew
                    //     var foot = L.geoJson(hitm, {
                    //             seen: false,
                    //             active: hitm.properties.active,
                    //             cartodb_id: hitm.properties.cartodb_id,
                    //             name: hitm.properties.name,
                    //             anno: hitm.properties.anno,
                    //             geom_type: hitm.properties.geomtype,
                    //             style: markernew
                    //         })

                    //         foot.bindPopup(pu).addTo(mjItems)
                    //     if (foot.options.seen == true) {
                    //         foot.setStyle(lineseen)
                    //     } else if (foot.options.active == true) {
                    //         console.log("the following foot's active and we should open its popup in addition to styling it bright");
                    //         console.log(foot);
                    //         foot.setStyle(lineactive)
                    //         foot.openPopup()
                    //     }
                    // }
                        // foot.addTo(mjItems)
                } //typeof the_geom
            }) //collection.each
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        appActivityView.stfu()
        return this
        // .style()
    }
});