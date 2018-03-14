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
      var searchinForText = Utils.enoughSearchTextLength(text) ? text : '';
      var currentSearchingFor = searchingFor.get(_this);

      if (currentSearchingFor !== searchinForText) {
        var currentStates = getStates(_this);
        currentStates.needToSearch = true;
        setStates(_this, currentStates);
        searchingFor.set(_this, searchinForText);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0LmpzIl0sIm5hbWVzIjpbIkNvbHVtbkRhdGEiLCJCYXNlTW9kZWwiLCJTZWFyY2giLCJVdGlscyIsImRhdGEiLCJXZWFrTWFwIiwibGlzdCIsInN0YXRlcyIsInNlYXJjaGluZ0ZvciIsInNlYXJjaE1vZGVsIiwic2VsZWN0ZWRQYXRoIiwiZ2V0RGF0YSIsInRoaXNPYmoiLCJnZXQiLCJnZXREZWZhdWx0U3RhdGVzIiwibmVlZFRvU2VhcmNoIiwiZ2V0U3RhdGVzIiwic2V0U3RhdGVzIiwic3RhdGVPYmoiLCJzZXQiLCJyZWZyZXNoRGF0YSIsImRhdGFQcm92aWRlciIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiY3VycmVudFN0YXRlcyIsInNlYXJjaGluRm9yVGV4dCIsImVub3VnaFNlYXJjaFRleHRMZW5ndGgiLCJtb2RlbCIsInNlYXJjaCIsIkNvbHVtbkxpc3QiLCJzZXRTZWFyY2hpbmdGb3IiLCJ0ZXh0IiwiY3VycmVudFNlYXJjaGluZ0ZvciIsInJlZnJlc2giLCJsZXZlbCIsImlkIiwibGlzdE9mQ29sdW1ucyIsInBhdGgiLCJjbGVhbkxldmVsIiwic3BsaWNlIiwicHVzaCIsImxlbmd0aCIsImZvckVhY2giLCJzZWxlY3RlZElkIiwidGhpc0xldmVsIiwibmV4dExldmVsIiwiaXRlbSIsIml0ZW1zIiwiZmluZCIsImVsIiwiY2hpbGRyZW4iLCJwYXJlbnRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxVQUFQLE1BQXVCLGVBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixTQUF0QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsV0FBbkI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCOztBQUVBLElBQU1DLE9BQU8sSUFBSUMsT0FBSixFQUFiO0FBQ0EsSUFBTUMsT0FBTyxJQUFJRCxPQUFKLEVBQWI7QUFDQSxJQUFNRSxTQUFTLElBQUlGLE9B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LFVBQTFDLEVBQXNEO0FBQ3BEUCx3QkFBY1MsU0FBZCxFQUF5Qk0sUUFBekIsR0FBb0NSLFVBQXBDO0FBQ0FQLHdCQUFjUyxTQUFkLEVBQXlCRSxLQUF6QixHQUFpQ0QsS0FBS0ksUUFBdEM7QUFDRDtBQUNGO0FBQ0YsS0FmRDtBQWdCRCxHOzs7O3dCQXBFWTtBQUNYLGFBQU81QyxLQUFLTyxHQUFMLENBQVMsSUFBVCxFQUFlNEIsTUFBdEI7QUFDRDs7O3dCQUVVO0FBQ1QsYUFBT25DLEtBQUtPLEdBQUwsQ0FBUyxJQUFULENBQVA7QUFDRDs7O3dCQUVrQjtBQUNqQixhQUFPSCxhQUFhRyxHQUFiLENBQWlCLElBQWpCLENBQVA7QUFDRDs7OztFQXRCcUNaLFM7O1NBQW5CNEIsVSIsImZpbGUiOiJjb2x1bW4tbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2x1bW5EYXRhIGZyb20gJy4vY29sdW1uLWRhdGEnO1xyXG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL2Jhc2UnO1xyXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL3NlYXJjaCc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XHJcblxyXG5jb25zdCBkYXRhID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgbGlzdCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHN0YXRlcyA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHNlYXJjaGluZ0ZvciA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHNlYXJjaE1vZGVsID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3Qgc2VsZWN0ZWRQYXRoID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbmZ1bmN0aW9uIGdldERhdGEodGhpc09iaikge1xyXG4gIHJldHVybiBkYXRhLmdldCh0aGlzT2JqKSB8fCBbXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFN0YXRlcygpIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmVlZFRvU2VhcmNoOiBmYWxzZSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdGF0ZXModGhpc09iaikge1xyXG4gIHJldHVybiBzdGF0ZXMuZ2V0KHRoaXNPYmopIHx8IHt9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTdGF0ZXModGhpc09iaiwgc3RhdGVPYmopIHtcclxuICByZXR1cm4gc3RhdGVzLnNldCh0aGlzT2JqLCBzdGF0ZU9iaik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZnJlc2hEYXRhKHRoaXNPYmopIHtcclxuICBjb25zdCBkYXRhUHJvdmlkZXIgPSB0aGlzT2JqLmRhdGFTb3VyY2VQcm92aWRlcjtcclxuXHJcbiAgaWYgKGRhdGEuZ2V0KHRoaXNPYmopID09PSBudWxsKSB7XHJcbiAgICBpZiAoZGF0YVByb3ZpZGVyLmlzTG9hZGVkKSB7XHJcbiAgICAgIGRhdGEuc2V0KHRoaXNPYmosIGRhdGFQcm92aWRlci5nZXREYXRhKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGRhdGEuZ2V0KHRoaXNPYmopICE9PSBudWxsKSB7XHJcbiAgICBjb25zdCBjdXJyZW50U3RhdGVzID0gZ2V0U3RhdGVzKHRoaXNPYmopO1xyXG5cclxuICAgIGlmIChjdXJyZW50U3RhdGVzLm5lZWRUb1NlYXJjaCkge1xyXG4gICAgICBjb25zdCBzZWFyY2hpbkZvclRleHQgPSBzZWFyY2hpbmdGb3IuZ2V0KHRoaXNPYmopO1xyXG5cclxuICAgICAgaWYgKFV0aWxzLmVub3VnaFNlYXJjaFRleHRMZW5ndGgoc2VhcmNoaW5Gb3JUZXh0KSkge1xyXG4gICAgICAgIGNvbnN0IG1vZGVsID0gc2VhcmNoTW9kZWwuZ2V0KHRoaXNPYmopO1xyXG4gICAgICAgIGRhdGEuc2V0KHRoaXNPYmosIG1vZGVsLnNlYXJjaChzZWFyY2hpbkZvclRleHQpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkYXRhLnNldCh0aGlzT2JqLCBkYXRhUHJvdmlkZXIuZ2V0RGF0YSgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY3VycmVudFN0YXRlcy5uZWVkVG9TZWFyY2ggPSBmYWxzZTtcclxuICAgICAgc2V0U3RhdGVzKHRoaXNPYmosIGN1cnJlbnRTdGF0ZXMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uTGlzdCBleHRlbmRzIEJhc2VNb2RlbCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YVNvdXJjZVByb3ZpZGVyKSB7XHJcbiAgICBzdXBlcihkYXRhU291cmNlUHJvdmlkZXIpO1xyXG5cclxuICAgIGRhdGEuc2V0KHRoaXMsIG51bGwpO1xyXG4gICAgbGlzdC5zZXQodGhpcywgW10pO1xyXG4gICAgc3RhdGVzLnNldCh0aGlzLCBnZXREZWZhdWx0U3RhdGVzKCkpO1xyXG4gICAgc2VhcmNoaW5nRm9yLnNldCh0aGlzLCAnJyk7XHJcbiAgICBzZWFyY2hNb2RlbC5zZXQodGhpcywgbmV3IFNlYXJjaChkYXRhU291cmNlUHJvdmlkZXIpKTtcclxuICAgIHNlbGVjdGVkUGF0aC5zZXQodGhpcywgW10pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxlbmd0aCgpIHtcclxuICAgIHJldHVybiBsaXN0LmdldCh0aGlzKS5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBnZXQgbGlzdCgpIHtcclxuICAgIHJldHVybiBsaXN0LmdldCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldCBzZWxlY3RlZFBhdGgoKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0ZWRQYXRoLmdldCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldERhdGEoKSB7XHJcbiAgICByZXR1cm4gZ2V0RGF0YSh0aGlzKTtcclxuICB9XHJcblxyXG4gIHNldFNlYXJjaGluZ0ZvciA9ICh0ZXh0KSA9PiB7XHJcbiAgICBjb25zdCBzZWFyY2hpbkZvclRleHQgPSBVdGlscy5lbm91Z2hTZWFyY2hUZXh0TGVuZ3RoKHRleHQpID8gdGV4dCA6ICcnO1xyXG4gICAgY29uc3QgY3VycmVudFNlYXJjaGluZ0ZvciA9IHNlYXJjaGluZ0Zvci5nZXQodGhpcyk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRTZWFyY2hpbmdGb3IgIT09IHNlYXJjaGluRm9yVGV4dCkge1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdGVzID0gZ2V0U3RhdGVzKHRoaXMpO1xyXG4gICAgICBjdXJyZW50U3RhdGVzLm5lZWRUb1NlYXJjaCA9IHRydWU7XHJcbiAgICAgIHNldFN0YXRlcyh0aGlzLCBjdXJyZW50U3RhdGVzKTtcclxuICAgICAgc2VhcmNoaW5nRm9yLnNldCh0aGlzLCBzZWFyY2hpbkZvclRleHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHJlY2FsY3VsYXRlIHNlbGVjdGVkIHBhdGhzIGFuZCBmaWxscyBsaXN0IG9mIGNvbHVtbnNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGV2ZWwgVGhlIHNlbGVjdGVkIGxldmVsIChjb2x1bW4pXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIFRoZSBJRCBvZiBzZWxlY3RlZCBpdGVtIGluIGEgY29sdW1uXHJcbiAgICovXHJcbiAgcmVmcmVzaChsZXZlbCwgaWQgPSBudWxsKSB7XHJcbiAgICBjb25zdCBsaXN0T2ZDb2x1bW5zID0gbGlzdC5nZXQodGhpcyk7XHJcbiAgICBjb25zdCBwYXRoID0gc2VsZWN0ZWRQYXRoLmdldCh0aGlzKTtcclxuXHJcbiAgICBjb25zdCBjbGVhbkxldmVsID0gbGV2ZWwgJiYgbGV2ZWwgPiAwID8gbGV2ZWwgLSAxIDogMDtcclxuXHJcbiAgICByZWZyZXNoRGF0YSh0aGlzKTtcclxuXHJcbiAgICBwYXRoLnNwbGljZShjbGVhbkxldmVsKTtcclxuICAgIGxpc3RPZkNvbHVtbnMuc3BsaWNlKDApO1xyXG5cclxuICAgIGlmIChpZCAhPT0gbnVsbCkge1xyXG4gICAgICBwYXRoLnB1c2goaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaXN0T2ZDb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBsaXN0T2ZDb2x1bW5zLnB1c2gobmV3IENvbHVtbkRhdGEobnVsbCwgZ2V0RGF0YSh0aGlzKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdGguZm9yRWFjaCgoc2VsZWN0ZWRJZCwgdGhpc0xldmVsKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHRMZXZlbCA9IHRoaXNMZXZlbCArIDE7XHJcblxyXG4gICAgICBjb25zdCBpdGVtID0gbGlzdE9mQ29sdW1uc1t0aGlzTGV2ZWxdID9cclxuICAgICAgICBsaXN0T2ZDb2x1bW5zW3RoaXNMZXZlbF0uaXRlbXMuZmluZChlbCA9PiAoZWwuaWQgPT09IHNlbGVjdGVkSWQpKSA6IG51bGw7XHJcblxyXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmIChuZXh0TGV2ZWwgPj0gbGlzdE9mQ29sdW1ucy5sZW5ndGgpIHtcclxuICAgICAgICAgIGxpc3RPZkNvbHVtbnMucHVzaChuZXcgQ29sdW1uRGF0YSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxpc3RPZkNvbHVtbnNbbmV4dExldmVsXS5wYXJlbnRJZCAhPT0gc2VsZWN0ZWRJZCkge1xyXG4gICAgICAgICAgbGlzdE9mQ29sdW1uc1tuZXh0TGV2ZWxdLnBhcmVudElkID0gc2VsZWN0ZWRJZDtcclxuICAgICAgICAgIGxpc3RPZkNvbHVtbnNbbmV4dExldmVsXS5pdGVtcyA9IGl0ZW0uY2hpbGRyZW47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19