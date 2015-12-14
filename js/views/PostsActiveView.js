var PostsActiveView = Backbone.View.extend({
    el: "#posts-active",
    url: function() {
        return 'api/postfetcher.php?slug=' + this.collection.findWhere({
            "active": true
        }).id
    },
    template: Handlebars.templates['postsActiveViewTpl'],
    events: {},
    initialize: function() {
        this.render()
        this.listenTo(this.collection, 'change:active', this.render)
        return this
    },
    render: function() {
            var a = this.collection.findWhere({
                "active": true
            })
            if (typeof a !== 'undefined') {
                var slug = a.get("id")
                console.log("ths.url");
                console.log(this.url());
            }
            if (typeof a !== 'undefined' && a !== null) {
                // $(this.el).html(this.template(a.toJSON()))} else {
                //  $(this.el).html("no active post")
                // }
                // 
                var post = $.ajax({
                    url: this.url()
                        // type: 'default GET (Other values: POST)',
                        // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                        // data: {param1: 'value1'},
                }).success(function(p) {
                    console.log("success, p");
                    console.log(p);
                    return p
                }).done(function() {
                    console.log("done");
                }).fail(function() {
                    console.log("error");
                }).always(function() {
                    console.log("complete");
                });
            }
            if (typeof post !== 'undefined') {
                $(this.el).html(post.responseText)
                console.log("48:");
                console.log(post);
            } else {
                $(this.el).html('no active post')
            }
            return this
        } //render
});