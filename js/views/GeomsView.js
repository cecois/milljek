var GeomsView = Backbone.View.extend({
    el: null,
    events: {},
    initialize: function() {
        // this.listenTo(this.collection, 'sync', this.render)
        this.listenTo(this.collection, 'parse', this.render)
        // this.listenTo(this.collection, 'change:active', this.render)
        // this.listenTo(this.collection, 'parse', this.refetch)
        //
        /* -------------------------------------------------- MAP CONTENT -----------------------  */
        // a group for all of the post-specific geoms
        eolItems = L.geoJson().addTo(map);
        // this.render()
        return this
    },
    asgeojson: function(){

var cg = {type:"FeatureCollection",features:[]};
this.collection.each(function(hit, i) {


                    var the_geom = hit.get("geometry")
                    var the_props = hit.get("properties")

                    var geomtype = the_geom.type

                        // here we reconstruct the geoJSON for map display
                    var recon = {
                        "type": "Feature",
                        "properties": {
                            "name": the_props.name,

                            "geom_type": geomtype,
                            "anno": the_props.anno,

                        },
                        "geometry": the_geom
                    };

                    // var foot = L.geoJson(recon, {
                    //     // seen: false,
                    //     name: recon.properties.name,
                    //     anno: recon.properties.anno,
                    //     geom_type: recon.properties.geomtype,
                    //     // style: markernew,

                    // })


                    cg.features.push(recon)

            }) //collection.each
return cg
    },
    render: function() {
        eolItems.clearLayers();


var notcampus = this.asgeojson();

        function onEachFeature(feature, layer) {


            var popupContent = "<p>I'm' " +
                    feature.properties.name;

            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }

            layer.bindPopup(popupContent);
        }


        L.geoJson(notcampus, {

            style: function (feature) {
                return feature.properties && feature.properties.style;
            },

            onEachFeature: onEachFeature,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(eolItems);

        map.fitBounds(eolItems.getBounds())

        // appActivityView.stfu()
        return this
            // .style()
    }
});