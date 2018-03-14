(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"), require("react-bootstrap"));
	else if(typeof define === 'function' && define.amd)
		define("react-hierarchy-selector", ["react", "prop-types", "react-bootstrap"], factory);
	else if(typeof exports === 'object')
		exports["react-hierarchy-selector"] = factory(require("react"), require("prop-types"), require("react-bootstrap"));
	else
		root["react-hierarchy-selector"] = factory(root["React"], root["PropTypes"], root[undefined]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react_bootstrap__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@opuscapita/react-spinner/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = undefined;

var _spinner = __webpack_require__("../node_modules/@opuscapita/react-spinner/lib/spinner.component.js");

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Spinner = _spinner2.default;

/***/ }),

/***/ "../node_modules/@opuscapita/react-spinner/lib/spinner.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _spin = __webpack_require__("../node_modules/spin.js/spin.js");

var _spin2 = _interopRequireDefault(_spin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Based on from https://github.com/qimingweng/react-spinjs */
/* eslint-disable react/forbid-prop-types */


var Spinner = function (_React$PureComponent) {
  _inherits(Spinner, _React$PureComponent);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
  }

  _createClass(Spinner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.setTimeout(function () {
        _this2.spinner = new _spin2.default(_this2.props.config);
        _this2.spinner.spin(_this2.container);
      }, this.props.delay);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.spinner) {
        this.spinner.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('span', { ref: function ref(el) {
          _this3.container = el;
        } });
    }
  }]);

  return Spinner;
}(_react2.default.PureComponent);

Spinner.propTypes = {
  config: _propTypes2.default.object,
  delay: _propTypes2.default.number.isRequired
};
Spinner.defaultProps = {
  config: {
    color: '#FAC51D',
    width: 4
  },
  delay: 500 // eslint-disable-line
};
exports.default = Spinner;

/***/ }),

/***/ "../node_modules/classnames/index.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/badge/badge.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.badge.oc-hierarchy-selector-badge {\n  padding-top: 0;\n  padding-bottom: 0;\n  min-width: auto;\n  line-height: 2rem; }\n\n.badge.badge-orange {\n  background-color: #E66608; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/combo-box/combo-box.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.oc-hierarchy-selector-list-wrapper {\n  display: inline-block;\n  min-width: 25rem;\n  width: 100%;\n  margin: 0;\n  padding: 0; }\n\n.oc-hierarchy-selector-list {\n  display: flex;\n  width: 100%;\n  border: 1px solid #CCCCCC;\n  line-height: 2rem;\n  padding: 0.5rem;\n  overflow: hidden; }\n  .oc-hierarchy-selector-list input {\n    outline: none;\n    width: 100%;\n    min-width: 0;\n    line-height: 2rem;\n    margin: 0;\n    padding: 0 0.5rem;\n    border: none;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .oc-hierarchy-selector-list button:focus {\n    border: none;\n    box-shadow: none; }\n  .oc-hierarchy-selector-list .oc-hierarchy-selector-list-btn {\n    outline: none;\n    cursor: pointer;\n    box-sizing: content-box;\n    display: block;\n    float: right;\n    height: 2rem;\n    line-height: 2rem;\n    padding: 0 0.5rem;\n    background-color: #FFFFFF;\n    border: 0px solid transparent;\n    overflow: hidden;\n    color: #67707c; }\n    .oc-hierarchy-selector-list .oc-hierarchy-selector-list-btn:hover {\n      color: #EC6608; }\n  .oc-hierarchy-selector-list .spinner {\n    position: relative !important;\n    left: 0 !important;\n    width: 1.2rem !important; }\n    .oc-hierarchy-selector-list .spinner div {\n      width: 4px !important; }\n\n.hs-combo-box-tooltip p {\n  padding: 0;\n  margin: 0; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/popover/popover.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.oc-hierarchy-selector-popover {\n  outline: none;\n  position: absolute;\n  display: block;\n  width: auto;\n  min-width: 35rem;\n  max-width: 55rem;\n  min-height: 8rem;\n  height: 30rem;\n  margin-top: -1px;\n  padding: 0.5rem;\n  background-color: #FFFFFF;\n  border: 1px solid #CCCCCC;\n  z-index: 100; }\n  .oc-hierarchy-selector-popover hr {\n    margin-bottom: 1px;\n    margin-top: 1px;\n    border-top: 1px dashed #67707c; }\n  .oc-hierarchy-selector-popover .list-group {\n    border: none;\n    margin: 0; }\n    .oc-hierarchy-selector-popover .list-group.found-items {\n      margin-left: 2rem; }\n  .oc-hierarchy-selector-popover .list-group-item {\n    border: none;\n    padding: 1rem 0.3rem; }\n    .oc-hierarchy-selector-popover .list-group-item.found-group-item {\n      padding: 1rem 0.3rem 0 0.3rem; }\n      .oc-hierarchy-selector-popover .list-group-item.found-group-item span {\n        cursor: pointer; }\n      .oc-hierarchy-selector-popover .list-group-item.found-group-item svg {\n        width: 1.5rem;\n        align-content: left; }\n    .oc-hierarchy-selector-popover .list-group-item.found-item {\n      cursor: pointer;\n      padding: 0.3rem 0.3rem 0.3rem 2rem; }\n      .oc-hierarchy-selector-popover .list-group-item.found-item:focus {\n        outline: none;\n        background-color: #FECA1D; }\n      .oc-hierarchy-selector-popover .list-group-item.found-item:hover {\n        outline: none;\n        background-color: #FECA1D; }\n  .oc-hierarchy-selector-popover .list-group-header {\n    font-size: 1.4rem;\n    margin-top: 0.5rem;\n    padding: 0 0.3rem;\n    font-weight: 700; }\n  .oc-hierarchy-selector-popover .btn-open-view {\n    border: none;\n    background-color: transparent;\n    margin: 0;\n    padding: 0; }\n\n.oc-hierarchy-selector-popover-layout {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n  .oc-hierarchy-selector-popover-layout .message {\n    word-wrap: break-word;\n    margin: 0;\n    padding: 1rem 0.3rem; }\n    .oc-hierarchy-selector-popover-layout .message.warning {\n      color: #EC6608; }\n\n.oc-hierarchy-selector-popover-search-content {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  margin: 0.5rem 0;\n  padding: 0 0.5rem;\n  overflow-x: hidden;\n  overflow-y: auto; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/search-bar/search-bar.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.oc-hierarchy-selector-search-bar {\n  display: flex;\n  flex-shrink: 0;\n  outline: none;\n  width: 100%;\n  line-height: 3.2rem;\n  height: 3.2rem;\n  padding: 0;\n  background-color: #FFFFFF;\n  border: 1px solid #CCCCCC; }\n  .oc-hierarchy-selector-search-bar.focused {\n    border-color: #FECA1D;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(254, 202, 29, 0.6); }\n  .oc-hierarchy-selector-search-bar input {\n    outline: none;\n    font-size: 1.4rem;\n    width: 100%;\n    height: 3rem;\n    line-height: 3rem;\n    margin: 0;\n    padding: 0 0.5rem;\n    border: none; }\n    .oc-hierarchy-selector-search-bar input::-ms-clear {\n      display: none; }\n  .oc-hierarchy-selector-search-bar .search-component-icon {\n    display: flex;\n    flex-shrink: 0;\n    justify-content: center;\n    align-items: center;\n    width: 3rem;\n    height: 3rem;\n    line-height: 3rem;\n    margin: 0;\n    padding: 0;\n    border: none;\n    background-color: #67707c;\n    color: #FFFFFF; }\n    .oc-hierarchy-selector-search-bar .search-component-icon.clickable {\n      cursor: pointer; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/selectable-list/selectable-list.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.oc-selectable-list-wrapper {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #CCCCCC;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .oc-selectable-list-wrapper .oc-selectable-list-item {\n    cursor: pointer;\n    display: block;\n    position: relative;\n    width: 100%;\n    line-height: 3rem;\n    margin: 0;\n    padding: 0.5rem 1rem; }\n    .oc-selectable-list-wrapper .oc-selectable-list-item.selected {\n      background-color: #D3DADE; }\n    .oc-selectable-list-wrapper .oc-selectable-list-item .oc-selectable-list-item-container {\n      display: flex;\n      flex-direction: row;\n      width: 100%;\n      height: 100%; }\n      .oc-selectable-list-wrapper .oc-selectable-list-item .oc-selectable-list-item-container .oc-list-item-checkbox {\n        position: absolute;\n        width: 3rem;\n        height: calc(100% - 1rem);\n        text-align: left;\n        font-size: 1.6rem; }\n        .oc-selectable-list-wrapper .oc-selectable-list-item .oc-selectable-list-item-container .oc-list-item-checkbox i {\n          position: absolute;\n          top: 50%;\n          margin-top: -0.8rem;\n          overflow: hidden;\n          white-space: nowrap; }\n          .oc-selectable-list-wrapper .oc-selectable-list-item .oc-selectable-list-item-container .oc-list-item-checkbox i.disabled {\n            color: #CCCCCC; }\n      .oc-selectable-list-wrapper .oc-selectable-list-item .oc-selectable-list-item-container .oc-list-item-text-container {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n        padding: 0 0 0 3rem; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/column/column.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".oc-hierarchy-selector-column {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  border: none;\n  width: 30rem;\n  height: 100%; }\n  .oc-hierarchy-selector-column .checkbox {\n    margin: 0; }\n    .oc-hierarchy-selector-column .checkbox label {\n      height: 2rem;\n      line-height: 2rem; }\n    .oc-hierarchy-selector-column .checkbox input {\n      width: 1.5rem;\n      height: 2rem;\n      outline: none !important;\n      margin: 0 0 0 -2rem;\n      padding: 0;\n      background: #fff; }\n\n.oc-hierarchy-selector-column-all {\n  flex-shrink: 0;\n  height: 3rem;\n  line-height: 3rem;\n  width: 100%;\n  text-align: right; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/group-name/group-name.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.oc-hierarchy-selector-group-name-wrapper {\n  display: block;\n  width: 100%;\n  height: auto;\n  background-color: #FFFFFF;\n  padding: 0;\n  margin: 0 0 1.4rem 0; }\n  .oc-hierarchy-selector-group-name-wrapper input {\n    outline: none;\n    font-size: 1.4rem;\n    font-weight: 700;\n    width: 100%;\n    height: 3rem;\n    line-height: 3rem;\n    margin: 0;\n    padding: 0 0.5rem; }\n    .oc-hierarchy-selector-group-name-wrapper input:focus {\n      border-color: #FECA1D;\n      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(254, 202, 29, 0.6); }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/selected-items/selected-items.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.oc-hierarchy-selector-selected-items-wrapper {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  background-color: #FFFFFF; }\n\n.oc-hierarchy-selector-selected-items {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  border: 1px solid #CCCCCC;\n  overflow-x: hidden;\n  overflow-y: auto; }\n  .oc-hierarchy-selector-selected-items .group-list {\n    list-style-type: none;\n    margin: 0;\n    padding: 1rem;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none; }\n    .oc-hierarchy-selector-selected-items .group-list .group-list-item {\n      cursor: pointer;\n      font-size: 1.4rem;\n      font-weight: 700;\n      margin: 0 0.5rem 0.2rem 0.5rem;\n      line-height: 3rem; }\n      .oc-hierarchy-selector-selected-items .group-list .group-list-item div.right-block {\n        display: block;\n        float: right; }\n      .oc-hierarchy-selector-selected-items .group-list .group-list-item .badge {\n        margin: 0 1.5rem 0 0.5rem; }\n      .oc-hierarchy-selector-selected-items .group-list .group-list-item svg {\n        width: 1.5rem; }\n  .oc-hierarchy-selector-selected-items .component-icon {\n    display: inline-block;\n    width: auto;\n    margin: 0;\n    padding: 0;\n    font-size: 1.8rem;\n    vertical-align: middle; }\n    .oc-hierarchy-selector-selected-items .component-icon.clickable {\n      cursor: pointer; }\n  .oc-hierarchy-selector-selected-items .selected-item {\n    cursor: default;\n    font-size: 1.4rem;\n    font-weight: 400;\n    margin: 0 0 0 2.4rem;\n    line-height: 3rem;\n    border-bottom: 1px solid #EAEFF3; }\n  .oc-hierarchy-selector-selected-items .selected-item:first-child {\n    border-top: 1px solid #D3DADE; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/tabs.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.oc-hierarchy-selector-view-tabs {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%; }\n  .oc-hierarchy-selector-view-tabs .tab-content {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    padding: 1rem 0 0 0; }\n\n.oc-hierarchy-selector-tab-content {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  padding: 0 0 1rem 0;\n  overflow-x: auto;\n  overflow-y: hidden; }\n\n.oc-hierarchy-selector-tab-search-bar {\n  display: flex;\n  width: 30rem;\n  height: auto;\n  margin: 1rem 0 0 0; }\n\n.oc-hierarchy-selector-column-wrapper {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  height: 100%; }\n\n.tab-content > .tab-pane.active {\n  display: flex;\n  width: 100%;\n  height: 100%; }\n\n.nav.nav-tabs {\n  outline: none;\n  font-weight: 700;\n  font-size: 1.4rem;\n  border: none; }\n  .nav.nav-tabs > li > a {\n    color: #67707c;\n    padding: 1rem 0 0.5rem 0;\n    margin: 0 2rem 0 0;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    border: none; }\n    .nav.nav-tabs > li > a:hover {\n      background-color: transparent; }\n  .nav.nav-tabs > li.active > a {\n    color: #EC6608;\n    background-color: transparent;\n    border: none;\n    border-bottom: 2px solid #EC6608; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/top-bar.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Primary */\n/* Support */\n/* Attention */\n/* Other colors e.g. graphs */\n/* Text */\n/* Statuses */\n/* Tooltip */\n/* Toast a.k.a. notes */\n/* Pseudo classes */\n/* Backgrounds */\n/* Buttons */\n/* Date picker */\n/* Select */\n/* Grids */\n.oc-hierarchy-selector-view-dialog .oc-dialog-top-bar {\n  display: flex;\n  width: 100%;\n  height: 3.3rem;\n  line-height: 3.3rem; }\n  .oc-hierarchy-selector-view-dialog .oc-dialog-top-bar .btn {\n    margin-left: 1rem; }\n  .oc-hierarchy-selector-view-dialog .oc-dialog-top-bar .modal-title {\n    line-height: 3.3rem; }\n  .oc-hierarchy-selector-view-dialog .oc-dialog-top-bar .action-left {\n    display: flex;\n    justify-content: flex-start;\n    width: 50%; }\n  .oc-hierarchy-selector-view-dialog .oc-dialog-top-bar .action-right {\n    display: flex;\n    justify-content: flex-end;\n    width: 50%; }\n\n.oc-help-button {\n  width: 3.3rem;\n  height: 3.3rem;\n  line-height: 3.3rem;\n  border: none;\n  background-color: transparent;\n  font-size: 2.5rem;\n  font-weight: 700;\n  padding: 0;\n  margin: 0 0 0 2rem; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/view.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".oc-hierarchy-selector-view {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  height: 100%;\n  min-height: 0; }\n  .oc-hierarchy-selector-view div {\n    min-height: 0; }\n  .oc-hierarchy-selector-view .oc-hierarchy-selector-tabs {\n    display: flex;\n    width: 70%;\n    height: 100%;\n    padding: 0 1rem; }\n  .oc-hierarchy-selector-view .oc-hierarchy-selector-selected-container {\n    display: flex;\n    flex-direction: column;\n    width: 30%;\n    padding: 1rem; }\n\n.oc-hierarchy-selector-view-dialog {\n  width: 100%;\n  height: 90%; }\n  .oc-hierarchy-selector-view-dialog.modal-dialog {\n    width: 90%; }\n  .oc-hierarchy-selector-view-dialog .modal-content {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    border-radius: 0; }\n  .oc-hierarchy-selector-view-dialog .modal-body {\n    display: flex;\n    height: 100%;\n    padding: 0;\n    min-height: 0; }\n\n.oc-span-devider {\n  padding: 0 0.5rem; }\n\n.oc-span-devider-double {\n  padding: 0 1rem; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../node_modules/react-icon-base/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var IconBase = function IconBase(_ref, _ref2) {
  var children = _ref.children;
  var color = _ref.color;
  var size = _ref.size;
  var style = _ref.style;
  var width = _ref.width;
  var height = _ref.height;

  var props = _objectWithoutProperties(_ref, ['children', 'color', 'size', 'style', 'width', 'height']);

  var _ref2$reactIconBase = _ref2.reactIconBase;
  var reactIconBase = _ref2$reactIconBase === undefined ? {} : _ref2$reactIconBase;

  var computedSize = size || reactIconBase.size || '1em';
  return _react2.default.createElement('svg', _extends({
    children: children,
    fill: 'currentColor',
    preserveAspectRatio: 'xMidYMid meet',
    height: height || computedSize,
    width: width || computedSize
  }, reactIconBase, props, {
    style: _extends({
      verticalAlign: 'middle',
      color: color || reactIconBase.color
    }, reactIconBase.style || {}, style)
  }));
};

IconBase.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  style: _propTypes2.default.object
};

IconBase.contextTypes = {
  reactIconBase: _propTypes2.default.shape(IconBase.propTypes)
};

exports.default = IconBase;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/caret-down.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaCaretDown = function FaCaretDown(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm31.4 15.7q0 0.6-0.5 1l-10 10q-0.4 0.4-1 0.4t-1-0.4l-10-10q-0.4-0.4-0.4-1t0.4-1 1-0.4h20q0.6 0 1 0.4t0.5 1z' })
        )
    );
};

exports.default = FaCaretDown;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/caret-right.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaCaretRight = function FaCaretRight(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm26.4 20q0 0.6-0.5 1l-10 10q-0.4 0.4-1 0.4t-1-0.4-0.4-1v-20q0-0.6 0.4-1t1-0.4 1 0.4l10 10q0.5 0.4 0.5 1z' })
        )
    );
};

exports.default = FaCaretRight;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/check-square-o.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaCheckSquareO = function FaCheckSquareO(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm32.9 20.8v7.1q0 2.6-1.9 4.5t-4.5 1.9h-18.6q-2.6 0-4.5-1.9t-1.9-4.5v-18.6q0-2.7 1.9-4.6t4.5-1.8h18.6q1.4 0 2.6 0.5 0.3 0.2 0.4 0.5 0.1 0.4-0.2 0.7l-1.1 1.1q-0.2 0.2-0.5 0.2-0.1 0-0.2-0.1-0.5-0.1-1-0.1h-18.6q-1.4 0-2.5 1.1t-1 2.5v18.6q0 1.4 1 2.5t2.5 1h18.6q1.5 0 2.5-1t1.1-2.5v-5.7q0-0.3 0.2-0.5l1.4-1.4q0.2-0.3 0.5-0.3 0.1 0 0.3 0.1 0.4 0.2 0.4 0.7z m5.2-11l-18.2 18.2q-0.5 0.6-1.3 0.6t-1.2-0.6l-9.6-9.6q-0.6-0.5-0.6-1.3t0.6-1.2l2.4-2.5q0.6-0.5 1.3-0.5t1.3 0.5l5.8 5.9 14.5-14.5q0.5-0.5 1.3-0.5t1.2 0.5l2.5 2.5q0.5 0.5 0.5 1.3t-0.5 1.2z' })
        )
    );
};

