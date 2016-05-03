var GeomsView = Backbone.View.extend({
    el: null,
    events: {},
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render)
        this.listenTo(this.collection, 'change', this.render)
        this.listenTo(this.collection, 'sync', this.render)
            /* -------------------------------------------------- MAP CONTENT -----------------------  */
            // a group for all of the post-specific geoms
        mjGeoms = L.geoJson().addTo(map);
        // this.listenTo(cxPosts, 'reset', this.render);
        // this.bind(this.collection,'change',this.render);
        // this.listenTo(appState, 'change:bbox', this.zoomy);
        // this.render()
        return this
    },
    activate: function() {
        var slugall = window.location.pathname.split("spatialtrack")[2]
        if (typeof slugall !== 'undefined') {
            var slughtml = slugall.split(".html")[0]
            if (typeof slughtml !== 'undefined') {
                var slug = slughtml.split("/")[4]
            }
        }

console.log("slug:");
console.log(slug);

        if (typeof slug == "string") {

            cxPosts.deactivate()
            // var am = this.findWhere({slug:slug})
            // var am = cxPosts.models[0]
        }
        // var am = (slug == "/") ? this.collection.models[0] : ;
        // am.set({
        //     active: true
        // })
        return this
        // .render()
    },
    zoomy: function() {
        // if((appState.previousAttributes().bbox==null) || (typeof appState.previousAttributes().bbox == 'undefined')){
        // map.fitBounds(leafletize_Bbox(appState.get("bbox")))}
        return this
    },
    render: function() {
        mjGeoms.clearLayers();
        mjGeoms.clearAllEventListeners();
        var gjz = this.collection.toJSON();

        function on_each(feature, layer) {
            // layer.on("click", function(m) {
            //     if(m){
            //         console.info("m");console.log(m);
            //         console.log("layer.feature yes:");
            //         var gtype=m.target.feature.geometry.type
            //         m.target.setStyle(MILLERIA.stylize(gtype,1,0))
            //     }
            //     appState.set({agob:nid})
            // }) //.on
            // var popupContent = feature.properties.name 
            // if (feature.properties && feature.properties.popupContent) {
            //     popupContent += feature.properties.popupContent;
            // }
            // layer.bindPopup(popupContent).on("popupclose", function(p) {
            // })
            // layer.on("popupopen",function(p){
            //     p.target.bringToFront()
            // })
        } //oneachfeature
        L.geoJson(gjz, {
            style: function(fea, lay) {

return MILLERIA.stylize(fea, 0, 0)
            },
            onEachFeature: on_each,
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
        }).addTo(mjGeoms)
        return this
            // .pop()
    }
});
var BaseLayersView = Backbone.View.extend({
    id: 'map',
    events: {
        "change": "render"
    },
    initialize: function() {
        window.map = new L.Map(this.id, {
            zoomControl: false,
            center: [42.22852, -99.05273],
            zoom: 4,
            attributionControl: false
        });
        // map.on('moveend', function() {
        //     // appState.set({bbox: map.getBounds().toBBoxString()})
        // });
        this.collection.bind('change:active', this.render, this);
        this.render()
    },
    render: function() {
        if (typeof baseLayer == 'undefined') {
            baseLayer = null;
        } else {
            map.removeLayer(baseLayer);
        }
        // get the active layer's def
        var aldef = this.collection.findWhere({
            'active': true
        }).get("definition")
        if (aldef.subdomains != undefined) {
            baseLayer = new L.TileLayer(aldef.url, {
                subdomains: aldef.subdomains,
                maxZoom: 18
            });
        } else {
            baseLayer = new L.TileLayer(aldef.url, {
                maxZoom: 18
            });
        }
        map.addLayer(baseLayer);
        baseLayer.bringToBack();
        return this
            // .rewire()
    }
});