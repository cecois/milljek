---
layout: post
title: 'Portfolio'
date: 2016-03-22 02:18:42.000000000 -04:00
type: post
published: true
status: publish
order: 1
category:
- about
tags:
- apps
meta:
author:
display_name: CCM
first_name: C.C.
last_name: Miller
---

### Locked Up

MIT Lincoln Laboratory is a federally-funded research and development center that "applies advanced technology to problems of national security." As such, my work there cannot be made public. Even though, I assure you, I personally am not doing anything quite so interesting - nothing cloak-and-dagger. Instead, my primary objective when I started in 2012 was to build a system for the storage, search, discovery, and delivery of spatial data. Which I did - with <a href="https://www.mongodb.com/">MongoDB</a> and [PostGIS](http://postgis.net/) on the back end and [Apache Solr](http://lucene.apache.org/solr/), [GeoServer](http://geoserver.org/), [GeoWebcache](http://geowebcache.org/) in the middle, I wrote an API (first in [Slim](http://www.slimframework.com/), then [Kohana](https://kohanaframework.org/)) that I also happen to consume with a single-page web app written primarily against [BackboneJS](backbonejs.com) (but with other fun stuff such as [Bootstrap](http://getbootstrap.com/), [Leaflet](http://leafletjs.com), [Handlebars](http://handlebarsjs.com/), all that hip stuff). There are numerous third-party APIs and projects in there as well (e.g. [Freebase](https://www.freebase.com/), [D3.js](https://d3js.org/), [MapQuest](http://open.mapquestapi.com/), [OpenStreetMap](https://wiki.openstreetmap.org/wiki/Main_Page), [CloudMade](http://cloudmade.com/)). The result is beautiful (if I do say so myself) and a success for my sector - there are plans to expand the service based on interest from the Lab community.

I do wish I could show it off, but I cannot. Which means I don't have much of a portfolio or gallery of my work to peddle the abilities that are most germane to EOL.

### Other Evidence

...But I can't show you *nothing*. So I'll talk a little about *this* site - custom-built for this application if for no other reason to illustrate skills that I otherwise just have to tell you about; then gloss a personal, hobby project; then talk about some previous work I've done with web and other technologies.

#### This Site

That's right - this electronic CV was built during <span class="copy-trigger" data-type="gob" data-id="g|1">my commute</span> these last couple of weeks because I felt not being able to show my MITLL work might torpedo my chances. It has four chief components: 

1. The web app you're using, of course - it's built on [BackboneJS](backbonejs.com) (so jQuery, too) and [Leaflet](http://leafletjs.com) with a smattering of smaller other libraries in there.
2. Content primarily comes out of a [Solr](http://lucene.apache.org/solr/) index - this allows me to piece together content that is written modularly (see next bullet) in however best suits a given display (even though in this case there's only one - web pages).
3. The source content is a [Jekyll](https://jekyllrb.com/) blog - chosen so that I could freely and easily write about my work in Markdown and not worry about formatting and display. But more than that, the combination of Jekyll-produced document metadata and Solr have become for me a *framework*, basically, where I can write posts in Markdown, free-form tag the Jekyll front matter, and then arbitrarily use those metadata to associate additional, supplemental data with my posts. Currently this is limited to map objects (see next bullet), but it could be anything - Freebase slugs, WikiPedia node IDs, etc.
4. Map data (<span class="copy-trigger" data-type="gob" data-id="g|1">my commute</span>, the locations of my previous jobs, etc.) are hosted in [CartoDB](https://cartodb.com/), a cloud spatial database. For this project, I am pulling data out via its API and making them available as local, static JSON, but if my data scaled I would leave all of them in-place and call from this web app as-needed.


#### Hobby Site
* <img class="pull-right" src="https://s3.amazonaws.com/f.cl.ly/items/2y0s291c0A0d1J1A0p3Q/BitMap__CBB.jpg?v=b67f3575" alt="" width="250px" height="178px" border="0" />Eschewing the conventional wisdom that it's not great to get too personal in a job application, I need to tell you about another example of my work - a hobby site I made that [indexes and maps every recurring joke](http://bitmap-lbones.rhcloud.com/#huh) on my favorite podcast, Comedy Bang! Bang! I don't feel totally comfortable sharing a personal passion project in this way, but it is built with [MongoDB](https://www.mongodb.com), [CartoDB](https://cartodb.com/), [Leaflet](http://leafletjs.com), [Backbone](backbonejs.com), [Solr](http://lucene.apache.org/solr/), and [Bootstrap](http://getbootstrap.com/) and hosted on a [Red Hat OpenShift](https://www.openshift.com/) instance. If you're not a fan it won't make a ton of sense, but suffice it to say that I've built a site that allows other fans to search for any recurring joke from the show, any character, any guest, etc. and, when mappable, see them in the location they reference on earth. Results are faceted by tag and episode number (in addition to the actual bit). I present it here if for no other reason than it's an example of a *ton* of information presented (in my opinion) as cleanly as humanly possible.


#### Select Older Work

*At Purdue and Texas A&M International, I was not strictly-speaking in a developer position. I was faculty in both places, charged (at TAMIU) with developing out library-based spatial data services and at Purdue with a much greater mission of developing library data services and education to better support and collaborate with other cyberinfrastructure-building projects across campus. It just so happened that effectively _all_ of this work required web-facing development. At times I directed the work of others (post-docs, graduate RAs, and undergrads), but typically I did all of my own authoring.*

* Spatial Data Catalog Project (MADA@P) - Purdue, 2008-2012

* an open source­-built metadata+data+GUI stack to deliver spatial data
* built (by me) with GeoServer (MapServer, early on), OpenLayers, jQuery, GeoNetwork OpenSource
* recreated (from a ground-up rewrite by me) at MITLL

* Targeted Metadata Crawler - Purdue, 2008-2011
* web crawler side project that harvested specifically spatial metadata from social data streams
* design by me, parser written in Java by one of my graduate assistants

* IsoMAP: Isoscape Modeling, Analysis and Prediction - Purdue, 2008-2012
* spatial data processing and organization workflows 
* web app (in OpenLayers) that interfaces with metadata stores, spatial database contents, and TeraGrid job managing software
* metadata authoring, metadata indexing, and metadata search mechanism
* one component of an NSF­-funded cyberinfrastructure project that delivers powerful environmental isotope modeling, analysis, and visualization over the web

* ISEE: Integrating Spatial Educational Experiences into Crop, Soil, and Environmental Science - Purdue, 2008-2012
* 100s of GBs of soil imagery prepared and delivered to web and other clients (Google Earth) in soil science classrooms

* Geoinformatics Course: 2008, 2010
* graduate­level course taught by me in which geoscientific technologies, data, and workflows are examined together as irrevocably interrelated pieces of a growing geocyberinfrastructure

* Vulcan - Purdue, 2006-2012
* provided data location and preparation and GIS methodologies to this groundbreaking inventory of U.S. CO2 emissions (<a href="http://vulcan.project.asu.edu/">now at ASU</a>)

* Spatialized Repository Collections - Purdue, 2010-2012
* mostly­-automated workflow designed to extract semantically useful placenames and other location data from fulltext repository documents

* Automated Georeferencer (PLAutoGeoRef) - Purdue, 2010-2012
* in-­house research designed to automate the laborious georeferencing of historic aerial photo collections
* design and direction by me - processing algorithm by my GA

* 1906 Soil Survey Resurrection - Purdue, 2007­-2008
* historic map digitization and data extraction ­a 1906 soil survey document was digitized and deposited into the Purdue Libraries institutional repository; its map was further georeferenced and run through a segmentation algorithm which helped us pull out real polygonal vector data for use in modern GISs

* Pilot PTO Dailies - Purdue, 2010-2012
* an automated data publishing workflow incorporates extant library data APIs to push Purdue Terrestrial Observatory remote sensing data to the web