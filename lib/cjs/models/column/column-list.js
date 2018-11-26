'use strict';

exports.__esModule = true;
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _columnData = require('./column-data');

var _columnData2 = _interopRequireDefault(_columnData);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _search = require('../search');

var _search2 = _interopRequireDefault(_search);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

      if (_utils2.default.enoughSearchTextLength(searchinForText)) {
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
      var searchinForText = _utils2.default.enoughSearchTextLength(text) ? text : '';
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
    searchModel.set(_this, new _search2.default(dataSourceProvider));
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
      listOfColumns.push(new _columnData2.default(null, _getData(this)));
    }

    path.forEach(function (selectedId, thisLevel) {
      var nextLevel = thisLevel + 1;

      var item = listOfColumns[thisLevel] ? listOfColumns[thisLevel].items.find(function (el) {
        return el.id === selectedId;
      }) : null;

      if (item && item.children && item.children.length > 0) {
        if (nextLevel >= listOfColumns.length) {
          listOfColumns.push(new _columnData2.default());
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
}(_base2.default);

exports.default = ColumnList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0LmpzIl0sIm5hbWVzIjpbImRhdGEiLCJXZWFrTWFwIiwibGlzdCIsInN0YXRlcyIsInNlYXJjaGluZ0ZvciIsInNlYXJjaE1vZGVsIiwic2VsZWN0ZWRQYXRoIiwiZ2V0RGF0YSIsInRoaXNPYmoiLCJnZXQiLCJnZXREZWZhdWx0U3RhdGVzIiwibmVlZFRvU2VhcmNoIiwiZ2V0U3RhdGVzIiwic2V0U3RhdGVzIiwic3RhdGVPYmoiLCJzZXQiLCJyZWZyZXNoRGF0YSIsImRhdGFQcm92aWRlciIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiY3VycmVudFN0YXRlcyIsInNlYXJjaGluRm9yVGV4dCIsIlV0aWxzIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsIm1vZGVsIiwic2VhcmNoIiwiQ29sdW1uTGlzdCIsInNldFNlYXJjaGluZ0ZvciIsInRleHQiLCJjdXJyZW50U2VhcmNoaW5nRm9yIiwiU2VhcmNoIiwicmVmcmVzaCIsImxldmVsIiwiaWQiLCJsaXN0T2ZDb2x1bW5zIiwicGF0aCIsImNsZWFuTGV2ZWwiLCJzcGxpY2UiLCJwdXNoIiwibGVuZ3RoIiwiQ29sdW1uRGF0YSIsImZvckVhY2giLCJzZWxlY3RlZElkIiwidGhpc0xldmVsIiwibmV4dExldmVsIiwiaXRlbSIsIml0ZW1zIiwiZmluZCIsImVsIiwiY2hpbGRyZW4iLCJwYXJlbnRJZCIsIkJhc2VNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPLElBQUlDLE9BQUosRUFBYjtBQUNBLElBQU1DLE9BQU8sSUFBSUQsT0FBSixFQUFiO0FBQ0EsSUFBTUUsU0FBUyxJQUFJRixPQUFKLEVBQWY7QUFDQSxJQUFNRyxlQUFlLElBQUlILE9BQUosRUFBckI7QUFDQSxJQUFNSSxjQUFjLElBQUlKLE9BQUosRUFBcEI7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ZCxFQUF5QkUsS0FBekIsR0FBaUNELEtBQUtJLFFBQXRDO0FBQ0Q7QUFDRjtBQUNGLEtBZkQ7QUFnQkQsRzs7Ozt3QkFwRVk7QUFDWCxhQUFPL0MsS0FBS08sR0FBTCxDQUFTLElBQVQsRUFBZThCLE1BQXRCO0FBQ0Q7Ozt3QkFFVTtBQUNULGFBQU9yQyxLQUFLTyxHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0Q7Ozt3QkFFa0I7QUFDakIsYUFBT0gsYUFBYUcsR0FBYixDQUFpQixJQUFqQixDQUFQO0FBQ0Q7Ozs7RUF0QnFDMEMsYzs7a0JBQW5CekIsVSIsImZpbGUiOiJjb2x1bW4tbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2x1bW5EYXRhIGZyb20gJy4vY29sdW1uLWRhdGEnO1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9iYXNlJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi4vc2VhcmNoJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XG5cbmNvbnN0IGRhdGEgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgbGlzdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzdGF0ZXMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3Qgc2VhcmNoaW5nRm9yID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHNlYXJjaE1vZGVsID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHNlbGVjdGVkUGF0aCA9IG5ldyBXZWFrTWFwKCk7XG5cbmZ1bmN0aW9uIGdldERhdGEodGhpc09iaikge1xuICByZXR1cm4gZGF0YS5nZXQodGhpc09iaikgfHwgW107XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRTdGF0ZXMoKSB7XG4gIHJldHVybiB7XG4gICAgbmVlZFRvU2VhcmNoOiBmYWxzZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RhdGVzKHRoaXNPYmopIHtcbiAgcmV0dXJuIHN0YXRlcy5nZXQodGhpc09iaikgfHwge307XG59XG5cbmZ1bmN0aW9uIHNldFN0YXRlcyh0aGlzT2JqLCBzdGF0ZU9iaikge1xuICByZXR1cm4gc3RhdGVzLnNldCh0aGlzT2JqLCBzdGF0ZU9iaik7XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hEYXRhKHRoaXNPYmopIHtcbiAgY29uc3QgZGF0YVByb3ZpZGVyID0gdGhpc09iai5kYXRhU291cmNlUHJvdmlkZXI7XG5cbiAgaWYgKGRhdGEuZ2V0KHRoaXNPYmopID09PSBudWxsKSB7XG4gICAgaWYgKGRhdGFQcm92aWRlci5pc0xvYWRlZCkge1xuICAgICAgZGF0YS5zZXQodGhpc09iaiwgZGF0YVByb3ZpZGVyLmdldERhdGEoKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGEuZ2V0KHRoaXNPYmopICE9PSBudWxsKSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlcyA9IGdldFN0YXRlcyh0aGlzT2JqKTtcblxuICAgIGlmIChjdXJyZW50U3RhdGVzLm5lZWRUb1NlYXJjaCkge1xuICAgICAgY29uc3Qgc2VhcmNoaW5Gb3JUZXh0ID0gc2VhcmNoaW5nRm9yLmdldCh0aGlzT2JqKTtcblxuICAgICAgaWYgKFV0aWxzLmVub3VnaFNlYXJjaFRleHRMZW5ndGgoc2VhcmNoaW5Gb3JUZXh0KSkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHNlYXJjaE1vZGVsLmdldCh0aGlzT2JqKTtcbiAgICAgICAgZGF0YS5zZXQodGhpc09iaiwgbW9kZWwuc2VhcmNoKHNlYXJjaGluRm9yVGV4dCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YS5zZXQodGhpc09iaiwgZGF0YVByb3ZpZGVyLmdldERhdGEoKSk7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRTdGF0ZXMubmVlZFRvU2VhcmNoID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZXModGhpc09iaiwgY3VycmVudFN0YXRlcyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbHVtbkxpc3QgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICBjb25zdHJ1Y3RvcihkYXRhU291cmNlUHJvdmlkZXIpIHtcbiAgICBzdXBlcihkYXRhU291cmNlUHJvdmlkZXIpO1xuXG4gICAgZGF0YS5zZXQodGhpcywgbnVsbCk7XG4gICAgbGlzdC5zZXQodGhpcywgW10pO1xuICAgIHN0YXRlcy5zZXQodGhpcywgZ2V0RGVmYXVsdFN0YXRlcygpKTtcbiAgICBzZWFyY2hpbmdGb3Iuc2V0KHRoaXMsICcnKTtcbiAgICBzZWFyY2hNb2RlbC5zZXQodGhpcywgbmV3IFNlYXJjaChkYXRhU291cmNlUHJvdmlkZXIpKTtcbiAgICBzZWxlY3RlZFBhdGguc2V0KHRoaXMsIFtdKTtcbiAgfVxuXG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIGxpc3QuZ2V0KHRoaXMpLmxlbmd0aDtcbiAgfVxuXG4gIGdldCBsaXN0KCkge1xuICAgIHJldHVybiBsaXN0LmdldCh0aGlzKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZFBhdGgoKSB7XG4gICAgcmV0dXJuIHNlbGVjdGVkUGF0aC5nZXQodGhpcyk7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiBnZXREYXRhKHRoaXMpO1xuICB9XG5cbiAgc2V0U2VhcmNoaW5nRm9yID0gKHRleHQpID0+IHtcbiAgICBjb25zdCBzZWFyY2hpbkZvclRleHQgPSBVdGlscy5lbm91Z2hTZWFyY2hUZXh0TGVuZ3RoKHRleHQpID8gdGV4dCA6ICcnO1xuICAgIGNvbnN0IGN1cnJlbnRTZWFyY2hpbmdGb3IgPSBzZWFyY2hpbmdGb3IuZ2V0KHRoaXMpO1xuXG4gICAgaWYgKGN1cnJlbnRTZWFyY2hpbmdGb3IgIT09IHNlYXJjaGluRm9yVGV4dCkge1xuICAgICAgY29uc3QgY3VycmVudFN0YXRlcyA9IGdldFN0YXRlcyh0aGlzKTtcbiAgICAgIGN1cnJlbnRTdGF0ZXMubmVlZFRvU2VhcmNoID0gdHJ1ZTtcbiAgICAgIHNldFN0YXRlcyh0aGlzLCBjdXJyZW50U3RhdGVzKTtcbiAgICAgIHNlYXJjaGluZ0Zvci5zZXQodGhpcywgc2VhcmNoaW5Gb3JUZXh0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHJlY2FsY3VsYXRlIHNlbGVjdGVkIHBhdGhzIGFuZCBmaWxscyBsaXN0IG9mIGNvbHVtbnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxldmVsIFRoZSBzZWxlY3RlZCBsZXZlbCAoY29sdW1uKVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgVGhlIElEIG9mIHNlbGVjdGVkIGl0ZW0gaW4gYSBjb2x1bW5cbiAgICovXG4gIHJlZnJlc2gobGV2ZWwsIGlkID0gbnVsbCkge1xuICAgIGNvbnN0IGxpc3RPZkNvbHVtbnMgPSBsaXN0LmdldCh0aGlzKTtcbiAgICBjb25zdCBwYXRoID0gc2VsZWN0ZWRQYXRoLmdldCh0aGlzKTtcblxuICAgIGNvbnN0IGNsZWFuTGV2ZWwgPSBsZXZlbCAmJiBsZXZlbCA+IDAgPyBsZXZlbCAtIDEgOiAwO1xuXG4gICAgcmVmcmVzaERhdGEodGhpcyk7XG5cbiAgICBwYXRoLnNwbGljZShjbGVhbkxldmVsKTtcbiAgICBsaXN0T2ZDb2x1bW5zLnNwbGljZSgwKTtcblxuICAgIGlmIChpZCAhPT0gbnVsbCkge1xuICAgICAgcGF0aC5wdXNoKGlkKTtcbiAgICB9XG5cbiAgICBpZiAobGlzdE9mQ29sdW1ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxpc3RPZkNvbHVtbnMucHVzaChuZXcgQ29sdW1uRGF0YShudWxsLCBnZXREYXRhKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgcGF0aC5mb3JFYWNoKChzZWxlY3RlZElkLCB0aGlzTGV2ZWwpID0+IHtcbiAgICAgIGNvbnN0IG5leHRMZXZlbCA9IHRoaXNMZXZlbCArIDE7XG5cbiAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0T2ZDb2x1bW5zW3RoaXNMZXZlbF0gP1xuICAgICAgICBsaXN0T2ZDb2x1bW5zW3RoaXNMZXZlbF0uaXRlbXMuZmluZChlbCA9PiAoZWwuaWQgPT09IHNlbGVjdGVkSWQpKSA6IG51bGw7XG5cbiAgICAgIGlmIChpdGVtICYmIGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChuZXh0TGV2ZWwgPj0gbGlzdE9mQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICBsaXN0T2ZDb2x1bW5zLnB1c2gobmV3IENvbHVtbkRhdGEoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RPZkNvbHVtbnNbbmV4dExldmVsXS5wYXJlbnRJZCAhPT0gc2VsZWN0ZWRJZCkge1xuICAgICAgICAgIGxpc3RPZkNvbHVtbnNbbmV4dExldmVsXS5wYXJlbnRJZCA9IHNlbGVjdGVkSWQ7XG4gICAgICAgICAgbGlzdE9mQ29sdW1uc1tuZXh0TGV2ZWxdLml0ZW1zID0gaXRlbS5jaGlsZHJlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=