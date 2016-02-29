var GeomsCollection = Backbone.Collection.extend({
    model: Geom,
    url: function() {
        // IDEALLY I COULD LEAVE THIS AS STRAIGHT CALL TO CARTODB
        // return solrhost + "miljek_geom/select?json.wrf=cwmccallback&rows=999z&wt=json&q=" + encodeURIComponent(appQuery.get("solrstring"));
        // this.cartostring = "cartodb_id:(" + encodeURIComponent(arr.join(" ")) + ")"
            return "offline/cartodb-query.geojson";
        // if (window.offline=="true"){
        //     } else {
        //         return "https://cecmcgee.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT+CONCAT('point:'||cartodb_id)+AS+eolid,cartodb_id,the_geom,name,anno+FROM+eolapp_point+where+cartodb_id+=+3+UNION+ALL+SELECT+CONCAT('line:'||cartodb_id)+AS+eolid,cartodb_id,the_geom,name,anno+FROM+eolapp_line+where+cartodb_id+=1+UNION+ALL+SELECT+CONCAT('poly:'||cartodb_id)+AS+eolid,cartodb_id,the_geom,name,anno+FROM+eolapp_poly+where+cartodb_id+=17"
        //     }
        // return appQuery.get("carl")
    },
    initialize: function(options) {
        // this.on('sync', this.activate, this);
        // this.listenTo(appState.agob, 'change', this.activate)
        options || (options = {});
        return this
    },
    activate: function(){

this.deactivate()

console.log("in activate of geoms");

var ags = appState.get("agobs")

return this

    },
    deactivate: function() {
        if (verbose == true) {
            console.log("deactivating all geoms...");
        }
        // i don't know about this silent thing - could bite later
        this.invoke('set', {
            "active": false
        }, {
            silent: true
        });
        return this
    },

    // sync: function(method, collection, options) {
    //     if (verbose == true) {
    //         console.log("syncing PostsCollection")
    //     }
    //     // By setting the dataType to "jsonp", jQuery creates a function
    //     // and adds it as a callback parameter to the request, e.g.:
    //     // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
    //     // If you want another name for the callback, also specify the
    //     // jsonpCallback option.
    //     // After this function is called (by the JSONP response), the script tag
    //     // is removed and the parse method is called, just as it would be
    //     // when AJAX was used.
    //     options.dataType = "jsonp";
    //     options.jsonpCallback = 'cwmccallback';
    //     return Backbone.sync(method, collection, options);
    // },
    parse: function(response) {
        
        console.log("parse of geoms");

var feats = _.each(response.features,function(f,i) {

// we are iterating through the features, checking to see if each one is a member of the agobs array (active map objects) we store in State
// we want the "active" attribute to be on-board so that this collection can get/set it and so that any derived views can check it
// 
// while we're here, we also check if it's been seen already according to the registry in appState

       if(_.indexOf(appState.get("agobs"), pullEOLID(f.properties.mjid))>=0){
        if(verbose==true){console.log("this one is in appstate's arr, setting to active")}
        f.properties.active=1
       } else {
        f.properties.active=0
       }

              if(_.indexOf(appState.get("gobseens"), pullEOLID(f.properties.mjid))>=0){
        f.properties.seen=1
       } else {
        f.properties.seen=0
       }
    
});

        // var feats = response.features

        return feats
    },
    // deactivate: function() {
    //     _.every(this.models, function(d, index) {
    //             d.set({
    //                 active: false
    //             }, {
    //                 silent: true
    //             })
    //         }) // every
    //     return this
    // },
    // activate: function() {
    //         this.deactivate()
    //         _.each(this.models, function(d, index) {
    //             if (d.id == window.AP) {
    //                 d.set({
    //                     "active": true
    //                 })
    //             }
    //         }); //each
    //         return this
    //     } //actxivate
});