exports.default = FaCheckSquareO;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/check-square.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaCheckSquare = function FaCheckSquare(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm18.3 29l13.7-13.7q0.4-0.4 0.4-1t-0.4-1l-2.3-2.3q-0.4-0.4-1-0.4t-1 0.4l-10.4 10.4-4.7-4.7q-0.4-0.4-1-0.4t-1 0.4l-2.3 2.3q-0.4 0.4-0.4 1t0.4 1l8 8q0.4 0.4 1 0.4t1-0.4z m19-19.7v21.4q0 2.7-1.9 4.6t-4.5 1.8h-21.5q-2.6 0-4.5-1.8t-1.9-4.6v-21.4q0-2.7 1.9-4.6t4.5-1.8h21.5q2.6 0 4.5 1.8t1.9 4.6z' })
        )
    );
};

exports.default = FaCheckSquare;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/chevron-down.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaChevronDown = function FaChevronDown(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm37.6 18l-16.6 16.6q-0.4 0.4-1 0.4t-1-0.4l-16.6-16.6q-0.4-0.4-0.4-1t0.4-1l3.7-3.7q0.5-0.4 1-0.4t1 0.4l11.9 11.9 11.9-11.9q0.4-0.4 1-0.4t1 0.4l3.7 3.7q0.4 0.4 0.4 1t-0.4 1z' })
        )
    );
};

exports.default = FaChevronDown;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/close.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaClose = function FaClose(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm33.5 29.5q0 0.9-0.7 1.5l-3 3.1q-0.6 0.6-1.5 0.6t-1.5-0.6l-6.6-6.6-6.5 6.6q-0.7 0.6-1.6 0.6t-1.5-0.6l-3-3.1q-0.6-0.6-0.6-1.5t0.6-1.5l6.5-6.6-6.5-6.5q-0.6-0.7-0.6-1.6t0.6-1.5l3-3q0.6-0.6 1.5-0.6t1.6 0.6l6.5 6.6 6.6-6.6q0.6-0.6 1.5-0.6t1.5 0.6l3.1 3q0.6 0.7 0.6 1.5t-0.6 1.6l-6.6 6.5 6.6 6.6q0.6 0.6 0.6 1.5z' })
        )
    );
};

exports.default = FaClose;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/question-circle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaQuestionCircle = function FaQuestionCircle(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm23 30.7v-4.3q0-0.3-0.2-0.5t-0.5-0.2h-4.3q-0.3 0-0.5 0.2t-0.2 0.5v4.3q0 0.3 0.2 0.5t0.5 0.2h4.3q0.3 0 0.5-0.2t0.2-0.5z m5.7-15q0-2-1.2-3.6t-3.1-2.6-3.8-0.9q-5.4 0-8.3 4.7-0.3 0.6 0.2 1l2.9 2.2q0.2 0.1 0.5 0.1 0.3 0 0.5-0.2 1.2-1.6 1.9-2.1 0.8-0.5 2-0.5 1 0 1.9 0.6t0.8 1.3q0 0.8-0.4 1.3t-1.6 1q-1.4 0.7-2.5 2t-1.2 2.8v0.8q0 0.3 0.2 0.5t0.5 0.2h4.3q0.3 0 0.5-0.2t0.2-0.5q0-0.5 0.5-1.1t1.2-1.1q0.7-0.4 1.1-0.7t1-0.8 1-1 0.6-1.4 0.3-1.8z m8.6 4.3q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z' })
        )
    );
};

exports.default = FaQuestionCircle;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/search.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaSearch = function FaSearch(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm27.2 18.6q0-4.2-2.9-7.1t-7.1-2.9-7 2.9-3 7.1 2.9 7 7.1 3 7.1-3 2.9-7z m11.4 18.5q0 1.2-0.8 2.1t-2 0.8q-1.2 0-2-0.8l-7.7-7.7q-4 2.8-8.9 2.8-3.2 0-6.1-1.3t-5-3.3-3.4-5-1.2-6.1 1.2-6.1 3.4-5.1 5-3.3 6.1-1.2 6.1 1.2 5 3.3 3.4 5.1 1.2 6.1q0 4.9-2.7 8.9l7.6 7.6q0.8 0.9 0.8 2z' })
        )
    );
};

exports.default = FaSearch;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/square-o.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaSquareO = function FaSquareO(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm29.5 5.7h-18.6q-1.4 0-2.5 1.1t-1 2.5v18.6q0 1.4 1 2.5t2.5 1h18.6q1.5 0 2.5-1t1.1-2.5v-18.6q0-1.5-1.1-2.5t-2.5-1.1z m6.4 3.6v18.6q0 2.6-1.9 4.5t-4.5 1.9h-18.6q-2.6 0-4.5-1.9t-1.9-4.5v-18.6q0-2.7 1.9-4.6t4.5-1.8h18.6q2.7 0 4.5 1.8t1.9 4.6z' })
        )
    );
};

exports.default = FaSquareO;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-icons/lib/fa/trash.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__("../node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaTrash = function FaTrash(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm15.9 30.7v-15.7q0-0.3-0.2-0.5t-0.5-0.2h-1.4q-0.3 0-0.5 0.2t-0.2 0.5v15.7q0 0.3 0.2 0.5t0.5 0.2h1.4q0.3 0 0.5-0.2t0.2-0.5z m5.7 0v-15.7q0-0.3-0.2-0.5t-0.5-0.2h-1.4q-0.3 0-0.5 0.2t-0.2 0.5v15.7q0 0.3 0.2 0.5t0.5 0.2h1.4q0.3 0 0.5-0.2t0.2-0.5z m5.8 0v-15.7q0-0.3-0.2-0.5t-0.6-0.2h-1.4q-0.3 0-0.5 0.2t-0.2 0.5v15.7q0 0.3 0.2 0.5t0.5 0.2h1.4q0.4 0 0.6-0.2t0.2-0.5z m-12.2-22.1h10l-1.1-2.6q-0.1-0.2-0.3-0.3h-7.1q-0.2 0.1-0.4 0.3z m20.7 0.7v1.4q0 0.3-0.2 0.5t-0.5 0.2h-2.1v21.2q0 1.8-1.1 3.2t-2.5 1.3h-18.6q-1.4 0-2.5-1.3t-1-3.1v-21.3h-2.2q-0.3 0-0.5-0.2t-0.2-0.5v-1.4q0-0.3 0.2-0.5t0.5-0.2h6.9l1.6-3.8q0.3-0.8 1.2-1.4t1.7-0.5h7.2q0.9 0 1.8 0.5t1.2 1.4l1.5 3.8h6.9q0.3 0 0.5 0.2t0.2 0.5z' })
        )
    );
};

exports.default = FaTrash;
module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-list/react-list.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__("prop-types"), __webpack_require__("react")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, require('prop-types'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.PropTypes, global.React);
    global.ReactList = mod.exports;
  }
})(this, function (_module2, _propTypes, _react) {
  'use strict';

  var _module3 = _interopRequireDefault(_module2);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _class, _temp;

  var CLIENT_SIZE_KEYS = { x: 'clientWidth', y: 'clientHeight' };
  var CLIENT_START_KEYS = { x: 'clientTop', y: 'clientLeft' };
  var INNER_SIZE_KEYS = { x: 'innerWidth', y: 'innerHeight' };
  var OFFSET_SIZE_KEYS = { x: 'offsetWidth', y: 'offsetHeight' };
  var OFFSET_START_KEYS = { x: 'offsetLeft', y: 'offsetTop' };
  var OVERFLOW_KEYS = { x: 'overflowX', y: 'overflowY' };
  var SCROLL_SIZE_KEYS = { x: 'scrollWidth', y: 'scrollHeight' };
  var SCROLL_START_KEYS = { x: 'scrollLeft', y: 'scrollTop' };
  var SIZE_KEYS = { x: 'width', y: 'height' };

  var NOOP = function NOOP() {};

  // If a browser doesn't support the `options` argument to
  // add/removeEventListener, we need to check, otherwise we will
  // accidentally set `capture` with a truthy value.
  var PASSIVE = function () {
    if (typeof window === 'undefined') return false;
    var hasSupport = false;
    try {
      document.createElement('div').addEventListener('test', NOOP, {
        get passive() {
          hasSupport = true;
          return false;
        }
      });
    } catch (e) {}
    return hasSupport;
  }() ? { passive: true } : false;

  var UNSTABLE_MESSAGE = 'ReactList failed to reach a stable state.';
  var MAX_SYNC_UPDATES = 100;

  var isEqualSubset = function isEqualSubset(a, b) {
    for (var key in b) {
      if (a[key] !== b[key]) return false;
    }return true;
  };

  _module3.default.exports = (_temp = _class = function (_Component) {
    _inherits(ReactList, _Component);

    function ReactList(props) {
      _classCallCheck(this, ReactList);

      var _this = _possibleConstructorReturn(this, (ReactList.__proto__ || Object.getPrototypeOf(ReactList)).call(this, props));

      var initialIndex = props.initialIndex;

      var itemsPerRow = 1;

      var _this$constrain = _this.constrain(initialIndex, 0, itemsPerRow, props),
          from = _this$constrain.from,
          size = _this$constrain.size;

      _this.state = { from: from, size: size, itemsPerRow: itemsPerRow };
      _this.cache = {};
      _this.prevPrevState = {};
      _this.unstable = false;
      _this.updateCounter = 0;
      return _this;
    }

    _createClass(ReactList, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(next) {
        var _state = this.state,
            from = _state.from,
            size = _state.size,
            itemsPerRow = _state.itemsPerRow;

        this.maybeSetState(this.constrain(from, size, itemsPerRow, next), NOOP);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.updateFrame = this.updateFrame.bind(this);
        window.addEventListener('resize', this.updateFrame);
        this.updateFrame(this.scrollTo.bind(this, this.props.initialIndex));
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this2 = this;

        // If the list has reached an unstable state, prevent an infinite loop.
        if (this.unstable) return;

        if (++this.updateCounter > MAX_SYNC_UPDATES) {
          this.unstable = true;
          return console.error(UNSTABLE_MESSAGE);
        }

        if (!this.updateCounterTimeoutId) {
          this.updateCounterTimeoutId = setTimeout(function () {
            _this2.updateCounter = 0;
            delete _this2.updateCounterTimeoutId;
          }, 0);
        }

        this.updateFrame();
      }
    }, {
      key: 'maybeSetState',
      value: function maybeSetState(b, cb) {
        if (isEqualSubset(this.state, b)) return cb();

        this.setState(b, cb);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.updateFrame);
        this.scrollParent.removeEventListener('scroll', this.updateFrame, PASSIVE);
        this.scrollParent.removeEventListener('mousewheel', NOOP, PASSIVE);
      }
    }, {
      key: 'getOffset',
      value: function getOffset(el) {
        var axis = this.props.axis;

        var offset = el[CLIENT_START_KEYS[axis]] || 0;
        var offsetKey = OFFSET_START_KEYS[axis];
        do {
          offset += el[offsetKey] || 0;
        } while (el = el.offsetParent);
        return offset;
      }
    }, {
      key: 'getEl',
      value: function getEl() {
        return this.el || this.items;
      }
    }, {
      key: 'getScrollParent',
      value: function getScrollParent() {
        var _props = this.props,
            axis = _props.axis,
            scrollParentGetter = _props.scrollParentGetter;

        if (scrollParentGetter) return scrollParentGetter();
        var el = this.getEl();
        var overflowKey = OVERFLOW_KEYS[axis];
        while (el = el.parentElement) {
          switch (window.getComputedStyle(el)[overflowKey]) {
            case 'auto':case 'scroll':case 'overlay':
              return el;
          }
        }
        return window;
      }
    }, {
      key: 'getScroll',
      value: function getScroll() {
        var scrollParent = this.scrollParent;
        var axis = this.props.axis;

        var scrollKey = SCROLL_START_KEYS[axis];
        var actual = scrollParent === window ?
        // Firefox always returns document.body[scrollKey] as 0 and Chrome/Safari
        // always return document.documentElement[scrollKey] as 0, so take
        // whichever has a value.
        document.body[scrollKey] || document.documentElement[scrollKey] : scrollParent[scrollKey];
        var max = this.getScrollSize() - this.getViewportSize();
        var scroll = Math.max(0, Math.min(actual, max));
        var el = this.getEl();
        return this.getOffset(scrollParent) + scroll - this.getOffset(el);
      }
    }, {
      key: 'setScroll',
      value: function setScroll(offset) {
        var scrollParent = this.scrollParent;
        var axis = this.props.axis;

        offset += this.getOffset(this.getEl());
        if (scrollParent === window) return window.scrollTo(0, offset);

        offset -= this.getOffset(this.scrollParent);
        scrollParent[SCROLL_START_KEYS[axis]] = offset;
      }
    }, {
      key: 'getViewportSize',
      value: function getViewportSize() {
        var scrollParent = this.scrollParent;
        var axis = this.props.axis;

        return scrollParent === window ? window[INNER_SIZE_KEYS[axis]] : scrollParent[CLIENT_SIZE_KEYS[axis]];
      }
    }, {
      key: 'getScrollSize',
      value: function getScrollSize() {
        var scrollParent = this.scrollParent;
        var _document = document,
            body = _document.body,
            documentElement = _document.documentElement;

        var key = SCROLL_SIZE_KEYS[this.props.axis];
        return scrollParent === window ? Math.max(body[key], documentElement[key]) : scrollParent[key];
      }
    }, {
      key: 'hasDeterminateSize',
      value: function hasDeterminateSize() {
        var _props2 = this.props,
            itemSizeGetter = _props2.itemSizeGetter,
            type = _props2.type;

        return type === 'uniform' || itemSizeGetter;
      }
    }, {
      key: 'getStartAndEnd',
      value: function getStartAndEnd() {
        var threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.threshold;

        var scroll = this.getScroll();
        var start = Math.max(0, scroll - threshold);
        var end = scroll + this.getViewportSize() + threshold;
        if (this.hasDeterminateSize()) {
          end = Math.min(end, this.getSpaceBefore(this.props.length));
        }
        return { start: start, end: end };
      }
    }, {
      key: 'getItemSizeAndItemsPerRow',
      value: function getItemSizeAndItemsPerRow() {
        var _props3 = this.props,
            axis = _props3.axis,
            useStaticSize = _props3.useStaticSize;
        var _state2 = this.state,
            itemSize = _state2.itemSize,
            itemsPerRow = _state2.itemsPerRow;

        if (useStaticSize && itemSize && itemsPerRow) {
          return { itemSize: itemSize, itemsPerRow: itemsPerRow };
        }

        var itemEls = this.items.children;
        if (!itemEls.length) return {};

        var firstEl = itemEls[0];

        // Firefox has a problem where it will return a *slightly* (less than
        // thousandths of a pixel) different size for the same element between
        // renders. This can cause an infinite render loop, so only change the
        // itemSize when it is significantly different.
        var firstElSize = firstEl[OFFSET_SIZE_KEYS[axis]];
        var delta = Math.abs(firstElSize - itemSize);
        if (isNaN(delta) || delta >= 1) itemSize = firstElSize;

        if (!itemSize) return {};

        var startKey = OFFSET_START_KEYS[axis];
        var firstStart = firstEl[startKey];
        itemsPerRow = 1;
        for (var item = itemEls[itemsPerRow]; item && item[startKey] === firstStart; item = itemEls[itemsPerRow]) {
          ++itemsPerRow;
        }return { itemSize: itemSize, itemsPerRow: itemsPerRow };
      }
    }, {
      key: 'updateFrame',
      value: function updateFrame(cb) {
        this.updateScrollParent();
        if (typeof cb != 'function') cb = NOOP;
        switch (this.props.type) {
          case 'simple':
            return this.updateSimpleFrame(cb);
          case 'variable':
            return this.updateVariableFrame(cb);
          case 'uniform':
            return this.updateUniformFrame(cb);
        }
      }
    }, {
      key: 'updateScrollParent',
      value: function updateScrollParent() {
        var prev = this.scrollParent;
        this.scrollParent = this.getScrollParent();
        if (prev === this.scrollParent) return;
        if (prev) {
          prev.removeEventListener('scroll', this.updateFrame);
          prev.removeEventListener('mousewheel', NOOP);
        }
        this.scrollParent.addEventListener('scroll', this.updateFrame, PASSIVE);
        this.scrollParent.addEventListener('mousewheel', NOOP, PASSIVE);
      }
    }, {
      key: 'updateSimpleFrame',
      value: function updateSimpleFrame(cb) {
        var _getStartAndEnd = this.getStartAndEnd(),
            end = _getStartAndEnd.end;

        var itemEls = this.items.children;
        var elEnd = 0;

        if (itemEls.length) {
          var axis = this.props.axis;

          var firstItemEl = itemEls[0];
          var lastItemEl = itemEls[itemEls.length - 1];
          elEnd = this.getOffset(lastItemEl) + lastItemEl[OFFSET_SIZE_KEYS[axis]] - this.getOffset(firstItemEl);
        }

        if (elEnd > end) return cb();

        var _props4 = this.props,
            pageSize = _props4.pageSize,
            length = _props4.length;

        var size = Math.min(this.state.size + pageSize, length);
        this.maybeSetState({ size: size }, cb);
      }
    }, {
      key: 'updateVariableFrame',
      value: function updateVariableFrame(cb) {
        if (!this.props.itemSizeGetter) this.cacheSizes();

        var _getStartAndEnd2 = this.getStartAndEnd(),
            start = _getStartAndEnd2.start,
            end = _getStartAndEnd2.end;

        var _props5 = this.props,
            length = _props5.length,
            pageSize = _props5.pageSize;

        var space = 0;
        var from = 0;
        var size = 0;
        var maxFrom = length - 1;

        while (from < maxFrom) {
          var itemSize = this.getSizeOf(from);
          if (itemSize == null || space + itemSize > start) break;
          space += itemSize;
          ++from;
        }

        var maxSize = length - from;

        while (size < maxSize && space < end) {
          var _itemSize = this.getSizeOf(from + size);
          if (_itemSize == null) {
            size = Math.min(size + pageSize, maxSize);
            break;
          }
          space += _itemSize;
          ++size;
        }

        this.maybeSetState({ from: from, size: size }, cb);
      }
    }, {
      key: 'updateUniformFrame',
      value: function updateUniformFrame(cb) {
        var _getItemSizeAndItemsP = this.getItemSizeAndItemsPerRow(),
            itemSize = _getItemSizeAndItemsP.itemSize,
            itemsPerRow = _getItemSizeAndItemsP.itemsPerRow;

        if (!itemSize || !itemsPerRow) return cb();

        var _getStartAndEnd3 = this.getStartAndEnd(),
            start = _getStartAndEnd3.start,
            end = _getStartAndEnd3.end;

        var _constrain = this.constrain(Math.floor(start / itemSize) * itemsPerRow, (Math.ceil((end - start) / itemSize) + 1) * itemsPerRow, itemsPerRow, this.props),
            from = _constrain.from,
            size = _constrain.size;

        return this.maybeSetState({ itemsPerRow: itemsPerRow, from: from, itemSize: itemSize, size: size }, cb);
      }
    }, {
      key: 'getSpaceBefore',
      value: function getSpaceBefore(index) {
        var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (cache[index] != null) return cache[index];

        // Try the static itemSize.
        var _state3 = this.state,
            itemSize = _state3.itemSize,
            itemsPerRow = _state3.itemsPerRow;

        if (itemSize) {
          return cache[index] = Math.floor(index / itemsPerRow) * itemSize;
        }

        // Find the closest space to index there is a cached value for.
        var from = index;
        while (from > 0 && cache[--from] == null) {}

        // Finally, accumulate sizes of items from - index.
        var space = cache[from] || 0;
        for (var i = from; i < index; ++i) {
          cache[i] = space;
          var _itemSize2 = this.getSizeOf(i);
          if (_itemSize2 == null) break;
          space += _itemSize2;
        }

        return cache[index] = space;
      }
    }, {
      key: 'cacheSizes',
      value: function cacheSizes() {
        var cache = this.cache;
        var from = this.state.from;

        var itemEls = this.items.children;
        var sizeKey = OFFSET_SIZE_KEYS[this.props.axis];
        for (var i = 0, l = itemEls.length; i < l; ++i) {
          cache[from + i] = itemEls[i][sizeKey];
        }
      }
    }, {
      key: 'getSizeOf',
      value: function getSizeOf(index) {
        var cache = this.cache,
            items = this.items;
        var _props6 = this.props,
            axis = _props6.axis,
            itemSizeGetter = _props6.itemSizeGetter,
            itemSizeEstimator = _props6.itemSizeEstimator,
            type = _props6.type;
        var _state4 = this.state,
            from = _state4.from,
            itemSize = _state4.itemSize,
            size = _state4.size;


        // Try the static itemSize.
        if (itemSize) return itemSize;

        // Try the itemSizeGetter.
        if (itemSizeGetter) return itemSizeGetter(index);

        // Try the cache.
        if (index in cache) return cache[index];

        // Try the DOM.
        if (type === 'simple' && index >= from && index < from + size && items) {
          var itemEl = items.children[index - from];
          if (itemEl) return itemEl[OFFSET_SIZE_KEYS[axis]];
        }

        // Try the itemSizeEstimator.
        if (itemSizeEstimator) return itemSizeEstimator(index, cache);
      }
    }, {
      key: 'constrain',
      value: function constrain(from, size, itemsPerRow, _ref) {
        var length = _ref.length,
            minSize = _ref.minSize,
            type = _ref.type;

        size = Math.max(size, minSize);
        var mod = size % itemsPerRow;
        if (mod) size += itemsPerRow - mod;
        if (size > length) size = length;
        from = type === 'simple' || !from ? 0 : Math.max(Math.min(from, length - size), 0);

        if (mod = from % itemsPerRow) {
          from -= mod;
          size += mod;
        }

        return { from: from, size: size };
      }
    }, {
      key: 'scrollTo',
      value: function scrollTo(index) {
        if (index != null) this.setScroll(this.getSpaceBefore(index));
      }
    }, {
      key: 'scrollAround',
      value: function scrollAround(index) {
        var current = this.getScroll();
        var bottom = this.getSpaceBefore(index);
        var top = bottom - this.getViewportSize() + this.getSizeOf(index);
        var min = Math.min(top, bottom);
        var max = Math.max(top, bottom);
        if (current <= min) return this.setScroll(min);
        if (current > max) return this.setScroll(max);
      }
    }, {
      key: 'getVisibleRange',
      value: function getVisibleRange() {
        var _state5 = this.state,
            from = _state5.from,
            size = _state5.size;

        var _getStartAndEnd4 = this.getStartAndEnd(0),
            start = _getStartAndEnd4.start,
            end = _getStartAndEnd4.end;

        var cache = {};
        var first = void 0,
            last = void 0;
        for (var i = from; i < from + size; ++i) {
          var itemStart = this.getSpaceBefore(i, cache);
          var itemEnd = itemStart + this.getSizeOf(i);
          if (first == null && itemEnd > start) first = i;
          if (first != null && itemStart < end) last = i;
        }
        return [first, last];
      }
    }, {
      key: 'renderItems',
      value: function renderItems() {
        var _this3 = this;

        var _props7 = this.props,
            itemRenderer = _props7.itemRenderer,
            itemsRenderer = _props7.itemsRenderer;
        var _state6 = this.state,
            from = _state6.from,
            size = _state6.size;

        var items = [];
        for (var i = 0; i < size; ++i) {
          items.push(itemRenderer(from + i, i));
        }return itemsRenderer(items, function (c) {
          return _this3.items = c;
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var _props8 = this.props,
            axis = _props8.axis,
            length = _props8.length,
            type = _props8.type,
            useTranslate3d = _props8.useTranslate3d;
        var _state7 = this.state,
            from = _state7.from,
            itemsPerRow = _state7.itemsPerRow;


        var items = this.renderItems();
        if (type === 'simple') return items;

        var style = { position: 'relative' };
        var cache = {};
        var bottom = Math.ceil(length / itemsPerRow) * itemsPerRow;
        var size = this.getSpaceBefore(bottom, cache);
        if (size) {
          style[SIZE_KEYS[axis]] = size;
          if (axis === 'x') style.overflowX = 'hidden';
        }
        var offset = this.getSpaceBefore(from, cache);
        var x = axis === 'x' ? offset : 0;
        var y = axis === 'y' ? offset : 0;
        var transform = useTranslate3d ? 'translate3d(' + x + 'px, ' + y + 'px, 0)' : 'translate(' + x + 'px, ' + y + 'px)';
        var listStyle = {
          msTransform: transform,
          WebkitTransform: transform,
          transform: transform
        };
        return _react2.default.createElement(
          'div',
          _extends({ style: style }, { ref: function ref(c) {
              return _this4.el = c;
            } }),
          _react2.default.createElement(
            'div',
            { style: listStyle },
            items
          )
        );
      }
    }]);

    return ReactList;
  }(_react.Component), _class.displayName = 'ReactList', _class.propTypes = {
    axis: _propTypes2.default.oneOf(['x', 'y']),
    initialIndex: _propTypes2.default.number,
    itemRenderer: _propTypes2.default.func,
    itemSizeEstimator: _propTypes2.default.func,
    itemSizeGetter: _propTypes2.default.func,
    itemsRenderer: _propTypes2.default.func,
    length: _propTypes2.default.number,
    minSize: _propTypes2.default.number,
    pageSize: _propTypes2.default.number,
    scrollParentGetter: _propTypes2.default.func,
    threshold: _propTypes2.default.number,
    type: _propTypes2.default.oneOf(['simple', 'variable', 'uniform']),
    useStaticSize: _propTypes2.default.bool,
    useTranslate3d: _propTypes2.default.bool
  }, _class.defaultProps = {
    axis: 'y',
    itemRenderer: function itemRenderer(index, key) {
      return _react2.default.createElement(
        'div',
        { key: key },
        index
      );
    },
    itemsRenderer: function itemsRenderer(items, ref) {
      return _react2.default.createElement(
        'div',
        { ref: ref },
        items
      );
    },
    length: 0,
    minSize: 1,
    pageSize: 10,
    threshold: 100,
    type: 'simple',
    useStaticSize: false,
    useTranslate3d: false
  }, _temp);
});


