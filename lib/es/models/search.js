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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbIkJhc2VNb2RlbCIsIkl0ZW1FbnRpdHkiLCJHcm91cEVudGl0eSIsIlV0aWxzIiwiaXNGb3VuZCIsInNlYXJjaGluZ0luIiwic2VhcmNoaW5nRm9yIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwiZmluZEZyb21IaWVyYXJjaHkiLCJkYXRhIiwiZm91bmREYXRhIiwiZ3JvdXBOYW1lcyIsInJlc3VsdCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY3VycmVudEl0ZW0iLCJpc0NoaWxkcmVuIiwiY2hpbGRyZW4iLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJpZCIsIm5hbWUiLCJncm91cElkIiwibWFwIiwiaSIsImpvaW4iLCJncm91cE5hbWUiLCJ1bmRlZmluZWQiLCJpdGVtcyIsInB1c2giLCJmaWx0ZXIiLCJpdGVtTGlzdCIsIml0ZW0iLCJpdGVtQ29weSIsImFzc2lnbiIsIlNlYXJjaCIsImdldEZvdW5kRnJvbUhpZXJhcmNoeSIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiaXNEYXRhIiwiSGFzaFRvQXJyYXkiLCJnZXREYXRhIiwic2VhcmNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxTQUFQLE1BQXNCLFFBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixlQUF2QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsZ0JBQXhCOztBQUVBLE9BQU9DLEtBQVAsTUFBa0IsVUFBbEI7O0FBRUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFdBQUQsRUFBY0MsWUFBZDtBQUFBLFNBQ2RELFlBQVlFLFdBQVosR0FBMEJDLE9BQTFCLENBQWtDRixhQUFhQyxXQUFiLEVBQWxDLElBQWdFLENBQUMsQ0FEbkQ7QUFBQSxDQUFoQjs7QUFJQSxJQUFNRSxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQU9KLFlBQVAsRUFBeUQ7QUFB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QWtCbkMsa0JBQWtCLE1BQUtnQyxrQkFBTCxDQUF3QkksT0FBeEIsRUFBbEIsRUFBcUR2QyxZQUFyRCxDQUFsQixDQUFQO0FBQ0QsSyxRQUVEd0MsTSxHQUFTLFVBQUN4QyxZQUFELEVBQWtCO0FBQ3pCLFVBQUksQ0FBQyxNQUFLbUMsa0JBQUwsQ0FBd0JDLFFBQXpCLElBQXFDLENBQUMsTUFBS0Qsa0JBQUwsQ0FBd0JFLE1BQWxFLEVBQTBFLE9BQU8sRUFBUDs7QUFFMUUsVUFBTWpDLE9BQU93QixPQUFPLE1BQUtPLGtCQUFMLENBQXdCSSxPQUF4QixFQUFQLEVBQTBDdkMsWUFBMUMsQ0FBYjtBQUNBLGFBQU9JLElBQVA7QUFDRCxLOzs7O0VBWmlDVixTOztTQUFmdUMsTSIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgSXRlbUVudGl0eSBmcm9tICcuL2l0ZW0uZW50aXR5JztcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuL2dyb3VwLmVudGl0eSc7XG5cbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGlzRm91bmQgPSAoc2VhcmNoaW5nSW4sIHNlYXJjaGluZ0ZvcikgPT4gKFxuICBzZWFyY2hpbmdJbi50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoaW5nRm9yLnRvTG93ZXJDYXNlKCkpID4gLTFcbik7XG5cbmNvbnN0IGZpbmRGcm9tSGllcmFyY2h5ID0gKGRhdGEsIHNlYXJjaGluZ0ZvciwgZm91bmREYXRhID0ge30sIGdyb3VwTmFtZXMgPSBbXSkgPT4ge1xuICBsZXQgcmVzdWx0ID0gZm91bmREYXRhO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50SXRlbSA9IG5ldyBJdGVtRW50aXR5KGRhdGFba2V5XSk7XG4gICAgICBjb25zdCBpc0NoaWxkcmVuID0gY3VycmVudEl0ZW0uY2hpbGRyZW4gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoY3VycmVudEl0ZW0uY2hpbGRyZW4pICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuXG4gICAgICBpZiAoaXNDaGlsZHJlbikge1xuICAgICAgICByZXN1bHQgPSBmaW5kRnJvbUhpZXJhcmNoeShcbiAgICAgICAgICBjdXJyZW50SXRlbS5jaGlsZHJlbixcbiAgICAgICAgICBzZWFyY2hpbmdGb3IsXG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIFsuLi5ncm91cE5hbWVzLCB7IGlkOiBjdXJyZW50SXRlbS5pZCwgbmFtZTogY3VycmVudEl0ZW0ubmFtZSB9XSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEl0ZW0ubmFtZSAmJiBpc0ZvdW5kKGN1cnJlbnRJdGVtLm5hbWUsIHNlYXJjaGluZ0ZvcikpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBJZCA9IGdyb3VwTmFtZXMubWFwKGkgPT4gaS5pZCkuam9pbignXycpO1xuICAgICAgICBjb25zdCBncm91cE5hbWUgPSBncm91cE5hbWVzLm1hcChpID0+IGkubmFtZSkuam9pbignIC8gJyk7XG5cbiAgICAgICAgaWYgKHJlc3VsdFtncm91cElkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0W2dyb3VwSWRdID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W2dyb3VwSWRdLml0ZW1zLnB1c2goY3VycmVudEl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlcihkYXRhLCBzZWFyY2hpbmdGb3IpIHtcbiAgY29uc3QgaXRlbUxpc3QgPSBbXTtcblxuICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBjb25zdCBpc0NoaWxkcmVuID0gQXJyYXkuaXNBcnJheShpdGVtLmNoaWxkcmVuKSAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoaXNDaGlsZHJlbikge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBmaWx0ZXIoaXRlbS5jaGlsZHJlbiwgc2VhcmNoaW5nRm9yKTtcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICAgIGl0ZW1Db3B5LmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIGl0ZW1MaXN0LnB1c2goaXRlbUNvcHkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNGb3VuZChpdGVtLm5hbWUsIHNlYXJjaGluZ0ZvcikpIHtcbiAgICAgIGNvbnN0IGl0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICBpdGVtTGlzdC5wdXNoKGl0ZW1Db3B5KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpdGVtTGlzdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgZ2V0Rm91bmRGcm9tSGllcmFyY2h5ID0gKHNlYXJjaGluZ0ZvcikgPT4ge1xuICAgIGlmICghdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQgfHwgIXRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzRGF0YSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gVXRpbHMuSGFzaFRvQXJyYXkoZmluZEZyb21IaWVyYXJjaHkodGhpcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0RGF0YSgpLCBzZWFyY2hpbmdGb3IpKTtcbiAgfTtcblxuICBzZWFyY2ggPSAoc2VhcmNoaW5nRm9yKSA9PiB7XG4gICAgaWYgKCF0aGlzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCB8fCAhdGhpcy5kYXRhU291cmNlUHJvdmlkZXIuaXNEYXRhKSByZXR1cm4gW107XG5cbiAgICBjb25zdCBkYXRhID0gZmlsdGVyKHRoaXMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldERhdGEoKSwgc2VhcmNoaW5nRm9yKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19