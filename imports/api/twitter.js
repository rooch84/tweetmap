import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {T} from './twitterAuth.js'

if (Meteor.isClient) {
	Tweets = new Mongo.Collection("tweets");
}

if (Meteor.isServer) {

	var publish;
	var id = "tweet";

	Meteor.startup(function () {

		var T = new Twit(getAuth())

		Meteor.publish('tweets', function() {
			publish = this;
			publish.added("tweets", id, {});
			publish.ready();
		});

		var world = [ '-180', '-90', '180', '90' ];
		var stream = T.stream('statuses/filter', { locations: world });

		stream.on('tweet', Meteor.bindEnvironment(function (t) {
			if (publish != null) {
				publish.changed("tweets", id, t);
			}
		}))
	})
}
