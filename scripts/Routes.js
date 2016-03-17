var Route = Backbone.Router.extend({
  routes: {
        // "(:slug)(/:panestate)(/:agobs)(/:bbox)(/)": "default",
        "(:slug)(/:panestate)(/:agobs)(/:bbox)(/)": "default",
        // "_site/(:cat)(/:year)(/:month)(/:day)(/:file)": "passthru",
      },
      initialize: function() {
        if(verbose==true){console.log("initing Route");}
        // this.report()
        // this.listenTo(appState, 'change', this.report)
      },
      default: function(slug, panestate, agobs, bbox){


        if(verbose==true){console.log("default in route:");}

         /**
          * if there's an incoming slug and it's not the same that state has (i.e. it's not what state SET for itself...
          * ...we use that - setting it in Posts and State, but silently for the latter so that it doesn't trigger another route call
          * 
          */

          if (typeof slug !== 'undefined' && slug !== null && slug !== "null" && appState.get("slug")!==slug) {

            appState.set({slug:slug},{silent:true})
          } 

          if (typeof panestate !== 'undefined' && panestate !== null && panestate !== "null") {

            appState.set({panestate:panestate})
          }

          if (typeof agobs !== 'undefined' && agobs !== null && agobs !== "null") {

            appState.set({agobs:agobs})

          } 

          if (typeof bbox !== 'undefined' && bbox !== null && bbox !== "null") {

            if(bbox !== appState.get("bbox")){
              appState.set({bbox:bbox})
              map.fitBounds(leafletize_Bbox(bbox))
            }
          } 

          cxPosts.activate(slug)
        // if slug

        return this
    }, // end default
  });
var appRoute = new Route();
Backbone.history.start();