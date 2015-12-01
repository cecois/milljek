var Query = Backbone.Model.extend({
    defaults: {
        rawstring: null,
        solrstring: null
    },
    initialize: function(options) {
        options || (options = {});
        this.on('change:rawstring', this.setstrings, this);
        return this
    },
    setstrings: function() {
        if (verbose == true) {
            console.log("setting strings...");
        }
        // here because we COULD do some manip at this point
        // but right now we just pass it through
        var ss = this.get("rawstring")
        if (ss == '' || ss == null) {
            if (verbose == true) {
                console.log("empty, setting to wildcard...");
            }
            this.set({
                    "solrstring": "locations*"
                })
                
        } else {
            if (verbose == true) {
                console.log("populated, grabbing the current value, which is:");
                console.log(ss);
            }
            this.set({
                "solrstring": ss
            })
        }
        return this
    }
});