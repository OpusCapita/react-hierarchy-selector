/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([220,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(214);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(213);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _containers_example_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(217);
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(491);
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_app_component_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _images_favicon_ico__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(492);
var _dec, _class;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var App = (_dec = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module), _dec(_class =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(App, _React$PureComponent);

  function App() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = App.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* BrowserRouter */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* Route */ "a"], {
      path: "/",
      component: _containers_example_container__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]
    }));
  };

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent)) || _class);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(407)(module)))

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ../node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ../node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);

// EXTERNAL MODULE: ../node_modules/react-bootstrap/es/Tooltip.js
var Tooltip = __webpack_require__(496);

// EXTERNAL MODULE: ../node_modules/react-bootstrap/es/OverlayTrigger.js + 1 modules
var OverlayTrigger = __webpack_require__(501);

// EXTERNAL MODULE: ../node_modules/react-icons/fa/index.esm.js + 4 modules
var index_esm = __webpack_require__(23);

// CONCATENATED MODULE: ../src/models/base.js
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var base_dataSourceProvider = new WeakMap();

var BaseModel =
/*#__PURE__*/
function () {
  function BaseModel(dataProvider) {
    base_dataSourceProvider.set(this, dataProvider);
  }

  _createClass(BaseModel, [{
    key: "dataSourceProvider",
    get: function get() {
      return base_dataSourceProvider.get(this);
    }
  }]);

  return BaseModel;
}();


// CONCATENATED MODULE: ../src/models/checked-items/checked-hash-item.js
/* eslint-disable array-callback-return */
var checked_hash_item_parents = new WeakMap();
var checkedAll = new WeakMap();
var checkedItemsBackUp = new WeakMap();
var checked_hash_item_checkedItems = new WeakMap();

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

var CheckedHashItem =
/*#__PURE__*/
function () {
  function CheckedHashItem(prnts) {
    if (prnts === void 0) {
      prnts = [];
    }

    this.timestamp = Date.now();
    checked_hash_item_parents.set(this, prnts.slice());
    checkedAll.set(this, false);
    checked_hash_item_checkedItems.set(this, []);
    checkedItemsBackUp.set(this, []);
  }

  var _proto = CheckedHashItem.prototype;

  _proto.getParents = function getParents() {
    return checked_hash_item_parents.get(this).slice();
  };

  _proto.getCheckedItems = function getCheckedItems() {
    return checked_hash_item_checkedItems.get(this).slice();
  };

  _proto.checkAll = function checkAll() {
    var prnts = checked_hash_item_parents.get(this);
    checkedAll.set(this, true);
    this.clearChecked();
    var initialParent = prnts.length > 0 ? prnts[prnts.length - 1] : undefined;
    if (initialParent) addChildren(this, initialParent);
  };

  _proto.uncheckAll = function uncheckAll() {
    checkedAll.set(this, false);
    this.clearChecked();
  };

  _proto.isCheckedAll = function isCheckedAll() {
    return checkedAll.get(this);
  };

  _proto.clearChecked = function clearChecked() {
    checked_hash_item_checkedItems.get(this).splice(0);
  };

  _proto.addCheckedItem = function addCheckedItem(item) {
    checked_hash_item_checkedItems.get(this).push(item);
  };

  _proto.removeCheckedItem = function removeCheckedItem(item) {
    var items = checked_hash_item_checkedItems.get(this);
    items.reduceRight(function (acc, currentItem, index, currentItems) {
      if (currentItem.id === item.id) {
        currentItems.splice(index, 1);
      }
    }, []);
  };

  _proto.createCopy = function createCopy() {
    var copy = new CheckedHashItem();
    checked_hash_item_parents.set(copy, [].concat(checked_hash_item_parents.get(this)));
    checkedAll.set(copy, checkedAll.get(this));
    checked_hash_item_checkedItems.set(copy, [].concat(checked_hash_item_checkedItems.get(this)));
    checkedItemsBackUp.set(copy, [].concat(checkedItemsBackUp.get(this)));
    return copy;
  };

  _proto.makeBackUp = function makeBackUp() {
    checkedItemsBackUp.set(this, [].concat(checked_hash_item_checkedItems.get(this)));
  };

  _proto.restoreFromBackUp = function restoreFromBackUp() {
    checked_hash_item_checkedItems.set(this, [].concat(checkedItemsBackUp.get(this)));
  };

  return CheckedHashItem;
}();


// CONCATENATED MODULE: ../src/models/checked-items/checked-output.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  _defineProperty(this, "get", function () {
    return output.get(_this).slice();
  });

  _defineProperty(this, "add", function (checkedHashItem) {
    addToOutput(_this, checkedHashItem);
  });

  _defineProperty(this, "clear", function () {
    output.get(_this).splice(0);
  });

  output.set(this, []);
};


// CONCATENATED MODULE: ../src/models/checked-items/checked-item-hash-list.js
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function checked_item_hash_list_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var sourceProvider = new WeakMap();
var providerId = new WeakMap();
var checked_item_hash_list_checked = new WeakMap();
var checked_item_hash_list_index = new WeakMap();
var lastUpdate = new WeakMap();

function clearAll(list) {
  checked_item_hash_list_checked.set(list, {});
}

function getChildHashesOfCheckedItems(list, hash) {
  var checkedItems = checked_item_hash_list_checked.get(list);
  var hashes = [];
  Object.keys(checkedItems).forEach(function (currentHash) {
    if (hash !== currentHash && currentHash.indexOf(hash) === 0) {
      hashes.push(currentHash);
    }
  });
  return hashes;
}

function removeItem(list, parentIds, id) {
  var checkedItems = checked_item_hash_list_checked.get(list);
  var dataIndex = checked_item_hash_list_index.get(list);
  var indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    var parentHash = indexItem.parentHash;

    if (checkedItems[parentHash]) {
      checkedItems[parentHash].removeCheckedItem(indexItem.item); // Checks if there is no checked items, then removes a hash

      if (checkedItems[parentHash].getCheckedItems().length === 0) {
        delete checkedItems[parentHash];
      }
    }
  }
}

function removeHash(list, hash) {
  var checkedItems = checked_item_hash_list_checked.get(list);

  if (checkedItems[hash]) {
    checkedItems[hash].uncheckAll();
    delete checkedItems[hash];
  }
}

function removeAllItems(list, parentIds, id) {
  var dataIndex = checked_item_hash_list_index.get(list);
  var indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    var hash = dataIndex.getHash(indexItem);
    removeHash(list, hash);
  }
}

function addItem(list, parentIds, id) {
  var checkedItems = checked_item_hash_list_checked.get(list);
  var dataIndex = checked_item_hash_list_index.get(list);
  var indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    var parentHash = indexItem.parentHash;
    var parents = dataIndex.getParents(indexItem);
    if (!checkedItems[parentHash]) checkedItems[parentHash] = new CheckedHashItem(parents);
    var hashItem = checkedItems[parentHash];
    hashItem.addCheckedItem(indexItem.item);
  }
}

function addAllItems(list, parentIds, id) {
  var checkedItems = checked_item_hash_list_checked.get(list);
  var dataIndex = checked_item_hash_list_index.get(list);
  var indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    var hash = dataIndex.getHash(indexItem);
    var parents = [].concat(dataIndex.getParents(indexItem), [indexItem.item]);
    var childHashes = getChildHashesOfCheckedItems(list, hash) || [];
    childHashes.forEach(function (h) {
      removeHash(list, h);
    });
    if (!checkedItems[hash]) checkedItems[hash] = new CheckedHashItem(parents);
    var hashItem = checkedItems[hash];
    hashItem.checkAll();
  }
}

