'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _awaiting = require('awaiting');

var a = _interopRequireWildcard(_awaiting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DijixAttestation = function () {
  function DijixAttestation() {
    (0, _classCallCheck3.default)(this, DijixAttestation);

    this.type = 'attestation';
  }

  (0, _createClass3.default)(DijixAttestation, [{
    key: 'processProofs',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(proofs, dijix) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (proofs) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', []);

              case 2:
                return _context2.abrupt('return', a.map(proofs, 1, function () {
                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(proof) {
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!((typeof proof === 'undefined' ? 'undefined' : (0, _typeof3.default)(proof)) !== 'object')) {
                              _context.next = 2;
                              break;
                            }

                            return _context.abrupt('return', proof);

                          case 2:
                            if (proof.type) {
                              _context.next = 4;
                              break;
                            }

                            return _context.abrupt('return', proof);

                          case 4:
                            _context.next = 6;
                            return dijix.create(proof.type, proof);

                          case 6:
                            return _context.abrupt('return', _context.sent.ipfsHash);

                          case 7:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function processProofs(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return processProofs;
    }()
  }, {
    key: 'creationPipeline',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(opts, dijix) {
        var dijixObjectData, version;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.processProofs(opts.proofs, dijix);

              case 2:
                _context3.t0 = _context3.sent;
                dijixObjectData = {
                  proofs: _context3.t0
                };
                version = opts.version || opts.type && '0.0.1';

                if (version) {
                  dijixObjectData.version = version;
                }
                if (opts.type) {
                  dijixObjectData.type = opts.type;
                }
                if (opts.attestation) {
                  dijixObjectData.attestation = opts.attestation;
                }
                return _context3.abrupt('return', dijixObjectData);

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function creationPipeline(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return creationPipeline;
    }()
  }]);
  return DijixAttestation;
}();

exports.default = DijixAttestation;