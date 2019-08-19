var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ColumnData from './column-data';
import BaseModel from '../base';
import Search from '../search';
import Utils from '../../utils';

var data = new WeakMap();
var list = new WeakMap();
var states = new WeakMap();
var searchingFor = new WeakMap();
var searchModel = new WeakMap();
var selectedPath = new WeakMap();

function _getData(thisObj) {
  return data.get(thisObj) || [];
}

function getDefaultStates() {
  return {
    needToSearch: false
  };
}

function getStates(thisObj) {
  return states.get(thisObj) || {};
}

function setStates(thisObj, stateObj) {
  return states.set(thisObj, stateObj);
}

function refreshData(thisObj) {
  var dataProvider = thisObj.dataSourceProvider;

  if (data.get(thisObj) === null) {
    if (dataProvider.isLoaded) {
      data.set(thisObj, dataProvider.getData());
    }
  }

  if (data.get(thisObj) !== null) {
    var currentStates = getStates(thisObj);

    if (currentStates.needToSearch) {
      var searchinForText = searchingFor.get(thisObj);

      if (Utils.enoughSearchTextLength(searchinForText)) {
        var model = searchModel.get(thisObj);
        data.set(thisObj, model.search(searchinForText));
      } else {
        data.set(thisObj, dataProvider.getData());
      }

      currentStates.needToSearch = false;
      setStates(thisObj, currentStates);
    }
  }
}

var ColumnList = function (_BaseModel) {
  _inherits(ColumnList, _BaseModel);

  function ColumnList(dataSourceProvider) {
    _classCallCheck(this, ColumnList);

    var _this = _possibleConstructorReturn(this, _BaseModel.call(this, dataSourceProvider));

    _this.setSearchingFor = function (text) {
      var currentSearchingFor = searchingFor.get(_this);

      if (currentSearchingFor !== text) {
        var currentStates = getStates(_this);
        currentStates.needToSearch = true;
        setStates(_this, currentStates);
        searchingFor.set(_this, text);
      }
    };

    data.set(_this, null);
    list.set(_this, []);
    states.set(_this, getDefaultStates());
    searchingFor.set(_this, '');
    searchModel.set(_this, new Search(dataSourceProvider));
    selectedPath.set(_this, []);
    return _this;
  }

  ColumnList.prototype.getData = function getData() {
    return _getData(this);
  };

  /**
   * Method recalculate selected paths and fills list of columns
   * @param {number} level The selected level (column)
   * @param {number} id The ID of selected item in a column
   */
  ColumnList.prototype.refresh = function refresh(level) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var listOfColumns = list.get(this);
    var path = selectedPath.get(this);

    var cleanLevel = level && level > 0 ? level - 1 : 0;

    refreshData(this);

    path.splice(cleanLevel);
    listOfColumns.splice(0);

    if (id !== null) {
      path.push(id);
    }

    if (listOfColumns.length === 0) {
      listOfColumns.push(new ColumnData(null, _getData(this)));
    }

    path.forEach(function (selectedId, thisLevel) {
      var nextLevel = thisLevel + 1;

      var item = listOfColumns[thisLevel] ? listOfColumns[thisLevel].items.find(function (el) {
        return el.id === selectedId;
      }) : null;

      if (item && item.children && item.children.length > 0) {
        if (nextLevel >= listOfColumns.length) {
          listOfColumns.push(new ColumnData());
        }
        if (listOfColumns[nextLevel].parentId !== selectedId) {
          listOfColumns[nextLevel].parentId = selectedId;
          listOfColumns[nextLevel].items = item.children;
        }
      }
    });
  };

  _createClass(ColumnList, [{
    key: 'length',
    get: function get() {
      return list.get(this).length;
    }
  }, {
    key: 'list',
    get: function get() {
      return list.get(this);
    }
  }, {
    key: 'selectedPath',
    get: function get() {
      return selectedPath.get(this);
    }
  }]);

  return ColumnList;
}(BaseModel);

