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
  return searchingIn && searchingIn.toLowerCase && searchingFor && searchingFor.toLowerCase && searchingIn.toLowerCase().indexOf(searchingFor.toLowerCase()) > -1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImlzRm91bmQiLCJzZWFyY2hpbmdJbiIsInNlYXJjaGluZ0ZvciIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImZpbmRGcm9tSGllcmFyY2h5IiwiZGF0YSIsImZvdW5kRGF0YSIsImdyb3VwTmFtZXMiLCJwYXJlbnRJZCIsInJlc3VsdCIsImZvckVhY2giLCJpdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicGFyZW50SWRzIiwibWFwIiwiaSIsImlkIiwiY3VycmVudEl0ZW0iLCJpc0NoZWNrZWRBbGwiLCJuYW1lIiwiZ3JvdXBJZCIsImpvaW4iLCJncm91cE5hbWUiLCJ1bmRlZmluZWQiLCJHcm91cEVudGl0eSIsIml0ZW1zIiwicHVzaCIsImZpbHRlciIsIml0ZW1MaXN0IiwiaXRlbUNvcHkiLCJPYmplY3QiLCJhc3NpZ24iLCJTZWFyY2giLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsImlzRGF0YSIsIlV0aWxzIiwiSGFzaFRvQXJyYXkiLCJnZXREYXRhIiwiQmFzZU1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7OztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFDQyxXQUFELEVBQWNDLFlBQWQ7QUFBQSxTQUNkRCxXQUFXLElBQ1JBLFdBQVcsQ0FBQ0UsV0FEZixJQUVHRCxZQUZILElBR0dBLFlBQVksQ0FBQ0MsV0FIaEIsSUFJR0YsV0FBVyxDQUFDRSxXQUFaLEdBQTBCQyxPQUExQixDQUFrQ0YsWUFBWSxDQUFDQyxXQUFiLEVBQWxDLElBQWdFLENBQUMsQ0FMdEQ7QUFBQSxDQUFoQjs7QUFRQSxJQUFNRSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLElBQUQsRUFBT0osWUFBUCxFQUFxQkssU0FBckIsRUFBcUNDLFVBQXJDLEVBQXNE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ZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgR3JvdXBFbnRpdHkgZnJvbSAnLi9ncm91cC5lbnRpdHknO1xuXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBpc0ZvdW5kID0gKHNlYXJjaGluZ0luLCBzZWFyY2hpbmdGb3IpID0+IChcbiAgc2VhcmNoaW5nSW5cbiAgJiYgc2VhcmNoaW5nSW4udG9Mb3dlckNhc2VcbiAgJiYgc2VhcmNoaW5nRm9yXG4gICYmIHNlYXJjaGluZ0Zvci50b0xvd2VyQ2FzZVxuICAmJiBzZWFyY2hpbmdJbi50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoaW5nRm9yLnRvTG93ZXJDYXNlKCkpID4gLTFcbik7XG5cbmNvbnN0IGZpbmRGcm9tSGllcmFyY2h5ID0gKGRhdGEsIHNlYXJjaGluZ0ZvciwgZm91bmREYXRhID0ge30sIGdyb3VwTmFtZXMgPSBbXSwgcGFyZW50SWQgPSBudWxsKSA9PiB7XG4gIGxldCByZXN1bHQgPSBmb3VuZERhdGE7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSBncm91cE5hbWVzLm1hcChpID0+IGkuaWQpO1xuICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSB7XG4gICAgICAgIHBhcmVudElkLFxuICAgICAgICBwYXJlbnRJZHMsXG4gICAgICAgIGlzQ2hpbGRyZW4sXG4gICAgICAgIGlzQ2hlY2tlZEFsbDogaXNDaGlsZHJlbixcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgIH07XG5cbiAgICAgIGlmIChpc0NoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdCA9IGZpbmRGcm9tSGllcmFyY2h5KFxuICAgICAgICAgIGN1cnJlbnRJdGVtLmNoaWxkcmVuLFxuICAgICAgICAgIHNlYXJjaGluZ0ZvcixcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgWy4uLmdyb3VwTmFtZXMsIHsgaWQ6IGN1cnJlbnRJdGVtLmlkLCBuYW1lOiBjdXJyZW50SXRlbS5uYW1lIH1dLFxuICAgICAgICAgIGN1cnJlbnRJdGVtLmlkLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SXRlbS5uYW1lICYmIGlzRm91bmQoY3VycmVudEl0ZW0ubmFtZSwgc2VhcmNoaW5nRm9yKSkge1xuICAgICAgICBjb25zdCBncm91cElkID0gcGFyZW50SWRzLmpvaW4oJ18nKTtcbiAgICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZ3JvdXBOYW1lcy5tYXAoaSA9PiBpLm5hbWUpLmpvaW4oJyAvICcpO1xuXG4gICAgICAgIGlmIChyZXN1bHRbZ3JvdXBJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdFtncm91cElkXSA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFtncm91cElkXS5pdGVtcy5wdXNoKGN1cnJlbnRJdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIoZGF0YSwgc2VhcmNoaW5nRm9yKSB7XG4gIGNvbnN0IGl0ZW1MaXN0ID0gW107XG5cbiAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgaXNDaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGlzQ2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gZmlsdGVyKGl0ZW0uY2hpbGRyZW4sIHNlYXJjaGluZ0Zvcik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgICBpdGVtQ29weS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW1Db3B5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRm91bmQoaXRlbS5uYW1lLCBzZWFyY2hpbmdGb3IpKSB7XG4gICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgaXRlbUxpc3QucHVzaChpdGVtQ29weSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaXRlbUxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gIGdldEZvdW5kRnJvbUhpZXJhcmNoeSA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBVdGlscy5IYXNoVG9BcnJheShmaW5kRnJvbUhpZXJhcmNoeSh0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5nZXREYXRhKCksIHNlYXJjaGluZ0ZvcikpO1xuICB9O1xuXG4gIHNlYXJjaCA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGRhdGEgPSBmaWx0ZXIodGhpcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0RGF0YSgpLCBzZWFyY2hpbmdGb3IpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG4iXX0=