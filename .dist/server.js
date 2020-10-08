"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _display = require("./helpers/display");

var _checkEnv = _interopRequireDefault(require("./helpers/checkEnv"));

var _database = require("./database");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pokemon = _interopRequireDefault(require("./database/schemas/pokemon"));

function main() {
  return _main.apply(this, arguments);
} // Entry point 😎


function _main() {
  _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var pokemon;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _dotenv["default"].config();

            _context.prev = 1;
            (0, _checkEnv["default"])(['PORT', 'HOST', 'DATABASE_URI']);
            (0, _display.info)('Server initialization...');
            _context.next = 6;
            return (0, _database.connect)(process.env.DATABASE_URI);

          case 6:
            (0, _display.success)('Database successfully connected!');
            pokemon = new _pokemon["default"]();
            pokemon.save(function (err) {
              if (err) {
                (0, _display.error)('sorry');
              }

              (0, _display.success)('pokemon savedd!');
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            (0, _display.error)(_context.t0.message);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));
  return _main.apply(this, arguments);
}

main();