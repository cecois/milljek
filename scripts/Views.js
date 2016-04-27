var GeomsView = Backbone.View.extend({
    el: null,
    events: {},
    initialize: function() {
        this.listenTo(this.collection, 'sync', this.render)
        /* -------------------------------------------------- MAP CONTENT -----------------------  */
            // a group for all of the post-specific geoms
            mjGeoms = L.geoJson().addTo(map);

            // this.listenTo(cxPosts, 'reset', this.render);
            // this.bind(this.collection,'change',this.render);
            // this.listenTo(appState, 'change:bbox', this.zoomy);
            return this
        },
        zoomy: function(){

            // if((appState.previousAttributes().bbox==null) || (typeof appState.previousAttributes().bbox == 'undefined')){

                // map.fitBounds(leafletize_Bbox(appState.get("bbox")))}

                return this

            },
            // asgeojson: function() {
            //     cg = []
            //     this.collection.each(function(hit, i) {

            //         var the_geom = hit.get("geometry")
            //         var the_props = hit.get("properties")
            //         var cvjekid = the_props.cvjek;

            //         if(typeof appState.get("agob")!== 'undefined'){
            //             the_props.active = appState.get("agob")==cvjekid ? 1 : 0;}

            //             if(appState.get("gobseens") && typeof appState.get("gobseens") == "object"){
            //                 the_props.seen = _.indexOf(appState.get("gobseens"),cvjekid)>-1 ? 1 : 0;
            //             }else{the_props.seen=0};
            //             the_props.exalted = appState.get("agob")==cvjekid ? 1 : 0;


            //             var geomtype = the_geom.type


            //             var recon = {
            //                 "type": "Feature",
            //                 "properties": {
            //                     "name": the_props.name,
            //                     "cvjekid": cvjekid,
            //                     "active":the_props.active,
            //                     "seen":the_props.seen,
            //                     "exalted":the_props.exalted,
            //                     "geom_type": geomtype,
            //                     "anno": the_props.anno,
            //                     "style": pullCVJEKStyle(geomtype,the_props.active,the_props.seen)
            //                 },
            //                 "geometry": the_geom
            //             };
            //             cg.push(recon)
            // }) //collection.each
            //     return cg
            // },
            render: function() {
                mjGeoms.clearLayers();
                mjGeoms.clearAllEventListeners();
                var notcampus = this.collection.toJSON();
            // var notcampus = this.asgeojson();
            console.info("notcampus");console.log(notcampus);
            function onEachFeature(feature, layer) {
            // only one at a time - Leaflet rule, so we can just let this clobber whatever came before

            console.info("ineachfeat, feat");console.log(feature);

            layer.on("click", function(m) {


                if(m){
                    console.info("m");console.log(m);
                    console.log("layer.feature yes:");
                    var gtype=m.target.feature.geometry.type
                    console.info("gtype");console.log(gtype);
                    var nid = m.target.feature.properties.cvjekid
                    console.info("nid");console.log(nid);
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
                console.info("style:");console.log(feature.properties.style);
                return feature.properties && MILLERIA.stylize()
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