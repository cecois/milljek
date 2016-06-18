var PostView = Backbone.View.extend({  
    el: '.wrapper',
events: {
        "click .trigger": "process"
    },
    process: function(e){

var type = $(e.currentTarget).attr("data-target")
var did = $(e.currentTarget).attr("data-id")

        switch(type) {
                case "rando":

            // rando case presuming coords right now - but later we could sniff out other types
            var y = did.split(",")[0]
            var x = did.split(",")[1]

map.setView(L.latLng(x,y),8)

                    break;
                case null:
            
            console.log("case wz null");

                    break;
            case "milleria":
var did = $(e.currentTarget).attr("data-id")

mjGeoms.eachLayer(function(l){ l.eachLayer(function(m){


// m.openPopup()
if(m.feature.properties.mjid==did){


m.openPopup()
if(m.feature.geometry.type !== "Point"){
map.fitBounds(m.getBounds());} else {
    map.setView(m.getLatLng(),9)
}

}
})})

            break;
                default:
            console.log("case reached default")
        }



return this

    }
    });

var PostImageView = Backbone.View.extend({  
    el: '.post__img',
   template: Handlebars.templates['postImageViewTpl'],
events: {
        // "click .active-colorbar-2": "tweet"
    },
    initialize: function(){

   this.listenTo(cxPosts, 'reset', this.render);
   return this
    },
    tweet: function(e){

        console.log(e);

// var urlall = window.location.pathname.split("/spatialtrack/")[1]
// var am = cxPosts.findWhere({url:"/"+urlall})
// var hashtz = MILLERIA.get_tags(am.get("title"));
// var u="https://twitter.com/intent/tweet?url="+window.location+"&amp;text=&amp;hashtags="+MILLERIA.get_tags(hashtz)

// window.open(u,'_blank');

return this

    },
    zoom: function(e){

// built this already, re-use:
pActive.process(e)


return this

    },
    rewire: function(){

$(".active-colorbar-3").click(function(e){

var scrollTo = $('#hearing-it');
$('html,body').animate({scrollTop: scrollTo.offset().top});

})


return this

    },
    render: function(){
var urlall = window.location.pathname.split("/spatialtrack/")[1]
// var am = cxPosts.findWhere({url:"/"+urlall})
var am = cxPosts.findWhere({url:"/spatialtrack/"+urlall})

        $(this.el).html(this.template(
         am.toJSON()
        ));

        var img = document.createElement('img');



        var iu = "/assets/offline/jackets/"+am.get("slug")+".jpg"

var hashtz = MILLERIA.get_tags(am.get("title"));
        

        img.setAttribute('src', iu)

img.addEventListener('load', function() {
    var vibrant = new Vibrant(img);
    var swatches = vibrant.swatches()


    
    var muted = (typeof swatches.Muted !== 'undefined') ? swatches.Muted.getHex() : "#592941";
    var lightvibrant = (typeof swatches.LightVibrant !== 'undefined') ? swatches.LightVibrant.getHex() : "#498467";
    var darkvibrant = (typeof swatches.DarkVibrant !== 'undefined') ? swatches.DarkVibrant.getHex() : "#170312";
    var darkmuted = (typeof swatches.DarkMuted !== 'undefined') ? swatches.DarkMuted.getHex() : "#170312";


            $(".active-colorbar-1").css("background-color",muted).hover(function(e) { 
    $(this).css("background-color",e.type === "mouseenter"?lightvibrant:muted) 
}).attr("data-id",MILLERIA.fromto(am.get("location"),"jekyll")).attr("data-target","milleria")
            $(".active-colorbar-2").css("background-color",darkvibrant).hover(function(e) { 
    $(this).css("background-color",e.type === "mouseenter"?lightvibrant:darkvibrant) 
})
            // .html('<a target="_blank" class="twitter-share-button" href="https://twitter.com/intent/tweet?url='+window.location+'&amp;text=&amp;hashtags='+hashtz+'" data-size="small"></a>')
            // .html('<a target="_blank" class="" href="https://twitter.com/intent/tweet?url='+window.location+'&amp;text=&amp;hashtags='+hashtz+'" data-size="small"></a>')

            $(".active-colorbar-3").css("background-color",darkmuted).hover(function(e) { 
    $(this).css("background-color",e.type === "mouseenter"?lightvibrant:darkmuted) 
})
            
// color the buttons, too
            $(".bt-post-bank-item").css("color",muted);

$("#posts-active > h3").css("color",darkvibrant)

});

        return this
        .rewire()
    }
    });



var GeomsView = Backbone.View.extend({
    el: null,
    events: {},
    initialize: function() {
        // this.listenTo(this.collection, 'reset', this.render)
        // this.listenTo(this.collection, 'change', this.render)
        this.listenTo(this.collection, 'sync', this.render)
        this.listenTo(cxPosts, 'reset', this.render);
        this.listenTo(cxPosts, 'change', this.render);
        /* -------------------------------------------------- MAP CONTENT -----------------------  */
        // a group for all of the post-specific geoms
        mjGeoms = L.geoJson().addTo(map);
        // this.listenTo(cxPosts, 'reset', this.render);
        // this.bind(this.collection,'fetch',this.render);
        // this.bind(this.collection,'change',this.render);
        // this.listenTo(appState, 'change:bbox', this.zoomy);
        // this.render()
        return this
        // .render()
    },
    activate: function() {
        var slugall = window.location.pathname.split("spatialtrack")[1]
        if (typeof slugall !== 'undefined') {
            var slughtml = slugall.split(".html")[0]
            if (typeof slughtml !== 'undefined') {
                var slug = slughtml.split("/")[4]
            }
        }
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

            var mjid = MILLERIA.fromto(feature.properties.mjid,"cartodb")

            var corresp = cxPosts.findWhere({location:mjid})
if(typeof corresp !== 'undefined'){
    var tiedtitle = corresp.get("title")
    var popupContent = '<h4>'+feature.properties.name+'</h4><div>associated with: <a href="http://map.milleria.org/'+corresp.get("url")+'">'+tiedtitle+'</a></div>'} else {
                var popupContent = "No posts key to this location - it...probably shouldn't even be here."
            }
            layer.bindPopup(popupContent).on("popupopen", function(p) {
                    p.target.setStyle(MILLERIA.stylize(p.target.feature,1,0))
            }).on("popupclose", function(p) {
                    p.target.setStyle(MILLERIA.stylize(p.target.feature,0,0))
            })
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
                // return L.circleMarker(latlng, {radius: 8,fillColor: "#ff7800",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8});
                return L.circleMarker(latlng);
            }
                        
        }).addTo(mjGeoms)
        return this
            // .pop()
    }
});
var ConsoleView = Backbone.View.extend({
el:"#console",
template: Handlebars.templates['consoleViewTpl'],
initialize: function(){
            this.model.bind("change", this.render, this);

    return this
    .render()
},
render: function(){

        $(this.el).html(this.template(this.model.toJSON()))
        
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