'use strict';

exports.__esModule = true;

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _checkedHashItem = require('./checked-hash-item');

var _checkedHashItem2 = _interopRequireDefault(_checkedHashItem);

var _checkedOutput = require('./checked-output');

var _checkedOutput2 = _interopRequireDefault(_checkedOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    if (!checkedItems[parentHash]) checkedItems[parentHash] = new _checkedHashItem2.default(parents);

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

    if (!checkedItems[hash]) checkedItems[hash] = new _checkedHashItem2.default(parents);

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
      var checkedOutput = new _checkedOutput2.default();
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
}(_base2.default);

exports.default = CheckedItemHashList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY2hlY2tlZC1pdGVtcy9jaGVja2VkLWl0ZW0taGFzaC1saXN0LmpzIl0sIm5hbWVzIjpbInNvdXJjZVByb3ZpZGVyIiwiV2Vha01hcCIsInByb3ZpZGVySWQiLCJjaGVja2VkIiwiaW5kZXgiLCJsYXN0VXBkYXRlIiwiY2xlYXJBbGwiLCJsaXN0Iiwic2V0IiwiZ2V0Q2hpbGRIYXNoZXNPZkNoZWNrZWRJdGVtcyIsImhhc2giLCJjaGVja2VkSXRlbXMiLCJnZXQiLCJoYXNoZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImN1cnJlbnRIYXNoIiwiaW5kZXhPZiIsInB1c2giLCJyZW1vdmVJdGVtIiwicGFyZW50SWRzIiwiaWQiLCJkYXRhSW5kZXgiLCJpbmRleEl0ZW0iLCJnZXRGcm9tSW5kZXgiLCJwYXJlbnRIYXNoIiwicmVtb3ZlQ2hlY2tlZEl0ZW0iLCJpdGVtIiwiZ2V0Q2hlY2tlZEl0ZW1zIiwibGVuZ3RoIiwicmVtb3ZlSGFzaCIsInVuY2hlY2tBbGwiLCJyZW1vdmVBbGxJdGVtcyIsImdldEhhc2giLCJhZGRJdGVtIiwicGFyZW50cyIsImdldFBhcmVudHMiLCJoYXNoSXRlbSIsImFkZENoZWNrZWRJdGVtIiwiYWRkQWxsSXRlbXMiLCJjaGlsZEhhc2hlcyIsImgiLCJjaGVja0FsbCIsInByZUNoZWNrSXRlbXMiLCJwcmVDaGVja2VkSXRlbXMiLCJwYXJlbnRJZCIsImhhc2hPZlByZUNoZWNrZWQiLCJpIiwiaHMiLCJmb3VuZCIsImlzQ2hlY2tlZEFsbCIsIkFycmF5IiwiaXNBcnJheSIsImNoaWxkcmVuIiwiYWZ0ZXJVcGRhdGUiLCJEYXRlIiwibm93IiwiQ2hlY2tlZEl0ZW1IYXNoTGlzdCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWRIYXNoQXJyYXkiLCJrZXkiLCJjb25jYXQiLCJjaGVja2VkSGFzaEl0ZW0iLCJnZXRIYXNoSXRlbSIsInJlc3VsdCIsImdldElzQ2hlY2tlZEFsbCIsImdldENoZWNrZWRJdGVtc0NvdW50IiwiY291bnQiLCJnZXRJZCIsImdldEhhc2hGcm9tSWRzIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwiZ2V0Q2hlY2tlZE91dHB1dCIsInJlc3VsdE9iamVjdCIsImRhdGFTb3VyY2VQcm92aWRlcklkIiwiY2hlY2tlZE91dHB1dCIsImFkZCIsImFkZEFsbCIsImNyZWF0ZUNvcHkiLCJjb3B5IiwiY2xvbmUiLCJjaGtkIiwiYXNzaWduIiwicmVtb3ZlIiwicmVtb3ZlQWxsIiwidG9TdHJpbmciLCJjaGVja2VkQWxsIiwiSlNPTiIsInN0cmluZ2lmeSIsImxhc3RVcGRhdGVTdGFtcCIsImdldEluZGV4Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsSUFBSUMsT0FBSixFQUF2QjtBQUNBLElBQU1DLGFBQWEsSUFBSUQsT0FBSixFQUFuQjtBQUNBLElBQU1FLFVBQVUsSUFBSUYsT0FBSixFQUFoQjtBQUNBLElBQU1HLFFBQVEsSUFBSUgsT0FBSixFQUFkO0FBQ0EsSUFBTUksYUFBYSxJQUFJSixPQUFKLEVBQW5COztBQUVBLFNBQVNLLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3RCSixVQUFRSyxHQUFSLENBQVlELElBQVosRUFBa0IsRUFBbEI7QUFDRDs7QUFFRCxTQUFTRSw0QkFBVCxDQUFzQ0YsSUFBdEMsRUFBNENHLElBQTVDLEVBQWtEO0FBQ2hELE1BQU1DLGVBQWVSLFFBQVFTLEdBQVIsQ0FBWUwsSUFBWixDQUFyQjtBQUNBLE1BQU1NLFNBQVMsRUFBZjtBQUNBQyxTQUFPQyxJQUFQLENBQVlKLFlBQVosRUFBMEJLLE9BQTFCLENBQWtDLFVBQUNDLFdBQUQsRUFBaUI7QUFDakQsUUFBSVAsU0FBU08sV0FBVCxJQUF3QkEsWUFBWUMsT0FBWixDQUFvQlIsSUFBcEIsTUFBOEIsQ0FBMUQsRUFBNkQ7QUFDM0RHLGFBQU9NLElBQVAsQ0FBWUYsV0FB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QytCLFFBNUhnQyxHQTRIckIsWUFBTTtBQUNmLFVBQU0vRSxPQUFPSixRQUFRUyxHQUFSLE9BQWI7QUFDQSxVQUFNc0QsU0FBUyxFQUFmO0FBQ0FwRCxhQUFPQyxJQUFQLENBQVlSLElBQVosRUFBa0JTLE9BQWxCLENBQTBCLFVBQUM4QyxHQUFELEVBQVM7QUFDakMsWUFBTWxDLE9BQU9yQixLQUFLdUQsR0FBTCxDQUFiO0FBQ0FJLGVBQU9KLEdBQVAsSUFBYztBQUNaeUIsc0JBQVkzRCxLQUFLdUIsWUFBTCxFQURBO0FBRVp4Qyx3QkFBY2lCLEtBQUtDLGVBQUw7QUFGRixTQUFkO0FBSUQsT0FORDtBQU9BLGFBQU8yRCxLQUFLQyxTQUFMLENBQWU7QUFDcEJuRSxZQUFJLE1BQUtnRCxLQUFMLEVBRGdCO0FBRXBCb0IseUJBQWlCLE1BQUtsQixrQkFBTCxFQUZHO0FBR3BCckUsaUJBQVMrRDtBQUhXLE9BQWYsRUFJSixJQUpJLEVBSUUsQ0FKRixDQUFQO0FBS0QsS0EzSStCOztBQUU5QmxFLG1CQUFlUSxHQUFmLFFBQXlCbUQsa0JBQXpCO0FBQ0F6RCxlQUFXTSxHQUFYLFFBQXFCbUQsbUJBQW1CckMsRUFBeEM7QUFDQWpCLGVBQVdHLEdBQVgsUUFBcUIsQ0FBckI7QUFDQUwsWUFBUUssR0FBUixRQUFrQixFQUFsQjtBQUNBSixVQUFNSSxHQUFOLFFBQWdCbUQsbUJBQW1CZ0MsUUFBbkIsRUFBaEI7QUFOOEI7QUFPL0I7Ozs7O2tCQXVJWWpDLG1CIiwiZmlsZSI6ImNoZWNrZWQtaXRlbS1oYXNoLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL2Jhc2UnO1xyXG5pbXBvcnQgQ2hlY2tlZEhhc2hJdGVtIGZyb20gJy4vY2hlY2tlZC1oYXNoLWl0ZW0nO1xyXG5pbXBvcnQgQ2hlY2tlZE91dHB1dCBmcm9tICcuL2NoZWNrZWQtb3V0cHV0JztcclxuXHJcbmNvbnN0IHNvdXJjZVByb3ZpZGVyID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgcHJvdmlkZXJJZCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IGNoZWNrZWQgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBpbmRleCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IGxhc3RVcGRhdGUgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuZnVuY3Rpb24gY2xlYXJBbGwobGlzdCkge1xyXG4gIGNoZWNrZWQuc2V0KGxpc3QsIHt9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRIYXNoZXNPZkNoZWNrZWRJdGVtcyhsaXN0LCBoYXNoKSB7XHJcbiAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZC5nZXQobGlzdCk7XHJcbiAgY29uc3QgaGFzaGVzID0gW107XHJcbiAgT2JqZWN0LmtleXMoY2hlY2tlZEl0ZW1zKS5mb3JFYWNoKChjdXJyZW50SGFzaCkgPT4ge1xyXG4gICAgaWYgKGhhc2ggIT09IGN1cnJlbnRIYXNoICYmIGN1cnJlbnRIYXNoLmluZGV4T2YoaGFzaCkgPT09IDApIHtcclxuICAgICAgaGFzaGVzLnB1c2goY3VycmVudEhhc2gpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gaGFzaGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVJdGVtKGxpc3QsIHBhcmVudElkcywgaWQpIHtcclxuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcclxuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XHJcbiAgY29uc3QgaW5kZXhJdGVtID0gZGF0YUluZGV4LmdldEZyb21JbmRleChwYXJlbnRJZHMsIGlkKTtcclxuXHJcbiAgaWYgKGluZGV4SXRlbSkge1xyXG4gICAgY29uc3QgeyBwYXJlbnRIYXNoIH0gPSBpbmRleEl0ZW07XHJcblxyXG4gICAgaWYgKGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXSkge1xyXG4gICAgICBjaGVja2VkSXRlbXNbcGFyZW50SGFzaF0ucmVtb3ZlQ2hlY2tlZEl0ZW0oaW5kZXhJdGVtLml0ZW0pO1xyXG4gICAgICAvLyBDaGVja3MgaWYgdGhlcmUgaXMgbm8gY2hlY2tlZCBpdGVtcywgdGhlbiByZW1vdmVzIGEgaGFzaFxyXG4gICAgICBpZiAoY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdLmdldENoZWNrZWRJdGVtcygpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGVja2VkSXRlbXNbcGFyZW50SGFzaF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUhhc2gobGlzdCwgaGFzaCkge1xyXG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xyXG4gIGlmIChjaGVja2VkSXRlbXNbaGFzaF0pIHtcclxuICAgIGNoZWNrZWRJdGVtc1toYXNoXS51bmNoZWNrQWxsKCk7XHJcbiAgICBkZWxldGUgY2hlY2tlZEl0ZW1zW2hhc2hdO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxsSXRlbXMobGlzdCwgcGFyZW50SWRzLCBpZCkge1xyXG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcclxuICBjb25zdCBpbmRleEl0ZW0gPSBkYXRhSW5kZXguZ2V0RnJvbUluZGV4KHBhcmVudElkcywgaWQpO1xyXG5cclxuICBpZiAoaW5kZXhJdGVtKSB7XHJcbiAgICBjb25zdCBoYXNoID0gZGF0YUluZGV4LmdldEhhc2goaW5kZXhJdGVtKTtcclxuICAgIHJlbW92ZUhhc2gobGlzdCwgaGFzaCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRJdGVtKGxpc3QsIHBhcmVudElkcywgaWQpIHtcclxuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcclxuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XHJcbiAgY29uc3QgaW5kZXhJdGVtID0gZGF0YUluZGV4LmdldEZyb21JbmRleChwYXJlbnRJZHMsIGlkKTtcclxuXHJcbiAgaWYgKGluZGV4SXRlbSkge1xyXG4gICAgY29uc3QgeyBwYXJlbnRIYXNoIH0gPSBpbmRleEl0ZW07XHJcbiAgICBjb25zdCBwYXJlbnRzID0gZGF0YUluZGV4LmdldFBhcmVudHMoaW5kZXhJdGVtKTtcclxuXHJcbiAgICBpZiAoIWNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXSkgY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdID0gbmV3IENoZWNrZWRIYXNoSXRlbShwYXJlbnRzKTtcclxuXHJcbiAgICBjb25zdCBoYXNoSXRlbSA9IGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXTtcclxuICAgIGhhc2hJdGVtLmFkZENoZWNrZWRJdGVtKGluZGV4SXRlbS5pdGVtKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEFsbEl0ZW1zKGxpc3QsIHBhcmVudElkcywgaWQpIHtcclxuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcclxuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XHJcbiAgY29uc3QgaW5kZXhJdGVtID0gZGF0YUluZGV4LmdldEZyb21JbmRleChwYXJlbnRJZHMsIGlkKTtcclxuICBpZiAoaW5kZXhJdGVtKSB7XHJcbiAgICBjb25zdCBoYXNoID0gZGF0YUluZGV4LmdldEhhc2goaW5kZXhJdGVtKTtcclxuICAgIGNvbnN0IHBhcmVudHMgPSBbLi4uZGF0YUluZGV4LmdldFBhcmVudHMoaW5kZXhJdGVtKSwgaW5kZXhJdGVtLml0ZW1dO1xyXG4gICAgY29uc3QgY2hpbGRIYXNoZXMgPSBnZXRDaGlsZEhhc2hlc09mQ2hlY2tlZEl0ZW1zKGxpc3QsIGhhc2gpIHx8IFtdO1xyXG5cclxuICAgIGNoaWxkSGFzaGVzLmZvckVhY2goKGgpID0+IHsgcmVtb3ZlSGFzaChsaXN0LCBoKTsgfSk7XHJcblxyXG4gICAgaWYgKCFjaGVja2VkSXRlbXNbaGFzaF0pIGNoZWNrZWRJdGVtc1toYXNoXSA9IG5ldyBDaGVja2VkSGFzaEl0ZW0ocGFyZW50cyk7XHJcblxyXG4gICAgY29uc3QgaGFzaEl0ZW0gPSBjaGVja2VkSXRlbXNbaGFzaF07XHJcbiAgICBoYXNoSXRlbS5jaGVja0FsbCgpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJlQ2hlY2tJdGVtcyhsaXN0LCBwcmVDaGVja2VkSXRlbXMpIHtcclxuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XHJcbiAgY29uc3QgZ2V0SGFzaCA9IChwYXJlbnRJZCwgaWQpID0+IChcclxuICAgIHBhcmVudElkID8gYCR7cGFyZW50SWR9XyR7aWR9YCA6IGAke2lkfWBcclxuICApO1xyXG4gIGNsZWFyQWxsKGxpc3QpO1xyXG5cclxuICBpZiAoZGF0YUluZGV4ICYmIHByZUNoZWNrZWRJdGVtcykge1xyXG4gICAgLy8gY3JlYXRpbmcgYSBoYXNoIGZvciBwcmUtY2hlY2tlZCBpdGVtcyB0byBpbmNyZWFzZSBzcGVlZCBvZiBzZWFyY2hpbmdcclxuICAgIGNvbnN0IGhhc2hPZlByZUNoZWNrZWQgPSBbXTtcclxuICAgIHByZUNoZWNrZWRJdGVtcy5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhzID0gZ2V0SGFzaChpLnBhcmVudElkLCBpLmlkKTtcclxuICAgICAgaGFzaE9mUHJlQ2hlY2tlZFtoc10gPSBpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0YUluZGV4LmZvckVhY2goKGl0ZW0sIHBhcmVudElkcykgPT4ge1xyXG4gICAgICBjb25zdCBocyA9IGdldEhhc2gocGFyZW50SWRzLmxlbmd0aCA+IDAgPyBwYXJlbnRJZHNbcGFyZW50SWRzLmxlbmd0aCAtIDFdIDogbnVsbCwgaXRlbS5pZCk7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaGFzaE9mUHJlQ2hlY2tlZFtoc107XHJcbiAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgIGlmIChmb3VuZC5pc0NoZWNrZWRBbGwgJiYgQXJyYXkuaXNBcnJheShpdGVtLmNoaWxkcmVuKSAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGFkZEFsbEl0ZW1zKGxpc3QsIHBhcmVudElkcywgaXRlbS5pZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFkZEl0ZW0obGlzdCwgcGFyZW50SWRzLCBpdGVtLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWZ0ZXJVcGRhdGUobGlzdCkge1xyXG4gIGxhc3RVcGRhdGUuc2V0KGxpc3QsIERhdGUubm93KCkpO1xyXG59XHJcblxyXG5jbGFzcyBDaGVja2VkSXRlbUhhc2hMaXN0IGV4dGVuZHMgQmFzZU1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhU291cmNlUHJvdmlkZXIpIHtcclxuICAgIHN1cGVyKGRhdGFTb3VyY2VQcm92aWRlcik7XHJcbiAgICBzb3VyY2VQcm92aWRlci5zZXQodGhpcywgZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuICAgIHByb3ZpZGVySWQuc2V0KHRoaXMsIGRhdGFTb3VyY2VQcm92aWRlci5pZCk7XHJcbiAgICBsYXN0VXBkYXRlLnNldCh0aGlzLCAwKTtcclxuICAgIGNoZWNrZWQuc2V0KHRoaXMsIHt9KTtcclxuICAgIGluZGV4LnNldCh0aGlzLCBkYXRhU291cmNlUHJvdmlkZXIuZ2V0SW5kZXgoKSk7XHJcbiAgfVxyXG5cclxuICBnZXQgPSAoKSA9PiBjaGVja2VkLmdldCh0aGlzKTtcclxuXHJcbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2hlY2tlZEhhc2hBcnJheSA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xyXG4gICAgbGV0IGxpc3QgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGNoZWNrZWRIYXNoQXJyYXkpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBsaXN0ID0gbGlzdC5jb25jYXQoY2hlY2tlZEhhc2hBcnJheVtrZXldLmdldENoZWNrZWRJdGVtcygpKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbiAgfVxyXG5cclxuICBnZXRDaGVja2VkSXRlbXMgPSAocGFyZW50SWRzID0gW10pID0+IHtcclxuICAgIGNvbnN0IGNoZWNrZWRIYXNoSXRlbSA9IHRoaXMuZ2V0SGFzaEl0ZW0ocGFyZW50SWRzKTtcclxuICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgIGlmIChjaGVja2VkSGFzaEl0ZW0pIHtcclxuICAgICAgcmVzdWx0ID0gY2hlY2tlZEhhc2hJdGVtLmdldENoZWNrZWRJdGVtcygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGdldElzQ2hlY2tlZEFsbCA9IChwYXJlbnRJZHMgPSBbXSkgPT4ge1xyXG4gICAgY29uc3QgY2hlY2tlZEhhc2hJdGVtID0gdGhpcy5nZXRIYXNoSXRlbShwYXJlbnRJZHMpO1xyXG4gICAgcmV0dXJuIGNoZWNrZWRIYXNoSXRlbSA/IGNoZWNrZWRIYXNoSXRlbS5pc0NoZWNrZWRBbGwoKSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2hlY2tlZEl0ZW1zQ291bnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjaGVja2VkSGFzaEFycmF5ID0gY2hlY2tlZC5nZXQodGhpcyk7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgT2JqZWN0LmtleXMoY2hlY2tlZEhhc2hBcnJheSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGNvdW50ICs9IGNoZWNrZWRIYXNoQXJyYXlba2V5XS5nZXRDaGVja2VkSXRlbXMoKS5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb3VudDtcclxuICB9XHJcblxyXG4gIGdldElkID0gKCkgPT4gcHJvdmlkZXJJZC5nZXQodGhpcyk7XHJcblxyXG4gIGdldEhhc2hJdGVtID0gKHBhcmVudElkcyA9IFtdKSA9PiB7XHJcbiAgICBjb25zdCBjaGVja2VkSGFzaEFycmF5ID0gY2hlY2tlZC5nZXQodGhpcyk7XHJcbiAgICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQodGhpcyk7XHJcbiAgICBjb25zdCBoYXNoID0gZGF0YUluZGV4LmdldEhhc2hGcm9tSWRzKHBhcmVudElkcyk7XHJcblxyXG4gICAgaWYgKGhhc2ggPT09ICcnIHx8ICFjaGVja2VkSGFzaEFycmF5W2hhc2hdKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoZWNrZWRIYXNoQXJyYXlbaGFzaF07XHJcbiAgfTtcclxuXHJcbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4gbGFzdFVwZGF0ZS5nZXQodGhpcyk7XHJcblxyXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHRPYmplY3QgPSB7XHJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcklkOiB0aGlzLmdldElkKCksXHJcbiAgICAgIGNoZWNrZWQ6IFtdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBuZXcgQ2hlY2tlZE91dHB1dCgpO1xyXG4gICAgY29uc3QgaGFzaGVzID0gY2hlY2tlZC5nZXQodGhpcyk7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoaGFzaGVzKS5mb3JFYWNoKChoYXNoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoZWNrZWRIYXNoSXRlbSA9IGhhc2hlc1toYXNoXTtcclxuICAgICAgY2hlY2tlZE91dHB1dC5hZGQoY2hlY2tlZEhhc2hJdGVtKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlc3VsdE9iamVjdC5jaGVja2VkID0gY2hlY2tlZE91dHB1dC5nZXQoKTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0T2JqZWN0O1xyXG4gIH1cclxuXHJcbiAgYWRkID0gKHBhcmVudElkcywgaWQpID0+IHtcclxuICAgIGFkZEl0ZW0odGhpcywgcGFyZW50SWRzLCBpZCk7XHJcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcclxuICB9XHJcblxyXG4gIGFkZEFsbCA9IChwYXJlbnRJZHMsIGlkKSA9PiB7XHJcbiAgICBhZGRBbGxJdGVtcyh0aGlzLCBwYXJlbnRJZHMsIGlkKTtcclxuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ29weSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvcHkgPSBuZXcgQ2hlY2tlZEl0ZW1IYXNoTGlzdChzb3VyY2VQcm92aWRlci5nZXQodGhpcykpO1xyXG5cclxuICAgIHByb3ZpZGVySWQuc2V0KGNvcHksIHByb3ZpZGVySWQuZ2V0KHRoaXMpKTtcclxuICAgIGxhc3RVcGRhdGUuc2V0KGNvcHksIGxhc3RVcGRhdGUuZ2V0KHRoaXMpKTtcclxuICAgIGluZGV4LnNldChjb3B5LCBpbmRleC5nZXQodGhpcykuY2xvbmUoKSk7XHJcblxyXG4gICAgY29uc3QgY2hrZCA9IE9iamVjdC5hc3NpZ24oe30sIGNoZWNrZWQuZ2V0KHRoaXMpKTtcclxuICAgIE9iamVjdC5rZXlzKGNoa2QpLmZvckVhY2goKGtleSkgPT4geyBjaGtkW2tleV0gPSBjaGtkW2tleV0uY3JlYXRlQ29weSgpOyB9KTtcclxuICAgIGNoZWNrZWQuc2V0KGNvcHksIGNoa2QpO1xyXG5cclxuICAgIHJldHVybiBjb3B5O1xyXG4gIH1cclxuXHJcbiAgY2xlYXJBbGwgPSAoKSA9PiB7XHJcbiAgICBjbGVhckFsbCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHByZUNoZWNrSXRlbXMgPSAocHJlQ2hlY2tlZEl0ZW1zKSA9PiB7XHJcbiAgICBwcmVDaGVja0l0ZW1zKHRoaXMsIHByZUNoZWNrZWRJdGVtcyk7XHJcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZSA9IChwYXJlbnRJZHMsIGlkKSA9PiB7XHJcbiAgICByZW1vdmVJdGVtKHRoaXMsIHBhcmVudElkcywgaWQpO1xyXG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVBbGwgPSAocGFyZW50SWRzLCBpZCkgPT4ge1xyXG4gICAgcmVtb3ZlQWxsSXRlbXModGhpcywgcGFyZW50SWRzLCBpZCk7XHJcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUhhc2ggPSAoaGFzaCkgPT4ge1xyXG4gICAgcmVtb3ZlSGFzaCh0aGlzLCBoYXNoKTtcclxuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsaXN0ID0gY2hlY2tlZC5nZXQodGhpcyk7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgIE9iamVjdC5rZXlzKGxpc3QpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtID0gbGlzdFtrZXldO1xyXG4gICAgICByZXN1bHRba2V5XSA9IHtcclxuICAgICAgICBjaGVja2VkQWxsOiBpdGVtLmlzQ2hlY2tlZEFsbCgpLFxyXG4gICAgICAgIGNoZWNrZWRJdGVtczogaXRlbS5nZXRDaGVja2VkSXRlbXMoKSxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgaWQ6IHRoaXMuZ2V0SWQoKSxcclxuICAgICAgbGFzdFVwZGF0ZVN0YW1wOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgICBjaGVja2VkOiByZXN1bHQsXHJcbiAgICB9LCBudWxsLCAyKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoZWNrZWRJdGVtSGFzaExpc3Q7XHJcbiJdfQ==