export { ColumnList as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0LmpzIl0sIm5hbWVzIjpbIkNvbHVtbkRhdGEiLCJCYXNlTW9kZWwiLCJTZWFyY2giLCJVdGlscyIsImRhdGEiLCJXZWFrTWFwIiwibGlzdCIsInN0YXRlcyIsInNlYXJjaGluZ0ZvciIsInNlYXJjaE1vZGVsIiwic2VsZWN0ZWRQYXRoIiwiZ2V0RGF0YSIsInRoaXNPYmoiLCJnZXQiLCJnZXREZWZhdWx0U3RhdGVzIiwibmVlZFRvU2VhcmNoIiwiZ2V0U3RhdGVzIiwic2V0U3RhdGVzIiwic3RhdGVPYmoiLCJzZXQiLCJyZWZyZXNoRGF0YSIsImRhdGFQcm92aWRlciIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiY3VycmVudFN0YXRlcyIsInNlYXJjaGluRm9yVGV4dCIsImVub3VnaFNlYXJjaFRleHRMZW5ndGgiLCJtb2RlbCIsInNlYXJjaCIsIkNvbHVtbkxpc3QiLCJzZXRTZWFyY2hpbmdGb3IiLCJ0ZXh0IiwiY3VycmVudFNlYXJjaGluZ0ZvciIsInJlZnJlc2giLCJsZXZlbCIsImlkIiwibGlzdE9mQ29sdW1ucyIsInBhdGgiLCJjbGVhbkxldmVsIiwic3BsaWNlIiwicHVzaCIsImxlbmd0aCIsImZvckVhY2giLCJzZWxlY3RlZElkIiwidGhpc0xldmVsIiwibmV4dExldmVsIiwiaXRlbSIsIml0ZW1zIiwiZmluZCIsImVsIiwiY2hpbGRyZW4iLCJwYXJlbnRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxVQUFQLE1BQXVCLGVBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixTQUF0QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsV0FBbkI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCOztBQUVBLElBQU1DLE9BQU8sSUFBSUMsT0FBSixFQUFiO0FBQ0EsSUFBTUMsT0FBTyxJQUFJRCxPQUFKLEVBQWI7QUFDQSxJQUFNRSxTQUFTLElBQUlGLE9BQUosRUFBZjtBQUNBLElBQU1HLGVBQWUsSUFBSUgsT0FBSixFQUFyQjtBQUNBLElBQU1JLGNBQWMsSUFBSUosT0FBSixFQUFwQjtBQUNBLElBQU1LLGVBQWUsSUFBSUwsT0FBSixFQUFyQjs7QUFFQSxTQUFTTSxRQUFULENBQWlCQyxPQUFqQixFQUEwQjtBQUN4QixTQUFPUixLQUFLUyxHQUFMLENBQVNELE9BQVQsS0FBcUIsRUFBNUI7QUFDRDs7QUFFRCxTQUFTRSxnQkFBVCxHQUE0QjtBQUMxQixTQUFPO0FBQ0xDLGtCQUFjO0FBRFQsR0FBUDtBQUdEOztBQUVELFNBQVNDLFNBQVQsQ0FBbUJKLE9BQW5CLEVBQTRCO0FBQzFCLFNBQU9MLE9BQU9NLEdBQVAsQ0FBV0QsT0FBWCxLQUF1QixFQUE5QjtBQUNEOztBQUVELFNBQVNLLFNBQVQsQ0FBbUJMLE9BQW5CLEVBQTRCTSxRQUE1QixFQUFzQztBQUNwQyxTQUFPWCxPQUFPWSxHQUFQLENBQVdQLE9BQVgsRUFBb0JNLFFBQXBCLENBQVA7QUFDRDs7QUFFRCxTQUFTRSxXQUFULENBQXFCUixPQUFyQixFQUE4QjtBQUM1QixNQUFNUyxlQUFlVCxRQUFRVSxrQkFBN0I7O0FBRUEsTUFBSWxCLEtBQUtTLEdBQUwsQ0FBU0QsT0FBVCxNQUFzQixJQUExQixFQUFnQztBQUM5QixRQUFJUyxhQUFhRSxRQUFqQixFQUEyQjtBQUN6Qm5CLFdBQUtlLEdBQUwsQ0FBU1AsT0FBVCxFQUFrQlMsYUFBYVYsT0FBYixFQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsTUFBSVAsS0FBS1MsR0FBTCxDQUFTRCxPQUFULE1BQXNCLElBQTFCLEVBQWdDO0FBQzlCLFFBQU1ZLGdCQUFnQlIsVUFBVUosT0FBVixDQUF0Qjs7QUFFQSxRQUFJWSxjQUFjVCxZQUFsQixFQUFnQztBQUM5QixVQUFNVSxrQkFBa0JqQixhQUFhSyxHQUFiLENBQWlCRCxPQUFqQixDQUF4Qjs7QUFFQSxVQUFJVCxNQUFNdUIsc0JBQU4sQ0FBNkJELGVBQTdCLENBQUosRUFBbUQ7QUFDakQsWUFBTUUsUUFBUWxCLFlBQVlJLEdBQVosQ0FBZ0JELE9BQWhCLENBQWQ7QUFDQVIsYUFBS2UsR0FBTCxDQUFTUCxPQUFULEVBQWtCZSxNQUFNQyxNQUFOLENBQWFILGVBQWIsQ0FBbEI7QUFDRCxPQUhELE1BR087QUFDTHJCLGFBQUtlLEdBQUwsQ0FBU1AsT0FBVCxFQUFrQlMsYUFBYVYsT0FBYixFQUFsQjtBQUNEOztBQUVEYSxvQkFBY1QsWUFBZCxHQUE2QixLQUE3QjtBQUNBRSxnQkFBVUwsT0FBVixFQUFtQlksYUFBbkI7QUFDRDtBQUNGO0FBQ0Y7O0lBRW9CSyxVOzs7QUFDbkIsc0JBQVlQLGtCQUFaLEVBQWdDO0FBQUE7O0FBQUEsaURBQzlCLHNCQUFNQSxrQkFBTixDQUQ4Qjs7QUFBQSxVQTJCaENRLGVBM0JnQyxHQTJCZCxVQUFDQyxJQUFELEVBQVU7QUFDMUIsVUFBTUMsc0JBQXNCeEIsYUFBYUssR0FBYixPQUE1Qjs7QUFFQSxVQUFJbUIsd0JBQXdCRCxJQUE1QixFQUFrQztBQUNoQyxZQUFNUCxnQkFBZ0JSLGdCQUF0QjtBQUNBUSxzQkFBY1QsWUFBZCxHQUE2QixJQUE3QjtBQUNBRSx5QkFBZ0JPLGFBQWhCO0FBQ0FoQixxQkFBYVcsR0FBYixRQUF1QlksSUFBdkI7QUFDRDtBQUNGLEtBcEMrQjs7QUFHOUIzQixTQUFLZSxHQUFMLFFBQWUsSUFBZjtBQUNBYixTQUFLYSxHQUFMLFFBQWUsRUFBZjtBQUNBWixXQUFPWSxHQUFQLFFBQWlCTCxrQkFBakI7QUFDQU4saUJBQWFXLEdBQWIsUUFBdUIsRUFBdkI7QUFDQVYsZ0JBQVlVLEdBQVosUUFBc0IsSUFBSWpCLE1BQUosQ0FBV29CLGtCQUFYLENBQXRCO0FBQ0FaLGlCQUFhUyxHQUFiLFFBQXVCLEVBQXZCO0FBUjhCO0FBUy9COzt1QkFjRFIsTyxzQkFBVTtBQUNSLFdBQU9BLFNBQVEsSUFBUixDQUFQO0FBQ0QsRzs7QUFhRDs7Ozs7dUJBS0FzQixPLG9CQUFRQyxLLEVBQWtCO0FBQUEsUUFBWEMsRUFBVyx1RUFBTixJQUFNOztBQUN4QixRQUFNQyxnQkFBZ0I5QixLQUFLTyxHQUFMLENBQVMsSUFBVCxDQUF0QjtBQUNBLFFBQU13QixPQUFPM0IsYUFBYUcsR0FBYixDQUFpQixJQUFqQixDQUFiOztBQUVBLFFBQU15QixhQUFhSixTQUFTQSxRQUFRLENBQWpCLEdBQXFCQSxRQUFRLENBQTdCLEdBQWlDLENBQXBEOztBQUVBZCxnQkFBWSxJQUFaOztBQUVBaUIsU0FBS0UsTUFBTCxDQUFZRCxVQUFaO0FBQ0FGLGtCQUFjRyxNQUFkLENBQXFCLENBQXJCOztBQUVBLFFBQUlKLE9BQU8sSUFBWCxFQUFpQjtBQUNmRSxXQUFLRyxJQUFMLENBQVVMLEVBQVY7QUFDRDs7QUFFRCxRQUFJQyxjQUFjSyxNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzlCTCxvQkFBY0ksSUFBZCxDQUFtQixJQUFJeEMsVUFBSixDQUFlLElBQWYsRUFBcUJXLFNBQVEsSUFBUixDQUFyQixDQUFuQjtBQUNEOztBQUVEMEIsU0FBS0ssT0FBTCxDQUFhLFVBQUNDLFVBQUQsRUFBYUMsU0FBYixFQUEyQjtBQUN0QyxVQUFNQyxZQUFZRCxZQUFZLENBQTlCOztBQUVBLFVBQU1FLE9BQU9WLGNBQWNRLFNBQWQsSUFDWFIsY0FBY1EsU0FBZCxFQUF5QkcsS0FBekIsQ0FBK0JDLElBQS9CLENBQW9DO0FBQUEsZUFBT0MsR0FBR2QsRUFBSCxLQUFVUSxVQUFqQjtBQUFBLE9BQXBDLENBRFcsR0FDeUQsSUFEdEU7O0FBR0EsVUFBSUcsUUFBUUEsS0FBS0ksUUFBYixJQUF5QkosS0FBS0ksUUFBTCxDQUFjVCxNQUFkLEdBQXVCLENBQXBELEVBQXVEO0FBQ3JELFlBQUlJLGFBQWFULGNBQWNLLE1BQS9CLEVBQXVDO0FBQ3JDTCx3QkFBY0ksSUFBZCxDQUFtQixJQUFJeEMsVUFBSixFQUFuQjtBQUNEO0FBQ0QsWUFBSW9DLGNBQWNTLFNBQWQsRUFBeUJNLFFBQXpCLEtBQXNDUixVQUExQyxFQUFzRDtBQUNwRFAsd0JBQWNTLFNBQWQsRUFBeUJNLFFBQXpCLEdBQW9DUixVQUFwQztBQUNBUCx3QkFBY1MsU0FBZCxFQUF5QkUsS0FBekIsR0FBaUNELEtBQUtJLFFBQXRDO0FBQ0Q7QUFDRjtBQUNGLEtBZkQ7QUFnQkQsRzs7Ozt3QkFuRVk7QUFDWCxhQUFPNUMsS0FBS08sR0FBTCxDQUFTLElBQVQsRUFBZTRCLE1BQXRCO0FBQ0Q7Ozt3QkFFVTtBQUNULGFBQU9uQyxLQUFLTyxHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0Q7Ozt3QkFFa0I7QUFDakIsYUFBT0gsYUFBYUcsR0FBYixDQUFpQixJQUFqQixDQUFQO0FBQ0Q7Ozs7RUF0QnFDWixTOztTQUFuQjRCLFUiLCJmaWxlIjoiY29sdW1uLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29sdW1uRGF0YSBmcm9tICcuL2NvbHVtbi1kYXRhJztcbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL3NlYXJjaCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5jb25zdCBkYXRhID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGxpc3QgPSBuZXcgV2Vha01hcCgpO1xuY29uc3Qgc3RhdGVzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHNlYXJjaGluZ0ZvciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzZWFyY2hNb2RlbCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzZWxlY3RlZFBhdGggPSBuZXcgV2Vha01hcCgpO1xuXG5mdW5jdGlvbiBnZXREYXRhKHRoaXNPYmopIHtcbiAgcmV0dXJuIGRhdGEuZ2V0KHRoaXNPYmopIHx8IFtdO1xufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0U3RhdGVzKCkge1xuICByZXR1cm4ge1xuICAgIG5lZWRUb1NlYXJjaDogZmFsc2UsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFN0YXRlcyh0aGlzT2JqKSB7XG4gIHJldHVybiBzdGF0ZXMuZ2V0KHRoaXNPYmopIHx8IHt9O1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0ZXModGhpc09iaiwgc3RhdGVPYmopIHtcbiAgcmV0dXJuIHN0YXRlcy5zZXQodGhpc09iaiwgc3RhdGVPYmopO1xufVxuXG5mdW5jdGlvbiByZWZyZXNoRGF0YSh0aGlzT2JqKSB7XG4gIGNvbnN0IGRhdGFQcm92aWRlciA9IHRoaXNPYmouZGF0YVNvdXJjZVByb3ZpZGVyO1xuXG4gIGlmIChkYXRhLmdldCh0aGlzT2JqKSA9PT0gbnVsbCkge1xuICAgIGlmIChkYXRhUHJvdmlkZXIuaXNMb2FkZWQpIHtcbiAgICAgIGRhdGEuc2V0KHRoaXNPYmosIGRhdGFQcm92aWRlci5nZXREYXRhKCkpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkYXRhLmdldCh0aGlzT2JqKSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZXMgPSBnZXRTdGF0ZXModGhpc09iaik7XG5cbiAgICBpZiAoY3VycmVudFN0YXRlcy5uZWVkVG9TZWFyY2gpIHtcbiAgICAgIGNvbnN0IHNlYXJjaGluRm9yVGV4dCA9IHNlYXJjaGluZ0Zvci5nZXQodGhpc09iaik7XG5cbiAgICAgIGlmIChVdGlscy5lbm91Z2hTZWFyY2hUZXh0TGVuZ3RoKHNlYXJjaGluRm9yVGV4dCkpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBzZWFyY2hNb2RlbC5nZXQodGhpc09iaik7XG4gICAgICAgIGRhdGEuc2V0KHRoaXNPYmosIG1vZGVsLnNlYXJjaChzZWFyY2hpbkZvclRleHQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEuc2V0KHRoaXNPYmosIGRhdGFQcm92aWRlci5nZXREYXRhKCkpO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U3RhdGVzLm5lZWRUb1NlYXJjaCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGVzKHRoaXNPYmosIGN1cnJlbnRTdGF0ZXMpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5MaXN0IGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgY29uc3RydWN0b3IoZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gICAgc3VwZXIoZGF0YVNvdXJjZVByb3ZpZGVyKTtcblxuICAgIGRhdGEuc2V0KHRoaXMsIG51bGwpO1xuICAgIGxpc3Quc2V0KHRoaXMsIFtdKTtcbiAgICBzdGF0ZXMuc2V0KHRoaXMsIGdldERlZmF1bHRTdGF0ZXMoKSk7XG4gICAgc2VhcmNoaW5nRm9yLnNldCh0aGlzLCAnJyk7XG4gICAgc2VhcmNoTW9kZWwuc2V0KHRoaXMsIG5ldyBTZWFyY2goZGF0YVNvdXJjZVByb3ZpZGVyKSk7XG4gICAgc2VsZWN0ZWRQYXRoLnNldCh0aGlzLCBbXSk7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiBsaXN0LmdldCh0aGlzKS5sZW5ndGg7XG4gIH1cblxuICBnZXQgbGlzdCgpIHtcbiAgICByZXR1cm4gbGlzdC5nZXQodGhpcyk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRQYXRoKCkge1xuICAgIHJldHVybiBzZWxlY3RlZFBhdGguZ2V0KHRoaXMpO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gZ2V0RGF0YSh0aGlzKTtcbiAgfVxuXG4gIHNldFNlYXJjaGluZ0ZvciA9ICh0ZXh0KSA9PiB7XG4gICAgY29uc3QgY3VycmVudFNlYXJjaGluZ0ZvciA9IHNlYXJjaGluZ0Zvci5nZXQodGhpcyk7XG5cbiAgICBpZiAoY3VycmVudFNlYXJjaGluZ0ZvciAhPT0gdGV4dCkge1xuICAgICAgY29uc3QgY3VycmVudFN0YXRlcyA9IGdldFN0YXRlcyh0aGlzKTtcbiAgICAgIGN1cnJlbnRTdGF0ZXMubmVlZFRvU2VhcmNoID0gdHJ1ZTtcbiAgICAgIHNldFN0YXRlcyh0aGlzLCBjdXJyZW50U3RhdGVzKTtcbiAgICAgIHNlYXJjaGluZ0Zvci5zZXQodGhpcywgdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCByZWNhbGN1bGF0ZSBzZWxlY3RlZCBwYXRocyBhbmQgZmlsbHMgbGlzdCBvZiBjb2x1bW5zXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCBUaGUgc2VsZWN0ZWQgbGV2ZWwgKGNvbHVtbilcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIFRoZSBJRCBvZiBzZWxlY3RlZCBpdGVtIGluIGEgY29sdW1uXG4gICAqL1xuICByZWZyZXNoKGxldmVsLCBpZCA9IG51bGwpIHtcbiAgICBjb25zdCBsaXN0T2ZDb2x1bW5zID0gbGlzdC5nZXQodGhpcyk7XG4gICAgY29uc3QgcGF0aCA9IHNlbGVjdGVkUGF0aC5nZXQodGhpcyk7XG5cbiAgICBjb25zdCBjbGVhbkxldmVsID0gbGV2ZWwgJiYgbGV2ZWwgPiAwID8gbGV2ZWwgLSAxIDogMDtcblxuICAgIHJlZnJlc2hEYXRhKHRoaXMpO1xuXG4gICAgcGF0aC5zcGxpY2UoY2xlYW5MZXZlbCk7XG4gICAgbGlzdE9mQ29sdW1ucy5zcGxpY2UoMCk7XG5cbiAgICBpZiAoaWQgIT09IG51bGwpIHtcbiAgICAgIHBhdGgucHVzaChpZCk7XG4gICAgfVxuXG4gICAgaWYgKGxpc3RPZkNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBsaXN0T2ZDb2x1bW5zLnB1c2gobmV3IENvbHVtbkRhdGEobnVsbCwgZ2V0RGF0YSh0aGlzKSkpO1xuICAgIH1cblxuICAgIHBhdGguZm9yRWFjaCgoc2VsZWN0ZWRJZCwgdGhpc0xldmVsKSA9PiB7XG4gICAgICBjb25zdCBuZXh0TGV2ZWwgPSB0aGlzTGV2ZWwgKyAxO1xuXG4gICAgICBjb25zdCBpdGVtID0gbGlzdE9mQ29sdW1uc1t0aGlzTGV2ZWxdID9cbiAgICAgICAgbGlzdE9mQ29sdW1uc1t0aGlzTGV2ZWxdLml0ZW1zLmZpbmQoZWwgPT4gKGVsLmlkID09PSBzZWxlY3RlZElkKSkgOiBudWxsO1xuXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAobmV4dExldmVsID49IGxpc3RPZkNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgbGlzdE9mQ29sdW1ucy5wdXNoKG5ldyBDb2x1bW5EYXRhKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0T2ZDb2x1bW5zW25leHRMZXZlbF0ucGFyZW50SWQgIT09IHNlbGVjdGVkSWQpIHtcbiAgICAgICAgICBsaXN0T2ZDb2x1bW5zW25leHRMZXZlbF0ucGFyZW50SWQgPSBzZWxlY3RlZElkO1xuICAgICAgICAgIGxpc3RPZkNvbHVtbnNbbmV4dExldmVsXS5pdGVtcyA9IGl0ZW0uY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19