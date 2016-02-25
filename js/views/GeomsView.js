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
        return this
    },
    render: function() {
        eolItems.clearLayers();
        this.collection.each(function(hit, i) {

console.log("hit:");
console.log(hit);
                // var template_geom = Handlebars.templates['hitMarkerViewTpl']
                    // console.log("hit@22:"); console.log(hit);
                // var pu = template_geom(hit.toJSON());

                
                // var pm = new Popup(this.model)
                // .set({leafletid:p.layer._leaflet_id});
                // var pv = new PopupView({model:pm})
                if (typeof hit.get("geometry") !== 'undefined') {

// var hgeometry = hit.get("geometry")
// var hproperties = hit.get("properties")

                    // var the_geom = hit.get("geometry")
// var geometry_type = hgeometry.type
// var hitm = hit

// console.log("hitm:");console.log(hitm);
                        // here we kinda reconstruct the post for map display
                    // var hitm = {
                    //     "type": "Feature",
                    //     "properties": {
                    //         // "name": "the_geom.properties.name",
                    //         "name": the_geom.properties.name,
                    //         "slug": hit.get("id"),
                    //         "active": hit.get("active"),
                    //         "seen": hit.get("seen"),
                    //         "cartodb_id": the_geom.properties.cartodb_id,
                    //         "geom_type": geometry_type,
                    //         "anno": the_geom.properties.anno,
                    //         // "anno": "the_geom.properties.anno",
                    //         "created_at": the_geom.properties.created_at,
                    //         // "created_at": "the_geom.properties.created_at",
                    //         "updated_at": the_geom.properties.updated_at
                    //             // "updated_at": "the_geom.properties.updated_at"
                    //     },
                    //     // "geometry": $.parseJSON(the_geom.geometry)
                    //     "geometry": the_geom.geometry
                    // };
                    var stnew = null;
                    var stact = null;
                    var stsen = null;
                    if (hit.get("Type") == "Point") {
                        stnew = marker_new;
                        stact = marker_act;
                        stsen = marker_sen;
                    } else {
                        stnew = polin_new
                        stact = polin_act
                        stsen = polin_sen
                    }
                    // var dStyle = markernew
                    var foot = L.geoJson(hit, {
                            // seen: false,
                            // seen: hproperties.seen,
                            // active: hproperties.active,
                            // cartodb_id: hitm.properties.cartodb_id,
                            // name: hitm.properties.name,
                            // anno: hitm.properties.anno,
                            // geom_type: hitm.properties.geometry_type,
                            // style: markernew,
                            style: stnew,
                            pointToLayer: function(feature, latlng) {
                                if (geometry_type == "Point") {
                                    return L.circleMarker(latlng, this.style);
                                }
                            }
                        })
                        // foot.bindPopup(pu).addTo(eolItems).on("click", function(m) {
                    foot.bindPopup(pu).addTo(eolItems)
                        // .on("click", function(m) {
                        // })
                        .on("popupopen", function(p) {
                            /* --------------------------------------------------
                            ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = hitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                            -----------------------  */
                            // var pu = template_geom(hit.toJSON()); OG
                            // console.log("p@91:"); console.log(p);
                            // p.model = hproperties
                            // var nel = p.popup._contentNode
                            // var pm = new Popup(p.model).set({
                            //     leafletid: p.layer._leaflet_id
                            // });
                            // also register that id w/ the parent model
                            // hit.set({
                            //     "zoomto": p.layer.getBounds()
                            // })
                            // var pv = new PopupView({
                            //     model: pm,
                            //     el: nel
                            // })
                        })
                        //on popup
                    if (foot.options.active == true) {
                        // console.log("setting to active, foot:")
                        // console.log(foot);
                        foot.setStyle(stact)
                        foot.openPopup()
                            // this.model.set({seen:true})
                            // foot.options.seen=true
                    } else {
                        if (foot.options.seen == true) {
                            // console.log("setting to seen, foot:")
                            // console.log(foot);
                            foot.setStyle(stsen)
                        } //seen
                    }
                    foot.addTo(eolItems)
                } //typeof the_geom
            }) //collection.each
        // $(this.el).html(this.template({
        //     count: this.collection.models.length,
        //     rows: this.collection.toJSON()
        // }));
        // appActivityView.stfu()
        return this
            // .style()
    }
});