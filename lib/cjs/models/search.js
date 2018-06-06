'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable max-len */


var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _group = require('./group.entity');

var _group2 = _interopRequireDefault(_group);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isFound = function isFound(searchingIn, searchingFor) {
  return searchingIn.toLowerCase().indexOf(searchingFor.toLowerCase()) > -1;
};

var findFromHierarchy = function findFromHierarchy(data, searchingFor) {
  var foundData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var groupNames = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var parentId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

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
        result = findFromHierarchy(currentItem.children, searchingFor, result, [].concat(groupNames, [{ id: currentItem.id, name: currentItem.name }]), currentItem.id);
      } else if (currentItem.name && isFound(currentItem.name, searchingFor)) {
        var groupId = parentIds.join('_');
        var groupName = groupNames.map(function (i) {
          return i.name;
        }).join(' / ');

        if (result[groupId] === undefined) {
          result[groupId] = new _group2.default(groupName);
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

var Search = function (_BaseModel) {
  _inherits(Search, _BaseModel);

  function Search() {
    var _temp, _this, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BaseModel.call.apply(_BaseModel, [this].concat(args))), _this), _this.getFoundFromHierarchy = function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return null;
      return _utils2.default.HashToArray(findFromHierarchy(_this.dataSourceProvider.getData(), searchingFor));
    }, _this.search = function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return [];

      var data = filter(_this.dataSourceProvider.getData(), searchingFor);
      return data;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Search;
}(_base2.default);

