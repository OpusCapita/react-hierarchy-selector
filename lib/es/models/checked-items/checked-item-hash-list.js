function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import BaseModel from '../base';
import CheckedHashItem from './checked-hash-item';
import CheckedOutput from './checked-output';

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

    if (!checkedItems[parentHash]) checkedItems[parentHash] = new CheckedHashItem(parents);

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

    if (!checkedItems[hash]) checkedItems[hash] = new CheckedHashItem(parents);

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
      var checkedOutput = new CheckedOutput();
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
}(BaseModel);

export default CheckedItemHashList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY2hlY2tlZC1pdGVtcy9jaGVja2VkLWl0ZW0taGFzaC1saXN0LmpzIl0sIm5hbWVzIjpbIkJhc2VNb2RlbCIsIkNoZWNrZWRIYXNoSXRlbSIsIkNoZWNrZWRPdXRwdXQiLCJzb3VyY2VQcm92aWRlciIsIldlYWtNYXAiLCJwcm92aWRlcklkIiwiY2hlY2tlZCIsImluZGV4IiwibGFzdFVwZGF0ZSIsImNsZWFyQWxsIiwibGlzdCIsInNldCIsImdldENoaWxkSGFzaGVzT2ZDaGVja2VkSXRlbXMiLCJoYXNoIiwiY2hlY2tlZEl0ZW1zIiwiZ2V0IiwiaGFzaGVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJjdXJyZW50SGFzaCIsImluZGV4T2YiLCJwdXNoIiwicmVtb3ZlSXRlbSIsInBhcmVudElkcyIsImlkIiwiZGF0YUluZGV4IiwiaW5kZXhJdGVtIiwiZ2V0RnJvbUluZGV4IiwicGFyZW50SGFzaCIsInJlbW92ZUNoZWNrZWRJdGVtIiwiaXRlbSIsImdldENoZWNrZWRJdGVtcyIsImxlbmd0aCIsInJlbW92ZUhhc2giLCJ1bmNoZWNrQWxsIiwicmVtb3ZlQWxsSXRlbXMiLCJnZXRIYXNoIiwiYWRkSXRlbSIsInBhcmVudHMiLCJnZXRQYXJlbnRzIiwiaGFzaEl0ZW0iLCJhZGRDaGVja2VkSXRlbSIsImFkZEFsbEl0ZW1zIiwiY2hpbGRIYXNoZXMiLCJoIiwiY2hlY2tBbGwiLCJwcmVDaGVja0l0ZW1zIiwicHJlQ2hlY2tlZEl0ZW1zIiwicGFyZW50SWQiLCJoYXNoT2ZQcmVDaGVja2VkIiwiaSIsImhzIiwiZm91bmQiLCJpc0NoZWNrZWRBbGwiLCJBcnJheSIsImlzQXJyYXkiLCJjaGlsZHJlbiIsImFmdGVyVXBkYXRlIiwiRGF0ZSIsIm5vdyIsIkNoZWNrZWRJdGVtSGFzaExpc3QiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJnZXRBbGxDaGVja2VkSXRlbXMiLCJjaGVja2VkSGFzaEFycmF5Iiwia2V5IiwiY29uY2F0IiwiY2hlY2tlZEhhc2hJdGVtIiwiZ2V0SGFzaEl0ZW0iLCJyZXN1bHQiLCJnZXRJc0NoZWNrZWRBbGwiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImNvdW50IiwiZ2V0SWQiLCJnZXRIYXNoRnJvbUlkcyIsImdldExhc3RVcGRhdGVTdGFtcCIsImdldENoZWNrZWRPdXRwdXQiLCJyZXN1bHRPYmplY3QiLCJkYXRhU291cmNlUHJvdmlkZXJJZCIsImNoZWNrZWRPdXRwdXQiLCJhZGQiLCJhZGRBbGwiLCJjcmVhdGVDb3B5IiwiY29weSIsImNsb25lIiwiY2hrZCIsImFzc2lnbiIsInJlbW92ZSIsInJlbW92ZUFsbCIsInRvU3RyaW5nIiwiY2hlY2tlZEFsbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXN0VXBkYXRlU3RhbXAiLCJnZXRJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsU0FBUCxNQUFzQixTQUF0QjtBQUNBLE9BQU9DLGVBQVAsTUFBNEIscUJBQTVCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixrQkFBMUI7O0FBRUEsSUFBTUMsaUJBQWlCLElBQUlDLE9BQUosRUFBdkI7QUFDQSxJQUFNQyxhQUFhLElBQUlELE9BQUosRUFBbkI7QUFDQSxJQUFNRSxVQUFVLElBQUlGLE9BQUosRUFBaEI7QUFDQSxJQUFNRyxRQUFRLElBQUlILE9BQUosRUFBZDtBQUNBLElBQU1JLGFBQWEsSUFBSUosT0FBSixFQUFuQjs7QUFFQSxTQUFTSyxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUN0QkosVUFBUUssR0FBUixDQUFZRCxJQUFaLEVBQWtCLEVBQWxCO0FBQ0Q7O0FBRUQsU0FBU0UsNEJBQVQsQ0FBc0NGLElBQXRDLEVBQTRDRyxJQUE1QyxFQUFrRDtBQUNoRCxNQUFNQyxlQUFlUixRQUFRUyxHQUFSLENBQVlMLElBQVosQ0FBckI7QUFDQSxNQUFNTSxTQUFTLEVBQWY7QUFDQUMsU0FBT0MsSUFBUCxDQUFZSixZQUFaLEVBQTBCSyxPQUExQixDQUFrQyxVQUFDQyxXQUFELEVB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QXJCLEVBQWdDQyxFQUFoQztBQUNBaUM7QUFDRCxLQXJIK0I7O0FBQUEsVUF1SGhDeEIsVUF2SGdDLEdBdUhuQixVQUFDckIsSUFBRCxFQUFVO0FBQ3JCcUIsd0JBQWlCckIsSUFBakI7QUFDQTZDO0FBQ0QsS0ExSCtCOztBQUFBLFVBNEhoQytCLFFBNUhnQyxHQTRIckIsWUFBTTtBQUNmLFVBQU0vRSxPQUFPSixRQUFRUyxHQUFSLE9BQWI7QUFDQSxVQUFNc0QsU0FBUyxFQUFmO0FBQ0FwRCxhQUFPQyxJQUFQLENBQVlSLElBQVosRUFBa0JTLE9BQWxCLENBQTBCLFVBQUM4QyxHQUFELEVBQVM7QUFDakMsWUFBTWxDLE9BQU9yQixLQUFLdUQsR0FBTCxDQUFiO0FBQ0FJLGVBQU9KLEdBQVAsSUFBYztBQUNaeUIsc0JBQVkzRCxLQUFLdUIsWUFBTCxFQURBO0FBRVp4Qyx3QkFBY2lCLEtBQUtDLGVBQUw7QUFGRixTQUFkO0FBSUQsT0FORDtBQU9BLGFBQU8yRCxLQUFLQyxTQUFMLENBQWU7QUFDcEJuRSxZQUFJLE1BQUtnRCxLQUFMLEVBRGdCO0FBRXBCb0IseUJBQWlCLE1BQUtsQixrQkFBTCxFQUZHO0FBR3BCckUsaUJBQVMrRDtBQUhXLE9BQWYsRUFJSixJQUpJLEVBSUUsQ0FKRixDQUFQO0FBS0QsS0EzSStCOztBQUU5QmxFLG1CQUFlUSxHQUFmLFFBQXlCbUQsa0JBQXpCO0FBQ0F6RCxlQUFXTSxHQUFYLFFBQXFCbUQsbUJBQW1CckMsRUFBeEM7QUFDQWpCLGVBQVdHLEdBQVgsUUFBcUIsQ0FBckI7QUFDQUwsWUFBUUssR0FBUixRQUFrQixFQUFsQjtBQUNBSixVQUFNSSxHQUFOLFFBQWdCbUQsbUJBQW1CZ0MsUUFBbkIsRUFBaEI7QUFOOEI7QUFPL0I7OztFQVIrQjlGLFM7O0FBK0lsQyxlQUFlNkQsbUJBQWYiLCJmaWxlIjoiY2hlY2tlZC1pdGVtLWhhc2gtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vYmFzZSc7XHJcbmltcG9ydCBDaGVja2VkSGFzaEl0ZW0gZnJvbSAnLi9jaGVja2VkLWhhc2gtaXRlbSc7XHJcbmltcG9ydCBDaGVja2VkT3V0cHV0IGZyb20gJy4vY2hlY2tlZC1vdXRwdXQnO1xyXG5cclxuY29uc3Qgc291cmNlUHJvdmlkZXIgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBwcm92aWRlcklkID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgY2hlY2tlZCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IGluZGV4ID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgbGFzdFVwZGF0ZSA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG5mdW5jdGlvbiBjbGVhckFsbChsaXN0KSB7XHJcbiAgY2hlY2tlZC5zZXQobGlzdCwge30pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDaGlsZEhhc2hlc09mQ2hlY2tlZEl0ZW1zKGxpc3QsIGhhc2gpIHtcclxuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcclxuICBjb25zdCBoYXNoZXMgPSBbXTtcclxuICBPYmplY3Qua2V5cyhjaGVja2VkSXRlbXMpLmZvckVhY2goKGN1cnJlbnRIYXNoKSA9PiB7XHJcbiAgICBpZiAoaGFzaCAhPT0gY3VycmVudEhhc2ggJiYgY3VycmVudEhhc2guaW5kZXhPZihoYXNoKSA9PT0gMCkge1xyXG4gICAgICBoYXNoZXMucHVzaChjdXJyZW50SGFzaCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBoYXNoZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW0obGlzdCwgcGFyZW50SWRzLCBpZCkge1xyXG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xyXG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcclxuICBjb25zdCBpbmRleEl0ZW0gPSBkYXRhSW5kZXguZ2V0RnJvbUluZGV4KHBhcmVudElkcywgaWQpO1xyXG5cclxuICBpZiAoaW5kZXhJdGVtKSB7XHJcbiAgICBjb25zdCB7IHBhcmVudEhhc2ggfSA9IGluZGV4SXRlbTtcclxuXHJcbiAgICBpZiAoY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdKSB7XHJcbiAgICAgIGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXS5yZW1vdmVDaGVja2VkSXRlbShpbmRleEl0ZW0uaXRlbSk7XHJcbiAgICAgIC8vIENoZWNrcyBpZiB0aGVyZSBpcyBubyBjaGVja2VkIGl0ZW1zLCB0aGVuIHJlbW92ZXMgYSBoYXNoXHJcbiAgICAgIGlmIChjaGVja2VkSXRlbXNbcGFyZW50SGFzaF0uZ2V0Q2hlY2tlZEl0ZW1zKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlSGFzaChsaXN0LCBoYXNoKSB7XHJcbiAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZC5nZXQobGlzdCk7XHJcbiAgaWYgKGNoZWNrZWRJdGVtc1toYXNoXSkge1xyXG4gICAgY2hlY2tlZEl0ZW1zW2hhc2hdLnVuY2hlY2tBbGwoKTtcclxuICAgIGRlbGV0ZSBjaGVja2VkSXRlbXNbaGFzaF07XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVBbGxJdGVtcyhsaXN0LCBwYXJlbnRJZHMsIGlkKSB7XHJcbiAgY29uc3QgZGF0YUluZGV4ID0gaW5kZXguZ2V0KGxpc3QpO1xyXG4gIGNvbnN0IGluZGV4SXRlbSA9IGRhdGFJbmRleC5nZXRGcm9tSW5kZXgocGFyZW50SWRzLCBpZCk7XHJcblxyXG4gIGlmIChpbmRleEl0ZW0pIHtcclxuICAgIGNvbnN0IGhhc2ggPSBkYXRhSW5kZXguZ2V0SGFzaChpbmRleEl0ZW0pO1xyXG4gICAgcmVtb3ZlSGFzaChsaXN0LCBoYXNoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEl0ZW0obGlzdCwgcGFyZW50SWRzLCBpZCkge1xyXG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xyXG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcclxuICBjb25zdCBpbmRleEl0ZW0gPSBkYXRhSW5kZXguZ2V0RnJvbUluZGV4KHBhcmVudElkcywgaWQpO1xyXG5cclxuICBpZiAoaW5kZXhJdGVtKSB7XHJcbiAgICBjb25zdCB7IHBhcmVudEhhc2ggfSA9IGluZGV4SXRlbTtcclxuICAgIGNvbnN0IHBhcmVudHMgPSBkYXRhSW5kZXguZ2V0UGFyZW50cyhpbmRleEl0ZW0pO1xyXG5cclxuICAgIGlmICghY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdKSBjaGVja2VkSXRlbXNbcGFyZW50SGFzaF0gPSBuZXcgQ2hlY2tlZEhhc2hJdGVtKHBhcmVudHMpO1xyXG5cclxuICAgIGNvbnN0IGhhc2hJdGVtID0gY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdO1xyXG4gICAgaGFzaEl0ZW0uYWRkQ2hlY2tlZEl0ZW0oaW5kZXhJdGVtLml0ZW0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkQWxsSXRlbXMobGlzdCwgcGFyZW50SWRzLCBpZCkge1xyXG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xyXG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcclxuICBjb25zdCBpbmRleEl0ZW0gPSBkYXRhSW5kZXguZ2V0RnJvbUluZGV4KHBhcmVudElkcywgaWQpO1xyXG4gIGlmIChpbmRleEl0ZW0pIHtcclxuICAgIGNvbnN0IGhhc2ggPSBkYXRhSW5kZXguZ2V0SGFzaChpbmRleEl0ZW0pO1xyXG4gICAgY29uc3QgcGFyZW50cyA9IFsuLi5kYXRhSW5kZXguZ2V0UGFyZW50cyhpbmRleEl0ZW0pLCBpbmRleEl0ZW0uaXRlbV07XHJcbiAgICBjb25zdCBjaGlsZEhhc2hlcyA9IGdldENoaWxkSGFzaGVzT2ZDaGVja2VkSXRlbXMobGlzdCwgaGFzaCkgfHwgW107XHJcblxyXG4gICAgY2hpbGRIYXNoZXMuZm9yRWFjaCgoaCkgPT4geyByZW1vdmVIYXNoKGxpc3QsIGgpOyB9KTtcclxuXHJcbiAgICBpZiAoIWNoZWNrZWRJdGVtc1toYXNoXSkgY2hlY2tlZEl0ZW1zW2hhc2hdID0gbmV3IENoZWNrZWRIYXNoSXRlbShwYXJlbnRzKTtcclxuXHJcbiAgICBjb25zdCBoYXNoSXRlbSA9IGNoZWNrZWRJdGVtc1toYXNoXTtcclxuICAgIGhhc2hJdGVtLmNoZWNrQWxsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVDaGVja0l0ZW1zKGxpc3QsIHByZUNoZWNrZWRJdGVtcykge1xyXG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcclxuICBjb25zdCBnZXRIYXNoID0gKHBhcmVudElkLCBpZCkgPT4gKFxyXG4gICAgcGFyZW50SWQgPyBgJHtwYXJlbnRJZH1fJHtpZH1gIDogYCR7aWR9YFxyXG4gICk7XHJcbiAgY2xlYXJBbGwobGlzdCk7XHJcblxyXG4gIGlmIChkYXRhSW5kZXggJiYgcHJlQ2hlY2tlZEl0ZW1zKSB7XHJcbiAgICAvLyBjcmVhdGluZyBhIGhhc2ggZm9yIHByZS1jaGVja2VkIGl0ZW1zIHRvIGluY3JlYXNlIHNwZWVkIG9mIHNlYXJjaGluZ1xyXG4gICAgY29uc3QgaGFzaE9mUHJlQ2hlY2tlZCA9IFtdO1xyXG4gICAgcHJlQ2hlY2tlZEl0ZW1zLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgY29uc3QgaHMgPSBnZXRIYXNoKGkucGFyZW50SWQsIGkuaWQpO1xyXG4gICAgICBoYXNoT2ZQcmVDaGVja2VkW2hzXSA9IGk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRhSW5kZXguZm9yRWFjaCgoaXRlbSwgcGFyZW50SWRzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhzID0gZ2V0SGFzaChwYXJlbnRJZHMubGVuZ3RoID4gMCA/IHBhcmVudElkc1twYXJlbnRJZHMubGVuZ3RoIC0gMV0gOiBudWxsLCBpdGVtLmlkKTtcclxuICAgICAgY29uc3QgZm91bmQgPSBoYXNoT2ZQcmVDaGVja2VkW2hzXTtcclxuICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgaWYgKGZvdW5kLmlzQ2hlY2tlZEFsbCAmJiBBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgYWRkQWxsSXRlbXMobGlzdCwgcGFyZW50SWRzLCBpdGVtLmlkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWRkSXRlbShsaXN0LCBwYXJlbnRJZHMsIGl0ZW0uaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZnRlclVwZGF0ZShsaXN0KSB7XHJcbiAgbGFzdFVwZGF0ZS5zZXQobGlzdCwgRGF0ZS5ub3coKSk7XHJcbn1cclxuXHJcbmNsYXNzIENoZWNrZWRJdGVtSGFzaExpc3QgZXh0ZW5kcyBCYXNlTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGFTb3VyY2VQcm92aWRlcikge1xyXG4gICAgc3VwZXIoZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuICAgIHNvdXJjZVByb3ZpZGVyLnNldCh0aGlzLCBkYXRhU291cmNlUHJvdmlkZXIpO1xyXG4gICAgcHJvdmlkZXJJZC5zZXQodGhpcywgZGF0YVNvdXJjZVByb3ZpZGVyLmlkKTtcclxuICAgIGxhc3RVcGRhdGUuc2V0KHRoaXMsIDApO1xyXG4gICAgY2hlY2tlZC5zZXQodGhpcywge30pO1xyXG4gICAgaW5kZXguc2V0KHRoaXMsIGRhdGFTb3VyY2VQcm92aWRlci5nZXRJbmRleCgpKTtcclxuICB9XHJcblxyXG4gIGdldCA9ICgpID0+IGNoZWNrZWQuZ2V0KHRoaXMpO1xyXG5cclxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjaGVja2VkSGFzaEFycmF5ID0gY2hlY2tlZC5nZXQodGhpcyk7XHJcbiAgICBsZXQgbGlzdCA9IFtdO1xyXG4gICAgT2JqZWN0LmtleXMoY2hlY2tlZEhhc2hBcnJheSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGxpc3QgPSBsaXN0LmNvbmNhdChjaGVja2VkSGFzaEFycmF5W2tleV0uZ2V0Q2hlY2tlZEl0ZW1zKCkpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9XHJcblxyXG4gIGdldENoZWNrZWRJdGVtcyA9IChwYXJlbnRJZHMgPSBbXSkgPT4ge1xyXG4gICAgY29uc3QgY2hlY2tlZEhhc2hJdGVtID0gdGhpcy5nZXRIYXNoSXRlbShwYXJlbnRJZHMpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgaWYgKGNoZWNrZWRIYXNoSXRlbSkge1xyXG4gICAgICByZXN1bHQgPSBjaGVja2VkSGFzaEl0ZW0uZ2V0Q2hlY2tlZEl0ZW1zKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgZ2V0SXNDaGVja2VkQWxsID0gKHBhcmVudElkcyA9IFtdKSA9PiB7XHJcbiAgICBjb25zdCBjaGVja2VkSGFzaEl0ZW0gPSB0aGlzLmdldEhhc2hJdGVtKHBhcmVudElkcyk7XHJcbiAgICByZXR1cm4gY2hlY2tlZEhhc2hJdGVtID8gY2hlY2tlZEhhc2hJdGVtLmlzQ2hlY2tlZEFsbCgpIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXRDaGVja2VkSXRlbXNDb3VudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNoZWNrZWRIYXNoQXJyYXkgPSBjaGVja2VkLmdldCh0aGlzKTtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBPYmplY3Qua2V5cyhjaGVja2VkSGFzaEFycmF5KS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgY291bnQgKz0gY2hlY2tlZEhhc2hBcnJheVtrZXldLmdldENoZWNrZWRJdGVtcygpLmxlbmd0aDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvdW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQgPSAoKSA9PiBwcm92aWRlcklkLmdldCh0aGlzKTtcclxuXHJcbiAgZ2V0SGFzaEl0ZW0gPSAocGFyZW50SWRzID0gW10pID0+IHtcclxuICAgIGNvbnN0IGNoZWNrZWRIYXNoQXJyYXkgPSBjaGVja2VkLmdldCh0aGlzKTtcclxuICAgIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldCh0aGlzKTtcclxuICAgIGNvbnN0IGhhc2ggPSBkYXRhSW5kZXguZ2V0SGFzaEZyb21JZHMocGFyZW50SWRzKTtcclxuXHJcbiAgICBpZiAoaGFzaCA9PT0gJycgfHwgIWNoZWNrZWRIYXNoQXJyYXlbaGFzaF0pIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hlY2tlZEhhc2hBcnJheVtoYXNoXTtcclxuICB9O1xyXG5cclxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiBsYXN0VXBkYXRlLmdldCh0aGlzKTtcclxuXHJcbiAgZ2V0Q2hlY2tlZE91dHB1dCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdE9iamVjdCA9IHtcclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVySWQ6IHRoaXMuZ2V0SWQoKSxcclxuICAgICAgY2hlY2tlZDogW10sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IG5ldyBDaGVja2VkT3V0cHV0KCk7XHJcbiAgICBjb25zdCBoYXNoZXMgPSBjaGVja2VkLmdldCh0aGlzKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhoYXNoZXMpLmZvckVhY2goKGhhc2gpID0+IHtcclxuICAgICAgY29uc3QgY2hlY2tlZEhhc2hJdGVtID0gaGFzaGVzW2hhc2hdO1xyXG4gICAgICBjaGVja2VkT3V0cHV0LmFkZChjaGVja2VkSGFzaEl0ZW0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmVzdWx0T2JqZWN0LmNoZWNrZWQgPSBjaGVja2VkT3V0cHV0LmdldCgpO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRPYmplY3Q7XHJcbiAgfVxyXG5cclxuICBhZGQgPSAocGFyZW50SWRzLCBpZCkgPT4ge1xyXG4gICAgYWRkSXRlbSh0aGlzLCBwYXJlbnRJZHMsIGlkKTtcclxuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgYWRkQWxsID0gKHBhcmVudElkcywgaWQpID0+IHtcclxuICAgIGFkZEFsbEl0ZW1zKHRoaXMsIHBhcmVudElkcywgaWQpO1xyXG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDb3B5ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29weSA9IG5ldyBDaGVja2VkSXRlbUhhc2hMaXN0KHNvdXJjZVByb3ZpZGVyLmdldCh0aGlzKSk7XHJcblxyXG4gICAgcHJvdmlkZXJJZC5zZXQoY29weSwgcHJvdmlkZXJJZC5nZXQodGhpcykpO1xyXG4gICAgbGFzdFVwZGF0ZS5zZXQoY29weSwgbGFzdFVwZGF0ZS5nZXQodGhpcykpO1xyXG4gICAgaW5kZXguc2V0KGNvcHksIGluZGV4LmdldCh0aGlzKS5jbG9uZSgpKTtcclxuXHJcbiAgICBjb25zdCBjaGtkID0gT2JqZWN0LmFzc2lnbih7fSwgY2hlY2tlZC5nZXQodGhpcykpO1xyXG4gICAgT2JqZWN0LmtleXMoY2hrZCkuZm9yRWFjaCgoa2V5KSA9PiB7IGNoa2Rba2V5XSA9IGNoa2Rba2V5XS5jcmVhdGVDb3B5KCk7IH0pO1xyXG4gICAgY2hlY2tlZC5zZXQoY29weSwgY2hrZCk7XHJcblxyXG4gICAgcmV0dXJuIGNvcHk7XHJcbiAgfVxyXG5cclxuICBjbGVhckFsbCA9ICgpID0+IHtcclxuICAgIGNsZWFyQWxsKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHJlQ2hlY2tJdGVtcyA9IChwcmVDaGVja2VkSXRlbXMpID0+IHtcclxuICAgIHByZUNoZWNrSXRlbXModGhpcywgcHJlQ2hlY2tlZEl0ZW1zKTtcclxuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlID0gKHBhcmVudElkcywgaWQpID0+IHtcclxuICAgIHJlbW92ZUl0ZW0odGhpcywgcGFyZW50SWRzLCBpZCk7XHJcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUFsbCA9IChwYXJlbnRJZHMsIGlkKSA9PiB7XHJcbiAgICByZW1vdmVBbGxJdGVtcyh0aGlzLCBwYXJlbnRJZHMsIGlkKTtcclxuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlSGFzaCA9IChoYXNoKSA9PiB7XHJcbiAgICByZW1vdmVIYXNoKHRoaXMsIGhhc2gpO1xyXG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGxpc3QgPSBjaGVja2VkLmdldCh0aGlzKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gICAgT2JqZWN0LmtleXMobGlzdCkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0W2tleV07XHJcbiAgICAgIHJlc3VsdFtrZXldID0ge1xyXG4gICAgICAgIGNoZWNrZWRBbGw6IGl0ZW0uaXNDaGVja2VkQWxsKCksXHJcbiAgICAgICAgY2hlY2tlZEl0ZW1zOiBpdGVtLmdldENoZWNrZWRJdGVtcygpLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICBpZDogdGhpcy5nZXRJZCgpLFxyXG4gICAgICBsYXN0VXBkYXRlU3RhbXA6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICAgIGNoZWNrZWQ6IHJlc3VsdCxcclxuICAgIH0sIG51bGwsIDIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tlZEl0ZW1IYXNoTGlzdDtcclxuIl19