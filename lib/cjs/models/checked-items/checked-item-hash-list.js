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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY2hlY2tlZC1pdGVtcy9jaGVja2VkLWl0ZW0taGFzaC1saXN0LmpzIl0sIm5hbWVzIjpbInNvdXJjZVByb3ZpZGVyIiwiV2Vha01hcCIsInByb3ZpZGVySWQiLCJjaGVja2VkIiwiaW5kZXgiLCJsYXN0VXBkYXRlIiwiY2xlYXJBbGwiLCJsaXN0Iiwic2V0IiwiZ2V0Q2hpbGRIYXNoZXNPZkNoZWNrZWRJdGVtcyIsImhhc2giLCJjaGVja2VkSXRlbXMiLCJnZXQiLCJoYXNoZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImN1cnJlbnRIYXNoIiwiaW5kZXhPZiIsInB1c2giLCJyZW1vdmVJdGVtIiwicGFyZW50SWRzIiwiaWQiLCJkYXRhSW5kZXgiLCJpbmRleEl0ZW0iLCJnZXRGcm9tSW5kZXgiLCJwYXJlbnRIYXNoIiwicmVtb3ZlQ2hlY2tlZEl0ZW0iLCJpdGVtIiwiZ2V0Q2hlY2tlZEl0ZW1zIiwibGVuZ3RoIiwicmVtb3ZlSGFzaCIsInVuY2hlY2tBbGwiLCJyZW1vdmVBbGxJdGVtcyIsImdldEhhc2giLCJhZGRJdGVtIiwicGFyZW50cyIsImdldFBhcmVudHMiLCJDaGVja2VkSGFzaEl0ZW0iLCJoYXNoSXRlbSIsImFkZENoZWNrZWRJdGVtIiwiYWRkQWxsSXRlbXMiLCJjaGlsZEhhc2hlcyIsImgiLCJjaGVja0FsbCIsInByZUNoZWNrSXRlbXMiLCJwcmVDaGVja2VkSXRlbXMiLCJwYXJlbnRJZCIsImhhc2hPZlByZUNoZWNrZWQiLCJpIiwiaHMiLCJmb3VuZCIsImlzQ2hlY2tlZEFsbCIsIkFycmF5IiwiaXNBcnJheSIsImNoaWxkcmVuIiwiYWZ0ZXJVcGRhdGUiLCJEYXRlIiwibm93IiwiQ2hlY2tlZEl0ZW1IYXNoTGlzdCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWRIYXNoQXJyYXkiLCJrZXkiLCJjb25jYXQiLCJjaGVja2VkSGFzaEl0ZW0iLCJnZXRIYXNoSXRlbSIsInJlc3VsdCIsImdldElzQ2hlY2tlZEFsbCIsImdldENoZWNrZWRJdGVtc0NvdW50IiwiY291bnQiLCJnZXRJZCIsImdldEhhc2hGcm9tSWRzIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwiZ2V0Q2hlY2tlZE91dHB1dCIsInJlc3VsdE9iamVjdCIsImRhdGFTb3VyY2VQcm92aWRlcklkIiwiY2hlY2tlZE91dHB1dCIsIkNoZWNrZWRPdXRwdXQiLCJhZGQiLCJhZGRBbGwiLCJjcmVhdGVDb3B5IiwiY29weSIsImNsb25lIiwiY2hrZCIsImFzc2lnbiIsInJlbW92ZSIsInJlbW92ZUFsbCIsInRvU3RyaW5nIiwiY2hlY2tlZEFsbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXN0VXBkYXRlU3RhbXAiLCJnZXRJbmRleCIsIkJhc2VNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLElBQUlDLE9BQUosRUFBdkI7QUFDQSxJQUFNQyxhQUFhLElBQUlELE9BQUosRUFBbkI7QUFDQSxJQUFNRSxVQUFVLElBQUlGLE9BQUosRUFBaEI7QUFDQSxJQUFNRyxRQUFRLElBQUlILE9BQUosRUFBZDtBQUNBLElBQU1JLGFBQWEsSUFBSUosT0FBSixFQUFuQjs7QUFFQSxTQUFTSyxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUN0QkosVUFBUUssR0FBUixDQUFZRCxJQUFaLEVBQWtCLEVBQWxCO0FBQ0Q7O0FBRUQsU0FBU0UsNEJBQVQsQ0FBc0NGLElBQXRDLEVBQTRDRyxJQUE1QyxFQUFrRDtBQUNoRCxNQUFNQyxlQUFlUixRQUFRUyxHQUFSLENBQVlMLElBQVosQ0FBckI7QUFDQSxNQUFNTSxTQUFTLEVBQWY7QUFDQUMsU0FBT0MsSUFBUCxDQUFZSixZQUFaLEVBQTBCSyxPQUExQixDQUFrQyxVQUFDQyxXQUFELEVBQWlCO0FBQ2pELFFBQUlQLFNBQVNPLFdBQVQsSUFBd0JBLFlBQVlDLE9BQVosQ0FBb0JSLElBQXBCLE1BQThCLENBQTFELEVBQTZEO0FBQzNERyxhQUFPTSxJQUFQLENBQVlGLFdBQVo7QUFDRDtBQUNGLEdBSkQ7O0FBTUEsU0FBT0osTUFBUDtBQUNEOztBQUVELFNBQVNPLFVBQVQsQ0FBb0JiLElBQXBCLEVBQTBCYyxTQUExQixFQUFxQ0MsRUFBckMsRUFBeUM7QUFDdkMsTUFBTVgsZUFBZVIsUUFBUVMsR0FBUixDQUFZTCxJQUFaLENBQXJCO0FBQ0EsTUFBTWdCLFlBQVluQixNQUFNUSxHQUFOLENBQVVMLElBQVYsQ0FBbEI7QUFDQSxNQUFNaUIsWUFBWUQsVUFBVUUsWUFBVixDQUF1QkosU0FBdkIsRUFBa0NDLEVBQWxDLENBQWxCOztBQUVBLE1BQUlFLFNBQUosRUFBZTtBQUFBLFFBQ0xFLFVBREssR0FDVUYsU0FEVixDQUNMRSxVQURLOzs7QUFHYixRQUFJZixhQUFhZSxVQUFiLENBQUosRUFBOEI7QUFDNUJmLG1CQUFhZSxVQUFiLEVBQXlCQyxpQkFBekIsQ0FBMkNILFVBQVVJLElBQXJEO0FBQ0E7QUFDQSxVQUFJakIsYUFBYWUsVUFBYixFQUF5QkcsZUFBekIsR0FBMkNDLE1BQTNDLEtBQXNELENBQTFELEVBQTZEO0FBQzNELGVBQU9uQixhQUFhZSxVQUFiLENBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxTQUFTSyxVQUFULENBQW9CeEIsSUFBcEIsRUFBMEJHLElBQTFCLEVBQWdDO0FBQzlCLE1BQU1DLGVBQWVSLFFBQVFTLEdBQVIsQ0FBWUwsSUFBWixDQUFyQjtBQUNBLE1BQUlJLGFBQWFELElBQWIsQ0FBSixFQUF3QjtBQUN0QkMsaUJBQWFELElBQWIsRUFBbUJzQixVQUFuQjtBQUNBLFdBQU9yQixhQUFhRCxJQUFiLENBQVA7QUFDRDtBQUNGOztBQUVELFNBQVN1QixjQUFULENBQXdCMUIsSUFBeEIsRUFBOEJjLFNBQTlCLEVBQXlDQyxFQUF6QyxFQUE2QztBQUMzQyxNQUFNQyxZQUFZbkIsTUFBTVEsR0FBTixDQUFVTCxJQUFWLENBQWxCO0FBQ0EsTUFBTWlCLFlBQVlELFVBQVVFLFlBQVYsQ0FBdUJKLFNBQXZCLEVBQWtDQyxFQUFsQyxDQUFsQjs7QUFFQSxNQUFJRSxTQUFKLEVBQWU7QUFDYixRQUFNZCxPQUFPYSxVQUFVVyxPQUFWLENBQWtCVixTQUFsQixDQUFiO0FBQ0FPLGVBQVd4QixJQUFYLEVBQWlCRyxJQUFqQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU3lCLE9BQVQsQ0FBaUI1QixJQUFqQixFQUF1QmMsU0FBdkIsRUFBa0NDLEVBQWxDLEVBQXNDO0FBQ3BDLE1BQU1YLGVBQWVSLFFBQVFTLEdBQVIsQ0FBWUwsSUFBWixDQUFyQjtBQUNBLE1BQU1nQixZQUFZbkIsTUFBTVEsR0FBTixDQUFVTCxJQUFWLENBQWxCO0FBQ0EsTUFBTWlCLFlBQVlELFVBQVVFLFlBQVYsQ0FBdUJKLFNBQXZCLEVBQWtDQyxFQUFsQyxDQUFsQjs7QUFFQSxNQUFJRSxTQUFKLEVBQWU7QUFBQSxRQUNMRSxVQURLLEdBQ1VGLFNBRFYsQ0FDTEUsVUFESzs7QUFFYixRQUFNVSxVQUFVYixVQUFVYyxVQUFWLENBQXFCYixTQUFyQixDQUFoQjs7QUFFQSxRQUFJLENBQUNiLGFBQWFlLFVBQWIsQ0FBTCxFQUErQmYsYUFBYWUsVUFBYixJQUEyQixJQUFJWSx5QkFBSixDQUFvQkYsT0FBcEIsQ0FBM0I7O0FBRS9CLFFBQU1HLFdBQVc1QixhQUFhZSxVQUFiLENBQWpCO0FBQ0FhLGFBQVNDLGNBQVQsQ0FBd0JoQixVQUFVSSxJQUFsQztBQUNEO0FBQ0Y7O0FBRUQsU0FBU2EsV0FBVCxDQUFxQmxDLElBQXJCLEVBQTJCYyxTQUEzQixFQUFzQ0MsRUFBdEMsRUFBMEM7QUFDeEMsTUFBTVgsZUFBZVIsUUFBUVMsR0FBUixDQUFZTCxJQUFaLENBQXJCO0FBQ0EsTUFBTWdCLFlBQVluQixNQUFNUSxHQUFOLENBQVVMLElBQVYsQ0FBbEI7QUFDQSxNQUFNaUIsWUFBWUQsVUFBVUUsWUFBVixDQUF1QkosU0FBdkIsRUFBa0NDLEVBQWxDLENBQWxCO0FBQ0EsTUFBSUUsU0FBSixFQUFlO0FBQ2IsUUFBTWQsT0FBT2EsVUFBVVcsT0FBVixDQUFrQlYsU0FBbEIsQ0FBYjtBQUNBLFFBQU1ZLG9CQUFjYixVQUFVYyxVQUFWLENBQXFCYixTQUFyQixDQUFkLEdBQStDQSxVQUFVSSxJQUF6RCxFQUFOO0FBQ0EsUUFBTWMsY0FBY2pDLDZCQUE2QkYsSUFBN0IsRUFBbUNHLElBQW5DLEtBQTRDLEVBQWhFOztBQUVBZ0MsZ0JBQVkxQixPQUFaLENBQW9CLFVBQUMyQixDQUFELEVBQU87QUFBRVosaUJBQVd4QixJQUFYLEVBQWlCb0MsQ0FBakI7QUFBc0IsS0FBbkQ7O0FBRUEsUUFBSSxDQUFDaEMsYUFBYUQsSUFBYixDQUFMLEVBQXlCQyxhQUFhRCxJQUFiLElBQXFCLElBQUk0Qix5QkFBSixDQUFvQkYsT0FBcEIsQ0FBckI7O0FBRXpCLFFBQU1HLFdBQVc1QixhQUFhRCxJQUFiLENBQWpCO0FBQ0E2QixhQUFTSyxRQUFUO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTQyxhQUFULENBQXVCdEMsSUFBdkIsRUFBNkJ1QyxlQUE3QixFQUE4QztBQUM1QyxNQUFNdkIsWUFBWW5CLE1BQU1RLEdBQU4sQ0FBVUwsSUFBVixDQUFsQjtBQUNBLE1BQU0yQixVQUFVLFNBQVZBLE9BQVUsQ0FBQ2EsUUFBRCxFQUFXekIsRUFBWDtBQUFBLFdBQ2R5QixXQUFjQSxRQUFkLFNBQTBCekIsRUFBMUIsUUFBb0NBLEVBRHRCO0FBQUEsR0FBaEI7QUFHQWhCLFdBQVNDLElBQVQ7O0FBRUEsTUFBSWdCLGFBQWF1QixlQUFqQixFQUFrQztBQUNoQztBQUNBLFFBQU1FLG1CQUFtQixFQUF6QjtBQUNBRixvQkFBZ0I5QixPQUFoQixDQUF3QixVQUFDaUMsQ0FBRCxFQUFPO0FBQzdCLFVBQU1DLEtBQUtoQixRQUFRZSxFQUFFRixRQUFWLEVBQW9CRSxFQUFFM0IsRUFBdEIsQ0FBWDtBQUNBMEIsdUJBQWlCRSxFQUFqQixJQUF1QkQsQ0FBdkI7QUFDRCxLQUhEOztBQUtBMUIsY0FBVVAsT0FBVixDQUFrQixVQUFDWSxJQUFELEVBQU9QLFNBQVAsRUFBcUI7QUFDckMsVUFBTTZCLEtBQUtoQixRQUFRYixVQUFVUyxNQUFWLEdBQW1CLENBQW5CLEdBQXVCVCxVQUFVQSxVQUFVUyxNQUFWLEdBQW1CLENBQTdCLENBQXZCLEdBQXlELElBQWpFLEVBQXVFRixLQUFLTixFQUE1RSxDQUFYO0FBQ0EsVUFBTTZCLFFBQVFILGlCQUFpQkUsRUFBakIsQ0FBZDtBQUNBLFVBQUlDLEtBQUosRUFBVztBQUNULFlBQUlBLE1BQU1DLFlBQU4sSUFBc0JDLE1BQU1DLE9BQU4sQ0FBYzFCLEtBQUsyQixRQUFuQixDQUF0QixJQUFzRDNCLEtBQUsyQixRQUFMLENBQWN6QixNQUFkLEdBQXVCLENBQWpGLEVBQW9GO0FBQ2xGVyxzQkFBWWxDLElBQVosRUFBa0JjLFNBQWxCLEVBQTZCTyxLQUFLTixFQUFsQztBQUNELFNBRkQsTUFFTztBQUNMYSxrQkFBUTVCLElBQVIsRUFBY2MsU0FBZCxFQUF5Qk8sS0FBS04sRUFBOUI7QUFDRDtBQUNGO0FBQ0YsS0FWRDtBQVdEO0FBQ0Y7O0FBRUQsU0FBU2tDLFdBQVQsQ0FBcUJqRCxJQUFyQixFQUEyQjtBQUN6QkYsYUFBV0csR0FBWCxDQUFlRCxJQUFmLEVBQXFCa0QsS0FBS0MsR0FBTCxFQUFyQjtBQUNEOztJQUVLQyxtQjs7O0FBQ0osK0JBQVlDLGtCQUFaLEVBQWdDO0FBQUE7O0FBQUEsaURBQzlCLHNCQUFNQSxrQkFBTixDQUQ4Qjs7QUFBQSxVQVNoQ2hELEdBVGdDLEdBUzFCO0FBQUEsYUFBTVQsUUFBUVMsR0FBUixPQUFOO0FBQUEsS0FUMEI7O0FBQUEsVUFXaENpRCxrQkFYZ0MsR0FXWCxZQUFNO0FBQ3pCLFVBQU1DLG1CQUFtQjNELFFBQVFTLEdBQVIsT0FBekI7QUFDQSxVQUFJTCxPQUFPLEVBQVg7QUFDQU8sYUFBT0MsSUFBUCxDQUFZK0MsZ0JBQVosRUFBOEI5QyxPQUE5QixDQUFzQyxVQUFDK0MsR0FBRCxFQUFTO0FBQzdDeEQsZUFBT0EsS0FBS3lELE1BQUwsQ0FBWUYsaUJBQWlCQyxHQUFqQixFQUFzQmxDLGVBQXRCLEVBQVosQ0FBUDtBQUNELE9BRkQ7QUFHQSxhQUFPdEIsSUFBUDtBQUNELEtBbEIrQjs7QUFBQSxVQW9CaENzQixlQXBCZ0MsR0FvQmQsWUFBb0I7QUFBQSxVQUFuQlIsU0FBbUIsdUVBQVAsRUFBTzs7QUFDcEMsVUFBTTRDLGtCQUFrQixNQUFLQyxXQUFMLENBQWlCN0MsU0FBakIsQ0FBeEI7QUFDQSxVQUFJOEMsU0FBUyxFQUFiO0FBQ0EsVUFBSUYsZUFBSixFQUFxQjtBQUNuQkUsaUJBQVNGLGdCQUFnQnBDLGVBQWhCLEVBQVQ7QUFDRDtBQUNELGFBQU9zQyxNQUFQO0FBQ0QsS0EzQitCOztBQUFBLFVBNkJoQ0MsZUE3QmdDLEdBNkJkLFlBQW9CO0FBQUEsVUFBbkIvQyxTQUFtQix1RUFBUCxFQUFPOztBQUNwQyxVQUFNNEMsa0JBQWtCLE1BQUtDLFdBQUwsQ0FBaUI3QyxTQUFqQixDQUF4QjtBQUNBLGFBQU80QyxrQkFBa0JBLGdCQUFnQmIsWUFBaEIsRUFBbEIsR0FBbUQsS0FBMUQ7QUFDRCxLQWhDK0I7O0FBQUEsVUFrQ2hDaUIsb0JBbENnQyxHQWtDVCxZQUFNO0FBQzNCLFVBQU1QLG1CQUFtQjNELFFBQVFTLEdBQVIsT0FBekI7QUFDQSxVQUFJMEQsUUFBUSxDQUFaO0FBQ0F4RCxhQUFPQyxJQUFQLENBQVkrQyxnQkFBWixFQUE4QjlDLE9BQTlCLENBQXNDLFVBQUMrQyxHQUFELEVBQVM7QUFDN0NPLGlCQUFTUixpQkFBaUJDLEdBQWpCLEVBQXNCbEMsZUFBdEIsR0FBd0NDLE1BQWpEO0FBQ0QsT0FGRDtBQUdBLGFBQU93QyxLQUFQO0FBQ0QsS0F6QytCOztBQUFBLFVBMkNoQ0MsS0EzQ2dDLEdBMkN4QjtBQUFBLGFBQU1yRSxXQUFXVSxHQUFYLE9BQU47QUFBQSxLQTNDd0I7O0FBQUEsVUE2Q2hDc0QsV0E3Q2dDLEdBNkNsQixZQUFvQjtBQUFBLFVBQW5CN0MsU0FBbUIsdUVBQVAsRUFBTzs7QUFDaEMsVUFBTXlDLG1CQUFtQjNELFFBQVFTLEdBQVIsT0FBekI7QUFDQSxVQUFNVyxZQUFZbkIsTUFBTVEsR0FBTixPQUFsQjtBQUNBLFVBQU1GLE9BQU9hLFVBQVVpRCxjQUFWLENBQXlCbkQsU0FBekIsQ0FBYjs7QUFFQSxVQUFJWCxTQUFTLEVBQVQsSUFBZSxDQUFDb0QsaUJBQWlCcEQsSUFBakIsQ0FBcEIsRUFBNEM7QUFDMUMsZUFBTyxJQUFQO0FBQ0Q7QUFDRCxhQUFPb0QsaUJBQWlCcEQsSUFBakIsQ0FBUDtBQUNELEtBdEQrQjs7QUFBQSxVQXdEaEMrRCxrQkF4RGdDLEdBd0RYO0FBQUEsYUFBTXBFLFdBQVdPLEdBQVgsT0FBTjtBQUFBLEtBeERXOztBQUFBLFVBMERoQzhELGdCQTFEZ0MsR0EwRGIsWUFBTTtBQUN2QixVQUFNQyxlQUFlO0FBQ25CQyw4QkFBc0IsTUFBS0wsS0FBTCxFQURIO0FBRW5CcEUsaUJBQVM7QUFGVSxPQUFyQjtBQUlBLFVBQU0wRSxnQkFBZ0IsSUFBSUMsdUJBQUosRUFBdEI7QUFDQSxVQUFNakUsU0FBU1YsUUFBUVMsR0FBUixPQUFmOztBQUVBRSxhQUFPQyxJQUFQLENBQVlGLE1BQVosRUFBb0JHLE9BQXBCLENBQTRCLFVBQUNOLElBQUQsRUFBVTtBQUNwQyxZQUFNdUQsa0JBQWtCcEQsT0FBT0gsSUFBUCxDQUF4QjtBQUNBbUUsc0JBQWNFLEdBQWQsQ0FBa0JkLGVBQWxCO0FBQ0QsT0FIRDs7QUFLQVUsbUJBQWF4RSxPQUFiLEdBQXVCMEUsY0FBY2pFLEdBQWQsRUFBdkI7O0FBRUEsYUFBTytELFlBQVA7QUFDRCxLQTFFK0I7O0FBQUEsVUE0RWhDSSxHQTVFZ0MsR0E0RTFCLFVBQUMxRCxTQUFELEVBQVlDLEVBQVosRUFBbUI7QUFDdkJhLHFCQUFjZCxTQUFkLEVBQXlCQyxFQUF6QjtBQUNBa0M7QUFDRCxLQS9FK0I7O0FBQUEsVUFpRmhDd0IsTUFqRmdDLEdBaUZ2QixVQUFDM0QsU0FBRCxFQUFZQyxFQUFaLEVBQW1CO0FBQzFCbUIseUJBQWtCcEIsU0FBbEIsRUFBNkJDLEVBQTdCO0FBQ0FrQztBQUNELEtBcEYrQjs7QUFBQSxVQXNGaEN5QixVQXRGZ0MsR0FzRm5CLFlBQU07QUFDakIsVUFBTUMsT0FBTyxJQUFJdkIsbUJBQUosQ0FBd0IzRCxlQUFlWSxHQUFmLE9BQXhCLENBQWI7O0FBRUFWLGlCQUFXTSxHQUFYLENBQWUwRSxJQUFmLEVBQXFCaEYsV0FBV1UsR0FBWCxPQUFyQjtBQUNBUCxpQkFBV0csR0FBWCxDQUFlMEUsSUFBZixFQUFxQjdFLFdBQVdPLEdBQVgsT0FBckI7QUFDQVIsWUFBTUksR0FBTixDQUFVMEUsSUFBVixFQUFnQjlFLE1BQU1RLEdBQU4sUUFBZ0J1RSxLQUFoQixFQUFoQjs7QUFFQSxVQUFNQyxPQUFPdEUsT0FBT3VFLE1BQVAsQ0FBYyxFQUFkLEVBQWtCbEYsUUFBUVMsR0FBUixPQUFsQixDQUFiO0FBQ0FFLGFBQU9DLElBQVAsQ0FBWXFFLElBQVosRUFBa0JwRSxPQUFsQixDQUEwQixVQUFDK0MsR0FBRCxFQUFTO0FBQUVxQixhQUFLckIsR0FBTCxJQUFZcUIsS0FBS3JCLEdBQUwsRUFBVWtCLFVBQVYsRUFBWjtBQUFxQyxPQUExRTtBQUNBOUUsY0FBUUssR0FBUixDQUFZMEUsSUFBWixFQUFrQkUsSUFBbEI7O0FBRUEsYUFBT0YsSUFBUDtBQUNELEtBbEcrQjs7QUFBQSxVQW9HaEM1RSxRQXBHZ0MsR0FvR3JCLFlBQU07QUFDZkE7QUFDRCxLQXRHK0I7O0FBQUEsVUF3R2hDdUMsYUF4R2dDLEdBd0doQixVQUFDQyxlQUFELEVBQXFCO0FBQ25DRCwyQkFBb0JDLGVBQXBCO0FBQ0FVO0FBQ0QsS0EzRytCOztBQUFBLFVBNkdoQzhCLE1BN0dnQyxHQTZHdkIsVUFBQ2pFLFNBQUQsRUFBWUMsRUFBWixFQUFtQjtBQUMxQkYsd0JBQWlCQyxTQUFqQixFQUE0QkMsRUFBNUI7QUFDQWtDO0FBQ0QsS0FoSCtCOztBQUFBLFVBa0hoQytCLFNBbEhnQyxHQWtIcEIsVUFBQ2xFLFNBQUQsRUFBWUMsRUFBWixFQUFtQjtBQUM3QlcsNEJBQXFCWixTQUFyQixFQUFnQ0MsRUFBaEM7QUFDQWtDO0FBQ0QsS0FySCtCOztBQUFBLFVBdUhoQ3pCLFVBdkhnQyxHQXVIbkIsVUFBQ3JCLElBQUQsRUFBVTtBQUNyQnFCLHdCQUFpQnJCLElBQWpCO0FBQ0E4QztBQUNELEtBMUgrQjs7QUFBQSxVQTRIaENnQyxRQTVIZ0MsR0E0SHJCLFlBQU07QUFDZixVQUFNakYsT0FBT0osUUFBUVMsR0FBUixPQUFiO0FBQ0EsVUFBTXVELFNBQVMsRUFBZjtBQUNBckQsYUFBT0MsSUFBUCxDQUFZUixJQUFaLEVBQWtCUyxPQUFsQixDQUEwQixVQUFDK0MsR0FBRCxFQUFTO0FBQ2pDLFlBQU1uQyxPQUFPckIsS0FBS3dELEdBQUwsQ0FBYjtBQUNBSSxlQUFPSixHQUFQLElBQWM7QUFDWjBCLHNCQUFZN0QsS0FBS3dCLFlBQUwsRUFEQTtBQUVaekMsd0JBQWNpQixLQUFLQyxlQUFMO0FBRkYsU0FBZDtBQUlELE9BTkQ7QUFPQSxhQUFPNkQsS0FBS0MsU0FBTCxDQUFlO0FBQ3BCckUsWUFBSSxNQUFLaUQsS0FBTCxFQURnQjtBQUVwQnFCLHlCQUFpQixNQUFLbkIsa0JBQUwsRUFGRztBQUdwQnRFLGlCQUFTZ0U7QUFIVyxPQUFmLEVBSUosSUFKSSxFQUlFLENBSkYsQ0FBUDtBQUtELEtBM0krQjs7QUFFOUJuRSxtQkFBZVEsR0FBZixRQUF5Qm9ELGtCQUF6QjtBQUNBMUQsZUFBV00sR0FBWCxRQUFxQm9ELG1CQUFtQnRDLEVBQXhDO0FBQ0FqQixlQUFXRyxHQUFYLFFBQXFCLENBQXJCO0FBQ0FMLFlBQVFLLEdBQVIsUUFBa0IsRUFBbEI7QUFDQUosVUFBTUksR0FBTixRQUFnQm9ELG1CQUFtQmlDLFFBQW5CLEVBQWhCO0FBTjhCO0FBTy9COzs7RUFSK0JDLGM7O2tCQStJbkJuQyxtQiIsImZpbGUiOiJjaGVja2VkLWl0ZW0taGFzaC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9iYXNlJztcbmltcG9ydCBDaGVja2VkSGFzaEl0ZW0gZnJvbSAnLi9jaGVja2VkLWhhc2gtaXRlbSc7XG5pbXBvcnQgQ2hlY2tlZE91dHB1dCBmcm9tICcuL2NoZWNrZWQtb3V0cHV0JztcblxuY29uc3Qgc291cmNlUHJvdmlkZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcHJvdmlkZXJJZCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBjaGVja2VkID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGluZGV4ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGxhc3RVcGRhdGUgPSBuZXcgV2Vha01hcCgpO1xuXG5mdW5jdGlvbiBjbGVhckFsbChsaXN0KSB7XG4gIGNoZWNrZWQuc2V0KGxpc3QsIHt9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hpbGRIYXNoZXNPZkNoZWNrZWRJdGVtcyhsaXN0LCBoYXNoKSB7XG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xuICBjb25zdCBoYXNoZXMgPSBbXTtcbiAgT2JqZWN0LmtleXMoY2hlY2tlZEl0ZW1zKS5mb3JFYWNoKChjdXJyZW50SGFzaCkgPT4ge1xuICAgIGlmIChoYXNoICE9PSBjdXJyZW50SGFzaCAmJiBjdXJyZW50SGFzaC5pbmRleE9mKGhhc2gpID09PSAwKSB7XG4gICAgICBoYXNoZXMucHVzaChjdXJyZW50SGFzaCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaGFzaGVzO1xufVxuXG5mdW5jdGlvbiByZW1vdmVJdGVtKGxpc3QsIHBhcmVudElkcywgaWQpIHtcbiAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZC5nZXQobGlzdCk7XG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcbiAgY29uc3QgaW5kZXhJdGVtID0gZGF0YUluZGV4LmdldEZyb21JbmRleChwYXJlbnRJZHMsIGlkKTtcblxuICBpZiAoaW5kZXhJdGVtKSB7XG4gICAgY29uc3QgeyBwYXJlbnRIYXNoIH0gPSBpbmRleEl0ZW07XG5cbiAgICBpZiAoY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdKSB7XG4gICAgICBjaGVja2VkSXRlbXNbcGFyZW50SGFzaF0ucmVtb3ZlQ2hlY2tlZEl0ZW0oaW5kZXhJdGVtLml0ZW0pO1xuICAgICAgLy8gQ2hlY2tzIGlmIHRoZXJlIGlzIG5vIGNoZWNrZWQgaXRlbXMsIHRoZW4gcmVtb3ZlcyBhIGhhc2hcbiAgICAgIGlmIChjaGVja2VkSXRlbXNbcGFyZW50SGFzaF0uZ2V0Q2hlY2tlZEl0ZW1zKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSBjaGVja2VkSXRlbXNbcGFyZW50SGFzaF07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhc2gobGlzdCwgaGFzaCkge1xuICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkLmdldChsaXN0KTtcbiAgaWYgKGNoZWNrZWRJdGVtc1toYXNoXSkge1xuICAgIGNoZWNrZWRJdGVtc1toYXNoXS51bmNoZWNrQWxsKCk7XG4gICAgZGVsZXRlIGNoZWNrZWRJdGVtc1toYXNoXTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVBbGxJdGVtcyhsaXN0LCBwYXJlbnRJZHMsIGlkKSB7XG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcbiAgY29uc3QgaW5kZXhJdGVtID0gZGF0YUluZGV4LmdldEZyb21JbmRleChwYXJlbnRJZHMsIGlkKTtcblxuICBpZiAoaW5kZXhJdGVtKSB7XG4gICAgY29uc3QgaGFzaCA9IGRhdGFJbmRleC5nZXRIYXNoKGluZGV4SXRlbSk7XG4gICAgcmVtb3ZlSGFzaChsaXN0LCBoYXNoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRJdGVtKGxpc3QsIHBhcmVudElkcywgaWQpIHtcbiAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZC5nZXQobGlzdCk7XG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcbiAgY29uc3QgaW5kZXhJdGVtID0gZGF0YUluZGV4LmdldEZyb21JbmRleChwYXJlbnRJZHMsIGlkKTtcblxuICBpZiAoaW5kZXhJdGVtKSB7XG4gICAgY29uc3QgeyBwYXJlbnRIYXNoIH0gPSBpbmRleEl0ZW07XG4gICAgY29uc3QgcGFyZW50cyA9IGRhdGFJbmRleC5nZXRQYXJlbnRzKGluZGV4SXRlbSk7XG5cbiAgICBpZiAoIWNoZWNrZWRJdGVtc1twYXJlbnRIYXNoXSkgY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdID0gbmV3IENoZWNrZWRIYXNoSXRlbShwYXJlbnRzKTtcblxuICAgIGNvbnN0IGhhc2hJdGVtID0gY2hlY2tlZEl0ZW1zW3BhcmVudEhhc2hdO1xuICAgIGhhc2hJdGVtLmFkZENoZWNrZWRJdGVtKGluZGV4SXRlbS5pdGVtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRBbGxJdGVtcyhsaXN0LCBwYXJlbnRJZHMsIGlkKSB7XG4gIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWQuZ2V0KGxpc3QpO1xuICBjb25zdCBkYXRhSW5kZXggPSBpbmRleC5nZXQobGlzdCk7XG4gIGNvbnN0IGluZGV4SXRlbSA9IGRhdGFJbmRleC5nZXRGcm9tSW5kZXgocGFyZW50SWRzLCBpZCk7XG4gIGlmIChpbmRleEl0ZW0pIHtcbiAgICBjb25zdCBoYXNoID0gZGF0YUluZGV4LmdldEhhc2goaW5kZXhJdGVtKTtcbiAgICBjb25zdCBwYXJlbnRzID0gWy4uLmRhdGFJbmRleC5nZXRQYXJlbnRzKGluZGV4SXRlbSksIGluZGV4SXRlbS5pdGVtXTtcbiAgICBjb25zdCBjaGlsZEhhc2hlcyA9IGdldENoaWxkSGFzaGVzT2ZDaGVja2VkSXRlbXMobGlzdCwgaGFzaCkgfHwgW107XG5cbiAgICBjaGlsZEhhc2hlcy5mb3JFYWNoKChoKSA9PiB7IHJlbW92ZUhhc2gobGlzdCwgaCk7IH0pO1xuXG4gICAgaWYgKCFjaGVja2VkSXRlbXNbaGFzaF0pIGNoZWNrZWRJdGVtc1toYXNoXSA9IG5ldyBDaGVja2VkSGFzaEl0ZW0ocGFyZW50cyk7XG5cbiAgICBjb25zdCBoYXNoSXRlbSA9IGNoZWNrZWRJdGVtc1toYXNoXTtcbiAgICBoYXNoSXRlbS5jaGVja0FsbCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZUNoZWNrSXRlbXMobGlzdCwgcHJlQ2hlY2tlZEl0ZW1zKSB7XG4gIGNvbnN0IGRhdGFJbmRleCA9IGluZGV4LmdldChsaXN0KTtcbiAgY29uc3QgZ2V0SGFzaCA9IChwYXJlbnRJZCwgaWQpID0+IChcbiAgICBwYXJlbnRJZCA/IGAke3BhcmVudElkfV8ke2lkfWAgOiBgJHtpZH1gXG4gICk7XG4gIGNsZWFyQWxsKGxpc3QpO1xuXG4gIGlmIChkYXRhSW5kZXggJiYgcHJlQ2hlY2tlZEl0ZW1zKSB7XG4gICAgLy8gY3JlYXRpbmcgYSBoYXNoIGZvciBwcmUtY2hlY2tlZCBpdGVtcyB0byBpbmNyZWFzZSBzcGVlZCBvZiBzZWFyY2hpbmdcbiAgICBjb25zdCBoYXNoT2ZQcmVDaGVja2VkID0gW107XG4gICAgcHJlQ2hlY2tlZEl0ZW1zLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGNvbnN0IGhzID0gZ2V0SGFzaChpLnBhcmVudElkLCBpLmlkKTtcbiAgICAgIGhhc2hPZlByZUNoZWNrZWRbaHNdID0gaTtcbiAgICB9KTtcblxuICAgIGRhdGFJbmRleC5mb3JFYWNoKChpdGVtLCBwYXJlbnRJZHMpID0+IHtcbiAgICAgIGNvbnN0IGhzID0gZ2V0SGFzaChwYXJlbnRJZHMubGVuZ3RoID4gMCA/IHBhcmVudElkc1twYXJlbnRJZHMubGVuZ3RoIC0gMV0gOiBudWxsLCBpdGVtLmlkKTtcbiAgICAgIGNvbnN0IGZvdW5kID0gaGFzaE9mUHJlQ2hlY2tlZFtoc107XG4gICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgaWYgKGZvdW5kLmlzQ2hlY2tlZEFsbCAmJiBBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGFkZEFsbEl0ZW1zKGxpc3QsIHBhcmVudElkcywgaXRlbS5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkSXRlbShsaXN0LCBwYXJlbnRJZHMsIGl0ZW0uaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWZ0ZXJVcGRhdGUobGlzdCkge1xuICBsYXN0VXBkYXRlLnNldChsaXN0LCBEYXRlLm5vdygpKTtcbn1cblxuY2xhc3MgQ2hlY2tlZEl0ZW1IYXNoTGlzdCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRhdGFTb3VyY2VQcm92aWRlcikge1xuICAgIHN1cGVyKGRhdGFTb3VyY2VQcm92aWRlcik7XG4gICAgc291cmNlUHJvdmlkZXIuc2V0KHRoaXMsIGRhdGFTb3VyY2VQcm92aWRlcik7XG4gICAgcHJvdmlkZXJJZC5zZXQodGhpcywgZGF0YVNvdXJjZVByb3ZpZGVyLmlkKTtcbiAgICBsYXN0VXBkYXRlLnNldCh0aGlzLCAwKTtcbiAgICBjaGVja2VkLnNldCh0aGlzLCB7fSk7XG4gICAgaW5kZXguc2V0KHRoaXMsIGRhdGFTb3VyY2VQcm92aWRlci5nZXRJbmRleCgpKTtcbiAgfVxuXG4gIGdldCA9ICgpID0+IGNoZWNrZWQuZ2V0KHRoaXMpO1xuXG4gIGdldEFsbENoZWNrZWRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCBjaGVja2VkSGFzaEFycmF5ID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjaGVja2VkSGFzaEFycmF5KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGxpc3QgPSBsaXN0LmNvbmNhdChjaGVja2VkSGFzaEFycmF5W2tleV0uZ2V0Q2hlY2tlZEl0ZW1zKCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgZ2V0Q2hlY2tlZEl0ZW1zID0gKHBhcmVudElkcyA9IFtdKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEhhc2hJdGVtID0gdGhpcy5nZXRIYXNoSXRlbShwYXJlbnRJZHMpO1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBpZiAoY2hlY2tlZEhhc2hJdGVtKSB7XG4gICAgICByZXN1bHQgPSBjaGVja2VkSGFzaEl0ZW0uZ2V0Q2hlY2tlZEl0ZW1zKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRJc0NoZWNrZWRBbGwgPSAocGFyZW50SWRzID0gW10pID0+IHtcbiAgICBjb25zdCBjaGVja2VkSGFzaEl0ZW0gPSB0aGlzLmdldEhhc2hJdGVtKHBhcmVudElkcyk7XG4gICAgcmV0dXJuIGNoZWNrZWRIYXNoSXRlbSA/IGNoZWNrZWRIYXNoSXRlbS5pc0NoZWNrZWRBbGwoKSA6IGZhbHNlO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZEl0ZW1zQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEhhc2hBcnJheSA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgT2JqZWN0LmtleXMoY2hlY2tlZEhhc2hBcnJheSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb3VudCArPSBjaGVja2VkSGFzaEFycmF5W2tleV0uZ2V0Q2hlY2tlZEl0ZW1zKCkubGVuZ3RoO1xuICAgIH0pO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGdldElkID0gKCkgPT4gcHJvdmlkZXJJZC5nZXQodGhpcyk7XG5cbiAgZ2V0SGFzaEl0ZW0gPSAocGFyZW50SWRzID0gW10pID0+IHtcbiAgICBjb25zdCBjaGVja2VkSGFzaEFycmF5ID0gY2hlY2tlZC5nZXQodGhpcyk7XG4gICAgY29uc3QgZGF0YUluZGV4ID0gaW5kZXguZ2V0KHRoaXMpO1xuICAgIGNvbnN0IGhhc2ggPSBkYXRhSW5kZXguZ2V0SGFzaEZyb21JZHMocGFyZW50SWRzKTtcblxuICAgIGlmIChoYXNoID09PSAnJyB8fCAhY2hlY2tlZEhhc2hBcnJheVtoYXNoXSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjaGVja2VkSGFzaEFycmF5W2hhc2hdO1xuICB9O1xuXG4gIGdldExhc3RVcGRhdGVTdGFtcCA9ICgpID0+IGxhc3RVcGRhdGUuZ2V0KHRoaXMpO1xuXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0T2JqZWN0ID0ge1xuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVySWQ6IHRoaXMuZ2V0SWQoKSxcbiAgICAgIGNoZWNrZWQ6IFtdLFxuICAgIH07XG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IG5ldyBDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3QgaGFzaGVzID0gY2hlY2tlZC5nZXQodGhpcyk7XG5cbiAgICBPYmplY3Qua2V5cyhoYXNoZXMpLmZvckVhY2goKGhhc2gpID0+IHtcbiAgICAgIGNvbnN0IGNoZWNrZWRIYXNoSXRlbSA9IGhhc2hlc1toYXNoXTtcbiAgICAgIGNoZWNrZWRPdXRwdXQuYWRkKGNoZWNrZWRIYXNoSXRlbSk7XG4gICAgfSk7XG5cbiAgICByZXN1bHRPYmplY3QuY2hlY2tlZCA9IGNoZWNrZWRPdXRwdXQuZ2V0KCk7XG5cbiAgICByZXR1cm4gcmVzdWx0T2JqZWN0O1xuICB9XG5cbiAgYWRkID0gKHBhcmVudElkcywgaWQpID0+IHtcbiAgICBhZGRJdGVtKHRoaXMsIHBhcmVudElkcywgaWQpO1xuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgYWRkQWxsID0gKHBhcmVudElkcywgaWQpID0+IHtcbiAgICBhZGRBbGxJdGVtcyh0aGlzLCBwYXJlbnRJZHMsIGlkKTtcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIGNyZWF0ZUNvcHkgPSAoKSA9PiB7XG4gICAgY29uc3QgY29weSA9IG5ldyBDaGVja2VkSXRlbUhhc2hMaXN0KHNvdXJjZVByb3ZpZGVyLmdldCh0aGlzKSk7XG5cbiAgICBwcm92aWRlcklkLnNldChjb3B5LCBwcm92aWRlcklkLmdldCh0aGlzKSk7XG4gICAgbGFzdFVwZGF0ZS5zZXQoY29weSwgbGFzdFVwZGF0ZS5nZXQodGhpcykpO1xuICAgIGluZGV4LnNldChjb3B5LCBpbmRleC5nZXQodGhpcykuY2xvbmUoKSk7XG5cbiAgICBjb25zdCBjaGtkID0gT2JqZWN0LmFzc2lnbih7fSwgY2hlY2tlZC5nZXQodGhpcykpO1xuICAgIE9iamVjdC5rZXlzKGNoa2QpLmZvckVhY2goKGtleSkgPT4geyBjaGtkW2tleV0gPSBjaGtkW2tleV0uY3JlYXRlQ29weSgpOyB9KTtcbiAgICBjaGVja2VkLnNldChjb3B5LCBjaGtkKTtcblxuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgY2xlYXJBbGwgPSAoKSA9PiB7XG4gICAgY2xlYXJBbGwodGhpcyk7XG4gIH1cblxuICBwcmVDaGVja0l0ZW1zID0gKHByZUNoZWNrZWRJdGVtcykgPT4ge1xuICAgIHByZUNoZWNrSXRlbXModGhpcywgcHJlQ2hlY2tlZEl0ZW1zKTtcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIHJlbW92ZSA9IChwYXJlbnRJZHMsIGlkKSA9PiB7XG4gICAgcmVtb3ZlSXRlbSh0aGlzLCBwYXJlbnRJZHMsIGlkKTtcbiAgICBhZnRlclVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIHJlbW92ZUFsbCA9IChwYXJlbnRJZHMsIGlkKSA9PiB7XG4gICAgcmVtb3ZlQWxsSXRlbXModGhpcywgcGFyZW50SWRzLCBpZCk7XG4gICAgYWZ0ZXJVcGRhdGUodGhpcyk7XG4gIH1cblxuICByZW1vdmVIYXNoID0gKGhhc2gpID0+IHtcbiAgICByZW1vdmVIYXNoKHRoaXMsIGhhc2gpO1xuICAgIGFmdGVyVXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IGNoZWNrZWQuZ2V0KHRoaXMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGxpc3QpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGxpc3Rba2V5XTtcbiAgICAgIHJlc3VsdFtrZXldID0ge1xuICAgICAgICBjaGVja2VkQWxsOiBpdGVtLmlzQ2hlY2tlZEFsbCgpLFxuICAgICAgICBjaGVja2VkSXRlbXM6IGl0ZW0uZ2V0Q2hlY2tlZEl0ZW1zKCksXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpZDogdGhpcy5nZXRJZCgpLFxuICAgICAgbGFzdFVwZGF0ZVN0YW1wOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgICAgY2hlY2tlZDogcmVzdWx0LFxuICAgIH0sIG51bGwsIDIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrZWRJdGVtSGFzaExpc3Q7XG4iXX0=