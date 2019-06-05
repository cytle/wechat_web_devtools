/* eslint-disable */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var messager = __webpack_require__(1);

var debuggee = __webpack_require__(2);

messager.connect();
messager.receive(function (msg) {
  debuggee.exec(msg);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _callback = [];

function callback() {
  var _this = this,
      _arguments = arguments;

  _callback.forEach(function (fn) {
    try {
      fn.apply(_this, _arguments);
    } catch (e) {}
  });
}

function connect() {
  wx.on('remoteDebugCommand', callback);
}

function send(msg) {
  wx.invoke('remoteDebugInfo', msg, function () {});
}

var receive = function receive(callback) {
  _callback.push(callback);
};

module.exports = {
  connect: connect,
  receive: receive,
  send: send
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

var nodeManager = __webpack_require__(6);

var HighLight = __webpack_require__(7);

var StyleSheets = __webpack_require__(13);

var messager = __webpack_require__(1);

var mutation = __webpack_require__(20);

var inspector = __webpack_require__(21);

var _require = __webpack_require__(8),
    IsDevtools = _require.IsDevtools;

var ATTRIBUTES_MODIFY_INSTANCE = IsDevtools ? 100 : 1000;
var CHILDLIST_MODIFY_INSTANCE = IsDevtools ? 100 : 1000;
var MAX_CHILDLIST_EVENT = 100;
var MAX_ATTRIBUTE_EVENT = 100;

var Debuggee =
/*#__PURE__*/
function () {
  function Debuggee(inspect) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Debuggee);
    this._ready = false;
    this._inspectInfo = undefined;
    this._highlight = new HighLight();
    this._styleSheets = new StyleSheets();
    this._methodMap = {
      'DOM.getDocument': 'getDocument',
      'DOM.querySelector': 'querySelector',
      'DOM.requestChildNodes': 'requestChildNodes',
      'DOM.highlightNode': 'highlightNode',
      'DOM.hideHighlight': 'hideHighlight',
      'DOM.getAttributes': 'getAttributes',
      'DOM.removeAttribute': 'removeAttribute',
      'DOM.setAttributesAsText': 'setAttributesAsText',
      'CSS.getMatchedStylesForNode': 'getMatchedStylesForNode',
      'CSS.setStyleTexts': 'setStyleTexts',
      'Overlay.setInspectMode': 'setInspectMode',
      'DOM.pushNodesByBackendIdsToFrontend': 'pushNodesByBackendIdsToFrontend',
      'DOM.setNodeValue': 'setNodeValue'
    };
    this._observered = false;
    window.addEventListener('scroll', function () {
      _this._highlight.hide();
    });
    window.addEventListener('touchmove', function () {
      _this._highlight.hide();
    });
    this._inspect = inspect;

    if (this._inspect) {
      this._inspect.init(this._highlight, this.event.bind(this));
    }

    this._attributeModifiedEvent = {};
    this._attributeModifiedEventTimer = null;
    this._childListModifiedEvent = [];
    this._childListModifiedEventTimer = null;
    this._lastTriggerChildNodeMutationTime = 0;
    this._lastTriggerAttributeMutationTime = 0;
  }

  (0, _createClass2.default)(Debuggee, [{
    key: "inHighLight",
    value: function inHighLight(dom) {
      return this._highlight.contain(dom);
    }
  }, {
    key: "formatNode",
    value: function formatNode(dom) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var nodeId = nodeManager.getNodeId(dom);
      var parentId;

      if (dom.parentElement) {
        parentId = nodeManager.getNodeId(dom.parentElement);
      }

      var node = {
        parentId: parentId,
        nodeId: nodeId,
        localName: dom.localName,
        nodeName: dom.nodeName,
        nodeType: dom.nodeType,
        nodeValue: dom.nodeValue || '',
        children: [],
        attributes: []
      };

      if (dom.attributes) {
        for (var attrIndex = 0, attrLen = dom.attributes.length; attrIndex < attrLen; attrIndex++) {
          var attr = dom.attributes[attrIndex];
          node.attributes.push(attr.name);
          node.attributes.push(attr.value);
        }
      }

      var _this$_requestChildNo = this._requestChildNodes(nodeId, depth),
          children = _this$_requestChildNo.children,
          childNodeCount = _this$_requestChildNo.childNodeCount;

      node.children = children;
      node.childNodeCount = childNodeCount;
      return node;
    }
  }, {
    key: "_requestChildNodes",
    value: function _requestChildNodes(nodeId) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var target = nodeManager.getDOMByNodeId(nodeId);
      var children = [];
      var childNodeCount = 0;

      if (target) {
        if (target.childNodes) {
          for (var i = 0, len = target.childNodes.length; i < len; i++) {
            var dom = target.childNodes[i];

            if (this._highlight.contain(dom)) {
              continue;
            }

            if (dom.tagName === 'STYLE' || dom.tagName === 'SCRIPT') {
              continue;
            }

            childNodeCount++;

            if (depth < 0 || depth >= 1) {
              children.push(this.formatNode(dom, depth - 1));
            }
          }
        }
      }

      return {
        children: children,
        childNodeCount: childNodeCount
      };
    }
  }, {
    key: "attributesMutation",
    value: function attributesMutation(record) {
      if (this._highlight.contain(record.target)) {
        return;
      }

      var nodeId = nodeManager.getNodeIdFromMap(record.target);

      if (!nodeId) {
        return;
      }

      var value = record.target.getAttribute(record.attributeName);

      if (value === null) {
        this.event('DOM.attributeRemoved', {
          name: record.attributeName,
          nodeId: nodeId
        });
      } else {
        this._attributeModified(nodeId, record.attributeName, value);
      }
    }
  }, {
    key: "_attributeModified",
    value: function _attributeModified(nodeId, name, value) {
      var _this2 = this;

      var event = this._attributeModifiedEvent[nodeId];

      if (!event) {
        event = this._attributeModifiedEvent[nodeId] = {};
      }

      event[name] = value;
      clearTimeout(this._attributeModifiedEventTimer);

      if (Date.now() - this._lastTriggerAttributeMutationTime > ATTRIBUTES_MODIFY_INSTANCE || Object.keys(this._attributeModifiedEvent).length > MAX_ATTRIBUTE_EVENT) {
        this.triggerAttributeMutation();
      } else {
        this._attributeModifiedEventTimer = setTimeout(function () {
          _this2.triggerAttributeMutation();
        }, ATTRIBUTES_MODIFY_INSTANCE);
      }
    }
  }, {
    key: "triggerAttributeMutation",
    value: function triggerAttributeMutation() {
      if (Object.keys(this._attributeModifiedEvent).length > 0) {
        this._lastTriggerAttributeMutationTime = Date.now();
        this.event('DOM.attributeModified.EventList', this._attributeModifiedEvent);
        this._attributeModifiedEvent = {};
      }
    }
  }, {
    key: "_childListModified",
    value: function _childListModified(type, params) {
      var _this3 = this;

      this._childListModifiedEvent.push({
        type: type,
        params: params
      });

      clearTimeout(this._childListModifiedEventTimer);

      if (Date.now() - this._lastTriggerChildNodeMutationTime > CHILDLIST_MODIFY_INSTANCE || this._childListModifiedEvent.length > MAX_CHILDLIST_EVENT) {
        this.triggerChildNodeMutation();
      } else {
        this._childListModifiedEventTimer = setTimeout(function () {
          _this3.triggerChildNodeMutation();
        }, CHILDLIST_MODIFY_INSTANCE);
      }
    }
  }, {
    key: "triggerChildNodeMutation",
    value: function triggerChildNodeMutation() {
      if (this._childListModifiedEvent.length > 0) {
        var nodeInsertMarker = {};
        var filterMarker = {};

        for (var i = 0, len = this._childListModifiedEvent.length; i < len; i++) {
          var item = this._childListModifiedEvent[i];

          if (item.type === 'DOM.childNodeInserted') {
            nodeInsertMarker[item.params.node.nodeId + "_" + item.params.parentNodeId] = i;
          } else if (item.type === 'DOM.childNodeRemoved') {
            var insertIndex = nodeInsertMarker[item.params.nodeId + "_" + item.params.parentNodeId];

            if (insertIndex !== undefined) {
              filterMarker[insertIndex] = true;
              filterMarker[i] = true;
            }
          }
        }

        var eventList = [];

        for (var _i = 0, _len = this._childListModifiedEvent.length; _i < _len; _i++) {
          if (!filterMarker[_i]) {
            eventList.push(this._childListModifiedEvent[_i]);
          }
        }

        this._lastTriggerChildNodeMutationTime = Date.now();
        this.event('DOM.childNodeMutation.EventList', eventList);
        this._childListModifiedEvent = [];
      }
    }
  }, {
    key: "childListMutation",
    value: function childListMutation(record) {
      var _this4 = this;

      var parentNodeId = nodeManager.getNodeIdFromMap(record.target);

      if (!parentNodeId && record.target.localName !== 'html') {
        return;
      }

      if (record.addedNodes.length > 0) {
        var previousNodeId;

        if (record.previousSibling) {
          previousNodeId = nodeManager.getNodeId(record.previousSibling);
        }

        record.addedNodes.forEach(function (dom) {
          if (!dom || _this4._highlight.contain(dom)) {
            return;
          }

          if (dom.tagName === 'STYLE') {
            return _this4._styleSheets.init();
          }

          if (dom.tagName === 'SCRIPT') {
            return;
          }

          _this4._childListModified('DOM.childNodeInserted', {
            node: _this4.formatNode(dom),
            parentNodeId: parentNodeId,
            previousNodeId: previousNodeId
          });
        });
      }

      if (record.removedNodes.length > 0) {
        record.removedNodes.forEach(function (dom) {
          if (!dom || _this4._highlight.contain(dom)) {
            return;
          }

          if (dom.nodeName === 'BODY') {
            _this4.event('DOM.documentUpdated', {});

            return;
          }

          var nodeId = nodeManager.removeDOM(dom);

          if (nodeId) {
            _this4._childListModified('DOM.childNodeRemoved', {
              parentNodeId: parentNodeId,
              nodeId: nodeId
            });
          }
        });
      }
    }
  }, {
    key: "showScopeData",
    value: function showScopeData() {
      var _this5 = this;

      if (window.__virtualDOM__ && window.__DOMTree__) {
        window.__virtualDOM__.spreadScopeDataToDOMNode();
      } else {
        setTimeout(function () {
          _this5.showScopeData();
        }, 200);
      }
    }
  }, {
    key: "getDocument",
    value: function getDocument() {
      var _this6 = this;

      var nodeId = nodeManager.getNodeId(document);

      if (!this._observered) {
        this._observered = true;
        mutation.observer(document, function (mutations) {
          mutations.forEach(function (record) {
            if (record.type === 'attributes') {
              _this6.attributesMutation(record);
            } else if (record.type === 'childList') {
              _this6.childListMutation(record);
            }
          });
        });
      }

      return {
        root: {
          baseURL: 'https://servicewechat.com/page-frame.html',
          nodeId: nodeId
        }
      };
    }
  }, {
    key: "querySelector",
    value: function querySelector(commandParams) {
      this._ready = true;
      var nodeId = commandParams.nodeId,
          selector = commandParams.selector;
      var target = nodeManager.getDOMByNodeId(nodeId);

      if (target) {
        var dom = target.querySelector(selector);

        if (dom) {
          return {
            nodeId: nodeManager.getNodeId(dom)
          };
        }
      }
    }
  }, {
    key: "requestChildNodes",
    value: function requestChildNodes(commandParams) {
      var _this7 = this;

      var nodeId = commandParams.nodeId,
          _commandParams$depth = commandParams.depth,
          depth = _commandParams$depth === void 0 ? 1 : _commandParams$depth;
      setTimeout(function () {
        var _this7$_requestChildN = _this7._requestChildNodes(nodeId, depth),
            children = _this7$_requestChildN.children;

        _this7.event('DOM.setChildNodes', {
          parentId: nodeId,
          nodes: children
        });
      });
      return {};
    }
  }, {
    key: "getMatchedStylesForNode",
    value: function getMatchedStylesForNode(commandParams) {
      var nodeId = commandParams.nodeId;
      var target = nodeManager.getDOMByNodeId(nodeId);
      return {
        matchedCSSRules: this._styleSheets.getMatchedStylesForNode(target),
        inlineStyle: this._styleSheets.getInlineStyle(target)
      };
    }
  }, {
    key: "setStyleTexts",
    value: function setStyleTexts(commandParams) {
      var edits = commandParams.edits;

      for (var i = 0, len = edits.length; i < len; i++) {
        this._styleSheets.setStyleTexts(edits[i]);
      }

      return {};
    }
  }, {
    key: "getAttributes",
    value: function getAttributes(commandParams) {
      this.showScopeData();
      var nodeId = commandParams.nodeId;
      var target = nodeManager.getDOMByNodeId(nodeId);

      if (target) {
        var attributes = [];

        for (var attrIndex = 0, attrLen = target.attributes.length; attrIndex < attrLen; attrIndex++) {
          var attr = target.attributes[attrIndex];
          attributes.push(attr.name);
          attributes.push(attr.value);
        }

        return {
          attributes: attributes
        };
      }
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(commandParams) {
      var nodeId = commandParams.nodeId,
          name = commandParams.name;
      var target = nodeManager.getDOMByNodeId(nodeId);

      if (target) {
        target.removeAttribute(name);
        return {};
      }
    }
  }, {
    key: "setAttributesAsText",
    value: function setAttributesAsText(commandParams) {
      var nodeId = commandParams.nodeId,
          text = commandParams.text;
      var target = nodeManager.getDOMByNodeId(nodeId);

      if (target) {
        var matches = text.match(/(\w+)(-\w+)?\s*=\s*['"]([^"]*)['"]/g) || [];

        for (var i = 0, len = matches.length; i < len; i++) {
          var result = matches[i].split('=');
          var name = result[0].trim();
          var value = result[1].trim().replace(/^"/, '').replace(/"$/, '');

          if (name) {
            target.setAttribute(name, value);
          }
        }

        return {};
      }
    }
  }, {
    key: "highlightNode",
    value: function highlightNode(commandParams) {
      var nodeId = commandParams.nodeId,
          highlightConfig = commandParams.highlightConfig;
      var target = nodeManager.getDOMByNodeId(nodeId);

      if (target) {
        this._highlight.show(target, highlightConfig);
      }
    }
  }, {
    key: "hideHighlight",
    value: function hideHighlight() {
      this._highlight.hide();

      return {};
    }
  }, {
    key: "setInspectMode",
    value: function setInspectMode(commandParams) {
      if (this._inspect) {
        this._inspect.setInspectMode(commandParams);
      }
    }
  }, {
    key: "pushNodesByBackendIdsToFrontend",
    value: function pushNodesByBackendIdsToFrontend(commandParams) {
      return {
        nodeIds: commandParams.backendNodeIds
      };
    }
  }, {
    key: "setNodeValue",
    value: function setNodeValue(commandParams) {
      var nodeId = commandParams.nodeId,
          value = commandParams.value;
      var target = nodeManager.getDOMByNodeId(nodeId);

      if (target) {
        target.nodeValue = value;
      }
    }
  }, {
    key: "event",
    value: function event(method, params) {
      if (!this._ready) {
        return;
      }

      messager.send({
        command: 'DEBUGGEE_EVENT',
        data: {
          debuggee: this.debuggee,
          method: method,
          params: params
        }
      });
    }
  }, {
    key: "exec",
    value: function exec(msg) {
      var method = this._methodMap[msg.method];

      if (method && typeof this[method] === 'function') {
        var res = this[method](msg.commandParams);

        if (msg.callbackID) {
          messager.send({
            command: 'DEBUGGEE_CALLBACK',
            callbackID: msg.callbackID,
            data: res
          });
        }
      }
    }
  }, {
    key: "debuggee",
    get: function get() {
      return {
        targetId: window.__webviewId__
      };
    }
  }, {
    key: "highlight",
    get: function get() {
      return this._highlight.dom();
    }
  }]);
  return Debuggee;
}();

module.exports = new Debuggee(inspector);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

var NodeManager =
/*#__PURE__*/
function () {
  function NodeManager() {
    (0, _classCallCheck2.default)(this, NodeManager);
    this.NODE_COUNTER = 1;
    this.NODE_ID_DOM_MAP = {};
    this.DOM_WEAK_MAP = new WeakMap();
  }

  (0, _createClass2.default)(NodeManager, [{
    key: "getNodeIdFromMap",
    value: function getNodeIdFromMap(dom) {
      if (!dom) return;
      return this.DOM_WEAK_MAP.get(dom);
    }
  }, {
    key: "getNodeId",
    value: function getNodeId(dom) {
      if (!dom) return;
      var nodeId = this.DOM_WEAK_MAP.get(dom);

      if (!nodeId) {
        nodeId = this.NODE_COUNTER++;
        this.NODE_ID_DOM_MAP[nodeId] = dom;
        this.DOM_WEAK_MAP.set(dom, nodeId);
      }

      return nodeId;
    }
  }, {
    key: "getDOMByNodeId",
    value: function getDOMByNodeId(nodeId) {
      return this.NODE_ID_DOM_MAP[nodeId];
    }
  }, {
    key: "removeDOM",
    value: function removeDOM(dom) {
      var nodeId = this.DOM_WEAK_MAP.get(dom);

      if (nodeId) {
        delete this.NODE_ID_DOM_MAP[nodeId];
        this.DOM_WEAK_MAP.delete(dom);
      }

      return nodeId;
    }
  }]);
  return NodeManager;
}();

module.exports = new NodeManager();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    IsDevtools = _require.IsDevtools;

module.exports = IsDevtools ? __webpack_require__(9) : __webpack_require__(10);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IsDevtools = window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('wechatdevtools') >= 0;
module.exports = {
  IsDevtools: IsDevtools
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

var inspectArrowHeight = 4;
var tipsZIndex = 1000000;
var uiInspectPoptips = "\n  display: flex;\n  position: fixed;\n  padding: 4px 10px;\n  font-size: 12px;\n  color: #d9d9d9;\n  background-color: #34373f;\n  z-index: " + tipsZIndex + ";\n  border-radius: 2px;\n  cursor: default;\n  border: 1px solid #7f7f7f;\n  box-sizing: border-box;\n";
var uiInspectPoptipsSep = "\n  display: inline-block;\n  align-self: center;\n  height: 100%;\n  vertical-align: middle;\n  width: 1px;\n  height: 18px;\n  background-color: #7f7f7f;\n  margin: 0px 8px;\n";
var uiInspectPoptipsArrowBottomLeft = "\n  bottom: 100%;\n  margin-bottom: -4px;\n  transform: rotate(225deg) skewX(5deg) skewY(5deg);\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  width: 8px;\n  height: 8px;\n  border-radius: 0 0 2px 0;\n  background: linear-gradient(-45deg,#34373f 50%,transparent 0);\n";
var uiInspectPoptipsArrowTopLeft = "\n  top: 100%;\n  margin-top: -4px;\n  transform: rotate(45deg) skewX(5deg) skewY(5deg);\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  width: 8px;\n  height: 8px;\n  border-radius: 0 0 2px 0;\n  background: linear-gradient(-45deg,#34373f 50%,transparent 0);\n  bottom: 100%;\n  margin-bottom: -4px;\n";
var uiInspectPoptipsArrowBottomRight = "\n  bottom: 100%;\n  margin-bottom: -4px;\n  transform: rotate(225deg) skewX(5deg) skewY(5deg);\n  content: \"\";\n  position: absolute;\n  right: 10px;\n  width: 8px;\n  height: 8px;\n  border-radius: 0 0 2px 0;\n  background: linear-gradient(-45deg,#34373f 50%,transparent 0);\n";
var uiInspectPoptipsArrowTopRight = "\n  top: 100%;\n  margin-top: -4px;\n  transform: rotate(45deg) skewX(5deg) skewY(5deg);\n  content: \"\";\n  position: absolute;\n  right: 10px;\n  width: 8px;\n  height: 8px;\n  border-radius: 0 0 2px 0;\n  background: linear-gradient(-45deg,#34373f 50%,transparent 0);\n  bottom: 100%;\n  margin-bottom: -4px;\n";

var HighLight =
/*#__PURE__*/
function () {
  function HighLight() {
    (0, _classCallCheck2.default)(this, HighLight);
    this._inited = false;
    this._dom = null;
    this._borderDom = null;
    this._sizeDom = null;
    this._target = null;
  }

  (0, _createClass2.default)(HighLight, [{
    key: "init",
    value: function init() {
      this._dom = document.createElement('div');
      this._borderDom = document.createElement('div');
      this._sizeDom = document.createElement('div');

      this._dom.appendChild(this._borderDom);

      this._borderDom.appendChild(this._sizeDom);

      this._dom.style.position = 'fixed';
      this._dom.style.pointerEvents = 'none';
      this._dom.style.zIndex = tipsZIndex - 1;
      this._inspectTipsContainer = document.createElement('div');
      this._tagContainer = document.createElement('p');
      this._tagNameTips = document.createElement('span');
      this._idTips = document.createElement('span');
      this._classTips = document.createElement('span');
      this._inspectTipsSep = document.createElement('span');
      this._sizeTips = document.createElement('span');
      this._arrowTips = document.createElement('i');

      this._inspectTipsContainer.setAttribute('style', uiInspectPoptips);

      this._tagContainer.setAttribute('style', 'margin: auto; word-break: break-all; flex-shrink: 2;');

      this._tagNameTips.setAttribute('style', 'color:#df80e1;');

      this._idTips.setAttribute('style', 'color: #f3ae71;');

      this._classTips.setAttribute('style', 'color: #98cbef;');

      this._inspectTipsSep.setAttribute('style', uiInspectPoptipsSep);

      this._sizeTips.setAttribute('style', 'color: white; font-size: 11px; white-space: nowrap; align-self: center;');

      this._arrowTips.setAttribute('style', uiInspectPoptipsArrowTopLeft);

      this._tagContainer.appendChild(this._tagNameTips);

      this._tagContainer.appendChild(this._idTips);

      this._tagContainer.appendChild(this._classTips);

      this._inspectTipsContainer.appendChild(this._tagContainer);

      this._inspectTipsContainer.appendChild(this._inspectTipsSep);

      this._inspectTipsContainer.appendChild(this._sizeTips);

      this._inspectTipsContainer.appendChild(this._arrowTips);

      this._inited = true;
    }
  }, {
    key: "pruneNum",
    value: function pruneNum(num) {
      var numStr = num.toFixed(2);
      var regExp = /\.?(0{1,})$/i;
      return numStr.replace(regExp, '');
    }
  }, {
    key: "setTips",
    value: function setTips(rect) {
      var _this = this;

      var top = rect.top,
          left = rect.left,
          width = rect.width,
          height = rect.height,
          contentWidth = rect.contentWidth,
          contentHeight = rect.contentHeight;

      var tagName = this._target.tagName.replace(/^WX-/, '').toLowerCase();

      if (tagName === 'body') {
        tagName = 'page';
      }

      this._tagNameTips.innerText = tagName;
      this._idTips.innerText = this._target.id ? "#" + this._target.id : '';
      var classList = Array.prototype.join.call(this._target.classList, '.');
      this._classTips.innerText = classList ? "." + classList : '';
      this._sizeTips.innerText = this.pruneNum(contentWidth) + " x " + this.pruneNum(contentHeight);
      var maxWidth = window.innerWidth - 100;
      this._inspectTipsContainer.style.maxWidth = maxWidth + "px";
      this._inspectTipsContainer.style.minWidth = 120 + "px";
      var totalTagLength = this._tagNameTips.innerText.length + this._idTips.innerText.length + this._classTips.innerText.length;
      var computedWidth = 20 + totalTagLength * 6.2 + 16 + 1 + this._sizeTips.innerText.length * 6;
      this._inspectTipsContainer.style.width = computedWidth + 'px';
      document.body.appendChild(this._inspectTipsContainer);

      var tipsRect = this._inspectTipsContainer.getBoundingClientRect();

      var inspectHeight = tipsRect.height;
      var isRight = left + Math.min(maxWidth, computedWidth) > window.innerWidth;

      var adjustCss = function adjustCss(isTop) {
        if (isRight) {
          _this._arrowTips.setAttribute('style', isTop ? uiInspectPoptipsArrowTopRight : uiInspectPoptipsArrowBottomRight);

          var originalLeft = width + left - Math.min(maxWidth, computedWidth);
          _this._inspectTipsContainer.style.left = Math.max(0, originalLeft) + 'px';

          if (originalLeft < 0) {
            _this._inspectTipsContainer.style.width = Math.min(maxWidth, computedWidth) + originalLeft + 'px';
          }
        } else {
          _this._arrowTips.setAttribute('style', isTop ? uiInspectPoptipsArrowTopLeft : uiInspectPoptipsArrowBottomLeft);

          _this._inspectTipsContainer.style.left = left + 'px';
        }
      };

      var bottom = window.innerHeight - top - height;

      if (top > bottom) {
        adjustCss(true);
        var tipsTop = top - inspectHeight - inspectArrowHeight;
        this._inspectTipsContainer.style.top = (tipsTop > 0 ? tipsTop : 0) + "px";
      } else {
        adjustCss(false);

        var _tipsTop = top + height + inspectArrowHeight;

        this._inspectTipsContainer.style.top = (_tipsTop + inspectHeight < window.innerHeight ? _tipsTop : window.innerHeight - inspectHeight) + "px";
      }
    }
  }, {
    key: "setDomStyle",
    value: function setDomStyle(dom, style) {
      dom.style.backgroundColor = style.backgroundColor;
      dom.style.borderColor = style.borderColor;
      dom.style.borderWidth = style.borderWidth;
      dom.style.borderStyle = 'solid';
      ['left', 'top', 'width', 'height'].forEach(function (item) {
        dom.style[item] = style[item] + 'px';
      });
    }
  }, {
    key: "formatConfigColorRgba",
    value: function formatConfigColorRgba(config, item) {
      var _config$item = config[item],
          r = _config$item.r,
          g = _config$item.g,
          b = _config$item.b,
          a = _config$item.a;
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }
  }, {
    key: "show",
    value: function show(target, config) {
      if (target === this._target) {
        return;
      }

      if (!this._inited) {
        this.init();
      }

      var rect = target.getBoundingClientRect();
      var style = window.getComputedStyle(target);
      var styleInfo = {};
      ['width', 'height', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'].forEach(function (item) {
        styleInfo[item] = parseFloat(style[item].replace('px', ''));
      });
      var top = rect.top,
          left = rect.left,
          width = rect.width,
          height = rect.height;
      this.setDomStyle(this._dom, {
        backgroundColor: 'transparent',
        borderColor: this.formatConfigColorRgba(config, 'marginColor'),
        borderWidth: [styleInfo.marginTop, styleInfo.marginRight, styleInfo.marginBottom, styleInfo.marginLeft].join('px ') + 'px',
        top: top - styleInfo.marginTop,
        left: left - styleInfo.marginLeft,
        width: width,
        height: height
      });
      this.setDomStyle(this._borderDom, {
        backgroundColor: 'transparent',
        borderColor: this.formatConfigColorRgba(config, 'borderColor'),
        borderWidth: [styleInfo.borderTopWidth, styleInfo.borderRightWidth, styleInfo.borderBottomWidth, styleInfo.borderLeftWidth].join('px ') + 'px',
        top: top,
        left: left,
        width: width - styleInfo.borderLeftWidth - styleInfo.borderRightWidth,
        height: height - styleInfo.borderTopWidth - styleInfo.borderBottomWidth
      });
      this.setDomStyle(this._sizeDom, {
        backgroundColor: this.formatConfigColorRgba(config, 'contentColor'),
        borderColor: this.formatConfigColorRgba(config, 'paddingColor'),
        borderWidth: [styleInfo.paddingTop, styleInfo.paddingRight, styleInfo.paddingBottom, styleInfo.paddingLeft].join('px ') + 'px',
        top: top + styleInfo.paddingTop,
        left: left + styleInfo.paddingLeft,
        width: width - styleInfo.borderLeftWidth - styleInfo.borderRightWidth - styleInfo.paddingLeft - styleInfo.paddingRight,
        height: height - styleInfo.borderTopWidth - styleInfo.borderBottomWidth - styleInfo.paddingTop - styleInfo.paddingBottom
      });
      this._target = target;
      this.setTips({
        top: top - styleInfo.marginTop,
        left: left - styleInfo.marginLeft,
        width: width + styleInfo.marginLeft + styleInfo.marginRight,
        height: height + styleInfo.marginTop + styleInfo.marginBottom,
        contentWidth: width,
        contentHeight: height
      });
      document.body.appendChild(this._dom);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this._dom && this._dom.parentElement) {
        this._dom.parentElement.removeChild(this._dom);
      }

      if (this._inspectTipsContainer && this._inspectTipsContainer.parentElement) {
        this._inspectTipsContainer.parentElement.removeChild(this._inspectTipsContainer);
      }

      this._target = null;
    }
  }, {
    key: "dom",
    value: function dom() {
      return this._dom;
    }
  }, {
    key: "contain",
    value: function contain(dom) {
      return dom === this._dom || dom === this._sizeDom || dom === this._borderDom || dom === this._inspectTipsContainer || dom === this._inspectTipsSep || dom === this._selectorTips || dom === this._arrowTips || dom === this._sizeTips;
    }
  }]);
  return HighLight;
}();

module.exports = HighLight;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(11));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

