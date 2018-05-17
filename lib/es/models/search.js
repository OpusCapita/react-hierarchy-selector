function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import BaseModel from './base';
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
      var currentItem = Object.assign({}, data[key]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbIkJhc2VNb2RlbCIsIkdyb3VwRW50aXR5IiwiVXRpbHMiLCJpc0ZvdW5kIiwic2VhcmNoaW5nSW4iLCJzZWFyY2hpbmdGb3IiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJmaW5kRnJvbUhpZXJhcmNoeSIsImRhdGEiLCJmb3VuZERhdGEiLCJncm91cE5hbWVzIiwicmVzdWx0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjdXJyZW50SXRlbSIsImFzc2lnbiIsImlzQ2hpbGRyZW4iLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImlkIiwibmFtZSIsImdyb3VwSWQiLCJtYXAiLCJpIiwiam9pbiIsImdyb3VwTmFtZSIsInVuZGVmaW5lZCIsIml0ZW1zIiwicHVzaCIsImZpbHRlciIsIml0ZW1MaXN0IiwiaXRlbSIsIml0ZW1Db3B5IiwiU2VhcmNoIiwiZ2V0Rm91bmRGcm9tSGllcmFyY2h5IiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJpc0RhdGEiLCJIYXNoVG9BcnJheSIsImdldERhdGEiLCJzZWFyY2giXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLFNBQVAsTUFBc0IsUUFBdEI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLGdCQUF4Qjs7QUFFQSxPQUFPQyxLQUFQLE1BQWtCLFVBQWxCOztBQUVBLElBQU1DLFVBQVUsU0FBVkEsT0FBVSxDQUFDQyxXQUFELEVBQWNDLFlBQWQ7QUFBQSxTQUNkRCxZQUFZRSxXQUFaLEdBQTBCQyxPQUExQixDQUFrQ0YsYUFBYUMsV0FBYixFQUFsQyxJQUFnRSxDQUFDLENBRG5EO0FBQUEsQ0FBaEI7O0FBSUEsSUFBTUUsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFPSixZQUFQLEVBQXlEO0FBQUEsTUFBcENLLFNBQW9DLHVFQUF4QixFQUF3QjtBQUFBLE1BQXBCQyxV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QUF3QkksT0FBeEIsRUFBbEIsRUFBcUR2QyxZQUFyRCxDQUFsQixDQUFQO0FBQ0QsSyxRQUVEd0MsTSxHQUFTLFVBQUN4QyxZQUFELEVBQWtCO0FBQ3pCLFVBQUksQ0FBQyxNQUFLbUMsa0JBQUwsQ0FBd0JDLFFBQXpCLElBQXFDLENBQUMsTUFBS0Qsa0JBQUwsQ0FBd0JFLE1BQWxFLEVBQTBFLE9BQU8sRUFBUDs7QUFFMUUsVUFBTWpDLE9BQU95QixPQUFPLE1BQUtNLGtCQUFMLENBQXdCSSxPQUF4QixFQUFQLEVBQTBDdkMsWUFBMUMsQ0FBYjtBQUNBLGFBQU9JLElBQVA7QUFDRCxLOzs7O0VBWGlDVCxTOztTQUFmc0MsTSIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgR3JvdXBFbnRpdHkgZnJvbSAnLi9ncm91cC5lbnRpdHknO1xuXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBpc0ZvdW5kID0gKHNlYXJjaGluZ0luLCBzZWFyY2hpbmdGb3IpID0+IChcbiAgc2VhcmNoaW5nSW4udG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaGluZ0Zvci50b0xvd2VyQ2FzZSgpKSA+IC0xXG4pO1xuXG5jb25zdCBmaW5kRnJvbUhpZXJhcmNoeSA9IChkYXRhLCBzZWFyY2hpbmdGb3IsIGZvdW5kRGF0YSA9IHt9LCBncm91cE5hbWVzID0gW10pID0+IHtcbiAgbGV0IHJlc3VsdCA9IGZvdW5kRGF0YTtcblxuICBpZiAoZGF0YSkge1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhW2tleV0pO1xuICAgICAgY29uc3QgaXNDaGlsZHJlbiA9IGN1cnJlbnRJdGVtLmNoaWxkcmVuICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KGN1cnJlbnRJdGVtLmNoaWxkcmVuKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMDtcblxuICAgICAgaWYgKGlzQ2hpbGRyZW4pIHtcbiAgICAgICAgcmVzdWx0ID0gZmluZEZyb21IaWVyYXJjaHkoXG4gICAgICAgICAgY3VycmVudEl0ZW0uY2hpbGRyZW4sXG4gICAgICAgICAgc2VhcmNoaW5nRm9yLFxuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICBbLi4uZ3JvdXBOYW1lcywgeyBpZDogY3VycmVudEl0ZW0uaWQsIG5hbWU6IGN1cnJlbnRJdGVtLm5hbWUgfV0sXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJdGVtLm5hbWUgJiYgaXNGb3VuZChjdXJyZW50SXRlbS5uYW1lLCBzZWFyY2hpbmdGb3IpKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwSWQgPSBncm91cE5hbWVzLm1hcChpID0+IGkuaWQpLmpvaW4oJ18nKTtcbiAgICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZ3JvdXBOYW1lcy5tYXAoaSA9PiBpLm5hbWUpLmpvaW4oJyAvICcpO1xuXG4gICAgICAgIGlmIChyZXN1bHRbZ3JvdXBJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdFtncm91cElkXSA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFtncm91cElkXS5pdGVtcy5wdXNoKGN1cnJlbnRJdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIoZGF0YSwgc2VhcmNoaW5nRm9yKSB7XG4gIGNvbnN0IGl0ZW1MaXN0ID0gW107XG5cbiAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgaXNDaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikgJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGlzQ2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gZmlsdGVyKGl0ZW0uY2hpbGRyZW4sIHNlYXJjaGluZ0Zvcik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgICBpdGVtQ29weS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW1Db3B5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRm91bmQoaXRlbS5uYW1lLCBzZWFyY2hpbmdGb3IpKSB7XG4gICAgICBjb25zdCBpdGVtQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgaXRlbUxpc3QucHVzaChpdGVtQ29weSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaXRlbUxpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gIGdldEZvdW5kRnJvbUhpZXJhcmNoeSA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBVdGlscy5IYXNoVG9BcnJheShmaW5kRnJvbUhpZXJhcmNoeSh0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5nZXREYXRhKCksIHNlYXJjaGluZ0ZvcikpO1xuICB9O1xuXG4gIHNlYXJjaCA9IChzZWFyY2hpbmdGb3IpID0+IHtcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkIHx8ICF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0RhdGEpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGRhdGEgPSBmaWx0ZXIodGhpcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0RGF0YSgpLCBzZWFyY2hpbmdGb3IpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG4iXX0=