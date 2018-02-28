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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9kYXRhLXNvdXJjZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6WyJsb2FkZWQiLCJXZWFrTWFwIiwiZGF0YSIsImluZGV4IiwiY2hlY2tlZCIsInByZUNoZWNrZWQiLCJkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uIiwiY2FsbGJhY2tGdW5jdGlvbiIsImlzRnVuY3Rpb24iLCJmdW5jIiwiZXJyb3JNZXNzYWdlIiwiRnVuY3Rpb24iLCJFcnJvciIsImNyZWF0ZUluZGV4IiwiaXRlbXMiLCJkYXRhSW5kZXgiLCJjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0IiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiSGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXIiLCJkYXRhU291cmNlRnVuY3Rpb24iLCJpZCIsImNhbGxiYWNrIiwibG9hZERhdGEiLCJwcm9taXNlIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic2V0IiwicmVzZXRDaGVja2VkSXRlbUhhc2hMaXN0IiwicHJlQ2hlY2tJdGVtcyIsImdldERhdGEiLCJnZXRGaXJzdEl0ZW0iLCJhbGxJdGVtcyIsImlzTG9hZGVkIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZmlyc3RFbGVtZW50IiwibmFtZSIsImdldEluZGV4IiwiZ2V0Q2hlY2tlZCIsImdldEFsbENoZWNrZWRJdGVtcyIsImN1cnJlbnRDaGVja2VkIiwiZ2V0Q2hlY2tlZE91dHB1dCIsInVJZDE2IiwiaW5pdCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJkZWxldGUiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwicHJlQ2hlY2tlZEl0ZW1zIiwic2V0UHJlY2hlY2tlZEl0ZW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLElBQUlDLE9BQUosRUFBZjtBQUNBLElB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LEVBQWtCcUIscUJBQXFCLEtBQUs1QixFQUExQixDQUFsQjtBQUNELEtBRkQsTUFFTztBQUNMaEIsY0FBUXVCLEdBQVIsQ0FBWSxJQUFaLEVBQWtCWCwwQkFBMEIsSUFBMUIsQ0FBbEI7QUFDRDtBQUNGLEc7O2dEQUVEYSxhLDRCQUFnQjtBQUNkLFFBQU1xQixzQkFBc0I5QyxRQUFRb0IsR0FBUixDQUFZLElBQVosQ0FBNUI7QUFDQSxRQUFNMkIsa0JBQWtCOUMsV0FBV21CLEdBQVgsQ0FBZSxJQUFmLENBQXhCO0FBQ0EsUUFBSTBCLG1CQUFKLEVBQXlCO0FBQ3ZCQSwwQkFBb0JyQixhQUFwQixDQUFrQ3NCLGVBQWxDO0FBQ0Q7QUFDRixHOztnREFFREMsa0IsK0JBQW1CRCxlLEVBQWlCO0FBQ2xDOUMsZUFBV3NCLEdBQVgsQ0FBZSxJQUFmLEVBQXFCd0IsZUFBckI7QUFDQSxRQUFJLEtBQUtsQixRQUFULEVBQW1CO0FBQ2pCLFdBQUtKLGFBQUw7QUFDRDtBQUNGLEc7Ozs7d0JBb0JjO0FBQ2IsYUFBTzdCLE9BQU93QixHQUFQLENBQVcsSUFBWCxDQUFQO0FBQ0Q7Ozt3QkFFWTtBQUNYLGFBQU90QixLQUFLc0IsR0FBTCxDQUFTLElBQVQsTUFBbUIsSUFBMUI7QUFDRDs7Ozs7O2tCQXRFa0JOLG1DIiwiZmlsZSI6ImRhdGEtc291cmNlLXByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuaW1wb3J0IENoZWNrZWRJdGVtSGFzaExpc3QgZnJvbSAnLi4vbW9kZWxzL2NoZWNrZWQtaXRlbXMvY2hlY2tlZC1pdGVtLWhhc2gtbGlzdCc7XG5pbXBvcnQgRGF0YUluZGV4IGZyb20gJy4uL21vZGVscy9kYXRhLWluZGV4JztcbmltcG9ydCBJdGVtRW50aXR5IGZyb20gJy4uL21vZGVscy9pdGVtLmVudGl0eSc7XG5pbXBvcnQgSFNVdGlscyBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGxvYWRlZCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBkYXRhID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGluZGV4ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGNoZWNrZWQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcHJlQ2hlY2tlZCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGNhbGxiYWNrRnVuY3Rpb24gPSBuZXcgV2Vha01hcCgpO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMsIGVycm9yTWVzc2FnZSkge1xuICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluZGV4KGl0ZW1zKSB7XG4gIGNvbnN0IGRhdGFJbmRleCA9IG5ldyBEYXRhSW5kZXgoaXRlbXMpO1xuXG4gIHJldHVybiBkYXRhSW5kZXg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3QoZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gIHJldHVybiBuZXcgQ2hlY2tlZEl0ZW1IYXNoTGlzdChkYXRhU291cmNlUHJvdmlkZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvckRhdGFTb3VyY2VQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKGRhdGFTb3VyY2VGdW5jdGlvbiwgaWQgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICB0aGlzLmlkID0gaWQgPT09IG51bGwgPyBIU1V0aWxzLnVJZDE2KCkgOiBpZDtcbiAgICB0aGlzLmluaXQoKTtcbiAgICBpZiAoaXNGdW5jdGlvbihkYXRhU291cmNlRnVuY3Rpb24sICdBIDxIaWVyYXJjaHlTZWxlY3RvckRhdGFTb3VyY2VQcm92aWRlcj4gZGF0YVNvdXJjZUZ1bmN0aW9uIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2Ugb2JqZWN0JykpIHtcbiAgICAgIGRhdGFTb3VyY2VQcm9taXNlRnVuY3Rpb24uc2V0KHRoaXMsIGRhdGFTb3VyY2VGdW5jdGlvbik7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjayAmJiBpc0Z1bmN0aW9uKGNhbGxiYWNrLCAnQSA8SGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXI+IGNhbGxiYWNrIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uJykpIHtcbiAgICAgIGNhbGxiYWNrRnVuY3Rpb24uc2V0KHRoaXMsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvYWRlZC5zZXQodGhpcywgZmFsc2UpO1xuICAgIGRhdGEuc2V0KHRoaXMsIG51bGwpO1xuICAgIGluZGV4LnNldCh0aGlzLCBudWxsKTtcbiAgICBwcmVDaGVja2VkLnNldCh0aGlzLCBudWxsKTtcbiAgICBkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uLnNldCh0aGlzLCAoKSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlc29sdmUobnVsbCkpKTtcbiAgICBjYWxsYmFja0Z1bmN0aW9uLnNldCh0aGlzLCAoKSA9PiB7fSk7XG4gICAgdGhpcy5yZXNldENoZWNrZWRJdGVtSGFzaExpc3QoKTtcbiAgfVxuXG4gIHJlc2V0Q2hlY2tlZEl0ZW1IYXNoTGlzdChjaGVja2VkSXRlbUhhc2hMaXN0cyA9IG51bGwpIHtcbiAgICBjaGVja2VkLmRlbGV0ZSh0aGlzKTtcbiAgICBpZiAoY2hlY2tlZEl0ZW1IYXNoTGlzdHMgJiYgY2hlY2tlZEl0ZW1IYXNoTGlzdHNbdGhpcy5pZF0pIHtcbiAgICAgIGNoZWNrZWQuc2V0KHRoaXMsIGNoZWNrZWRJdGVtSGFzaExpc3RzW3RoaXMuaWRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2tlZC5zZXQodGhpcywgY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgcHJlQ2hlY2tJdGVtcygpIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gcHJlQ2hlY2tlZC5nZXQodGhpcyk7XG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3QpIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucHJlQ2hlY2tJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xuICAgIH1cbiAgfVxuXG4gIHNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpIHtcbiAgICBwcmVDaGVja2VkLnNldCh0aGlzLCBwcmVDaGVja2VkSXRlbXMpO1xuICAgIGlmICh0aGlzLmlzTG9hZGVkKSB7XG4gICAgICB0aGlzLnByZUNoZWNrSXRlbXMoKTtcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9taXNlID0gZGF0YVNvdXJjZVByb21pc2VGdW5jdGlvbi5nZXQodGhpcykoKTtcblxuICAgIGlmICh0eXBlb2YgcHJvbWlzZSA9PT0gJ29iamVjdCcgJiYgcHJvbWlzZS50aGVuIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGRhdGEuc2V0KHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgaW5kZXguc2V0KHRoaXMsIGNyZWF0ZUluZGV4KHJlc3BvbnNlKSk7XG4gICAgICAgIHRoaXMucmVzZXRDaGVja2VkSXRlbUhhc2hMaXN0KCk7XG4gICAgICAgIHRoaXMucHJlQ2hlY2tJdGVtcygpO1xuICAgICAgICBsb2FkZWQuc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICBjYWxsYmFja0Z1bmN0aW9uLmdldCh0aGlzKShyZXNwb25zZSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignQSA8SGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXI+IGRhdGFTb3VyY2VGdW5jdGlvbiBwcm9wZXJ0eSBkaWRuXFwndCByZXR1cm4gYSBwcm9taXNlIG9iamVjdCcpO1xuICB9XG5cbiAgZ2V0IGlzTG9hZGVkKCkge1xuICAgIHJldHVybiBsb2FkZWQuZ2V0KHRoaXMpO1xuICB9XG5cbiAgZ2V0IGlzRGF0YSgpIHtcbiAgICByZXR1cm4gZGF0YS5nZXQodGhpcykgIT09IG51bGw7XG4gIH1cblxuICBnZXREYXRhID0gKCkgPT4gZGF0YS5nZXQodGhpcyk7XG5cbiAgZ2V0Rmlyc3RJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsbEl0ZW1zID0gZGF0YS5nZXQodGhpcyk7XG4gICAgaWYgKCF0aGlzLmlzTG9hZGVkIHx8ICFBcnJheS5pc0FycmF5KGFsbEl0ZW1zKSB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gYWxsSXRlbXNbMF07XG4gICAgcmV0dXJuIG5ldyBJdGVtRW50aXR5KHsgaWQ6IGZpcnN0RWxlbWVudC5pZCwgbmFtZTogZmlyc3RFbGVtZW50Lm5hbWUgfSk7XG4gIH1cblxuICBnZXRJbmRleCA9ICgpID0+IGluZGV4LmdldCh0aGlzKTtcblxuICBnZXRDaGVja2VkID0gKCkgPT4gY2hlY2tlZC5nZXQodGhpcyk7XG5cbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRDaGVja2VkID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgcmV0dXJuIGN1cnJlbnRDaGVja2VkIGluc3RhbmNlb2YgQ2hlY2tlZEl0ZW1IYXNoTGlzdCA/IGN1cnJlbnRDaGVja2VkLmdldEFsbENoZWNrZWRJdGVtcygpIDogW107XG4gIH1cblxuICBnZXRDaGVja2VkT3V0cHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRDaGVja2VkID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgcmV0dXJuIGN1cnJlbnRDaGVja2VkIGluc3RhbmNlb2YgQ2hlY2tlZEl0ZW1IYXNoTGlzdCA/IGN1cnJlbnRDaGVja2VkLmdldENoZWNrZWRPdXRwdXQoKSA6IHt9O1xuICB9XG59XG4iXX0=