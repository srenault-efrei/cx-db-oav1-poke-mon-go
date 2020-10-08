"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = display;
exports.info = info;
exports.success = success;
exports.error = error;

var _chalk = _interopRequireDefault(require("chalk"));

function display(str, color) {
  // /!\ Challenge -->> typer correctement
  console.log(_chalk["default"][color](str));
}

function info(str) {
  display(str, 'cyan');
}

function success(str) {
  display(str, 'green');
}

function error(str) {
  display(str, 'red');
}