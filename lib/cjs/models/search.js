'use strict';

exports.__esModule = true;
exports.default = undefined;

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _item = require('./item.entity');

var _item2 = _interopRequireDefault(_item);

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

  var result = foundData;

  if (data) {
    Object.keys(data).forEach(function (key) {
      var currentItem = new _item2.default(data[key]);
      var isChildren = currentItem.children && Array.isArray(currentItem.children) && currentItem.children.length > 0;

      if (isChildren) {
        result = findFromHierarchy(currentItem.children, searchingFor, result, [].concat(groupNames, [{ id: currentItem.id, name: currentItem.name }]));
      } else if (currentItem.name && isFound(currentItem.name, searchingFor)) {
        var groupId = groupNames.map(function (i) {
          return i.id;
        }).join('_');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImlzRm91bmQiLCJzZWFyY2hpbmdJbiIsInNlYXJjaGluZ0ZvciIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImZpbmRGcm9tSGllcmFyY2h5IiwiZGF0YSIsImZvdW5kRGF0YSIsImdyb3VwTmFtZXMiLCJyZXN1bHQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImN1cnJlbnRJdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiaWQiLCJuYW1lIiwiZ3JvdXBJZCIsIm1hcCIsImkiLCJqb2luIiwiZ3JvdXBOYW1lIiwidW5kZWZpbmVkIiwiaXRlbXMiLCJwdXNoIiwiZmlsdGVyIiwiaXRlbUxpc3QiLCJpdGVtIiwiaXRlbUNvcHkiLCJhc3NpZ24iLCJTZWFyY2giLCJnZXRGb3VuZEZyb21IaWVyYXJjaHkiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsImlzRGF0YSIsIkhhc2hUb0FycmF5IiwiZ2V0RGF0YSIsInNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFdBQUQsRUFBY0MsWUFBZDtBQUFBLFNBQ2RELFlBQVlFLFdBQVosR0FBMEJDLE9BQTFCLENBQWtDRixhQUFhQyxXQUFiLEVBQWxDLElBQWdFLENBQUMsQ0FEbkQ7QUFBQSxDQUFoQjs7QUFJQSxJQUFNRSxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQU9KLFlBQVAsRUFBeUQ7QUFBQSxNQUFwQ0ssU0FBb0MsdUVBQXhCLEVBQXdCO0FBQUEsTUFBcEJDLFVBQW9CLHVFQUFQLEVBQU87O0FBQ2pGLE1BQUlDLFNBQVNGLFNBQWI7O0FBRUEsTUFBSUQsSUFBSixFQUFVO0FBQ1JJLFdBQU9DLElBQVAsQ0FB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ekIsSUFBcUMsQ0FBQyxNQUFLRCxrQkFBTCxDQUF3QkUsTUFBbEUsRUFBMEUsT0FBTyxFQUFQOztBQUUxRSxVQUFNakMsT0FBT3dCLE9BQU8sTUFBS08sa0JBQUwsQ0FBd0JJLE9BQXhCLEVBQVAsRUFBMEN2QyxZQUExQyxDQUFiO0FBQ0EsYUFBT0ksSUFBUDtBQUNELEs7Ozs7OztrQkFaa0I2QixNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBJdGVtRW50aXR5IGZyb20gJy4vaXRlbS5lbnRpdHknO1xuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4vZ3JvdXAuZW50aXR5JztcblxuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgaXNGb3VuZCA9IChzZWFyY2hpbmdJbiwgc2VhcmNoaW5nRm9yKSA9PiAoXG4gIHNlYXJjaGluZ0luLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hpbmdGb3IudG9Mb3dlckNhc2UoKSkgPiAtMVxuKTtcblxuY29uc3QgZmluZEZyb21IaWVyYXJjaHkgPSAoZGF0YSwgc2VhcmNoaW5nRm9yLCBmb3VuZERhdGEgPSB7fSwgZ3JvdXBOYW1lcyA9IFtdKSA9PiB7XG4gIGxldCByZXN1bHQgPSBmb3VuZERhdGE7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gbmV3IEl0ZW1FbnRpdHkoZGF0YVtrZXldKTtcbiAgICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBjdXJyZW50SXRlbS5jaGlsZHJlbiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShjdXJyZW50SXRlbS5jaGlsZHJlbikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG5cbiAgICAgIGlmIChpc0NoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdCA9IGZpbmRGcm9tSGllcmFyY2h5KFxuICAgICAgICAgIGN1cnJlbnRJdGVtLmNoaWxkcmVuLFxuICAgICAgICAgIHNlYXJjaGluZ0ZvcixcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgWy4uLmdyb3VwTmFtZXMsIHsgaWQ6IGN1cnJlbnRJdGVtLmlkLCBuYW1lOiBjdXJyZW50SXRlbS5uYW1lIH1dLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SXRlbS5uYW1lICYmIGlzRm91bmQoY3VycmVudEl0ZW0ubmFtZSwgc2VhcmNoaW5nRm9yKSkge1xuICAgICAgICBjb25zdCBncm91cElkID0gZ3JvdXBOYW1lcy5tYXAoaSA9PiBpLmlkKS5qb2luKCdfJyk7XG4gICAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IGdyb3VwTmFtZXMubWFwKGkgPT4gaS5uYW1lKS5qb2luKCcgLyAnKTtcblxuICAgICAgICBpZiAocmVzdWx0W2dyb3VwSWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXN1bHRbZ3JvdXBJZF0gPSBuZXcgR3JvdXBFbnRpdHkoZ3JvdXBOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbZ3JvdXBJZF0uaXRlbXMucHVzaChjdXJyZW50SXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZnVuY3Rpb24gZmlsdGVyKGRhdGEsIHNlYXJjaGluZ0Zvcikge1xuICBjb25zdCBpdGVtTGlzdCA9IFtdO1xuXG4gIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMDtcblxuICAgIGlmIChpc0NoaWxkcmVuKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGZpbHRlcihpdGVtLmNoaWxkcmVuLCBzZWFyY2hpbmdGb3IpO1xuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgaXRlbUNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcbiAgICAgICAgaXRlbUNvcHkuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgaXRlbUxpc3QucHVzaChpdGVtQ29weSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0ZvdW5kKGl0ZW0ubmFtZSwgc2VhcmNoaW5nRm9yKSkge1xuICAgICAgY29uc3QgaXRlbUNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcbiAgICAgIGl0ZW1MaXN0LnB1c2goaXRlbUNvcHkpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGl0ZW1MaXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyBCYXNlTW9kZWwge1xuICBnZXRGb3VuZEZyb21IaWVyYXJjaHkgPSAoc2VhcmNoaW5nRm9yKSA9PiB7XG4gICAgaWYgKCF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCB8fCAhdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNEYXRhKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiBVdGlscy5IYXNoVG9BcnJheShmaW5kRnJvbUhpZXJhcmNoeSh0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5nZXREYXRhKCksIHNlYXJjaGluZ0ZvcikpO1xuICB9O1xuXG4gIHNlYXJjaCA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGRhdGEgPSBmaWx0ZXIodGhpcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0RGF0YSgpLCBzZWFyY2hpbmdGb3IpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG4iXX0=