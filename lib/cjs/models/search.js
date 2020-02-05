"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _base = _interopRequireDefault(require("./base"));

var _group = _interopRequireDefault(require("./group.entity"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var isFound = function isFound(searchingIn, searchingFor) {
  return searchingIn.toLowerCase().indexOf(searchingFor.toLowerCase()) > -1;
};

var findFromHierarchy = function findFromHierarchy(data, searchingFor, foundData, groupNames, parentId) {
  if (foundData === void 0) {
    foundData = {};
  }

  if (groupNames === void 0) {
    groupNames = [];
  }

  if (parentId === void 0) {
    parentId = null;
  }

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
        result = findFromHierarchy(currentItem.children, searchingFor, result, [].concat(groupNames, [{
          id: currentItem.id,
          name: currentItem.name
        }]), currentItem.id);
      } else if (currentItem.name && isFound(currentItem.name, searchingFor)) {
        var groupId = parentIds.join('_');
        var groupName = groupNames.map(function (i) {
          return i.name;
        }).join(' / ');

        if (result[groupId] === undefined) {
          result[groupId] = new _group["default"](groupName);
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

var Search =
/*#__PURE__*/
function (_BaseModel) {
  _inheritsLoose(Search, _BaseModel);

  function Search() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BaseModel.call.apply(_BaseModel, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "getFoundFromHierarchy", function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return null;
      return _utils["default"].HashToArray(findFromHierarchy(_this.dataSourceProvider.getData(), searchingFor));
    });

    _defineProperty(_assertThisInitialized(_this), "search", function (searchingFor) {
      if (!_this.dataSourceProvider.isLoaded || !_this.dataSourceProvider.isData) return [];
      var data = filter(_this.dataSourceProvider.getData(), searchingFor);
      return data;
    });

    return _this;
  }

  return Search;
}(_base["default"]);

exports["default"] = Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImlzRm91bmQiLCJzZWFyY2hpbmdJbiIsInNlYXJjaGluZ0ZvciIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImZpbmRGcm9tSGllcmFyY2h5IiwiZGF0YSIsImZvdW5kRGF0YSIsImdyb3VwTmFtZXMiLCJwYXJlbnRJZCIsInJlc3VsdCIsImZvckVhY2giLCJpdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicGFyZW50SWRzIiwibWFwIiwiaSIsImlkIiwiY3VycmVudEl0ZW0iLCJpc0NoZWNrZWRBbGwiLCJuYW1lIiwiZ3JvdXBJZCIsImpvaW4iLCJncm91cE5hbWUiLCJ1bmRlZmluZWQiLCJHcm91cEVudGl0eSIsIml0ZW1zIiwicHVzaCIsImZpbHRlciIsIml0ZW1MaXN0IiwiaXRlbUNvcHkiLCJPYmplY3QiLCJhc3NpZ24iLCJTZWFyY2giLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsImlzRGF0YSIsIlV0aWxzIiwiSGFzaFRvQXJyYXkiLCJnZXREYXRhIiwiQmFzZU1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7OztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFDQyxXQUFELEVBQWNDLFlBQWQ7QUFBQSxTQUNkRCxXQUFXLENBQUNFLFdBQVosR0FBMEJDLE9BQTFCLENBQWtDRixZQUFZLENBQUNDLFdBQWIsRUFBbEMsSUFBZ0UsQ0FBQyxDQURuRDtBQUFBLENBQWhCOztBQUlBLElBQU1FLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFPSixZQUFQLEVBQXFCSyxTQUFyQixFQUFxQ0MsVUFBckMsRUFBc0RDLFFBQXRELEVBQTBFO0FBQUEsTUFBckRGLFNBQXFEO0FBQXJEQSxJQUFBQSxTQUFxRCxHQUF6QyxFQUF5QztBQUFB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QUFqQjtBQUNBc0IsUUFBQUEsUUFBUSxDQUFDcEIsUUFBVCxHQUFvQkEsUUFBcEI7QUFDQW1CLFFBQUFBLFFBQVEsQ0FBQ0YsSUFBVCxDQUFjRyxRQUFkO0FBQ0Q7QUFDRixLQVBELE1BT08sSUFBSWxDLE9BQU8sQ0FBQ1ksSUFBSSxDQUFDWSxJQUFOLEVBQVl0QixZQUFaLENBQVgsRUFBc0M7QUFDM0MsVUFBTWdDLFNBQVEsR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQnhCLElBQWxCLENBQWpCOztBQUNBcUIsTUFBQUEsUUFBUSxDQUFDRixJQUFULENBQWNHLFNBQWQ7QUFDRDtBQUNGLEdBZEQ7QUFnQkEsU0FBT0QsUUFBUDtBQUNEOztJQUVvQkksTTs7Ozs7Ozs7Ozs7Ozs7NEVBQ0ssVUFBQ25DLFlBQUQsRUFBa0I7QUFDeEMsVUFBSSxDQUFDLE1BQUtvQyxrQkFBTCxDQUF3QkMsUUFBekIsSUFBcUMsQ0FBQyxNQUFLRCxrQkFBTCxDQUF3QkUsTUFBbEUsRUFBMEUsT0FBTyxJQUFQO0FBQzFFLGFBQU9DLGtCQUFNQyxXQUFOLENBQWtCckMsaUJBQWlCLENBQUMsTUFBS2lDLGtCQUFMLENBQXdCSyxPQUF4QixFQUFELEVBQW9DekMsWUFBcEMsQ0FBbkMsQ0FBUDtBQUNELEs7OzZEQUVRLFVBQUNBLFlBQUQsRUFBa0I7QUFDekIsVUFBSSxDQUFDLE1BQUtvQyxrQkFBTCxDQUF3QkMsUUFBekIsSUFBcUMsQ0FBQyxNQUFLRCxrQkFBTCxDQUF3QkUsTUFBbEUsRUFBMEUsT0FBTyxFQUFQO0FBRTFFLFVBQU1sQyxJQUFJLEdBQUcwQixNQUFNLENBQUMsTUFBS00sa0JBQUwsQ0FBd0JLLE9BQXhCLEVBQUQsRUFBb0N6QyxZQUFwQyxDQUFuQjtBQUNBLGFBQU9JLElBQVA7QUFDRCxLOzs7Ozs7RUFYaUNzQyxnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuL2dyb3VwLmVudGl0eSc7XG5cbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGlzRm91bmQgPSAoc2VhcmNoaW5nSW4sIHNlYXJjaGluZ0ZvcikgPT4gKFxuICBzZWFyY2hpbmdJbi50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoaW5nRm9yLnRvTG93ZXJDYXNlKCkpID4gLTFcbik7XG5cbmNvbnN0IGZpbmRGcm9tSGllcmFyY2h5ID0gKGRhdGEsIHNlYXJjaGluZ0ZvciwgZm91bmREYXRhID0ge30sIGdyb3VwTmFtZXMgPSBbXSwgcGFyZW50SWQgPSBudWxsKSA9PiB7XG4gIGxldCByZXN1bHQgPSBmb3VuZERhdGE7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSBncm91cE5hbWVzLm1hcChpID0+IGkuaWQpO1xuICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSB7XG4gICAgICAgIHBhcmVudElkLFxuICAgICAgICBwYXJlbnRJZHMsXG4gICAgICAgIGlzQ2hpbGRyZW4sXG4gICAgICAgIGlzQ2hlY2tlZEFsbDogaXNDaGlsZHJlbixcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgIH07XG5cbiAgICAgIGlmIChpc0NoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdCA9IGZpbmRGcm9tSGllcmFyY2h5KFxuICAgICAgICAgIGN1cnJlbnRJdGVtLmNoaWxkcmVuLFxuICAgICAgICAgIHNlYXJjaGluZ0ZvcixcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgWy4uLmdyb3VwTmFtZXMsIHsgaWQ6IGN1cnJlbnRJdGVtLmlkLCBuYW1lOiBjdXJyZW50SXRlbS5uYW1lIH1dLFxuICAgICAgICAgIGN1cnJlbnRJdGVtLmlkLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SXRlbS5uYW1lICYmIGlzRm91bmQoY3VycmVudEl0ZW0ubmFtZSwgc2VhcmNoaW5nRm9yKSkge1xuICAgICAgICBjb25zdCBncm91cElkID0gcGFyZW50SWRzLmpvaW4oJ18nKTtcbiAgICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZ3JvdXBOYW1lcy5tYXAoaSA9PiBpLm5hbWUpLmpvaW4oJyAvICcpO1xuXG4gICAgICAgIGlmIChyZXN1bHRbZ3JvdXBJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdFtncm91cElkXSA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFtncm91cElkXS5pdGVtcy5wdXNoKGN1cnJlbnRJdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIoZGF0YSwgc2VhcmNoaW5nRm9yKSB7XG4gIGNvbnN0IGl0ZW1MaXN0ID0gW107XG5cbiAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgaXNDaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGlzQ2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gZmlsdGVyKGl0ZW0uY2hpbGRyZW4sIHNlYXJjaGluZ0Zvcik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgICBpdGVtQ29weS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW1Db3B5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRm91bmQoaXRlbS5uYW1lLCBzZWFyY2hpbmdGb3IpKSB7XG4gICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgaXRlbUxpc3QucHVzaChpdGVtQ29weSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaXRlbUxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gIGdldEZvdW5kRnJvbUhpZXJhcmNoeSA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBVdGlscy5IYXNoVG9BcnJheShmaW5kRnJvbUhpZXJhcmNoeSh0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5nZXREYXRhKCksIHNlYXJjaGluZ0ZvcikpO1xuICB9O1xuXG4gIHNlYXJjaCA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGRhdGEgPSBmaWx0ZXIodGhpcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0RGF0YSgpLCBzZWFyY2hpbmdGb3IpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG4iXX0=