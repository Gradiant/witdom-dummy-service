'use strict';

var url = require('url');


var Dummyserviceud = require('./DummyserviceudService');


module.exports.dummyServiceUdCbGET = function dummyServiceUdCbGET (req, res, next) {
  Dummyserviceud.dummyServiceUdCbGET(req.swagger.params, res, next);
};

module.exports.dummyServiceUdCbPOST = function dummyServiceUdCbPOST (req, res, next) {
  Dummyserviceud.dummyServiceUdCbPOST(req.swagger.params, res, next);
};

module.exports.dummyServiceUdNoCbGET = function dummyServiceUdNoCbGET (req, res, next) {
  Dummyserviceud.dummyServiceUdNoCbGET(req.swagger.params, res, next);
};

module.exports.dummyServiceUdNoCbPOST = function dummyServiceUdNoCbPOST (req, res, next) {
  Dummyserviceud.dummyServiceUdNoCbPOST(req.swagger.params, res, next);
};