/***/ }),

/***/ "../node_modules/spin.js/spin.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
    var opts = {
      lines: 12             // The number of lines to draw
    , length: 7             // The length of each line
    , width: 5              // The line thickness
    , radius: 10            // The radius of the inner circle
    , scale: 1.0            // Scales overall size of the spinner
    , corners: 1            // Roundness (0..1)
    , color: '#000'         // #rgb or #rrggbb
    , opacity: 1/4          // Opacity of the lines
    , rotate: 0             // Rotation offset
    , direction: 1          // 1: clockwise, -1: counterclockwise
    , speed: 1              // Rounds per second
    , trail: 100            // Afterglow percentage
    , fps: 20               // Frames per second when using setTimeout()
    , zIndex: 2e9           // Use a high z-index by default
    , className: 'spinner'  // CSS class to assign to the element
    , top: '50%'            // center vertically
    , left: '50%'           // center horizontally
    , shadow: false         // Whether to render a shadow
    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
    , position: 'absolute'  // Element positioning
    }
    var target = document.getElementById('foo')
    var spinner = new Spinner(opts).spin(target)
 */
;(function (root, factory) {

  /* CommonJS */
  if (typeof module == 'object' && module.exports) module.exports = factory()

  /* AMD module */
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

  /* Browser global */
  else root.Spinner = factory()
}(this, function () {
  "use strict"

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */
    , sheet /* A stylesheet to hold the @keyframe or VML rules. */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl (tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for (n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins (parent /* child1, child2, ...*/) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      parent.appendChild(arguments[i])
    }

    return parent
  }

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation (alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor (el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    if (s[prop] !== undefined) return prop
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i]+prop
      if (s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css (el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n) || n] = prop[n]
    }

    return el
  }

  /**
   * Fills in default values.
   */
  function merge (obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n]
      }
    }
    return obj
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor (color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12             // The number of lines to draw
  , length: 7             // The length of each line
  , width: 5              // The line thickness
  , radius: 10            // The radius of the inner circle
  , scale: 1.0            // Scales overall size of the spinner
  , corners: 1            // Roundness (0..1)
  , color: '#000'         // #rgb or #rrggbb
  , opacity: 1/4          // Opacity of the lines
  , rotate: 0             // Rotation offset
  , direction: 1          // 1: clockwise, -1: counterclockwise
  , speed: 1              // Rounds per second
  , trail: 100            // Afterglow percentage
  , fps: 20               // Frames per second when using setTimeout()
  , zIndex: 2e9           // Use a high z-index by default
  , className: 'spinner'  // CSS class to assign to the element
  , top: '50%'            // center vertically
  , left: '50%'           // center horizontally
  , shadow: false         // Whether to render a shadow
  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
  , position: 'absolute'  // Element positioning
  }

  /** The constructor */
  function Spinner (o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function (target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = createEl(null, {className: o.className})

      css(el, {
        position: o.position
      , width: 0
      , zIndex: o.zIndex
      , left: o.left
      , top: o.top
      })

      if (target) {
        target.insertBefore(el, target.firstChild || null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps / o.speed
          , ostep = (1 - o.opacity) / (f * o.trail / 100)
          , astep = f / o.lines

        ;(function anim () {
          i++
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
        })()
      }
      return self
    }

    /**
     * Stops and removes the Spinner.
     */
  , stop: function () {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    }

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
  , lines: function (el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill (color, shadow) {
        return css(createEl(), {
          position: 'absolute'
        , width: o.scale * (o.length + o.width) + 'px'
        , height: o.scale * o.width + 'px'
        , background: color
        , boxShadow: shadow
        , transformOrigin: 'left'
        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute'
        , top: 1 + ~(o.scale * o.width / 2) + 'px'
        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
        , opacity: o.opacity
        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    }

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
  , opacity: function (el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML () {

    /* Utility function to create a VML tag */
    function vml (tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function (el, o) {
      var r = o.scale * (o.length + o.width)
        , s = o.scale * 2 * r

      function grp () {
        return css(
          vml('group', {
            coordsize: s + ' ' + s
          , coordorigin: -r + ' ' + -r
          })
        , { width: s, height: s }
        )
      }

      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg (i, dx, filter) {
        ins(
          g
        , ins(
            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
          , ins(
              css(
                vml('roundrect', {arcsize: o.corners})
              , { width: r
                , height: o.scale * o.width
                , left: o.scale * o.radius
                , top: -o.scale * o.width >> 1
                , filter: filter
                }
              )
            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
            , vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++) {
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
        }

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i + o < c.childNodes.length) {
        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  if (typeof document !== 'undefined') {
    sheet = (function () {
      var el = createEl('style', {type : 'text/css'})
      ins(document.getElementsByTagName('head')[0], el)
      return el.sheet || el.styleSheet
    }())

    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

    if (!vendor(probe, 'transform') && probe.adj) initVML()
    else useCssAnimations = vendor(probe, 'animation')
  }

  return Spinner

}));


/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../node_modules/style-loader/lib/urls.js":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./components/badge/badge.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HSBadge; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__("../node_modules/classnames/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__badge_scss__ = __webpack_require__("./components/badge/badge.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__badge_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__badge_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var HSBadge = function (_React$PureComponent) {
  _inherits(HSBadge, _React$PureComponent);

  function HSBadge() {
    var _temp, _this, _ret;

    _classCallCheck(this, HSBadge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.getClassNames = function (className) {
      return __WEBPACK_IMPORTED_MODULE_2_classnames___default()('oc-hierarchy-selector-badge', className);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  HSBadge.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        other = _objectWithoutProperties(_props, ['className']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Badge"],
      _extends({ className: this.getClassNames(className) }, other),
      this.props.children
    );
  };

  return HSBadge;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




HSBadge.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

HSBadge.defaultProps = {
  children: null,
  className: ''
};

/***/ }),

/***/ "./components/badge/badge.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/badge/badge.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./badge.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./badge.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/badge/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge_component__ = __webpack_require__("./components/badge/badge.component.jsx");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__badge_component__["a" /* default */]);

/***/ }),

/***/ "./components/combo-box/combo-box.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HierarchySelectorComboBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_chevron_down__ = __webpack_require__("../node_modules/react-icons/lib/fa/chevron-down.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_chevron_down___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_chevron_down__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_types__ = __webpack_require__("./services/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__types__ = __webpack_require__("./types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__spinner__ = __webpack_require__("./components/spinner/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__popover__ = __webpack_require__("./components/popover/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__view__ = __webpack_require__("./components/view/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__badge__ = __webpack_require__("./components/badge/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__constants__ = __webpack_require__("./components/combo-box/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__combo_box_scss__ = __webpack_require__("./components/combo-box/combo-box.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__combo_box_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__combo_box_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-unused-state */















var HierarchySelectorComboBox = (_temp = _class = function (_React$PureComponent) {
  _inherits(HierarchySelectorComboBox, _React$PureComponent);

  function HierarchySelectorComboBox(props) {
    _classCallCheck(this, HierarchySelectorComboBox);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var isDataLoaded = props.dataSourceProvider.isLoaded;
    var needToUpdatePreChecked = props.preCheckedItems && props.preCheckedItems.length;
    var needToLoadData = !isDataLoaded && needToUpdatePreChecked;

    _this.state = {
      needToLoadData: needToLoadData,
      needToUpdatePreChecked: needToUpdatePreChecked,
      preCheckedItems: props.preCheckedItems,
      selected: null,
      isPopoverVisible: props.popoverVisible,
      isViewVisible: false
    };
    return _this;
  }

  HierarchySelectorComboBox.prototype.componentWillMount = function componentWillMount() {
    var needToLoadData = this.state.needToLoadData;

    if (needToLoadData) {
      this.loadData(this.props);
    }
  };

  HierarchySelectorComboBox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        dataSourceProvider = _props.dataSourceProvider,
        preCheckedItems = _props.preCheckedItems;


    if (dataSourceProvider !== nextProps.dataSourceProvider) {
      this.setState({
        needToLoadData: true
      });
    }

    if (preCheckedItems !== nextProps.preCheckedItems) {
      this.setState({
        needToUpdatePreChecked: true
      });
    }
  };

  HierarchySelectorComboBox.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    var needToLoadData = nextState.needToLoadData,
        needToUpdatePreChecked = nextState.needToUpdatePreChecked;

    if (needToLoadData) {
      this.loadData(nextProps);
    } else if (needToUpdatePreChecked) {
      this.updatePrechecked(nextProps);
    }
  };

  HierarchySelectorComboBox.prototype.render = function render() {
    var _this2 = this;

    var inputName = this.props.inputName;

    var inputOptions = {
      onFocus: this.onInputFocus,
      type: 'text',
      placeholder: this.props.noSelectionText,
      readOnly: true,
      ref: function ref(input) {
        _this2.inputElement = input;
      },
      value: this.getInputText()
    };

    if (inputName.trim() !== '') {
      inputOptions.name = inputName;
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-hierarchy-selector-list-wrapper' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["OverlayTrigger"],
        {
          delay: __WEBPACK_IMPORTED_MODULE_10__constants__["b" /* TOOLTIP_DELAY_MS */],
          placement: this.props.tooltipPlacement,
          overlay: this.getToolTip(this.getDefaultToolTipContent())
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'oc-hierarchy-selector-list' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', inputOptions),
          this.state.needToLoadData ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__spinner__["a" /* default */], null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__badge__["a" /* default */],
            { className: 'badge-orange' },
            this.getCountOfSelectedItems()
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { type: 'button', disabled: this.state.needToLoadData, className: 'oc-hierarchy-selector-list-btn', onClick: this.onClickHandler },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_chevron_down___default.a, null)
          )
        )
      ),
      this.state.isPopoverVisible ? this.getPopover() : null,
      this.state.isViewVisible ? this.getView() : null
    );
  };

  return HierarchySelectorComboBox;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onClickHandler = function () {
    _this3.setPopoverVisibility(!_this3.state.isPopoverVisible);
  };

  this.onInputFocus = function () {
    _this3.inputElement.blur();
  };

  this.onSelectHandler = function (selectedItem, checkedOutput) {
    _this3.setState({
      selected: selectedItem,
      isPopoverVisible: false,
      isViewVisible: false
    });
    var items = checkedOutput ? checkedOutput.map(function (item) {
      return Object.assign({}, item);
    }) : [];

    _this3.props.onSelect(items);
  };

  this.onPopoverBlur = function () {
    if (_this3.props.hideOnPopoverBlur) {
      _this3.popoverShouldBeHidden();
    }
  };

  this.onShouldOpenView = function () {
    _this3.setState({ isViewVisible: true });
  };

  this.onShouldClosePopover = function () {
    _this3.setState({
      isPopoverVisible: false
    });
  };

  this.onCanceledView = function () {
    _this3.setState({
      isPopoverVisible: false,
      isViewVisible: false
    });
  };

  this.onSelectedInView = function (groupName, selectedItems, checkedOutput) {
    var selectedItem = {
      name: groupName,
      items: selectedItems
    };
    _this3.setState({
      preCheckedItems: checkedOutput
    });
    _this3.onSelectHandler(selectedItem, checkedOutput);
  };

  this.onSelectedInPopover = function (selectedItem) {
    _this3.uncheckAllItems();
    var checkedOutput = selectedItem && Array.isArray(selectedItem.items) ? selectedItem.items.map(function (item) {
      return {
        id: item.id,
        name: item.name,
        level: 0,
        parentId: null,
        parentIds: [],
        isCheckedAll: false,
        isChildren: false
      };
    }) : [];
    _this3.onSelectHandler(selectedItem, checkedOutput);
  };

  this.getInputText = function () {
    var selectionText = '';

    if (_this3.state.selected && _this3.state.selected.items && _this3.state.selected.items.length > 0) {
      selectionText = _this3.state.selected.name;
    }
    return selectionText;
  };

  this.getView = function () {
    var options = _this3.props.viewOptions;
    var preCheckedItems = Array.isArray(_this3.state.preCheckedItems) ? _this3.state.preCheckedItems.slice() : null;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__view__["a" /* default */], _extends({
      dataSourceProvider: _this3.props.dataSourceProvider
    }, options, {
      onCancel: _this3.onCanceledView,
      onSelect: _this3.onSelectedInView,
      groupName: _this3.state.selected ? _this3.state.selected.name : '',
      preCheckedItems: preCheckedItems
    }));
  };

  this.getPopover = function () {
    var options = _this3.props.popoverOptions;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__popover__["a" /* default */], _extends({
      dataSourceProvider: _this3.props.dataSourceProvider,
      onComponentBlur: _this3.onPopoverBlur,
      onSelect: _this3.onSelectedInPopover,
      onShouldOpenView: _this3.onShouldOpenView,
      onShouldClosePopover: _this3.onShouldClosePopover
    }, options));
  };

  this.getToolTip = function (content) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Tooltip"],
      { id: 'tooltip', className: 'hs-combo-box-tooltip' },
      content
    );
  };

  this.getDefaultToolTipContent = function () {
    if (!_this3.isSelectedItems()) return _this3.props.noSelectionText;
    var totalCount = _this3.state.selected.items.length;
    var count = totalCount > __WEBPACK_IMPORTED_MODULE_10__constants__["a" /* MAX_COUNT_OF_TOOLTIP_ITEMS */] ? __WEBPACK_IMPORTED_MODULE_10__constants__["a" /* MAX_COUNT_OF_TOOLTIP_ITEMS */] : totalCount;

    var items = _this3.state.selected.items.slice(0, count);
    var elements = Object.keys(items).map(function (i) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { key: i },
        items[i].name
      );
    });

    if (count < totalCount) elements.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      { key: count },
      '. . .'
    ));

    return elements;
  };

  this.getCountOfSelectedItems = function () {
    return _this3.isSelectedItems() ? _this3.state.selected.items.length : 0;
  };

  this.setPopoverVisibility = function (isVisible) {
    _this3.setState({ isPopoverVisible: isVisible });
  };

  this.isSelectedItems = function () {
    return _this3.state.selected && _this3.state.selected.items && _this3.state.selected.items.length > 0;
  };

  this.loadData = function (props) {
    props.dataSourceProvider.loadData().then(function () {
      _this3.setState({
        needToLoadData: false
      });
    });
  };

  this.popoverShouldBeHidden = function () {
    setTimeout(function () {
      if (_this3.state.isPopoverVisible) _this3.setPopoverVisibility(false);
    }, 150);
  };

  this.uncheckAllItems = function () {
    _this3.setState({
      preCheckedItems: []
    });
  };

  this.updatePrechecked = function (props) {
    var dataSourceProvider = props.dataSourceProvider,
        preCheckedGroupName = props.preCheckedGroupName,
        preCheckedItems = props.preCheckedItems;


    dataSourceProvider.setPrecheckedItems(preCheckedItems);

    var checkedOutput = dataSourceProvider.getCheckedOutput();
    var selectedItems = dataSourceProvider.getAllCheckedItems();
    var checked = checkedOutput.checked || [];

    _this3.setState({
      needToUpdatePreChecked: false
    });

    _this3.onSelectedInView(preCheckedGroupName, selectedItems, checked);
  };
}, _temp);