function preCheckItems(list, preCheckedItems) {
  var dataIndex = checked_item_hash_list_index.get(list);

  var getHash = function getHash(parentId, id) {
    return parentId ? parentId + "_" + id : "" + id;
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

var checked_item_hash_list_CheckedItemHashList =
/*#__PURE__*/
function (_BaseModel) {
  _inheritsLoose(CheckedItemHashList, _BaseModel);

  function CheckedItemHashList(dataSourceProvider) {
    var _this;

    _this = _BaseModel.call(this, dataSourceProvider) || this;

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "get", function () {
      return checked_item_hash_list_checked.get(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "getAllCheckedItems", function () {
      var checkedHashArray = checked_item_hash_list_checked.get(_assertThisInitialized(_this));
      var list = [];
      Object.keys(checkedHashArray).forEach(function (key) {
        list = list.concat(checkedHashArray[key].getCheckedItems());
      });
      return list;
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "getCheckedItems", function (parentIds) {
      if (parentIds === void 0) {
        parentIds = [];
      }

      var checkedHashItem = _this.getHashItem(parentIds);

      var result = [];

      if (checkedHashItem) {
        result = checkedHashItem.getCheckedItems();
      }

      return result;
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "getIsCheckedAll", function (parentIds) {
      if (parentIds === void 0) {
        parentIds = [];
      }

      var checkedHashItem = _this.getHashItem(parentIds);

      return checkedHashItem ? checkedHashItem.isCheckedAll() : false;
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "getCheckedItemsCount", function () {
      var checkedHashArray = checked_item_hash_list_checked.get(_assertThisInitialized(_this));
      var count = 0;
      Object.keys(checkedHashArray).forEach(function (key) {
        count += checkedHashArray[key].getCheckedItems().length;
      });
      return count;
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "getId", function () {
      return providerId.get(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "getHashItem", function (parentIds) {
      if (parentIds === void 0) {
        parentIds = [];
      }

      var checkedHashArray = checked_item_hash_list_checked.get(_assertThisInitialized(_this));
      var dataIndex = checked_item_hash_list_index.get(_assertThisInitialized(_this));
      var hash = dataIndex.getHashFromIds(parentIds);

      if (hash === '' || !checkedHashArray[hash]) {
        return null;
      }

      return checkedHashArray[hash];
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "getLastUpdateStamp", function () {
      return lastUpdate.get(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "getCheckedOutput", function () {
      var resultObject = {
        dataSourceProviderId: _this.getId(),
        checked: []
      };
      var checkedOutput = new CheckedOutput();
      var hashes = checked_item_hash_list_checked.get(_assertThisInitialized(_this));
      Object.keys(hashes).forEach(function (hash) {
        var checkedHashItem = hashes[hash];
        checkedOutput.add(checkedHashItem);
      });
      resultObject.checked = checkedOutput.get();
      return resultObject;
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "add", function (parentIds, id) {
      addItem(_assertThisInitialized(_this), parentIds, id);
      afterUpdate(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "addAll", function (parentIds, id) {
      addAllItems(_assertThisInitialized(_this), parentIds, id);
      afterUpdate(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "createCopy", function () {
      var copy = new CheckedItemHashList(sourceProvider.get(_assertThisInitialized(_this)));
      providerId.set(copy, providerId.get(_assertThisInitialized(_this)));
      lastUpdate.set(copy, lastUpdate.get(_assertThisInitialized(_this)));
      checked_item_hash_list_index.set(copy, checked_item_hash_list_index.get(_assertThisInitialized(_this)).clone());
      var chkd = Object.assign({}, checked_item_hash_list_checked.get(_assertThisInitialized(_this)));
      Object.keys(chkd).forEach(function (key) {
        chkd[key] = chkd[key].createCopy();
      });
      checked_item_hash_list_checked.set(copy, chkd);
      return copy;
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "clearAll", function () {
      clearAll(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "preCheckItems", function (preCheckedItems) {
      preCheckItems(_assertThisInitialized(_this), preCheckedItems);
      afterUpdate(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "remove", function (parentIds, id) {
      removeItem(_assertThisInitialized(_this), parentIds, id);
      afterUpdate(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "removeAll", function (parentIds, id) {
      removeAllItems(_assertThisInitialized(_this), parentIds, id);
      afterUpdate(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "removeHash", function (hash) {
      removeHash(_assertThisInitialized(_this), hash);
      afterUpdate(_assertThisInitialized(_this));
    });

    checked_item_hash_list_defineProperty(_assertThisInitialized(_this), "toString", function () {
      var list = checked_item_hash_list_checked.get(_assertThisInitialized(_this));
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
    });

    sourceProvider.set(_assertThisInitialized(_this), dataSourceProvider);
    providerId.set(_assertThisInitialized(_this), dataSourceProvider.id);
    lastUpdate.set(_assertThisInitialized(_this), 0);
    checked_item_hash_list_checked.set(_assertThisInitialized(_this), {});
    checked_item_hash_list_index.set(_assertThisInitialized(_this), dataSourceProvider.getIndex());
    return _this;
  }

  return CheckedItemHashList;
}(BaseModel);

/* harmony default export */ var checked_item_hash_list = (checked_item_hash_list_CheckedItemHashList);
// CONCATENATED MODULE: ../src/models/data-index.js
function data_index_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-param-reassign */
var data_index_index = new WeakMap();

function getHashFromIds(ids) {
  return ids.join('_');
}

function getIdsFromHash(hash) {
  return hash ? hash.split('_') : [];
}

function getFromIndex(obj, ids) {
  var dataIndex = data_index_index.get(obj);
  var hash = getHashFromIds(ids);
  return dataIndex[hash] ? Object.assign({}, dataIndex[hash]) : null;
}

function getParents(obj, hash, parents) {
  if (parents === void 0) {
    parents = [];
  }

  var ids = getIdsFromHash(hash);

  if (ids.length > 1) {
    ids.pop();
    var newHash = getHashFromIds(ids);
    var dataIndex = data_index_index.get(obj);
    if (dataIndex[newHash] === undefined) throw new Error("Hash '" + newHash + "' is missed from an index");
    parents.unshift(dataIndex[newHash].item);
    getParents(obj, newHash, parents);
  }

  return parents;
}

function addIdToHash(hash, addedId) {
  var ids = getIdsFromHash(hash);
  return getHashFromIds([].concat(ids, [addedId]));
}

function createIndex(items, indexResult, parents) {
  if (indexResult === void 0) {
    indexResult = {};
  }

  if (parents === void 0) {
    parents = [];
  }

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

  data_index_defineProperty(this, "get", function () {
    return Object.assign({}, data_index_index.get(_this));
  });

  data_index_defineProperty(this, "getHash", function (indexItem) {
    if (!indexItem) throw new Error('DataIndex::getParents(): there is no indexItem');
    if (!indexItem.item) throw new Error('DataIndex::getParents(): item is not found in indexItem');
    return addIdToHash(indexItem.parentHash, indexItem.item.id);
  });

  data_index_defineProperty(this, "getHashFromIds", function (ids) {
    return getHashFromIds(ids);
  });

  data_index_defineProperty(this, "getParentsByHash", function (hash) {
    return getParents(_this, hash);
  });

  data_index_defineProperty(this, "getParents", function (indexItem) {
    return getParents(_this, _this.getHash(indexItem));
  });

  data_index_defineProperty(this, "getFromIndex", function (parentIds, id) {
    return getFromIndex(_this, [].concat(parentIds, [id]));
  });

  data_index_defineProperty(this, "clone", function () {
    return new DataIndex(_this);
  });

  data_index_defineProperty(this, "forEach", function (callBack) {
    var dataIndex = data_index_index.get(_this);
    Object.keys(dataIndex).forEach(function (key) {
      var indexItem = dataIndex[key];
      callBack(indexItem.item, getIdsFromHash(indexItem.parentHash));
    });
  });

  if (data instanceof DataIndex) {
    data_index_index.set(this, data.get());
  } else {
    data_index_index.set(this, createIndex(data));
  }
};


// CONCATENATED MODULE: ../src/models/item.entity.js
var ItemEntity = function ItemEntity(data) {
  this.id = data && data.id ? data.id : null;
  this.name = data && data.name ? data.name : null;
  this.children = data && Array.isArray(data.children) ? data.children : [];
};


// CONCATENATED MODULE: ../src/utils.js
function utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var B8 = 0x100000000;

function cx(m) {
  return Math.floor((1 + Math.random()) * m).toString(16).substring(1);
}

var Utils =
/*#__PURE__*/
function () {
  function Utils() {}

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
    return typeof text === 'string' && text.length > 1;
  };

  return Utils;
}();

utils_defineProperty(Utils, "uId8", function () {
  return cx(B8);
});

utils_defineProperty(Utils, "uId16", function () {
  return cx(B8) + cx(B8);
});


// CONCATENATED MODULE: ../src/services/data-source-provider.js
function data_source_provider_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function data_source_provider_createClass(Constructor, protoProps, staticProps) { if (protoProps) data_source_provider_defineProperties(Constructor.prototype, protoProps); if (staticProps) data_source_provider_defineProperties(Constructor, staticProps); return Constructor; }

function data_source_provider_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-param-reassign */




var loaded = new WeakMap();
var data_source_provider_data = new WeakMap();
var data_source_provider_index = new WeakMap();
var data_source_provider_checked = new WeakMap();
var preChecked = new WeakMap();
var dataSourcePromiseFunction = new WeakMap();
var callbackFunction = new WeakMap();

function isFunction(func, errorMessage) {
  if (func instanceof Function) {
    return true;
  }

  throw new Error(errorMessage);
}

function data_source_provider_createIndex(items) {
  var dataIndex = new DataIndex(items);
  return dataIndex;
}

function createCheckedItemHashList(dataSourceProvider) {
  return new checked_item_hash_list(dataSourceProvider);
}

var data_source_provider_HierarchySelectorDataSourceProvider =
/*#__PURE__*/
function () {
  function HierarchySelectorDataSourceProvider(dataSourceFunction, id, callback) {
    var _this = this;

    if (id === void 0) {
      id = null;
    }

    if (callback === void 0) {
      callback = null;
    }

    data_source_provider_defineProperty(this, "loadData", function () {
      var promise = dataSourcePromiseFunction.get(_this)();

      if (typeof promise === 'object' && promise.then instanceof Function) {
        return promise.then(function (response) {
          data_source_provider_data.set(_this, response);
          data_source_provider_index.set(_this, data_source_provider_createIndex(response));

          _this.resetCheckedItemHashList();

          _this.preCheckItems();

          loaded.set(_this, true);
          callbackFunction.get(_this)(response);
          return response;
        });
      }

      throw new Error('A <HierarchySelectorDataSourceProvider> dataSourceFunction property didn\'t return a promise object');
    });

    data_source_provider_defineProperty(this, "getData", function () {
      return data_source_provider_data.get(_this);
    });

    data_source_provider_defineProperty(this, "getFirstItem", function () {
      var allItems = data_source_provider_data.get(_this);
      if (!_this.isLoaded || !Array.isArray(allItems) || allItems.length === 0) return null;
      var firstElement = allItems[0];
      return new ItemEntity({
        id: firstElement.id,
        name: firstElement.name
      });
    });

    data_source_provider_defineProperty(this, "getIndex", function () {
      return data_source_provider_index.get(_this);
    });

    data_source_provider_defineProperty(this, "getChecked", function () {
      return data_source_provider_checked.get(_this);
    });

    data_source_provider_defineProperty(this, "getAllCheckedItems", function () {
      var currentChecked = data_source_provider_checked.get(_this);
      return currentChecked instanceof checked_item_hash_list ? currentChecked.getAllCheckedItems() : [];
    });

    data_source_provider_defineProperty(this, "getCheckedOutput", function () {
      var currentChecked = data_source_provider_checked.get(_this);
      return currentChecked instanceof checked_item_hash_list ? currentChecked.getCheckedOutput() : {};
    });

    this.id = id === null ? Utils.uId16() : id;
    this.init();

    if (isFunction(dataSourceFunction, 'A <HierarchySelectorDataSourceProvider> dataSourceFunction property should be a function that returns a promise object')) {
      dataSourcePromiseFunction.set(this, dataSourceFunction);
    }

    if (callback && isFunction(callback, 'A <HierarchySelectorDataSourceProvider> callback property should be a function')) {
      callbackFunction.set(this, callback);
    }
  }

  var _proto = HierarchySelectorDataSourceProvider.prototype;

  _proto.init = function init() {
    loaded.set(this, false);
    data_source_provider_data.set(this, null);
    data_source_provider_index.set(this, null);
    preChecked.set(this, null);
    dataSourcePromiseFunction.set(this, function () {
      return new Promise(function (resolve) {
        return resolve(null);
      });
    });
    callbackFunction.set(this, function () {});
    this.resetCheckedItemHashList();
  };

  _proto.resetCheckedItemHashList = function resetCheckedItemHashList(checkedItemHashLists) {
    if (checkedItemHashLists === void 0) {
      checkedItemHashLists = null;
    }

    data_source_provider_checked["delete"](this);

    if (checkedItemHashLists && checkedItemHashLists[this.id]) {
      data_source_provider_checked.set(this, checkedItemHashLists[this.id]);
    } else {
      data_source_provider_checked.set(this, createCheckedItemHashList(this));
    }
  };

  _proto.preCheckItems = function preCheckItems() {
    var checkedItemHashList = data_source_provider_checked.get(this);
    var preCheckedItems = preChecked.get(this);

    if (checkedItemHashList) {
      checkedItemHashList.preCheckItems(preCheckedItems);
    }
  };

  _proto.setPrecheckedItems = function setPrecheckedItems(preCheckedItems) {
    preChecked.set(this, preCheckedItems);

    if (this.isLoaded) {
      this.preCheckItems();
    }
  };

  data_source_provider_createClass(HierarchySelectorDataSourceProvider, [{
    key: "isLoaded",
    get: function get() {
      return loaded.get(this);
    }
  }, {
    key: "isData",
    get: function get() {
      return data_source_provider_data.get(this) !== null;
    }
  }]);

  return HierarchySelectorDataSourceProvider;
}();


// CONCATENATED MODULE: ../src/services/types.js
/* eslint-disable import/prefer-default-export */


var dataSourceProviderType = Object(prop_types["instanceOf"])(data_source_provider_HierarchySelectorDataSourceProvider);

// CONCATENATED MODULE: ../src/types.js


var hierarchyItemShape = Object(prop_types["shape"])({
  id: prop_types["number"].isRequired,
  name: prop_types["string"].isRequired
});
hierarchyItemShape.children = Object(prop_types["arrayOf"])(hierarchyItemShape);
var hierarchyItemListShape = Object(prop_types["arrayOf"])(hierarchyItemShape);
var selectedItemsShape = Object(prop_types["shape"])({
  name: prop_types["string"].isRequired,
  items: hierarchyItemListShape
});
var foundItemsShape = Object(prop_types["arrayOf"])(selectedItemsShape);
var preCheckedItemsShape = Object(prop_types["shape"])({
  id: Object(prop_types["oneOfType"])([prop_types["number"], prop_types["string"]]).isRequired,
  parentId: Object(prop_types["oneOfType"])([prop_types["number"], prop_types["string"]]),
  isCheckedAll: prop_types["bool"]
});
var preCheckedItemsListShape = Object(prop_types["arrayOf"])(preCheckedItemsShape);
var popoverOptionsType = Object(prop_types["shape"])({
  btnOpenViewLabel: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  foundItemRenderFunction: prop_types["func"],
  searchPlaceHolder: prop_types["string"],
  searchTooltip: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  pinnedGroupLabel: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  recentGroupLabel: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]])
});
var tabOptionsType = Object(prop_types["shape"])({
  title: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]).isRequired,
  dataSourceProvider: dataSourceProviderType.isRequired
});
var viewOptionsType = Object(prop_types["shape"])({
  allLabel: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  btnSelectLabel: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  btnCancelLabel: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  groupNameLabel: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  groupNamePlaceHolder: prop_types["string"],
  listItemRenderFunction: prop_types["func"],
  searchPlaceHolder: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  searchTooltip: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  selectedItemListLabel: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]),
  selectedItemRenderFunction: prop_types["func"],
  showInModal: prop_types["bool"],
  title: Object(prop_types["oneOfType"])([prop_types["string"], prop_types["element"]]).isRequired,
  hideGroupNameInput: prop_types["bool"]
});

// EXTERNAL MODULE: ../node_modules/@opuscapita/react-spinner/lib/es/index.js + 2 modules
var es = __webpack_require__(218);

// CONCATENATED MODULE: ../src/components/spinner/spinner.component.jsx
function spinner_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var DELAY = 50;

var spinner_component_SelectorSpinner =
/*#__PURE__*/
function (_React$PureComponent) {
  spinner_component_inheritsLoose(SelectorSpinner, _React$PureComponent);

  function SelectorSpinner() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = SelectorSpinner.prototype;

  _proto.render = function render() {
    return react_default.a.createElement(es["a" /* default */], {
      delay: DELAY
    });
  };

  return SelectorSpinner;
}(react_default.a.PureComponent);


// CONCATENATED MODULE: ../src/components/spinner/index.js

/* harmony default export */ var spinner = (spinner_component_SelectorSpinner);
// EXTERNAL MODULE: ../node_modules/@opuscapita/react-searchbar/lib/es/index.js + 4 modules
var lib_es = __webpack_require__(107);

// CONCATENATED MODULE: ../src/models/group.entity.js
var GroupEntity = function GroupEntity(name, items) {
  if (items === void 0) {
    items = [];
  }

  this.name = name;
  this.items = items;
};


// CONCATENATED MODULE: ../src/models/search.js
function search_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function search_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function search_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable max-len */




var isFound = function isFound(searchingIn, searchingFor) {
  return searchingIn && searchingIn.toLowerCase && searchingFor && searchingFor.toLowerCase && searchingIn.toLowerCase().indexOf(searchingFor.toLowerCase()) > -1;
};

var search_findFromHierarchy = function findFromHierarchy(data, searchingFor, foundData, groupNames, parentId) {
  if (foundData === void 0) {
    foundData = {};
  }

  if (groupNames === void 0) {
    groupNames = [];
  }

  if (parentId === void 0) {
    parentId = null;
  }

  var result = foundData;

  if (data) {
    data.forEach(function (item) {
      var isChildren = item.children && Array.isArray(item.children) && item.children.length > 0;
      var parentIds = groupNames.map(function (i) {
        return i.id;
      });

      var currentItem = _extends({
        parentId: parentId,
        parentIds: parentIds,
        isChildren: isChildren,
        isCheckedAll: isChildren
      }, item);

      if (isChildren) {
        result = findFromHierarchy(currentItem.children, searchingFor, result, [].concat(groupNames, [{
          id: currentItem.id,
          name: currentItem.name
        }]), currentItem.id);
      } else if (currentItem.name && isFound(currentItem.name, searchingFor)) {
        var groupId = parentIds.join('_');
        var groupName = groupNames.map(function (i) {
          return i.name;
        }).join(' / ');

        if (result[groupId] === undefined) {
          result[groupId] = new GroupEntity(groupName);
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

var search_Search =
/*#__PURE__*/
function (_BaseModel) {
  search_inheritsLoose(Search, _BaseModel);

  function Search() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BaseModel.call.apply(_BaseModel, [this].concat(args)) || this;

    search_defineProperty(search_assertThisInitialized(_this), "getFoundFromHierarchy", function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return null;
      return Utils.HashToArray(search_findFromHierarchy(_this.dataSourceProvider.getData(), searchingFor));
    });

    search_defineProperty(search_assertThisInitialized(_this), "search", function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return [];
      var data = filter(_this.dataSourceProvider.getData(), searchingFor);
      return data;
    });

    return _this;
  }

  return Search;
}(BaseModel);


// CONCATENATED MODULE: ../src/components/popover/layouts/common.layout.jsx
function common_layout_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var common_layout_HSPopoverCommonLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  common_layout_inheritsLoose(HSPopoverCommonLayout, _React$PureComponent);

  function HSPopoverCommonLayout() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HSPopoverCommonLayout.prototype;

  _proto.render = function render() {
    return react_default.a.createElement("div", {
      className: "oc-hierarchy-selector-popover-layout"
    }, this.props.children);
  };

  return HSPopoverCommonLayout;
}(react_default.a.PureComponent);


common_layout_HSPopoverCommonLayout.defaultProps = {
  children: null
};
// CONCATENATED MODULE: ../src/components/popover/layouts/spinner.layout.jsx
function spinner_layout_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var spinner_layout_HSSpinnerLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  spinner_layout_inheritsLoose(HSSpinnerLayout, _React$PureComponent);

  function HSSpinnerLayout() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HSSpinnerLayout.prototype;

  _proto.render = function render() {
    return react_default.a.createElement(common_layout_HSPopoverCommonLayout, null, react_default.a.createElement(spinner, null));
  };

  return HSSpinnerLayout;
}(react_default.a.PureComponent);


// CONCATENATED MODULE: ../src/components/popover/select-btn.component.jsx
function select_btn_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var select_btn_component_HierarchySelectorSelectButton =
/*#__PURE__*/
function (_React$PureComponent) {
  select_btn_component_inheritsLoose(HierarchySelectorSelectButton, _React$PureComponent);

  function HierarchySelectorSelectButton() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HierarchySelectorSelectButton.prototype;

  _proto.render = function render() {
    return react_default.a.createElement("ul", {
      className: "list-group"
    }, react_default.a.createElement("li", {
      className: "list-group-item"
    }, react_default.a.createElement("button", {
      className: "btn-open-view",
      onClick: this.props.onClick
    }, this.props.label)));
  };

  return HierarchySelectorSelectButton;
}(react_default.a.PureComponent);


select_btn_component_HierarchySelectorSelectButton.defaultProps = {
  label: 'Select...',
  onClick: function onClick() {}
};
// EXTERNAL MODULE: ../node_modules/react-list/react-list.js
var react_list = __webpack_require__(73);
var react_list_default = /*#__PURE__*/__webpack_require__.n(react_list);

// CONCATENATED MODULE: ../src/components/popover/constants.js
var CLASS_NAME_SEARCH_FOCUSABLE = 'search-focusable';
var KEYS = {
  UP: 38,
  DOWN: 40
};
// CONCATENATED MODULE: ../src/components/popover/search/found-items.component.jsx
function found_items_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function found_items_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function found_items_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/click-events-have-key-events */







var found_items_component_PopoverFoundItems =
/*#__PURE__*/
function (_React$PureComponent) {
  found_items_component_inheritsLoose(PopoverFoundItems, _React$PureComponent);

  function PopoverFoundItems(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    found_items_component_defineProperty(found_items_component_assertThisInitialized(_this), "onGroupClickHanlder", function (e) {
      e.preventDefault();

      _this.toggleCollapse();
    });

    found_items_component_defineProperty(found_items_component_assertThisInitialized(_this), "onClickHanlder", function (e, key) {
      e.preventDefault();

      _this.selectItem(key);
    });

    found_items_component_defineProperty(found_items_component_assertThisInitialized(_this), "onEnterPressed", function (e, key) {
      if (e.keyCode === 13) {
        e.preventDefault();

        _this.selectItem(key);
      }
    });

    found_items_component_defineProperty(found_items_component_assertThisInitialized(_this), "getItems", function () {
      var data = _this.props.data;

      var itemRenderer = function itemRenderer(index, key) {
        var item = data[index];
        return react_default.a.createElement("div", {
          className: "list-group-item found-item " + CLASS_NAME_SEARCH_FOCUSABLE,
          key: key,
          tabIndex: "0",
          onKeyDown: function onKeyDown(e) {
            return _this.onEnterPressed(e, index);
          },
          onClick: function onClick(e) {
            return _this.onClickHanlder(e, index);
          }
        }, _this.props.itemRenderFunction ? _this.props.itemRenderFunction(item, _this.defaultItemRenderFunction) : _this.defaultItemRenderFunction(item));
      };

      return react_default.a.createElement(react_list_default.a, {
        itemRenderer: itemRenderer,
        length: data.length,
        type: "uniform",
        useStaticSize: true
      });
    });

    found_items_component_defineProperty(found_items_component_assertThisInitialized(_this), "getIcon", function () {
      return _this.state.collapsed ? react_default.a.createElement(index_esm["b" /* FaCaretRight */], null) : react_default.a.createElement(index_esm["a" /* FaCaretDown */], null);
    });

    found_items_component_defineProperty(found_items_component_assertThisInitialized(_this), "defaultItemRenderFunction", function (item) {
      return react_default.a.createElement("span", null, item.name);
    });

    found_items_component_defineProperty(found_items_component_assertThisInitialized(_this), "selectItem", function (key) {
      var flags = {
        interactive: true
      };

      _this.props.onSelect(_this.props.data[key], flags);
    });

    found_items_component_defineProperty(found_items_component_assertThisInitialized(_this), "toggleCollapse", function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    });

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  var _proto = PopoverFoundItems.prototype;

  _proto.render = function render() {
    return react_default.a.createElement("li", {
      className: "list-group-item found-group-item",
      onClick: this.onGroupClickHanlder
    }, this.getIcon(), react_default.a.createElement("span", null, this.props.groupName), !this.state.collapsed && this.props.data.length > 0 ? this.getItems() : null);
  };

  return PopoverFoundItems;
}(react_default.a.PureComponent);


found_items_component_PopoverFoundItems.defaultProps = {
  onSelect: function onSelect() {},
  data: [],
  itemRenderFunction: null
};
// CONCATENATED MODULE: ../src/components/popover/search/search-content.component.jsx
function search_content_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function search_content_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function search_content_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var search_content_component_PopoverSearchContent =
/*#__PURE__*/
function (_React$PureComponent) {
  search_content_component_inheritsLoose(PopoverSearchContent, _React$PureComponent);

  function PopoverSearchContent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    search_content_component_defineProperty(search_content_component_assertThisInitialized(_this), "getFoundItems", function () {
      var foundItems = _this.props.foundItems;
      return react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-popover-search-content",
        ref: function ref(el) {
          _this.mainElement = el;
        }
      }, react_default.a.createElement("ul", {
        className: "list-group"
      }, Object.keys(foundItems).map(function (key) {
        return react_default.a.createElement(found_items_component_PopoverFoundItems, {
          key: foundItems[key].name,
          groupName: foundItems[key].name,
          data: foundItems[key].items,
          onSelect: _this.props.onSelect,
          itemRenderFunction: _this.props.itemRenderFunction
        });
      })));
    });

    search_content_component_defineProperty(search_content_component_assertThisInitialized(_this), "getMessage", function (message) {
      return react_default.a.createElement("p", {
        className: "message warning"
      }, message);
    });

    return _this;
  }

  var _proto = PopoverSearchContent.prototype;

  _proto.render = function render() {
    if (this.props.foundItems.length === 0) {
      return this.getMessage(this.props.noMatchesLabel);
    } else if (this.props.foundItems.length > 100) {
      return this.getMessage(this.props.tooMuchMatchesLabel);
    }

    return this.getFoundItems();
  };

  return PopoverSearchContent;
}(react_default.a.PureComponent);


search_content_component_PopoverSearchContent.defaultProps = {
  onSelect: function onSelect() {},
  itemRenderFunction: null,
  foundItems: [],
  noMatchesLabel: 'No matches',
  tooMuchMatchesLabel: 'Too much matches found, refine search.'
};
// CONCATENATED MODULE: ../src/components/popover/event-handlers.js


function getFocusableFoundElements(target) {
  return Array.prototype.slice.call(target.getElementsByClassName(CLASS_NAME_SEARCH_FOCUSABLE));
}

function calculateNewIndex(key, index, listLength) {
  var i = index;

  switch (key) {
    case KEYS.UP:
      i -= 1;
      break;

    case KEYS.DOWN:
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

var event_handlers_EventHandler =
/*#__PURE__*/
function () {
  function EventHandler() {}

  EventHandler.searchElementFocusHanlder = function searchElementFocusHanlder(event) {
    var key = event.keyCode;
    if (!key || key !== KEYS.UP && key !== KEYS.DOWN) return;
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


// EXTERNAL MODULE: ../src/components/popover/popover.scss
var popover = __webpack_require__(458);

// CONCATENATED MODULE: ../src/components/popover/popover.component.jsx
function popover_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function popover_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function popover_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */















var popover_component_HierarchySelectorPopover =
/*#__PURE__*/
function (_React$PureComponent) {
  popover_component_inheritsLoose(HierarchySelectorPopover, _React$PureComponent);

  function HierarchySelectorPopover(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    popover_component_defineProperty(popover_component_assertThisInitialized(_this), "onFocusOutHandler", function (e) {
      if (!Utils.isFocusOnCurrentTarget(e)) _this.props.onComponentBlur();
    });

    popover_component_defineProperty(popover_component_assertThisInitialized(_this), "onSearchChangeHandler", function (searchingFor) {
      return _this.setState({
        searchingFor: searchingFor
      });
    });

    popover_component_defineProperty(popover_component_assertThisInitialized(_this), "onSelectHandler", function (data, flags) {
      var model = null;

      if (data) {
        var groupName = data.name ? data.name : 'Undefined';
        var items = Array.isArray(data) ? data : [data];
        model = new GroupEntity(groupName, items);
      }

      _this.props.onSelect(model, flags);
    });

    popover_component_defineProperty(popover_component_assertThisInitialized(_this), "onKeyDownHanlder", function (e) {
      event_handlers_EventHandler.searchElementFocusHanlder(e);
    });

    popover_component_defineProperty(popover_component_assertThisInitialized(_this), "getSearchElement", function () {
      return react_default.a.createElement(lib_es["a" /* default */], {
        autoFocus: true,
        defaltValue: _this.state.searchingFor,
        inputClassName: CLASS_NAME_SEARCH_FOCUSABLE,
        isDynamic: true,
        isTooltipEnabled: !!_this.props.searchTooltip,
        minChars: 2,
        translations: {
          tooltip: _this.props.searchTooltip,
          searchPlaceHolder: _this.props.searchPlaceHolder
        },
        onSearch: _this.onSearchChangeHandler,
        onClear: _this.props.onShouldClosePopover
      });
    });

    popover_component_defineProperty(popover_component_assertThisInitialized(_this), "getLists", function () {
      return react_default.a.createElement("div", null, react_default.a.createElement(select_btn_component_HierarchySelectorSelectButton, {
        label: _this.props.btnOpenViewLabel,
        onClick: _this.props.onShouldOpenView
      }));
    });

    popover_component_defineProperty(popover_component_assertThisInitialized(_this), "getSearchLayout", function () {
      var searchModel = new search_Search(_this.props.dataSourceProvider);
      var foundItems = searchModel.getFoundFromHierarchy(_this.state.searchingFor);
      return react_default.a.createElement(search_content_component_PopoverSearchContent, {
        foundItems: foundItems,
        onSelect: _this.onSelectHandler,
        itemRenderFunction: _this.props.foundItemRenderFunction
      });
    });

    popover_component_defineProperty(popover_component_assertThisInitialized(_this), "getMainLayout", function () {
      return react_default.a.createElement(common_layout_HSPopoverCommonLayout, null, _this.getSearchElement(), _this.state.searchingFor !== '' ? _this.getSearchLayout() : _this.getLists());
    });

    _this.state = {
      isDataLoaded: props.dataSourceProvider.isLoaded,
      searchingFor: ''
    };
    return _this;
  }

  var _proto = HierarchySelectorPopover.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var _this2 = this;

    if (!this.state.isDataLoaded) {
      this.props.dataSourceProvider.loadData().then(function () {
        _this2.setState({
          isDataLoaded: true
        });
      });
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this.mainElement.addEventListener('focusout', this.onFocusOutHandler);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mainElement.removeEventListener('focusout', this.onFocusOutHandler);
  };

  _proto.render = function render() {
    var _this3 = this;

    return react_default.a.createElement("div", {
      className: "oc-hierarchy-selector-popover",
      tabIndex: "0",
      ref: function ref(el) {
        _this3.mainElement = el;
      }
    }, this.state.isDataLoaded ? this.getMainLayout() : react_default.a.createElement(spinner_layout_HSSpinnerLayout, null));
  };

  return HierarchySelectorPopover;
}(react_default.a.PureComponent);


popover_component_HierarchySelectorPopover.defaultProps = {
  onComponentBlur: function onComponentBlur() {},
  onSelect: function onSelect() {},
  onShouldOpenView: function onShouldOpenView() {},
  onShouldClosePopover: function onShouldClosePopover() {},
  foundItemRenderFunction: null,
  btnOpenViewLabel: 'Select...',
  searchPlaceHolder: 'Search...',
  searchTooltip: null
};
// CONCATENATED MODULE: ../src/components/popover/index.js

/* harmony default export */ var components_popover = (popover_component_HierarchySelectorPopover);
// EXTERNAL MODULE: ../node_modules/react-bootstrap/es/Modal.js + 7 modules
var Modal = __webpack_require__(498);

// EXTERNAL MODULE: ../node_modules/react-bootstrap/es/Button.js
var Button = __webpack_require__(495);

// EXTERNAL MODULE: ../src/components/view/top-bar.scss
var top_bar = __webpack_require__(459);

// CONCATENATED MODULE: ../src/components/view/top-bar.component.jsx
function top_bar_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function top_bar_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function top_bar_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var top_bar_component_ViewTopBar =
/*#__PURE__*/
function (_React$PureComponent) {
  top_bar_component_inheritsLoose(ViewTopBar, _React$PureComponent);

  function ViewTopBar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    top_bar_component_defineProperty(top_bar_component_assertThisInitialized(_this), "handleSelectClick", function () {
      var flags = {
        interactive: true
      };

      _this.props.onSelect(flags);
    });

    return _this;
  }

  var _proto = ViewTopBar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        title = _this$props.title,
        onCancel = _this$props.onCancel,
        onHelp = _this$props.onHelp,
        selectDisabled = _this$props.selectDisabled,
        btnSelectLabel = _this$props.btnSelectLabel,
        btnCancelLabel = _this$props.btnCancelLabel,
        helpDisabled = _this$props.helpDisabled;
    return react_default.a.createElement("div", {
      className: "oc-dialog-top-bar"
    }, react_default.a.createElement("div", {
      className: "action-left"
    }, react_default.a.createElement(Modal["a" /* default */].Title, null, title)), react_default.a.createElement("div", {
      className: "action-right"
    }, react_default.a.createElement(Button["a" /* default */], {
      onClick: this.handleSelectClick,
      disabled: selectDisabled,
      className: "btn-primary"
    }, btnSelectLabel), react_default.a.createElement(Button["a" /* default */], {
      onClick: onCancel
    }, btnCancelLabel), react_default.a.createElement("button", {
      type: "button",
      className: "oc-help-button" + (helpDisabled ? '-disabled' : ''),
      onClick: onHelp
    }, react_default.a.createElement(index_esm["e" /* FaQuestion */], null))));
  };

  return ViewTopBar;
}(react_default.a.PureComponent);


top_bar_component_ViewTopBar.defaultProps = {
  onCancel: function onCancel() {},
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  btnSelectLabel: 'Select',
  btnCancelLabel: 'Cancel'
};
// EXTERNAL MODULE: ../node_modules/react-bootstrap/es/Tabs.js + 3 modules
var Tabs = __webpack_require__(499);

// EXTERNAL MODULE: ../node_modules/react-bootstrap/es/Tab.js + 1 modules
var Tab = __webpack_require__(502);

// CONCATENATED MODULE: ../src/models/column/column-data.js
var ColumnData = function ColumnData(parentId, items) {
  if (parentId === void 0) {
    parentId = null;
  }

  if (items === void 0) {
    items = [];
  }

  this.parentId = parentId;
  this.items = items;
};


// CONCATENATED MODULE: ../src/models/column/column-list.js
function column_list_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function column_list_createClass(Constructor, protoProps, staticProps) { if (protoProps) column_list_defineProperties(Constructor.prototype, protoProps); if (staticProps) column_list_defineProperties(Constructor, staticProps); return Constructor; }

function column_list_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function column_list_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function column_list_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var column_list_data = new WeakMap();
var column_list_list = new WeakMap();
var states = new WeakMap();
var column_list_searchingFor = new WeakMap();
var column_list_searchModel = new WeakMap();
var column_list_selectedPath = new WeakMap();

function _getData(thisObj) {
  return column_list_data.get(thisObj) || [];
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

  if (column_list_data.get(thisObj) === null) {
    if (dataProvider.isLoaded) {
      column_list_data.set(thisObj, dataProvider.getData());
    }
  }

  if (column_list_data.get(thisObj) !== null) {
    var currentStates = getStates(thisObj);

    if (currentStates.needToSearch) {
      var searchinForText = column_list_searchingFor.get(thisObj);

      if (Utils.enoughSearchTextLength(searchinForText)) {
        var model = column_list_searchModel.get(thisObj);
        column_list_data.set(thisObj, model.search(searchinForText));
      } else {
        column_list_data.set(thisObj, dataProvider.getData());
      }

      currentStates.needToSearch = false;
      setStates(thisObj, currentStates);
    }
  }
}

var column_list_ColumnList =
/*#__PURE__*/
function (_BaseModel) {
  column_list_inheritsLoose(ColumnList, _BaseModel);

  function ColumnList(dataSourceProvider) {
    var _this;

    _this = _BaseModel.call(this, dataSourceProvider) || this;

    column_list_defineProperty(column_list_assertThisInitialized(_this), "setSearchingFor", function (text) {
      var currentSearchingFor = column_list_searchingFor.get(column_list_assertThisInitialized(_this));

      if (currentSearchingFor !== text) {
        var currentStates = getStates(column_list_assertThisInitialized(_this));
        currentStates.needToSearch = true;
        setStates(column_list_assertThisInitialized(_this), currentStates);
        column_list_searchingFor.set(column_list_assertThisInitialized(_this), text);
      }
    });

    column_list_data.set(column_list_assertThisInitialized(_this), null);
    column_list_list.set(column_list_assertThisInitialized(_this), []);
    states.set(column_list_assertThisInitialized(_this), getDefaultStates());
    column_list_searchingFor.set(column_list_assertThisInitialized(_this), '');
    column_list_searchModel.set(column_list_assertThisInitialized(_this), new search_Search(dataSourceProvider));
    column_list_selectedPath.set(column_list_assertThisInitialized(_this), []);
    return _this;
  }

  var _proto = ColumnList.prototype;

  _proto.getData = function getData() {
    return _getData(this);
  };

  /**
   * Method recalculate selected paths and fills list of columns
   * @param {number} level The selected level (column)
   * @param {number} id The ID of selected item in a column
   */
  _proto.refresh = function refresh(level, id) {
    if (id === void 0) {
      id = null;
    }

    var listOfColumns = column_list_list.get(this);
    var path = column_list_selectedPath.get(this);
    var cleanLevel = level && level > 0 ? level - 1 : 0;
    refreshData(this);
    path.splice(cleanLevel);
    listOfColumns.splice(0);

    if (id !== null) {
      path.push(id);
    }

    if (listOfColumns.length === 0) {
      listOfColumns.push(new ColumnData(null, _getData(this)));
    }

    path.forEach(function (selectedId, thisLevel) {
      var nextLevel = thisLevel + 1;
      var item = listOfColumns[thisLevel] ? listOfColumns[thisLevel].items.find(function (el) {
        return el.id === selectedId;
      }) : null;

      if (item && item.children && item.children.length > 0) {
        if (nextLevel >= listOfColumns.length) {
          listOfColumns.push(new ColumnData());
        }

        if (listOfColumns[nextLevel].parentId !== selectedId) {
          listOfColumns[nextLevel].parentId = selectedId;
          listOfColumns[nextLevel].items = item.children;
        }
      }
    });
  };

  column_list_createClass(ColumnList, [{
    key: "length",
    get: function get() {
      return column_list_list.get(this).length;
    }
  }, {
    key: "list",
    get: function get() {
      return column_list_list.get(this);
    }
  }, {
    key: "selectedPath",
    get: function get() {
      return column_list_selectedPath.get(this);
    }
  }]);

  return ColumnList;
}(BaseModel);


// EXTERNAL MODULE: ../node_modules/@opuscapita/react-checkbox/lib/es/index.js + 1 modules
var react_checkbox_lib_es = __webpack_require__(219);

// EXTERNAL MODULE: ../node_modules/shortid/index.js
var shortid = __webpack_require__(211);
var shortid_default = /*#__PURE__*/__webpack_require__.n(shortid);

// EXTERNAL MODULE: ../node_modules/classnames/index.js
var classnames = __webpack_require__(6);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ../src/components/selectable-list/checkbox.component.jsx
function checkbox_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function checkbox_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function checkbox_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */




var checkbox_component_ItemCheckbox =
/*#__PURE__*/
function (_React$PureComponent) {
  checkbox_component_inheritsLoose(ItemCheckbox, _React$PureComponent);

  function ItemCheckbox(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    checkbox_component_defineProperty(checkbox_component_assertThisInitialized(_this), "getIcon", function () {
      var icon = null;

      if (_this.state.checked) {
        icon = _this.props.disabled ? react_default.a.createElement(index_esm["d" /* FaCheckSquare */], null) : react_default.a.createElement(index_esm["f" /* FaRegCheckSquare */], null);
      } else if (!_this.state.checked && !_this.props.disabled) {
        icon = react_default.a.createElement(index_esm["g" /* FaRegSquare */], null);
      }

      return icon;
    });

    checkbox_component_defineProperty(checkbox_component_assertThisInitialized(_this), "clickHandler", function () {
      if (!_this.props.disabled) {
        var newCheckedState = !_this.state.checked;

        _this.setState({
          checked: newCheckedState
        });

        _this.props.onCheck(newCheckedState);
      }
    });

    _this.state = {
      checked: props.checked
    };
    return _this;
  }

  var _proto = ItemCheckbox.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.setState.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  };

  _proto.render = function render() {
    return react_default.a.createElement("div", {
      className: "oc-list-item-checkbox",
      onClick: this.clickHandler
    }, this.getIcon());
  };

  return ItemCheckbox;
}(react_default.a.PureComponent);


checkbox_component_ItemCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  onCheck: function onCheck() {}
};
// CONCATENATED MODULE: ../src/components/selectable-list/list-item.component.jsx
function list_item_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function list_item_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function list_item_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */






function defaultItemRenderFunction(item) {
  return react_default.a.createElement("span", null, item.name);
}

var list_item_component_ListItem =
/*#__PURE__*/
function (_React$Component) {
  list_item_component_inheritsLoose(ListItem, _React$Component);

  function ListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    list_item_component_defineProperty(list_item_component_assertThisInitialized(_this), "clickHandler", function (event) {
      _this.props.onClick(_this.props.item.id, event);
    });

    list_item_component_defineProperty(list_item_component_assertThisInitialized(_this), "checkHandler", function (checkState) {
      _this.props.onCheck(_this.props.item.id, checkState);
    });

    return _this;
  }

  var _proto = ListItem.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _this$props = this.props,
        checked = _this$props.checked,
        checkDisabled = _this$props.checkDisabled,
        selected = _this$props.selected,
        item = _this$props.item;
    if (checked !== nextProps.checked) return true;
    if (checkDisabled !== nextProps.checkDisabled) return true;
    if (selected !== nextProps.selected) return true;
    if (item !== nextProps.item || item.id !== nextProps.item.id) return true;
    return false;
  };

  _proto.render = function render() {
    var names = classnames_default()({
      'oc-selectable-list-item': true,
      selected: this.props.selected
    });
    return react_default.a.createElement("div", {
      className: names,
      onClick: this.clickHandler
    }, react_default.a.createElement("div", {
      className: "oc-selectable-list-item-container"
    }, react_default.a.createElement(checkbox_component_ItemCheckbox, {
      disabled: this.props.checkDisabled,
      onCheck: this.checkHandler,
      checked: this.props.checked
    }), react_default.a.createElement("div", {
      className: "oc-list-item-text-container"
    }, this.props.itemRenderFunction ? this.props.itemRenderFunction(this.props.item, defaultItemRenderFunction) : defaultItemRenderFunction(this.props.item))));
  };

  return ListItem;
}(react_default.a.Component);


list_item_component_ListItem.defaultProps = {
  checked: false,
  checkDisabled: false,
  itemRenderFunction: null,
  selected: false,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};
// EXTERNAL MODULE: ../src/components/selectable-list/selectable-list.scss
var selectable_list = __webpack_require__(482);

// CONCATENATED MODULE: ../src/components/selectable-list/selectable-list.component.jsx
function selectable_list_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function selectable_list_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function selectable_list_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var selectable_list_component_SelectableList =
/*#__PURE__*/
function (_React$PureComponent) {
  selectable_list_component_inheritsLoose(SelectableList, _React$PureComponent);

  function SelectableList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    selectable_list_component_defineProperty(selectable_list_component_assertThisInitialized(_this), "itemRenderer", function (index, key) {
      var _this$props = _this.props,
          items = _this$props.items,
          checkDisabled = _this$props.checkDisabled;
      var item = items[index];
      var isChildren = item.children && item.children.length > 0;
      var checked = _this.props.checkedAll || _this.props.checkedIds.indexOf(item.id) !== -1;
      return react_default.a.createElement(list_item_component_ListItem, {
        key: "" + key,
        checked: checked,
        checkDisabled: checkDisabled || isChildren,
        item: item,
        itemRenderFunction: _this.props.itemRenderFunction,
        selected: _this.props.selectedId === String(item.id),
        onCheck: _this.props.onCheck,
        onClick: _this.props.onClick
      });
    });

    return _this;
  }

  var _proto = SelectableList.prototype;

  _proto.render = function render() {
    return react_default.a.createElement("div", {
      className: "oc-selectable-list-wrapper"
    }, react_default.a.createElement("div", null, react_default.a.createElement(react_list_default.a, {
      itemRenderer: this.itemRenderer,
      length: this.props.items.length,
      type: "uniform",
      useStaticSize: true
    })));
  };

  return SelectableList;
}(react_default.a.PureComponent);


selectable_list_component_SelectableList.defaultProps = {
  checkedAll: false,
  items: [],
  itemRenderFunction: null,
  checkedIds: [],
  checkDisabled: false,
  selectedId: null,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};
// CONCATENATED MODULE: ../src/components/selectable-list/index.js

/* harmony default export */ var components_selectable_list = (selectable_list_component_SelectableList);
// EXTERNAL MODULE: ../src/components/view/column/column.scss
var column = __webpack_require__(483);

// CONCATENATED MODULE: ../src/components/view/column/column.component.jsx
function column_component_extends() { column_component_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return column_component_extends.apply(this, arguments); }

function column_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function column_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function column_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var column_component_ViewColumn =
/*#__PURE__*/
function (_React$PureComponent) {
  column_component_inheritsLoose(ViewColumn, _React$PureComponent);

  function ViewColumn(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    column_component_defineProperty(column_component_assertThisInitialized(_this), "clickHandler", function (id, event) {
      _this.props.onClick(_this.props.index, id, event);
    });

    column_component_defineProperty(column_component_assertThisInitialized(_this), "checkHandler", function (id, checkState) {
      _this.props.onCheck(_this.props.referenceIds.slice(), id, checkState);
    });

    column_component_defineProperty(column_component_assertThisInitialized(_this), "checkAllHandler", function (e) {
      var newState = e.target.checked;

      _this.props.onCheckAll(_this.props.referenceIds.slice(), newState);

      _this.setState({
        checkedAll: newState
      });
    });

    column_component_defineProperty(column_component_assertThisInitialized(_this), "renderWrapperFunction", function (index) {
      return function (item, defaultRenderFunction) {
        return _this.props.itemRenderFunction(index, item, defaultRenderFunction);
      };
    });

    _this.id = shortid_default()();
    _this.state = {
      checkedAll: _this.props.checkedAll
    };
    return _this;
  }

  var _proto = ViewColumn.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedAll !== this.props.checkedAll) {
      this.setState({
        checkedAll: nextProps.checkedAll
      });
    }
  };

  _proto.render = function render() {
    // TODO: 'All' text should be passed here to show translated text.
    var disabledProperty = this.props.checkedAllDisabled ? {
      disabled: true
    } : null;
    return react_default.a.createElement("div", {
      className: "oc-hierarchy-selector-column"
    }, react_default.a.createElement("div", {
      className: "oc-hierarchy-selector-column-all"
    }, !this.props.checkedAllHidden ? react_default.a.createElement(react_checkbox_lib_es["a" /* default */], column_component_extends({
      id: "oc-hierarchy-selector-select-all-" + this.id,
      name: "oc-hierarchy-selector-select-all-" + this.id,
      onChange: this.checkAllHandler,
      checked: this.state.checkedAll,
      label: this.props.allLabel
    }, disabledProperty)) : null), react_default.a.createElement(components_selectable_list, {
      checkedAll: this.props.checkedAll,
      checkDisabled: this.state.checkedAll,
      checkedIds: this.props.checkedIds,
      items: this.props.data.items,
      itemRenderFunction: this.props.itemRenderFunction ? this.renderWrapperFunction(this.props.index) : null,
      selectedId: this.props.selectedId,
      onCheck: this.checkHandler,
      onClick: this.clickHandler
    }));
  };

  return ViewColumn;
}(react_default.a.PureComponent);


column_component_ViewColumn.defaultProps = {
  allLabel: 'All',
  checkedAll: false,
  checkedAllDisabled: false,
  checkedAllHidden: false,
  data: new ColumnData(),
  itemRenderFunction: null,
  selectedId: null,
  referenceIds: [],
  onCheck: function onCheck() {},
  onCheckAll: function onCheckAll() {},
  onClick: function onClick() {},
  checkedIds: []
};
// CONCATENATED MODULE: ../src/components/view/tab-content.component.jsx
function tab_content_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function tab_content_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function tab_content_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/no-unused-prop-types */








var tab_content_component_ViewTabContent =
/*#__PURE__*/
function (_React$PureComponent) {
  tab_content_component_inheritsLoose(ViewTabContent, _React$PureComponent);

  function ViewTabContent(_props) {
    var _this;

    _this = _React$PureComponent.call(this, _props) || this;

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "getIdOfFirstItem", function (props) {
      var dataSourceProvider = props.dataSourceProvider;
      var firstItem = dataSourceProvider.getFirstItem();
      if (firstItem === null || !firstItem.id) return null;
      return firstItem.id;
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "getContent", function () {
      _this.refreshContent();

      var list = _this.columns.list || [];
      var selectedPath = _this.columns.selectedPath || [];
      var parentIds = [];
      var anyCheckedAll = false;
      return react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-tab-content"
      }, react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-tab-search-bar"
      }, react_default.a.createElement(lib_es["a" /* default */], {
        defaltValue: _this.state.searchingFor,
        isDynamic: true,
        isTooltipEnabled: !!_this.props.searchTooltip,
        minChars: 2,
        translations: {
          tooltip: _this.props.searchTooltip,
          searchPlaceHolder: _this.props.searchPlaceHolder
        },
        onSearch: _this.searchChangeHandler,
        onClear: _this.searchClearHandler
      })), react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-column-wrapper"
      }, Object.keys(list).map(function (key) {
        var data = list[key];
        var selectedId = selectedPath[key] ? String(selectedPath[key]) : null;
        var parentReferenceIds = parentIds.slice();

        var isCheckedAll = _this.getIsCheckedAll(parentIds);

        var checkedIds = isCheckedAll ? [] : _this.getCheckedIds(parentIds, data);
        anyCheckedAll = anyCheckedAll || isCheckedAll;
        parentIds.push(selectedId);
        return react_default.a.createElement(column_component_ViewColumn, {
          allLabel: _this.props.allLabel,
          checkedAll: anyCheckedAll || isCheckedAll,
          checkedAllDisabled: anyCheckedAll && !isCheckedAll,
          checkedAllHidden: Number(key) === 0,
          checkedIds: checkedIds,
          data: data,
          index: Number(key) + 1,
          itemRenderFunction: _this.props.listItemRenderFunction,
          key: Number(key) + 1,
          referenceIds: parentReferenceIds,
          selectedId: selectedId,
          onCheck: _this.checkHandler,
          onCheckAll: _this.checkAllHandler,
          onClick: _this.clickHandler
        });
      })));
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "getSpinner", function () {
      return react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-tab-content"
      }, react_default.a.createElement(spinner, null));
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "clickHandler", function (level, id) {
      _this.setState({
        selectedColumn: level,
        selectedId: id
      });
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "checkHandler", function (referenceIds, id, checkState) {
      var checkedItemHashList = _this.props.dataSourceProvider.getChecked();

      if (checkState) {
        checkedItemHashList.add(referenceIds, id);
      } else {
        checkedItemHashList.remove(referenceIds, id);
      }

      _this.setState({
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
      });

      _this.props.onCheckListChange(checkedItemHashList);
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "checkAllHandler", function (referenceIds, checkState) {
      var parentIds = referenceIds.slice();
      var id = parentIds.pop();
      if (!id) throw new Error('There is no selected parent element to perform checking of all elements');

      var checkedItemHashList = _this.props.dataSourceProvider.getChecked();

      if (checkState) {
        checkedItemHashList.addAll(parentIds, id);
      } else {
        checkedItemHashList.removeAll(parentIds, id);
      }

      _this.setState({
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
      });

      _this.props.onCheckListChange(checkedItemHashList);
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "searchChangeHandler", function (searchingFor) {
      return _this.setState({
        searchingFor: searchingFor
      });
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "searchClearHandler", function () {
      _this.setState({
        searchingFor: ''
      });
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "loadData", function (props) {
      var dataSourceProvider = props.dataSourceProvider,
          onCheckListChange = props.onCheckListChange;
      dataSourceProvider.loadData().then(function () {
        var checkedItemHashList = dataSourceProvider.getChecked();
        var stateObject = {
          isDataLoaded: dataSourceProvider.isLoaded,
          checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
        };

        var idOfFirstItem = _this.getIdOfFirstItem(props);

        if (idOfFirstItem !== null) {
          stateObject.selectedColumn = 1;
          stateObject.selectedId = idOfFirstItem;
        }

        _this.setState(stateObject);

        onCheckListChange(checkedItemHashList);
      });
    });

    tab_content_component_defineProperty(tab_content_component_assertThisInitialized(_this), "refreshContent", function () {
      var _this$state = _this.state,
          selectedColumn = _this$state.selectedColumn,
          selectedId = _this$state.selectedId,
          searchingFor = _this$state.searchingFor;

      _this.columns.setSearchingFor(searchingFor);

      _this.columns.refresh(selectedColumn, selectedId);
    });

    var isDataLoaded = _props.dataSourceProvider.isLoaded;

    var _idOfFirstItem = _this.getIdOfFirstItem(_props);

    _this.state = {
      isDataLoaded: isDataLoaded,
      checkedItemsLastUpdate: 0,
      searchingFor: '',
      selectedColumn: _idOfFirstItem !== null ? 1 : 0,
      selectedId: _idOfFirstItem
    };
    _this.columns = new column_list_ColumnList(_props.dataSourceProvider);
    return _this;
  }

  var _proto = ViewTabContent.prototype;

  _proto.componentWillMount = function componentWillMount() {
    if (!this.state.isDataLoaded) {
      this.loadData(this.props);
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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

  _proto.getIsCheckedAll = function getIsCheckedAll(parentIds) {
    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    return checkedItemHashList.getIsCheckedAll(parentIds);
  };

  _proto.getCheckedIds = function getCheckedIds(parentIds, data) {
    var _this2 = this;

    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    var result = checkedItemHashList.getCheckedItems(parentIds).map(function (i) {
      return i.id;
    }); // Adds all items that have checkedAll in children

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

  _proto.render = function render() {
    return this.state.isDataLoaded ? this.getContent() : this.getSpinner();
  };

  return ViewTabContent;
}(react_default.a.PureComponent);


tab_content_component_ViewTabContent.defaultProps = {
  allLabel: 'All',
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
// EXTERNAL MODULE: ../src/components/view/tabs.scss
var tabs = __webpack_require__(484);

// CONCATENATED MODULE: ../src/components/view/tabs.component.jsx
function tabs_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function tabs_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function tabs_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var tabs_component_ViewTabs =
/*#__PURE__*/
function (_React$Component) {
  tabs_component_inheritsLoose(ViewTabs, _React$Component);

  function ViewTabs(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    tabs_component_defineProperty(tabs_component_assertThisInitialized(_this), "onSelectHandler", function (key) {
      _this.setState({
        activeTab: key
      });
    });

    tabs_component_defineProperty(tabs_component_assertThisInitialized(_this), "getContent", function () {
      var items = _this.props.items;
      var key = 0;
      var item = items[key];
      return item === undefined ? null : _this.getViewTabContent(key + 1, item.dataSourceProvider);
    });

    tabs_component_defineProperty(tabs_component_assertThisInitialized(_this), "getContentWithTabs", function () {
      var items = _this.props.items;
      var tabsId = "hs-view-tabs-" + Utils.uId8();
      return react_default.a.createElement(Tabs["a" /* default */], {
        activeKey: _this.state.activeTab,
        animation: true,
        className: "oc-hierarchy-selector-view-tabs",
        id: tabsId,
        onSelect: _this.onSelectHandler
      }, Object.keys(items).map(function (key) {
        var i = Number(key) + 1;
        var item = items[key];
        return react_default.a.createElement(Tab["a" /* default */], {
          mountOnEnter: true,
          key: i,
          eventKey: i,
          title: item.title
        }, _this.getViewTabContent(i, item.dataSourceProvider));
      }));
    });

    tabs_component_defineProperty(tabs_component_assertThisInitialized(_this), "getViewTabContent", function (i, dataSourceProvider) {
      return react_default.a.createElement(tab_content_component_ViewTabContent, {
        allLabel: _this.props.allLabel,
        index: i,
        listItemRenderFunction: _this.props.listItemRenderFunction,
        dataSourceProvider: dataSourceProvider,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        searchTooltip: _this.props.searchTooltip,
        onCheckListChange: _this.props.onCheckListChange
      });
    });

    _this.state = {
      activeTab: 1
    };
    return _this;
  }

  var _proto = ViewTabs.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    // should be updated always. Real update logic is delegated to children
    return true;
  };

  _proto.render = function render() {
    return this.props.items.length === 1 && this.props.hideSingleTab ? this.getContent() : this.getContentWithTabs();
  };

  return ViewTabs;
}(react_default.a.Component);


tabs_component_ViewTabs.defaultProps = {
  allLabel: 'All',
  hideSingleTab: false,
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
// EXTERNAL MODULE: ../node_modules/react-bootstrap/es/Badge.js
var Badge = __webpack_require__(497);

// EXTERNAL MODULE: ../src/components/badge/badge.scss
var badge = __webpack_require__(485);

// CONCATENATED MODULE: ../src/components/badge/badge.component.jsx
function badge_component_extends() { badge_component_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return badge_component_extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function badge_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function badge_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function badge_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var badge_component_HSBadge =
/*#__PURE__*/
function (_React$PureComponent) {
  badge_component_inheritsLoose(HSBadge, _React$PureComponent);

  function HSBadge() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    badge_component_defineProperty(badge_component_assertThisInitialized(_this), "getClassNames", function (className) {
      return classnames_default()('oc-hierarchy-selector-badge', className);
    });

    return _this;
  }

  var _proto = HSBadge.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        other = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    return react_default.a.createElement(Badge["a" /* default */], badge_component_extends({
      className: this.getClassNames(className)
    }, other), this.props.children);
  };

  return HSBadge;
}(react_default.a.PureComponent);


badge_component_HSBadge.defaultProps = {
  children: null,
  className: ''
};
// CONCATENATED MODULE: ../src/components/badge/index.js

/* harmony default export */ var components_badge = (badge_component_HSBadge);
// CONCATENATED MODULE: ../src/components/view/selected-items/group.component.jsx
function group_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function group_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function group_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */





var group_component_GroupItem =
/*#__PURE__*/
function (_React$PureComponent) {
  group_component_inheritsLoose(GroupItem, _React$PureComponent);

  function GroupItem(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    group_component_defineProperty(group_component_assertThisInitialized(_this), "getIcon", function () {
      return _this.state.collapsed ? react_default.a.createElement(index_esm["b" /* FaCaretRight */], null) : react_default.a.createElement(index_esm["a" /* FaCaretDown */], null);
    });

    group_component_defineProperty(group_component_assertThisInitialized(_this), "clickHanlder", function (e) {
      e.preventDefault();

      _this.toggleCollapse();
    });

    group_component_defineProperty(group_component_assertThisInitialized(_this), "removeClickHandler", function (e) {
      e.stopPropagation();

      _this.props.onRemoveClick(_this.props.sourceId, _this.props.referenceIds.slice());
    });

    group_component_defineProperty(group_component_assertThisInitialized(_this), "toggleCollapse", function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    });

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  var _proto = GroupItem.prototype;

  _proto.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? react_default.a.createElement("span", {
      className: "component-icon clickable",
      onClick: this.removeClickHandler
    }, react_default.a.createElement(index_esm["i" /* FaTrashAlt */], null)) : null;
  };

  _proto.render = function render() {
    var content = !this.state.collapsed ? this.props.children : null;
    var _this$props = this.props,
        count = _this$props.count,
        title = _this$props.title,
        selectedAll = _this$props.selectedAll;
    var selecteAllContent = selectedAll ? react_default.a.createElement("span", null, this.props.allLabel) : null;
    return react_default.a.createElement("li", {
      className: "group-list-item",
      onClick: this.clickHanlder
    }, react_default.a.createElement("div", {
      className: "title-block"
    }, react_default.a.createElement("div", {
      className: "left-block"
    }, this.getIcon(), react_default.a.createElement("span", null, title)), react_default.a.createElement("div", {
      className: "right-block"
    }, selecteAllContent, react_default.a.createElement(components_badge, {
      className: "badge-orange"
    }, count), this.getRemoveIcon())), content);
  };

  return GroupItem;
}(react_default.a.PureComponent);


group_component_GroupItem.defaultProps = {
  allLabel: 'All',
  children: null,
  referenceIds: [],
  onRemoveClick: function onRemoveClick() {}
};
// CONCATENATED MODULE: ../src/components/view/selected-items/item.component.jsx
function item_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function item_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function item_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */





var item_component_Item =
/*#__PURE__*/
function (_React$PureComponent) {
  item_component_inheritsLoose(Item, _React$PureComponent);

  function Item() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    item_component_defineProperty(item_component_assertThisInitialized(_this), "clickHanlder", function (e) {
      e.stopPropagation();
    });

    item_component_defineProperty(item_component_assertThisInitialized(_this), "removeClickHandler", function (e) {
      var _this$props = _this.props,
          onRemoveClick = _this$props.onRemoveClick,
          item = _this$props.item,
          sourceId = _this$props.sourceId,
          referenceIds = _this$props.referenceIds;
      e.stopPropagation();
      onRemoveClick(sourceId, referenceIds.slice(), item.id);
    });

    item_component_defineProperty(item_component_assertThisInitialized(_this), "defaultItemRenderFunction", function () {
      var item = _this.props.item;
      return react_default.a.createElement("span", null, item.name);
    });

    return _this;
  }

  var _proto = Item.prototype;

  _proto.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? react_default.a.createElement("span", {
      className: "component-icon clickable",
      onClick: this.removeClickHandler
    }, react_default.a.createElement(index_esm["i" /* FaTrashAlt */], null)) : null;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        item = _this$props2.item,
        itemRenderFunction = _this$props2.itemRenderFunction,
        removable = _this$props2.removable;
    return react_default.a.createElement("div", {
      className: "selected-item",
      onClick: this.clickHanlder
    }, react_default.a.createElement("div", {
      className: "left-block"
    }, itemRenderFunction ? itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction()), removable ? react_default.a.createElement("div", {
      className: "right-block"
    }, this.getRemoveIcon()) : null);
  };

  return Item;
}(react_default.a.PureComponent);


item_component_Item.defaultProps = {
  onRemoveClick: function onRemoveClick() {},
  itemRenderFunction: null,
  referenceIds: []
};
// EXTERNAL MODULE: ../src/components/view/selected-items/selected-items.scss
var selected_items = __webpack_require__(486);

// CONCATENATED MODULE: ../src/components/view/selected-items/selected-items.component.jsx
function selected_items_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function selected_items_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function selected_items_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var selected_items_component_SelectedItems =
/*#__PURE__*/
function (_React$PureComponent) {
  selected_items_component_inheritsLoose(SelectedItems, _React$PureComponent);

  function SelectedItems(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    selected_items_component_defineProperty(selected_items_component_assertThisInitialized(_this), "getLastUpdateStamp", function (checkedItemHashLists) {
      return checkedItemHashLists.map(function (item) {
        return item.getLastUpdateStamp();
      }).join('-');
    });

    selected_items_component_defineProperty(selected_items_component_assertThisInitialized(_this), "getGroupItem", function (listId, checkedItemsHashList) {
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
          return react_default.a.createElement(item_component_Item, {
            item: Object.assign({}, selectedItem),
            key: "" + itemKey,
            removable: isItemRemovable,
            referenceIds: parentIds,
            sourceId: listId,
            itemRenderFunction: _this.props.itemRenderFunction,
            onRemoveClick: _this.itemRemoveClickHandler
          });
        };

        list.push(react_default.a.createElement(group_component_GroupItem, {
          allLabel: _this.props.allLabel,
          count: checkedItems ? checkedItems.length : 0,
          key: listId + "-" + key,
          title: title,
          removable: true,
          selectedAll: isCheckedAll,
          referenceIds: parentIds,
          sourceId: listId,
          onRemoveClick: _this.groupRemoveClickHandler
        }, react_default.a.createElement(react_list_default.a, {
          itemRenderer: itemRenderer,
          length: checkedItems.length,
          type: "uniform",
          useStaticSize: true
        })));
      });
      return list;
    });

    selected_items_component_defineProperty(selected_items_component_assertThisInitialized(_this), "getcheckedItemsHashList", function (listId) {
      var checkedItemsHashLists = _this.props.checkedItemLists ? _this.props.checkedItemLists : [];
      return checkedItemsHashLists.find(function (list) {
        return listId === list.getId();
      });
    });

    selected_items_component_defineProperty(selected_items_component_assertThisInitialized(_this), "groupRemoveClickHandler", function (listId, referenceIds) {
      var checkedItemsHashList = _this.getcheckedItemsHashList(listId);

      if (checkedItemsHashList) {
        var parentIds = referenceIds.slice();
        var id = parentIds.pop();
        checkedItemsHashList.removeAll(parentIds, id);

        _this.props.onItemRemove(checkedItemsHashList);
      } else {
        throw new Error('SelectedItems::groupRemoveClickHandler(): No hash list of checked items found');
      }
    });

    selected_items_component_defineProperty(selected_items_component_assertThisInitialized(_this), "itemRemoveClickHandler", function (listId, referenceIds, itemId) {
      var checkedItemsHashList = _this.getcheckedItemsHashList(listId);

      if (checkedItemsHashList) {
        checkedItemsHashList.remove(referenceIds, itemId);

        _this.props.onItemRemove(checkedItemsHashList);
      } else {
        throw new Error('SelectedItems::itemRemoveClickHandler(): No hash list of checked items found');
      }
    });

    _this.state = {
      checkedItemsLastUpdate: 0
    };
    return _this;
  }

  var _proto = SelectedItems.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedItemLists && nextProps.checkedItemLists.length > 0) {
      var lastUpdated = this.getLastUpdateStamp(nextProps.checkedItemLists);

      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated
        });
      }
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var checkedItemsHashLists = this.props.checkedItemLists ? this.props.checkedItemLists : [];
    return react_default.a.createElement("div", {
      className: "oc-hierarchy-selector-selected-items-wrapper"
    }, react_default.a.createElement("p", null, this.props.listLabel), react_default.a.createElement("div", {
      className: "oc-hierarchy-selector-selected-items"
    }, react_default.a.createElement("ul", {
      className: "group-list"
    }, checkedItemsHashLists.map(function (list) {
      return _this2.getGroupItem(list.getId(), list.get());
    }))));
  };

  return SelectedItems;
}(react_default.a.PureComponent);


selected_items_component_SelectedItems.defaultProps = {
  allLabel: 'All',
  listLabel: 'Selected items',
  checkedItemLists: null,
  itemRenderFunction: null,
  onItemRemove: function onItemRemove() {}
};
// CONCATENATED MODULE: ../src/components/view/selected-items/index.js

/* harmony default export */ var view_selected_items = (selected_items_component_SelectedItems);
// EXTERNAL MODULE: ../node_modules/react-bootstrap/es/FormControl.js + 3 modules
var FormControl = __webpack_require__(500);

// EXTERNAL MODULE: ../src/components/view/group-name/group-name.scss
var group_name = __webpack_require__(487);

// CONCATENATED MODULE: ../src/components/view/group-name/group-name.component.jsx
function group_name_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function group_name_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function group_name_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var group_name_component_GroupName =
/*#__PURE__*/
function (_React$PureComponent) {
  group_name_component_inheritsLoose(GroupName, _React$PureComponent);

  function GroupName(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    group_name_component_defineProperty(group_name_component_assertThisInitialized(_this), "changeHandler", function (e) {
      _this.setState({
        changedByUser: true,
        value: e.target.value
      });

      _this.props.onChange(e.target.value);
    });

    _this.state = {
      changedByUser: props.initialValue.trim() !== '',
      value: props.initialValue
    };
    return _this;
  }

  var _proto = GroupName.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.changedByUser) {
      var newValue = nextProps.initialValue;
      this.setState({
        value: newValue
      });
    }
  };

  _proto.render = function render() {
    return react_default.a.createElement("div", {
      className: "oc-hierarchy-selector-group-name-wrapper"
    }, react_default.a.createElement("p", null, this.props.label), react_default.a.createElement(FormControl["a" /* default */], {
      type: "text",
      placeholder: this.props.placeHolder,
      onChange: this.changeHandler,
      value: this.state.value
    }));
  };

  return GroupName;
}(react_default.a.PureComponent);


group_name_component_GroupName.defaultProps = {
  label: 'Group name',
  placeHolder: 'Please, fill a group name',
  initialValue: '',
  onChange: function onChange() {}
};
// CONCATENATED MODULE: ../src/components/view/group-name/index.js

/* harmony default export */ var view_group_name = (group_name_component_GroupName);
// CONCATENATED MODULE: ../src/services/group-name-calculation.js
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
// EXTERNAL MODULE: ../src/components/view/view.scss
var view = __webpack_require__(488);

// CONCATENATED MODULE: ../src/components/view/view.component.jsx
function view_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function view_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function view_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/no-unused-state */












function getFirstCheckedItemHashList(lists) {
  var dataSourceKeys = Object.keys(lists);
  if (dataSourceKeys.length === 0) return null;
  return lists[dataSourceKeys[0]];
}

var view_component_HierarchySelectorView =
/*#__PURE__*/
function (_React$PureComponent) {
  view_component_inheritsLoose(HierarchySelectorView, _React$PureComponent);

  function HierarchySelectorView(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    view_component_defineProperty(view_component_assertThisInitialized(_this), "getInitialLastUpdateStamp", function () {
      return '0';
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "getLastUpdateStamp", function () {
      var stamp = Object.keys(_this.state.checkedItemHashLists).map(function (i) {
        return _this.state.checkedItemHashLists[i].getLastUpdateStamp();
      }).join('-');
      return stamp;
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "getGroupName", function (hashList) {
      var _this$state = _this.state,
          groupName = _this$state.groupName,
          groupNameChangedByUser = _this$state.groupNameChangedByUser;
      return calculateGroupName(groupName, groupNameChangedByUser, hashList);
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "getContent", function () {
      var listsHashArray = _this.state.checkedItemHashLists;
      var tabsItems = [{
        title: '',
        dataSourceProvider: _this.props.dataSourceProvider
      }];
      return react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-view"
      }, react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-tabs"
      }, react_default.a.createElement(tabs_component_ViewTabs, {
        allLabel: _this.props.allLabel,
        items: tabsItems,
        listItemRenderFunction: _this.props.listItemRenderFunction,
        onCheckListChange: _this.checkListChangeHandler,
        hideSingleTab: true,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        searchTooltip: _this.props.searchTooltip
      })), react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-selected-container"
      }, !_this.props.standalone && !_this.props.hideGroupNameInput && react_default.a.createElement(view_group_name, {
        label: _this.props.groupNameLabel,
        placeHolder: _this.props.groupNamePlaceHolder,
        initialValue: _this.state.groupName,
        onChange: _this.groupNameChangeHandler
      }), react_default.a.createElement(view_selected_items, {
        allLabel: _this.props.allLabel,
        listLabel: _this.props.selectedItemListLabel,
        checkedItemLists: Object.keys(listsHashArray).map(function (i) {
          return listsHashArray[i];
        }),
        itemRenderFunction: _this.props.selectedItemRenderFunction,
        onItemRemove: _this.itemRemoveHandler
      })));
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "getCanSelectStatus", function (groupName, lists) {
      var isClearable = _this.props.isClearable;
      var isGroupName = String(groupName).trim() !== '';
      var count = 0;
      Object.keys(lists).forEach(function (key) {
        count += lists[key].getCheckedItemsCount();
      });

      if (isClearable && count === 0) {
        return true;
      }

      return isGroupName && count > 0;
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "getCheckedOutput", function () {
      // At this moment we provide results only for one data source
      var checkedItemHashList = getFirstCheckedItemHashList(_this.state.checkedItemHashLists);
      if (!checkedItemHashList) return [];
      var checkedOutput = checkedItemHashList.getCheckedOutput();
      var resultList = checkedOutput.checked || [];
      return resultList;
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "getAllCheckedItems", function () {
      // At this moment we provide results only for one data source
      var checkedItemHashList = getFirstCheckedItemHashList(_this.state.checkedItemHashLists);
      if (!checkedItemHashList) return [];
      var checkedItems = checkedItemHashList.getAllCheckedItems();
      return checkedItems;
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "createCheckedItemHashLists", function (dataSourceProvider) {
      var listHash = {};
      dataSourceProvider.preCheckItems();
      listHash[dataSourceProvider.id] = dataSourceProvider.getChecked();
      return listHash;
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "groupNameChangeHandler", function (newValue) {
      _this.setState({
        canSelect: _this.getCanSelectStatus(newValue, _this.state.checkedItemHashLists),
        groupName: newValue,
        groupNameChangedByUser: true
      });
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "cancelHandler", function () {
      _this.props.onCancel();
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "selectHandler", function (flags) {
      var onSelect = _this.props.onSelect;
      var groupName = _this.state.groupName;

      var allCheckedItems = _this.getAllCheckedItems();

      var checkedOutput = _this.getCheckedOutput(); // If there's selected items, groupName can't be empty


      if (allCheckedItems && allCheckedItems.length > 0 && groupName.trim() === '') {
        throw new Error('State groupName is empty');
      }

      onSelect(groupName, allCheckedItems, checkedOutput, flags);
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "checkListChangeHandler", function (checkedItemHashList) {
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
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "itemRemoveHandler", function () {
      var lists = _this.state.checkedItemHashLists;

      var groupName = _this.getGroupName(lists);

      _this.setState({
        groupName: groupName,
        canSelect: _this.getCanSelectStatus(groupName, lists),
        checkedItemsLastUpdate: _this.getLastUpdateStamp()
      });

      _this.afterCheckListChanged();
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "afterCheckListChanged", function () {
      var resultList = _this.getCheckedOutput();

      _this.props.onCheckListChanged(resultList);
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "show", function () {
      return _this.getContent();
    });

    view_component_defineProperty(view_component_assertThisInitialized(_this), "showInModal", function () {
      return react_default.a.createElement(Modal["a" /* default */], {
        dialogClassName: "oc-hierarchy-selector-view-dialog",
        show: _this.state.visible,
        onHide: _this.cancelHandler,
        keyboard: false,
        backdrop: "static"
      }, react_default.a.createElement(Modal["a" /* default */].Header, null, react_default.a.createElement(top_bar_component_ViewTopBar, {
        selectDisabled: !_this.state.canSelect,
        title: _this.props.title,
        onCancel: _this.cancelHandler,
        onSelect: _this.selectHandler,
        onHelp: _this.props.onHelp,
        btnSelectLabel: _this.props.btnSelectLabel,
        btnCancelLabel: _this.props.btnCancelLabel,
        helpDisabled: _this.props.helpDisabled
      })), react_default.a.createElement(Modal["a" /* default */].Body, null, _this.getContent()));
    });

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

  var _proto = HierarchySelectorView.prototype;

  _proto.render = function render() {
    return this.props.showInModal && !this.props.standalone ? this.showInModal() : this.show();
  };

  return HierarchySelectorView;
}(react_default.a.PureComponent);


view_component_HierarchySelectorView.defaultProps = {
  onCancel: function onCancel() {},
  onCheckListChanged: function onCheckListChanged() {},
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
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
  searchTooltip: null,
  selectedItemListLabel: 'Selected items',
  selectedItemRenderFunction: null,
  standalone: false,
  title: '',
  helpDisabled: true,
  hideGroupNameInput: false,
  isClearable: false
};
// CONCATENATED MODULE: ../src/components/view/index.js

/* harmony default export */ var components_view = (view_component_HierarchySelectorView);
// CONCATENATED MODULE: ../src/components/combo-box/constants.js
var TOOLTIP_DELAY_MS = 500;
var MAX_COUNT_OF_TOOLTIP_ITEMS = 10;
var SPINNER_DELAY = 50;
// EXTERNAL MODULE: ../src/components/combo-box/combo-box.scss
var combo_box = __webpack_require__(489);

// CONCATENATED MODULE: ../src/components/combo-box/combo-box.component.jsx
function combo_box_component_extends() { combo_box_component_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return combo_box_component_extends.apply(this, arguments); }

function combo_box_component_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function combo_box_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function combo_box_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/no-unused-state */













var combo_box_component_HierarchySelectorComboBox =
/*#__PURE__*/
function (_React$PureComponent) {
  combo_box_component_inheritsLoose(HierarchySelectorComboBox, _React$PureComponent);

  function HierarchySelectorComboBox(_props) {
    var _this;

    _this = _React$PureComponent.call(this, _props) || this;

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onClickHandler", function () {
      _this.setPopoverVisibility(!_this.state.isPopoverVisible);
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onInputFocus", function () {
      _this.inputElement.blur();
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onSelectHandler", function (groupName, selectedItem, checkedOutput, flags) {
      _this.setState({
        selected: selectedItem,
        isPopoverVisible: false,
        isViewVisible: false
      });

      var items = checkedOutput ? checkedOutput.map(function (item) {
        return Object.assign({}, item);
      }) : [];

      _this.props.onSelect(items, groupName, flags);
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onPopoverBlur", function () {
      if (_this.props.hideOnPopoverBlur) {
        _this.popoverShouldBeHidden();
      }
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onShouldOpenView", function () {
      _this.setState({
        isViewVisible: true
      });
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onShouldClosePopover", function () {
      _this.setState({
        isPopoverVisible: false
      });
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onCanceledView", function () {
      _this.setState({
        isPopoverVisible: false,
        isViewVisible: false
      });
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onSelectedInView", function (groupName, selectedItems, checkedOutput, flags) {
      var selectedItem = {
        name: groupName,
        items: selectedItems
      };

      _this.setState({
        preCheckedItems: checkedOutput
      });

      _this.onSelectHandler(groupName, selectedItem, checkedOutput, flags);
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onSelectedInPopover", function (selectedItem, flags) {
      _this.uncheckAllItems();

      var checkedOutput = selectedItem && Array.isArray(selectedItem.items) ? selectedItem.items : [];

      _this.setState({
        preCheckedItems: checkedOutput
      });

      _this.onSelectHandler(selectedItem.name, selectedItem, checkedOutput, flags);
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "onClearHandler", function () {
      var groupName = '';
      var selectedItem = [];
      var checkedOutput = [];
      var flags = {
        interactive: true
      };

      _this.uncheckAllItems();

      _this.onSelectHandler(groupName, selectedItem, checkedOutput, flags);
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "getClearButton", function () {
      if (!_this.props.isClearable || !_this.state.selected || !_this.state.selected.items || !_this.state.selected.items.length) {
        return null;
      }

      return react_default.a.createElement("button", {
        type: "reset",
        className: "oc-hierarchy-selector-list-clear-btn",
        onClick: _this.onClearHandler
      }, react_default.a.createElement(index_esm["h" /* FaTimes */], null));
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "getInputText", function () {
      var selectionText = '';

      if (_this.state.selected && _this.state.selected.items && _this.state.selected.items.length > 0) {
        selectionText = _this.state.selected.name;
      }

      return selectionText;
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "getView", function () {
      var options = _this.props.viewOptions;
      var preCheckedItems = Array.isArray(_this.state.preCheckedItems) ? _this.state.preCheckedItems.slice() : null;
      return react_default.a.createElement(components_view, combo_box_component_extends({
        dataSourceProvider: _this.props.dataSourceProvider
      }, options, {
        onCancel: _this.onCanceledView,
        onSelect: _this.onSelectedInView,
        onHelp: _this.props.onHelp,
        groupName: _this.state.selected ? _this.state.selected.name : '',
        preCheckedItems: preCheckedItems,
        isClearable: _this.props.isClearable
      }));
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "getPopover", function () {
      var options = _this.props.popoverOptions;
      return react_default.a.createElement(components_popover, combo_box_component_extends({
        dataSourceProvider: _this.props.dataSourceProvider,
        onComponentBlur: _this.onPopoverBlur,
        onSelect: _this.onSelectedInPopover,
        onShouldOpenView: _this.onShouldOpenView,
        onShouldClosePopover: _this.onShouldClosePopover
      }, options));
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "getHierarchySelector", function () {
      var inputName = _this.props.inputName;
      var isBusy = _this.props.isBusy || _this.state.needToLoadData;
      var inputOptions = {
        onFocus: _this.onInputFocus,
        type: 'text',
        placeholder: _this.props.noSelectionText,
        readOnly: true,
        ref: function ref(input) {
          _this.inputElement = input;
        },
        value: _this.getInputText(),
        onClick: _this.onClickHandler
      };

      if (inputName.trim() !== '') {
        inputOptions.name = inputName;
      }

      return react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-list"
      }, react_default.a.createElement("input", inputOptions), isBusy ? react_default.a.createElement(spinner, null) : react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(components_badge, {
        className: "badge-orange"
      }, _this.getCountOfSelectedItems()), _this.getClearButton()), react_default.a.createElement("button", {
        type: "button",
        disabled: isBusy,
        className: "oc-hierarchy-selector-list-btn",
        onClick: _this.onClickHandler
      }, _this.state.isPopoverVisible ? react_default.a.createElement(index_esm["c" /* FaCaretUp */], null) : react_default.a.createElement(index_esm["a" /* FaCaretDown */], null)));
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "getToolTip", function (content) {
      return react_default.a.createElement(Tooltip["a" /* default */], {
        id: "tooltip",
        className: "hs-combo-box-tooltip"
      }, content);
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "getDefaultToolTipContent", function () {
      if (!_this.isSelectedItems()) return _this.props.noSelectionText;
      var totalCount = _this.state.selected.items.length;
      var count = totalCount > MAX_COUNT_OF_TOOLTIP_ITEMS ? MAX_COUNT_OF_TOOLTIP_ITEMS : totalCount;

      var items = _this.state.selected.items.slice(0, count);

      var elements = Object.keys(items).map(function (i) {
        return _this.props.tooltipItemRenderFunction ? _this.props.tooltipItemRenderFunction(items[i], i, _this.defaultItemRenderFunction) : _this.defaultItemRenderFunction(items[i], i);
      });
      if (count < totalCount) elements.push(react_default.a.createElement("p", {
        key: count
      }, ". . ."));
      return elements;
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "getCountOfSelectedItems", function () {
      return _this.isSelectedItems() ? _this.state.selected.items.length : 0;
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "setPopoverVisibility", function (isVisible) {
      _this.setState({
        isPopoverVisible: isVisible
      });
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "defaultItemRenderFunction", function (item, key) {
      return react_default.a.createElement("p", {
        key: key
      }, item.name);
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "isSelectedItems", function () {
      return _this.state.selected && _this.state.selected.items && _this.state.selected.items.length > 0;
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "loadData", function (props) {
      props.dataSourceProvider.loadData().then(function () {
        _this.setState({
          needToLoadData: false
        });
      });
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "popoverShouldBeHidden", function () {
      setTimeout(function () {
        if (_this.state.isPopoverVisible) _this.setPopoverVisibility(false);
      }, 150);
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "uncheckAllItems", function () {
      _this.setState({
        preCheckedItems: []
      });
    });

    combo_box_component_defineProperty(combo_box_component_assertThisInitialized(_this), "updatePrechecked", function (props) {
      var dataSourceProvider = props.dataSourceProvider,
          preCheckedGroupName = props.preCheckedGroupName,
          preCheckedItems = props.preCheckedItems;
      dataSourceProvider.setPrecheckedItems(preCheckedItems);
      var checkedOutput = dataSourceProvider.getCheckedOutput();
      var selectedItems = dataSourceProvider.getAllCheckedItems();
      var checked = checkedOutput.checked || [];

      _this.setState({
        needToUpdatePreChecked: false
      });

      _this.onSelectedInView(preCheckedGroupName, selectedItems, checked);
    });

    var isDataLoaded = _props.dataSourceProvider.isLoaded;
    var needToUpdatePreChecked = _props.preCheckedItems && _props.preCheckedItems.length;
    var needToLoadData = !isDataLoaded && needToUpdatePreChecked;
    _this.state = {
      needToLoadData: needToLoadData,
      needToUpdatePreChecked: needToUpdatePreChecked,
      preCheckedItems: _props.preCheckedItems,
      selected: null,
      isPopoverVisible: _props.popoverVisible,
      isViewVisible: false
    };
    return _this;
  }

  var _proto = HierarchySelectorComboBox.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var needToLoadData = this.state.needToLoadData;

    if (needToLoadData) {
      this.loadData(this.props);
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this$props = this.props,
        dataSourceProvider = _this$props.dataSourceProvider,
        preCheckedItems = _this$props.preCheckedItems;

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

  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    var needToLoadData = nextState.needToLoadData,
        needToUpdatePreChecked = nextState.needToUpdatePreChecked;

    if (needToLoadData) {
      this.loadData(nextProps);
    } else if (needToUpdatePreChecked) {
      this.updatePrechecked(nextProps);
    }
  };

  _proto.render = function render() {
    // If popover is visible, don't show tooltip (overlay)
    if (this.state.isPopoverVisible) {
      return react_default.a.createElement("div", {
        className: "oc-hierarchy-selector-list-wrapper"
      }, this.getHierarchySelector(), this.state.isPopoverVisible ? this.getPopover() : null, this.state.isViewVisible ? this.getView() : null);
    }

    return react_default.a.createElement("div", {
      className: "oc-hierarchy-selector-list-wrapper"
    }, react_default.a.createElement(OverlayTrigger["a" /* default */], {
      delay: TOOLTIP_DELAY_MS,
      placement: this.props.tooltipPlacement,
      overlay: this.getToolTip(this.getDefaultToolTipContent())
    }, this.getHierarchySelector()), this.state.isPopoverVisible ? this.getPopover() : null, this.state.isViewVisible ? this.getView() : null);
  };

  return HierarchySelectorComboBox;
}(react_default.a.PureComponent);


combo_box_component_HierarchySelectorComboBox.defaultProps = {
  hideOnPopoverBlur: true,
  inputName: '',
  noSelectionText: 'Nothing selected...',
  popoverVisible: false,
  preCheckedItems: null,
  preCheckedGroupName: 'Default group',
  tooltipPlacement: 'bottom',
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  tooltipItemRenderFunction: null,
  isClearable: false,
  isBusy: false
};
// CONCATENATED MODULE: ../src/index.js



// CONCATENATED MODULE: ./components/data.js
function getItem(id, name, children) {
  if (children === void 0) {
    children = [];
  }

  return {
    id: id,
    name: name,
    children: children
  };
}

function getItemList(startFrom, number, label) {
  var itemList = [];
  var endTo = startFrom + number;

  for (var i = startFrom; i < endTo; i += 1) {
    itemList.push(getItem(i, label + " " + i));
  }

  return itemList;
}

function getData() {
  var companiesEU = getItemList(500, 1000, 'Company EU');
  var companiesOthers = getItemList(2000, 500, 'Company');
  var general = [getItem(1, 'General group', [getItem(10, 'EU', companiesEU), getItem(21, 'Others', companiesOthers)]), getItem(2, 'Some other groups', getItemList(5000, 25, 'Other companies and units')), getItem(3, 'Big group', getItemList(6000, 8000, 'Another companies'))];
  return general;
}
// CONCATENATED MODULE: ./components/example-combo-box.component.jsx
function example_combo_box_component_extends() { example_combo_box_component_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return example_combo_box_component_extends.apply(this, arguments); }

function example_combo_box_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function example_combo_box_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-console */




var TIMEOUT = 200;

var getPrechecked = function getPrechecked() {
  return [{
    id: 1,
    isCheckedAll: true
  }, {
    id: 2,
    isCheckedAll: true
  }, {
    id: 3,
    isCheckedAll: true
  }];
};

function getDataPromise() {
  return function () {
    return new Promise(function (resolve) {
      return setTimeout(resolve, TIMEOUT, getData());
    });
  };
}

var example_combo_box_component_ExampleComboBox =
/*#__PURE__*/
function (_React$PureComponent) {
  example_combo_box_component_inheritsLoose(ExampleComboBox, _React$PureComponent);

  function ExampleComboBox(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this.state = {
      dataSourceProvider: new data_source_provider_HierarchySelectorDataSourceProvider(getDataPromise()),
      dataSourceProviderPrecheckedItems: props.usePrechecked ? getPrechecked() : null
    };
    return _this;
  }

  var _proto = ExampleComboBox.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        usePrechecked = _this$props.usePrechecked,
        helpEnabled = _this$props.helpEnabled,
        isClearable = _this$props.isClearable,
        viewOptions = _this$props.viewOptions;
    var _this$state = this.state,
        dataSourceProvider = _this$state.dataSourceProvider,
        dataSourceProviderPrecheckedItems = _this$state.dataSourceProviderPrecheckedItems;
    var precheckedOptions = {};
    var helpOptions = {};

    if (usePrechecked) {
      precheckedOptions = {
        preCheckedGroupName: 'Prechecked group',
        preCheckedItems: dataSourceProviderPrecheckedItems
      };
    }

    if (helpEnabled) {
      helpOptions = {
        onHelp: function onHelp() {
          alert('Help is on the way');
        } // eslint-disable-line no-alert

      };
    }

    return react_default.a.createElement(combo_box_component_HierarchySelectorComboBox, example_combo_box_component_extends({
      dataSourceProvider: dataSourceProvider,
      hideOnPopoverBlur: false,
      popoverVisible: false,
      isClearable: isClearable,
      popoverOptions: {
        btnOpenViewLabel: 'Select items...',
        searchPlaceHolder: 'Search for an item...',
        pinnedGroupLabel: 'My item groups',
        recentGroupLabel: 'Recent item groups'
      },
      tooltipPlacement: "bottom",
      viewOptions: example_combo_box_component_extends({
        title: 'Select items',
        btnSelectLabel: 'Select',
        btnCancelLabel: 'Cancel',
        groupNameLabel: 'Item group name',
        groupNamePlaceHolder: 'Please, fill an item group name',
        selectedItemListLabel: 'Selected items',
        listItemRenderFunction: this.listItemRenderFunction,
        helpDisabled: !helpEnabled
      }, viewOptions),
      onSelect: function onSelect(selectedItems, groupName, flags) {
        console.log(groupName, selectedItems, flags);
      }
    }, precheckedOptions, helpOptions));
  };

  return ExampleComboBox;
}(react_default.a.PureComponent);

example_combo_box_component_defineProperty(example_combo_box_component_ExampleComboBox, "defaultProps", {
  usePrechecked: false,
  helpEnabled: false,
  isClearable: false,
  viewOptions: {}
});


// CONCATENATED MODULE: ./components/example-view.component.jsx
function example_view_component_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/* eslint-disable no-console */



var example_view_component_TIMEOUT = 200;

var example_view_component_getPrechecked = function getPrechecked() {
  return [{
    id: 502,
    parentId: 10,
    isCheckedAll: false
  }, {
    id: 521,
    parentId: 10,
    isCheckedAll: false
  }, {
    id: 525,
    parentId: 10,
    isCheckedAll: false
  }, {
    id: 2131,
    parentId: 21,
    isCheckedAll: false
  }, {
    id: 2307,
    parentId: 21,
    isCheckedAll: false
  }];
};

function example_view_component_getDataPromise() {
  return function () {
    return new Promise(function (resolve) {
      return setTimeout(resolve, example_view_component_TIMEOUT, getData());
    });
  };
}

var example_view_component_ExampleView =
/*#__PURE__*/
function (_React$PureComponent) {
  example_view_component_inheritsLoose(ExampleView, _React$PureComponent);

  function ExampleView(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this.state = {
      dataSourceProvider: new data_source_provider_HierarchySelectorDataSourceProvider(example_view_component_getDataPromise()),
      dataSourceProviderPrecheckedItems: example_view_component_getPrechecked()
    };
    return _this;
  }

  var _proto = ExampleView.prototype;

  _proto.render = function render() {
    return react_default.a.createElement(components_view, {
      dataSourceProvider: this.state.dataSourceProvider,
      preCheckedItems: this.state.dataSourceProviderPrecheckedItems,
      standalone: true,
      onCheckListChanged: function onCheckListChanged(selectedItems) {
        console.log(selectedItems);
      }
    });
  };

  return ExampleView;
}(react_default.a.PureComponent);


// CONCATENATED MODULE: ./images/logo-github.svg
function logo_github_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function logo_github_extends() {
  logo_github_extends = Object.assign || function (target) {
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

  return logo_github_extends.apply(this, arguments);
}


/* harmony default export */ var logo_github = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = logo_github_objectWithoutPropertiesLoose(_ref, ["styles"]);

  return react_default.a.createElement("svg", logo_github_extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "45",
    height: "16"
  }, props), react_default.a.createElement("path", {
    fillRule: "evenodd",
    d: "M18.53 12.03h-.02c.009 0 .015.01.024.011h.006l-.01-.01zm.004.011c-.093.001-.327.05-.574.05-.78 0-1.05-.36-1.05-.83V8.13h1.59c.09 0 .16-.08.16-.19v-1.7c0-.09-.08-.17-.16-.17h-1.59V3.96c0-.08-.05-.13-.14-.13h-2.16c-.09 0-.14.05-.14.13v2.17s-1.09.27-1.16.28c-.08.02-.13.09-.13.17v1.36c0 .11.08.19.17.19h1.11v3.28c0 2.44 1.7 2.69 2.86 2.69.53 0 1.17-.17 1.27-.22.06-.02.09-.09.09-.16v-1.5a.177.177 0 00-.146-.18zm23.696-2.2c0-1.81-.73-2.05-1.5-1.97-.6.04-1.08.34-1.08.34v3.52s.49.34 1.22.36c1.03.03 1.36-.34 1.36-2.25zm2.43-.16c0 3.43-1.11 4.41-3.05 4.41-1.64 0-2.52-.83-2.52-.83s-.04.46-.09.52c-.03.06-.08.08-.14.08h-1.48c-.1 0-.19-.08-.19-.17l.02-11.11c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v3.77s.82-.53 2.02-.53l-.01-.02c1.2 0 2.97.45 2.97 3.88zm-8.72-3.61h-2.1c-.11 0-.17.08-.17.19v5.44s-.55.39-1.3.39-.97-.34-.97-1.09V6.25c0-.09-.08-.17-.17-.17h-2.14c-.09 0-.17.08-.17.17v5.11c0 2.2 1.23 2.75 2.92 2.75 1.39 0 2.52-.77 2.52-.77s.05.39.08.45c.02.05.09.09.16.09h1.34c.11 0 .17-.08.17-.17l.02-7.47c0-.09-.08-.17-.19-.17zm-23.7-.01h-2.13c-.09 0-.17.09-.17.2v7.34c0 .2.13.27.3.27h1.92c.2 0 .25-.09.25-.27V6.23c0-.09-.08-.17-.17-.17zm-1.05-3.38c-.77 0-1.38.61-1.38 1.38 0 .77.61 1.38 1.38 1.38.75 0 1.36-.61 1.36-1.38 0-.77-.61-1.38-1.36-1.38zm16.49-.25h-2.11c-.09 0-.17.08-.17.17v4.09h-3.31V2.6c0-.09-.08-.17-.17-.17h-2.13c-.09 0-.17.08-.17.17v11.11c0 .09.09.17.17.17h2.13c.09 0 .17-.08.17-.17V8.96h3.31l-.02 4.75c0 .09.08.17.17.17h2.13c.09 0 .17-.08.17-.17V2.6c0-.09-.08-.17-.17-.17zM8.81 7.35v5.74c0 .04-.01.11-.06.13 0 0-1.25.89-3.31.89-2.49 0-5.44-.78-5.44-5.92S2.58 1.99 5.1 2c2.18 0 3.06.49 3.2.58.04.05.06.09.06.14L7.94 4.5c0 .09-.09.2-.2.17-.36-.11-.9-.33-2.17-.33-1.47 0-3.05.42-3.05 3.73s1.5 3.7 2.58 3.7c.92 0 1.25-.11 1.25-.11v-2.3H4.88c-.11 0-.19-.08-.19-.17V7.35c0-.09.08-.17.19-.17h3.74c.11 0 .19.08.19.17z"
  }));
});
// EXTERNAL MODULE: ./containers/example.scss
var example = __webpack_require__(490);

// CONCATENATED MODULE: ./containers/example.container.jsx





/* harmony default export */ var example_container = __webpack_exports__["a"] = (function () {
  return react_default.a.createElement("div", {
    className: "example-container oc-flex-column"
  }, react_default.a.createElement("div", {
    className: "example-header oc-flex-row"
  }, react_default.a.createElement("h3", null, "React Hierarchy Selector"), react_default.a.createElement("a", {
    className: "example-git-logo",
    href: "https://github.com/OpusCapita/react-hierarchy-selector"
  }, react_default.a.createElement("span", null, react_default.a.createElement(logo_github, null)))), react_default.a.createElement("div", {
    className: "example-content oc-flex-column"
  }, react_default.a.createElement("h4", null, "Example of HierarchySelectorComboBox:"), react_default.a.createElement("div", {
    className: "example-input-row w30 oc-flex-row"
  }, react_default.a.createElement("span", {
    className: "example-input-label"
  }, "Select items (prechecked):"), react_default.a.createElement("div", {
    className: "example-input-control"
  }, react_default.a.createElement(example_combo_box_component_ExampleComboBox, {
    usePrechecked: true
  }))), react_default.a.createElement("div", {
    className: "example-input-row w30 oc-flex-row"
  }, react_default.a.createElement("span", {
    className: "example-input-label"
  }, "Select items (empty):"), react_default.a.createElement("div", {
    className: "example-input-control"
  }, react_default.a.createElement(example_combo_box_component_ExampleComboBox, null))), react_default.a.createElement("div", {
    className: "example-input-row w30 oc-flex-row"
  }, react_default.a.createElement("span", {
    className: "example-input-label"
  }, "Select items (helpEnabled):"), react_default.a.createElement("div", {
    className: "example-input-control"
  }, react_default.a.createElement(example_combo_box_component_ExampleComboBox, {
    helpEnabled: true
  }))), react_default.a.createElement("div", {
    className: "example-input-row w30 oc-flex-row"
  }, react_default.a.createElement("span", {
    className: "example-input-label"
  }, "Select items (clearable):"), react_default.a.createElement("div", {
    className: "example-input-control"
  }, react_default.a.createElement(example_combo_box_component_ExampleComboBox, {
    isClearable: true
  }))), react_default.a.createElement("hr", null), react_default.a.createElement("h4", null, "Example of HierarchySelectorView:"), react_default.a.createElement("div", {
    className: "example-input-row w100 h100 oc-flex-row"
  }, react_default.a.createElement("span", {
    className: "example-input-label"
  }, "Select items:"), react_default.a.createElement("div", {
    className: "example-input-control"
  }, react_default.a.createElement("div", {
    className: "example-view-wrapper"
  }, react_default.a.createElement(example_view_component_ExampleView, null))))));
});

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(221);
module.exports = __webpack_require__(402);


/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(202);



Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app_component__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null), document.getElementById('oc-examples'));

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb","borderRadiusBase":"0","borderRadiusLarge":"0","borderRadiusSmall":"0","heightNavbar":"40px","spaceContent":"1rem","radiusContent":".5rem","radiusNavbar":"0","sidemenuColorText":"#fff","fontWeightLight":"300","fontWeightNormal":"400","fontWeightBold":"700","fontSizeH1":"3.6rem","fontSizeH2":"3rem","fontSizeH3":"2.4rem","fontSizeH4":"1.8rem","fontSizeLarge":"1.8rem","fontSizeMedium":"1.6rem","fontSizeNormal":"1.4rem","fontSizeSmall":"1.2rem","marginContent":"10px"};

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb","borderRadiusBase":"0","borderRadiusLarge":"0","borderRadiusSmall":"0","heightNavbar":"40px","spaceContent":"1rem","radiusContent":".5rem","radiusNavbar":"0","sidemenuColorText":"#fff","fontWeightLight":"300","fontWeightNormal":"400","fontWeightBold":"700","fontSizeH1":"3.6rem","fontSizeH2":"3rem","fontSizeH3":"2.4rem","fontSizeH4":"1.8rem","fontSizeLarge":"1.8rem","fontSizeMedium":"1.6rem","fontSizeNormal":"1.4rem","fontSizeSmall":"1.2rem","marginContent":"10px"};

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb"};

/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb","borderRadiusBase":"0","borderRadiusLarge":"0","borderRadiusSmall":"0","heightNavbar":"40px","spaceContent":"1rem","radiusContent":".5rem","radiusNavbar":"0","sidemenuColorText":"#fff","fontWeightLight":"300","fontWeightNormal":"400","fontWeightBold":"700","fontSizeH1":"3.6rem","fontSizeH2":"3rem","fontSizeH3":"2.4rem","fontSizeH4":"1.8rem","fontSizeLarge":"1.8rem","fontSizeMedium":"1.6rem","fontSizeNormal":"1.4rem","fontSizeSmall":"1.2rem","marginContent":"10px"};

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb"};

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb","borderRadiusBase":"0","borderRadiusLarge":"0","borderRadiusSmall":"0","heightNavbar":"40px","spaceContent":"1rem","radiusContent":".5rem","radiusNavbar":"0","sidemenuColorText":"#fff","fontWeightLight":"300","fontWeightNormal":"400","fontWeightBold":"700","fontSizeH1":"3.6rem","fontSizeH2":"3rem","fontSizeH3":"2.4rem","fontSizeH4":"1.8rem","fontSizeLarge":"1.8rem","fontSizeMedium":"1.6rem","fontSizeNormal":"1.4rem","fontSizeSmall":"1.2rem","marginContent":"10px"};

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb","borderRadiusBase":"0","borderRadiusLarge":"0","borderRadiusSmall":"0","heightNavbar":"40px","spaceContent":"1rem","radiusContent":".5rem","radiusNavbar":"0","sidemenuColorText":"#fff","fontWeightLight":"300","fontWeightNormal":"400","fontWeightBold":"700","fontSizeH1":"3.6rem","fontSizeH2":"3rem","fontSizeH3":"2.4rem","fontSizeH4":"1.8rem","fontSizeLarge":"1.8rem","fontSizeMedium":"1.6rem","fontSizeNormal":"1.4rem","fontSizeSmall":"1.2rem","marginContent":"10px"};

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb"};

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb"};

/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorPrimaryOrange":"#EC6608","colorPrimaryYellow":"#FECA1D","colorPrimarAzure":"#67707c","colorBackgroundAside":"#EAEFF3","colorBackgroundMenu":"#3C4A55","colorMain":"#EC6608","colorBlack":"#000","colorPetrol":"#006070","colorDarkSteel":"#3B4A56","colorSupportGray":"#ccc","colorLightGray":"#D3DADE","colorAttentionRed":"#DD2515","colorAttentionGreen":"#3AA57B","colorYellow":"#FECA1D","colorOrange":"#E66608","colorGreen":"#3AA57B","colorAzure":"#67707C","colorGray":"#ccc","colorRed":"#D82515","colorBlue":"#16AED6","colorViolet":"#943BA3","colorWhite":"#fff","colorText":"#67707c","colorTextLink":"#EC6608","colorTextDisabled":"#a7a7a7","colorWarning":"#FECA1D","colorSuccess":"#3AA57B","colorError":"#D82515","colorInfo":"#16AED6","colorTooltipText":"#fff","colorTooltipBackground":"#006070","colorToastText":"#000","colorToastBackground":"#eaeaea","colorPseudoNormal":"#67707c","colorPseudoFocused":"#FECA1D","colorPseudoHover":"#FECA1D","colorPseudoPressed":"#FECA1D","colorPseudoDisabled":"#a7a7a7","colorContentBackground":"#fff","colorSiteBackground":"#D3DADE","colorButtonText":"#fff","colorButtonTextDisabled":"#a7a7a7","colorButtonNormal":"#67707c","colorButtonFocused":"#67707c","colorButtonHover":"#77818c","colorButtonPressed":"#585F68","colorButtonPriorityNormal":"#E66608","colorButtonPriorityFocused":"#E66608","colorButtonPriorityHover":"#ff7517","colorButtonPriorityPressed":"#d35c0b","colorButtonDisabled":"#f0f0f0","colorDatePickerContent":"#E9E9E9","colorSelectHover":"#eff2f4","colorSelectSelected":"#e6e9eb","colorGridText":"#67707c","colorGridBorder":"#D3DADE","colorGridBackground":"#fff","colorGridStripe":"#D3DADE","colorGridHighlight":"#eff2f4","colorGridSelected":"#e6e9eb","borderRadiusBase":"0","borderRadiusLarge":"0","borderRadiusSmall":"0","heightNavbar":"40px","spaceContent":"1rem","radiusContent":".5rem","radiusNavbar":"0","sidemenuColorText":"#fff","fontWeightLight":"300","fontWeightNormal":"400","fontWeightBold":"700","fontSizeH1":"3.6rem","fontSizeH2":"3rem","fontSizeH3":"2.4rem","fontSizeH4":"1.8rem","fontSizeLarge":"1.8rem","fontSizeMedium":"1.6rem","fontSizeNormal":"1.4rem","fontSizeSmall":"1.2rem","marginContent":"10px"};

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (__webpack_require__.p + "favicon.ico");

/***/ })

/******/ });