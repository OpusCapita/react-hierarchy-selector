'use strict';

exports.__esModule = true;
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-param-reassign */

var _checkedItemHashList = require('../models/checked-items/checked-item-hash-list');

var _checkedItemHashList2 = _interopRequireDefault(_checkedItemHashList);

var _dataIndex = require('../models/data-index');

var _dataIndex2 = _interopRequireDefault(_dataIndex);

var _item = require('../models/item.entity');

var _item2 = _interopRequireDefault(_item);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  var dataIndex = new _dataIndex2.default(items);

  return dataIndex;
}

function createCheckedItemHashList(dataSourceProvider) {
  return new _checkedItemHashList2.default(dataSourceProvider);
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
      return new _item2.default({ id: firstElement.id, name: firstElement.name });
    };

    this.getIndex = function () {
      return index.get(_this);
    };

    this.getChecked = function () {
      return checked.get(_this);
    };

    this.getAllCheckedItems = function () {
      var currentChecked = checked.get(_this);
      return currentChecked instanceof _checkedItemHashList2.default ? currentChecked.getAllCheckedItems() : [];
    };

    this.getCheckedOutput = function () {
      var currentChecked = checked.get(_this);
      return currentChecked instanceof _checkedItemHashList2.default ? currentChecked.getCheckedOutput() : {};
    };

    this.id = id === null ? _utils2.default.uId16() : id;
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

exports.default = HierarchySelectorDataSourceProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9kYXRhLXNvdXJjZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6WyJsb2FkZWQiLCJXZWFrTWFwIiwiZGF0YSIsImluZGV4IiwiY2hlY2tlZCIsInByZUNoZWNrZWQiLCJkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uIiwiY2FsbGJhY2tGdW5jdGlvbiIsImlzRnVuY3Rpb24iLCJmdW5jIiwiZXJyb3JNZXNzYWdlIiwiRnVuY3Rpb24iLCJFcnJvciIsImNyZWF0ZUluZGV4IiwiaXRlbXMiLCJkYXRhSW5kZXgiLCJjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0IiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiSGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXIiLCJkYXRhU291cmNlRnVuY3Rpb24iLCJpZCIsImNhbGxiYWNrIiwibG9hZERhdGEiLCJwcm9taXNlIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic2V0IiwicmVzZXRDaGVja2VkSXRlbUhhc2hMaXN0IiwicHJlQ2hlY2tJdGVtcyIsImdldERhdGEiLCJnZXRGaXJzdEl0ZW0iLCJhbGxJdGVtcyIsImlzTG9hZGVkIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZmlyc3RFbGVtZW50IiwibmFtZSIsImdldEluZGV4IiwiZ2V0Q2hlY2tlZCIsImdldEFsbENoZWNrZWRJdGVtcyIsImN1cnJlbnRDaGVja2VkIiwiZ2V0Q2hlY2tlZE91dHB1dCIsInVJZDE2IiwiaW5pdCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJkZWxldGUiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwicHJlQ2hlY2tlZEl0ZW1zIiwic2V0UHJlY2hlY2tlZEl0ZW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLElBQUlDLE9BQUosRUFBZjtBQUNBLElBQU1DLE9BQU8sSUFBSUQsT0FBSixFQUFiO0FBQ0EsSUFBTUUsUUFBUSxJQUFJRixPQUFKLEVBQWQ7QUFDQSxJQUFNRyxVQUFVLElBQUlILE9BQUosRUFBaEI7QUFDQSxJQUFNSSxhQUFhLElBQUlKLE9BQUosRUFBbkI7QUFDQSxJQUFNSyw0QkFBNEIsSUFBSUwsT0FBSixFQUFsQztBQUNBLElBQU1NLG1CQUFtQixJQUFJTixPQUFKLEVBQXpCOztBQUVBLFNBQVNPLFVBQVQsQ0FBb0JDLElBQXBCLEVBQTBCQyxZQUExQixFQUF3QztBQUN0QyxNQUFJRCxnQkFBZ0JFLFFBQXBCLEVBQThCO0FBQzVCLFdBQU8sSUFBUDtBQUNEO0FBQ0QsUUFBTSxJQUFJQyxLQUFKLENBQVVGLFlBQVYsQ0FBTjtBQUNEOztBQUVELFNBQVNHLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQU1DLFlBQVksd0JBQWNELEtBQWQsQ0FBbEI7O0FBRUEsU0FBT0MsU0FBUDtBQUNEOztBQUVELFNBQVNDLHlCQUFULENBQW1DQyxrQkFBbkMsRUFBdUQ7QUFDckQsU0FBTyxrQ0FBd0JBLGtCQUF4QixDQUFQO0FBQ0Q7O0lBRW9CQyxtQztBQUNuQiwrQ0FBWUMsa0JBQVosRUFBNEQ7QUFBQTs7QUFBQSxRQUE1QkMsRUFBNEIsdUVBQXZCLElBQXVCO0FBQUEsUUFBakJDLFFBQWlCLHVFQUFOLElBQU07O0FBQUE7O0FBQUEsU0E2QzVEQyxRQTdDNEQsR0E2Q2pELFlBQU07QUFDZixVQUFNQyxVQUFVakIsMEJBQTBCa0IsR0FBMUIsU0FBaEI7O0FBRUEsVUFBSSxRQUFPRCxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQW5CLElBQStCQSxRQUFRRSxJQUFSLFlBQXdCZCxRQUEzRCxFQUFxRTtBQUNuRSxlQUFPWSxRQUFRRSxJQUFSLENBQWEsVUFBQ0MsUUFBRCxFQUFjO0FBQ2hDeEIsZUFBS3lCLEdBQUwsUUFBZUQsUUFBZjtBQUNBdkIsZ0JBQU13QixHQUFOLFFBQWdCZCxZQUFZYSxRQUFaLENBQWhCO0FBQ0EsZ0JBQUtFLHdCQUFMO0FBQ0EsZ0JBQUtDLGFBQUw7QUFDQTdCLGlCQUFPMkIsR0FBUCxRQUFpQixJQUFqQjtBQUNBcEIsMkJBQWlCaUIsR0FBakIsUUFBMkJFLFFBQTNCOztBQUVBLGlCQUFPQSxRQUFQO0FBQ0QsU0FUTSxDQUFQO0FBVUQ7QUFDRCxZQUFNLElBQUlkLEtBQUosQ0FBVSxxR0FBVixDQUFOO0FBQ0QsS0E3RDJEOztBQUFBLFNBdUU1RGtCLE9BdkU0RCxHQXVFbEQ7QUFBQSxhQUFNNUIsS0FBS3NCLEdBQUwsT0FBTjtBQUFBLEtBdkVrRDs7QUFBQSxTQXlFNURPLFlBekU0RCxHQXlFN0MsWUFBTTtBQUNuQixVQUFNQyxXQUFXOUIsS0FBS3NCLEdBQUwsT0FBakI7QUFDQSxVQUFJLENBQUMsTUFBS1MsUUFBTixJQUFrQixDQUFDQyxNQUFNQyxPQUFOLENBQWNILFFBQWQsQ0FBbkIsSUFBOENBLFNBQVNJLE1BQVQsS0FBb0IsQ0FBdEUsRUFBeUUsT0FBTyxJQUFQOztBQUV6RSxVQUFNQyxlQUFlTCxTQUFTLENBQVQsQ0FBckI7QUFDQSxhQUFPLG1CQUFlLEVBQUVaLElBQUlpQixhQUFhakIsRUFBbkIsRUFBdUJrQixNQUFNRCxhQUFhQyxJQUExQyxFQUFmLENBQVA7QUFDRCxLQS9FMkQ7O0FBQUEsU0FpRjVEQyxRQWpGNEQsR0FpRmpEO0FBQUEsYUFBTXBDLE1BQU1xQixHQUFOLE9BQU47QUFBQSxLQWpGaUQ7O0FBQUEsU0FtRjVEZ0IsVUFuRjRELEdBbUYvQztBQUFBLGFBQU1wQyxRQUFRb0IsR0FBUixPQUFOO0FBQUEsS0FuRitDOztBQUFBLFNBcUY1RGlCLGtCQXJGNEQsR0FxRnZDLFlBQU07QUFDekIsVUFBTUMsaUJBQWlCdEMsUUFBUW9CLEdBQVIsT0FBdkI7QUFDQSxhQUFPa0IsMERBQWdEQSxlQUFlRCxrQkFBZixFQUFoRCxHQUFzRixFQUE3RjtBQUNELEtBeEYyRDs7QUFBQSxTQTBGNURFLGdCQTFGNEQsR0EwRnpDLFlBQU07QUFDdkIsVUFBTUQsaUJBQWlCdEMsUUFBUW9CLEdBQVIsT0FBdkI7QUFDQSxhQUFPa0IsMERBQWdEQSxlQUFlQyxnQkFBZixFQUFoRCxHQUFvRixFQUEzRjtBQUNELEtBN0YyRDs7QUFDMUQsU0FBS3ZCLEVBQUwsR0FBVUEsT0FBTyxJQUFQLEdBQWMsZ0JBQVF3QixLQUFSLEVBQWQsR0FBZ0N4QixFQUExQztBQUNBLFNBQUt5QixJQUFMO0FBQ0EsUUFBSXJDLFdBQVdXLGtCQUFYLEVBQStCLHdIQUEvQixDQUFKLEVBQThKO0FBQzVKYixnQ0FBMEJxQixHQUExQixDQUE4QixJQUE5QixFQUFvQ1Isa0JBQXBDO0FBQ0Q7QUFDRCxRQUFJRSxZQUFZYixXQUFXYSxRQUFYLEVBQXFCLGdGQUFyQixDQUFoQixFQUF3SDtBQUN0SGQsdUJBQWlCb0IsR0FBakIsQ0FBcUIsSUFBckIsRUFBMkJOLFFBQTNCO0FBQ0Q7QUFDRjs7Z0RBRUR3QixJLG1CQUFPO0FBQ0w3QyxXQUFPMkIsR0FBUCxDQUFXLElBQVgsRUFBaUIsS0FBakI7QUFDQXpCLFNBQUt5QixHQUFMLENBQVMsSUFBVCxFQUFlLElBQWY7QUFDQXhCLFVBQU13QixHQUFOLENBQVUsSUFBVixFQUFnQixJQUFoQjtBQUNBdEIsZUFBV3NCLEdBQVgsQ0FBZSxJQUFmLEVBQXFCLElBQXJCO0FBQ0FyQiw4QkFBMEJxQixHQUExQixDQUE4QixJQUE5QixFQUFvQztBQUFBLGFBQU0sSUFBSW1CLE9BQUosQ0FBWTtBQUFBLGVBQVdDLFFBQVEsSUFBUixDQUFYO0FBQUEsT0FBWixDQUFOO0FBQUEsS0FBcEM7QUFDQXhDLHFCQUFpQm9CLEdBQWpCLENBQXFCLElBQXJCLEVBQTJCLFlBQU0sQ0FBRSxDQUFuQztBQUNBLFNBQUtDLHdCQUFMO0FBQ0QsRzs7Z0RBRURBLHdCLHVDQUFzRDtBQUFBLFFBQTdCb0Isb0JBQTZCLHVFQUFOLElBQU07O0FBQ3BENUMsWUFBUTZDLE1BQVIsQ0FBZSxJQUFmO0FBQ0EsUUFBSUQsd0JBQXdCQSxxQkFBcUIsS0FBSzVCLEVBQTFCLENBQTVCLEVBQTJEO0FBQ3pEaEIsY0FBUXVCLEdBQVIsQ0FBWSxJQUFaLEVBQWtCcUIscUJBQXFCLEtBQUs1QixFQUExQixDQUFsQjtBQUNELEtBRkQsTUFFTztBQUNMaEIsY0FBUXVCLEdBQVIsQ0FBWSxJQUFaLEVBQWtCWCwwQkFBMEIsSUFBMUIsQ0FBbEI7QUFDRDtBQUNGLEc7O2dEQUVEYSxhLDRCQUFnQjtBQUNkLFFBQU1xQixzQkFBc0I5QyxRQUFRb0IsR0FBUixDQUFZLElBQVosQ0FBNUI7QUFDQSxRQUFNMkIsa0JBQWtCOUMsV0FBV21CLEdBQVgsQ0FBZSxJQUFmLENBQXhCO0FBQ0EsUUFBSTBCLG1CQUFKLEVBQXlCO0FBQ3ZCQSwwQkFBb0JyQixhQUFwQixDQUFrQ3NCLGVBQWxDO0FBQ0Q7QUFDRixHOztnREFFREMsa0IsK0JBQW1CRCxlLEVBQWlCO0FBQ2xDOUMsZUFBV3NCLEdBQVgsQ0FBZSxJQUFmLEVBQXFCd0IsZUFBckI7QUFDQSxRQUFJLEtBQUtsQixRQUFULEVBQW1CO0FBQ2pCLFdBQUtKLGFBQUw7QUFDRDtBQUNGLEc7Ozs7d0JBb0JjO0FBQ2IsYUFBTzdCLE9BQU93QixHQUFQLENBQVcsSUFBWCxDQUFQO0FBQ0Q7Ozt3QkFFWTtBQUNYLGFBQU90QixLQUFLc0IsR0FBTCxDQUFTLElBQVQsTUFBbUIsSUFBMUI7QUFDRDs7Ozs7O2tCQXRFa0JOLG1DIiwiZmlsZSI6ImRhdGEtc291cmNlLXByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cclxuXHJcbmltcG9ydCBDaGVja2VkSXRlbUhhc2hMaXN0IGZyb20gJy4uL21vZGVscy9jaGVja2VkLWl0ZW1zL2NoZWNrZWQtaXRlbS1oYXNoLWxpc3QnO1xyXG5pbXBvcnQgRGF0YUluZGV4IGZyb20gJy4uL21vZGVscy9kYXRhLWluZGV4JztcclxuaW1wb3J0IEl0ZW1FbnRpdHkgZnJvbSAnLi4vbW9kZWxzL2l0ZW0uZW50aXR5JztcclxuaW1wb3J0IEhTVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuY29uc3QgbG9hZGVkID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgZGF0YSA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IGluZGV4ID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgY2hlY2tlZCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHByZUNoZWNrZWQgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgY2FsbGJhY2tGdW5jdGlvbiA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMsIGVycm9yTWVzc2FnZSkge1xyXG4gIGlmIChmdW5jIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW5kZXgoaXRlbXMpIHtcclxuICBjb25zdCBkYXRhSW5kZXggPSBuZXcgRGF0YUluZGV4KGl0ZW1zKTtcclxuXHJcbiAgcmV0dXJuIGRhdGFJbmRleDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdChkYXRhU291cmNlUHJvdmlkZXIpIHtcclxuICByZXR1cm4gbmV3IENoZWNrZWRJdGVtSGFzaExpc3QoZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXIge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGFTb3VyY2VGdW5jdGlvbiwgaWQgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcclxuICAgIHRoaXMuaWQgPSBpZCA9PT0gbnVsbCA/IEhTVXRpbHMudUlkMTYoKSA6IGlkO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICBpZiAoaXNGdW5jdGlvbihkYXRhU291cmNlRnVuY3Rpb24sICdBIDxIaWVyYXJjaHlTZWxlY3RvckRhdGFTb3VyY2VQcm92aWRlcj4gZGF0YVNvdXJjZUZ1bmN0aW9uIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2Ugb2JqZWN0JykpIHtcclxuICAgICAgZGF0YVNvdXJjZVByb21pc2VGdW5jdGlvbi5zZXQodGhpcywgZGF0YVNvdXJjZUZ1bmN0aW9uKTtcclxuICAgIH1cclxuICAgIGlmIChjYWxsYmFjayAmJiBpc0Z1bmN0aW9uKGNhbGxiYWNrLCAnQSA8SGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXI+IGNhbGxiYWNrIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uJykpIHtcclxuICAgICAgY2FsbGJhY2tGdW5jdGlvbi5zZXQodGhpcywgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGxvYWRlZC5zZXQodGhpcywgZmFsc2UpO1xyXG4gICAgZGF0YS5zZXQodGhpcywgbnVsbCk7XHJcbiAgICBpbmRleC5zZXQodGhpcywgbnVsbCk7XHJcbiAgICBwcmVDaGVja2VkLnNldCh0aGlzLCBudWxsKTtcclxuICAgIGRhdGFTb3VyY2VQcm9taXNlRnVuY3Rpb24uc2V0KHRoaXMsICgpID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZShudWxsKSkpO1xyXG4gICAgY2FsbGJhY2tGdW5jdGlvbi5zZXQodGhpcywgKCkgPT4ge30pO1xyXG4gICAgdGhpcy5yZXNldENoZWNrZWRJdGVtSGFzaExpc3QoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0Q2hlY2tlZEl0ZW1IYXNoTGlzdChjaGVja2VkSXRlbUhhc2hMaXN0cyA9IG51bGwpIHtcclxuICAgIGNoZWNrZWQuZGVsZXRlKHRoaXMpO1xyXG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3RzICYmIGNoZWNrZWRJdGVtSGFzaExpc3RzW3RoaXMuaWRdKSB7XHJcbiAgICAgIGNoZWNrZWQuc2V0KHRoaXMsIGNoZWNrZWRJdGVtSGFzaExpc3RzW3RoaXMuaWRdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrZWQuc2V0KHRoaXMsIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3QodGhpcykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJlQ2hlY2tJdGVtcygpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBjaGVja2VkLmdldCh0aGlzKTtcclxuICAgIGNvbnN0IHByZUNoZWNrZWRJdGVtcyA9IHByZUNoZWNrZWQuZ2V0KHRoaXMpO1xyXG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3QpIHtcclxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5wcmVDaGVja0l0ZW1zKHByZUNoZWNrZWRJdGVtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRQcmVjaGVja2VkSXRlbXMocHJlQ2hlY2tlZEl0ZW1zKSB7XHJcbiAgICBwcmVDaGVja2VkLnNldCh0aGlzLCBwcmVDaGVja2VkSXRlbXMpO1xyXG4gICAgaWYgKHRoaXMuaXNMb2FkZWQpIHtcclxuICAgICAgdGhpcy5wcmVDaGVja0l0ZW1zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2FkRGF0YSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uLmdldCh0aGlzKSgpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgcHJvbWlzZSA9PT0gJ29iamVjdCcgJiYgcHJvbWlzZS50aGVuIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBkYXRhLnNldCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgaW5kZXguc2V0KHRoaXMsIGNyZWF0ZUluZGV4KHJlc3BvbnNlKSk7XHJcbiAgICAgICAgdGhpcy5yZXNldENoZWNrZWRJdGVtSGFzaExpc3QoKTtcclxuICAgICAgICB0aGlzLnByZUNoZWNrSXRlbXMoKTtcclxuICAgICAgICBsb2FkZWQuc2V0KHRoaXMsIHRydWUpO1xyXG4gICAgICAgIGNhbGxiYWNrRnVuY3Rpb24uZ2V0KHRoaXMpKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignQSA8SGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXI+IGRhdGFTb3VyY2VGdW5jdGlvbiBwcm9wZXJ0eSBkaWRuXFwndCByZXR1cm4gYSBwcm9taXNlIG9iamVjdCcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzTG9hZGVkKCkge1xyXG4gICAgcmV0dXJuIGxvYWRlZC5nZXQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNEYXRhKCkge1xyXG4gICAgcmV0dXJuIGRhdGEuZ2V0KHRoaXMpICE9PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YSA9ICgpID0+IGRhdGEuZ2V0KHRoaXMpO1xyXG5cclxuICBnZXRGaXJzdEl0ZW0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhbGxJdGVtcyA9IGRhdGEuZ2V0KHRoaXMpO1xyXG4gICAgaWYgKCF0aGlzLmlzTG9hZGVkIHx8ICFBcnJheS5pc0FycmF5KGFsbEl0ZW1zKSB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xyXG5cclxuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGFsbEl0ZW1zWzBdO1xyXG4gICAgcmV0dXJuIG5ldyBJdGVtRW50aXR5KHsgaWQ6IGZpcnN0RWxlbWVudC5pZCwgbmFtZTogZmlyc3RFbGVtZW50Lm5hbWUgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRJbmRleCA9ICgpID0+IGluZGV4LmdldCh0aGlzKTtcclxuXHJcbiAgZ2V0Q2hlY2tlZCA9ICgpID0+IGNoZWNrZWQuZ2V0KHRoaXMpO1xyXG5cclxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50Q2hlY2tlZCA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xyXG4gICAgcmV0dXJuIGN1cnJlbnRDaGVja2VkIGluc3RhbmNlb2YgQ2hlY2tlZEl0ZW1IYXNoTGlzdCA/IGN1cnJlbnRDaGVja2VkLmdldEFsbENoZWNrZWRJdGVtcygpIDogW107XHJcbiAgfVxyXG5cclxuICBnZXRDaGVja2VkT3V0cHV0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudENoZWNrZWQgPSBjaGVja2VkLmdldCh0aGlzKTtcclxuICAgIHJldHVybiBjdXJyZW50Q2hlY2tlZCBpbnN0YW5jZW9mIENoZWNrZWRJdGVtSGFzaExpc3QgPyBjdXJyZW50Q2hlY2tlZC5nZXRDaGVja2VkT3V0cHV0KCkgOiB7fTtcclxuICB9XHJcbn1cclxuIl19