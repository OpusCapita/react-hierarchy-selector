function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var HierarchySelectorDataSourceProvider =
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

    _defineProperty(this, "loadData", function () {
      var promise = dataSourcePromiseFunction.get(_this)();

      if (typeof promise === 'object' && promise.then instanceof Function) {
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
    });

    _defineProperty(this, "getData", function () {
      return data.get(_this);
    });

    _defineProperty(this, "getFirstItem", function () {
      var allItems = data.get(_this);
      if (!_this.isLoaded || !Array.isArray(allItems) || allItems.length === 0) return null;
      var firstElement = allItems[0];
      return new ItemEntity({
        id: firstElement.id,
        name: firstElement.name
      });
    });

    _defineProperty(this, "getIndex", function () {
      return index.get(_this);
    });

    _defineProperty(this, "getChecked", function () {
      return checked.get(_this);
    });

    _defineProperty(this, "getAllCheckedItems", function () {
      var currentChecked = checked.get(_this);
      return currentChecked instanceof CheckedItemHashList ? currentChecked.getAllCheckedItems() : [];
    });

    _defineProperty(this, "getCheckedOutput", function () {
      var currentChecked = checked.get(_this);
      return currentChecked instanceof CheckedItemHashList ? currentChecked.getCheckedOutput() : {};
    });

    this.id = id === null ? HSUtils.uId16() : id;
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

  _proto.resetCheckedItemHashList = function resetCheckedItemHashList(checkedItemHashLists) {
    if (checkedItemHashLists === void 0) {
      checkedItemHashLists = null;
    }

    checked["delete"](this);

    if (checkedItemHashLists && checkedItemHashLists[this.id]) {
      checked.set(this, checkedItemHashLists[this.id]);
    } else {
      checked.set(this, createCheckedItemHashList(this));
    }
  };

  _proto.preCheckItems = function preCheckItems() {
    var checkedItemHashList = checked.get(this);
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

  _createClass(HierarchySelectorDataSourceProvider, [{
    key: "isLoaded",
    get: function get() {
      return loaded.get(this);
    }
  }, {
    key: "isData",
    get: function get() {
      return data.get(this) !== null;
    }
  }]);

  return HierarchySelectorDataSourceProvider;
}();

export { HierarchySelectorDataSourceProvider as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9kYXRhLXNvdXJjZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6WyJDaGVja2VkSXRlbUhhc2hMaXN0IiwiRGF0YUluZGV4IiwiSXRlbUVudGl0eSIsIkhTVXRpbHMiLCJsb2FkZWQiLCJXZWFrTWFwIiwiZGF0YSIsImluZGV4IiwiY2hlY2tlZCIsInByZUNoZWNrZWQiLCJkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uIiwiY2FsbGJhY2tGdW5jdGlvbiIsImlzRnVuY3Rpb24iLCJmdW5jIiwiZXJyb3JNZXNzYWdlIiwiRnVuY3Rpb24iLCJFcnJvciIsImNyZWF0ZUluZGV4IiwiaXRlbXMiLCJkYXRhSW5kZXgiLCJjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0IiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiSGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXIiLCJkYXRhU291cmNlRnVuY3Rpb24iLCJpZCIsImNhbGxiYWNrIiwicHJvbWlzZSIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsInNldCIsInJlc2V0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsInByZUNoZWNrSXRlbXMiLCJhbGxJdGVtcyIsImlzTG9hZGVkIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZmlyc3RFbGVtZW50IiwibmFtZSIsImN1cnJlbnRDaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZE91dHB1dCIsInVJZDE2IiwiaW5pdCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwicHJlQ2hlY2tlZEl0ZW1zIiwic2V0UHJlY2hlY2tlZEl0ZW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBLE9BQU9BLG1CQUFQLE1BQWdDLGdEQUFoQztBQUNBLE9BQU9DLFNBQVAsTUFBc0Isc0JBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix1QkFBdkI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLFVBQXBCO0FBRUEsSUFBTUMsTUFBTSxHQUFHLElBQUlDLE9BQUosRUFBZjtBQUNBLElBQU1DLElBQUksR0FBRyxJQUFJRCxPQUFKLEVBQWI7QUFDQSxJQUFNRSxLQUFLLEdBQUcsSUFBSUYsT0FBSixFQUFkO0FBQ0EsSUFBTUcsT0FBTyxHQUFHLElBQUlILE9BQUosRUFBaEI7QUFDQSxJQUFNSSxVQUFVLEdBQUcsSUFBSUosT0FBSixFQUFuQjtBQUNBLElBQU1LLHlCQUF5QixHQUFHLElBQUlMLE9BQUosRUFBbEM7QUFDQSxJQUFNTSxnQkFBZ0IsR0FBRyxJQUFJTixPQUFKLEVBQXpCOztBQUVBLFNBQVNPLFVBQVQsQ0FBb0JDLElBQXBCLEVBQTBCQyxZQUExQixFQUF3QztBQUN0QyxNQUFJRCxJQUFJLFlBQVlFLFFBQXBCLEVBQThCO0FBQzVCLFdBQU8sSUFBUDtBQUNEOztBQUNELFFBQU0sSUFBSUMsS0FBSixDQUFVRixZQUFWLENBQU47QUFDRDs7QUFFRCxTQUFTRyxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUMxQixNQUFNQyxTQUFTLEdBQUcsSUFBSWxCLFNBQUosQ0FBY2lCLEtBQWQsQ0FBbEI7QUFFQSxTQUFPQyxTQUFQO0FBQ0Q7O0FBRUQsU0FBU0MseUJBQVQsQ0FBbUNDLGtCQUFuQyxFQUF1RDtBQUNyRCxTQUFPLElBQUlyQixtQkFBSixDQUF3QnFCLGtCQUF4QixDQUFQO0FBQ0Q7O0lBRW9CQyxtQzs7O0FBQ25CLCtDQUFZQyxrQkFBWixFQUFnQ0MsRUFBaEMsRUFBMkNDLFFBQTNDLEVBQTREO0FBQUE7O0FBQUEsUUFBNUJELEVBQTRCO0FBQTVCQSxNQUFBQSxFQUE0QixHQUF2QixJQUF1QjtBQUFBOztBQUFBLFFBQWpCQyxRQUFpQjtBQUFqQkEsTUFBQUEsUUFBaUIsR0FBTixJQUFNO0FBQUE7O0FBQUEsc0NBNkNqRCxZQUFNO0FBQ2YsVUFBTUMsT0FBTyxHQUFHaEIseUJBQXlCLENBQUNpQixHQUExQixDQUE4QixLQUE5QixHQUFoQjs7QUFFQSxVQUFJLE9BQU9ELE9BQVAsS0FBbUIsUUFBbkIsSUFBK0JBLE9BQU8sQ0FBQ0UsSUFBUixZQUF3QmIsUUFBM0QsRUFBcUU7QUFDbkUsZUFBT1csT0FBTyxDQUFDRSxJQUFSLENBQWEsVUFBQ0MsUUFBRCxFQUFjO0FBQ2hDdkIsVUFBQUEsSUFBSSxDQUFDd0IsR0FBTCxDQUFTLEtBQVQsRUFBZUQsUUFBZjtBQUNBdEIsVUFBQUEsS0FBSyxDQUFDdUIsR0FBTixDQUFVLEtBQVYsRUFBZ0JiLFdBQVcsQ0FBQ1ksUUFBRCxDQUEzQjs7QUFDQSxVQUFBLEtBQUksQ0FBQ0Usd0JBQUw7O0FBQ0EsVUFBQSxLQUFJLENBQUNDLGFBQUw7O0FBQ0E1QixVQUFBQSxNQUFNLENBQUMwQixHQUFQLENBQVcsS0FBWCxFQUFpQixJQUFqQjtBQUNBbkIsVUFBQUEsZ0JBQWdCLENBQUNnQixHQUFqQixDQUFxQixLQUFyQixFQUEyQkUsUUFBM0I7QUFFQSxpQkFBT0EsUUFBUDtBQUNELFNBVE0sQ0FBUDtBQVVEOztBQUNELFlBQU0sSUFBSWIsS0FBSixDQUFVLHFHQUFWLENBQU47QUFDRCxLQTdEMkQ7O0FBQUEscUNBdUVsRDtBQUFBLGFBQU1WLElBQUksQ0FBQ3FCLEdBQUwsQ0FBUyxLQUFULENBQU47QUFBQSxLQXZFa0Q7O0FBQUEsMENBeUU3QyxZQUFNO0FBQ25CLFVBQU1NLFFBQVEsR0FBRzNCLElBQUksQ0FBQ3FCLEdBQUwsQ0FBUyxLQUFULENBQWpCO0FBQ0EsVUFBSSxDQUFDLEtBQUksQ0FBQ08sUUFBTixJQUFrQixDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0gsUUFBZCxDQUFuQixJQUE4Q0EsUUFBUSxDQUFDSSxNQUFULEtBQW9CLENBQXRFLEVBQXlFLE9BQU8sSUFBUDtBQUV6RSxVQUFNQyxZQUFZLEdBQUdMLFFBQVEsQ0FBQyxDQUFELENBQTdCO0FBQ0EsYUFBTyxJQUFJL0IsVUFBSixDQUFlO0FBQUVzQixRQUFBQSxFQUFFLEVBQUVjLFlBQVksQ0FBQ2QsRUFBbkI7QUFBdUJlLFFBQUFBLElBQUksRUFBRUQsWUFBWSxDQUFDQztBQUExQyxPQUFmLENBQVA7QUFDRCxLQS9FMkQ7O0FBQUEsc0NBaUZqRDtBQUFBLGFBQU1oQyxLQUFLLENBQUNvQixHQUFOLENBQVUsS0FBVixDQUFOO0FBQUEsS0FqRmlEOztBQUFBLHdDQW1GL0M7QUFBQSxhQUFNbkIsT0FBTyxDQUFDbUIsR0FBUixDQUFZLEtBQVosQ0FBTjtBQUFBLEtBbkYrQzs7QUFBQSxnREFxRnZDLFlBQU07QUFDekIsVUFBTWEsY0FBYyxHQUFHaEMsT0FBTyxDQUFDbUIsR0FBUixDQUFZLEtBQVosQ0FBdkI7QUFDQSxhQUFPYSxjQUFjLFlBQVl4QyxtQkFBMUIsR0FBZ0R3QyxjQUFjLENBQUNDLGtCQUFmLEVBQWhELEdBQXNGLEVBQTdGO0FBQ0QsS0F4RjJEOztBQUFBLDhDQTBGekMsWUFBTTtBQUN2QixVQUFNRCxjQUFjLEdBQUdoQyxPQUFPLENBQUNtQixHQUFSLENBQVksS0FBWixDQUF2QjtBQUNBLGFBQU9hLGNBQWMsWUFBWXhDLG1CQUExQixHQUFnRHdDLGNBQWMsQ0FBQ0UsZ0JBQWYsRUFBaEQsR0FBb0YsRUFBM0Y7QUFDRCxLQTdGMkQ7O0FBQzFELFNBQUtsQixFQUFMLEdBQVVBLEVBQUUsS0FBSyxJQUFQLEdBQWNyQixPQUFPLENBQUN3QyxLQUFSLEVBQWQsR0FBZ0NuQixFQUExQztBQUNBLFNBQUtvQixJQUFMOztBQUNBLFFBQUloQyxVQUFVLENBQUNXLGtCQUFELEVBQXFCLHdIQUFyQixDQUFkLEVBQThKO0FBQzVKYixNQUFBQSx5QkFBeUIsQ0FBQ29CLEdBQTFCLENBQThCLElBQTlCLEVBQW9DUCxrQkFBcEM7QUFDRDs7QUFDRCxRQUFJRSxRQUFRLElBQUliLFVBQVUsQ0FBQ2EsUUFBRCxFQUFXLGdGQUFYLENBQTFCLEVBQXdIO0FBQ3RIZCxNQUFBQSxnQkFBZ0IsQ0FBQ21CLEdBQWpCLENBQXFCLElBQXJCLEVBQTJCTCxRQUEzQjtBQUNEO0FBQ0Y7Ozs7U0FFRG1CLEksR0FBQSxnQkFBTztBQUNMeEMsSUFBQUEsTUFBTSxDQUFDMEIsR0FBUCxDQUFXLElBQVgsRUFBaUIsS0FBakI7QUFDQXhCLElBQUFBLElBQUksQ0FBQ3dCLEdBQUwsQ0FBUyxJQUFULEVBQWUsSUFBZjtBQUNBdkIsSUFBQUEsS0FBSyxDQUFDdUIsR0FBTixDQUFVLElBQVYsRUFBZ0IsSUFBaEI7QUFDQXJCLElBQUFBLFVBQVUsQ0FBQ3FCLEdBQVgsQ0FBZSxJQUFmLEVBQXFCLElBQXJCO0FBQ0FwQixJQUFBQSx5QkFBeUIsQ0FBQ29CLEdBQTFCLENBQThCLElBQTlCLEVBQW9DO0FBQUEsYUFBTSxJQUFJZSxPQUFKLENBQVksVUFBQUMsT0FBTztBQUFBLGVBQUlBLE9BQU8sQ0FBQyxJQUFELENBQVg7QUFBQSxPQUFuQixDQUFOO0FBQUEsS0FBcEM7QUFDQW5DLElBQUFBLGdCQUFnQixDQUFDbUIsR0FBakIsQ0FBcUIsSUFBckIsRUFBMkIsWUFBTSxDQUFFLENBQW5DO0FBQ0EsU0FBS0Msd0JBQUw7QUFDRCxHOztTQUVEQSx3QixHQUFBLGtDQUF5QmdCLG9CQUF6QixFQUFzRDtBQUFBLFFBQTdCQSxvQkFBNkI7QUFBN0JBLE1BQUFBLG9CQUE2QixHQUFOLElBQU07QUFBQTs7QUFDcER2QyxJQUFBQSxPQUFPLFVBQVAsQ0FBZSxJQUFmOztBQUNBLFFBQUl1QyxvQkFBb0IsSUFBSUEsb0JBQW9CLENBQUMsS0FBS3ZCLEVBQU4sQ0FBaEQsRUFBMkQ7QUFDekRoQixNQUFBQSxPQUFPLENBQUNzQixHQUFSLENBQVksSUFBWixFQUFrQmlCLG9CQUFvQixDQUFDLEtBQUt2QixFQUFOLENBQXRDO0FBQ0QsS0FGRCxNQUVPO0FBQ0xoQixNQUFBQSxPQUFPLENBQUNzQixHQUFSLENBQVksSUFBWixFQUFrQlYseUJBQXlCLENBQUMsSUFBRCxDQUEzQztBQUNEO0FBQ0YsRzs7U0FFRFksYSxHQUFBLHlCQUFnQjtBQUNkLFFBQU1nQixtQkFBbUIsR0FBR3hDLE9BQU8sQ0FBQ21CLEdBQVIsQ0FBWSxJQUFaLENBQTVCO0FBQ0EsUUFBTXNCLGVBQWUsR0FBR3hDLFVBQVUsQ0FBQ2tCLEdBQVgsQ0FBZSxJQUFmLENBQXhCOztBQUNBLFFBQUlxQixtQkFBSixFQUF5QjtBQUN2QkEsTUFBQUEsbUJBQW1CLENBQUNoQixhQUFwQixDQUFrQ2lCLGVBQWxDO0FBQ0Q7QUFDRixHOztTQUVEQyxrQixHQUFBLDRCQUFtQkQsZUFBbkIsRUFBb0M7QUFDbEN4QyxJQUFBQSxVQUFVLENBQUNxQixHQUFYLENBQWUsSUFBZixFQUFxQm1CLGVBQXJCOztBQUNBLFFBQUksS0FBS2YsUUFBVCxFQUFtQjtBQUNqQixXQUFLRixhQUFMO0FBQ0Q7QUFDRixHOzs7O3dCQW9CYztBQUNiLGFBQU81QixNQUFNLENBQUN1QixHQUFQLENBQVcsSUFBWCxDQUFQO0FBQ0Q7Ozt3QkFFWTtBQUNYLGFBQU9yQixJQUFJLENBQUNxQixHQUFMLENBQVMsSUFBVCxNQUFtQixJQUExQjtBQUNEOzs7Ozs7U0F0RWtCTCxtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmltcG9ydCBDaGVja2VkSXRlbUhhc2hMaXN0IGZyb20gJy4uL21vZGVscy9jaGVja2VkLWl0ZW1zL2NoZWNrZWQtaXRlbS1oYXNoLWxpc3QnO1xuaW1wb3J0IERhdGFJbmRleCBmcm9tICcuLi9tb2RlbHMvZGF0YS1pbmRleCc7XG5pbXBvcnQgSXRlbUVudGl0eSBmcm9tICcuLi9tb2RlbHMvaXRlbS5lbnRpdHknO1xuaW1wb3J0IEhTVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBsb2FkZWQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgZGF0YSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBpbmRleCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBjaGVja2VkID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHByZUNoZWNrZWQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgZGF0YVNvdXJjZVByb21pc2VGdW5jdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBjYWxsYmFja0Z1bmN0aW9uID0gbmV3IFdlYWtNYXAoKTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jLCBlcnJvck1lc3NhZ2UpIHtcbiAgaWYgKGZ1bmMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbmRleChpdGVtcykge1xuICBjb25zdCBkYXRhSW5kZXggPSBuZXcgRGF0YUluZGV4KGl0ZW1zKTtcblxuICByZXR1cm4gZGF0YUluZGV4O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0KGRhdGFTb3VyY2VQcm92aWRlcikge1xuICByZXR1cm4gbmV3IENoZWNrZWRJdGVtSGFzaExpc3QoZGF0YVNvdXJjZVByb3ZpZGVyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihkYXRhU291cmNlRnVuY3Rpb24sIGlkID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgdGhpcy5pZCA9IGlkID09PSBudWxsID8gSFNVdGlscy51SWQxNigpIDogaWQ7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgaWYgKGlzRnVuY3Rpb24oZGF0YVNvdXJjZUZ1bmN0aW9uLCAnQSA8SGllcmFyY2h5U2VsZWN0b3JEYXRhU291cmNlUHJvdmlkZXI+IGRhdGFTb3VyY2VGdW5jdGlvbiBwcm9wZXJ0eSBzaG91bGQgYmUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlIG9iamVjdCcpKSB7XG4gICAgICBkYXRhU291cmNlUHJvbWlzZUZ1bmN0aW9uLnNldCh0aGlzLCBkYXRhU291cmNlRnVuY3Rpb24pO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2sgJiYgaXNGdW5jdGlvbihjYWxsYmFjaywgJ0EgPEhpZXJhcmNoeVNlbGVjdG9yRGF0YVNvdXJjZVByb3ZpZGVyPiBjYWxsYmFjayBwcm9wZXJ0eSBzaG91bGQgYmUgYSBmdW5jdGlvbicpKSB7XG4gICAgICBjYWxsYmFja0Z1bmN0aW9uLnNldCh0aGlzLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsb2FkZWQuc2V0KHRoaXMsIGZhbHNlKTtcbiAgICBkYXRhLnNldCh0aGlzLCBudWxsKTtcbiAgICBpbmRleC5zZXQodGhpcywgbnVsbCk7XG4gICAgcHJlQ2hlY2tlZC5zZXQodGhpcywgbnVsbCk7XG4gICAgZGF0YVNvdXJjZVByb21pc2VGdW5jdGlvbi5zZXQodGhpcywgKCkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKG51bGwpKSk7XG4gICAgY2FsbGJhY2tGdW5jdGlvbi5zZXQodGhpcywgKCkgPT4ge30pO1xuICAgIHRoaXMucmVzZXRDaGVja2VkSXRlbUhhc2hMaXN0KCk7XG4gIH1cblxuICByZXNldENoZWNrZWRJdGVtSGFzaExpc3QoY2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSBudWxsKSB7XG4gICAgY2hlY2tlZC5kZWxldGUodGhpcyk7XG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3RzICYmIGNoZWNrZWRJdGVtSGFzaExpc3RzW3RoaXMuaWRdKSB7XG4gICAgICBjaGVja2VkLnNldCh0aGlzLCBjaGVja2VkSXRlbUhhc2hMaXN0c1t0aGlzLmlkXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrZWQuc2V0KHRoaXMsIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3QodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIHByZUNoZWNrSXRlbXMoKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xuICAgIGNvbnN0IHByZUNoZWNrZWRJdGVtcyA9IHByZUNoZWNrZWQuZ2V0KHRoaXMpO1xuICAgIGlmIChjaGVja2VkSXRlbUhhc2hMaXN0KSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LnByZUNoZWNrSXRlbXMocHJlQ2hlY2tlZEl0ZW1zKTtcbiAgICB9XG4gIH1cblxuICBzZXRQcmVjaGVja2VkSXRlbXMocHJlQ2hlY2tlZEl0ZW1zKSB7XG4gICAgcHJlQ2hlY2tlZC5zZXQodGhpcywgcHJlQ2hlY2tlZEl0ZW1zKTtcbiAgICBpZiAodGhpcy5pc0xvYWRlZCkge1xuICAgICAgdGhpcy5wcmVDaGVja0l0ZW1zKCk7XG4gICAgfVxuICB9XG5cbiAgbG9hZERhdGEgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvbWlzZSA9IGRhdGFTb3VyY2VQcm9taXNlRnVuY3Rpb24uZ2V0KHRoaXMpKCk7XG5cbiAgICBpZiAodHlwZW9mIHByb21pc2UgPT09ICdvYmplY3QnICYmIHByb21pc2UudGhlbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBkYXRhLnNldCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgIGluZGV4LnNldCh0aGlzLCBjcmVhdGVJbmRleChyZXNwb25zZSkpO1xuICAgICAgICB0aGlzLnJlc2V0Q2hlY2tlZEl0ZW1IYXNoTGlzdCgpO1xuICAgICAgICB0aGlzLnByZUNoZWNrSXRlbXMoKTtcbiAgICAgICAgbG9hZGVkLnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgY2FsbGJhY2tGdW5jdGlvbi5nZXQodGhpcykocmVzcG9uc2UpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgPEhpZXJhcmNoeVNlbGVjdG9yRGF0YVNvdXJjZVByb3ZpZGVyPiBkYXRhU291cmNlRnVuY3Rpb24gcHJvcGVydHkgZGlkblxcJ3QgcmV0dXJuIGEgcHJvbWlzZSBvYmplY3QnKTtcbiAgfVxuXG4gIGdldCBpc0xvYWRlZCgpIHtcbiAgICByZXR1cm4gbG9hZGVkLmdldCh0aGlzKTtcbiAgfVxuXG4gIGdldCBpc0RhdGEoKSB7XG4gICAgcmV0dXJuIGRhdGEuZ2V0KHRoaXMpICE9PSBudWxsO1xuICB9XG5cbiAgZ2V0RGF0YSA9ICgpID0+IGRhdGEuZ2V0KHRoaXMpO1xuXG4gIGdldEZpcnN0SXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBhbGxJdGVtcyA9IGRhdGEuZ2V0KHRoaXMpO1xuICAgIGlmICghdGhpcy5pc0xvYWRlZCB8fCAhQXJyYXkuaXNBcnJheShhbGxJdGVtcykgfHwgYWxsSXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGFsbEl0ZW1zWzBdO1xuICAgIHJldHVybiBuZXcgSXRlbUVudGl0eSh7IGlkOiBmaXJzdEVsZW1lbnQuaWQsIG5hbWU6IGZpcnN0RWxlbWVudC5uYW1lIH0pO1xuICB9XG5cbiAgZ2V0SW5kZXggPSAoKSA9PiBpbmRleC5nZXQodGhpcyk7XG5cbiAgZ2V0Q2hlY2tlZCA9ICgpID0+IGNoZWNrZWQuZ2V0KHRoaXMpO1xuXG4gIGdldEFsbENoZWNrZWRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50Q2hlY2tlZCA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xuICAgIHJldHVybiBjdXJyZW50Q2hlY2tlZCBpbnN0YW5jZW9mIENoZWNrZWRJdGVtSGFzaExpc3QgPyBjdXJyZW50Q2hlY2tlZC5nZXRBbGxDaGVja2VkSXRlbXMoKSA6IFtdO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZE91dHB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50Q2hlY2tlZCA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xuICAgIHJldHVybiBjdXJyZW50Q2hlY2tlZCBpbnN0YW5jZW9mIENoZWNrZWRJdGVtSGFzaExpc3QgPyBjdXJyZW50Q2hlY2tlZC5nZXRDaGVja2VkT3V0cHV0KCkgOiB7fTtcbiAgfVxufVxuIl19