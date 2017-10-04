'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('isomorphic-fetch');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ethereumjsUtil = require('ethereumjs-util');

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

var _ethereumjsWallet = require('ethereumjs-wallet');

var _ethereumjsWallet2 = _interopRequireDefault(_ethereumjsWallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global fetch */
/* eslint-disable no-console */

var defaultConfig = {
  endpoint: 'http://localhost:3000',
  log: false,
  getPostData: function getPostData(ipfsHash) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        signMessage = _ref.signMessage,
        privateKey = _ref.privateKey,
        signer = _ref.signer;

    if (!signMessage) {
      return { ipfsHash: ipfsHash };
    }
    var timestamp = new Date().getTime();
    var message = _ethereumjsUtil2.default.hashPersonalMessage(_ethereumjsUtil2.default.sha3('' + ipfsHash + timestamp));

    var _util$ecsign = _ethereumjsUtil2.default.ecsign(message, privateKey),
        r = _util$ecsign.r,
        s = _util$ecsign.s,
        v = _util$ecsign.v;

    var signature = _ethereumjsUtil2.default.toRpcSig(v, r, s);
    return { ipfsHash: ipfsHash, signature: signature, timestamp: timestamp, signer: signer };
  },
  dispatchPostData: function dispatchPostData(data, config) {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', fetch(config.endpoint, {
                method: 'POST',
                body: (0, _stringify2.default)(data),
                headers: { 'Content-Type': 'application/json' }
              }));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

var DijixIpfsPinningPlugin = function () {
  function DijixIpfsPinningPlugin(config) {
    (0, _classCallCheck3.default)(this, DijixIpfsPinningPlugin);

    this.config = (0, _extends3.default)({}, defaultConfig, config);
    if (this.config.signMessage && (0, _typeof3.default)(this.config.signMessage) === 'object') {
      var _config$signMessage = this.config.signMessage,
          keystore = _config$signMessage.keystore,
          password = _config$signMessage.password;

      var data = JSON.parse(_fs2.default.readFileSync(keystore).toString());
      var wallet = _ethereumjsWallet2.default.fromV3(data, password);
      this.config.privateKey = wallet.getPrivateKey();
      this.config.signer = wallet.getAddressString();
    }
  }

  (0, _createClass3.default)(DijixIpfsPinningPlugin, [{
    key: 'ipfsHashAdded',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ipfsHash) {
        var postData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.config.getPostData(ipfsHash, this.config);

              case 2:
                postData = _context2.sent;

                if (this.log) {
                  console.log('pinning', ipfsHash);
                }
                return _context2.abrupt('return', this.config.dispatchPostData(postData, this.config));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function ipfsHashAdded(_x2) {
        return _ref2.apply(this, arguments);
      }

      return ipfsHashAdded;
    }()
  }]);
  return DijixIpfsPinningPlugin;
}();

exports.default = DijixIpfsPinningPlugin;