HierarchySelectorComboBox.propTypes = {
  dataSourceProvider: __WEBPACK_IMPORTED_MODULE_4__services_types__["a" /* dataSourceProviderType */].isRequired,
  hideOnPopoverBlur: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  inputName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  noSelectionText: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  popoverVisible: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  popoverOptions: __WEBPACK_IMPORTED_MODULE_5__types__["d" /* popoverOptionsType */].isRequired,
  preCheckedItems: __WEBPACK_IMPORTED_MODULE_5__types__["e" /* preCheckedItemsListShape */],
  preCheckedGroupName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  tooltipPlacement: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  viewOptions: __WEBPACK_IMPORTED_MODULE_5__types__["g" /* viewOptionsType */].isRequired,
  onSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

HierarchySelectorComboBox.defaultProps = {
  hideOnPopoverBlur: true,
  inputName: '',
  noSelectionText: 'No one selected...',
  popoverVisible: false,
  preCheckedItems: null,
  preCheckedGroupName: 'Default group',
  tooltipPlacement: 'bottom',
  onSelect: function onSelect() {}
};

/***/ }),

/***/ "./components/combo-box/combo-box.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/combo-box/combo-box.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./combo-box.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./combo-box.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/combo-box/constants.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TOOLTIP_DELAY_MS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MAX_COUNT_OF_TOOLTIP_ITEMS; });
/* unused harmony export SPINNER_DELAY */
var TOOLTIP_DELAY_MS = 60;
var MAX_COUNT_OF_TOOLTIP_ITEMS = 10;
var SPINNER_DELAY = 50;

/***/ }),

/***/ "./components/popover/abstract-list.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HierarchySelectorAbstractList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var HierarchySelectorAbstractList = function (_React$PureComponent) {
  _inherits(HierarchySelectorAbstractList, _React$PureComponent);

  function HierarchySelectorAbstractList() {
    var _temp, _this, _ret;

    _classCallCheck(this, HierarchySelectorAbstractList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onSelect = function () {
      /** Template of onSelect event. It should be overridden in a child component */
      _this.props.onSelectHandler();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return HierarchySelectorAbstractList;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




HierarchySelectorAbstractList.propTypes = {
  onSelectHandler: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

HierarchySelectorAbstractList.defaultProps = {
  onSelectHandler: function onSelectHandler() {}
};

/***/ }),

/***/ "./components/popover/constants.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLASS_NAME_SEARCH_FOCUSABLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return KEYS; });
var CLASS_NAME_SEARCH_FOCUSABLE = 'search-focusable';
var KEYS = {
  UP: 38,
  DOWN: 40
};

/***/ }),

/***/ "./components/popover/event-handlers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./components/popover/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



function getFocusableFoundElements(target) {
  return Array.prototype.slice.call(target.getElementsByClassName(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* CLASS_NAME_SEARCH_FOCUSABLE */]));
}

function calculateNewIndex(key, index, listLength) {
  var i = index;
  switch (key) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* KEYS */].UP:
      i -= 1;
      break;
    case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* KEYS */].DOWN:
      i += 1;
      break;
    default:
  }

  return function (ind, min, max) {
    if (ind < min) return max;
    if (ind > max) return min;

    return ind;
  }(i, 0, listLength - 1);
}

var EventHandler = function () {
  function EventHandler() {
    _classCallCheck(this, EventHandler);
  }

  EventHandler.searchElementFocusHanlder = function searchElementFocusHanlder(event) {
    var key = event.keyCode;

    if (!key || key !== __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* KEYS */].UP && key !== __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* KEYS */].DOWN) return;

    var allFoundItems = getFocusableFoundElements(event.currentTarget);

    if (allFoundItems.length === 0) return;

    var _document = document,
        activeElement = _document.activeElement;

    var index = allFoundItems.findIndex(function (i) {
      return i === activeElement;
    });
    index = calculateNewIndex(key, index, allFoundItems.length);

    allFoundItems[index].focus();
  };

  return EventHandler;
}();



/***/ }),

/***/ "./components/popover/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popover_component__ = __webpack_require__("./components/popover/popover.component.jsx");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__popover_component__["a" /* default */]);

/***/ }),

/***/ "./components/popover/layouts/common.layout.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HSPopoverCommonLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var HSPopoverCommonLayout = function (_React$PureComponent) {
  _inherits(HSPopoverCommonLayout, _React$PureComponent);

  function HSPopoverCommonLayout() {
    _classCallCheck(this, HSPopoverCommonLayout);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HSPopoverCommonLayout.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-hierarchy-selector-popover-layout' },
      this.props.children
    );
  };

  return HSPopoverCommonLayout;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




HSPopoverCommonLayout.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
};

HSPopoverCommonLayout.defaultProps = {
  children: null
};

/***/ }),

/***/ "./components/popover/layouts/spinner.layout.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HSSpinnerLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spinner__ = __webpack_require__("./components/spinner/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_layout__ = __webpack_require__("./components/popover/layouts/common.layout.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var HSSpinnerLayout = function (_React$PureComponent) {
  _inherits(HSSpinnerLayout, _React$PureComponent);

  function HSSpinnerLayout() {
    _classCallCheck(this, HSSpinnerLayout);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HSSpinnerLayout.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2__common_layout__["a" /* default */],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__spinner__["a" /* default */], null)
    );
  };

  return HSSpinnerLayout;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);



/***/ }),

/***/ "./components/popover/pinned-list.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HierarchySelectorPinnedList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_list_component__ = __webpack_require__("./components/popover/abstract-list.component.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var HierarchySelectorPinnedList = function (_HierarchySelectorAbs) {
  _inherits(HierarchySelectorPinnedList, _HierarchySelectorAbs);

  function HierarchySelectorPinnedList() {
    _classCallCheck(this, HierarchySelectorPinnedList);

    return _possibleConstructorReturn(this, _HierarchySelectorAbs.apply(this, arguments));
  }

  HierarchySelectorPinnedList.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { className: 'list-group-header' },
        this.props.pinnedGroupLabel
      )
    );
  };

  return HierarchySelectorPinnedList;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_list_component__["a" /* default */]);




HierarchySelectorPinnedList.propTypes = {
  pinnedGroupLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element])
};

HierarchySelectorPinnedList.defaultProps = {
  pinnedGroupLabel: 'Pinned items'
};

/***/ }),

/***/ "./components/popover/popover.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HierarchySelectorPopover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_types__ = __webpack_require__("./services/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_search__ = __webpack_require__("./models/search.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_group_entity__ = __webpack_require__("./models/group.entity.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layouts_common_layout__ = __webpack_require__("./components/popover/layouts/common.layout.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__layouts_spinner_layout__ = __webpack_require__("./components/popover/layouts/spinner.layout.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__select_btn_component__ = __webpack_require__("./components/popover/select-btn.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__search_search_content_component__ = __webpack_require__("./components/popover/search/search-content.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pinned_list_component__ = __webpack_require__("./components/popover/pinned-list.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__recent_list_component__ = __webpack_require__("./components/popover/recent-list.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__event_handlers__ = __webpack_require__("./components/popover/event-handlers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__constants__ = __webpack_require__("./components/popover/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__search_bar__ = __webpack_require__("./components/search-bar/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__utils__ = __webpack_require__("./utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__popover_scss__ = __webpack_require__("./components/popover/popover.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__popover_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__popover_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */




















var HierarchySelectorPopover = function (_React$PureComponent) {
  _inherits(HierarchySelectorPopover, _React$PureComponent);

  function HierarchySelectorPopover(props) {
    _classCallCheck(this, HierarchySelectorPopover);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onFocusOutHandler = function (e) {
      if (!__WEBPACK_IMPORTED_MODULE_14__utils__["a" /* default */].isFocusOnCurrentTarget(e)) _this.props.onComponentBlur();
    };

    _this.onSearchChangeHandler = function (e) {
      var searchingValue = e.target ? e.target.value || '' : '';
      var searchingFor = '';

      if (__WEBPACK_IMPORTED_MODULE_14__utils__["a" /* default */].enoughSearchTextLength(searchingValue)) {
        searchingFor = searchingValue;
      }
      _this.setState({ searchingFor: searchingFor });
    };

    _this.onSelectHandler = function (data) {
      var model = null;

      if (data) {
        var groupName = data.name ? data.name : 'Undefined';
        var items = Array.isArray(data) ? data : [data];
        model = new __WEBPACK_IMPORTED_MODULE_4__models_group_entity__["a" /* default */](groupName, items);
      }
      _this.props.onSelect(model);
    };

    _this.onKeyDownHanlder = function (e) {
      __WEBPACK_IMPORTED_MODULE_11__event_handlers__["a" /* default */].searchElementFocusHanlder(e);
    };

    _this.getSearchElement = function () {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__search_bar__["a" /* default */], {
        inputClassName: __WEBPACK_IMPORTED_MODULE_12__constants__["a" /* CLASS_NAME_SEARCH_FOCUSABLE */],
        searchPlaceHolder: _this.props.searchPlaceHolder,
        onSearchChange: _this.onSearchChangeHandler,
        onCloseClick: _this.props.onShouldClosePopover
      });
    };

    _this.getLists = function () {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__select_btn_component__["a" /* default */], { label: _this.props.btnOpenViewLabel, onClick: _this.props.onShouldOpenView }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__pinned_list_component__["a" /* default */], { pinnedGroupLabel: _this.props.pinnedGroupLabel }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__recent_list_component__["a" /* default */], { recentGroupLabel: _this.props.recentGroupLabel })
      );
    };

    _this.getSearchLayout = function () {
      var searchModel = new __WEBPACK_IMPORTED_MODULE_3__models_search__["a" /* default */](_this.props.dataSourceProvider);
      var foundItems = searchModel.getFoundFromHierarchy(_this.state.searchingFor);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__search_search_content_component__["a" /* default */], {
        foundItems: foundItems,
        onSelect: function onSelect(data) {
          return _this.onSelectHandler(data);
        }
      });
    };

    _this.getMainLayout = function () {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5__layouts_common_layout__["a" /* default */],
        null,
        _this.getSearchElement(),
        _this.state.searchingFor !== '' ? _this.getSearchLayout() : _this.getLists()
      );
    };

    _this.state = {
      isDataLoaded: props.dataSourceProvider.isLoaded,
      searchingFor: ''
    };
    return _this;
  }

  HierarchySelectorPopover.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    if (!this.state.isDataLoaded) {
      this.props.dataSourceProvider.loadData().then(function () {
        _this2.setState({ isDataLoaded: true });
      });
    }
  };

  HierarchySelectorPopover.prototype.componentDidMount = function componentDidMount() {
    this.mainElement.focus();
    this.mainElement.addEventListener('focusout', this.onFocusOutHandler);
  };

  HierarchySelectorPopover.prototype.componentWillUnmount = function componentWillUnmount() {
    this.mainElement.removeEventListener('focusout', this.onFocusOutHandler);
  };

  HierarchySelectorPopover.prototype.render = function render() {
    var _this3 = this;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        className: 'oc-hierarchy-selector-popover',
        tabIndex: '0',
        ref: function ref(el) {
          _this3.mainElement = el;
        }
      },
      this.state.isDataLoaded ? this.getMainLayout() : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__layouts_spinner_layout__["a" /* default */], null)
    );
  };

  return HierarchySelectorPopover;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




HierarchySelectorPopover.propTypes = {
  dataSourceProvider: __WEBPACK_IMPORTED_MODULE_2__services_types__["a" /* dataSourceProviderType */].isRequired,
  onComponentBlur: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onShouldOpenView: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onShouldClosePopover: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  btnOpenViewLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  searchPlaceHolder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  pinnedGroupLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  recentGroupLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element])
};

HierarchySelectorPopover.defaultProps = {
  onComponentBlur: function onComponentBlur() {},
  onSelect: function onSelect() {},
  onShouldOpenView: function onShouldOpenView() {},
  onShouldClosePopover: function onShouldClosePopover() {},
  btnOpenViewLabel: 'Select...',
  searchPlaceHolder: 'Search...',
  pinnedGroupLabel: 'Pinned items',
  recentGroupLabel: 'Recently used'
};

/***/ }),

/***/ "./components/popover/popover.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/popover/popover.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./popover.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./popover.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/popover/recent-list.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HierarchySelectorRecentList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_list_component__ = __webpack_require__("./components/popover/abstract-list.component.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var HierarchySelectorRecentList = function (_HierarchySelectorAbs) {
  _inherits(HierarchySelectorRecentList, _HierarchySelectorAbs);

  function HierarchySelectorRecentList() {
    _classCallCheck(this, HierarchySelectorRecentList);

    return _possibleConstructorReturn(this, _HierarchySelectorAbs.apply(this, arguments));
  }

  HierarchySelectorRecentList.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { className: 'list-group-header' },
        this.props.recentGroupLabel
      )
    );
  };

  return HierarchySelectorRecentList;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_list_component__["a" /* default */]);




HierarchySelectorRecentList.propTypes = {
  recentGroupLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element])
};

HierarchySelectorRecentList.defaultProps = {
  recentGroupLabel: 'Recently used'
};

/***/ }),

/***/ "./components/popover/search/found-items.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverFoundItems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_list__ = __webpack_require__("../node_modules/react-list/react-list.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_caret_right__ = __webpack_require__("../node_modules/react-icons/lib/fa/caret-right.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_caret_right___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_caret_right__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_caret_down__ = __webpack_require__("../node_modules/react-icons/lib/fa/caret-down.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_caret_down___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_caret_down__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__types__ = __webpack_require__("./types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__("./components/popover/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */










var PopoverFoundItems = function (_React$PureComponent) {
  _inherits(PopoverFoundItems, _React$PureComponent);

  function PopoverFoundItems(props) {
    _classCallCheck(this, PopoverFoundItems);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onGroupClickHanlder = function (e) {
      e.preventDefault();
      _this.toggleCollapse();
    };

    _this.onClickHanlder = function (e, key) {
      e.preventDefault();
      _this.selectItem(key);
    };

    _this.onEnterPressed = function (e, key) {
      if (e.keyCode === 13) {
        e.preventDefault();
        _this.selectItem(key);
      }
    };

    _this.getItems = function () {
      var data = _this.props.data;


      var itemRenderer = function itemRenderer(index, key) {
        var item = data[index];
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            className: 'list-group-item found-item ' + __WEBPACK_IMPORTED_MODULE_6__constants__["a" /* CLASS_NAME_SEARCH_FOCUSABLE */],
            key: key,
            tabIndex: '0',
            onKeyDown: function onKeyDown(e) {
              return _this.onEnterPressed(e, index);
            },
            onClick: function onClick(e) {
              return _this.onClickHanlder(e, index);
            }
          },
          item.name
        );
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_list___default.a, {
        itemRenderer: itemRenderer,
        length: data.length,
        type: 'uniform',
        useStaticSize: true
      });
    };

    _this.getIcon = function () {
      return _this.state.collapsed ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_caret_right___default.a, null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_caret_down___default.a, null);
    };

    _this.selectItem = function (key) {
      _this.props.onSelect(_this.props.data[key]);
    };

    _this.toggleCollapse = function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    };

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  PopoverFoundItems.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'li',
      { className: 'list-group-item found-group-item', onClick: this.onGroupClickHanlder },
      this.getIcon(),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        this.props.groupName
      ),
      !this.state.collapsed && this.props.data.length > 0 ? this.getItems() : null
    );
  };

  return PopoverFoundItems;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




PopoverFoundItems.propTypes = {
  onSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  groupName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  data: __WEBPACK_IMPORTED_MODULE_5__types__["b" /* hierarchyItemListShape */]
};

PopoverFoundItems.defaultProps = {
  onSelect: function onSelect() {},
  data: []
};

/***/ }),

/***/ "./components/popover/search/search-content.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverSearchContent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__found_items_component__ = __webpack_require__("./components/popover/search/found-items.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types__ = __webpack_require__("./types.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var PopoverSearchContent = function (_React$PureComponent) {
  _inherits(PopoverSearchContent, _React$PureComponent);

  function PopoverSearchContent() {
    var _temp, _this, _ret;

    _classCallCheck(this, PopoverSearchContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.getFoundItems = function () {
      var foundItems = _this.props.foundItems;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          className: 'oc-hierarchy-selector-popover-search-content',
          ref: function ref(el) {
            _this.mainElement = el;
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'ul',
          { className: 'list-group' },
          Object.keys(foundItems).map(function (key) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__found_items_component__["a" /* default */], {
              key: foundItems[key].name,
              groupName: foundItems[key].name,
              data: foundItems[key].items,
              onSelect: function onSelect(data) {
                return _this.props.onSelect(data);
              }
            });
          })
        )
      );
    }, _this.getMessage = function (message) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { className: 'message warning' },
        message
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PopoverSearchContent.prototype.render = function render() {
    if (this.props.foundItems.length === 0) {
      return this.getMessage(this.props.noMatchesLabel);
    } else if (this.props.foundItems.length > 100) {
      return this.getMessage(this.props.tooMuchMatchesLabel);
    }

    return this.getFoundItems();
  };

  return PopoverSearchContent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




PopoverSearchContent.propTypes = {
  onSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  foundItems: __WEBPACK_IMPORTED_MODULE_3__types__["a" /* foundItemsShape */],
  noMatchesLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  tooMuchMatchesLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

PopoverSearchContent.defaultProps = {
  onSelect: function onSelect() {},
  foundItems: [],
  noMatchesLabel: 'No matches',
  tooMuchMatchesLabel: 'Too much matches found, refine search.'
};

/***/ }),

/***/ "./components/popover/select-btn.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HierarchySelectorSelectButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var HierarchySelectorSelectButton = function (_React$PureComponent) {
  _inherits(HierarchySelectorSelectButton, _React$PureComponent);

  function HierarchySelectorSelectButton() {
    _classCallCheck(this, HierarchySelectorSelectButton);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HierarchySelectorSelectButton.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'ul',
      { className: 'list-group' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        { className: 'list-group-item' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { className: 'btn-open-view', onClick: this.props.onClick },
          this.props.label
        )
      )
    );
  };

  return HierarchySelectorSelectButton;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




