'use strict';
var sleep = require('sleep');
var request = require('superagent');

exports.dummyServiceTdCbGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * xAuthToken (String)
  * xBrokerCallbackURL (String)
  **/
  // no response value expected for this operation
  res.writeHead(202);
  res.end();

  console.log('dummyServiceTdCbGET');
  sleep.sleep(__config.service_td_sleep);

  var url = __config.brokerUrlPrefix + args['X-Broker-Callback-URL'].value;
  console.log(url);

  var agent = request.agent();

  agent.post(url)
  .set('Content-Type', 'application/json')
  .set('X-Auth-Token', args['X-Auth-Token'].value)
  .send(
    { 
        result: {
		message: "Trusted domain SUCCESS (GET,cb)"
	}
    }
  )
  .end(function(error, response) {
    if (error) {
        console.log("error: " + error);
        if (response) {
          console.log(response.status);
          console.log(response.body);
        }
    } else {
        console.log(response.body);
    }
  });
}

exports.dummyServiceTdCbPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * xBrokerCallbackURL (String)
  * request_data (Request)
  **/
  // no response value expected for this operation
  res.writeHead(202);
  res.end();

  console.log('dummyServiceTdCbPOST');
  sleep.sleep(__config.service_td_sleep);

  var url = __config.brokerUrlPrefix + args['X-Broker-Callback-URL'].value;
  console.log(url);

  var agent = request.agent();

  agent.post(url)
  .set('Content-Type', 'application/json')
  .set('X-Auth-Token', args['X-Auth-Token'].value)
  .send(
    { 
        result: {
		message: "Trusted domain SUCCESS (POST,cb)"
	}
    }
  )
  .end(function(error, response) {
    if (error) {
        console.log("error: " + error);
        if (response) {
          console.log(response.status);
          console.log(response.body);
        }
    } else {
        console.log(response.body);
    }
  });
}

exports.dummyServiceTdNoCbGET = function(args, res, next) {
  /**
   * parameters expected in the args:
   **/

  console.log('dummyServiceTdNoCbGET');
  sleep.sleep(__config.service_td_sleep);
    
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Auth-Token', args['X-Auth-Token'].value);
  res.end(JSON.stringify({result: {message: "Trusted domain SUCCESS (GET,no_cb)"}} || {}, null, 2));
    
}

exports.dummyServiceTdNoCbPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
   * request_data (Request)
   **/

  console.log('dummyServiceTdNoCbPOST');
  sleep.sleep(__config.service_td_sleep);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Auth-Token', args['X-Auth-Token'].value);
  res.end(JSON.stringify({result: {message: "Trusted domain SUCCESS (POST,no_cb)"}} || {}, null, 2));
  
}
