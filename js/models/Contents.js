var ContentsCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.options = options;
        // options || (options = {});
        // this.cfilter = options.cfilter
        // this.on('sync', this.activate, this);
        // this.listenTo(appState, 'change:slug', this.activate)
        // this.listenTo(this.collection, 'change:sync', this.divide)
            // this.on('sync', this.refetch, this);
            // 
        return this
    },
    model: function(attrs, options) {
        // console.log("in model func, attrs:");console.log(attrs.subject[0]);
        // var docs = attrs.response.docs
        // console.log("in model func, options:");console.log(options);
        // return new Models
        // 
        attrs.id==appState.get("slug") ? attrs.active=1 : attrs.active=0;
        
    switch(attrs.subject[0]) {
      case "about":
      var mod = new Content(attrs, options);
      cxabout.push(mod)
        return mod;
      case "cv":
      var mod = new Content(attrs, options);
      cxcv.push(mod)
        return mod;
      default:
        return null;
    }
  },
    url: function() {
        return solrhost + "cvjek/select?json.wrf=cwmccallback&rows=999&wt=json&q=*";
        // return ""
        // return "api/jekyllfetcher.php?cb=cwmccallback&spatialgo=false&solrstring=subject:" + this.options.cf
    },
    sync: function(method, collection, options) {
        console.log("in sync: of Contents");
        
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
//     activate: function(){

// var slug = appState.get("slug")
// if(typeof slug !== 'undefined' && slug !== null && slug !== 'null' ){

// var respa = this.findWhere({id:appState.get("slug")})
// respa.set({active:true})

// }

//         return this
//     },
    // activate: function() {

    //     var ass = appState.get("slug")

    //     console.log("ass:");console.log(ass);
    //     console.log("this:");console.log(this);

    //     this.invoke('set', {
    //         "active": false
    //     }, {
    //         silent: true
    //     });
    //     var at = this.findWhere({
    //         id: ass
    //     })
    //     at.set({
    //         active: true
    //     })
    //     return this
    // }, //activate
    parse: function(resp) {
        console.log("in parse: of Contents");

// var respa = _.findWhere(resp.response.docs,{id:appState.get("slug")})
// var resp = this.collection.models
// console.log(resp);
// console.log("resp:");console.log(resp.response.docs);
// console.log("respa:");console.log(respa);
// respa.set({active:true})

        // var hitdocs = resp.response.docs
        // var hitdocs = resp
        return resp.response.docs
    }
});