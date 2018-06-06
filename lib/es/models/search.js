var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable max-len */
import BaseModel from './base';
import GroupEntity from './group.entity';

import Utils from '../utils';

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
          result[groupId] = new GroupEntity(groupName);
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
      return Utils.HashToArray(findFromHierarchy(_this.dataSourceProvider.getData(), searchingFor));
    }, _this.search = function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return [];

      var data = filter(_this.dataSourceProvider.getData(), searchingFor);
      return data;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Search;
}(BaseModel);

export { Search as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbIkJhc2VNb2RlbCIsIkdyb3VwRW50aXR5IiwiVXRpbHMiLCJpc0ZvdW5kIiwic2VhcmNoaW5nSW4iLCJzZWFyY2hpbmdGb3IiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJmaW5kRnJvbUhpZXJhcmNoeSIsImRhdGEiLCJmb3VuZERhdGEiLCJncm91cE5hbWVzIiwicGFyZW50SWQiLCJyZXN1bHQiLCJmb3JFYWNoIiwiaXRlbSIsImlzQ2hpbGRyZW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsInBhcmVudElkcyIsIm1hcCIsImkiLCJpZCIsImN1cnJlbnRJdGVtIiwiaXNDaGVja2VkQWxsIiwibmFtZSIsImdyb3VwSWQiLCJqb2luIiwiZ3JvdXBOYW1lIiwidW5kZWZpbmVkIiwiaXRlbXMiLCJwdXNoIiwiZmlsdGVyIiwiaXRlbUxpc3QiLCJpdGVtQ29weSIsIk9iamVjdCIsImFzc2lnbiIsIlNlYXJjaCIsImdldEZvdW5kRnJvbUhpZXJhcmNoeSIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiaXNEYXRhIiwiSGFzaFRvQXJyYXkiLCJnZXREYXRhIiwic2VhcmNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsU0FBUCxNQUFzQixRQUF0QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsZ0JBQXhCOztBQUVBLE9BQU9DLEtBQVAsTUFBa0IsVUFBbEI7O0FBRUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFdBQUQsRUFBY0MsWUFBZDtBQUFBLFNBQ2RELFlBQVlFLFdBQVosR0FBMEJDLE9BQTFCLENBQWtDRixhQUFhQyxXQUFiLEVBQWxDLElBQWdFLENBQUMsQ0FEbkQ7QUFBQSxDQUFoQjs7QUFJQSxJQUFNRSxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQU9KLFlBQVAsRUFBMEU7QUFBQSxNQUFyREss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d0JFLE1BQWxFLEVBQTBFLE9BQU8sSUFBUDtBQUMxRSxhQUFPekMsTUFBTTBDLFdBQU4sQ0FBa0JwQyxrQkFBa0IsTUFBS2lDLGtCQUFMLENBQXdCSSxPQUF4QixFQUFsQixFQUFxRHhDLFlBQXJELENBQWxCLENBQVA7QUFDRCxLLFFBRUR5QyxNLEdBQVMsVUFBQ3pDLFlBQUQsRUFBa0I7QUFDekIsVUFBSSxDQUFDLE1BQUtvQyxrQkFBTCxDQUF3QkMsUUFBekIsSUFBcUMsQ0FBQyxNQUFLRCxrQkFBTCxDQUF3QkUsTUFBbEUsRUFBMEUsT0FBTyxFQUFQOztBQUUxRSxVQUFNbEMsT0FBT3lCLE9BQU8sTUFBS08sa0JBQUwsQ0FBd0JJLE9BQXhCLEVBQVAsRUFBMEN4QyxZQUExQyxDQUFiO0FBQ0EsYUFBT0ksSUFBUDtBQUNELEs7Ozs7RUFYaUNULFM7O1NBQWZ1QyxNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cclxuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL2Jhc2UnO1xyXG5pbXBvcnQgR3JvdXBFbnRpdHkgZnJvbSAnLi9ncm91cC5lbnRpdHknO1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGlzRm91bmQgPSAoc2VhcmNoaW5nSW4sIHNlYXJjaGluZ0ZvcikgPT4gKFxyXG4gIHNlYXJjaGluZ0luLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hpbmdGb3IudG9Mb3dlckNhc2UoKSkgPiAtMVxyXG4pO1xyXG5cclxuY29uc3QgZmluZEZyb21IaWVyYXJjaHkgPSAoZGF0YSwgc2VhcmNoaW5nRm9yLCBmb3VuZERhdGEgPSB7fSwgZ3JvdXBOYW1lcyA9IFtdLCBwYXJlbnRJZCA9IG51bGwpID0+IHtcclxuICBsZXQgcmVzdWx0ID0gZm91bmREYXRhO1xyXG5cclxuICBpZiAoZGF0YSkge1xyXG4gICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xyXG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSBncm91cE5hbWVzLm1hcChpID0+IGkuaWQpO1xyXG4gICAgICBjb25zdCBjdXJyZW50SXRlbSA9IHtcclxuICAgICAgICBwYXJlbnRJZCxcclxuICAgICAgICBwYXJlbnRJZHMsXHJcbiAgICAgICAgaXNDaGlsZHJlbixcclxuICAgICAgICBpc0NoZWNrZWRBbGw6IGlzQ2hpbGRyZW4sXHJcbiAgICAgICAgLi4uaXRlbSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpc0NoaWxkcmVuKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gZmluZEZyb21IaWVyYXJjaHkoXHJcbiAgICAgICAgICBjdXJyZW50SXRlbS5jaGlsZHJlbixcclxuICAgICAgICAgIHNlYXJjaGluZ0ZvcixcclxuICAgICAgICAgIHJlc3VsdCxcclxuICAgICAgICAgIFsuLi5ncm91cE5hbWVzLCB7IGlkOiBjdXJyZW50SXRlbS5pZCwgbmFtZTogY3VycmVudEl0ZW0ubmFtZSB9XSxcclxuICAgICAgICAgIGN1cnJlbnRJdGVtLmlkLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEl0ZW0ubmFtZSAmJiBpc0ZvdW5kKGN1cnJlbnRJdGVtLm5hbWUsIHNlYXJjaGluZ0ZvcikpIHtcclxuICAgICAgICBjb25zdCBncm91cElkID0gcGFyZW50SWRzLmpvaW4oJ18nKTtcclxuICAgICAgICBjb25zdCBncm91cE5hbWUgPSBncm91cE5hbWVzLm1hcChpID0+IGkubmFtZSkuam9pbignIC8gJyk7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRbZ3JvdXBJZF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVzdWx0W2dyb3VwSWRdID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdFtncm91cElkXS5pdGVtcy5wdXNoKGN1cnJlbnRJdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZmlsdGVyKGRhdGEsIHNlYXJjaGluZ0Zvcikge1xyXG4gIGNvbnN0IGl0ZW1MaXN0ID0gW107XHJcblxyXG4gIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgY29uc3QgaXNDaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xyXG5cclxuICAgIGlmIChpc0NoaWxkcmVuKSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gZmlsdGVyKGl0ZW0uY2hpbGRyZW4sIHNlYXJjaGluZ0Zvcik7XHJcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbUNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcclxuICAgICAgICBpdGVtQ29weS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xyXG4gICAgICAgIGl0ZW1MaXN0LnB1c2goaXRlbUNvcHkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzRm91bmQoaXRlbS5uYW1lLCBzZWFyY2hpbmdGb3IpKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XHJcbiAgICAgIGl0ZW1MaXN0LnB1c2goaXRlbUNvcHkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gaXRlbUxpc3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIEJhc2VNb2RlbCB7XHJcbiAgZ2V0Rm91bmRGcm9tSGllcmFyY2h5ID0gKHNlYXJjaGluZ0ZvcikgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCB8fCAhdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNEYXRhKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBVdGlscy5IYXNoVG9BcnJheShmaW5kRnJvbUhpZXJhcmNoeSh0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5nZXREYXRhKCksIHNlYXJjaGluZ0ZvcikpO1xyXG4gIH07XHJcblxyXG4gIHNlYXJjaCA9IChzZWFyY2hpbmdGb3IpID0+IHtcclxuICAgIGlmICghdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQgfHwgIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzRGF0YSkgcmV0dXJuIFtdO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBmaWx0ZXIodGhpcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0RGF0YSgpLCBzZWFyY2hpbmdGb3IpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG59XHJcbiJdfQ==