HierarchySelectorSelectButton.propTypes = {
  label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

HierarchySelectorSelectButton.defaultProps = {
  label: 'Select...',
  onClick: function onClick() {}
};

/***/ }),

/***/ "./components/search-bar/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search_bar_component__ = __webpack_require__("./components/search-bar/search-bar.component.jsx");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__search_bar_component__["a" /* default */]);

/***/ }),

/***/ "./components/search-bar/search-bar.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__("../node_modules/classnames/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_search__ = __webpack_require__("../node_modules/react-icons/lib/fa/search.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_search___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_search__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_icons_lib_fa_close__ = __webpack_require__("../node_modules/react-icons/lib/fa/close.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_icons_lib_fa_close___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_icons_lib_fa_close__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_bar_scss__ = __webpack_require__("./components/search-bar/search-bar.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_bar_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__search_bar_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */










var SearchBar = function (_React$PureComponent) {
  _inherits(SearchBar, _React$PureComponent);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onInputBlurHandler = function () {
      _this.setState({ focused: false });
    };

    _this.onInputFocusHandler = function () {
      _this.setState({ focused: true });
    };

    _this.onChangeHandler = function (e) {
      var searchingFor = e.target ? e.target.value || '' : '';
      _this.setState({ searchingFor: searchingFor });
      _this.props.onSearchChange(e);
    };

    _this.onCloseHandler = function () {
      _this.setState({
        searchingFor: ''
      });
      _this.props.onCloseClick();
    };

    _this.getClassNames = function () {
      return __WEBPACK_IMPORTED_MODULE_2_classnames___default()({
        'oc-hierarchy-selector-search-bar': true,
        focused: _this.state.focused
      });
    };

    _this.getIcon = function () {
      var icon = _this.isSearchingForEmpty() ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'search-component-icon' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_search___default.a, null)
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'search-component-icon clickable', onClick: _this.onCloseHandler },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_icons_lib_fa_close___default.a, null)
      );

      return icon;
    };

    _this.isSearchingForEmpty = function () {
      return _this.state.searchingFor.trim() === '';
    };

    _this.state = {
      focused: false,
      searchingFor: ''
    };
    return _this;
  }

  SearchBar.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: this.getClassNames() },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["FormControl"], {
        className: this.props.inputClassName,
        onBlur: this.onInputBlurHandler,
        onFocus: this.onInputFocusHandler,
        onChange: this.onChangeHandler,
        placeholder: this.props.searchPlaceHolder,
        value: this.state.searchingFor
      }),
      this.getIcon()
    );
  };

  return SearchBar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




SearchBar.propTypes = {
  inputClassName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  onSearchChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onCloseClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  searchPlaceHolder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

SearchBar.defaultProps = {
  inputClassName: '',
  onSearchChange: function onSearchChange() {},
  onCloseClick: function onCloseClick() {},
  searchPlaceHolder: 'Search...'
};

/***/ }),

/***/ "./components/search-bar/search-bar.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/search-bar/search-bar.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./search-bar.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./search-bar.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/selectable-list/checkbox.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemCheckbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_check_square_o__ = __webpack_require__("../node_modules/react-icons/lib/fa/check-square-o.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_check_square_o___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_check_square_o__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_check_square__ = __webpack_require__("../node_modules/react-icons/lib/fa/check-square.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_check_square___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_check_square__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_square_o__ = __webpack_require__("../node_modules/react-icons/lib/fa/square-o.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_square_o___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_square_o__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */







var ItemCheckbox = function (_React$PureComponent) {
  _inherits(ItemCheckbox, _React$PureComponent);

  function ItemCheckbox(props) {
    _classCallCheck(this, ItemCheckbox);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getIcon = function () {
      var icon = null;
      if (_this.state.checked) {
        icon = _this.props.disabled ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_check_square_o___default.a, null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_check_square___default.a, null);
      } else if (!_this.state.checked && !_this.props.disabled) {
        icon = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_square_o___default.a, null);
      }

      return icon;
    };

    _this.clickHandler = function () {
      if (!_this.props.disabled) {
        var newCheckedState = !_this.state.checked;
        _this.setState({
          checked: newCheckedState
        });
        _this.props.onCheck(newCheckedState);
      }
    };

    _this.state = {
      checked: props.checked
    };
    return _this;
  }

  ItemCheckbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.setState.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  };

  ItemCheckbox.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-list-item-checkbox', onClick: this.clickHandler },
      this.getIcon()
    );
  };

  return ItemCheckbox;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




ItemCheckbox.propTypes = {
  disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  checked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onCheck: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

ItemCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  onCheck: function onCheck() {}
};

/***/ }),

/***/ "./components/selectable-list/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selectable_list_component__ = __webpack_require__("./components/selectable-list/selectable-list.component.jsx");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__selectable_list_component__["a" /* default */]);

/***/ }),

/***/ "./components/selectable-list/list-item.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__("../node_modules/classnames/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkbox_component__ = __webpack_require__("./components/selectable-list/checkbox.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__("./types.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */








function defaultItemRenderFunction(item) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    null,
    item.name
  );
}

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    var _temp, _this, _ret;

    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.clickHandler = function (event) {
      _this.props.onClick(_this.props.item.id, event);
    }, _this.checkHandler = function (checkState) {
      _this.props.onCheck(_this.props.item.id, checkState);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ListItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _props = this.props,
        checked = _props.checked,
        checkDisabled = _props.checkDisabled,
        selected = _props.selected,
        item = _props.item;


    if (checked !== nextProps.checked) return true;
    if (checkDisabled !== nextProps.checkDisabled) return true;
    if (selected !== nextProps.selected) return true;
    if (item !== nextProps.item || item.id !== nextProps.item.id) return true;

    return false;
  };

  ListItem.prototype.render = function render() {
    var names = __WEBPACK_IMPORTED_MODULE_2_classnames___default()({
      'oc-selectable-list-item': true,
      selected: this.props.selected
    });
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: names, onClick: this.clickHandler },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-selectable-list-item-container' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__checkbox_component__["a" /* default */], {
          disabled: this.props.checkDisabled,
          onCheck: this.checkHandler,
          checked: this.props.checked
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'oc-list-item-text-container' },
          this.props.itemRenderFunction ? this.props.itemRenderFunction(this.props.item, defaultItemRenderFunction) : defaultItemRenderFunction(this.props.item)
        )
      )
    );
  };

  return ListItem;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);




ListItem.propTypes = {
  checked: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  checkDisabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  item: __WEBPACK_IMPORTED_MODULE_4__types__["c" /* hierarchyItemShape */].isRequired,
  itemRenderFunction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  selected: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onCheck: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

ListItem.defaultProps = {
  checked: false,
  checkDisabled: false,
  itemRenderFunction: null,
  selected: false,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};

/***/ }),

/***/ "./components/selectable-list/selectable-list.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectableList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_list__ = __webpack_require__("../node_modules/react-list/react-list.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_item_component__ = __webpack_require__("./components/selectable-list/list-item.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__("./types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectable_list_scss__ = __webpack_require__("./components/selectable-list/selectable-list.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectable_list_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__selectable_list_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var SelectableList = function (_React$PureComponent) {
  _inherits(SelectableList, _React$PureComponent);

  function SelectableList() {
    var _temp, _this, _ret;

    _classCallCheck(this, SelectableList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.itemRenderer = function (index, key) {
      var _this$props = _this.props,
          items = _this$props.items,
          checkDisabled = _this$props.checkDisabled;

      var item = items[index];
      var isChildren = item.children && item.children.length > 0;
      var checked = _this.props.checkedAll || _this.props.checkedIds.indexOf(item.id) !== -1;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__list_item_component__["a" /* default */], {
        key: '' + key,
        checked: checked,
        checkDisabled: checkDisabled || isChildren,
        item: item,
        itemRenderFunction: _this.props.itemRenderFunction,
        selected: _this.props.selectedId === String(item.id),
        onCheck: _this.props.onCheck,
        onClick: _this.props.onClick
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SelectableList.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-selectable-list-wrapper' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_list___default.a, {
          itemRenderer: this.itemRenderer,
          length: this.props.items.length,
          type: 'uniform',
          useStaticSize: true
        })
      )
    );
  };

  return SelectableList;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




SelectableList.propTypes = {
  checkedAll: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  items: __WEBPACK_IMPORTED_MODULE_4__types__["b" /* hierarchyItemListShape */],
  itemRenderFunction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  checkedIds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number),
  checkDisabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  selectedId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  onCheck: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

SelectableList.defaultProps = {
  checkedAll: false,
  items: [],
  itemRenderFunction: null,
  checkedIds: [],
  checkDisabled: false,
  selectedId: null,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};

/***/ }),

/***/ "./components/selectable-list/selectable-list.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/selectable-list/selectable-list.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./selectable-list.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./selectable-list.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/spinner/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spinner_component__ = __webpack_require__("./components/spinner/spinner.component.jsx");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__spinner_component__["a" /* default */]);

/***/ }),

/***/ "./components/spinner/spinner.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectorSpinner; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__opuscapita_react_spinner__ = __webpack_require__("../node_modules/@opuscapita/react-spinner/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__opuscapita_react_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__opuscapita_react_spinner__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DELAY = 50;

var SelectorSpinner = function (_React$PureComponent) {
  _inherits(SelectorSpinner, _React$PureComponent);

  function SelectorSpinner() {
    _classCallCheck(this, SelectorSpinner);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  SelectorSpinner.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__opuscapita_react_spinner__["Spinner"], { delay: DELAY });
  };

  return SelectorSpinner;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);



/***/ }),

/***/ "./components/view/column/column.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewColumn; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectable_list__ = __webpack_require__("./components/selectable-list/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_column_column_data__ = __webpack_require__("./models/column/column-data.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__column_scss__ = __webpack_require__("./components/view/column/column.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__column_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__column_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var ViewColumn = function (_React$PureComponent) {
  _inherits(ViewColumn, _React$PureComponent);

  function ViewColumn(props) {
    _classCallCheck(this, ViewColumn);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.clickHandler = function (id, event) {
      _this.props.onClick(_this.props.index, id, event);
    };

    _this.checkHandler = function (id, checkState) {
      _this.props.onCheck(_this.props.referenceIds.slice(), id, checkState);
    };

    _this.checkAllHandler = function () {
      var newState = !_this.state.checkedAll;
      _this.props.onCheckAll(_this.props.referenceIds.slice(), newState);
      _this.setState({
        checkedAll: newState
      });
    };

    _this.renderWrapperFunction = function (index) {
      return function (item, defaultRenderFunction) {
        return _this.props.itemRenderFunction(index, item, defaultRenderFunction);
      };
    };

    _this.state = {
      checkedAll: _this.props.checkedAll
    };
    return _this;
  }

  ViewColumn.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedAll !== this.props.checkedAll) {
      this.setState({
        checkedAll: nextProps.checkedAll
      });
    }
  };

  ViewColumn.prototype.render = function render() {
    // TODO: 'All' text should be passed here to show translated text.
    var disabledProperty = this.props.checkedAllDisabled ? { disabled: true } : null;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-hierarchy-selector-column' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-hierarchy-selector-column-all' },
        !this.props.checkedAllHidden ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Checkbox"],
          _extends({
            onChange: this.checkAllHandler,
            checked: this.state.checkedAll
          }, disabledProperty),
          this.props.allLabel
        ) : null
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__selectable_list__["a" /* default */], {
        checkedAll: this.props.checkedAll,
        checkDisabled: this.state.checkedAll,
        checkedIds: this.props.checkedIds,
        items: this.props.data.items,
        itemRenderFunction: this.props.itemRenderFunction ? this.renderWrapperFunction(this.props.index) : null,
        selectedId: this.props.selectedId,
        onCheck: this.checkHandler,
        onClick: this.clickHandler
      })
    );
  };

  return ViewColumn;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




ViewColumn.propTypes = {
  allLabel: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.element]),
  checkedIds: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number),
  checkedAll: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  checkedAllDisabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  checkedAllHidden: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  index: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number.isRequired,
  itemRenderFunction: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  data: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.instanceOf(__WEBPACK_IMPORTED_MODULE_4__models_column_column_data__["a" /* default */]),
  selectedId: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  referenceIds: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number])),
  onCheck: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  onCheckAll: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  onClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

ViewColumn.defaultProps = {
  allLabel: 'All',
  checkedAll: false,
  checkedAllDisabled: false,
  checkedAllHidden: false,
  data: new __WEBPACK_IMPORTED_MODULE_4__models_column_column_data__["a" /* default */](),
  itemRenderFunction: null,
  selectedId: null,
  referenceIds: [],
  onCheck: function onCheck() {},
  onCheckAll: function onCheckAll() {},
  onClick: function onClick() {},
  checkedIds: []
};

/***/ }),

/***/ "./components/view/column/column.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/column/column.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../../node_modules/sass-loader/lib/loader.js!./column.scss", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../../node_modules/sass-loader/lib/loader.js!./column.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/view/group-name/group-name.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupName; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__group_name_scss__ = __webpack_require__("./components/view/group-name/group-name.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__group_name_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__group_name_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var GroupName = function (_React$PureComponent) {
  _inherits(GroupName, _React$PureComponent);

  function GroupName(props) {
    _classCallCheck(this, GroupName);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.changeHandler = function (e) {
      _this.setState({
        changedByUser: true,
        value: e.target.value
      });
      _this.props.onChange(e.target.value);
    };

    _this.state = {
      changedByUser: props.initialValue.trim() !== '',
      value: props.initialValue
    };
    return _this;
  }

  GroupName.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.changedByUser) {
      var newValue = nextProps.initialValue;
      this.setState({
        value: newValue
      });
    }
  };

  GroupName.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-hierarchy-selector-group-name-wrapper' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        null,
        this.props.label
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["FormControl"], {
        type: 'text',
        placeholder: this.props.placeHolder,
        onChange: this.changeHandler,
        value: this.state.value
      })
    );
  };

  return GroupName;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




GroupName.propTypes = {
  label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  placeHolder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  initialValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

GroupName.defaultProps = {
  label: 'Group name',
  placeHolder: 'Please, fill a group name',
  initialValue: '',
  onChange: function onChange() {}
};

/***/ }),

/***/ "./components/view/group-name/group-name.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/group-name/group-name.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../../node_modules/sass-loader/lib/loader.js!./group-name.scss", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../../node_modules/sass-loader/lib/loader.js!./group-name.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/view/group-name/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__group_name_component__ = __webpack_require__("./components/view/group-name/group-name.component.jsx");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__group_name_component__["a" /* default */]);

/***/ }),

/***/ "./components/view/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view_component__ = __webpack_require__("./components/view/view.component.jsx");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__view_component__["a" /* default */]);

/***/ }),

/***/ "./components/view/selected-items/group.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_trash__ = __webpack_require__("../node_modules/react-icons/lib/fa/trash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_trash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_trash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_caret_right__ = __webpack_require__("../node_modules/react-icons/lib/fa/caret-right.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_caret_right___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_caret_right__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_caret_down__ = __webpack_require__("../node_modules/react-icons/lib/fa/caret-down.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_caret_down___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_caret_down__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__badge__ = __webpack_require__("./components/badge/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */









var GroupItem = function (_React$PureComponent) {
  _inherits(GroupItem, _React$PureComponent);

  function GroupItem(props) {
    _classCallCheck(this, GroupItem);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getIcon = function () {
      return _this.state.collapsed ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_caret_right___default.a, null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_icons_lib_fa_caret_down___default.a, null);
    };

    _this.clickHanlder = function (e) {
      e.preventDefault();
      _this.toggleCollapse();
    };

    _this.removeClickHandler = function (e) {
      e.stopPropagation();
      _this.props.onRemoveClick(_this.props.sourceId, _this.props.referenceIds.slice());
    };

    _this.toggleCollapse = function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    };

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  GroupItem.prototype.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: 'component-icon clickable', onClick: this.removeClickHandler },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_trash___default.a, null)
    ) : null;
  };

  GroupItem.prototype.render = function render() {
    var content = !this.state.collapsed ? this.props.children : null;
    var _props = this.props,
        count = _props.count,
        title = _props.title,
        selectedAll = _props.selectedAll;


    var selecteAllContent = selectedAll ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      this.props.allLabel
    ) : null;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'li',
      { className: 'group-list-item', onClick: this.clickHanlder },
      this.getIcon(),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        title
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'right-block' },
        selecteAllContent,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5__badge__["a" /* default */],
          { className: 'badge-orange' },
          count
        ),
        this.getRemoveIcon()
      ),
      content
    );
  };

  return GroupItem;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




GroupItem.propTypes = {
  allLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  count: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  referenceIds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number])),
  removable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  sourceId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  selectedAll: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  onRemoveClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

GroupItem.defaultProps = {
  allLabel: 'All',
  children: null,
  referenceIds: [],
  onRemoveClick: function onRemoveClick() {}
};

/***/ }),

/***/ "./components/view/selected-items/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selected_items_component__ = __webpack_require__("./components/view/selected-items/selected-items.component.jsx");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__selected_items_component__["a" /* default */]);

/***/ }),

/***/ "./components/view/selected-items/item.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_trash__ = __webpack_require__("../node_modules/react-icons/lib/fa/trash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_trash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_trash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types__ = __webpack_require__("./types.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */






var Item = function (_React$PureComponent) {
  _inherits(Item, _React$PureComponent);

  function Item() {
    var _temp, _this, _ret;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.clickHanlder = function (e) {
      e.stopPropagation();
    }, _this.removeClickHandler = function (e) {
      var _this$props = _this.props,
          onRemoveClick = _this$props.onRemoveClick,
          item = _this$props.item,
          sourceId = _this$props.sourceId,
          referenceIds = _this$props.referenceIds;

      e.stopPropagation();
      onRemoveClick(sourceId, referenceIds.slice(), item.id);
    }, _this.defaultItemRenderFunction = function () {
      var item = _this.props.item;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        item.name
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Item.prototype.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: 'component-icon clickable', onClick: this.removeClickHandler },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_icons_lib_fa_trash___default.a, null)
    ) : null;
  };

  Item.prototype.render = function render() {
    var _props = this.props,
        item = _props.item,
        itemRenderFunction = _props.itemRenderFunction;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'selected-item', onClick: this.clickHanlder },
      itemRenderFunction ? itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction(),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'right-block' },
        this.getRemoveIcon()
      )
    );
  };

  return Item;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




Item.propTypes = {
  item: __WEBPACK_IMPORTED_MODULE_3__types__["c" /* hierarchyItemShape */].isRequired,
  itemRenderFunction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  removable: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  sourceId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  referenceIds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number])),
  onRemoveClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

Item.defaultProps = {
  onRemoveClick: function onRemoveClick() {},
  itemRenderFunction: null,
  referenceIds: []
};

/***/ }),

