'use strict';

global.__base = __dirname + '/'; //Save the broker base directory
var app = require('connect')();
var http = require('http');
var https = require('https');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
global.__customConfigFile = process.argv[2] || 'config/custom.js';
if (__customConfigFile.charAt(0) != '/') {
    __customConfigFile = __base + __customConfigFile;
}
global.__config = require('./config');
var serverPort = __config.http.port || 8080;
var serverHttpsPort = __config.https.port || 8443;

//console.log(process.env.BROKER_PORT);
__config.brokerUrlPrefix = __config.broker.protocol + "://" + (process.env.BROKER_HOST || __config.broker.host) + ":" + (process.env.BROKER_PORT || __config.broker[__config.broker.protocol].port) + "/v1";
console.log(__config.brokerUrlPrefix); 
console.log(__config);


var ursa = require('ursa');
var privatekey = ursa.createPrivateKey(fs.readFileSync(__config.https.service_key), __config.https.service_key_passphrase);

// Https server configuration
var httpsOptions = {
    key: privatekey.toPrivatePem(),
    cert: fs.readFileSync(__config.https.service_cert), 
    ca: [],
    requestCert: true, 
    rejectUnauthorized: false
};
for (const ca_cert of __config.https.ca_certs) {
    httpsOptions.ca.push(fs.readFileSync(ca_cert));
}

__config.httpsOptions = httpsOptions;

// swaggerRouter configuration
var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};


// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

  // Start the https server
  https.createServer(httpsOptions,app).listen(serverHttpsPort, function () {
      console.info('Your server is listening on port %d (https://localhost:%d)', serverHttpsPort, serverHttpsPort);
      console.info('Swagger-ui is available on https://localhost:%d/docs', serverHttpsPort);
  });
});
