var PostsMenuView = Backbone.View.extend({
    el: "#posts-menu",
    template: Handlebars.templates['postsMenuViewTpl'],
    events: {
        // "click li": "log",
        "click a": "activate"
    },
    initialize: function() {
        // this.render()
        this.listenTo(this.collection, 'change:active', this.render);
        return this
    },
    log: function(e) {
        if(verbose==true){ console.log("in log of PV, e.target:"); console.log($(e.currentTarget)); }
        e.preventDefault()
        var di = $(e.currentTarget).attr("data-id")

        return this
        } //log
        ,
        activate: function(e) {
            e.preventDefault()

            var ds = $(e.currentTarget).attr("data-id")

            appState.set({"slug":ds})

            return this
        } //activate
        ,
        render: function() {
            if(verbose==true){ console.log("rendering PmenuV");}
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
        "click li": "activate"
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
                    break;
                case "out":
            $("#active-container").removeClass('collapsed')
                    break;
                default:
            $("#active-container").removeClass('collapsed')
        }

        return this
    },
    log: function(e) {
        if(verbose==true){ console.log("in log of PV, e.target:"); console.log($(e.currentTarget)); }
        e.preventDefault()
        var di = $(e.currentTarget).attr("data-id")

        return this
        } //log
        ,
        activate: function(e) {
            e.preventDefault()


            var ds = $(e.currentTarget).attr("data-id")

            appState.set({"slug":ds})

            return this
        } //activate
        ,
        render: function() {
            if(verbose==true){ console.log("rendering PV");}
            // $(this.el).html(this.template({
            //     count: this.collection.models.length,
            //     rows: this.collection.toJSON()
            // }));
            var ap = this.collection.findWhere({active:true})

            var fpath = ap.get("url").substr(1, ap.get("url").length);

            //
            // $(this.el).html(this.template(ap.toJSON()))
            $(this.el).html(
                _.unescape(ap.get("content"))
                )

            // $(this.el).load( fpath )

            return this
            // .downout()
        }
    });

var GeomsView = Backbone.View.extend({
    el: null,
    events: {},
    initialize: function() {
        this.listenTo(this.collection, 'sync', this.render)
        /* -------------------------------------------------- MAP CONTENT -----------------------  */
            // a group for all of the post-specific geoms
            eolItems = L.geoJson().addTo(map);
            return this
        },
        asgeojson: function() {
            cg = []
            this.collection.each(function(hit, i) {

                var the_geom = hit.get("geometry")
                var the_props = hit.get("properties")
                // var eolidreal = the_props.mjid
                var cvjekid = the_props.cvjek;
                // var isinagobs = the_props.active
                the_props.active = _.indexOf(appState.get("agobs").split(","),cvjekid)>-1 ? 1 : 0;
                if(appState.get("gobseens") && appState.get("gobseens").length>0){the_props.seen = _.indexOf(appState.get("gobseens").split(","),cvjekid)>-1 ? 1 : 0;}else{the_props.seen=0};
                the_props.exalted = appState.get("agob")==cvjekid ? 1 : 0;

                // var isagob = the_props.active
                // var eolseen = the_props.seen
                // var eolid = pullEOLID(eolidreal);
                var geomtype = the_geom.type
                    // default
                    // var eolstyle = pullEOLStyle(geomtype, "new")
                    // if we've seen this one, style it so
                    // if (eolseen == 1) {
                    //     eolstyle = pullEOLStyle(geomtype, "seen")
                    // }
                // but this will always be trumped by active
                // if (isagob == 1) {
                //     eolstyle = pullEOLStyle(geomtype, "active")
                // }
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
                console.log("recon:");console.log(recon);
                cg.push(recon)
            }) //collection.each
            return cg
        },
        pop: function() {
            var e = _.each(eolItems.getLayers(), function(fx) {
                console.log("this fx is :");console.log(fx);
                var ex = _.each(fx.getLayers(), function(fxe) {
                    if (fxe.feature.properties.active == 1) {
                        map.fitBounds(fxe.getBounds());
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
            // var notcampus = this.collection.models;
            var notcampus = this.asgeojson();


            function onEachFeature(feature, layer) {
            // only one at a time - Leaflet rule, so we can just let this clobber whatever came before
            // if (feature.properties.active == 1) {
            //     console.log("layer leaflet id in oneachfeature of render:");console.log(layer);
            //     appState.set({
            //         "agob": layer._leaflet_id
            //     })
            // }
            // var popupContent = feature.properties.name + " (" + feature.properties.eolid + ")";
            // if (feature.properties && feature.properties.popupContent) {
            //     popupContent += feature.properties.popupContent;
            // }
            // layer.bindPopup(popupContent).on("popupclose", function(p) {
            //     // report to appState that the thing has been seen - permanent for the session
            //     var gbseens = appState.get("gobseens")
            //     gbseens.push(p.target.feature.properties.eolid)
            //     appState.set({gobseens:_.unique(gbseens)})
            //     appState.set({agob:null})
                // p.target.setStyle(pullEOLStyle(p.target.feature.geometry.type.toLowerCase(), "seen"))
                //     // also shuffle it behind - jic there's another one nearby that obstructs when zoomed out
                //     p.target.bringToBack()
                //     var newgobs = _.reject(appState.get("agobs"), function(gob) {
                //         return gob == p.target.feature.properties.eolid;
                //     });
                //     appState.set({
                //         "agobs": newgobs,
                //         "agob":null
                //     })
            // })

        //     console.log("how about here - access to active?");
        //     console.log(layer);

        } //oneachfeature
        L.geoJson(notcampus, {
            // style: function(feature) {
            //     return feature.properties && feature.properties.style;
            // },
            // style: function(){

            //     return pullEOLStyle("line", "new")

            // },
            // onEachFeature: onEachFeature,
            // pointToLayer: function(feature, latlng) {
            //     return L.circleMarker(latlng, {
            //         radius: 8,
            //         fillColor: "#ff7800",
            //         color: "#000",
            //         weight: 1,
            //         opacity: 1,
            //         fillOpacity: 0.8
            //     });
            // }
        }).addTo(eolItems)
        // .on("click", function(m) {
        //     m.layer.setStyle(pullEOLStyle(m.layer.feature.geometry.type.toLowerCase(), "active"))
        //             // report to appState that the thing is currently active - undone upon blur
        //             appState.set({agob:m.layer.feature.properties.eolid})
        //     }) //.on
        map.fitBounds(eolItems.getBounds())
            // appActivityView.stfu()
            // return this.pop()
        }
    });