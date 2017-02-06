'use strict';

var url = require('url');


var PO = require('./POService');


module.exports.executeProtectionConfiguration = function executeProtectionConfiguration (req, res, next) {
  PO.executeProtectionConfiguration(req.swagger.params, res, next);
};

module.exports.processStatus = function processStatus (req, res, next) {
  PO.processStatus(req.swagger.params, res, next);
}