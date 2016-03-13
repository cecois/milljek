var PostsMenuView = Backbone.View.extend({
    el: "#posts-menu",
    template: Handlebars.templates['postsMenuViewTpl'],
    events: {
        // "click li": "log",
        "click a": "activate"
    },
    initialize: function() {
        // this.render()
        this.listenTo(this.collection, 'change:active', this.render);
        return this
    },
    log: function(e) {
        if(verbose==true){ console.log("in log of PV, e.target:"); console.log($(e.currentTarget)); }
        e.preventDefault()
        var di = $(e.currentTarget).attr("data-id")

        return this
        } //log
        ,
        activate: function(e) {
            e.preventDefault()

            var ds = $(e.currentTarget).attr("data-id")

            appState.set({"slug":ds})

            return this
        } //activate
        ,
        render: function() {
            if(verbose==true){ console.log("rendering PmenuV");}
            $(this.el).html(this.template({
                count: this.collection.models.length,
                rows: this.collection.toJSON()
            }));
            return this
        }
    });

var PostsView = Backbone.View.extend({
    el: ".post-list",
    // el: function(){

    //     return $("#about-container")

    // },
    template: Handlebars.templates['postsActiveViewTpl'],
    events: {
        // "click li": "log",
        "click li": "activate"
    },
    initialize: function() {
        // this.render()
        this.listenTo(this.collection, 'change:active', this.render);
        return this
    },
    log: function(e) {
        if(verbose==true){ console.log("in log of PV, e.target:"); console.log($(e.currentTarget)); }
        e.preventDefault()
        var di = $(e.currentTarget).attr("data-id")

        return this
        } //log
        ,
        activate: function(e) {
            e.preventDefault()


            var ds = $(e.currentTarget).attr("data-id")

            appState.set({"slug":ds})

            return this
        } //activate
        ,
        render: function() {
            if(verbose==true){ console.log("rendering PV");}
            // $(this.el).html(this.template({
            //     count: this.collection.models.length,
            //     rows: this.collection.toJSON()
            // }));
            var ap = this.collection.findWhere({active:true})

            var fpath = ap.get("url").substr(1, ap.get("url").length);

            console.log("ap itself:");console.log(ap);
            console.log("path:");console.log(fpath);
            // 
            // $(this.el).html(this.template(ap.toJSON()))
            $(this.el).html(
                _.unescape(ap.get("content"))
                )

            // $(this.el).load( fpath )

            return this
        }
    });