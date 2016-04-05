var PostsMenuView = Backbone.View.extend({
    el: "#posts-menu",
    template: Handlebars.templates['postsMenuViewTpl'],
    events: {
        "click a": "activate"
    },
    initialize: function() {
        console.log("init of PMV");
        this.listenTo(this.collection, 'change:active', this.render);
        return this
    },
    log: function(e) {
        e.preventDefault()
        var di = $(e.currentTarget).attr("data-id")

        return this
    }
    ,
    activate: function(e) {

        e.preventDefault()
        console.log("in activate");
        var ds = $(e.currentTarget).attr("data-id")

        appState.set({"slug":ds})

        return this
    }
    ,
    render: function() {
        console.log("render of PMV");
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        return this
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
        map.on('moveend', function() {
            appState.set({bbox: map.getBounds().toBBoxString()})
        });
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

var PostsView = Backbone.View.extend({
    el: ".post-list",
    // el: function(){

    //     return $("#about-container")

    // },
    template: Handlebars.templates['postsActiveViewTpl'],
    events: {
        // "click li": "log",
        "click .copy-trigger": "activate"
    },
    initialize: function() {
        // this.render()
        this.listenTo(this.collection, 'change:active', this.render);
        this.listenTo(appState, 'change:panestate', this.downout);
        return this
    },
    downout: function(){

        switch(appState.get("panestate")) {
                case "down":
            $("#active-container").addClass('collapsed')
            $("#paneToggler").addClass("collapsed")
                    break;
                case "out":
            $("#active-container").removeClass('collapsed')
            $("#paneToggler").removeClass("collapsed")
                    break;
                default:
            $("#active-container").removeClass('collapsed')
        }

        return this
    },
    log: function(e) {
        e.preventDefault()
        var di = $(e.currentTarget).attr("data-id")
        var dt = $(e.currentTarget).attr("data-type")

        console.info("in log (frm click), di and dt:");console.log(di);console.log(dt);

        return this
    }
    ,
    activate: function(e) {
        e.preventDefault()


        var di = $(e.currentTarget).attr("data-id")
        console.info("di");console.log(di);
        var dt = $(e.currentTarget).attr("data-type")
        console.info("dt");console.log(dt);

        switch (dt) {
            case 'slug':
            appState.set({"slug":di})
            break;
            case 'gob':
            appState.set({"agob":di,"gogob":true})

            break;
            default:
            var id = null
        }



        return this
        } //activate
        ,
        render: function() {

            var ap = this.collection.findWhere({active:true})

            var fpath = ap.get("url").substr(1, ap.get("url").length);

            //
            $(this.el).html(
                _.unescape(ap.get("content"))
                )


            return this
            // .downout()
        }
    });

var GeomsView = Backbone.View.extend({
    el: null,
    events: {},
    initialize: function() {
        this.listenTo(this.collection, 'sync', this.paint)
        /* -------------------------------------------------- MAP CONTENT -----------------------  */
            // a group for all of the post-specific geoms
            eolItems = L.geoJson().addTo(map);

            this.listenTo(appState, 'change:agob', this.repaint);
            this.listenTo(appState, 'change:bbox', this.zoomy);
            return this
        },
        zoomy: function(){

            if((appState.previousAttributes().bbox==null) || (typeof appState.previousAttributes().bbox == 'undefined')){

                map.fitBounds(leafletize_Bbox(appState.get("bbox")))}

                return this

            },
            asgeojson: function() {
                cg = []
                this.collection.each(function(hit, i) {

                    var the_geom = hit.get("geometry")
                    var the_props = hit.get("properties")
                    var cvjekid = the_props.cvjek;

                    if(typeof appState.get("agob")!== 'undefined'){
                        the_props.active = appState.get("agob")==cvjekid ? 1 : 0;}

                        if(appState.get("gobseens") && typeof appState.get("gobseens") == "object"){
                            the_props.seen = _.indexOf(appState.get("gobseens"),cvjekid)>-1 ? 1 : 0;
                        }else{the_props.seen=0};
                        the_props.exalted = appState.get("agob")==cvjekid ? 1 : 0;


                        var geomtype = the_geom.type


                // here we reconstruct the geoJSON for map display
                var recon = {
                    "type": "Feature",
                    "properties": {
                        "name": the_props.name,
                        "cvjekid": cvjekid,
                        "active":the_props.active,
                        "seen":the_props.seen,
                        "exalted":the_props.exalted,
                        // "active": isagob,
                        // "seen": eolseen,
                        "geom_type": geomtype,
                        "anno": the_props.anno,
                        "style": pullCVJEKStyle(geomtype,the_props.active,the_props.seen)
                    },
                    "geometry": the_geom
                };
                cg.push(recon)
            }) //collection.each
                return cg
            },
            pop: function() {
                var e = _.each(eolItems.getLayers(), function(fx) {
                    var ex = _.each(fx.getLayers(), function(fxe) {
                        if (fxe.feature.properties.active == 1) {
                            console.info("current feature whose props are active:");console.log(fxe.feature.properties);
                            map.fitBounds(fxe.getBounds());
                            fxe.openPopup()
                        }

                        return fxe.feature.properties.active == 1;
                    })
                    return ex
                });

            // 
            return this
        },
        repaint: function(as,a){

            eolItems.eachLayer(function(ei){
                if(ei._layers){
                    _.each(ei._layers,function(LA){

                        var id = LA.feature.properties.cvjekid
                        var gtype = LA.feature.geometry.type

                        if(appState.get("gogob")==true && appState.get("agob")==id){

                            LA.openPopup()
                            map.fitBounds(LA.getBounds());
                            // mm, not so tight
                            map.setZoom(map.getZoom()-2)
                        }

                        var styleactive = (id==a) ? 1 : 0;
                        var styleseen = (_.indexOf(appState.get("gobseens"), id)>=0) ? 1 : 0;


// the style func has some internal logic for sorting this out
LA.setStyle(pullCVJEKStyle(gtype,styleactive,styleseen))


        }); //each
    } //if
}); //eachlayer
            appState.set({gogob:false},{silent:true})
            return this
// .pop()


},
paint: function() {
    eolItems.clearLayers();
    eolItems.clearAllEventListeners();
            // var notcampus = this.collection.models;
            var notcampus = this.asgeojson();

            function onEachFeature(feature, layer) {
            // only one at a time - Leaflet rule, so we can just let this clobber whatever came before


            layer.on("click", function(m) {


                if(m){
                    console.log("layer.feature yes:");
                    var gtype=m.target.feature.geometry.type
                    console.info("gtype");console.log(gtype);
                    var nid = m.target.feature.properties.cvjekid
                    console.info("nid");console.log(nid);
                    // m.target.setStyle(pullCVJEKStyle(gtype,1,0))
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

                console.info("p in open");console.log(p);
                p.target.bringToFront()

                // open
            })

        } //oneachfeature
        L.geoJson(notcampus, {

            style: function(feature){return feature.properties.style;},

            onEachFeature: onEachFeature,

        }).addTo(eolItems)

        return this
        .pop()
    }
});