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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY2hlY2tlZC1pdGVtcy9jaGVja2VkLWl0ZW0taGFzaC1saXN0LmpzIl0sIm5hbWVzIjpbIkJhc2VNb2RlbCIsIkNoZWNrZWRIYXNoSXRlbSIsIkNoZWNrZWRPdXRwdXQiLCJzb3VyY2VQcm92aWRlciIsIldlYWtNYXAiLCJwcm92aWRlcklkIiwiY2hlY2tlZCIsImluZGV4IiwibGFzdFVwZGF0ZSIsImNsZWFyQWxsIiwibGlzdCIsInNldCIsImdldENoaWxkSGFzaGVzT2ZDaGVja2VkSXRlbXMiLCJoYXNoIiwiY2hlY2tlZEl0ZW1zIiwiZ2V0IiwiaGFzaGVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJjdXJyZW50SGFzaCIsImluZGV4T2YiLCJwdXNoIiwicmVtb3ZlSXRlbSIsInBhcmVudElkcyIsImlkIiwiZGF0YUluZGV4IiwiaW5kZXhJdGVtIiwiZ2V0RnJvbUluZGV4IiwicGFyZW50SGFzaCIsInJlbW92ZUNoZWNrZWRJdGVtIiwiaXRlbSIsImdldENoZWNrZWRJdGVtcyIsImxlbmd0aCIsInJlbW92ZUhhc2giLCJ1bmNoZWNrQWxsIiwicmVtb3ZlQWxsSXRlbXMiLCJnZXRIYXNoIiwiYWRkSXRlbSIsInBhcmVudHMiLCJnZXRQYXJlbnRzIiwiaGFzaEl0ZW0iLCJhZGRDaGVja2VkSXRlbSIsImFkZEFsbEl0ZW1zIiwiY2hpbGRIYXNoZXMiLCJoIiwiY2hlY2tBbGwiLCJwcmVDaGVja0l0ZW1zIiwicHJlQ2hlY2tlZEl0ZW1zIiwicGFyZW50SWQiLCJoYXNoT2ZQcmVDaGVja2VkIiwiaSIsImhzIiwiZm91bmQiLCJpc0NoZWNrZWRBbGwiLCJBcnJheSIsImlzQXJyYXkiLCJjaGlsZHJlbiIsImFmdGVyVXBkYXRlIiwiRGF0ZSIsIm5vdyIsIkNoZWNrZWRJdGVtSGFzaExpc3QiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJnZXRBbGxDaGVja2VkSXRlbXMiLCJjaGVja2VkSGFzaEFycmF5Iiwia2V5IiwiY29uY2F0IiwiY2hlY2tlZEhhc2hJdGVtIiwiZ2V0SGFzaEl0ZW0iLCJyZXN1bHQiLCJnZXRJc0NoZWNrZWRBbGwiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImNvdW50IiwiZ2V0SWQiLCJnZXRIYXNoRnJvbUlkcyIsImdldExhc3RVcGRhdGVTdGFtcCIsImdldENoZWNrZWRPdXRwdXQiLCJyZXN1bHRPYmplY3QiLCJkYXRhU291cmNlUHJvdmlkZXJJZCIsImNoZWNrZWRPdXRwdXQiLCJhZGQiLCJhZGRBbGwiLCJjcmVhdGVDb3B5IiwiY29weSIsImNsb25lIiwiY2hrZCIsImFzc2lnbiIsInJlbW92ZSIsInJlbW92ZUFsbCIsInRvU3RyaW5nIiwiY2hlY2tlZEFsbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXN0VXBkYXRlU3RhbXAiLCJnZXRJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsU0FBUCxNQUFzQixTQUF0QjtBQUNBLE9BQU9DLGVBQVAsTUFBNEIscUJBQTVCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixrQkFBMUI7O0FBRUEsSUFBTUMsaUJBQWlCLElBQUlDLE9BQUosRUFBdkI7QUFDQSxJQUFNQyxhQUFhLElBQUlELE9BQUosRUFBbkI7QUFDQSxJQUFNRSxVQUFVLElBQUlGLE9BQUosRUFBaEI7QUFDQSxJQUFNRyxRQUFRLElBQUlILE9BQUosRUFBZDtBQUNBLElBQU1JLGFBQWEsSUFBSUosT0FBSixFQUFuQjs7QUFFQSxTQUFTSyxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUN0QkosVUFBUUssR0FBUixDQUFZRCxJQUFaLEVBQWtCLEVBQWxCO0FBQ0Q7O0FBRUQsU0FBU0UsNEJBQVQsQ0FBc0NGLElBQXRDLEVBQTRDRyxJQUE1QyxFQUFrRDtBQUNoRCxNQUFNQyxlQUFlUixRQUFRUyxHQUFSLENBQVlMLElBQVosQ0FBckI7QUFDQSxNQUFNTSxTQUFTLEVBQWY7QUFDQUMsU0FBT0MsSUFBUCxDQUFZSixZQUFaLEVBQTBCSyxPQUExQixDQUFrQyxVQUFDQyxXQUFELEVB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QXJCLEVBQWdDQyxFQUFoQztBQUNBaUM7QUFDRCxLQXJIK0I7O0FBQUEsVUF1SGhDeEIsVUF2SGdDLEdBdUhuQixVQUFDckIsSUFBRCxFQUFVO0FBQ3JCcUIsd0JBQWlCckIsSUFBakI7QUFDQTZDO0FBQ0QsS0ExSCtCOztBQUFBLFVBNEhoQytCLFFBNUhnQyxHQTRIckIsWUFBTTtBQUNmLFVBQU0vRSxPQUFPSixRQUFRUyxHQUFSLE9BQWI7QUFDQSxVQUFNc0QsU0FBUyxFQUFmO0FBQ0FwRCxhQUFPQyxJQUFQLENBQVlSLElBQVosRUFBa0JTLE9BQWxCLENBQTBCLFVBQUM4QyxHQUFELEVBQVM7QUFDakMsWUFBTWxDLE9BQU9yQixLQUFLdUQsR0FBTCxDQUFiO0FBQ0FJLGVBQU9KLEdBQVAsSUFBYztBQUNaeUIsc0JBQVkzRCxLQUFLdUIsWUFBTCxFQURBO0FBRVp4Qyx3QkFBY2lCLEtBQUtDLGVBQUw7QUFGRixTQUFkO0FBSUQsT0FORDtBQU9BLGFBQU8yRCxLQUFLQyxTQUFMLENBQWU7QUFDcEJuRSxZQUFJLE1BQUtnRCxLQUFMLEVBRGdCO0FBRXBCb0IseUJBQWlCLE1BQUtsQixrQkFBTCxFQUZHO0FBR3BCckUsaUJBQVMrRDtBQUhXLE9BQWYsRUFJSixJQUpJLEVBSUUsQ0FKRixDQUFQO0FBS0QsS0EzSStCOztBQUU5QmxFLG1CQUFlUSxHQUFmLFFBQXlCbUQsa0JBQXpCO0FBQ0F6RCxlQUFXTSxHQUFYLFFBQXFCbUQsbUJBQW1CckMsRUFBeEM7QUFDQWpCLGVBQVdHLEdBQVgsUUFBcUIsQ0FBckI7QUFDQUwsWUFBUUssR0FBUixRQUFrQixFQUFsQjtBQUNBSixVQUFNSSxHQUFOLFFBQWdCbUQsbUJBQW1CZ0MsUUFBbkIsRUFBaEI7QUFOOEI7QUFPL0I7OztFQVIrQjlGLFM7O0FBK0lsQyxlQUFlNkQsbUJBQWYiLCJmaWxlIjoiY2hlY2tlZC1pdGVtLWhhc2gtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgQ2hlY2tlZEhhc2hJdGVtIGZyb20gJy4vY2hlY2tlZC1oYXNoLWl0ZW0nO1xuaW1wb3J0IENoZWNrZWRPdXRwdXQgZnJvbSAnLi9jaGVja2VkLW91dHB1dCc7XG5cbmNvbnN0IHNvdXJjZVByb3ZpZGVyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHByb3ZpZGVySWQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgY2hlY2tlZCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBpbmRleCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBsYXN0VXBkYXRlID0gbmV3IFdlYWtNYXAoKTtcblxuZnVuY3Rpb24gY2xlYXJBbGwobGlzdCkge1xuICBjaGVja2VkLnNldChsaXN0LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGdldENoaWxkSGFzaGVzT2ZDaGVja2VkSXRlbXMobGlzdCwgaGFzaCkge1xuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcbiAgY29uc3QgaGFzaGVzID0gW107XG4gIE9iamVjdC5rZXlzKGNoZWNrZWRJdGVtcykuZm9yRWFjaCgoY3VycmVudEhhc2gpID0+IHtcbiAgICBpZiAoaGFzaCAhPT0gY3VycmVudEhhc2ggJiYgY3VycmVudEhhc2guaW5kZXhPZihoYXNoKSA9PT0gMCkge1xuICAgICAgaGFzaGVzLnB1c2goY3VycmVudEhhc2gpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2hlcztcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSXRlbShsaXN0LCBwYXJlbnRJZHMsIGlkKSB7XG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XG4gIGNvbnN0IGluZGV4SXRlbSA9IGRhdGFJbmRleC5nZXRGcm9tSW5kZXgocGFyZW50SWRzLCBpZCk7XG5cbiAgaWYgKGluZGV4SXRlbSkge1xuICAgIGNvbnN0IHsgcGFyZW50SGFzaCB9ID0gaW5kZXhJdGVtO1xuXG4gICAgaWYgKGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXSkge1xuICAgICAgY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdLnJlbW92ZUNoZWNrZWRJdGVtKGluZGV4SXRlbS5pdGVtKTtcbiAgICAgIC8vIENoZWNrcyBpZiB0aGVyZSBpcyBubyBjaGVja2VkIGl0ZW1zLCB0aGVuIHJlbW92ZXMgYSBoYXNoXG4gICAgICBpZiAoY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdLmdldENoZWNrZWRJdGVtcygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVIYXNoKGxpc3QsIGhhc2gpIHtcbiAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZC5nZXQobGlzdCk7XG4gIGlmIChjaGVja2VkSXRlbXNbaGFzaF0pIHtcbiAgICBjaGVja2VkSXRlbXNbaGFzaF0udW5jaGVja0FsbCgpO1xuICAgIGRlbGV0ZSBjaGVja2VkSXRlbXNbaGFzaF07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWxsSXRlbXMobGlzdCwgcGFyZW50SWRzLCBpZCkge1xuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XG4gIGNvbnN0IGluZGV4SXRlbSA9IGRhdGFJbmRleC5nZXRGcm9tSW5kZXgocGFyZW50SWRzLCBpZCk7XG5cbiAgaWYgKGluZGV4SXRlbSkge1xuICAgIGNvbnN0IGhhc2ggPSBkYXRhSW5kZXguZ2V0SGFzaChpbmRleEl0ZW0pO1xuICAgIHJlbW92ZUhhc2gobGlzdCwgaGFzaCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkSXRlbShsaXN0LCBwYXJlbnRJZHMsIGlkKSB7XG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XG4gIGNvbnN0IGluZGV4SXRlbSA9IGRhdGFJbmRleC5nZXRGcm9tSW5kZXgocGFyZW50SWRzLCBpZCk7XG5cbiAgaWYgKGluZGV4SXRlbSkge1xuICAgIGNvbnN0IHsgcGFyZW50SGFzaCB9ID0gaW5kZXhJdGVtO1xuICAgIGNvbnN0IHBhcmVudHMgPSBkYXRhSW5kZXguZ2V0UGFyZW50cyhpbmRleEl0ZW0pO1xuXG4gICAgaWYgKCFjaGVja2VkSXRlbXNbcGFyZW50SGFzaF0pIGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXSA9IG5ldyBDaGVja2VkSGFzaEl0ZW0ocGFyZW50cyk7XG5cbiAgICBjb25zdCBoYXNoSXRlbSA9IGNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXTtcbiAgICBoYXNoSXRlbS5hZGRDaGVja2VkSXRlbShpbmRleEl0ZW0uaXRlbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkQWxsSXRlbXMobGlzdCwgcGFyZW50SWRzLCBpZCkge1xuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcbiAgY29uc3QgZGF0YUluZGV4ID0gaW5kZXguZ2V0KGxpc3QpO1xuICBjb25zdCBpbmRleEl0ZW0gPSBkYXRhSW5kZXguZ2V0RnJvbUluZGV4KHBhcmVudElkcywgaWQpO1xuICBpZiAoaW5kZXhJdGVtKSB7XG4gICAgY29uc3QgaGFzaCA9IGRhdGFJbmRleC5nZXRIYXNoKGluZGV4SXRlbSk7XG4gICAgY29uc3QgcGFyZW50cyA9IFsuLi5kYXRhSW5kZXguZ2V0UGFyZW50cyhpbmRleEl0ZW0pLCBpbmRleEl0ZW0uaXRlbV07XG4gICAgY29uc3QgY2hpbGRIYXNoZXMgPSBnZXRDaGlsZEhhc2hlc09mQ2hlY2tlZEl0ZW1zKGxpc3QsIGhhc2gpIHx8IFtdO1xuXG4gICAgY2hpbGRIYXNoZXMuZm9yRWFjaCgoaCkgPT4geyByZW1vdmVIYXNoKGxpc3QsIGgpOyB9KTtcblxuICAgIGlmICghY2hlY2tlZEl0ZW1zW2hhc2hdKSBjaGVja2VkSXRlbXNbaGFzaF0gPSBuZXcgQ2hlY2tlZEhhc2hJdGVtKHBhcmVudHMpO1xuXG4gICAgY29uc3QgaGFzaEl0ZW0gPSBjaGVja2VkSXRlbXNbaGFzaF07XG4gICAgaGFzaEl0ZW0uY2hlY2tBbGwoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVDaGVja0l0ZW1zKGxpc3QsIHByZUNoZWNrZWRJdGVtcykge1xuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XG4gIGNvbnN0IGdldEhhc2ggPSAocGFyZW50SWQsIGlkKSA9PiAoXG4gICAgcGFyZW50SWQgPyBgJHtwYXJlbnRJZH1fJHtpZH1gIDogYCR7aWR9YFxuICApO1xuICBjbGVhckFsbChsaXN0KTtcblxuICBpZiAoZGF0YUluZGV4ICYmIHByZUNoZWNrZWRJdGVtcykge1xuICAgIC8vIGNyZWF0aW5nIGEgaGFzaCBmb3IgcHJlLWNoZWNrZWQgaXRlbXMgdG8gaW5jcmVhc2Ugc3BlZWQgb2Ygc2VhcmNoaW5nXG4gICAgY29uc3QgaGFzaE9mUHJlQ2hlY2tlZCA9IFtdO1xuICAgIHByZUNoZWNrZWRJdGVtcy5mb3JFYWNoKChpKSA9PiB7XG4gICAgICBjb25zdCBocyA9IGdldEhhc2goaS5wYXJlbnRJZCwgaS5pZCk7XG4gICAgICBoYXNoT2ZQcmVDaGVja2VkW2hzXSA9IGk7XG4gICAgfSk7XG5cbiAgICBkYXRhSW5kZXguZm9yRWFjaCgoaXRlbSwgcGFyZW50SWRzKSA9PiB7XG4gICAgICBjb25zdCBocyA9IGdldEhhc2gocGFyZW50SWRzLmxlbmd0aCA+IDAgPyBwYXJlbnRJZHNbcGFyZW50SWRzLmxlbmd0aCAtIDFdIDogbnVsbCwgaXRlbS5pZCk7XG4gICAgICBjb25zdCBmb3VuZCA9IGhhc2hPZlByZUNoZWNrZWRbaHNdO1xuICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgIGlmIChmb3VuZC5pc0NoZWNrZWRBbGwgJiYgQXJyYXkuaXNBcnJheShpdGVtLmNoaWxkcmVuKSAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBhZGRBbGxJdGVtcyhsaXN0LCBwYXJlbnRJZHMsIGl0ZW0uaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFkZEl0ZW0obGlzdCwgcGFyZW50SWRzLCBpdGVtLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFmdGVyVXBkYXRlKGxpc3QpIHtcbiAgbGFzdFVwZGF0ZS5zZXQobGlzdCwgRGF0ZS5ub3coKSk7XG59XG5cbmNsYXNzIENoZWNrZWRJdGVtSGFzaExpc3QgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICBjb25zdHJ1Y3RvcihkYXRhU291cmNlUHJvdmlkZXIpIHtcbiAgICBzdXBlcihkYXRhU291cmNlUHJvdmlkZXIpO1xuICAgIHNvdXJjZVByb3ZpZGVyLnNldCh0aGlzLCBkYXRhU291cmNlUHJvdmlkZXIpO1xuICAgIHByb3ZpZGVySWQuc2V0KHRoaXMsIGRhdGFTb3VyY2VQcm92aWRlci5pZCk7XG4gICAgbGFzdFVwZGF0ZS5zZXQodGhpcywgMCk7XG4gICAgY2hlY2tlZC5zZXQodGhpcywge30pO1xuICAgIGluZGV4LnNldCh0aGlzLCBkYXRhU291cmNlUHJvdmlkZXIuZ2V0SW5kZXgoKSk7XG4gIH1cblxuICBnZXQgPSAoKSA9PiBjaGVja2VkLmdldCh0aGlzKTtcblxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEhhc2hBcnJheSA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgT2JqZWN0LmtleXMoY2hlY2tlZEhhc2hBcnJheSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBsaXN0ID0gbGlzdC5jb25jYXQoY2hlY2tlZEhhc2hBcnJheVtrZXldLmdldENoZWNrZWRJdGVtcygpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIGdldENoZWNrZWRJdGVtcyA9IChwYXJlbnRJZHMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRIYXNoSXRlbSA9IHRoaXMuZ2V0SGFzaEl0ZW0ocGFyZW50SWRzKTtcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgaWYgKGNoZWNrZWRIYXNoSXRlbSkge1xuICAgICAgcmVzdWx0ID0gY2hlY2tlZEhhc2hJdGVtLmdldENoZWNrZWRJdGVtcygpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0SXNDaGVja2VkQWxsID0gKHBhcmVudElkcyA9IFtdKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEhhc2hJdGVtID0gdGhpcy5nZXRIYXNoSXRlbShwYXJlbnRJZHMpO1xuICAgIHJldHVybiBjaGVja2VkSGFzaEl0ZW0gPyBjaGVja2VkSGFzaEl0ZW0uaXNDaGVja2VkQWxsKCkgOiBmYWxzZTtcbiAgfVxuXG4gIGdldENoZWNrZWRJdGVtc0NvdW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRIYXNoQXJyYXkgPSBjaGVja2VkLmdldCh0aGlzKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIE9iamVjdC5rZXlzKGNoZWNrZWRIYXNoQXJyYXkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY291bnQgKz0gY2hlY2tlZEhhc2hBcnJheVtrZXldLmdldENoZWNrZWRJdGVtcygpLmxlbmd0aDtcbiAgICB9KTtcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBnZXRJZCA9ICgpID0+IHByb3ZpZGVySWQuZ2V0KHRoaXMpO1xuXG4gIGdldEhhc2hJdGVtID0gKHBhcmVudElkcyA9IFtdKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEhhc2hBcnJheSA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xuICAgIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldCh0aGlzKTtcbiAgICBjb25zdCBoYXNoID0gZGF0YUluZGV4LmdldEhhc2hGcm9tSWRzKHBhcmVudElkcyk7XG5cbiAgICBpZiAoaGFzaCA9PT0gJycgfHwgIWNoZWNrZWRIYXNoQXJyYXlbaGFzaF0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY2hlY2tlZEhhc2hBcnJheVtoYXNoXTtcbiAgfTtcblxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiBsYXN0VXBkYXRlLmdldCh0aGlzKTtcblxuICBnZXRDaGVja2VkT3V0cHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdE9iamVjdCA9IHtcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcklkOiB0aGlzLmdldElkKCksXG4gICAgICBjaGVja2VkOiBbXSxcbiAgICB9O1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBuZXcgQ2hlY2tlZE91dHB1dCgpO1xuICAgIGNvbnN0IGhhc2hlcyA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xuXG4gICAgT2JqZWN0LmtleXMoaGFzaGVzKS5mb3JFYWNoKChoYXNoKSA9PiB7XG4gICAgICBjb25zdCBjaGVja2VkSGFzaEl0ZW0gPSBoYXNoZXNbaGFzaF07XG4gICAgICBjaGVja2VkT3V0cHV0LmFkZChjaGVja2VkSGFzaEl0ZW0pO1xuICAgIH0pO1xuXG4gICAgcmVzdWx0T2JqZWN0LmNoZWNrZWQgPSBjaGVja2VkT3V0cHV0LmdldCgpO1xuXG4gICAgcmV0dXJuIHJlc3VsdE9iamVjdDtcbiAgfVxuXG4gIGFkZCA9IChwYXJlbnRJZHMsIGlkKSA9PiB7XG4gICAgYWRkSXRlbSh0aGlzLCBwYXJlbnRJZHMsIGlkKTtcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIGFkZEFsbCA9IChwYXJlbnRJZHMsIGlkKSA9PiB7XG4gICAgYWRkQWxsSXRlbXModGhpcywgcGFyZW50SWRzLCBpZCk7XG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XG4gIH1cblxuICBjcmVhdGVDb3B5ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgQ2hlY2tlZEl0ZW1IYXNoTGlzdChzb3VyY2VQcm92aWRlci5nZXQodGhpcykpO1xuXG4gICAgcHJvdmlkZXJJZC5zZXQoY29weSwgcHJvdmlkZXJJZC5nZXQodGhpcykpO1xuICAgIGxhc3RVcGRhdGUuc2V0KGNvcHksIGxhc3RVcGRhdGUuZ2V0KHRoaXMpKTtcbiAgICBpbmRleC5zZXQoY29weSwgaW5kZXguZ2V0KHRoaXMpLmNsb25lKCkpO1xuXG4gICAgY29uc3QgY2hrZCA9IE9iamVjdC5hc3NpZ24oe30sIGNoZWNrZWQuZ2V0KHRoaXMpKTtcbiAgICBPYmplY3Qua2V5cyhjaGtkKS5mb3JFYWNoKChrZXkpID0+IHsgY2hrZFtrZXldID0gY2hrZFtrZXldLmNyZWF0ZUNvcHkoKTsgfSk7XG4gICAgY2hlY2tlZC5zZXQoY29weSwgY2hrZCk7XG5cbiAgICByZXR1cm4gY29weTtcbiAgfVxuXG4gIGNsZWFyQWxsID0gKCkgPT4ge1xuICAgIGNsZWFyQWxsKHRoaXMpO1xuICB9XG5cbiAgcHJlQ2hlY2tJdGVtcyA9IChwcmVDaGVja2VkSXRlbXMpID0+IHtcbiAgICBwcmVDaGVja0l0ZW1zKHRoaXMsIHByZUNoZWNrZWRJdGVtcyk7XG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XG4gIH1cblxuICByZW1vdmUgPSAocGFyZW50SWRzLCBpZCkgPT4ge1xuICAgIHJlbW92ZUl0ZW0odGhpcywgcGFyZW50SWRzLCBpZCk7XG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XG4gIH1cblxuICByZW1vdmVBbGwgPSAocGFyZW50SWRzLCBpZCkgPT4ge1xuICAgIHJlbW92ZUFsbEl0ZW1zKHRoaXMsIHBhcmVudElkcywgaWQpO1xuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgcmVtb3ZlSGFzaCA9IChoYXNoKSA9PiB7XG4gICAgcmVtb3ZlSGFzaCh0aGlzLCBoYXNoKTtcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBjaGVja2VkLmdldCh0aGlzKTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhsaXN0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0W2tleV07XG4gICAgICByZXN1bHRba2V5XSA9IHtcbiAgICAgICAgY2hlY2tlZEFsbDogaXRlbS5pc0NoZWNrZWRBbGwoKSxcbiAgICAgICAgY2hlY2tlZEl0ZW1zOiBpdGVtLmdldENoZWNrZWRJdGVtcygpLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaWQ6IHRoaXMuZ2V0SWQoKSxcbiAgICAgIGxhc3RVcGRhdGVTdGFtcDogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICAgIGNoZWNrZWQ6IHJlc3VsdCxcbiAgICB9LCBudWxsLCAyKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2VkSXRlbUhhc2hMaXN0O1xuIl19