/***/ "./components/view/selected-items/selected-items.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectedItems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_list__ = __webpack_require__("../node_modules/react-list/react-list.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_checked_items_checked_item_hash_list__ = __webpack_require__("./models/checked-items/checked-item-hash-list.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__group_component__ = __webpack_require__("./components/view/selected-items/group.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__item_component__ = __webpack_require__("./components/view/selected-items/item.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selected_items_scss__ = __webpack_require__("./components/view/selected-items/selected-items.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selected_items_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__selected_items_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var SelectedItems = function (_React$PureComponent) {
  _inherits(SelectedItems, _React$PureComponent);

  function SelectedItems(props) {
    _classCallCheck(this, SelectedItems);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getLastUpdateStamp = function (checkedItemHashLists) {
      return checkedItemHashLists.map(function (item) {
        return item.getLastUpdateStamp();
      }).join('-');
    };

    _this.getGroupItem = function (listId, checkedItemsHashList) {
      var list = [];
      Object.keys(checkedItemsHashList).forEach(function (key) {
        var checkedItemsHash = checkedItemsHashList[key];
        var parents = checkedItemsHash.getParents();
        var parentIds = parents.map(function (p) {
          return p.id;
        });
        var checkedItems = checkedItemsHash.getCheckedItems();
        var isCheckedAll = checkedItemsHash.isCheckedAll();
        var isItemRemovable = !isCheckedAll;
        var title = parents.map(function (p) {
          return p.name;
        }).join(' / ');

        var itemRenderer = function itemRenderer(index, itemKey) {
          var selectedItem = checkedItems[index];
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__item_component__["a" /* default */], {
            item: Object.assign({}, selectedItem),
            key: '' + itemKey,
            removable: isItemRemovable,
            referenceIds: parentIds,
            sourceId: listId,
            itemRenderFunction: _this.props.itemRenderFunction,
            onRemoveClick: _this.itemRemoveClickHandler
          });
        };

        list.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__group_component__["a" /* default */],
          {
            allLabel: _this.props.allLabel,
            count: checkedItems ? checkedItems.length : 0,
            key: listId + '-' + key,
            title: title,
            removable: true,
            selectedAll: isCheckedAll,
            referenceIds: parentIds,
            sourceId: listId,
            onRemoveClick: _this.groupRemoveClickHandler
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_list___default.a, {
            itemRenderer: itemRenderer,
            length: checkedItems.length,
            type: 'uniform',
            useStaticSize: true
          })
        ));
      });
      return list;
    };

    _this.getcheckedItemsHashList = function (listId) {
      var checkedItemsHashLists = _this.props.checkedItemLists ? _this.props.checkedItemLists : [];
      return checkedItemsHashLists.find(function (list) {
        return listId === list.getId();
      });
    };

    _this.groupRemoveClickHandler = function (listId, referenceIds) {
      var checkedItemsHashList = _this.getcheckedItemsHashList(listId);
      if (checkedItemsHashList) {
        var parentIds = referenceIds.slice();
        var id = parentIds.pop();
        checkedItemsHashList.removeAll(parentIds, id);
        _this.props.onItemRemove(checkedItemsHashList);
      } else {
        throw new Error('SelectedItems::groupRemoveClickHandler(): No hash list of checked items found');
      }
    };

    _this.itemRemoveClickHandler = function (listId, referenceIds, itemId) {
      var checkedItemsHashList = _this.getcheckedItemsHashList(listId);
      if (checkedItemsHashList) {
        checkedItemsHashList.remove(referenceIds, itemId);
        _this.props.onItemRemove(checkedItemsHashList);
      } else {
        throw new Error('SelectedItems::itemRemoveClickHandler(): No hash list of checked items found');
      }
    };

    _this.state = {
      checkedItemsLastUpdate: 0
    };
    return _this;
  }

  SelectedItems.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedItemLists && nextProps.checkedItemLists.length > 0) {
      var lastUpdated = this.getLastUpdateStamp(nextProps.checkedItemLists);
      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated
        });
      }
    }
  };

  SelectedItems.prototype.render = function render() {
    var _this2 = this;

    var checkedItemsHashLists = this.props.checkedItemLists ? this.props.checkedItemLists : [];

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-hierarchy-selector-selected-items-wrapper' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        null,
        this.props.listLabel
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-hierarchy-selector-selected-items' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'ul',
          { className: 'group-list' },
          checkedItemsHashLists.map(function (list) {
            return _this2.getGroupItem(list.getId(), list.get());
          })
        )
      )
    );
  };

  return SelectedItems;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




SelectedItems.propTypes = {
  allLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  listLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  checkedItemLists: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.instanceOf(__WEBPACK_IMPORTED_MODULE_3__models_checked_items_checked_item_hash_list__["a" /* default */])),
  itemRenderFunction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onItemRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

SelectedItems.defaultProps = {
  allLabel: 'All',
  listLabel: 'Selected items',
  checkedItemLists: null,
  itemRenderFunction: null,
  onItemRemove: function onItemRemove() {}
};

/***/ }),

/***/ "./components/view/selected-items/selected-items.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/selected-items/selected-items.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../../node_modules/sass-loader/lib/loader.js!./selected-items.scss", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../../node_modules/sass-loader/lib/loader.js!./selected-items.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/view/tab-content.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewTabContent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spinner__ = __webpack_require__("./components/spinner/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_bar__ = __webpack_require__("./components/search-bar/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_types__ = __webpack_require__("./services/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_column_column_list__ = __webpack_require__("./models/column/column-list.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__("./utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__column_column_component__ = __webpack_require__("./components/view/column/column.component.jsx");
var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-unused-prop-types */











var ViewTabContent = (_temp = _class = function (_React$PureComponent) {
  _inherits(ViewTabContent, _React$PureComponent);

  function ViewTabContent(props) {
    _classCallCheck(this, ViewTabContent);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var isDataLoaded = props.dataSourceProvider.isLoaded;
    var idOfFirstItem = _this.getIdOfFirstItem(props);

    _this.state = {
      isDataLoaded: isDataLoaded,
      checkedItemsLastUpdate: 0,
      searchingFor: '',
      selectedColumn: idOfFirstItem !== null ? 1 : 0,
      selectedId: idOfFirstItem
    };

    _this.columns = new __WEBPACK_IMPORTED_MODULE_5__models_column_column_list__["a" /* default */](props.dataSourceProvider);
    return _this;
  }

  ViewTabContent.prototype.componentWillMount = function componentWillMount() {
    if (!this.state.isDataLoaded) {
      this.loadData(this.props);
    }
  };

  ViewTabContent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var isLoaded = nextProps.dataSourceProvider.isLoaded;

    var checked = nextProps.dataSourceProvider.getChecked();

    if (this.state.isDataLoaded !== isLoaded) {
      this.setState({
        isDataLoaded: isLoaded
      });
    }

    if (!isLoaded) {
      this.loadData(nextProps);
    }

    if (checked) {
      var lastUpdated = checked.getLastUpdateStamp();
      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated
        });
      }
    }
  };

  ViewTabContent.prototype.getIsCheckedAll = function getIsCheckedAll(parentIds) {
    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    return checkedItemHashList.getIsCheckedAll(parentIds);
  };

  ViewTabContent.prototype.getCheckedIds = function getCheckedIds(parentIds, data) {
    var _this2 = this;

    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    var result = checkedItemHashList.getCheckedItems(parentIds).map(function (i) {
      return i.id;
    });

    // Adds all items that have checkedAll in children
    if (data && Array.isArray(data.items)) {
      data.items.forEach(function (item) {
        var currentParentIds = parentIds.slice();
        currentParentIds.push(item.id);
        if (_this2.getIsCheckedAll(currentParentIds)) {
          result.push(item.id);
        }
      });
    }

    return result;
  };

  ViewTabContent.prototype.render = function render() {
    return this.state.isDataLoaded ? this.getContent() : this.getSpinner();
  };

  return ViewTabContent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getIdOfFirstItem = function (props) {
    var dataSourceProvider = props.dataSourceProvider;

    var firstItem = dataSourceProvider.getFirstItem();
    if (firstItem === null || !firstItem.id) return null;

    return firstItem.id;
  };

  this.getContent = function () {
    _this3.refreshContent();
    var list = _this3.columns.list || [];
    var selectedPath = _this3.columns.selectedPath || [];
    var parentIds = [];
    var anyCheckedAll = false;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-hierarchy-selector-tab-content' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-hierarchy-selector-tab-search-bar' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__search_bar__["a" /* default */], {
          searchPlaceHolder: _this3.props.searchPlaceHolder,
          onSearchChange: _this3.searchChangeHandler,
          onCloseClick: _this3.searchClearHandler
        })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-hierarchy-selector-column-wrapper' },
        Object.keys(list).map(function (key) {
          var data = list[key];
          var selectedId = selectedPath[key] ? String(selectedPath[key]) : null;
          var parentReferenceIds = parentIds.slice();
          var isCheckedAll = _this3.getIsCheckedAll(parentIds);
          var checkedIds = isCheckedAll ? [] : _this3.getCheckedIds(parentIds, data);

          anyCheckedAll = anyCheckedAll || isCheckedAll;
          parentIds.push(selectedId);

          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__column_column_component__["a" /* default */], {
            allLabel: _this3.props.allLabel,
            checkedAll: anyCheckedAll || isCheckedAll,
            checkedAllDisabled: anyCheckedAll && !isCheckedAll,
            checkedAllHidden: Number(key) === 0,
            checkedIds: checkedIds,
            data: data,
            index: Number(key) + 1,
            itemRenderFunction: _this3.props.listItemRenderFunction,
            key: Number(key) + 1,
            referenceIds: parentReferenceIds,
            selectedId: selectedId,
            onCheck: _this3.checkHandler,
            onCheckAll: _this3.checkAllHandler,
            onClick: _this3.clickHandler
          });
        })
      )
    );
  };

  this.getSpinner = function () {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-hierarchy-selector-tab-content' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__spinner__["a" /* default */], null)
    );
  };

  this.clickHandler = function (level, id) {
    _this3.setState({
      selectedColumn: level,
      selectedId: id
    });
  };

  this.checkHandler = function (referenceIds, id, checkState) {
    var checkedItemHashList = _this3.props.dataSourceProvider.getChecked();
    if (checkState) {
      checkedItemHashList.add(referenceIds, id);
    } else {
      checkedItemHashList.remove(referenceIds, id);
    }
    _this3.setState({
      checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
    });
    _this3.props.onCheckListChange(checkedItemHashList);
  };

  this.checkAllHandler = function (referenceIds, checkState) {
    var parentIds = referenceIds.slice();
    var id = parentIds.pop();

    if (!id) throw new Error('There is no selected parent element to perform checking of all elements');

    var checkedItemHashList = _this3.props.dataSourceProvider.getChecked();
    if (checkState) {
      checkedItemHashList.addAll(parentIds, id);
    } else {
      checkedItemHashList.removeAll(parentIds, id);
    }
    _this3.setState({
      checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
    });
    _this3.props.onCheckListChange(checkedItemHashList);
  };

  this.searchChangeHandler = function (e) {
    var searchingValue = e.target ? e.target.value || '' : '';
    var searchingFor = '';

    if (__WEBPACK_IMPORTED_MODULE_6__utils__["a" /* default */].enoughSearchTextLength(searchingValue)) {
      searchingFor = searchingValue;
    }
    _this3.setState({ searchingFor: searchingFor });
  };

  this.searchClearHandler = function () {
    _this3.setState({ searchingFor: '' });
  };

  this.loadData = function (props) {
    var dataSourceProvider = props.dataSourceProvider,
        onCheckListChange = props.onCheckListChange;

    dataSourceProvider.loadData().then(function () {
      var checkedItemHashList = dataSourceProvider.getChecked();
      var stateObject = {
        isDataLoaded: dataSourceProvider.isLoaded,
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
      };

      var idOfFirstItem = _this3.getIdOfFirstItem(props);
      if (idOfFirstItem !== null) {
        stateObject.selectedColumn = 1;
        stateObject.selectedId = idOfFirstItem;
      }

      _this3.setState(stateObject);

      onCheckListChange(checkedItemHashList);
    });
  };

  this.refreshContent = function () {
    var _state = _this3.state,
        selectedColumn = _state.selectedColumn,
        selectedId = _state.selectedId,
        searchingFor = _state.searchingFor;

    _this3.columns.setSearchingFor(searchingFor);
    _this3.columns.refresh(selectedColumn, selectedId);
  };
}, _temp);



ViewTabContent.propTypes = {
  allLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  index: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  listItemRenderFunction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  dataSourceProvider: __WEBPACK_IMPORTED_MODULE_4__services_types__["a" /* dataSourceProviderType */].isRequired,
  searchPlaceHolder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  onCheckListChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

ViewTabContent.defaultProps = {
  allLabel: 'All',
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  onCheckListChange: function onCheckListChange() {}
};

/***/ }),

/***/ "./components/view/tabs.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tab_content_component__ = __webpack_require__("./components/view/tab-content.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__("./types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__("./utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_scss__ = __webpack_require__("./components/view/tabs.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__tabs_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var ViewTabs = function (_React$Component) {
  _inherits(ViewTabs, _React$Component);

  function ViewTabs(props) {
    _classCallCheck(this, ViewTabs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onSelectHandler = function (key) {
      _this.setState({ activeTab: key });
    };

    _this.getContent = function () {
      var items = _this.props.items;

      var key = 0;
      var item = items[key];

      return item === undefined ? null : _this.getViewTabContent(key + 1, item.dataSourceProvider);
    };

    _this.getContentWithTabs = function () {
      var items = _this.props.items;

      var tabsId = 'hs-view-tabs-' + __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* default */].uId8();
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Tabs"],
        {
          activeKey: _this.state.activeTab,
          animation: true,
          className: 'oc-hierarchy-selector-view-tabs',
          id: tabsId,
          onSelect: _this.onSelectHandler
        },
        Object.keys(items).map(function (key) {
          var i = Number(key) + 1;
          var item = items[key];
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Tab"],
            {
              mountOnEnter: true,
              key: i,
              eventKey: i,
              title: item.title
            },
            _this.getViewTabContent(i, item.dataSourceProvider)
          );
        })
      );
    };

    _this.getViewTabContent = function (i, dataSourceProvider) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__tab_content_component__["a" /* default */], {
        allLabel: _this.props.allLabel,
        index: i,
        listItemRenderFunction: _this.props.listItemRenderFunction,
        dataSourceProvider: dataSourceProvider,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        onCheckListChange: _this.props.onCheckListChange
      });
    };

    _this.state = {
      activeTab: 1
    };
    return _this;
  }

  ViewTabs.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    // should be updated always. Real update logic is delegated to children
    return true;
  };

  ViewTabs.prototype.render = function render() {
    return this.props.items.length === 1 && this.props.hideSingleTab ? this.getContent() : this.getContentWithTabs();
  };

  return ViewTabs;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);




ViewTabs.propTypes = {
  allLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  hideSingleTab: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_4__types__["f" /* tabOptionsType */]).isRequired,
  listItemRenderFunction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onCheckListChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  searchPlaceHolder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element])
};

ViewTabs.defaultProps = {
  allLabel: 'All',
  hideSingleTab: false,
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  onCheckListChange: function onCheckListChange() {}
};

/***/ }),

/***/ "./components/view/tabs.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/tabs.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./tabs.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./tabs.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/view/top-bar.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewTopBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_question_circle__ = __webpack_require__("../node_modules/react-icons/lib/fa/question-circle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_question_circle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_question_circle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__top_bar_scss__ = __webpack_require__("./components/view/top-bar.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__top_bar_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__top_bar_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var ViewTopBar = function (_React$PureComponent) {
  _inherits(ViewTopBar, _React$PureComponent);

  function ViewTopBar() {
    _classCallCheck(this, ViewTopBar);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  ViewTopBar.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'oc-dialog-top-bar' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'action-left' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Modal"].Title,
          null,
          this.props.title
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'action-right' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Button"],
          { onClick: this.props.onSelect, disabled: this.props.selectDisabled },
          this.props.btnSelectLabel
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Button"],
          { onClick: this.props.onCancel },
          this.props.btnCancelLabel
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { type: 'button', className: 'oc-help-button', onClick: this.props.onHelp },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_icons_lib_fa_question_circle___default.a, null)
        )
      )
    );
  };

  return ViewTopBar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




ViewTopBar.propTypes = {
  onCancel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onHelp: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  selectDisabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]).isRequired,
  btnSelectLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  btnCancelLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element])
};

ViewTopBar.defaultProps = {
  onCancel: function onCancel() {},
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  btnSelectLabel: 'Select',
  btnCancelLabel: 'Cancel'
};

/***/ }),

