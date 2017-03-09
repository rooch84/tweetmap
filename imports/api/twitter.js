import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {T} from './twitterAuth.js'

if (Meteor.isClient) {
	Tweets = new Mongo.Collection("tweets");
}

if (Meteor.isServer) {
	Tweets = new Mongo.Collection("tweets", {connection: null});
	var id;

	id = Tweets.insert({});

	Meteor.startup(function () {

		var T = new Twit(getAuth())

		Meteor.publish('tweets', function() {
			return Tweets.find();

			//publish.ready();
		});

		var world = [ '-180', '-90', '180', '90' ];
		var stream = T.stream('statuses/filter', { locations: world });

		stream.on('tweet', Meteor.bindEnvironment(function (t) {
			Tweets.remove(id);
			id = Tweets.insert(t);
		}))
	})
}
