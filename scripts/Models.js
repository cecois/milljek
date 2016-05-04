var Post = Backbone.Model.extend({
    url: function() {
        return null
    },
    initialize: function(options) {
        options || (options = {});
        return this
    }
}); //Post
var BaseLayer = Backbone.Model.extend({
    defaults: {
        active: false
    },
    initialize: function() {}
}); //BaseLayer
var Geom = Backbone.Model.extend({}); //Geom
var Util = Backbone.Model.extend({
    initialize: function(options) {
        options || (options = {});
        return this
    },
    fromto: function(s, f) {
        switch (f) {   
            case "jekyll": //from jekyll e.g. "poly:99" to gD99
                var idina = s.split(":")
                switch (idina[0]) {
                    case 'line':
                        var id = gpre_line + idina[1]
                        break;
                    case 'poly':
                        var id = gpre_poly + idina[1]
                        break;
                    case 'point':
                        var id = gpre_point + idina[1]
                        break;
                    default:
                        var id = null
                }       
                break; 

            case "cartodb": //from cartodb e.g. gD99 to "poly:99"
                var idina = s
                switch (idina[1]) {
                    case '|':
                        var id = "line:"+idina.slice(2,9999999999999999)
                        break;
                    case 'D':
                        var id = "poly:"+idina.slice(2,9999999999999999)
                        break;
                    case '.':
                        var id = "point:"+idina.slice(2,9999999999999999)
                        break;
                    default:
                        var id = null
                }       
                break;   
            default:
                var id = "bombed out"
        }
        return id
    },
    testa: function(fea) {
        var active = 0
        var slugall = window.location.pathname.split("spatialtrack")[2]
        if (typeof slugall !== 'undefined') {
            var slughtml = slugall.split(".html")[0]
            if (typeof slughtml !== 'undefined') {
                var slug = slughtml.split("/")[4]
            }
        }
        var am = cxPosts.findWhere({
            slug: slug
        })
        if (typeof am !== 'undefined') {
            if (MILLERIA.fromto(am.get("location"), "jekyll") == fea.properties.mjid) {
                return 1
            }
        } else {
            return 0
        }
    },
    stylize: function(fea) {
        var gtype = fea.geometry.type
        var active = this.testa(fea)
            /**
        in here we nudge the style definitions a little bc it's not always a 1:1 match between
        geomtype and the name of the style applies (e.g. linestring vs. multilinestring
        or the fact that polys get line styles, too)
        **/
        if (typeof gtype == 'undefined') {
            var gtype = 'poly';
        }
        if (typeof active == 'undefined') {
            var active = 0;
        }
        if (typeof seen == 'undefined') {
            var seen = 0;
        }
        if (gtype.toLowerCase() == 'point') {
            var gtypa = gtype.toLowerCase()
        }
        if (gtype.toLowerCase() == 'poly') {
            var gtypa = gtype.toLowerCase();
        }
        if (gtype.toLowerCase() == 'multipolygon') {
            var gtypa = 'poly';
        }
        if (gtype.toLowerCase() == 'polygon') {
            var gtypa = 'poly';
        }
        if (gtype.toLowerCase() == 'line') {
            var gtypa = gtype.toLowerCase();
        }
        if (gtype.toLowerCase() == 'multilinestring') {
            var gtypa = 'line';
        }
        if (gtype.toLowerCase() == 'linestring') {
            var gtypa = 'line';
        }
        var fill = "#384754";
        var filla = "#C7E048";
        var fills = "black";
        var fillo = 1;
        var pipeseen = "#929292";
        var bord = "#C7E048";
        var borda = "#C7E048";
        switch (gtypa) {
            case 'point':
                if (active == 1) {
                    var style = {
                        radius: 18,
                        fillColor: filla,
                        color: borda,
                        weight: 13,
                        opacity: 1,
                        fillOpacity: 0.8,
                    };
                } else {
                    if (seen == 1) {
                        var style = {
                            radius: 8,
                            fillColor: fill,
                            color: fills,
                            weight: 10,
                            opacity: .6,
                            fillOpacity: 0.2,
                        };
                    } else {
                        var style = {
                            radius: 8,
                            fillColor: fill,
                            color: fills,
                            weight: 10,
                            opacity: 1,
                            fillOpacity: 0.8,
                        };
                    }
                }
                break;
            case 'poly':
                if (active == 1) {
                    var style = {
                        fillColor: filla,
                        fillOpacity: fillo,
                        color: borda,
                        weight: 13,
                        opacity: 1,
                    };
                } else {
                    if (seen == 1) {
                        var style = {
                            fillColor: fill,
                            fillOpacity: fillo,
                            color: fills,
                            weight: 10,
                            opacity: .2,
                        };
                    } else {
                        var style = {
                            fillColor: fill,
                            fillOpacity: fillo,
                            color: fill,
                            weight: 10,
                            opacity: .8,
                        };
                    }
                }
                break;
            case 'line':
                if (active == 1) {
                    var style = {
                        fillColor: filla,
                        fillOpacity: fillo,
                        color: borda,
                        weight: 13,
                        opacity: 1,
                    };
                } else {
                    if (seen == 1) {
                        var style = {
                            fillColor: fills,
                            fillOpacity: fillo,
                            color: pipeseen,
                            weight: 10,
                            opacity: 1,
                        };
                    } else {
                        var style = {
                            fillColor: fill,
                            fillOpacity: fillo,
                            color: fill,
                            weight: 10,
                            opacity: .8,
                        };
                    }
                }
                break;
            default:
                var style = {
                    fillColor: "gray",
                    fillOpacity: fillo,
                    color: "gray",
                    weight: 3,
                    opacity: .3
                };
        }
        return style
    }
}); //Util