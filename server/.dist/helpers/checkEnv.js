"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = checkEnv;

var _lodash = require("lodash");

function checkEnv(keys) {
  if ((0, _lodash.isEmpty)(keys)) {
    return;
  }

  var missingValues = keys.filter(function (k) {
    return !(k in process.env);
  });

  if (!(0, _lodash.isEmpty)(missingValues)) {
    throw new Error("Sorry can't found  mandatories values [ ".concat(missingValues.join(', '), " ]"));
  }
}