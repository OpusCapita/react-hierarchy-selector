function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import BaseModel from './base';
import ItemEntity from './item.entity';
import GroupEntity from './group.entity';

import Utils from '../utils';

var isFound = function isFound(searchingIn, searchingFor) {
  return searchingIn.toLowerCase().indexOf(searchingFor.toLowerCase()) > -1;
};

var findFromHierarchy = function findFromHierarchy(data, searchingFor) {
  var foundData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var groupNames = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var result = foundData;

  if (data) {
    Object.keys(data).forEach(function (key) {
      var currentItem = new ItemEntity(data[key]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbIkJhc2VNb2RlbCIsIkl0ZW1FbnRpdHkiLCJHcm91cEVudGl0eSIsIlV0aWxzIiwiaXNGb3VuZCIsInNlYXJjaGluZ0luIiwic2VhcmNoaW5nRm9yIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwiZmluZEZyb21IaWVyYXJjaHkiLCJkYXRhIiwiZm91bmREYXRhIiwiZ3JvdXBOYW1lcyIsInJlc3VsdCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY3VycmVudEl0ZW0iLCJpc0NoaWxkcmVuIiwiY2hpbGRyZW4iLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJpZCIsIm5hbWUiLCJncm91cElkIiwibWFwIiwiaSIsImpvaW4iLCJncm91cE5hbWUiLCJ1bmRlZmluZWQiLCJpdGVtcyIsInB1c2giLCJmaWx0ZXIiLCJpdGVtTGlzdCIsIml0ZW0iLCJpdGVtQ29weSIsImFzc2lnbiIsIlNlYXJjaCIsImdldEZvdW5kRnJvbUhpZXJhcmNoeSIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiaXNEYXRhIiwiSGFzaFRvQXJyYXkiLCJnZXREYXRhIiwic2VhcmNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxTQUFQLE1BQXNCLFFBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixlQUF2QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsZ0JBQXhCOztBQUVBLE9BQU9DLEtBQVAsTUFBa0IsVUFBbEI7O0FBRUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFdBQUQsRUFBY0MsWUFBZDtBQUFBLFNBQ2RELFlBQVlFLFdBQVosR0FBMEJDLE9BQTFCLENBQWtDRixhQUFhQyxXQUFiLEVBQWxDLElBQWdFLENBQUMsQ0FEbkQ7QUFBQSxDQUFoQjs7QUFJQSxJQUFNRSxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQU9KLFlBQVAsRUFBeUQ7QUFB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QWtCbkMsa0JBQWtCLE1BQUtnQyxrQkFBTCxDQUF3QkksT0FBeEIsRUFBbEIsRUFBcUR2QyxZQUFyRCxDQUFsQixDQUFQO0FBQ0QsSyxRQUVEd0MsTSxHQUFTLFVBQUN4QyxZQUFELEVBQWtCO0FBQ3pCLFVBQUksQ0FBQyxNQUFLbUMsa0JBQUwsQ0FBd0JDLFFBQXpCLElBQXFDLENBQUMsTUFBS0Qsa0JBQUwsQ0FBd0JFLE1BQWxFLEVBQTBFLE9BQU8sRUFBUDs7QUFFMUUsVUFBTWpDLE9BQU93QixPQUFPLE1BQUtPLGtCQUFMLENBQXdCSSxPQUF4QixFQUFQLEVBQTBDdkMsWUFBMUMsQ0FBYjtBQUNBLGFBQU9JLElBQVA7QUFDRCxLOzs7O0VBWmlDVixTOztTQUFmdUMsTSIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vYmFzZSc7XHJcbmltcG9ydCBJdGVtRW50aXR5IGZyb20gJy4vaXRlbS5lbnRpdHknO1xyXG5pbXBvcnQgR3JvdXBFbnRpdHkgZnJvbSAnLi9ncm91cC5lbnRpdHknO1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGlzRm91bmQgPSAoc2VhcmNoaW5nSW4sIHNlYXJjaGluZ0ZvcikgPT4gKFxyXG4gIHNlYXJjaGluZ0luLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hpbmdGb3IudG9Mb3dlckNhc2UoKSkgPiAtMVxyXG4pO1xyXG5cclxuY29uc3QgZmluZEZyb21IaWVyYXJjaHkgPSAoZGF0YSwgc2VhcmNoaW5nRm9yLCBmb3VuZERhdGEgPSB7fSwgZ3JvdXBOYW1lcyA9IFtdKSA9PiB7XHJcbiAgbGV0IHJlc3VsdCA9IGZvdW5kRGF0YTtcclxuXHJcbiAgaWYgKGRhdGEpIHtcclxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50SXRlbSA9IG5ldyBJdGVtRW50aXR5KGRhdGFba2V5XSk7XHJcbiAgICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBjdXJyZW50SXRlbS5jaGlsZHJlbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KGN1cnJlbnRJdGVtLmNoaWxkcmVuKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xyXG5cclxuICAgICAgaWYgKGlzQ2hpbGRyZW4pIHtcclxuICAgICAgICByZXN1bHQgPSBmaW5kRnJvbUhpZXJhcmNoeShcclxuICAgICAgICAgIGN1cnJlbnRJdGVtLmNoaWxkcmVuLFxyXG4gICAgICAgICAgc2VhcmNoaW5nRm9yLFxyXG4gICAgICAgICAgcmVzdWx0LFxyXG4gICAgICAgICAgWy4uLmdyb3VwTmFtZXMsIHsgaWQ6IGN1cnJlbnRJdGVtLmlkLCBuYW1lOiBjdXJyZW50SXRlbS5uYW1lIH1dLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEl0ZW0ubmFtZSAmJiBpc0ZvdW5kKGN1cnJlbnRJdGVtLm5hbWUsIHNlYXJjaGluZ0ZvcikpIHtcclxuICAgICAgICBjb25zdCBncm91cElkID0gZ3JvdXBOYW1lcy5tYXAoaSA9PiBpLmlkKS5qb2luKCdfJyk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZ3JvdXBOYW1lcy5tYXAoaSA9PiBpLm5hbWUpLmpvaW4oJyAvICcpO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0W2dyb3VwSWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJlc3VsdFtncm91cElkXSA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHRbZ3JvdXBJZF0uaXRlbXMucHVzaChjdXJyZW50SXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGZpbHRlcihkYXRhLCBzZWFyY2hpbmdGb3IpIHtcclxuICBjb25zdCBpdGVtTGlzdCA9IFtdO1xyXG5cclxuICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMDtcclxuXHJcbiAgICBpZiAoaXNDaGlsZHJlbikge1xyXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGZpbHRlcihpdGVtLmNoaWxkcmVuLCBzZWFyY2hpbmdGb3IpO1xyXG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XHJcbiAgICAgICAgaXRlbUNvcHkuY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW1Db3B5KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpc0ZvdW5kKGl0ZW0ubmFtZSwgc2VhcmNoaW5nRm9yKSkge1xyXG4gICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xyXG4gICAgICBpdGVtTGlzdC5wdXNoKGl0ZW1Db3B5KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGl0ZW1MaXN0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyBCYXNlTW9kZWwge1xyXG4gIGdldEZvdW5kRnJvbUhpZXJhcmNoeSA9IChzZWFyY2hpbmdGb3IpID0+IHtcclxuICAgIGlmICghdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQgfHwgIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzRGF0YSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIFV0aWxzLkhhc2hUb0FycmF5KGZpbmRGcm9tSGllcmFyY2h5KHRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldERhdGEoKSwgc2VhcmNoaW5nRm9yKSk7XHJcbiAgfTtcclxuXHJcbiAgc2VhcmNoID0gKHNlYXJjaGluZ0ZvcikgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCB8fCAhdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNEYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGZpbHRlcih0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5nZXREYXRhKCksIHNlYXJjaGluZ0Zvcik7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcbn1cclxuIl19