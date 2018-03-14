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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImlzRm91bmQiLCJzZWFyY2hpbmdJbiIsInNlYXJjaGluZ0ZvciIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImZpbmRGcm9tSGllcmFyY2h5IiwiZGF0YSIsImZvdW5kRGF0YSIsImdyb3VwTmFtZXMiLCJyZXN1bHQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImN1cnJlbnRJdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiaWQiLCJuYW1lIiwiZ3JvdXBJZCIsIm1hcCIsImkiLCJqb2luIiwiZ3JvdXBOYW1lIiwidW5kZWZpbmVkIiwiaXRlbXMiLCJwdXNoIiwiZmlsdGVyIiwiaXRlbUxpc3QiLCJpdGVtIiwiaXRlbUNvcHkiLCJhc3NpZ24iLCJTZWFyY2giLCJnZXRGb3VuZEZyb21IaWVyYXJjaHkiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsImlzRGF0YSIsIkhhc2hUb0FycmF5IiwiZ2V0RGF0YSIsInNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFdBQUQsRUFBY0MsWUFBZDtBQUFBLFNBQ2RELFlBQVlFLFdBQVosR0FBMEJDLE9BQTFCLENBQWtDRixhQUFhQyxXQUFiLEVBQWxDLElBQWdFLENBQUMsQ0FEbkQ7QUFBQSxDQUFoQjs7QUFJQSxJQUFNRSxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQU9KLFlBQVAsRUFBeUQ7QUFBQSxNQUFwQ0ssU0FBb0MsdUVBQXhCLEVBQXdCO0FBQUEsTUFBcEJDLFVBQW9CLHVFQUFQLEVBQU87O0FBQ2pGLE1BQUlDLFNBQVNGLFNBQWI7O0FBRUEsTUFBSUQsSUFBSixFQUFVO0FBQ1JJLFdBQU9DLElBQVAsQ0FBWUwsSUFBWixFQUFrQk0sT0FBbEIsQ0FBMEIsVUFBQ0MsR0FBRCxFQUFTO0FBQ2pDLFVBQU1DLGNBQWMsbUJBQWVSLEtBQUtPLEdBQUwsQ0FBZixDQUFwQjtBQUNBLFVBQU1FLGFBQWFELFlBQVlFLFFBQVosSUFDREMsTUFBTUMsT0FBTixDQUFjSixZQUFZRSxRQUExQixDQURDLElBRURGLFlBQVlFLFFBQVosQ0FBcUJHLE1BQXJCLEdBQThCLENBRmhEOztBQUlBLFVBQUlKLFVBQUosRUFBZ0I7QUFDZE4saUJBQVNKLGtCQUNQUyxZQUFZRSxRQURMLEVBRVBkLFlBRk8sRUFHUE8sTUFITyxZQUlIRCxVQUpHLEdBSVMsRUFBRVksSUFBSU4sWUFBWU0sRUFBbEIsRUFBc0JDLE1BQU1QLFlBQVlPLElBQXhDLEVBSlQsR0FBVDtBQU1ELE9BUEQsTUFPTyxJQUFJUCxZQUFZTyxJQUFaLElBQW9CckIsUUFBUWMsWUFBWU8sSUFBcEIsRUFBMEJuQixZQUExQixDQUF4QixFQUFpRTtBQUN0RSxZQUFNb0IsVUFBVWQsV0FBV2UsR0FBWCxDQUFlO0FBQUEsaUJBQUtDLEVBQUVKLEVBQVA7QUFBQSxTQUFmLEVBQTBCSyxJQUExQixDQUErQixHQUEvQixDQUFoQjtBQUNBLFlBQU1DLFlBQVlsQixXQUFXZSxHQUFYLENBQWU7QUFBQSxpQkFBS0MsRUFBRUgsSUFBUDtBQUFBLFNBQWYsRUFBNEJJLElBQTVCLENBQWlDLEtBQWpDLENBQWxCOztBQUVBLFlBQUloQixPQUFPYSxPQUFQLE1BQW9CSyxTQUF4QixFQUFtQztBQUNqQ2xCLGlCQUFPYSxPQUFQLElBQWtCLG9CQUFnQkksU0FBaEIsQ0FBbEI7QUFDRDtBQUNEakIsZUFBT2EsT0FBUCxFQUFnQk0sS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCZixXQUEzQjtBQUNEO0FBQ0YsS0F0QkQ7QUF1QkQ7O0FBRUQsU0FBT0wsTUFBUDtBQUNELENBOUJEOztBQWdDQSxTQUFTcUIsTUFBVCxDQUFnQnhCLElBQWhCLEVBQXNCSixZQUF0QixFQUFvQztBQUNsQyxNQUFNNkIsV0FBVyxFQUFqQjs7QUFFQXpCLE9BQUtNLE9BQUwsQ0FBYSxVQUFDb0IsSUFBRCxFQUFVO0FBQ3JCLFFBQU1qQixhQUFhRSxNQUFNQyxPQUFOLENBQWNjLEtBQUtoQixRQUFuQixLQUFnQ2dCLEtBQUtoQixRQUFMLENBQWNHLE1BQWQsR0FBdUIsQ0FBMUU7O0FBRUEsUUFBSUosVUFBSixFQUFnQjtBQUNkLFVBQU1DLFdBQVdjLE9BQU9FLEtBQUtoQixRQUFaLEVBQXNCZCxZQUF0QixDQUFqQjtBQUNBLFVBQUljLFNBQVNHLE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsWUFBTWMsV0FBV3ZCLE9BQU93QixNQUFQLENBQWMsRUFBZCxFQUFrQkYsSUFBbEIsQ0FBakI7QUFDQUMsaUJBQVNqQixRQUFULEdBQW9CQSxRQUFwQjtBQUNBZSxpQkFBU0YsSUFBVCxDQUFjSSxRQUFkO0FBQ0Q7QUFDRixLQVBELE1BT08sSUFBSWpDLFFBQVFnQyxLQUFLWCxJQUFiLEVBQW1CbkIsWUFBbkIsQ0FBSixFQUFzQztBQUMzQyxVQUFNK0IsWUFBV3ZCLE9BQU93QixNQUFQLENBQWMsRUFBZCxFQUFrQkYsSUFBbEIsQ0FBakI7QUFDQUQsZUFBU0YsSUFBVCxDQUFjSSxTQUFkO0FBQ0Q7QUFDRixHQWREOztBQWdCQSxTQUFPRixRQUFQO0FBQ0Q7O0lBRW9CSSxNOzs7Ozs7Ozs7Ozs7NElBQ25CQyxxQixHQUF3QixVQUFDbEMsWUFBRCxFQUFrQjtBQUN4QyxVQUFJLENBQUMsTUFBS21DLGtCQUFMLENBQXdCQyxRQUF6QixJQUFxQyxDQUFDLE1BQUtELGtCQUFMLENBQXdCRSxNQUFsRSxFQUEwRSxPQUFPLElBQVA7O0FBRTFFLGFBQU8sZ0JBQU1DLFdBQU4sQ0FBa0JuQyxrQkFBa0IsTUFBS2dDLGtCQUFMLENBQXdCSSxPQUF4QixFQUFsQixFQUFxRHZDLFlBQXJELENBQWxCLENBQVA7QUFDRCxLLFFBRUR3QyxNLEdBQVMsVUFBQ3hDLFlBQUQsRUFBa0I7QUFDekIsVUFBSSxDQUFDLE1BQUttQyxrQkFBTCxDQUF3QkMsUUFBekIsSUFBcUMsQ0FBQyxNQUFLRCxrQkFBTCxDQUF3QkUsTUFBbEUsRUFBMEUsT0FBTyxFQUFQOztBQUUxRSxVQUFNakMsT0FBT3dCLE9BQU8sTUFBS08sa0JBQUwsQ0FBd0JJLE9BQXhCLEVBQVAsRUFBMEN2QyxZQUExQyxDQUFiO0FBQ0EsYUFBT0ksSUFBUDtBQUNELEs7Ozs7OztrQkFaa0I2QixNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi9iYXNlJztcclxuaW1wb3J0IEl0ZW1FbnRpdHkgZnJvbSAnLi9pdGVtLmVudGl0eSc7XHJcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuL2dyb3VwLmVudGl0eSc7XHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuY29uc3QgaXNGb3VuZCA9IChzZWFyY2hpbmdJbiwgc2VhcmNoaW5nRm9yKSA9PiAoXHJcbiAgc2VhcmNoaW5nSW4udG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaGluZ0Zvci50b0xvd2VyQ2FzZSgpKSA+IC0xXHJcbik7XHJcblxyXG5jb25zdCBmaW5kRnJvbUhpZXJhcmNoeSA9IChkYXRhLCBzZWFyY2hpbmdGb3IsIGZvdW5kRGF0YSA9IHt9LCBncm91cE5hbWVzID0gW10pID0+IHtcclxuICBsZXQgcmVzdWx0ID0gZm91bmREYXRhO1xyXG5cclxuICBpZiAoZGF0YSkge1xyXG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gbmV3IEl0ZW1FbnRpdHkoZGF0YVtrZXldKTtcclxuICAgICAgY29uc3QgaXNDaGlsZHJlbiA9IGN1cnJlbnRJdGVtLmNoaWxkcmVuICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoY3VycmVudEl0ZW0uY2hpbGRyZW4pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XHJcblxyXG4gICAgICBpZiAoaXNDaGlsZHJlbikge1xyXG4gICAgICAgIHJlc3VsdCA9IGZpbmRGcm9tSGllcmFyY2h5KFxyXG4gICAgICAgICAgY3VycmVudEl0ZW0uY2hpbGRyZW4sXHJcbiAgICAgICAgICBzZWFyY2hpbmdGb3IsXHJcbiAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICBbLi4uZ3JvdXBOYW1lcywgeyBpZDogY3VycmVudEl0ZW0uaWQsIG5hbWU6IGN1cnJlbnRJdGVtLm5hbWUgfV0sXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SXRlbS5uYW1lICYmIGlzRm91bmQoY3VycmVudEl0ZW0ubmFtZSwgc2VhcmNoaW5nRm9yKSkge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwSWQgPSBncm91cE5hbWVzLm1hcChpID0+IGkuaWQpLmpvaW4oJ18nKTtcclxuICAgICAgICBjb25zdCBncm91cE5hbWUgPSBncm91cE5hbWVzLm1hcChpID0+IGkubmFtZSkuam9pbignIC8gJyk7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRbZ3JvdXBJZF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVzdWx0W2dyb3VwSWRdID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdFtncm91cElkXS5pdGVtcy5wdXNoKGN1cnJlbnRJdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZmlsdGVyKGRhdGEsIHNlYXJjaGluZ0Zvcikge1xyXG4gIGNvbnN0IGl0ZW1MaXN0ID0gW107XHJcblxyXG4gIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgY29uc3QgaXNDaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xyXG5cclxuICAgIGlmIChpc0NoaWxkcmVuKSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gZmlsdGVyKGl0ZW0uY2hpbGRyZW4sIHNlYXJjaGluZ0Zvcik7XHJcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbUNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcclxuICAgICAgICBpdGVtQ29weS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xyXG4gICAgICAgIGl0ZW1MaXN0LnB1c2goaXRlbUNvcHkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzRm91bmQoaXRlbS5uYW1lLCBzZWFyY2hpbmdGb3IpKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XHJcbiAgICAgIGl0ZW1MaXN0LnB1c2goaXRlbUNvcHkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gaXRlbUxpc3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIEJhc2VNb2RlbCB7XHJcbiAgZ2V0Rm91bmRGcm9tSGllcmFyY2h5ID0gKHNlYXJjaGluZ0ZvcikgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCB8fCAhdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNEYXRhKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gVXRpbHMuSGFzaFRvQXJyYXkoZmluZEZyb21IaWVyYXJjaHkodGhpcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0RGF0YSgpLCBzZWFyY2hpbmdGb3IpKTtcclxuICB9O1xyXG5cclxuICBzZWFyY2ggPSAoc2VhcmNoaW5nRm9yKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBbXTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0gZmlsdGVyKHRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldERhdGEoKSwgc2VhcmNoaW5nRm9yKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxufVxyXG4iXX0=