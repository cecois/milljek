var PostsActiveView = Backbone.View.extend({
    el: "#posts-active",
    url: function() {
        return 'api/postfetcher.php?slug=' + this.collection.findWhere({
            "active": true
        }).get("lopath")
    },
    template: Handlebars.templates['postsActiveViewTpl'],
    events: {},
    initialize: function() {
        this.render()
        this.listenTo(this.collection, 'change', this.render)
        return this
    },
    render: function() {
            var a = this.collection.findWhere({
                "active": true
            })
            if (typeof a !== 'undefined') {
                var slug = a.get("id")
                // console.log("ths.url");
                // console.log(this.url());
            }
            if (typeof a !== 'undefined' && a !== null) {
                // $(this.el).html(this.template(a.toJSON()))} else {
                //  $(this.el).html("no active post")
                // }
                //
                var that = this;
                var post = $.ajax({
                    url: this.url(),
                        // type: 'default GET (Other values: POST)',
                        dataType: 'html'
                        // data: {param1: 'value1'},
                }).success(function(p) {
                    // console.log("success, p");
                    // console.log(p);
    $(that.el).html(p)
       // $("#posts-active").html(p)
                console.log("p guts:");
                console.log(p);
                    return p
                }).done(function() {
                    // console.log("done");
                }).fail(function() {
                    // console.log("error");
                }).always(function() {
                    // console.log("complete");
                });
            }

            if (typeof post !== 'undefined') {
                // $(this.el).html(post.responseText)
                // $(this.el).html(post)
                // console.log("48:");
                // console.log(post);
                $(this.el).removeClass("hidden")
            } else {
                $(this.el).addClass("hidden")
                $(this.el).html('no active post')
            }
            return this
        } //render
});