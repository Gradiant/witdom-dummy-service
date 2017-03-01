'use strict';
var sleep = require('sleep');
var request = require('superagent');

exports.dummyServiceUdCbGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * xBrokerCallbackURL (String)
  * xAuthToken (String)
  **/
  // no response value expected for this operation
  res.writeHead(202);
  res.end();

  console.log('dummyServiceUdCbGET');
  sleep.sleep(__config.service_ud_sleep);

  var url = __config.brokerUrlPrefix + args['X-Broker-Callback-URL'].value;
  console.log(url);

  var agent = request.agent();

  agent.post(url)
  .set('Content-Type', 'application/json')
  .set('X-Auth-Token', args['X-Auth-Token'].value)
  .send(
    { 
        result: {
		message: "Untrusted domain SUCCESS (GET,cb)"
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

exports.dummyServiceUdCbPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * xBrokerCallbackURL (String)
  * request_data (Request)
  **/
  // no response value expected for this operation
  res.writeHead(202);
  res.end();

  console.log('dummyServiceUdCbPOST');
  sleep.sleep(__config.service_ud_sleep);

  var url = __config.brokerUrlPrefix + args['X-Broker-Callback-URL'].value;
  console.log(url);

  var agent = request.agent();

  agent.post(url)
  .set('Content-Type', 'application/json')
  .set('X-Auth-Token', args['X-Auth-Token'].value)
  .send(
    { 
        result: {
		message: "Untrusted domain SUCCESS (POST,cb)"
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

exports.dummyServiceUdNoCbGET = function(args, res, next) {
  /**
   * parameters expected in the args:
   **/

  console.log('dummyServiceUdNoCbGET');
  sleep.sleep(__config.service_ud_sleep);
    
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Auth-Token', args['X-Auth-Token'].value);
  res.end(JSON.stringify({result: {message: "Untrusted domain SUCCESS (GET,no_cb)"}} || {}, null, 2));
  
}

exports.dummyServiceUdNoCbPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
   * request_data (Request)
   **/
  
  console.log('dummyServiceUdNoCbPOST');
  sleep.sleep(__config.service_ud_sleep);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Auth-Token', args['X-Auth-Token'].value);
  res.end(JSON.stringify({result: {message: "Untrusted domain SUCCESS (POST,no_cb)"}} || {}, null, 2));
  
}
