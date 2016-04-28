var GeomsView = Backbone.View.extend({
    el: null,
    events: {},
    initialize: function() {
        this.listenTo(cxPosts, 'reset', this.activate)
        /* -------------------------------------------------- MAP CONTENT -----------------------  */
            // a group for all of the post-specific geoms
            mjGeoms = L.geoJson().addTo(map);

            // this.listenTo(cxPosts, 'reset', this.render);
            // this.bind(this.collection,'change',this.render);
            // this.listenTo(appState, 'change:bbox', this.zoomy);
            return this
        },
        activate: function(){

            var slugall = window.location.pathname.split("spatialtrack")[1]
            if(typeof slugall !== 'undefined'){
                var slughtml = slugall.split(".html")[0]
                if(typeof slughtml !== 'undefined'){
                    var slug = slughtml.split("/")[4]}}

                    if(typeof slug == "string"){
                    // var am = this.findWhere({slug:slug})
                    var am = cxPosts.models[0]
                } else {
                    var am = cxPosts.models[0]
                }
                
        // var am = (slug == "/") ? this.collection.models[0] : ;

        am.set({active:true})

        return this
        .render()

    },
    zoomy: function(){

            // if((appState.previousAttributes().bbox==null) || (typeof appState.previousAttributes().bbox == 'undefined')){

                // map.fitBounds(leafletize_Bbox(appState.get("bbox")))}

                return this

            },

            render: function() {
                mjGeoms.clearLayers();
                mjGeoms.clearAllEventListeners();
                var notcampus = this.collection.toJSON();
            // var notcampus = this.asgeojson();
            function onEachFeature(feature, layer) {
            // only one at a time - Leaflet rule, so we can just let this clobber whatever came before

            var active = (feature.properties.mjid==cxPosts.findWhere({active:true}).get("location"))?true:false;
            console.info("active for ".feature.properties.mjid);console.log(active);

            if(feature.properties.active==true){
                console.info("active feature");console.log(feature);
                console.info("active feature's layer");console.log(layer);
            }
            layer.on("click", function(m) {


                if(m){
                    console.info("m");console.log(m);
                    console.log("layer.feature yes:");
                    var gtype=m.target.feature.geometry.type
                    

                    m.target.setStyle(MILLERIA.stylize(gtype,1,0))
                }
                appState.set({agob:nid})


            }) //.on


            var popupContent = feature.properties.name 
            // + " (" + feature.properties.cvjekid + ")";
            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }
            layer.bindPopup(popupContent).on("popupclose", function(p) {
                // report to appState that the thing has been seen - permanent for the session
                // var gbseens = appState.get("gobseens")


                // gbseens.push(p.target.feature.properties.cvjekid)
                // appState.set({gobseens:_.unique(gbseens)})

                // if(appState.get("agob")==p.target.feature.properties.cvjekid){
                //     appState.set({agob:null})}

                // p.target.setStyle(pullCVJEKStyle(p.target.feature.geometry.type,0,1))

                // p.target.bringToBack()

            })

            layer.on("popupopen",function(p){

                p.target.bringToFront()

            })

        } //oneachfeature
        L.geoJson(notcampus, {

            style: function (feature) {
                console.info("in style: feat");console.log(feature);
                return feature.properties && MILLERIA.stylize(feature.geometry.type,0,feature.properties.active)
            },
            // style: MILLERIA.stylize(gtype,0,0),
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