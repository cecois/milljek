var Route = Backbone.Router.extend({
  routes: {
        // "(:slug)(/:panestate)(/:agobs)(/:bbox)(/)": "default",
        "(:slug)(/)": "default",
        "_site/(:cat)(/:year)(/:month)(/:day)(/:file)": "passthru",
      },
      initialize: function() {
        if(verbose==true){console.log("initing Route");}
        // this.report()
        // this.listenTo(appState, 'change', this.report)
      },
      report: function(){

        if(verbose==true){console.log("reporting from route:");}
        console.log(appState.get("slug"));

      },
      passthru: function(cat,year,month,day,file){

        console.log("cat:");
        console.log(cat);
        console.log("year:");
        console.log(year);
        console.log("month:");
        console.log(month);
        console.log("day:");
        console.log(day);
        console.log("file:");
        console.log(file);

// i'm not proud of this
// $("body").load(cat+"/"+year+"/"+month+"/"+day+"/"+file)

// return this
return cat+"/"+year+"/"+month+"/"+day+"/"+file

},
default: function(slug, panestate, agobs, bbox){

  if(verbose==true){console.log("default in route:");}

         /**
          * if there's an incoming slug and it's not the same that state has (i.e. it's not what state SET for itself...
          * ...we use that - setting it in Posts and State, but silently for the latter so that it doesn't trigger another route call
          * 
          */
          
          console.log("as slug:");
          console.log(appState.get("slug"));

          console.log("incoming slug:");
          console.log(slug);

          if (typeof slug !== 'undefined' && slug !== null && slug !== "null" && appState.get("slug")!==slug) {

            appState.set({slug:slug},{silent:true})
          } 
        // else if(typeof appState.changedAttributes().slug == 'undefined'){
            // or the situation might be we *don't* have an incoming slug, in which case we still need to activate a post
            // any other slug state will have been handled by State or the page (both)
            // if(verbose==true){console.log("no incoming slug, and State.slug is unchanged...");}
            // cxPosts.activate(appState.get("slug"))
        // }
        cxPosts.activate(slug)
        // if slug

        return this
    }, // end default
  });
var appRoute = new Route();
Backbone.history.start();