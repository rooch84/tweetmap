import { Template } from 'meteor/templating';
import { Twitter } from '../api/twitter.js';

import './popup.html';
import './body.html';

var markerGroup;
var markers = [];
var maxTweets = 500;

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

if (urlParams.maxTweets != null) {
	maxTweets = urlParams.maxTweets;
}

var tweetIcon = L.icon({
	iconUrl: 'images/twitter.png',
	shadowUrl: 'images/twitter_shadow.png',

	iconSize:     [100, 70], // size of the icon
	shadowSize:   [100, 70], // size of the shadow
	iconAnchor:   [100, 20], // point of the icon which will correspond to marker's location
	shadowAnchor: [90, 15],  // the same for the shadow
	popupAnchor:  [5, 0] // point from which the popup should open relative to the iconAnchor
});


Template.body.onCreated(function bodyOnCreated() {
	Tweets.find().observeChanges({
		changed: function (id) {
			if(Tweets.findOne(id).coordinates != null) {
				var marker = L.marker([Tweets.findOne(id).coordinates.coordinates[1], Tweets.findOne(id).coordinates.coordinates[0]],  {icon: tweetIcon}).addTo(markerGroup);
				// wrapping node for bindPopup
				var containerNode = document.createElement('div');
				// Which template to use for the popup? Some data for it, and attach it to node
				Blaze.renderWithData(Template.popup, Tweets.findOne(id), containerNode);
				// Finally bind the containerNode to the popup
				marker.bindPopup(containerNode, {autoPan: false, closeButton : false, closeOnClick : false}).openPopup();
				markers.unshift(marker);
				while (markers.length > maxTweets) {
					var m = markers.pop();
					markerGroup.removeLayer(m);
				}
			}

		}
	});
});

Template.map.rendered = function() {
	L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

	var map = L.map('map', {
		doubleClickZoom: true
	}).setView([ 25,15], 5);
	L.tileLayer.bing("Arm0sEuJ1EZa0Z_utRK13DJdckI2d19FwjLsRdt3Pg7k2mAQmlB6d5KD_SMh7zS-").addTo(map);
	markerGroup = L.layerGroup().addTo(map);
}

Tracker.autorun(function () {
	Meteor.subscribe("tweets");
});

L.Map = L.Map.extend({
	openPopup: function (popup, latlng, options) {
		if (!(popup instanceof L.Popup)) {
			var content = popup;
			popup = new L.Popup(options).setContent(content);
		}

		if (latlng) {
			popup.setLatLng(latlng);
		}

		if (this.hasLayer(popup)) {
			return this;
		}

		// NOTE THIS LINE : COMMENTING OUT THE CLOSEPOPUP CALL
		//this.closePopup();
		this._popup = popup;
		return this.addLayer(popup);
	}
});
