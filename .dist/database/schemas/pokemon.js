"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _default = _mongoose["default"].model('Pokemon', new _mongoose.Schema({
  id: Number,
  name: String
}));

exports["default"] = _default;