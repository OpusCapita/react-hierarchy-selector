var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-param-reassign */

import CheckedItemHashList from '../models/checked-items/checked-item-hash-list';
import DataIndex from '../models/data-index';
import ItemEntity from '../models/item.entity';
import HSUtils from '../utils';

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
  var dataIndex = new DataIndex(items);

  return dataIndex;
}

function createCheckedItemHashList(dataSourceProvider) {
  return new CheckedItemHashList(dataSourceProvider);
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
      return new ItemEntity({ id: firstElement.id, name: firstElement.name });
    };

    this.getIndex = function () {
      return index.get(_this);
    };

    this.getChecked = function () {
      return checked.get(_this);
    };

    this.getAllCheckedItems = function () {
      var currentChecked = checked.get(_this);
      return currentChecked instanceof CheckedItemHashList ? currentChecked.getAllCheckedItems() : [];
    };

    this.getCheckedOutput = function () {
      var currentChecked = checked.get(_this);
      return currentChecked instanceof CheckedItemHashList ? currentChecked.getCheckedOutput() : {};
    };

    this.id = id === null ? HSUtils.uId16() : id;
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

export { HierarchySelectorDataSourceProvider as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9kYXRhLXNvdXJjZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6WyJDaGVja2VkSXRlbUhhc2hMaXN0IiwiRGF0YUluZGV4IiwiSXRlbUVudGl0eSIsIkhTVXRpbHMiLCJsb2FkZWQiLCJXZWFrTWFwIiwiZGF0YSIsImluZGV4IiwiY2hlY2tlZCIsInByZUNoZWNrZWQiLCJkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uIiwiY2FsbGJhY2tGdW5jdGlvbiIsImlzRnVuY3Rpb24iLCJmdW5jIiwiZXJyb3JNZXNzYWdlIiwiRnVuY3Rpb24iLCJFcnJvciIsImNyZWF0ZUluZGV4IiwiaXRlbXMiLCJkYXRhSW5kZXgiLCJjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0IiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiSGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXIiLCJkYXRhU291cmNlRnVuY3Rpb24iLCJpZCIsImNhbGxiYWNrIiwibG9hZERhdGEiLCJwcm9taXNlIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic2V0IiwicmVzZXRDaGVja2VkSXRlbUhhc2hMaXN0IiwicHJlQ2hlY2tJdGVtcyIsImdldERhdGEiLCJnZXRGaXJzdEl0ZW0iLCJhbGxJdGVtcyIsImlzTG9hZGVkIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZmlyc3RFbGVtZW50IiwibmFtZSIsImdldEluZGV4IiwiZ2V0Q2hlY2tlZCIsImdldEFsbENoZWNrZWRJdGVtcyIsImN1cnJlbnRDaGVja2VkIiwiZ2V0Q2hlY2tlZE91dHB1dCIsInVJZDE2IiwiaW5pdCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJkZWxldGUiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwicHJlQ2hlY2tlZEl0ZW1zIiwic2V0UHJlY2hlY2tlZEl0ZW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQSxPQUFPQSxtQkFBUCxNQUFn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QUEyQixZQUFNLENBQUUsQ0FBbkM7QUFDQSxTQUFLQyx3QkFBTDtBQUNELEc7O2dEQUVEQSx3Qix1Q0FBc0Q7QUFBQSxRQUE3Qm9CLG9CQUE2Qix1RUFBTixJQUFNOztBQUNwRDVDLFlBQVE2QyxNQUFSLENBQWUsSUFBZjtBQUNBLFFBQUlELHdCQUF3QkEscUJBQXFCLEtBQUs1QixFQUExQixDQUE1QixFQUEyRDtBQUN6RGhCLGNBQVF1QixHQUFSLENBQVksSUFBWixFQUFrQnFCLHFCQUFxQixLQUFLNUIsRUFBMUIsQ0FBbEI7QUFDRCxLQUZELE1BRU87QUFDTGhCLGNBQVF1QixHQUFSLENBQVksSUFBWixFQUFrQlgsMEJBQTBCLElBQTFCLENBQWxCO0FBQ0Q7QUFDRixHOztnREFFRGEsYSw0QkFBZ0I7QUFDZCxRQUFNcUIsc0JBQXNCOUMsUUFBUW9CLEdBQVIsQ0FBWSxJQUFaLENBQTVCO0FBQ0EsUUFBTTJCLGtCQUFrQjlDLFdBQVdtQixHQUFYLENBQWUsSUFBZixDQUF4QjtBQUNBLFFBQUkwQixtQkFBSixFQUF5QjtBQUN2QkEsMEJBQW9CckIsYUFBcEIsQ0FBa0NzQixlQUFsQztBQUNEO0FBQ0YsRzs7Z0RBRURDLGtCLCtCQUFtQkQsZSxFQUFpQjtBQUNsQzlDLGVBQVdzQixHQUFYLENBQWUsSUFBZixFQUFxQndCLGVBQXJCO0FBQ0EsUUFBSSxLQUFLbEIsUUFBVCxFQUFtQjtBQUNqQixXQUFLSixhQUFMO0FBQ0Q7QUFDRixHOzs7O3dCQW9CYztBQUNiLGFBQU83QixPQUFPd0IsR0FBUCxDQUFXLElBQVgsQ0FBUDtBQUNEOzs7d0JBRVk7QUFDWCxhQUFPdEIsS0FBS3NCLEdBQUwsQ0FBUyxJQUFULE1BQW1CLElBQTFCO0FBQ0Q7Ozs7OztTQXRFa0JOLG1DIiwiZmlsZSI6ImRhdGEtc291cmNlLXByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuaW1wb3J0IENoZWNrZWRJdGVtSGFzaExpc3QgZnJvbSAnLi4vbW9kZWxzL2NoZWNrZWQtaXRlbXMvY2hlY2tlZC1pdGVtLWhhc2gtbGlzdCc7XG5pbXBvcnQgRGF0YUluZGV4IGZyb20gJy4uL21vZGVscy9kYXRhLWluZGV4JztcbmltcG9ydCBJdGVtRW50aXR5IGZyb20gJy4uL21vZGVscy9pdGVtLmVudGl0eSc7XG5pbXBvcnQgSFNVdGlscyBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGxvYWRlZCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBkYXRhID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGluZGV4ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGNoZWNrZWQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcHJlQ2hlY2tlZCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGNhbGxiYWNrRnVuY3Rpb24gPSBuZXcgV2Vha01hcCgpO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMsIGVycm9yTWVzc2FnZSkge1xuICBpZiAoZnVuYyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluZGV4KGl0ZW1zKSB7XG4gIGNvbnN0IGRhdGFJbmRleCA9IG5ldyBEYXRhSW5kZXgoaXRlbXMpO1xuXG4gIHJldHVybiBkYXRhSW5kZXg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3QoZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gIHJldHVybiBuZXcgQ2hlY2tlZEl0ZW1IYXNoTGlzdChkYXRhU291cmNlUHJvdmlkZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvckRhdGFTb3VyY2VQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKGRhdGFTb3VyY2VGdW5jdGlvbiwgaWQgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICB0aGlzLmlkID0gaWQgPT09IG51bGwgPyBIU1V0aWxzLnVJZDE2KCkgOiBpZDtcbiAgICB0aGlzLmluaXQoKTtcbiAgICBpZiAoaXNGdW5jdGlvbihkYXRhU291cmNlRnVuY3Rpb24sICdBIDxIaWVyYXJjaHlTZWxlY3RvckRhdGFTb3VyY2VQcm92aWRlcj4gZGF0YVNvdXJjZUZ1bmN0aW9uIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2Ugb2JqZWN0JykpIHtcbiAgICAgIGRhdGFTb3VyY2VQcm9taXNlRnVuY3Rpb24uc2V0KHRoaXMsIGRhdGFTb3VyY2VGdW5jdGlvbik7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjayAmJiBpc0Z1bmN0aW9uKGNhbGxiYWNrLCAnQSA8SGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXI+IGNhbGxiYWNrIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uJykpIHtcbiAgICAgIGNhbGxiYWNrRnVuY3Rpb24uc2V0KHRoaXMsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvYWRlZC5zZXQodGhpcywgZmFsc2UpO1xuICAgIGRhdGEuc2V0KHRoaXMsIG51bGwpO1xuICAgIGluZGV4LnNldCh0aGlzLCBudWxsKTtcbiAgICBwcmVDaGVja2VkLnNldCh0aGlzLCBudWxsKTtcbiAgICBkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uLnNldCh0aGlzLCAoKSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlc29sdmUobnVsbCkpKTtcbiAgICBjYWxsYmFja0Z1bmN0aW9uLnNldCh0aGlzLCAoKSA9PiB7fSk7XG4gICAgdGhpcy5yZXNldENoZWNrZWRJdGVtSGFzaExpc3QoKTtcbiAgfVxuXG4gIHJlc2V0Q2hlY2tlZEl0ZW1IYXNoTGlzdChjaGVja2VkSXRlbUhhc2hMaXN0cyA9IG51bGwpIHtcbiAgICBjaGVja2VkLmRlbGV0ZSh0aGlzKTtcbiAgICBpZiAoY2hlY2tlZEl0ZW1IYXNoTGlzdHMgJiYgY2hlY2tlZEl0ZW1IYXNoTGlzdHNbdGhpcy5pZF0pIHtcbiAgICAgIGNoZWNrZWQuc2V0KHRoaXMsIGNoZWNrZWRJdGVtSGFzaExpc3RzW3RoaXMuaWRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2tlZC5zZXQodGhpcywgY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgcHJlQ2hlY2tJdGVtcygpIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gcHJlQ2hlY2tlZC5nZXQodGhpcyk7XG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3QpIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucHJlQ2hlY2tJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xuICAgIH1cbiAgfVxuXG4gIHNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpIHtcbiAgICBwcmVDaGVja2VkLnNldCh0aGlzLCBwcmVDaGVja2VkSXRlbXMpO1xuICAgIGlmICh0aGlzLmlzTG9hZGVkKSB7XG4gICAgICB0aGlzLnByZUNoZWNrSXRlbXMoKTtcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9taXNlID0gZGF0YVNvdXJjZVByb21pc2VGdW5jdGlvbi5nZXQodGhpcykoKTtcblxuICAgIGlmICh0eXBlb2YgcHJvbWlzZSA9PT0gJ29iamVjdCcgJiYgcHJvbWlzZS50aGVuIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGRhdGEuc2V0KHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgaW5kZXguc2V0KHRoaXMsIGNyZWF0ZUluZGV4KHJlc3BvbnNlKSk7XG4gICAgICAgIHRoaXMucmVzZXRDaGVja2VkSXRlbUhhc2hMaXN0KCk7XG4gICAgICAgIHRoaXMucHJlQ2hlY2tJdGVtcygpO1xuICAgICAgICBsb2FkZWQuc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICBjYWxsYmFja0Z1bmN0aW9uLmdldCh0aGlzKShyZXNwb25zZSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignQSA8SGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXI+IGRhdGFTb3VyY2VGdW5jdGlvbiBwcm9wZXJ0eSBkaWRuXFwndCByZXR1cm4gYSBwcm9taXNlIG9iamVjdCcpO1xuICB9XG5cbiAgZ2V0IGlzTG9hZGVkKCkge1xuICAgIHJldHVybiBsb2FkZWQuZ2V0KHRoaXMpO1xuICB9XG5cbiAgZ2V0IGlzRGF0YSgpIHtcbiAgICByZXR1cm4gZGF0YS5nZXQodGhpcykgIT09IG51bGw7XG4gIH1cblxuICBnZXREYXRhID0gKCkgPT4gZGF0YS5nZXQodGhpcyk7XG5cbiAgZ2V0Rmlyc3RJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsbEl0ZW1zID0gZGF0YS5nZXQodGhpcyk7XG4gICAgaWYgKCF0aGlzLmlzTG9hZGVkIHx8ICFBcnJheS5pc0FycmF5KGFsbEl0ZW1zKSB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gYWxsSXRlbXNbMF07XG4gICAgcmV0dXJuIG5ldyBJdGVtRW50aXR5KHsgaWQ6IGZpcnN0RWxlbWVudC5pZCwgbmFtZTogZmlyc3RFbGVtZW50Lm5hbWUgfSk7XG4gIH1cblxuICBnZXRJbmRleCA9ICgpID0+IGluZGV4LmdldCh0aGlzKTtcblxuICBnZXRDaGVja2VkID0gKCkgPT4gY2hlY2tlZC5nZXQodGhpcyk7XG5cbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRDaGVja2VkID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgcmV0dXJuIGN1cnJlbnRDaGVja2VkIGluc3RhbmNlb2YgQ2hlY2tlZEl0ZW1IYXNoTGlzdCA/IGN1cnJlbnRDaGVja2VkLmdldEFsbENoZWNrZWRJdGVtcygpIDogW107XG4gIH1cblxuICBnZXRDaGVja2VkT3V0cHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRDaGVja2VkID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgcmV0dXJuIGN1cnJlbnRDaGVja2VkIGluc3RhbmNlb2YgQ2hlY2tlZEl0ZW1IYXNoTGlzdCA/IGN1cnJlbnRDaGVja2VkLmdldENoZWNrZWRPdXRwdXQoKSA6IHt9O1xuICB9XG59XG4iXX0=