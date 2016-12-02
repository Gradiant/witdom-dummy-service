'use strict';
var sleep = require('sleep');
var request = require('superagent');

exports.executeProtectionConfiguration = function(args, res, next) {
  /**
   * parameters expected in the args:
  * xAuthToken (String)
  * protectionConfigurationId (String)
  * purpose (String)
  * serviceCallParameters (RequestPO)
  **/

  res.setHeader('Content-Type', 'text/plain');
  res.end("1");

  console.log('executeProtectionConfiguration');
  sleep.sleep(__config.po_sleep);

  var url = __config.brokerUrlPrefix + args.serviceCallParameters.value.callbackUrl;
  console.log(url);

  var agent = request.agent();

  agent.post(url)
  .set('Content-Type', 'application/json')
  .send(
    { 
        status: 'success',
        results: [
            {
                key: "modifiedServiceParams",
                value: args.serviceCallParameters.value.serviceCallParameters 
            }
        ]
    }
  )
  .end(function(error, response) {
    if (error) {
        console.log("error:" + error);
        if (response) {
          console.log(response.status);
          console.log(response.body);
        }
    } else {
        console.log(response.body);
    }
  });
  
}

