getAuth = function() {
  var consumer_key = process.env.CONSUMER_KEY;
  var consumer_secret = process.env.CONSUMER_SECRET;
  var access_token = process.env.ACCESS_TOKEN;
  var access_token_secret = process.env.ACCESS_TOKEN_SECRET;

  if (typeof(consumer_key) !== 'undefined' &&
  typeof(consumer_secret) !== 'undefined' &&
  typeof(access_token) !== 'undefined' &&
  typeof(access_token_secret) !== 'undefined') {
    return  {
      consumer_key:         consumer_key
      , consumer_secret:      consumer_secret
      , access_token:         access_token
      , access_token_secret:  access_token_secret

    }
  } else {
    console.log("ERROR: Authentication environment variables not set");
    return {};
  }
};
