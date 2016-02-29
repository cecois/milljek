var GeomsView = Backbone.View.extend({
    el: null,
    events: {},
    initialize: function() {
        // this.listenTo(this.collection, 'sync', this.render)
        this.listenTo(this.collection, 'sync', this.render)
            // this.listenTo(this.collection, 'change:active', this.render)
            // this.listenTo(this.collection, 'parse', this.refetch)
            //
            /* -------------------------------------------------- MAP CONTENT -----------------------  */
            // a group for all of the post-specific geoms
        eolItems = L.geoJson().addTo(map);
        // this.render()
        return this
    },
    asgeojson: function() {
        // var cg = {
        //     type: "FeatureCollection",
        //     features: []
        // };
        cg = []
        this.collection.each(function(hit, i) {
                var the_geom = hit.get("geometry")
                var the_props = hit.get("properties")
                var eolidreal = the_props.mjid
                var eolactive = the_props.active
                var eolseen = the_props.seen
                var eolid = pullEOLID(eolidreal);
                // var active = (eolid == appState.get("agob"))
                // var eolidreal= the_props.geomtype+":"
                var geomtype = the_geom.type
                    // default
                    // var eolstyle = geomtype.toLowerCase()+"new"
                var eolstyle = pullEOLStyle(geomtype, "new")
                    // if we've seen this one, style it so
                if (eolseen == 1) {
                    // eolstyle = geomtype.toLowerCase()+"seen"
                    eolstyle = pullEOLStyle(geomtype, "seen")
                }
                // but this will always be trumped by active
                if (eolactive == 1) {
                    // eolstyle = geomtype.toLowerCase()+"active"
                    eolstyle = pullEOLStyle(geomtype, "active")
                }
                // here we reconstruct the geoJSON for map display
                var recon = {
                    "type": "Feature",
                    "properties": {
                        "name": the_props.name,
                        "eolid": eolid,
                        "active": eolactive,
                        "seen": eolseen,
                        "geom_type": geomtype,
                        "anno": the_props.anno,
                        "style": eolstyle
                    },
                    "geometry": the_geom
                };
                // cg.features.push(recon)
                cg.push(recon)
            }) //collection.each
        return cg
    },
    pop: function() {
        var e = _.each(eolItems.getLayers(), function(fx) {
            var ex = _.each(fx.getLayers(), function(fxe) {
                if (fxe.feature.properties.active == 1) {

                    fxe.openPopup()
                }
                return fxe.feature.properties.active == 1;
            })
            return ex
        });
        return this
    },
    render: function() {
        eolItems.clearLayers();
        var notcampus = this.asgeojson();

        function onEachFeature(feature, layer) {
            // only one at a time - Leaflet rule, so we can just let this clobber whatever came before
            if (feature.properties.active == 1) {
                appState.set({
                    "agob": layer._leaflet_id
                }, {
                    silent: true
                })
            }
            var popupContent = feature.properties.name + " (" + feature.properties.eolid + ")";
            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }
            layer.bindPopup(popupContent).on("popupclose", function(p) {
                // report to appState that the thing has been seen - permanent for the session
                appState.get("gobseens").push(p.target.feature.properties.eolid)
                p.target.setStyle(pullEOLStyle(p.target.feature.geometry.type.toLowerCase(), "seen"))
                    // also shuffle it behind - jic there's another one nearby that obstructs when zoomed out
                p.target.bringToBack()
                var newgobs = _.reject(appState.get("agobs"), function(gob) {
                    return gob == p.target.feature.properties.eolid;
                });
                appState.set({
                    "agobs": newgobs
                })
            })
        }
        L.geoJson(notcampus, {
                style: function(feature) {
                    return feature.properties && feature.properties.style;
                },
                onEachFeature: onEachFeature,
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: "#ff7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }
            }).addTo(eolItems).on("click", function(m) {
                m.layer.setStyle(pullEOLStyle(m.layer.feature.geometry.type.toLowerCase(), "active"))
                    // report to appState that the thing is currently active - undone upon blur
                appState.get("agobs").push(m.layer.feature.properties.eolid)

// dunno man - #returnto - this wznt firing on its own
                appState.update()
            }) //.on
        map.fitBounds(eolItems.getBounds())
            // appActivityView.stfu()
        return this.pop()
    }
});