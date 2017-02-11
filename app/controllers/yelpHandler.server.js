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
  this.searchUrl = 'http://api.yelp.com/v2/search',
  this.businessUrl = 'http://api.yelp.com/v2/business/',
  this.consumerSecret = process.env.YELP_SECRET,
  this.tokenSecret = process.env.YELP_TOKEN_SECRET,
  /* Function for yelp call
   * ------------------------
   * set_parameters: object with params to search
   * callback: callback(error, response, body)
   */
  this.searchRequest = (set_parameters, callback) => {
    /* The type of request */
    let httpMethod = 'GET';

    let apiURL = this.makeApiUrl(httpMethod, this.searchUrl, set_parameters);

    /* Then we use request to send make the API Request */
    request(apiURL, function(error, response, body){
      return callback(error, response, body);
    });
  },
  this.businessRequest  = (businessId, callback) => {
    /* The type of request */
    let httpMethod = 'GET';

    /* The url we are using for the request */
    let url = this.businessUrl + businessId;

    let apiURL = this.makeApiUrl(httpMethod, url);

    /* Then we use request to send make the API Request */
    request(apiURL, function(error, response, body){
      return callback(error, response, body);
    });
  },
  this.makeApiUrl = (httpMethod, url, set_parameters=null) => {
    let required_parameters = {
      oauth_consumer_key : process.env.YELP_KEY,
      oauth_token : process.env.YELP_TOKEN,
      oauth_nonce : n(),
      oauth_timestamp : n().toString().substr(0,10),
      oauth_signature_method : 'HMAC-SHA1',
      oauth_version : '1.0'
    };

    /* We combine all the parameters in order of importance */
    let parameters;
    if (set_parameters){
      parameters = _.assign(set_parameters, required_parameters);
    } else {
      parameters = _.assign(required_parameters);
    }

    /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
    /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
    let signature = oauthSignature.generate(httpMethod, url,
      parameters, this.consumerSecret, this.tokenSecret,
      { encodeSignature: false});

    /* We add the signature to the list of paramters */
    parameters.oauth_signature = signature;

    /* Then we turn the paramters object, to a query string */
    let paramURL = qs.stringify(parameters);

    /* Add the query string to the url */
    let apiURL = url+'?'+paramURL;

    return apiURL;
  }
};

module.exports = yelpHandler;
