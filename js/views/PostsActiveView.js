var PostsActiveView = Backbone.View.extend({
    el: "#posts-active",
    url: function() {
        return 'api/postfetcher.php?slug=' + this.collection.findWhere({
            "active": true
        }).get("lopath")
    },
    events: {
        "click .bt-post-zoomto": "zoomto",
    },
    template: Handlebars.templates['postsActiveViewTpl'],
    // events: {},
    initialize: function() {
        // this.render()
        this.listenTo(this.collection, 'change:active', this.render)
        return this.render();
    },
    zoomto: function() {
        var a = this.collection.findWhere({
                "active": true
            })
            // map.panInsideBounds(a.get("zoomto"));
        map.fitBounds(a.get("zoomto"));
        return this
    },
    rewire: function() {
        console.log("target tt el")
console.log($(this.el).find('[data-toggle="tooltip"]'))
        console.log("...exttant?")

        $(this.el).find('.bt-post-zoomto').tooltip({
                container: 'body'
            })
            // $(this.el).find("input").click(function(event) {
            // $(this.el).find('[data-toggle="tooltip"]').tooltip('hide')
            // });
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
                    // $(that.el).html(p)
                    $(that.el).html(that.template({
                        title: a.get("title"),
                        guts: p
                    }));
                    return p
                }).done(function() {
                    // console.log("done");
                }).fail(function() {
                    // console.log("error");
                }).always(function() {
                    // console.log("complete");
                });
                var img = "offline/jackets/" + a.get("id") + ".jpg"
                    // background-image:url('offline/dummy-thumb.png')
                $("#active-a").css("background-image", "url('" + img + "')")
                    // background-image:url('offline/dummy-thumb.png')
            } else {
                // $(this.el).addClass("hidden")
                $("#active-a").css("background-image", "none")
                $(this.el).html('NO ACXTIVE POST')
            }
            // if (typeof post !== 'undefined') {
            //     // $(this.el).html(post.responseText)
            //     // $(this.el).html(post)
            //     // console.log("48:");
            //     // console.log(post);
            //     $(this.el).removeClass("hidden")
            // } else {
            //     // $(this.el).addClass("hidden")
            //     $(this.el).html('NO ACXTIVE POST')
            // }
            return this.rewire()
        } //render
});