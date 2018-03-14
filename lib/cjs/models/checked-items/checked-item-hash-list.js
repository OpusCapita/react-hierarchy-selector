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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY2hlY2tlZC1pdGVtcy9jaGVja2VkLWl0ZW0taGFzaC1saXN0LmpzIl0sIm5hbWVzIjpbInNvdXJjZVByb3ZpZGVyIiwiV2Vha01hcCIsInByb3ZpZGVySWQiLCJjaGVja2VkIiwiaW5kZXgiLCJsYXN0VXBkYXRlIiwiY2xlYXJBbGwiLCJsaXN0Iiwic2V0IiwiZ2V0Q2hpbGRIYXNoZXNPZkNoZWNrZWRJdGVtcyIsImhhc2giLCJjaGVja2VkSXRlbXMiLCJnZXQiLCJoYXNoZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImN1cnJlbnRIYXNoIiwiaW5kZXhPZiIsInB1c2giLCJyZW1vdmVJdGVtIiwicGFyZW50SWRzIiwiaWQiLCJkYXRhSW5kZXgiLCJpbmRleEl0ZW0iLCJnZXRGcm9tSW5kZXgiLCJwYXJlbnRIYXNoIiwicmVtb3ZlQ2hlY2tlZEl0ZW0iLCJpdGVtIiwiZ2V0Q2hlY2tlZEl0ZW1zIiwibGVuZ3RoIiwicmVtb3ZlSGFzaCIsInVuY2hlY2tBbGwiLCJyZW1vdmVBbGxJdGVtcyIsImdldEhhc2giLCJhZGRJdGVtIiwicGFyZW50cyIsImdldFBhcmVudHMiLCJoYXNoSXRlbSIsImFkZENoZWNrZWRJdGVtIiwiYWRkQWxsSXRlbXMiLCJjaGlsZEhhc2hlcyIsImgiLCJjaGVja0FsbCIsInByZUNoZWNrSXRlbXMiLCJwcmVDaGVja2VkSXRlbXMiLCJwYXJlbnRJZCIsImhhc2hPZlByZUNoZWNrZWQiLCJpIiwiaHMiLCJmb3VuZCIsImlzQ2hlY2tlZEFsbCIsIkFycmF5IiwiaXNBcnJheSIsImNoaWxkcmVuIiwiYWZ0ZXJVcGRhdGUiLCJEYXRlIiwibm93IiwiQ2hlY2tlZEl0ZW1IYXNoTGlzdCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWRIYXNoQXJyYXkiLCJrZXkiLCJjb25jYXQiLCJjaGVja2VkSGFzaEl0ZW0iLCJnZXRIYXNoSXRlbSIsInJlc3VsdCIsImdldElzQ2hlY2tlZEFsbCIsImdldENoZWNrZWRJdGVtc0NvdW50IiwiY291bnQiLCJnZXRJZCIsImdldEhhc2hGcm9tSWRzIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwiZ2V0Q2hlY2tlZE91dHB1dCIsInJlc3VsdE9iamVjdCIsImRhdGFTb3VyY2VQcm92aWRlcklkIiwiY2hlY2tlZE91dHB1dCIsImFkZCIsImFkZEFsbCIsImNyZWF0ZUNvcHkiLCJjb3B5IiwiY2xvbmUiLCJjaGtkIiwiYXNzaWduIiwicmVtb3ZlIiwicmVtb3ZlQWxsIiwidG9TdHJpbmciLCJjaGVja2VkQWxsIiwiSlNPTiIsInN0cmluZ2lmeSIsImxhc3RVcGRhdGVTdGFtcCIsImdldEluZGV4Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsSUFBSUMsT0FBSixFQUF2QjtBQUNBLElBQU1DLGFBQWEsSUFBSUQsT0FBSixFQUFuQjtBQUNBLElBQU1FLFVBQVUsSUFBSUYsT0FBSixFQUFoQjtBQUNBLElBQU1HLFFBQVEsSUFBSUgsT0FBSixFQUFkO0FBQ0EsSUFBTUksYUFBYSxJQUFJSixPQUFKLEVBQW5COztBQUVBLFNBQVNLLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3RCSixVQUFRSyxHQUFSLENBQVlELElBQVosRUFBa0IsRUFBbEI7QUFDRDs7QUFFRCxTQUFTRSw0QkFBVCxDQUFzQ0YsSUFBdEMsRUFBNENHLElBQTVDLEVBQWtEO0FBQ2hELE1BQU1DLGVBQWVSLFFBQVFTLEdBQVIsQ0FBWUwsSUFBWixDQUFyQjtBQUNBLE1BQU1NLFNBQVMsRUFBZjtBQUNBQyxTQUFPQyxJQUFQLENBQVlKLFlBQVosRUFBMEJLLE9BQTFCLENBQWtDLFVBQUNDLFdBQUQsRUFBaUI7QUFDakQsUUFBSVAsU0FBU08sV0FBVCxJQUF3QkEsWUFBWUMsT0FBWixDQUFvQlIsSUFBcEIsTUFBOEIsQ0FBMUQsRUFBNkQ7QUFDM0RHLGFBQU9NLElBQVAsQ0FBWUYsV0FB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QytCLFFBNUhnQyxHQTRIckIsWUFBTTtBQUNmLFVBQU0vRSxPQUFPSixRQUFRUyxHQUFSLE9BQWI7QUFDQSxVQUFNc0QsU0FBUyxFQUFmO0FBQ0FwRCxhQUFPQyxJQUFQLENBQVlSLElBQVosRUFBa0JTLE9BQWxCLENBQTBCLFVBQUM4QyxHQUFELEVBQVM7QUFDakMsWUFBTWxDLE9BQU9yQixLQUFLdUQsR0FBTCxDQUFiO0FBQ0FJLGVBQU9KLEdBQVAsSUFBYztBQUNaeUIsc0JBQVkzRCxLQUFLdUIsWUFBTCxFQURBO0FBRVp4Qyx3QkFBY2lCLEtBQUtDLGVBQUw7QUFGRixTQUFkO0FBSUQsT0FORDtBQU9BLGFBQU8yRCxLQUFLQyxTQUFMLENBQWU7QUFDcEJuRSxZQUFJLE1BQUtnRCxLQUFMLEVBRGdCO0FBRXBCb0IseUJBQWlCLE1BQUtsQixrQkFBTCxFQUZHO0FBR3BCckUsaUJBQVMrRDtBQUhXLE9BQWYsRUFJSixJQUpJLEVBSUUsQ0FKRixDQUFQO0FBS0QsS0EzSStCOztBQUU5QmxFLG1CQUFlUSxHQUFmLFFBQXlCbUQsa0JBQXpCO0FBQ0F6RCxlQUFXTSxHQUFYLFFBQXFCbUQsbUJBQW1CckMsRUFBeEM7QUFDQWpCLGVBQVdHLEdBQVgsUUFBcUIsQ0FBckI7QUFDQUwsWUFBUUssR0FBUixRQUFrQixFQUFsQjtBQUNBSixVQUFNSSxHQUFOLFFBQWdCbUQsbUJBQW1CZ0MsUUFBbkIsRUFBaEI7QUFOOEI7QUFPL0I7Ozs7O2tCQXVJWWpDLG1CIiwiZmlsZSI6ImNoZWNrZWQtaXRlbS1oYXNoLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IENoZWNrZWRIYXNoSXRlbSBmcm9tICcuL2NoZWNrZWQtaGFzaC1pdGVtJztcbmltcG9ydCBDaGVja2VkT3V0cHV0IGZyb20gJy4vY2hlY2tlZC1vdXRwdXQnO1xuXG5jb25zdCBzb3VyY2VQcm92aWRlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBwcm92aWRlcklkID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGNoZWNrZWQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgaW5kZXggPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgbGFzdFVwZGF0ZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmZ1bmN0aW9uIGNsZWFyQWxsKGxpc3QpIHtcbiAgY2hlY2tlZC5zZXQobGlzdCwge30pO1xufVxuXG5mdW5jdGlvbiBnZXRDaGlsZEhhc2hlc09mQ2hlY2tlZEl0ZW1zKGxpc3QsIGhhc2gpIHtcbiAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZC5nZXQobGlzdCk7XG4gIGNvbnN0IGhhc2hlcyA9IFtdO1xuICBPYmplY3Qua2V5cyhjaGVja2VkSXRlbXMpLmZvckVhY2goKGN1cnJlbnRIYXNoKSA9PiB7XG4gICAgaWYgKGhhc2ggIT09IGN1cnJlbnRIYXNoICYmIGN1cnJlbnRIYXNoLmluZGV4T2YoaGFzaCkgPT09IDApIHtcbiAgICAgIGhhc2hlcy5wdXNoKGN1cnJlbnRIYXNoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoZXM7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0obGlzdCwgcGFyZW50SWRzLCBpZCkge1xuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcbiAgY29uc3QgZGF0YUluZGV4ID0gaW5kZXguZ2V0KGxpc3QpO1xuICBjb25zdCBpbmRleEl0ZW0gPSBkYXRhSW5kZXguZ2V0RnJvbUluZGV4KHBhcmVudElkcywgaWQpO1xuXG4gIGlmIChpbmRleEl0ZW0pIHtcbiAgICBjb25zdCB7IHBhcmVudEhhc2ggfSA9IGluZGV4SXRlbTtcblxuICAgIGlmIChjaGVja2VkSXRlbXNbcGFyZW50SGFzaF0pIHtcbiAgICAgIGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXS5yZW1vdmVDaGVja2VkSXRlbShpbmRleEl0ZW0uaXRlbSk7XG4gICAgICAvLyBDaGVja3MgaWYgdGhlcmUgaXMgbm8gY2hlY2tlZCBpdGVtcywgdGhlbiByZW1vdmVzIGEgaGFzaFxuICAgICAgaWYgKGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXS5nZXRDaGVja2VkSXRlbXMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlSGFzaChsaXN0LCBoYXNoKSB7XG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xuICBpZiAoY2hlY2tlZEl0ZW1zW2hhc2hdKSB7XG4gICAgY2hlY2tlZEl0ZW1zW2hhc2hdLnVuY2hlY2tBbGwoKTtcbiAgICBkZWxldGUgY2hlY2tlZEl0ZW1zW2hhc2hdO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFsbEl0ZW1zKGxpc3QsIHBhcmVudElkcywgaWQpIHtcbiAgY29uc3QgZGF0YUluZGV4ID0gaW5kZXguZ2V0KGxpc3QpO1xuICBjb25zdCBpbmRleEl0ZW0gPSBkYXRhSW5kZXguZ2V0RnJvbUluZGV4KHBhcmVudElkcywgaWQpO1xuXG4gIGlmIChpbmRleEl0ZW0pIHtcbiAgICBjb25zdCBoYXNoID0gZGF0YUluZGV4LmdldEhhc2goaW5kZXhJdGVtKTtcbiAgICByZW1vdmVIYXNoKGxpc3QsIGhhc2gpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEl0ZW0obGlzdCwgcGFyZW50SWRzLCBpZCkge1xuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcbiAgY29uc3QgZGF0YUluZGV4ID0gaW5kZXguZ2V0KGxpc3QpO1xuICBjb25zdCBpbmRleEl0ZW0gPSBkYXRhSW5kZXguZ2V0RnJvbUluZGV4KHBhcmVudElkcywgaWQpO1xuXG4gIGlmIChpbmRleEl0ZW0pIHtcbiAgICBjb25zdCB7IHBhcmVudEhhc2ggfSA9IGluZGV4SXRlbTtcbiAgICBjb25zdCBwYXJlbnRzID0gZGF0YUluZGV4LmdldFBhcmVudHMoaW5kZXhJdGVtKTtcblxuICAgIGlmICghY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdKSBjaGVja2VkSXRlbXNbcGFyZW50SGFzaF0gPSBuZXcgQ2hlY2tlZEhhc2hJdGVtKHBhcmVudHMpO1xuXG4gICAgY29uc3QgaGFzaEl0ZW0gPSBjaGVja2VkSXRlbXNbcGFyZW50SGFzaF07XG4gICAgaGFzaEl0ZW0uYWRkQ2hlY2tlZEl0ZW0oaW5kZXhJdGVtLml0ZW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEFsbEl0ZW1zKGxpc3QsIHBhcmVudElkcywgaWQpIHtcbiAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZC5nZXQobGlzdCk7XG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcbiAgY29uc3QgaW5kZXhJdGVtID0gZGF0YUluZGV4LmdldEZyb21JbmRleChwYXJlbnRJZHMsIGlkKTtcbiAgaWYgKGluZGV4SXRlbSkge1xuICAgIGNvbnN0IGhhc2ggPSBkYXRhSW5kZXguZ2V0SGFzaChpbmRleEl0ZW0pO1xuICAgIGNvbnN0IHBhcmVudHMgPSBbLi4uZGF0YUluZGV4LmdldFBhcmVudHMoaW5kZXhJdGVtKSwgaW5kZXhJdGVtLml0ZW1dO1xuICAgIGNvbnN0IGNoaWxkSGFzaGVzID0gZ2V0Q2hpbGRIYXNoZXNPZkNoZWNrZWRJdGVtcyhsaXN0LCBoYXNoKSB8fCBbXTtcblxuICAgIGNoaWxkSGFzaGVzLmZvckVhY2goKGgpID0+IHsgcmVtb3ZlSGFzaChsaXN0LCBoKTsgfSk7XG5cbiAgICBpZiAoIWNoZWNrZWRJdGVtc1toYXNoXSkgY2hlY2tlZEl0ZW1zW2hhc2hdID0gbmV3IENoZWNrZWRIYXNoSXRlbShwYXJlbnRzKTtcblxuICAgIGNvbnN0IGhhc2hJdGVtID0gY2hlY2tlZEl0ZW1zW2hhc2hdO1xuICAgIGhhc2hJdGVtLmNoZWNrQWxsKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJlQ2hlY2tJdGVtcyhsaXN0LCBwcmVDaGVja2VkSXRlbXMpIHtcbiAgY29uc3QgZGF0YUluZGV4ID0gaW5kZXguZ2V0KGxpc3QpO1xuICBjb25zdCBnZXRIYXNoID0gKHBhcmVudElkLCBpZCkgPT4gKFxuICAgIHBhcmVudElkID8gYCR7cGFyZW50SWR9XyR7aWR9YCA6IGAke2lkfWBcbiAgKTtcbiAgY2xlYXJBbGwobGlzdCk7XG5cbiAgaWYgKGRhdGFJbmRleCAmJiBwcmVDaGVja2VkSXRlbXMpIHtcbiAgICAvLyBjcmVhdGluZyBhIGhhc2ggZm9yIHByZS1jaGVja2VkIGl0ZW1zIHRvIGluY3JlYXNlIHNwZWVkIG9mIHNlYXJjaGluZ1xuICAgIGNvbnN0IGhhc2hPZlByZUNoZWNrZWQgPSBbXTtcbiAgICBwcmVDaGVja2VkSXRlbXMuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgY29uc3QgaHMgPSBnZXRIYXNoKGkucGFyZW50SWQsIGkuaWQpO1xuICAgICAgaGFzaE9mUHJlQ2hlY2tlZFtoc10gPSBpO1xuICAgIH0pO1xuXG4gICAgZGF0YUluZGV4LmZvckVhY2goKGl0ZW0sIHBhcmVudElkcykgPT4ge1xuICAgICAgY29uc3QgaHMgPSBnZXRIYXNoKHBhcmVudElkcy5sZW5ndGggPiAwID8gcGFyZW50SWRzW3BhcmVudElkcy5sZW5ndGggLSAxXSA6IG51bGwsIGl0ZW0uaWQpO1xuICAgICAgY29uc3QgZm91bmQgPSBoYXNoT2ZQcmVDaGVja2VkW2hzXTtcbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICBpZiAoZm91bmQuaXNDaGVja2VkQWxsICYmIEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYWRkQWxsSXRlbXMobGlzdCwgcGFyZW50SWRzLCBpdGVtLmlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRJdGVtKGxpc3QsIHBhcmVudElkcywgaXRlbS5pZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZnRlclVwZGF0ZShsaXN0KSB7XG4gIGxhc3RVcGRhdGUuc2V0KGxpc3QsIERhdGUubm93KCkpO1xufVxuXG5jbGFzcyBDaGVja2VkSXRlbUhhc2hMaXN0IGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgY29uc3RydWN0b3IoZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gICAgc3VwZXIoZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgICBzb3VyY2VQcm92aWRlci5zZXQodGhpcywgZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgICBwcm92aWRlcklkLnNldCh0aGlzLCBkYXRhU291cmNlUHJvdmlkZXIuaWQpO1xuICAgIGxhc3RVcGRhdGUuc2V0KHRoaXMsIDApO1xuICAgIGNoZWNrZWQuc2V0KHRoaXMsIHt9KTtcbiAgICBpbmRleC5zZXQodGhpcywgZGF0YVNvdXJjZVByb3ZpZGVyLmdldEluZGV4KCkpO1xuICB9XG5cbiAgZ2V0ID0gKCkgPT4gY2hlY2tlZC5nZXQodGhpcyk7XG5cbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRIYXNoQXJyYXkgPSBjaGVja2VkLmdldCh0aGlzKTtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGNoZWNrZWRIYXNoQXJyYXkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgbGlzdCA9IGxpc3QuY29uY2F0KGNoZWNrZWRIYXNoQXJyYXlba2V5XS5nZXRDaGVja2VkSXRlbXMoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBnZXRDaGVja2VkSXRlbXMgPSAocGFyZW50SWRzID0gW10pID0+IHtcbiAgICBjb25zdCBjaGVja2VkSGFzaEl0ZW0gPSB0aGlzLmdldEhhc2hJdGVtKHBhcmVudElkcyk7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGlmIChjaGVja2VkSGFzaEl0ZW0pIHtcbiAgICAgIHJlc3VsdCA9IGNoZWNrZWRIYXNoSXRlbS5nZXRDaGVja2VkSXRlbXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldElzQ2hlY2tlZEFsbCA9IChwYXJlbnRJZHMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRIYXNoSXRlbSA9IHRoaXMuZ2V0SGFzaEl0ZW0ocGFyZW50SWRzKTtcbiAgICByZXR1cm4gY2hlY2tlZEhhc2hJdGVtID8gY2hlY2tlZEhhc2hJdGVtLmlzQ2hlY2tlZEFsbCgpIDogZmFsc2U7XG4gIH1cblxuICBnZXRDaGVja2VkSXRlbXNDb3VudCA9ICgpID0+IHtcbiAgICBjb25zdCBjaGVja2VkSGFzaEFycmF5ID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBPYmplY3Qua2V5cyhjaGVja2VkSGFzaEFycmF5KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvdW50ICs9IGNoZWNrZWRIYXNoQXJyYXlba2V5XS5nZXRDaGVja2VkSXRlbXMoKS5sZW5ndGg7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgZ2V0SWQgPSAoKSA9PiBwcm92aWRlcklkLmdldCh0aGlzKTtcblxuICBnZXRIYXNoSXRlbSA9IChwYXJlbnRJZHMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRIYXNoQXJyYXkgPSBjaGVja2VkLmdldCh0aGlzKTtcbiAgICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQodGhpcyk7XG4gICAgY29uc3QgaGFzaCA9IGRhdGFJbmRleC5nZXRIYXNoRnJvbUlkcyhwYXJlbnRJZHMpO1xuXG4gICAgaWYgKGhhc2ggPT09ICcnIHx8ICFjaGVja2VkSGFzaEFycmF5W2hhc2hdKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNoZWNrZWRIYXNoQXJyYXlbaGFzaF07XG4gIH07XG5cbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4gbGFzdFVwZGF0ZS5nZXQodGhpcyk7XG5cbiAgZ2V0Q2hlY2tlZE91dHB1dCA9ICgpID0+IHtcbiAgICBjb25zdCByZXN1bHRPYmplY3QgPSB7XG4gICAgICBkYXRhU291cmNlUHJvdmlkZXJJZDogdGhpcy5nZXRJZCgpLFxuICAgICAgY2hlY2tlZDogW10sXG4gICAgfTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gbmV3IENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCBoYXNoZXMgPSBjaGVja2VkLmdldCh0aGlzKTtcblxuICAgIE9iamVjdC5rZXlzKGhhc2hlcykuZm9yRWFjaCgoaGFzaCkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tlZEhhc2hJdGVtID0gaGFzaGVzW2hhc2hdO1xuICAgICAgY2hlY2tlZE91dHB1dC5hZGQoY2hlY2tlZEhhc2hJdGVtKTtcbiAgICB9KTtcblxuICAgIHJlc3VsdE9iamVjdC5jaGVja2VkID0gY2hlY2tlZE91dHB1dC5nZXQoKTtcblxuICAgIHJldHVybiByZXN1bHRPYmplY3Q7XG4gIH1cblxuICBhZGQgPSAocGFyZW50SWRzLCBpZCkgPT4ge1xuICAgIGFkZEl0ZW0odGhpcywgcGFyZW50SWRzLCBpZCk7XG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XG4gIH1cblxuICBhZGRBbGwgPSAocGFyZW50SWRzLCBpZCkgPT4ge1xuICAgIGFkZEFsbEl0ZW1zKHRoaXMsIHBhcmVudElkcywgaWQpO1xuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgY3JlYXRlQ29weSA9ICgpID0+IHtcbiAgICBjb25zdCBjb3B5ID0gbmV3IENoZWNrZWRJdGVtSGFzaExpc3Qoc291cmNlUHJvdmlkZXIuZ2V0KHRoaXMpKTtcblxuICAgIHByb3ZpZGVySWQuc2V0KGNvcHksIHByb3ZpZGVySWQuZ2V0KHRoaXMpKTtcbiAgICBsYXN0VXBkYXRlLnNldChjb3B5LCBsYXN0VXBkYXRlLmdldCh0aGlzKSk7XG4gICAgaW5kZXguc2V0KGNvcHksIGluZGV4LmdldCh0aGlzKS5jbG9uZSgpKTtcblxuICAgIGNvbnN0IGNoa2QgPSBPYmplY3QuYXNzaWduKHt9LCBjaGVja2VkLmdldCh0aGlzKSk7XG4gICAgT2JqZWN0LmtleXMoY2hrZCkuZm9yRWFjaCgoa2V5KSA9PiB7IGNoa2Rba2V5XSA9IGNoa2Rba2V5XS5jcmVhdGVDb3B5KCk7IH0pO1xuICAgIGNoZWNrZWQuc2V0KGNvcHksIGNoa2QpO1xuXG4gICAgcmV0dXJuIGNvcHk7XG4gIH1cblxuICBjbGVhckFsbCA9ICgpID0+IHtcbiAgICBjbGVhckFsbCh0aGlzKTtcbiAgfVxuXG4gIHByZUNoZWNrSXRlbXMgPSAocHJlQ2hlY2tlZEl0ZW1zKSA9PiB7XG4gICAgcHJlQ2hlY2tJdGVtcyh0aGlzLCBwcmVDaGVja2VkSXRlbXMpO1xuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgcmVtb3ZlID0gKHBhcmVudElkcywgaWQpID0+IHtcbiAgICByZW1vdmVJdGVtKHRoaXMsIHBhcmVudElkcywgaWQpO1xuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgcmVtb3ZlQWxsID0gKHBhcmVudElkcywgaWQpID0+IHtcbiAgICByZW1vdmVBbGxJdGVtcyh0aGlzLCBwYXJlbnRJZHMsIGlkKTtcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIHJlbW92ZUhhc2ggPSAoaGFzaCkgPT4ge1xuICAgIHJlbW92ZUhhc2godGhpcywgaGFzaCk7XG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XG4gIH1cblxuICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmtleXMobGlzdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gbGlzdFtrZXldO1xuICAgICAgcmVzdWx0W2tleV0gPSB7XG4gICAgICAgIGNoZWNrZWRBbGw6IGl0ZW0uaXNDaGVja2VkQWxsKCksXG4gICAgICAgIGNoZWNrZWRJdGVtczogaXRlbS5nZXRDaGVja2VkSXRlbXMoKSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGlkOiB0aGlzLmdldElkKCksXG4gICAgICBsYXN0VXBkYXRlU3RhbXA6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICBjaGVja2VkOiByZXN1bHQsXG4gICAgfSwgbnVsbCwgMik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tlZEl0ZW1IYXNoTGlzdDtcbiJdfQ==