var inspectArrowHeight = 4;
var uiInspectPoptips = "\n  display: flex;\n  position: fixed;\n  padding: 4px 10px;\n  font-size: 12px;\n  color: #d9d9d9;\n  background-color: #34373f;\n  z-index: 8000;\n  border-radius: 2px;\n  cursor: default;\n  border: 1px solid #7f7f7f;\n  box-sizing: border-box;\n";
var uiInspectPoptipsSep = "\n  display: inline-block;\n  align-self: center;\n  height: 100%;\n  vertical-align: middle;\n  width: 1px;\n  height: 18px;\n  background-color: #7f7f7f;\n  margin: 0 8px;\n";
var uiInspectPoptipsArrowBottomLeft = "\n  bottom: 100%;\n  margin-bottom: -4px;\n  transform: rotate(225deg) skewX(5deg) skewY(5deg);\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  width: 8px;\n  height: 8px;\n  border-radius: 0 0 2px 0;\n  background: linear-gradient(-45deg,#34373f 50%,transparent 0);\n";
var uiInspectPoptipsArrowTopLeft = "\n  top: 100%;\n  margin-top: -4px;\n  transform: rotate(45deg) skewX(5deg) skewY(5deg);\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  width: 8px;\n  height: 8px;\n  border-radius: 0 0 2px 0;\n  background: linear-gradient(-45deg,#34373f 50%,transparent 0);\n  bottom: 100%;\n  margin-bottom: -4px;\n";
var uiInspectPoptipsArrowBottomRight = "\n  bottom: 100%;\n  margin-bottom: -4px;\n  transform: rotate(225deg) skewX(5deg) skewY(5deg);\n  content: \"\";\n  position: absolute;\n  right: 10px;\n  width: 8px;\n  height: 8px;\n  border-radius: 0 0 2px 0;\n  background: linear-gradient(-45deg,#34373f 50%,transparent 0);\n";
var uiInspectPoptipsArrowTopRight = "\n  top: 100%;\n  margin-top: -4px;\n  transform: rotate(45deg) skewX(5deg) skewY(5deg);\n  content: \"\";\n  position: absolute;\n  right: 10px;\n  width: 8px;\n  height: 8px;\n  border-radius: 0 0 2px 0;\n  background: linear-gradient(-45deg,#34373f 50%,transparent 0);\n  bottom: 100%;\n  margin-bottom: -4px;\n";

