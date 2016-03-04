var Content = Backbone.Model.extend({


    url: function() {
        // return solrhost+"cbb_carto/select?json.wrf=cwmccallbackrecent&q=*:*&wt=json&sort=updated_at+instance&rows=10"
        // return solrhost + "cbb_bits/select?json.wrf=cwmccallbackrecent&q=holding:false&wt=json&sort=_id+instance&rows=6"
        return "api/jekyllfetcher.php"
    },
    initialize: function(options) {
        options || (options = {});
        return this
    },
    sync: function(method, collection, options) {
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
        // options.jsonpCallback = 'cwmccallbackrecent';
        return Backbone.sync(method, collection, options);
    },
    parse: function(response) {
        return response
    }


}); //Post