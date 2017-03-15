var _ = require("lodash");
var defaults = require("./default.js");
var config = require(__customConfigFile);

function customizer(objValue, srcValue) {
  if (_.isObject(objValue)) {
     return srcValue;
  }
} 

module.exports = _.mergeWith({}, defaults, config, customizer);
var config = require("./custom.js");
