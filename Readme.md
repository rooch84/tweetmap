# Meteor Twitter Map

This is a meteor implementation of a web-based client for viewing geo-encoded Tweets on a map.

## Run locally

To run, simply install [Meteor](https://www.meteor.com/) and run `meteor` from the project root, then point your browser to `http://localhost:3000`.

Twitter authentication is retrieved from system environment variables (due to docker compatibility).  So you either need to set the four variables below, or change `./imports/api/twitterAuth.js` manually.

```
CONSUMER_KEY
CONSUMER_SECRET
ACCESS_TOKEN
ACCESS_TOKEN_SECRET
```

## To run from docker

Don't clone this repo, instead clone [this one]() and run `docker-compose up` from the project root.