var getViewId = function () {
  var viewId = 900000;
  return function () {
    return viewId++;
  };
}();

var toHex = function toHex(val) {
  return ('0' + parseInt(val, 10).toString(16)).slice(-2);
};

var CoverView =
/*#__PURE__*/
function () {
  function CoverView(parentId) {
    (0, _classCallCheck2.default)(this, CoverView);
    this.viewId = getViewId();
    wx.invoke('insertTextView', {
      parentId: parentId,
      viewId: this.viewId,
      transEvt: true,
      position: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    });
  }

  (0, _createClass2.default)(CoverView, [{
    key: "update",
    value: function update() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      wx.invoke('updateTextView', {
        viewId: this.viewId,
        position: options.position,
        style: options.style
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      wx.invoke('updateTextView', {
        viewId: this.viewId,
        position: {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      wx.invoke('removeTextView', {
        viewId: this.viewId
      });
    }
  }]);
  return CoverView;
}();

var HighLight =
/*#__PURE__*/
function () {
  function HighLight() {
    (0, _classCallCheck2.default)(this, HighLight);
    this._inited = false;
    this._domInited = false;
    this._dom = null;
    this._borderDom = null;
    this._paddingDom = null;
    this._sizeDom = null;
    this._target = null;
  }

  (0, _createClass2.default)(HighLight, [{
    key: "init",
    value: function init() {
      this.initDOM();
      this._inspectTipsContainer = document.createElement('div');
      this._tagContainer = document.createElement('p');
      this._tagNameTips = document.createElement('span');
      this._idTips = document.createElement('span');
      this._classTips = document.createElement('span');
      this._inspectTipsSep = document.createElement('span');
      this._sizeTips = document.createElement('span');
      this._arrowTips = document.createElement('i');

      this._inspectTipsContainer.setAttribute('style', uiInspectPoptips);

      this._tagContainer.setAttribute('style', 'margin: auto; word-break: break-all; flex-shrink: 2;');

      this._tagNameTips.setAttribute('style', 'color:#df80e1;');

      this._idTips.setAttribute('style', 'color: #f3ae71;');

      this._classTips.setAttribute('style', 'color: #98cbef;');

      this._inspectTipsSep.setAttribute('style', uiInspectPoptipsSep);

      this._sizeTips.setAttribute('style', 'color: white; font-size: 11px; white-space: nowrap; align-self: center;');

      this._arrowTips.setAttribute('style', uiInspectPoptipsArrowTopLeft);

      this._tagContainer.appendChild(this._tagNameTips);

      this._tagContainer.appendChild(this._idTips);

      this._tagContainer.appendChild(this._classTips);

      this._inspectTipsContainer.appendChild(this._tagContainer);

      this._inspectTipsContainer.appendChild(this._inspectTipsSep);

      this._inspectTipsContainer.appendChild(this._sizeTips);

      this._inspectTipsContainer.appendChild(this._arrowTips);

      this._inited = true;
    }
  }, {
    key: "initDOM",
    value: function initDOM() {
      this._dom = new CoverView(0);
      this._borderDom = new CoverView(this._dom.viewId);
      this._paddingDom = new CoverView(this._borderDom.viewId);
      this._sizeDom = new CoverView(this._paddingDom.viewId);
      this._domInited = true;
    }
  }, {
    key: "destroyDOM",
    value: function destroyDOM() {
      if (!this._dom) {
        return;
      }

      this._dom.destroy();

      this._dom = this._borderDom = this._paddingDom = this._sizeDom = null;
      this._domInited = false;
    }
  }, {
    key: "pruneNum",
    value: function pruneNum(num) {
      var numStr = num.toFixed(2);
      var regExp = /\.?(0{1,})$/i;
      return numStr.replace(regExp, '');
    }
  }, {
    key: "setTips",
    value: function setTips(rect) {
      var _this = this;

      var top = rect.top,
          left = rect.left,
          width = rect.width,
          height = rect.height,
          contentWidth = rect.contentWidth,
          contentHeight = rect.contentHeight;

      var tagName = this._target.tagName.replace(/^WX-/, '').toLowerCase();

      if (tagName === 'body') {
        tagName = 'page';
      }

      this._tagNameTips.innerText = tagName;
      this._idTips.innerText = this._target.id ? "#" + this._target.id : '';
      var classList = Array.prototype.join.call(this._target.classList, '.');
      this._classTips.innerText = classList ? "." + classList : '';
      this._sizeTips.innerText = this.pruneNum(contentWidth) + " x " + this.pruneNum(contentHeight);
      var maxWidth = window.innerWidth - 100;
      this._inspectTipsContainer.style.maxWidth = maxWidth + "px";
      this._inspectTipsContainer.style.minWidth = 120 + "px";
      var totalTagLength = this._tagNameTips.innerText.length + this._idTips.innerText.length + this._classTips.innerText.length;
      var computedWidth = 20 + totalTagLength * 6.2 + 16 + 1 + this._sizeTips.innerText.length * 6;
      this._inspectTipsContainer.style.width = computedWidth + 'px';
      document.body.appendChild(this._inspectTipsContainer);

      var tipsRect = this._inspectTipsContainer.getBoundingClientRect();

      var inspectHeight = tipsRect.height;
      var isRight = left + Math.min(maxWidth, computedWidth) > window.innerWidth;

      var adjustCss = function adjustCss(isTop) {
        if (isRight) {
          _this._arrowTips.setAttribute('style', isTop ? uiInspectPoptipsArrowTopRight : uiInspectPoptipsArrowBottomRight);

          var originalLeft = width + left - Math.min(maxWidth, computedWidth);
          _this._inspectTipsContainer.style.left = Math.max(0, originalLeft) + 'px';

          if (originalLeft < 0) {
            _this._inspectTipsContainer.style.width = Math.min(maxWidth, computedWidth) + originalLeft + 'px';
          }
        } else {
          _this._arrowTips.setAttribute('style', isTop ? uiInspectPoptipsArrowTopLeft : uiInspectPoptipsArrowBottomLeft);

          _this._inspectTipsContainer.style.left = left + 'px';
        }
      };

      var bottom = window.innerHeight - top - height;

      if (top > bottom) {
        adjustCss(true);
        var tipsTop = top - inspectHeight - inspectArrowHeight;
        this._inspectTipsContainer.style.top = (tipsTop > 0 ? tipsTop : 0) + "px";
      } else {
        adjustCss(false);

        var _tipsTop = top + height + inspectArrowHeight;

        this._inspectTipsContainer.style.top = (_tipsTop + inspectHeight < window.innerHeight ? _tipsTop : window.innerHeight - inspectHeight) + "px";
      }
    }
  }, {
    key: "formatConfigColorRgba",
    value: function formatConfigColorRgba(config, item) {
      var _config$item = config[item],
          r = _config$item.r,
          g = _config$item.g,
          b = _config$item.b,
          a = _config$item.a;
      return {
        bgColor: "#" + toHex(r) + toHex(g) + toHex(b),
        opacity: a
      };
    }
  }, {
    key: "show",
    value: function show(target, config) {
      if (target === this._target) {
        return;
      }

      if (!this._inited) {
        this.init();
      }

      if (!this._domInited) {
        this.initDOM();
      }

      var rect = target.getBoundingClientRect();
      var style = window.getComputedStyle(target);
      var styleInfo = {};
      ['width', 'height', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'].forEach(function (item) {
        styleInfo[item] = parseFloat(style[item].replace('px', ''));
      });
      var top = rect.top,
          left = rect.left,
          width = rect.width,
          height = rect.height;

      this._dom.update({
        style: (0, _objectSpread2.default)({}, this.formatConfigColorRgba(config, 'marginColor'), {
          fixed: true
        }),
        position: {
          top: top - styleInfo.marginTop + window.scrollY,
          left: left - styleInfo.marginLeft + window.scrollX,
          width: width + styleInfo.marginLeft + styleInfo.marginRight,
          height: height + styleInfo.marginTop + styleInfo.marginBottom
        }
      });

      this._borderDom.update({
        style: (0, _objectSpread2.default)({}, this.formatConfigColorRgba(config, 'borderColor'), {
          fixed: true
        }),
        position: {
          top: top + window.scrollY,
          left: left + window.scrollX,
          width: width,
          height: height
        }
      });

      this._paddingDom.update({
        style: (0, _objectSpread2.default)({}, this.formatConfigColorRgba(config, 'paddingColor'), {
          fixed: true
        }),
        position: {
          top: top + styleInfo.borderTopWidth + window.scrollY,
          left: left + styleInfo.borderLeftWidth + window.scrollX,
          width: width - styleInfo.borderLeftWidth - styleInfo.borderRightWidth,
          height: height - styleInfo.borderTopWidth - styleInfo.borderBottomWidth
        }
      });

      this._sizeDom.update({
        style: (0, _objectSpread2.default)({}, this.formatConfigColorRgba(config, 'contentColor'), {
          fixed: false
        }),
        position: {
          top: top + styleInfo.borderTopWidth + styleInfo.paddingTop + window.scrollY,
          left: left + styleInfo.borderLeftWidth + styleInfo.paddingLeft + window.scrollX,
          width: width - styleInfo.borderLeftWidth - styleInfo.borderRightWidth - styleInfo.paddingLeft - styleInfo.paddingRight,
          height: height - styleInfo.borderTopWidth - styleInfo.borderBottomWidth - styleInfo.paddingTop - styleInfo.paddingBottom
        }
      });

      this._target = target;
      this.setTips({
        top: top - styleInfo.marginTop,
        left: left - styleInfo.marginLeft,
        width: width + styleInfo.marginLeft + styleInfo.marginRight,
        height: height + styleInfo.marginTop + styleInfo.marginBottom,
        contentWidth: width,
        contentHeight: height
      });
      document.body.appendChild(this._dom);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.destroyDOM();

      if (this._inspectTipsContainer && this._inspectTipsContainer.parentElement) {
        this._inspectTipsContainer.parentElement.removeChild(this._inspectTipsContainer);
      }

      this._target = null;
    }
  }, {
    key: "dom",
    value: function dom() {
      return this._dom;
    }
  }, {
    key: "contain",
    value: function contain(dom) {
      return dom === this._dom || dom === this._sizeDom || dom === this._borderDom || dom === this._inspectTipsContainer || dom === this._inspectTipsSep || dom === this._selectorTips || dom === this._arrowTips || dom === this._sizeTips;
    }
  }]);
  return HighLight;
}();

module.exports = HighLight;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(12);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(14));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

var cssParse = __webpack_require__(18);

var nodeManager = __webpack_require__(6);

var StyleSheets =
/*#__PURE__*/
function () {
  function StyleSheets() {
    (0, _classCallCheck2.default)(this, StyleSheets);
  }

  (0, _createClass2.default)(StyleSheets, [{
    key: "constuctor",
    value: function constuctor() {
      this._styleSheets;
    }
  }, {
    key: "init",
    value: function init() {
      this._styleSheets = {};
      var styles = document.querySelectorAll('style');

      for (var i = 0, len = styles.length; i < len; i++) {
        var innerText = styles[i].innerText;

        try {
          this._styleSheets["style_" + i] = cssParse(innerText, {
            silent: true
          });
        } catch (e) {}
      }
    }
  }, {
    key: "getMatchedCSSRules",
    value: function getMatchedCSSRules(styleSheetId, matches, rules) {
      var matchedCSSRules = [];

      for (var r in rules) {
        var rule = rules[r];

        if (rule.type === 'media') {
          matchedCSSRules = matchedCSSRules.concat(this.getMatchedCSSRules(styleSheetId, matches, rule.rules));
        }

        for (var s in rule.selectors) {
          var selector = rule.selectors[s];
          var flag = false;

          try {
            flag = matches(selector);
          } catch (e) {
            continue;
          }

          if (!flag) continue;
          var matchRule = {
            style: {
              cssProperties: [],
              range: rule.position
            },
            selectorList: {
              text: selector
            },
            styleSheetId: styleSheetId
          };
          var media = rule.parent.media;

          if (media) {
            matchRule.media = media;
          }

          for (var propsIndex = 0, propsLen = rule.declarations.length; propsIndex < propsLen; propsIndex++) {
            var property = rule.declarations[propsIndex];

            if (property.type == 'comment') {
              var comment = property.comment.replace(/;$/, '').trim();

              var _comment$split = comment.split(':'),
                  _comment$split2 = (0, _slicedToArray2.default)(_comment$split, 2),
                  name = _comment$split2[0],
                  value = _comment$split2[1];

              name = name && name.trim() || '';
              value = value && value.trim() || '';
              matchRule.style.cssProperties.push({
                disabled: true,
                text: "/*" + comment + "*/",
                range: property.position,
                name: name,
                value: value
              });
              continue;
            }

            matchRule.style.cssProperties.push({
              disabled: false,
              name: property.property,
              value: property.value,
              range: property.position
            });
          }

          matchedCSSRules.push({
            rule: matchRule
          });
        }
      }

      return matchedCSSRules;
    }
  }, {
    key: "getMatchedStylesForNode",
    value: function getMatchedStylesForNode(target) {
      var matches = target.matches || target.webkitMatchesSelector;
      matches = matches.bind(target);

      if (!this._styleSheets) {
        this.init();
      }

      var matchedCSSRules = [];

      for (var styleSheetId in this._styleSheets) {
        var rules = this._styleSheets[styleSheetId].stylesheet.rules;
        matchedCSSRules = matchedCSSRules.concat(this.getMatchedCSSRules(styleSheetId, matches, rules));
      }

      return matchedCSSRules.filter(function (rule) {
        if (rule.rule.media) {
          return window.matchMedia(rule.rule.media).matches;
        }

        return true;
      });
    }
  }, {
    key: "update",
    value: function update(styleSheetId, styleSheet) {
      if (this._styleSheets) {
        this._styleSheets[styleSheetId] = styleSheet;
      }
    }
  }, {
    key: "getInlineStyle",
    value: function getInlineStyle(target) {
      var nodeId = nodeManager.getNodeId(target);
      var styleText = target.getAttribute('style') || '';
      var inlineStyleSheets = cssParse("element.style{" + styleText + "}");
      var rule = inlineStyleSheets.stylesheet.rules[0];
      var inlineStyle = {
        cssProperties: [],
        styleSheetId: "node_" + nodeId,
        range: rule.position
      };

      for (var propsIndex = 0, propsLen = rule.declarations.length; propsIndex < propsLen; propsIndex++) {
        var property = rule.declarations[propsIndex];

        if (property.type === 'comment') {
          var comment = property.comment.replace(/;$/, '').trim();

          var _comment$split3 = comment.split(':'),
              _comment$split4 = (0, _slicedToArray2.default)(_comment$split3, 2),
              name = _comment$split4[0],
              value = _comment$split4[1];

          name = name.trim();
          value = value.trim();
          inlineStyle.cssProperties.push({
            disabled: true,
            text: "/*" + comment + "*/",
            range: property.position,
            name: name,
            value: value
          });
          continue;
        }

        inlineStyle.cssProperties.push({
          disabled: false,
          name: property.property,
          value: property.value,
          range: property.position
        });
      }

      return inlineStyle;
    }
  }, {
    key: "setStyleTexts",
    value: function setStyleTexts(edit) {
      try {
        var nodeRegx = /^node_(\w+)$/;
        var styleRegx = /^style_(\w+)$/;
        var match = edit.styleSheetId.match(nodeRegx);

        if (match) {
          var nodeId = match[1];
          var target = nodeManager.getDOMByNodeId(nodeId);

          if (target) {
            target.setAttribute('style', edit.text);
          }
        }

        match = edit.styleSheetId.match(styleRegx);

        if (match) {
          var index = match[1];
          var style = document.querySelectorAll('style')[index];

          if (style) {
            var originText = style.innerText;
            var innerText = originText.split('\n');
            var targetText = [];
            var _edit$range = edit.range,
                startLine = _edit$range.startLine,
                endLine = _edit$range.endLine,
                endColumn = _edit$range.endColumn;
            var startColumn = edit.range.startColumn;

            for (var i = startLine; i <= endLine; i++) {
              var _text = innerText[i];

              if (i < endLine) {
                targetText.push(_text.substr(startColumn, _text.length - startColumn));
                startColumn = 0;
              } else {
                targetText.push(_text.substr(startColumn, endColumn - startColumn));
              }
            }

            targetText = targetText.join('\n');
            var css = cssParse(targetText);
            var replaceText = [];
            var rule = css.stylesheet.rules[0];
            replaceText.push(rule.selectors.join(' '));
            replaceText.push('{');
            replaceText.push(edit.text);
            replaceText.push('}');
            originText = originText.replace(targetText, replaceText.join(''));
            var styleSheet = cssParse(originText);
            this.update(edit.styleSheetId, styleSheet);
            var text = document.createTextNode(originText);

            while (style.childNodes.length > 0) {
              style.removeChild(style.childNodes[0]);
            }

            style.appendChild(text);
          }
        }
      } catch (e) {}
    }
  }]);
  return StyleSheets;
}();

module.exports = StyleSheets;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(15);

var iterableToArrayLimit = __webpack_require__(16);

var nonIterableRest = __webpack_require__(17);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _typeof2 = _interopRequireDefault(__webpack_require__(19));

var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

module.exports = function (css, options) {
  options = options || {};
  var lineno = 1;
  var column = 1;

  function updatePosition(str) {
    var lines = str.match(/\n/g);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf('\n');
    column = ~i ? str.length - i : column + str.length;
  }

  function position() {
    var start = {
      line: lineno,
      column: column
    };
    return function (node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }

  function Position(start) {
    this.startColumn = start.column - 1;
    this.startLine = start.line - 1;
    this.endColumn = column - 1;
    this.endLine = lineno - 1;
    this.source = options.source;
  }

  Position.prototype.content = css;
  var errorsList = [];

  function error(msg) {
    var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = css;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }

  function stylesheet() {
    var rulesList = rules();
    return {
      type: 'stylesheet',
      stylesheet: {
        rules: rulesList,
        parsingErrors: errorsList
      }
    };
  }

  function open() {
    return match(/^{\s*/);
  }

  function close() {
    return match(/^}/);
  }

  function rules() {
    var node;
    var rules = [];
    whitespace();
    comments(rules);

    while (css.length && css.charAt(0) != '}' && (node = atrule() || rule())) {
      if (node !== false) {
        rules.push(node);
        comments(rules);
      }
    }

    return rules;
  }

  function match(re) {
    var m = re.exec(css);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  }

  function whitespace() {
    match(/^\s*/);
  }

  function comments(rules) {
    var c;
    rules = rules || [];

    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }

    return rules;
  }

  function comment() {
    var pos = position();
    if (css.charAt(0) != '/' || css.charAt(1) != '*') return;
    var i = 2;

    while (css.charAt(i) != '' && (css.charAt(i) != '*' || css.charAt(i + 1) != '/')) {
      ++i;
    }

    i += 2;

    if (css.charAt(i - 1) === '') {
      return error('End of comment missing');
    }

    var str = css.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    css = css.slice(i);
    column += 2;
    return pos({
      type: 'comment',
      comment: str
    });
  }

  function selector() {
    var m = match(/^([^{]+)/);
    if (!m) return;
    return trim(m[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '').replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
      return m.replace(/,/g, "\u200C");
    }).split(/\s*(?![^(]*\)),\s*/).map(function (s) {
      return s.replace(/\u200C/g, ',');
    });
  }

  function declaration() {
    var pos = position();
    match(/^[;\s]*/);
    var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop) return;
    prop = trim(prop[0]);

    if (!match(/^:\s*/)) {}

    var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
    var ret = pos({
      type: 'declaration',
      property: prop.replace(commentre, ''),
      value: val ? trim(val[0]).replace(commentre, '') : ''
    });
    match(/^[;\s]*/);
    return ret;
  }

  function declarations() {
    var decls = [];
    if (!open()) return error("missing '{'");
    comments(decls);
    var decl;

    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    if (!close()) return error("missing '}'");
    return decls;
  }

  function keyframe() {
    var m;
    var vals = [];
    var pos = position();

    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      vals.push(m[1]);
      match(/^,\s*/);
    }

    if (!vals.length) return;
    return pos({
      type: 'keyframe',
      values: vals,
      declarations: declarations()
    });
  }

  function atkeyframes() {
    var pos = position();
    var m = match(/^@([-\w]+)?keyframes\s*/);
    if (!m) return;
    var vendor = m[1];
    comments();
    var m = match(/^([-\w]+)\s*/);
    if (!m) return error('@keyframes missing name');
    var name = m[1];
    comments();
    if (!open()) return error("@keyframes missing '{'");
    var frame;
    var frames = comments();

    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }

    if (!close()) return error("@keyframes missing '}'");
    return pos({
      type: 'keyframes',
      name: name,
      vendor: vendor,
      keyframes: frames
    });
  }

  function atsupports() {
    var pos = position();
    var m = match(/^@supports *([^{]+)/);
    if (!m) return;
    var supports = trim(m[1]);
    if (!open()) return error("@supports missing '{'");
    var style = comments().concat(rules());
    if (!close()) return error("@supports missing '}'");
    return pos({
      type: 'supports',
      supports: supports,
      rules: style
    });
  }

  function athost() {
    var pos = position();
    var m = match(/^@host\s*/);
    if (!m) return;
    if (!open()) return error("@host missing '{'");
    var style = comments().concat(rules());
    if (!close()) return error("@host missing '}'");
    return pos({
      type: 'host',
      rules: style
    });
  }

  function atmedia() {
    var pos = position();
    var m = match(/^@media *([^{]+)/);
    if (!m) return;
    var media = trim(m[1]);
    if (!open()) return error("@media missing '{'");
    var style = comments().concat(rules());
    if (!close()) return error("@media missing '}'");
    return pos({
      type: 'media',
      media: media,
      rules: style
    });
  }

  function atcustommedia() {
    var pos = position();
    var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (!m) return;
    return pos({
      type: 'custom-media',
      name: trim(m[1]),
      media: trim(m[2])
    });
  }

  function atpage() {
    var pos = position();
    var m = match(/^@page */);
    if (!m) return;
    var sel = selector() || [];
    if (!open()) return error("@page missing '{'");
    var decls = comments();
    var decl;

    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@page missing '}'");
    return pos({
      type: 'page',
      selectors: sel,
      declarations: decls
    });
  }

  function atdocument() {
    var pos = position();
    var m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m) return;
    var vendor = trim(m[1]);
    var doc = trim(m[2]);
    if (!open()) return error("@document missing '{'");
    var style = comments().concat(rules());
    if (!close()) return error("@document missing '}'");
    return pos({
      type: 'document',
      document: doc,
      vendor: vendor,
      rules: style
    });
  }

  function atfontface() {
    var pos = position();
    var m = match(/^@font-face\s*/);
    if (!m) return;
    if (!open()) return error("@font-face missing '{'");
    var decls = comments();
    var decl;

    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@font-face missing '}'");
    return pos({
      type: 'font-face',
      declarations: decls
    });
  }

  var atimport = _compileAtrule('import');

  var atcharset = _compileAtrule('charset');

  var atnamespace = _compileAtrule('namespace');

  function _compileAtrule(name) {
    var re = new RegExp('^@' + name + '\\s*([^;]+);');
    return function () {
      var pos = position();
      var m = match(re);
      if (!m) return;
      var ret = {
        type: name
      };
      ret[name] = m[1].trim();
      return pos(ret);
    };
  }

  function atrule() {
    if (css[0] != '@') return;
    return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface();
  }

  function rule() {
    var pos = position();
    var sel = selector();

    if (!sel) {
      sel = '';
    }

    comments();
    return pos({
      type: 'rule',
      selectors: sel,
      declarations: declarations()
    });
  }

  return addParent(stylesheet());
};

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/g, '') : '';
}

