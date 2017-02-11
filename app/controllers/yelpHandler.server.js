'use strict';
/*
CODE FROM
https://arian.io/how-to-use-yelps-api-with-node/
*/
/* require the modules needed */
let oauthSignature = require('oauth-signature');
let n = require('nonce')();
let request = require('request');
let qs = require('querystring');
let _ = require('lodash');
let Bar = require('../models/bars.js');

function yelpHandler() {
  /* Function for yelp call
   * ------------------------
   * set_parameters: object with params to search
   * callback: callback(error, response, body)
   */
  this.searchRequest = (set_parameters, callback) => {
    /* The type of request */
    let httpMethod = 'GET';

    /* The url we are using for the request */
    let url = 'http://api.yelp.com/v2/search';

    /* We can setup default parameters here */
    let default_parameters = {
      location: 'San+Francisco',
      sort: '2'
    };

    /* We set the require parameters here */
    let required_parameters = {
      oauth_consumer_key : process.env.YELP_KEY,
      oauth_token : process.env.YELP_TOKEN,
      oauth_nonce : n(),
      oauth_timestamp : n().toString().substr(0,10),
      oauth_signature_method : 'HMAC-SHA1',
      oauth_version : '1.0'
    };

    /* We combine all the parameters in order of importance */
    let parameters = _.assign(default_parameters, set_parameters, required_parameters);

    /* We set our secrets here */
    let consumerSecret = process.env.YELP_SECRET;
    let tokenSecret = process.env.YELP_TOKEN_SECRET;

    /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
    /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
    let signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

    /* We add the signature to the list of paramters */
    parameters.oauth_signature = signature;

    /* Then we turn the paramters object, to a query string */
    let paramURL = qs.stringify(parameters);

    /* Add the query string to the url */
    let apiURL = url+'?'+paramURL;

    /* Then we use request to send make the API Request */
    request(apiURL, function(error, response, body){
      return callback(error, response, body);
    });
  },
  this.businessRequest  = (businessId, callback) => {
    /* The type of request */
    let httpMethod = 'GET';

    /* The url we are using for the request */
    let url = 'http://api.yelp.com/v2/business/' + businessId;

    /* We set the require parameters here */
    let required_parameters = {
      oauth_consumer_key : process.env.YELP_KEY,
      oauth_token : process.env.YELP_TOKEN,
      oauth_nonce : n(),
      oauth_timestamp : n().toString().substr(0,10),
      oauth_signature_method : 'HMAC-SHA1',
      oauth_version : '1.0'
    };

    /* We combine all the parameters in order of importance */
    let parameters = _.assign(required_parameters);

    /* We set our secrets here */
    let consumerSecret = process.env.YELP_SECRET;
    let tokenSecret = process.env.YELP_TOKEN_SECRET;

    /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
    /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
    let signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

    /* We add the signature to the list of paramters */
    parameters.oauth_signature = signature;

    /* Then we turn the paramters object, to a query string */
    let paramURL = qs.stringify(parameters);

    /* Add the query string to the url */
    let apiURL = url+'?'+paramURL;
    console.log(apiURL);
    /* Then we use request to send make the API Request */
    request(apiURL, function(error, response, body){
      return callback(error, response, body);
    });
  }
};

module.exports = yelpHandler;
