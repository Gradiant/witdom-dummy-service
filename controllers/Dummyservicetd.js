'use strict';

var url = require('url');


var Dummyservicetd = require('./DummyservicetdService');


module.exports.dummyServiceTdCbGET = function dummyServiceTdCbGET (req, res, next) {
  Dummyservicetd.dummyServiceTdCbGET(req.swagger.params, res, next);
};

module.exports.dummyServiceTdCbPOST = function dummyServiceTdCbPOST (req, res, next) {
  Dummyservicetd.dummyServiceTdCbPOST(req.swagger.params, res, next);
};

module.exports.dummyServiceTdNoCbGET = function dummyServiceTdNoCbGET (req, res, next) {
  Dummyservicetd.dummyServiceTdNoCbGET(req.swagger.params, res, next);
};

module.exports.dummyServiceTdNoCbPOST = function dummyServiceTdNoCbPOST (req, res, next) {
  Dummyservicetd.dummyServiceTdNoCbPOST(req.swagger.params, res, next);
};
