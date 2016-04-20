var Route = Backbone.Router.extend({
  routes: {
        // "(:slug)(/:panestate)(/:agobs)(/:bbox)(/)": "default",
        // "(:slug)(/:panestate)(/:agobs)(/:bbox)(/)": "default",
        "(:slug)(/:pane)(/:panestate)(/:agob)(/:bbox)(/)": "default",
        // "_site/(:cat)(/:year)(/:month)(/:day)(/:file)": "passthru",
      },
      initialize: function() {
        // this.report()
        // this.listenTo(appState, 'change', this.report)
      },
      default: function(slug, pane, panestate, agob, bbox){


        console.info("slug in route");console.log(slug);

         /**
          * if there's an incoming slug and it's not the same that state has (i.e. it's not what state SET for itself...
          * ...we use that - setting it in Posts and State, but silently for the latter so that it doesn't trigger another route call
          * 
          */

          if (typeof slug !== 'undefined' && slug !== null && slug !== "null" && appState.get("slug")!==slug) {

            appState.set({slug:slug},{silent:true})
          } else if(appState.get("slug")==null) {

            appState.set({slug:cxPosts.last().get("slug")},{silent:true})
          }

          if (typeof pane !== 'undefined' && pane !== null && pane !== "null" && appState.get("pane")!==pane) {

            appState.set({pane:pane},{silent:true})
          } else if(appState.get("pane")==null) {

            appState.set({pane:"active-post"},{silent:true})
          }

          if (typeof panestate !== 'undefined' && panestate !== null && panestate !== "null") {

            appState.set({panestate:panestate})
          }

          if (typeof agob !== 'undefined' && agob !== null && agob !== "null") {

            if(agob.indexOf(",")>-1){
              var ag = agob.split(",")[0]
            } else {
              var ag=agob
            }
            // appState.set({agob:ag,gogob:true})
            appState.set({agob:ag})

          } 


          if (typeof bbox !== 'undefined' && bbox !== null && bbox !== "null") {

            if(bbox !== appState.get("bbox")){
              console.info("setting bbox for appstate in route");console.log(bbox);
              appState.set({bbox:bbox})
              // map.fitBounds(leafletize_Bbox(bbox))
            }
          } 

          cxPosts.activate(slug)
        // if slug

        return this
    }, // end default
  });
var appRoute = new Route();
Backbone.history.start();