/***/ "./components/view/top-bar.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/top-bar.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./top-bar.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./top-bar.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/view/view.component.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HierarchySelectorView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__top_bar_component__ = __webpack_require__("./components/view/top-bar.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_component__ = __webpack_require__("./components/view/tabs.component.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selected_items__ = __webpack_require__("./components/view/selected-items/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__group_name__ = __webpack_require__("./components/view/group-name/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__types__ = __webpack_require__("./types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_types__ = __webpack_require__("./services/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_group_name_calculation__ = __webpack_require__("./services/group-name-calculation.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_scss__ = __webpack_require__("./components/view/view.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__view_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-unused-state */















function getFirstCheckedItemHashList(lists) {
  var dataSourceKeys = Object.keys(lists);

  if (dataSourceKeys.length === 0) return null;

  return lists[dataSourceKeys[0]];
}

var HierarchySelectorView = function (_React$PureComponent) {
  _inherits(HierarchySelectorView, _React$PureComponent);

  function HierarchySelectorView(props) {
    _classCallCheck(this, HierarchySelectorView);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getInitialLastUpdateStamp = function () {
      return '0';
    };

    _this.getLastUpdateStamp = function () {
      var stamp = Object.keys(_this.state.checkedItemHashLists).map(function (i) {
        return _this.state.checkedItemHashLists[i].getLastUpdateStamp();
      }).join('-');

      return stamp;
    };

    _this.getGroupName = function (hashList) {
      var _this$state = _this.state,
          groupName = _this$state.groupName,
          groupNameChangedByUser = _this$state.groupNameChangedByUser;

      return Object(__WEBPACK_IMPORTED_MODULE_9__services_group_name_calculation__["a" /* default */])(groupName, groupNameChangedByUser, hashList);
    };

    _this.getContent = function () {
      var listsHashArray = _this.state.checkedItemHashLists;
      var tabsItems = [{
        title: '',
        dataSourceProvider: _this.props.dataSourceProvider
      }];

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-hierarchy-selector-view' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'oc-hierarchy-selector-tabs' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__tabs_component__["a" /* default */], {
            allLabel: _this.props.allLabel,
            items: tabsItems,
            listItemRenderFunction: _this.props.listItemRenderFunction,
            onCheckListChange: _this.checkListChangeHandler,
            hideSingleTab: true,
            searchPlaceHolder: _this.props.searchPlaceHolder
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'oc-hierarchy-selector-selected-container' },
          !_this.props.standalone && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__group_name__["a" /* default */], {
            label: _this.props.groupNameLabel,
            placeHolder: _this.props.groupNamePlaceHolder,
            initialValue: _this.state.groupName,
            onChange: _this.groupNameChangeHandler
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__selected_items__["a" /* default */], {
            allLabel: _this.props.allLabel,
            listLabel: _this.props.selectedItemListLabel,
            checkedItemLists: Object.keys(listsHashArray).map(function (i) {
              return listsHashArray[i];
            }),
            itemRenderFunction: _this.props.selectedItemRenderFunction,
            onItemRemove: _this.itemRemoveHandler
          })
        )
      );
    };

    _this.getCanSelectStatus = function (groupName, lists) {
      var isGroupName = String(groupName).trim() !== '';
      var count = 0;
      Object.keys(lists).forEach(function (key) {
        count += lists[key].getCheckedItemsCount();
      });

      return isGroupName && count > 0;
    };

    _this.getCheckedOutput = function () {
      // At this moment we provide results only for one data source
      var checkedItemHashList = getFirstCheckedItemHashList(_this.state.checkedItemHashLists);
      if (!checkedItemHashList) return [];

      var checkedOutput = checkedItemHashList.getCheckedOutput();
      var resultList = checkedOutput.checked || [];

      return resultList;
    };

    _this.getAllCheckedItems = function () {
      // At this moment we provide results only for one data source
      var checkedItemHashList = getFirstCheckedItemHashList(_this.state.checkedItemHashLists);
      if (!checkedItemHashList) return [];

      var checkedItems = checkedItemHashList.getAllCheckedItems();

      return checkedItems;
    };

    _this.createCheckedItemHashLists = function (dataSourceProvider) {
      var listHash = {};

      dataSourceProvider.preCheckItems();
      listHash[dataSourceProvider.id] = dataSourceProvider.getChecked();

      return listHash;
    };

    _this.groupNameChangeHandler = function (newValue) {
      _this.setState({
        canSelect: _this.getCanSelectStatus(newValue, _this.state.checkedItemHashLists),
        groupName: newValue,
        groupNameChangedByUser: true
      });
    };

    _this.cancelHandler = function () {
      _this.props.onCancel();
    };

    _this.selectHandler = function () {
      if (_this.state.groupName.trim() === '') throw new Error('State groupName is empty');

      var allCheckedItems = _this.getAllCheckedItems();
      var checkedOutput = _this.getCheckedOutput();

      _this.props.onSelect(_this.state.groupName, allCheckedItems, checkedOutput);
    };

    _this.checkListChangeHandler = function (checkedItemHashList) {
      if (checkedItemHashList) {
        var lists = _this.state.checkedItemHashLists;
        lists[checkedItemHashList.getId()] = checkedItemHashList;
        /* Getting group name after lists changing */
        var groupName = _this.getGroupName(lists);

        _this.setState({
          groupName: groupName,
          canSelect: _this.getCanSelectStatus(groupName, lists),
          checkedItemHashLists: lists,
          checkedItemsLastUpdate: _this.getLastUpdateStamp()
        });
      }
      _this.afterCheckListChanged();
    };

    _this.itemRemoveHandler = function () {
      var lists = _this.state.checkedItemHashLists;
      var groupName = _this.getGroupName(lists);
      _this.setState({
        groupName: groupName,
        canSelect: _this.getCanSelectStatus(groupName, lists),
        checkedItemsLastUpdate: _this.getLastUpdateStamp()
      });
      _this.afterCheckListChanged();
    };

    _this.afterCheckListChanged = function () {
      var resultList = _this.getCheckedOutput();
      _this.props.onCheckListChanged(resultList);
    };

    _this.show = function () {
      return _this.getContent();
    };

    _this.showInModal = function () {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Modal"],
        {
          dialogClassName: 'oc-hierarchy-selector-view-dialog',
          show: _this.state.visible,
          onHide: _this.cancelHandler,
          keyboard: false,
          backdrop: 'static'
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Modal"].Header,
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__top_bar_component__["a" /* default */], {
            selectDisabled: !_this.state.canSelect,
            title: _this.props.title,
            onCancel: _this.cancelHandler,
            onSelect: _this.selectHandler,
            btnSelectLabel: _this.props.btnSelectLabel,
            btnCancelLabel: _this.props.btnCancelLabel
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Modal"].Body,
          null,
          _this.getContent()
        )
      );
    };

    props.dataSourceProvider.setPrecheckedItems(props.preCheckedItems);
    var checkedItemHashLists = _this.createCheckedItemHashLists(props.dataSourceProvider);

    _this.state = {
      canSelect: _this.getCanSelectStatus(props.groupName, checkedItemHashLists),
      groupName: props.groupName,
      groupNameChangedByUser: props.groupName.trim() !== '',
      checkedItemHashLists: checkedItemHashLists,
      checkedItemsLastUpdate: _this.getInitialLastUpdateStamp(),
      visible: true
    };
    return _this;
  }

  HierarchySelectorView.prototype.render = function render() {
    return this.props.showInModal && !this.props.standalone ? this.showInModal() : this.show();
  };

  return HierarchySelectorView;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);




HierarchySelectorView.propTypes = {
  dataSourceProvider: __WEBPACK_IMPORTED_MODULE_8__services_types__["a" /* dataSourceProviderType */].isRequired,
  onCancel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onCheckListChanged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  showInModal: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  allLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  btnSelectLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  btnCancelLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  groupName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  groupNameLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  groupNamePlaceHolder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  listItemRenderFunction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  preCheckedItems: __WEBPACK_IMPORTED_MODULE_7__types__["e" /* preCheckedItemsListShape */],
  searchPlaceHolder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  selectedItemListLabel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
  selectedItemRenderFunction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  standalone: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

HierarchySelectorView.defaultProps = {
  onCancel: function onCancel() {},
  onCheckListChanged: function onCheckListChanged() {},
  onSelect: function onSelect() {},
  showInModal: true,
  allLabel: 'All',
  btnSelectLabel: 'Select',
  btnCancelLabel: 'Cancel',
  groupName: '',
  groupNameLabel: 'Group name',
  groupNamePlaceHolder: 'Please, fill a group name',
  listItemRenderFunction: null,
  preCheckedItems: null,
  searchPlaceHolder: 'Search...',
  selectedItemListLabel: 'Selected items',
  selectedItemRenderFunction: null,
  standalone: false,
  title: ''
};

/***/ }),

/***/ "./components/view/view.scss":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js??ref--2-2!../node_modules/sass-loader/lib/loader.js!./components/view/view.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./view.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./view.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_combo_box_combo_box_component__ = __webpack_require__("./components/combo-box/combo-box.component.jsx");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HierarchySelectorComboBox", function() { return __WEBPACK_IMPORTED_MODULE_0__components_combo_box_combo_box_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_view__ = __webpack_require__("./components/view/index.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HierarchySelectorView", function() { return __WEBPACK_IMPORTED_MODULE_1__components_view__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_source_provider__ = __webpack_require__("./services/data-source-provider.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HierarchySelectorDataSourceProvider", function() { return __WEBPACK_IMPORTED_MODULE_2__services_data_source_provider__["a"]; });




/***/ }),

/***/ "./models/base.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseModel; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataSourceProvider = new WeakMap();

var BaseModel = function () {
  function BaseModel(dataProvider) {
    _classCallCheck(this, BaseModel);

    dataSourceProvider.set(this, dataProvider);
  }

  _createClass(BaseModel, [{
    key: "dataSourceProvider",
    get: function get() {
      return dataSourceProvider.get(this);
    }
  }]);

  return BaseModel;
}();



/***/ }),

/***/ "./models/checked-items/checked-hash-item.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckedHashItem; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable array-callback-return */

var parents = new WeakMap();
var checkedAll = new WeakMap();
var checkedItemsBackUp = new WeakMap();
var checkedItems = new WeakMap();

function addChildren(that, item) {
  if (item) {
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      item.children.forEach(function (child) {
        addChildren(that, child);
      });
    } else {
      that.addCheckedItem(item);
    }
  }
}

var CheckedHashItem = function () {
  function CheckedHashItem() {
    var prnts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, CheckedHashItem);

    this.timestamp = Date.now();
    parents.set(this, prnts.slice());
    checkedAll.set(this, false);
    checkedItems.set(this, []);
    checkedItemsBackUp.set(this, []);
  }

  CheckedHashItem.prototype.getParents = function getParents() {
    return parents.get(this).slice();
  };

  CheckedHashItem.prototype.getCheckedItems = function getCheckedItems() {
    return checkedItems.get(this).slice();
  };

  CheckedHashItem.prototype.checkAll = function checkAll() {
    var prnts = parents.get(this);
    checkedAll.set(this, true);
    this.clearChecked();
    var initialParent = prnts.length > 0 ? prnts[prnts.length - 1] : undefined;

    if (initialParent) addChildren(this, initialParent);
  };

  CheckedHashItem.prototype.uncheckAll = function uncheckAll() {
    checkedAll.set(this, false);
    this.clearChecked();
  };

  CheckedHashItem.prototype.isCheckedAll = function isCheckedAll() {
    return checkedAll.get(this);
  };

  CheckedHashItem.prototype.clearChecked = function clearChecked() {
    checkedItems.get(this).splice(0);
  };

  CheckedHashItem.prototype.addCheckedItem = function addCheckedItem(item) {
    checkedItems.get(this).push(item);
  };

  CheckedHashItem.prototype.removeCheckedItem = function removeCheckedItem(item) {
    var items = checkedItems.get(this);
    items.reduceRight(function (acc, currentItem, index, currentItems) {
      if (currentItem.id === item.id) {
        currentItems.splice(index, 1);
      }
    }, []);
  };

  CheckedHashItem.prototype.createCopy = function createCopy() {
    var copy = new CheckedHashItem();

    parents.set(copy, [].concat(parents.get(this)));
    checkedAll.set(copy, checkedAll.get(this));
    checkedItems.set(copy, [].concat(checkedItems.get(this)));
    checkedItemsBackUp.set(copy, [].concat(checkedItemsBackUp.get(this)));

    return copy;
  };

  CheckedHashItem.prototype.makeBackUp = function makeBackUp() {
    checkedItemsBackUp.set(this, [].concat(checkedItems.get(this)));
  };

  CheckedHashItem.prototype.restoreFromBackUp = function restoreFromBackUp() {
    checkedItems.set(this, [].concat(checkedItemsBackUp.get(this)));
  };

  return CheckedHashItem;
}();



/***/ }),

/***/ "./models/checked-items/checked-item-hash-list.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__("./models/base.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__checked_hash_item__ = __webpack_require__("./models/checked-items/checked-hash-item.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checked_output__ = __webpack_require__("./models/checked-items/checked-output.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var sourceProvider = new WeakMap();
var providerId = new WeakMap();
var checked = new WeakMap();
var index = new WeakMap();
var lastUpdate = new WeakMap();

function clearAll(list) {
  checked.set(list, {});
}

function getChildHashesOfCheckedItems(list, hash) {
  var checkedItems = checked.get(list);
  var hashes = [];
  Object.keys(checkedItems).forEach(function (currentHash) {
    if (hash !== currentHash && currentHash.indexOf(hash) === 0) {
      hashes.push(currentHash);
    }
  });

  return hashes;
}

function removeItem(list, parentIds, id) {
  var checkedItems = checked.get(list);
  var dataIndex = index.get(list);
  var indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    var parentHash = indexItem.parentHash;


    if (checkedItems[parentHash]) {
      checkedItems[parentHash].removeCheckedItem(indexItem.item);
      // Checks if there is no checked items, then removes a hash
      if (checkedItems[parentHash].getCheckedItems().length === 0) {
        delete checkedItems[parentHash];
      }
    }
  }
}

function removeHash(list, hash) {
  var checkedItems = checked.get(list);
  if (checkedItems[hash]) {
    checkedItems[hash].uncheckAll();
    delete checkedItems[hash];
  }
}

function removeAllItems(list, parentIds, id) {
  var dataIndex = index.get(list);
  var indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    var hash = dataIndex.getHash(indexItem);
    removeHash(list, hash);
  }
}

function addItem(list, parentIds, id) {
  var checkedItems = checked.get(list);
  var dataIndex = index.get(list);
  var indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    var parentHash = indexItem.parentHash;

    var parents = dataIndex.getParents(indexItem);

    if (!checkedItems[parentHash]) checkedItems[parentHash] = new __WEBPACK_IMPORTED_MODULE_1__checked_hash_item__["a" /* default */](parents);

    var hashItem = checkedItems[parentHash];
    hashItem.addCheckedItem(indexItem.item);
  }
}

function addAllItems(list, parentIds, id) {
  var checkedItems = checked.get(list);
  var dataIndex = index.get(list);
  var indexItem = dataIndex.getFromIndex(parentIds, id);
  if (indexItem) {
    var hash = dataIndex.getHash(indexItem);
    var parents = [].concat(dataIndex.getParents(indexItem), [indexItem.item]);
    var childHashes = getChildHashesOfCheckedItems(list, hash) || [];

    childHashes.forEach(function (h) {
      removeHash(list, h);
    });

    if (!checkedItems[hash]) checkedItems[hash] = new __WEBPACK_IMPORTED_MODULE_1__checked_hash_item__["a" /* default */](parents);

    var hashItem = checkedItems[hash];
    hashItem.checkAll();
  }
}

function preCheckItems(list, preCheckedItems) {
  var dataIndex = index.get(list);
  var getHash = function getHash(parentId, id) {
    return parentId ? parentId + '_' + id : '' + id;
  };
  clearAll(list);

  if (dataIndex && preCheckedItems) {
    // creating a hash for pre-checked items to increase speed of searching
    var hashOfPreChecked = [];
    preCheckedItems.forEach(function (i) {
      var hs = getHash(i.parentId, i.id);
      hashOfPreChecked[hs] = i;
    });

    dataIndex.forEach(function (item, parentIds) {
      var hs = getHash(parentIds.length > 0 ? parentIds[parentIds.length - 1] : null, item.id);
      var found = hashOfPreChecked[hs];
      if (found) {
        if (found.isCheckedAll && Array.isArray(item.children) && item.children.length > 0) {
          addAllItems(list, parentIds, item.id);
        } else {
          addItem(list, parentIds, item.id);
        }
      }
    });
  }
}

function afterUpdate(list) {
  lastUpdate.set(list, Date.now());
}

var CheckedItemHashList = function (_BaseModel) {
  _inherits(CheckedItemHashList, _BaseModel);

  function CheckedItemHashList(dataSourceProvider) {
    _classCallCheck(this, CheckedItemHashList);

    var _this = _possibleConstructorReturn(this, _BaseModel.call(this, dataSourceProvider));

    _this.get = function () {
      return checked.get(_this);
    };

    _this.getAllCheckedItems = function () {
      var checkedHashArray = checked.get(_this);
      var list = [];
      Object.keys(checkedHashArray).forEach(function (key) {
        list = list.concat(checkedHashArray[key].getCheckedItems());
      });
      return list;
    };

    _this.getCheckedItems = function () {
      var parentIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var checkedHashItem = _this.getHashItem(parentIds);
      var result = [];
      if (checkedHashItem) {
        result = checkedHashItem.getCheckedItems();
      }
      return result;
    };

    _this.getIsCheckedAll = function () {
      var parentIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var checkedHashItem = _this.getHashItem(parentIds);
      return checkedHashItem ? checkedHashItem.isCheckedAll() : false;
    };

    _this.getCheckedItemsCount = function () {
      var checkedHashArray = checked.get(_this);
      var count = 0;
      Object.keys(checkedHashArray).forEach(function (key) {
        count += checkedHashArray[key].getCheckedItems().length;
      });
      return count;
    };

    _this.getId = function () {
      return providerId.get(_this);
    };

    _this.getHashItem = function () {
      var parentIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var checkedHashArray = checked.get(_this);
      var dataIndex = index.get(_this);
      var hash = dataIndex.getHashFromIds(parentIds);

      if (hash === '' || !checkedHashArray[hash]) {
        return null;
      }
      return checkedHashArray[hash];
    };

    _this.getLastUpdateStamp = function () {
      return lastUpdate.get(_this);
    };

    _this.getCheckedOutput = function () {
      var resultObject = {
        dataSourceProviderId: _this.getId(),
        checked: []
      };
      var checkedOutput = new __WEBPACK_IMPORTED_MODULE_2__checked_output__["a" /* default */]();
      var hashes = checked.get(_this);

      Object.keys(hashes).forEach(function (hash) {
        var checkedHashItem = hashes[hash];
        checkedOutput.add(checkedHashItem);
      });

      resultObject.checked = checkedOutput.get();

      return resultObject;
    };

    _this.add = function (parentIds, id) {
      addItem(_this, parentIds, id);
      afterUpdate(_this);
    };

    _this.addAll = function (parentIds, id) {
      addAllItems(_this, parentIds, id);
      afterUpdate(_this);
    };

    _this.createCopy = function () {
      var copy = new CheckedItemHashList(sourceProvider.get(_this));

      providerId.set(copy, providerId.get(_this));
      lastUpdate.set(copy, lastUpdate.get(_this));
      index.set(copy, index.get(_this).clone());

      var chkd = Object.assign({}, checked.get(_this));
      Object.keys(chkd).forEach(function (key) {
        chkd[key] = chkd[key].createCopy();
      });
      checked.set(copy, chkd);

      return copy;
    };

    _this.clearAll = function () {
      clearAll(_this);
    };

    _this.preCheckItems = function (preCheckedItems) {
      preCheckItems(_this, preCheckedItems);
      afterUpdate(_this);
    };

    _this.remove = function (parentIds, id) {
      removeItem(_this, parentIds, id);
      afterUpdate(_this);
    };

    _this.removeAll = function (parentIds, id) {
      removeAllItems(_this, parentIds, id);
      afterUpdate(_this);
    };

    _this.removeHash = function (hash) {
      removeHash(_this, hash);
      afterUpdate(_this);
    };

    _this.toString = function () {
      var list = checked.get(_this);
      var result = {};
      Object.keys(list).forEach(function (key) {
        var item = list[key];
        result[key] = {
          checkedAll: item.isCheckedAll(),
          checkedItems: item.getCheckedItems()
        };
      });
      return JSON.stringify({
        id: _this.getId(),
        lastUpdateStamp: _this.getLastUpdateStamp(),
        checked: result
      }, null, 2);
    };

    sourceProvider.set(_this, dataSourceProvider);
    providerId.set(_this, dataSourceProvider.id);
    lastUpdate.set(_this, 0);
    checked.set(_this, {});
    index.set(_this, dataSourceProvider.getIndex());
    return _this;
  }

  return CheckedItemHashList;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (CheckedItemHashList);

/***/ }),

/***/ "./models/checked-items/checked-output.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckedOutput; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var output = new WeakMap();

function getOutputObject(item, parentIds, isCheckedAll) {
  var currentItem = item ? Object.assign({}, item) : {};

  currentItem.id = currentItem.id || null;
  currentItem.name = currentItem.name || '';
  currentItem.children = currentItem.children || [];

  return {
    id: currentItem.id,
    name: currentItem.name,
    level: parentIds.length + 1,
    parentId: parentIds.length > 0 ? parentIds[parentIds.length - 1] : null,
    parentIds: parentIds,
    isCheckedAll: isCheckedAll,
    isChildren: Array.isArray(currentItem.children) && currentItem.children.length > 0
  };
}

function addToOutput(obj, checkedHashItem) {
  var currentOutput = output.get(obj);
  var isCheckedAll = checkedHashItem.isCheckedAll();
  var parents = checkedHashItem.getParents();

  if (isCheckedAll) {
    var item = parents[parents.length - 1];
    parents.pop();
    var parentIds = parents.map(function (i) {
      return i.id;
    });
    currentOutput.push(getOutputObject(item, parentIds, isCheckedAll));
  } else {
    var checkedItems = checkedHashItem.getCheckedItems();
    var _parentIds = parents.map(function (i) {
      return i.id;
    });
    checkedItems.forEach(function (item) {
      currentOutput.push(getOutputObject(item, _parentIds, isCheckedAll));
    });
  }
}

var CheckedOutput = function CheckedOutput() {
  var _this = this;

  _classCallCheck(this, CheckedOutput);

  this.get = function () {
    return output.get(_this).slice();
  };

  this.add = function (checkedHashItem) {
    addToOutput(_this, checkedHashItem);
  };

  this.clear = function () {
    output.get(_this).splice(0);
  };

  output.set(this, []);
};



/***/ }),

/***/ "./models/column/column-data.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColumnData; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnData = function ColumnData() {
  var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, ColumnData);

  this.parentId = parentId;
  this.items = items;
};



/***/ }),

