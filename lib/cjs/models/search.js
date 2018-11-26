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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImlzRm91bmQiLCJzZWFyY2hpbmdJbiIsInNlYXJjaGluZ0ZvciIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImZpbmRGcm9tSGllcmFyY2h5IiwiZGF0YSIsImZvdW5kRGF0YSIsImdyb3VwTmFtZXMiLCJwYXJlbnRJZCIsInJlc3VsdCIsImZvckVhY2giLCJpdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicGFyZW50SWRzIiwibWFwIiwiaSIsImlkIiwiY3VycmVudEl0ZW0iLCJpc0NoZWNrZWRBbGwiLCJuYW1lIiwiZ3JvdXBJZCIsImpvaW4iLCJncm91cE5hbWUiLCJ1bmRlZmluZWQiLCJHcm91cEVudGl0eSIsIml0ZW1zIiwicHVzaCIsImZpbHRlciIsIml0ZW1MaXN0IiwiaXRlbUNvcHkiLCJPYmplY3QiLCJhc3NpZ24iLCJTZWFyY2giLCJnZXRGb3VuZEZyb21IaWVyYXJjaHkiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsImlzRGF0YSIsIlV0aWxzIiwiSGFzaFRvQXJyYXkiLCJnZXREYXRhIiwic2VhcmNoIiwiQmFzZU1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7OztrUUFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsV0FBRCxFQUFjQyxZQUFkO0FBQUEsU0FDZEQsWUFBWUUsV0FBWixHQUEwQkMsT0FBMUIsQ0FBa0NGLGFBQWFDLFdBQWIsRUFBbEMsSUFBZ0UsQ0FBQyxDQURuRDtBQUFBLENBQWhCOztBQUlBLElBQU1FLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNDLElBQUQsRUFBT0osWUFBUCxFQUEwRTtBQUFBLE1BQXJESyxTQUFxRCx1RUFBekMsRUFBeUM7QUFBQSxNQUFyQ0MsVUFBcUMsdUVBQXhCLEVBQXdCO0FBQUEs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LGtCQUFrQixNQUFLa0Msa0JBQUwsQ0FBd0JLLE9BQXhCLEVBQWxCLEVBQXFEMUMsWUFBckQsQ0FBbEIsQ0FBUDtBQUNELEssUUFFRDJDLE0sR0FBUyxVQUFDM0MsWUFBRCxFQUFrQjtBQUN6QixVQUFJLENBQUMsTUFBS3FDLGtCQUFMLENBQXdCQyxRQUF6QixJQUFxQyxDQUFDLE1BQUtELGtCQUFMLENBQXdCRSxNQUFsRSxFQUEwRSxPQUFPLEVBQVA7O0FBRTFFLFVBQU1uQyxPQUFPMEIsT0FBTyxNQUFLTyxrQkFBTCxDQUF3QkssT0FBeEIsRUFBUCxFQUEwQzFDLFlBQTFDLENBQWI7QUFDQSxhQUFPSSxJQUFQO0FBQ0QsSzs7OztFQVhpQ3dDLGM7O2tCQUFmVCxNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuL2dyb3VwLmVudGl0eSc7XG5cbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGlzRm91bmQgPSAoc2VhcmNoaW5nSW4sIHNlYXJjaGluZ0ZvcikgPT4gKFxuICBzZWFyY2hpbmdJbi50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoaW5nRm9yLnRvTG93ZXJDYXNlKCkpID4gLTFcbik7XG5cbmNvbnN0IGZpbmRGcm9tSGllcmFyY2h5ID0gKGRhdGEsIHNlYXJjaGluZ0ZvciwgZm91bmREYXRhID0ge30sIGdyb3VwTmFtZXMgPSBbXSwgcGFyZW50SWQgPSBudWxsKSA9PiB7XG4gIGxldCByZXN1bHQgPSBmb3VuZERhdGE7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSBncm91cE5hbWVzLm1hcChpID0+IGkuaWQpO1xuICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSB7XG4gICAgICAgIHBhcmVudElkLFxuICAgICAgICBwYXJlbnRJZHMsXG4gICAgICAgIGlzQ2hpbGRyZW4sXG4gICAgICAgIGlzQ2hlY2tlZEFsbDogaXNDaGlsZHJlbixcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgIH07XG5cbiAgICAgIGlmIChpc0NoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdCA9IGZpbmRGcm9tSGllcmFyY2h5KFxuICAgICAgICAgIGN1cnJlbnRJdGVtLmNoaWxkcmVuLFxuICAgICAgICAgIHNlYXJjaGluZ0ZvcixcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgWy4uLmdyb3VwTmFtZXMsIHsgaWQ6IGN1cnJlbnRJdGVtLmlkLCBuYW1lOiBjdXJyZW50SXRlbS5uYW1lIH1dLFxuICAgICAgICAgIGN1cnJlbnRJdGVtLmlkLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SXRlbS5uYW1lICYmIGlzRm91bmQoY3VycmVudEl0ZW0ubmFtZSwgc2VhcmNoaW5nRm9yKSkge1xuICAgICAgICBjb25zdCBncm91cElkID0gcGFyZW50SWRzLmpvaW4oJ18nKTtcbiAgICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZ3JvdXBOYW1lcy5tYXAoaSA9PiBpLm5hbWUpLmpvaW4oJyAvICcpO1xuXG4gICAgICAgIGlmIChyZXN1bHRbZ3JvdXBJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdFtncm91cElkXSA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFtncm91cElkXS5pdGVtcy5wdXNoKGN1cnJlbnRJdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIoZGF0YSwgc2VhcmNoaW5nRm9yKSB7XG4gIGNvbnN0IGl0ZW1MaXN0ID0gW107XG5cbiAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgaXNDaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGlzQ2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gZmlsdGVyKGl0ZW0uY2hpbGRyZW4sIHNlYXJjaGluZ0Zvcik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgICBpdGVtQ29weS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW1Db3B5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRm91bmQoaXRlbS5uYW1lLCBzZWFyY2hpbmdGb3IpKSB7XG4gICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgaXRlbUxpc3QucHVzaChpdGVtQ29weSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaXRlbUxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gIGdldEZvdW5kRnJvbUhpZXJhcmNoeSA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBVdGlscy5IYXNoVG9BcnJheShmaW5kRnJvbUhpZXJhcmNoeSh0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5nZXREYXRhKCksIHNlYXJjaGluZ0ZvcikpO1xuICB9O1xuXG4gIHNlYXJjaCA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGRhdGEgPSBmaWx0ZXIodGhpcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0RGF0YSgpLCBzZWFyY2hpbmdGb3IpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG4iXX0=