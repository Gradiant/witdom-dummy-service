'use strict';
var sleep = require('sleep');
var request = require('superagent');

var responses = [{code: 0, message: 'STATE_PENDING'},
    {code: 1, message: 'STATE_ACTIVE'},
    {code: 2, message: 'STATE_COMPLETED'},
    {code: 3, message: 'STATE_ABORTED'},
    {code: 4, message: 'STATE_SUSPENDED'}
];

var processes = [];


exports.executeProtectionConfiguration = function(args, res, next) {
  /**
   * parameters expected in the args:
  * xAuthToken (String)
  * protectionConfigurationId (String)
  * purpose (String)
  * serviceCallParameters (RequestPO)
  **/
  var processInstanceId = processes.length;

  console.log("protectionConfigurationId selected: " + args.protectionConfigurationId.value)
  console.log("processInstanceId: " + processInstanceId);

  //res.setHeader('Content-Type', 'text/plain');
  //res.end('' + processInstanceId);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({processInstanceId:processInstanceId, randomUUID: 12345}));

  processes.push(responses[0]);

  console.log('executeProtectionConfiguration');
  setTimeout(function() {


    processes[processInstanceId] = responses[1];

    var theresults = [
        {
            key: "modifiedServiceParams",
            value: args.serviceCallParameters.value.serviceCallParameters 
        }
    ];
    // if (args.purpose.value == 'protect') {
    //     theresults.push({
    //         key: "unprotectParams",
    //         value: {
    //             database_table: "thetable",
    //             database_id: "theid",
    //             uri: "http://imauri"
    //         }
    //     });
    // }

    console.log(JSON.stringify(theresults,null,2));

    setTimeout(function() {
        processes[processInstanceId] = responses[2];

        var url = __config.brokerUrlPrefix + args.serviceCallParameters.value.callbackUrl;
        console.log(url);

        var agent = request.agent(__config.httpsOptions);

        agent.post(url)
        .set('Content-Type', 'application/json')
        // .send(
        //     { 
        //         status: 'success',
        //         results: [
        //             {
        //                 key: "modifiedServiceParams",
        //                 value: args.serviceCallParameters.value.serviceCallParameters 
        //             }
        //         ]
        //     }
        // )
        .send(
            { 
                status: 'success',
                results: theresults
            }
        )
        // .send(
        //     { 
        //         status: 'failure',
        //         failed_component: {
        //             name: "SSP",
        //             reason: {
        //                 Error:"Source table 'RS_Dataset_5' not found"
        //             }
        //         }
        //     }
        // )
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
    }, __config.po_sleep * 1000);


  }, __config.po_sleep * 1000);  
}

exports.processStatus = function(args, res, next) {
 /**
  * parameters expected in the args:
  * xAuthToken (String)
  * processInstanceId (int64)
  **/

  //console.log("processInstanceId: " + args.processInstanceId.value);

  var po_status = processes[args.processInstanceId.value];

  if (po_status) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(po_status, null, 2));
  } else {
      res.writeHead(404);
      res.end();
  }
}