/***/ "./models/column/column-list.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColumnList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__column_data__ = __webpack_require__("./models/column/column-data.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__("./models/base.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search__ = __webpack_require__("./models/search.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__("./utils.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var data = new WeakMap();
var list = new WeakMap();
var states = new WeakMap();
var searchingFor = new WeakMap();
var searchModel = new WeakMap();
var selectedPath = new WeakMap();

function _getData(thisObj) {
  return data.get(thisObj) || [];
}

function getDefaultStates() {
  return {
    needToSearch: false
  };
}

function getStates(thisObj) {
  return states.get(thisObj) || {};
}

function setStates(thisObj, stateObj) {
  return states.set(thisObj, stateObj);
}

function refreshData(thisObj) {
  var dataProvider = thisObj.dataSourceProvider;

  if (data.get(thisObj) === null) {
    if (dataProvider.isLoaded) {
      data.set(thisObj, dataProvider.getData());
    }
  }

  if (data.get(thisObj) !== null) {
    var currentStates = getStates(thisObj);

    if (currentStates.needToSearch) {
      var searchinForText = searchingFor.get(thisObj);

      if (__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].enoughSearchTextLength(searchinForText)) {
        var model = searchModel.get(thisObj);
        data.set(thisObj, model.search(searchinForText));
      } else {
        data.set(thisObj, dataProvider.getData());
      }

      currentStates.needToSearch = false;
      setStates(thisObj, currentStates);
    }
  }
}

var ColumnList = function (_BaseModel) {
  _inherits(ColumnList, _BaseModel);

  function ColumnList(dataSourceProvider) {
    _classCallCheck(this, ColumnList);

    var _this = _possibleConstructorReturn(this, _BaseModel.call(this, dataSourceProvider));

    _this.setSearchingFor = function (text) {
      var searchinForText = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].enoughSearchTextLength(text) ? text : '';
      var currentSearchingFor = searchingFor.get(_this);

      if (currentSearchingFor !== searchinForText) {
        var currentStates = getStates(_this);
        currentStates.needToSearch = true;
        setStates(_this, currentStates);
        searchingFor.set(_this, searchinForText);
      }
    };

    data.set(_this, null);
    list.set(_this, []);
    states.set(_this, getDefaultStates());
    searchingFor.set(_this, '');
    searchModel.set(_this, new __WEBPACK_IMPORTED_MODULE_2__search__["a" /* default */](dataSourceProvider));
    selectedPath.set(_this, []);
    return _this;
  }

  ColumnList.prototype.getData = function getData() {
    return _getData(this);
  };

  /**
   * Method recalculate selected paths and fills list of columns
   * @param {number} level The selected level (column)
   * @param {number} id The ID of selected item in a column
   */
  ColumnList.prototype.refresh = function refresh(level) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var listOfColumns = list.get(this);
    var path = selectedPath.get(this);

    var cleanLevel = level && level > 0 ? level - 1 : 0;

    refreshData(this);

    path.splice(cleanLevel);
    listOfColumns.splice(0);

    if (id !== null) {
      path.push(id);
    }

    if (listOfColumns.length === 0) {
      listOfColumns.push(new __WEBPACK_IMPORTED_MODULE_0__column_data__["a" /* default */](null, _getData(this)));
    }

    path.forEach(function (selectedId, thisLevel) {
      var nextLevel = thisLevel + 1;

      var item = listOfColumns[thisLevel] ? listOfColumns[thisLevel].items.find(function (el) {
        return el.id === selectedId;
      }) : null;

      if (item && item.children && item.children.length > 0) {
        if (nextLevel >= listOfColumns.length) {
          listOfColumns.push(new __WEBPACK_IMPORTED_MODULE_0__column_data__["a" /* default */]());
        }
        if (listOfColumns[nextLevel].parentId !== selectedId) {
          listOfColumns[nextLevel].parentId = selectedId;
          listOfColumns[nextLevel].items = item.children;
        }
      }
    });
  };

  _createClass(ColumnList, [{
    key: 'length',
    get: function get() {
      return list.get(this).length;
    }
  }, {
    key: 'list',
    get: function get() {
      return list.get(this);
    }
  }, {
    key: 'selectedPath',
    get: function get() {
      return selectedPath.get(this);
    }
  }]);

  return ColumnList;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* default */]);



/***/ }),

/***/ "./models/data-index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataIndex; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-param-reassign */

var index = new WeakMap();

function getHashFromIds(ids) {
  return ids.join('_');
}

function getIdsFromHash(hash) {
  return hash ? hash.split('_') : [];
}

function getFromIndex(obj, ids) {
  var dataIndex = index.get(obj);
  var hash = getHashFromIds(ids);
  return dataIndex[hash] ? Object.assign({}, dataIndex[hash]) : null;
}

function getParents(obj, hash) {
  var parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var ids = getIdsFromHash(hash);
  if (ids.length > 1) {
    ids.pop();
    var newHash = getHashFromIds(ids);
    var dataIndex = index.get(obj);
    if (dataIndex[newHash] === undefined) throw new Error('Hash \'' + newHash + '\' is missed from an index');
    parents.unshift(dataIndex[newHash].item);
    getParents(obj, newHash, parents);
  }
  return parents;
}

function addIdToHash(hash, addedId) {
  var ids = getIdsFromHash(hash);
  return getHashFromIds([].concat(ids, [addedId]));
}

function createIndex(items) {
  var indexResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  Object.keys(items).forEach(function (key) {
    var item = items[key];
    var allIds = [].concat(parents, [item.id]);
    var hashKey = getHashFromIds(allIds);
    indexResult[hashKey] = {
      parentHash: getHashFromIds(parents),
      item: item
    };
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      createIndex(item.children, indexResult, allIds);
    }
  });

  return indexResult;
}

var DataIndex = function DataIndex(data) {
  var _this = this;

  _classCallCheck(this, DataIndex);

  this.get = function () {
    return Object.assign({}, index.get(_this));
  };

  this.getHash = function (indexItem) {
    if (!indexItem) throw new Error('DataIndex::getParents(): there is no indexItem');
    if (!indexItem.item) throw new Error('DataIndex::getParents(): item is not found in indexItem');

    return addIdToHash(indexItem.parentHash, indexItem.item.id);
  };

  this.getHashFromIds = function (ids) {
    return getHashFromIds(ids);
  };

  this.getParentsByHash = function (hash) {
    return getParents(_this, hash);
  };

  this.getParents = function (indexItem) {
    return getParents(_this, _this.getHash(indexItem));
  };

  this.getFromIndex = function (parentIds, id) {
    return getFromIndex(_this, [].concat(parentIds, [id]));
  };

  this.clone = function () {
    return new DataIndex(_this);
  };

  this.forEach = function (callBack) {
    var dataIndex = index.get(_this);
    Object.keys(dataIndex).forEach(function (key) {
      var indexItem = dataIndex[key];
      callBack(indexItem.item, getIdsFromHash(indexItem.parentHash));
    });
  };

  if (data instanceof DataIndex) {
    index.set(this, data.get());
  } else {
    index.set(this, createIndex(data));
  }
};



/***/ }),

/***/ "./models/group.entity.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupEntity; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroupEntity = function GroupEntity(name) {
  var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, GroupEntity);

  this.name = name;
  this.items = items;
};



/***/ }),

/***/ "./models/item.entity.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemEntity; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemEntity = function ItemEntity(data) {
  _classCallCheck(this, ItemEntity);

  this.id = data && data.id ? data.id : null;
  this.name = data && data.name ? data.name : null;
  this.children = data && Array.isArray(data.children) ? data.children : [];
};



/***/ }),

/***/ "./models/search.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__("./models/base.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item_entity__ = __webpack_require__("./models/item.entity.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_entity__ = __webpack_require__("./models/group.entity.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__("./utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var isFound = function isFound(searchingIn, searchingFor) {
  return searchingIn.toLowerCase().indexOf(searchingFor.toLowerCase()) > -1;
};

var findFromHierarchy = function findFromHierarchy(data, searchingFor) {
  var foundData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var groupNames = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var result = foundData;

  if (data) {
    Object.keys(data).forEach(function (key) {
      var currentItem = new __WEBPACK_IMPORTED_MODULE_1__item_entity__["a" /* default */](data[key]);
      var isChildren = currentItem.children && Array.isArray(currentItem.children) && currentItem.children.length > 0;

      if (isChildren) {
        result = findFromHierarchy(currentItem.children, searchingFor, result, [].concat(groupNames, [{ id: currentItem.id, name: currentItem.name }]));
      } else if (currentItem.name && isFound(currentItem.name, searchingFor)) {
        var groupId = groupNames.map(function (i) {
          return i.id;
        }).join('_');
        var groupName = groupNames.map(function (i) {
          return i.name;
        }).join(' / ');

        if (result[groupId] === undefined) {
          result[groupId] = new __WEBPACK_IMPORTED_MODULE_2__group_entity__["a" /* default */](groupName);
        }
        result[groupId].items.push(currentItem);
      }
    });
  }

  return result;
};

function filter(data, searchingFor) {
  var itemList = [];

  data.forEach(function (item) {
    var isChildren = Array.isArray(item.children) && item.children.length > 0;

    if (isChildren) {
      var children = filter(item.children, searchingFor);
      if (children.length > 0) {
        var itemCopy = Object.assign({}, item);
        itemCopy.children = children;
        itemList.push(itemCopy);
      }
    } else if (isFound(item.name, searchingFor)) {
      var _itemCopy = Object.assign({}, item);
      itemList.push(_itemCopy);
    }
  });

  return itemList;
}

var Search = function (_BaseModel) {
  _inherits(Search, _BaseModel);

  function Search() {
    var _temp, _this, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BaseModel.call.apply(_BaseModel, [this].concat(args))), _this), _this.getFoundFromHierarchy = function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return null;

      return __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].HashToArray(findFromHierarchy(_this.dataSourceProvider.getData(), searchingFor));
    }, _this.search = function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return [];

      var data = filter(_this.dataSourceProvider.getData(), searchingFor);
      return data;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Search;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */]);



/***/ }),

/***/ "./services/data-source-provider.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HierarchySelectorDataSourceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_checked_items_checked_item_hash_list__ = __webpack_require__("./models/checked-items/checked-item-hash-list.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_data_index__ = __webpack_require__("./models/data-index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_item_entity__ = __webpack_require__("./models/item.entity.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__("./utils.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-param-reassign */






var loaded = new WeakMap();
var data = new WeakMap();
var index = new WeakMap();
var checked = new WeakMap();
var preChecked = new WeakMap();
var dataSourcePromiseFunction = new WeakMap();
var callbackFunction = new WeakMap();

function isFunction(func, errorMessage) {
  if (func instanceof Function) {
    return true;
  }
  throw new Error(errorMessage);
}

function createIndex(items) {
  var dataIndex = new __WEBPACK_IMPORTED_MODULE_1__models_data_index__["a" /* default */](items);

  return dataIndex;
}

function createCheckedItemHashList(dataSourceProvider) {
  return new __WEBPACK_IMPORTED_MODULE_0__models_checked_items_checked_item_hash_list__["a" /* default */](dataSourceProvider);
}

var HierarchySelectorDataSourceProvider = function () {
  function HierarchySelectorDataSourceProvider(dataSourceFunction) {
    var _this = this;

    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, HierarchySelectorDataSourceProvider);

    this.loadData = function () {
      var promise = dataSourcePromiseFunction.get(_this)();

      if ((typeof promise === 'undefined' ? 'undefined' : _typeof(promise)) === 'object' && promise.then instanceof Function) {
        return promise.then(function (response) {
          data.set(_this, response);
          index.set(_this, createIndex(response));
          _this.resetCheckedItemHashList();
          _this.preCheckItems();
          loaded.set(_this, true);
          callbackFunction.get(_this)(response);

          return response;
        });
      }
      throw new Error('A <HierarchySelectorDataSourceProvider> dataSourceFunction property didn\'t return a promise object');
    };

    this.getData = function () {
      return data.get(_this);
    };

    this.getFirstItem = function () {
      var allItems = data.get(_this);
      if (!_this.isLoaded || !Array.isArray(allItems) || allItems.length === 0) return null;

      var firstElement = allItems[0];
      return new __WEBPACK_IMPORTED_MODULE_2__models_item_entity__["a" /* default */]({ id: firstElement.id, name: firstElement.name });
    };

    this.getIndex = function () {
      return index.get(_this);
    };

    this.getChecked = function () {
      return checked.get(_this);
    };

    this.getAllCheckedItems = function () {
      var currentChecked = checked.get(_this);
      return currentChecked instanceof __WEBPACK_IMPORTED_MODULE_0__models_checked_items_checked_item_hash_list__["a" /* default */] ? currentChecked.getAllCheckedItems() : [];
    };

    this.getCheckedOutput = function () {
      var currentChecked = checked.get(_this);
      return currentChecked instanceof __WEBPACK_IMPORTED_MODULE_0__models_checked_items_checked_item_hash_list__["a" /* default */] ? currentChecked.getCheckedOutput() : {};
    };

    this.id = id === null ? __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].uId16() : id;
    this.init();
    if (isFunction(dataSourceFunction, 'A <HierarchySelectorDataSourceProvider> dataSourceFunction property should be a function that returns a promise object')) {
      dataSourcePromiseFunction.set(this, dataSourceFunction);
    }
    if (callback && isFunction(callback, 'A <HierarchySelectorDataSourceProvider> callback property should be a function')) {
      callbackFunction.set(this, callback);
    }
  }

  HierarchySelectorDataSourceProvider.prototype.init = function init() {
    loaded.set(this, false);
    data.set(this, null);
    index.set(this, null);
    preChecked.set(this, null);
    dataSourcePromiseFunction.set(this, function () {
      return new Promise(function (resolve) {
        return resolve(null);
      });
    });
    callbackFunction.set(this, function () {});
    this.resetCheckedItemHashList();
  };

  HierarchySelectorDataSourceProvider.prototype.resetCheckedItemHashList = function resetCheckedItemHashList() {
    var checkedItemHashLists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    checked.delete(this);
    if (checkedItemHashLists && checkedItemHashLists[this.id]) {
      checked.set(this, checkedItemHashLists[this.id]);
    } else {
      checked.set(this, createCheckedItemHashList(this));
    }
  };

  HierarchySelectorDataSourceProvider.prototype.preCheckItems = function preCheckItems() {
    var checkedItemHashList = checked.get(this);
    var preCheckedItems = preChecked.get(this);
    if (checkedItemHashList) {
      checkedItemHashList.preCheckItems(preCheckedItems);
    }
  };

  HierarchySelectorDataSourceProvider.prototype.setPrecheckedItems = function setPrecheckedItems(preCheckedItems) {
    preChecked.set(this, preCheckedItems);
    if (this.isLoaded) {
      this.preCheckItems();
    }
  };

  _createClass(HierarchySelectorDataSourceProvider, [{
    key: 'isLoaded',
    get: function get() {
      return loaded.get(this);
    }
  }, {
    key: 'isData',
    get: function get() {
      return data.get(this) !== null;
    }
  }]);

  return HierarchySelectorDataSourceProvider;
}();



/***/ }),

/***/ "./services/group-name-calculation.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = calculateGroupName;
var SOME_GROUP_NAME = 'Default group';

function calculateGroupName(groupName, changedByUser, checkedHashLists) {
  if (changedByUser) return groupName;

  var hashListKeys = Object.keys(checkedHashLists);
  /* No one hashList */
  if (hashListKeys.length === 0) return '';
  /* More then one hash list from different data sources */
  if (hashListKeys.length > 1) return SOME_GROUP_NAME;
  /* Initializing variables */
  var names = [];
  var checkedHash = checkedHashLists[hashListKeys[0]].get();
  var maxParentLength = 0;
  var i = 0;
  var j = 0;
  /* Starting looking for parents */
  var allParents = Object.keys(checkedHash).map(function (key) {
    var parentArray = checkedHash[key].getParents();
    if (parentArray.length > maxParentLength) maxParentLength = parentArray.length;

    return parentArray;
  });
  /* Iteration over all parent sets */
  while (i < maxParentLength) {
    var foundParent = null;
    var moreThanOneParent = false;
    for (j = 0; j < allParents.length; j += 1) {
      var el = allParents[j][i];
      if (el && el !== foundParent) {
        moreThanOneParent = foundParent !== null;
        if (moreThanOneParent) break;else foundParent = el;
      }
    }
    if (moreThanOneParent) break;else names.push(foundParent.name);

    i += 1;
  }
  if (names.length === 0) names.push(SOME_GROUP_NAME);

  return names.join(' / ');
}

/***/ }),

/***/ "./services/types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dataSourceProviderType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_source_provider__ = __webpack_require__("./services/data-source-provider.js");
/* eslint-disable import/prefer-default-export */




var dataSourceProviderType = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["instanceOf"])(__WEBPACK_IMPORTED_MODULE_1__data_source_provider__["a" /* default */]);



/***/ }),

/***/ "./types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return popoverOptionsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return viewOptionsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hierarchyItemShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hierarchyItemListShape; });
/* unused harmony export selectedItemsShape */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return foundItemsShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return tabOptionsType; });
/* unused harmony export preCheckedItemsShape */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return preCheckedItemsListShape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_types__ = __webpack_require__("./services/types.js");




var hierarchyItemShape = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  id: __WEBPACK_IMPORTED_MODULE_0_prop_types__["number"].isRequired,
  name: __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"].isRequired
});

hierarchyItemShape.children = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["arrayOf"])(hierarchyItemShape);

var hierarchyItemListShape = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["arrayOf"])(hierarchyItemShape);

var selectedItemsShape = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  name: __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"].isRequired,
  items: hierarchyItemListShape
});

var foundItemsShape = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["arrayOf"])(selectedItemsShape);

var preCheckedItemsShape = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  id: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["number"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"]]).isRequired,
  parentId: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["number"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"]]),
  isCheckedAll: __WEBPACK_IMPORTED_MODULE_0_prop_types__["bool"]
});

var preCheckedItemsListShape = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["arrayOf"])(preCheckedItemsShape);

var popoverOptionsType = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  btnOpenViewLabel: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]),
  searchPlaceHolder: __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"],
  pinnedGroupLabel: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]),
  recentGroupLabel: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]])
});

var tabOptionsType = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  title: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]).isRequired,
  dataSourceProvider: __WEBPACK_IMPORTED_MODULE_1__services_types__["a" /* dataSourceProviderType */].isRequired
});

var viewOptionsType = Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["shape"])({
  allLabel: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]),
  btnSelectLabel: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]),
  btnCancelLabel: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]),
  groupNameLabel: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]),
  groupNamePlaceHolder: __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"],
  listItemRenderFunction: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"],
  searchPlaceHolder: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]),
  selectedItemListLabel: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]),
  selectedItemRenderFunction: __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"],
  showInModal: __WEBPACK_IMPORTED_MODULE_0_prop_types__["bool"],
  title: Object(__WEBPACK_IMPORTED_MODULE_0_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_0_prop_types__["string"], __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"]]).isRequired
});



/***/ }),

/***/ "./utils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var B8 = 0x100000000;

function cx(m) {
  return Math.floor((1 + Math.random()) * m).toString(16).substring(1);
}

var Utils = (_temp = _class = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  Utils.isChild = function isChild(node, parent) {
    var child = node;

    while (child !== null) {
      if (child === parent) return true;
      child = child.parentNode;
    }

    return false;
  };

  Utils.isFocusOnCurrentTarget = function isFocusOnCurrentTarget(_ref) {
    var relatedTarget = _ref.relatedTarget,
        currentTarget = _ref.currentTarget;

    if (relatedTarget === null) return false;

    return Utils.isChild(relatedTarget, currentTarget);
  };

  Utils.HashToArray = function HashToArray(obj) {
    var values = [];
    Object.keys(obj).forEach(function (key) {
      values.push(obj[key]);
    });
    return values;
  };

  Utils.enoughSearchTextLength = function enoughSearchTextLength(text) {
    return typeof text === 'string' && text.length > 2;
  };

  return Utils;
}(), _class.uId8 = function () {
  return cx(B8);
}, _class.uId16 = function () {
  return cx(B8) + cx(B8);
}, _temp);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./index.js");


/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-bootstrap":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_bootstrap__;

/***/ })

/******/ });
});
//# sourceMappingURL=react-hierarchy-selector.js.map