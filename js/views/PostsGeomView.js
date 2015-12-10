var PostsGeomView = Backbone.View.extend({
    el: "#postsgeom-fake",
    template: Handlebars.templates['postsGeomFakeViewTpl'],
    events: {},
    initialize: function() {
         // this.render()
         // this.refetch()
        this.listenTo(this.collection, 'add', this.render)
        this.listenTo(this.collection, 'change', this.render)
        // this.listenTo(this.collection, 'parse', this.refetch)
        // 
        
        /* -------------------------------------------------- MAP CONTENT -----------------------  */

// a group for all of the post-specific geoms
mjItems = L.geoJson().addTo(map);


        return this
    },
    render: function() {

appActivity.set({
            message: "preparing map objects..."
        })
        mjItems.clearLayers();

        this.collection.each(function(hit, i) {
            var hitTemplate = Handlebars.templates['hitMarkerViewTpl']
            var pu = hitTemplate(hit.toJSON());
            
            if(typeof hit.get("the_geom") !== 'undefined'){


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
                
var activeStyle = markernew
            var foot = L.geoJson(hitm, {
                    seen: false,
                    cartodb_id: hitm.properties.cartodb_id,
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, activeStyle);
                    }
                })
                foot.bindPopup(pu).addTo(mjItems)
            } else {
                var activeStyle = linenew
                var foot = L.geoJson(hitm, {
                    seen: false,
                    cartodb_id: hitm.properties.cartodb_id,
                    style: activeStyle
                })
                foot.bindPopup(pu).addTo(mjItems)
            }
            
            } //typeof the_geom
}) //collection.each

        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        return this
    }
});