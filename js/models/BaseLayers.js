var BaseLayersCollection = Backbone.Collection.extend({
	model: BaseLayer,
	url:function(){
		return "js/models/layers.json"
	},
	initialize: function(options) {
            options || (options = {});
            // this.query = options.query;
          },

	parse: function(data) {
		var layers = data.layers;

		var activeLayer = _.find(layers, function(lay){ return lay.active == true; });
		var activeLayerDef = activeLayer.definition;

		window.appBaseMap = new BaseMap();
	appBaseMap.set(activeLayer);
	window.appBaseMapView = new BaseMapView({
		model: appBaseMap
	}).updateBaseMap();

	/* ----------
...Hey, did you see that? We're manualling calling the updateBaseMap method on the view because having it in init was causing *all* basemaps to be very quickly set and removed. Which isn't a huge deal until you consider that with each one all of those tiles were being requested and therefore clogging up the works.
------------ */

	return layers;
	}

});