function addParent(obj, parent) {
  var isNode = obj && typeof obj.type === 'string';
  var childParent = isNode ? obj : parent;

  for (var k in obj) {
    var value = obj[k];

    if (Array.isArray(value)) {
      value.forEach(function (v) {
        addParent(v, childParent);
      });
    } else if (value && (0, _typeof2.default)(value) === 'object') {
      addParent(value, childParent);
    }
  }

  if (isNode) {
    Object.defineProperty(obj, 'parent', {
      configurable: true,
      writable: true,
      enumerable: false,
      value: parent || null
    });
  }

  return obj;
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __callback;

var __observer = new MutationObserver(function (mutations) {
  __callback && __callback(mutations);
});

var observer = function observer(target, cb) {
  __callback = cb;

  __observer.disconnect();

  __observer.observe(target, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });
};

module.exports = {
  observer: observer
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    IsDevtools = _require.IsDevtools;

module.exports = IsDevtools ? __webpack_require__(22) : __webpack_require__(25);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

var _require = __webpack_require__(23),
    isValidNode = _require.isValidNode;

var nodeManager = __webpack_require__(6);

var config = __webpack_require__(24);

var HIGHLIGHT_INSTANCE = 100;

var Inspect =
/*#__PURE__*/
function () {
  function Inspect() {
    (0, _classCallCheck2.default)(this, Inspect);
    this._highlight = null;
    this._lastHighLightTarget = null;
    this._highlightTimer = null;
    this._pointerEventsTimer = null;

    this._eventTrigger = function () {};

    this._inspectMouseMove = this.inspectMouseMove.bind(this);
    this._inspectClick = this.inspectClick.bind(this);
    this._onMouseDown = this.onMouseDown.bind(this);
  }

  (0, _createClass2.default)(Inspect, [{
    key: "init",
    value: function init(highlight, eventTrigger) {
      this._highlight = highlight;
      this._eventTrigger = eventTrigger;
    }
  }, {
    key: "setInspectMode",
    value: function setInspectMode(commandParams) {
      if (commandParams.mode === 'none') {
        document.removeEventListener('mousemove', this._inspectMouseMove);
        document.removeEventListener('click', this._inspectClick);
        document.removeEventListener('mousedown', this._onMouseDown);
      } else if (commandParams.mode === 'searchForNode') {
        document.addEventListener('mousemove', this._inspectMouseMove);
        document.addEventListener('click', this._inspectClick);
        document.addEventListener('mousedown', this._onMouseDown);
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      document.dispatchEvent(new CustomEvent('touchcancel'));
    }
  }, {
    key: "inspectClick",
    value: function inspectClick(event) {
      var target = event.target;

      while (target && !isValidNode(target)) {
        target = target.parentElement;
      }

      if (!target) {
        return;
      }

      if (target === this._lastHighLightTarget) {
        var nodeId = nodeManager.getNodeId(target);

        this._eventTrigger('Overlay.inspectNodeRequested', {
          backendNodeId: nodeId
        });
      }
    }
  }, {
    key: "inspectMouseMove",
    value: function inspectMouseMove(event) {
      var _this = this;

      var target = event.target;

      if (!target || target === document || target === this._lastHighLightTarget) {
        return;
      }

      while (target && !isValidNode(target)) {
        target = target.parentElement;
      }

      if (!target) {
        return;
      }

      var nodeId = nodeManager.getNodeId(target);

      if (this._highlightTimer) {
        clearTimeout(this._highlightTimer);
        this._highlightTimer = null;
      }

      this._highlightTimer = setTimeout(function () {
        _this._eventTrigger('Overlay.nodeHighlightRequested', {
          nodeId: nodeId
        });

        _this._highlight.show(target, config.highlightConfig);

        _this._lastHighLightTarget = target;
      }, HIGHLIGHT_INSTANCE);
    }
  }]);
  return Inspect;
}();

module.exports = new Inspect();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValidNode = function isValidNode(dom) {
  if (dom.nodeType === 3) {
    return true;
  }

  var localName = dom.localName;

  if (localName === 'wx-content') {
    return false;
  }

  if (localName === 'body') {
    return true;
  }

  if (/^wx-/.test(localName)) {
    return true;
  }

  if (dom.attributes && dom.attributes.length > 0) {
    for (var attrIndex = 0, attrLen = dom.attributes.length; attrIndex < attrLen; attrIndex++) {
      var attr = dom.attributes[attrIndex];

      if (attr.name === 'exparser:info-custom-component') {
        return true;
      }
    }
  }

  return false;
};

module.exports = {
  isValidNode: isValidNode
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var highlightConfig = {
  showInfo: true,
  contentColor: {
    r: 111,
    g: 168,
    b: 220,
    a: 0.66
  },
  paddingColor: {
    r: 147,
    g: 196,
    b: 125,
    a: 0.55
  },
  borderColor: {
    r: 255,
    g: 229,
    b: 153,
    a: 0.66
  },
  marginColor: {
    r: 246,
    g: 178,
    b: 107,
    a: 0.5
  },
  eventTargetColor: {
    r: 255,
    g: 196,
    b: 196,
    a: 0.66
  },
  shapeColor: {
    r: 96,
    g: 82,
    b: 177,
    a: 0.8
  },
  shapeMarginColor: {
    r: 96,
    g: 82,
    b: 127,
    a: 0.6
  }
};
module.exports = {
  highlightConfig: highlightConfig
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(3);

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

var _require = __webpack_require__(23),
    isValidNode = _require.isValidNode;

var nodeManager = __webpack_require__(6);

var config = __webpack_require__(24);

var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {}

var Inspect =
/*#__PURE__*/
function () {
  function Inspect() {
    (0, _classCallCheck2.default)(this, Inspect);
    this._highlight = null;
    this._lastHighLightTarget = null;
    this._highlightTimer = null;
    this._pointerEventsTimer = null;

    this._eventTrigger = function () {};

    this._inspectTouchStart = this.inspectTouchStart.bind(this);
    this._couldHighLight = true;
  }

  (0, _createClass2.default)(Inspect, [{
    key: "init",
    value: function init(highlight, eventTrigger) {
      this._highlight = highlight;
      this._eventTrigger = eventTrigger;
    }
  }, {
    key: "setInspectMode",
    value: function setInspectMode(commandParams) {
      if (commandParams.mode === 'none') {
        document.removeEventListener('touchstart', this._inspectTouchStart, supportsPassive ? {
          passive: false
        } : false);
      } else if (commandParams.mode === 'searchForNode') {
        document.addEventListener('touchstart', this._inspectTouchStart, supportsPassive ? {
          passive: false
        } : false);
      }
    }
  }, {
    key: "inspectTouchStart",
    value: function inspectTouchStart(event) {
      document.dispatchEvent(new CustomEvent('touchcancel'));
      var target = event.target;

      if (!target || target === document) {
        return;
      }

      while (target && !isValidNode(target)) {
        target = target.parentElement;
      }

      if (!target) {
        return;
      }

      this.doHighLight(target);
    }
  }, {
    key: "doHighLight",
    value: function doHighLight(target) {
      var nodeId = nodeManager.getNodeId(target);

      if (this._lastHighLightTarget === target) {
        this._eventTrigger('Overlay.inspectNodeRequested', {
          backendNodeId: nodeId
        });

        this._lastHighLightTarget = null;
      } else {
        this._eventTrigger('Overlay.nodeHighlightRequested', {
          nodeId: nodeId
        });

        this._highlight.show(target, config.highlightConfig);

        this._lastHighLightTarget = target;
      }
    }
  }]);
  return Inspect;
}();

module.exports = new Inspect();

/***/ })
/******/ ]);
var WARemoteDebugVersion='2019.4.29 16:23';