exports.default = Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImlzRm91bmQiLCJzZWFyY2hpbmdJbiIsInNlYXJjaGluZ0ZvciIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImZpbmRGcm9tSGllcmFyY2h5IiwiZGF0YSIsImZvdW5kRGF0YSIsImdyb3VwTmFtZXMiLCJwYXJlbnRJZCIsInJlc3VsdCIsImZvckVhY2giLCJpdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicGFyZW50SWRzIiwibWFwIiwiaSIsImlkIiwiY3VycmVudEl0ZW0iLCJpc0NoZWNrZWRBbGwiLCJuYW1lIiwiZ3JvdXBJZCIsImpvaW4iLCJncm91cE5hbWUiLCJ1bmRlZmluZWQiLCJpdGVtcyIsInB1c2giLCJmaWx0ZXIiLCJpdGVtTGlzdCIsIml0ZW1Db3B5IiwiT2JqZWN0IiwiYXNzaWduIiwiU2VhcmNoIiwiZ2V0Rm91bmRGcm9tSGllcmFyY2h5IiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJpc0RhdGEiLCJIYXNoVG9BcnJheSIsImdldERhdGEiLCJzZWFyY2giXSwibWFwcGluZ3MiOiI7Ozs7O2tRQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFVBQVUsU0FBVkEsT0FBVSxDQUFDQyxXQUFELEVBQWNDLFlBQWQ7QUFBQSxTQUNkRCxZQUFZRSxXQUFaLEdBQTBCQyxPQUExQixDQUFrQ0YsYUFBYUMsV0FBYixFQUFsQyxJQUFnRSxDQUFDLENBRG5EO0FBQUEsQ0FBaEI7O0FBSUEsSUFBTUUsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFPSixZQUFQLEVBQTBFO0FBQUEsTUFBckRLLFNBQXFELHVFQUF6QyxFQUF5QztBQUFBLE1BQXJDQyxVQUFxQyx1RUFBeEIsRUFBd0I7QUFBQSxNQUFwQkMsUUFBb0IsdUVBQVQsSUFBUzs7QUFDbEcsTUFB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eEMsWUFBckQsQ0FBbEIsQ0FBUDtBQUNELEssUUFFRHlDLE0sR0FBUyxVQUFDekMsWUFBRCxFQUFrQjtBQUN6QixVQUFJLENBQUMsTUFBS29DLGtCQUFMLENBQXdCQyxRQUF6QixJQUFxQyxDQUFDLE1BQUtELGtCQUFMLENBQXdCRSxNQUFsRSxFQUEwRSxPQUFPLEVBQVA7O0FBRTFFLFVBQU1sQyxPQUFPeUIsT0FBTyxNQUFLTyxrQkFBTCxDQUF3QkksT0FBeEIsRUFBUCxFQUEwQ3hDLFlBQTFDLENBQWI7QUFDQSxhQUFPSSxJQUFQO0FBQ0QsSzs7Ozs7O2tCQVhrQjhCLE0iLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4vZ3JvdXAuZW50aXR5JztcblxuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgaXNGb3VuZCA9IChzZWFyY2hpbmdJbiwgc2VhcmNoaW5nRm9yKSA9PiAoXG4gIHNlYXJjaGluZ0luLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hpbmdGb3IudG9Mb3dlckNhc2UoKSkgPiAtMVxuKTtcblxuY29uc3QgZmluZEZyb21IaWVyYXJjaHkgPSAoZGF0YSwgc2VhcmNoaW5nRm9yLCBmb3VuZERhdGEgPSB7fSwgZ3JvdXBOYW1lcyA9IFtdLCBwYXJlbnRJZCA9IG51bGwpID0+IHtcbiAgbGV0IHJlc3VsdCA9IGZvdW5kRGF0YTtcblxuICBpZiAoZGF0YSkge1xuICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgaXNDaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW4gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgIGNvbnN0IHBhcmVudElkcyA9IGdyb3VwTmFtZXMubWFwKGkgPT4gaS5pZCk7XG4gICAgICBjb25zdCBjdXJyZW50SXRlbSA9IHtcbiAgICAgICAgcGFyZW50SWQsXG4gICAgICAgIHBhcmVudElkcyxcbiAgICAgICAgaXNDaGlsZHJlbixcbiAgICAgICAgaXNDaGVja2VkQWxsOiBpc0NoaWxkcmVuLFxuICAgICAgICAuLi5pdGVtLFxuICAgICAgfTtcblxuICAgICAgaWYgKGlzQ2hpbGRyZW4pIHtcbiAgICAgICAgcmVzdWx0ID0gZmluZEZyb21IaWVyYXJjaHkoXG4gICAgICAgICAgY3VycmVudEl0ZW0uY2hpbGRyZW4sXG4gICAgICAgICAgc2VhcmNoaW5nRm9yLFxuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICBbLi4uZ3JvdXBOYW1lcywgeyBpZDogY3VycmVudEl0ZW0uaWQsIG5hbWU6IGN1cnJlbnRJdGVtLm5hbWUgfV0sXG4gICAgICAgICAgY3VycmVudEl0ZW0uaWQsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJdGVtLm5hbWUgJiYgaXNGb3VuZChjdXJyZW50SXRlbS5uYW1lLCBzZWFyY2hpbmdGb3IpKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwSWQgPSBwYXJlbnRJZHMuam9pbignXycpO1xuICAgICAgICBjb25zdCBncm91cE5hbWUgPSBncm91cE5hbWVzLm1hcChpID0+IGkubmFtZSkuam9pbignIC8gJyk7XG5cbiAgICAgICAgaWYgKHJlc3VsdFtncm91cElkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0W2dyb3VwSWRdID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W2dyb3VwSWRdLml0ZW1zLnB1c2goY3VycmVudEl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlcihkYXRhLCBzZWFyY2hpbmdGb3IpIHtcbiAgY29uc3QgaXRlbUxpc3QgPSBbXTtcblxuICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBjb25zdCBpc0NoaWxkcmVuID0gQXJyYXkuaXNBcnJheShpdGVtLmNoaWxkcmVuKSAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoaXNDaGlsZHJlbikge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBmaWx0ZXIoaXRlbS5jaGlsZHJlbiwgc2VhcmNoaW5nRm9yKTtcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICAgIGl0ZW1Db3B5LmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIGl0ZW1MaXN0LnB1c2goaXRlbUNvcHkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNGb3VuZChpdGVtLm5hbWUsIHNlYXJjaGluZ0ZvcikpIHtcbiAgICAgIGNvbnN0IGl0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICBpdGVtTGlzdC5wdXNoKGl0ZW1Db3B5KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpdGVtTGlzdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgZ2V0Rm91bmRGcm9tSGllcmFyY2h5ID0gKHNlYXJjaGluZ0ZvcikgPT4ge1xuICAgIGlmICghdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQgfHwgIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzRGF0YSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIFV0aWxzLkhhc2hUb0FycmF5KGZpbmRGcm9tSGllcmFyY2h5KHRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldERhdGEoKSwgc2VhcmNoaW5nRm9yKSk7XG4gIH07XG5cbiAgc2VhcmNoID0gKHNlYXJjaGluZ0ZvcikgPT4ge1xuICAgIGlmICghdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQgfHwgIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzRGF0YSkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgZGF0YSA9IGZpbHRlcih0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5nZXREYXRhKCksIHNlYXJjaGluZ0Zvcik7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiJdfQ==