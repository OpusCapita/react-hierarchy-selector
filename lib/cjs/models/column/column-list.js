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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0LmpzIl0sIm5hbWVzIjpbImRhdGEiLCJXZWFrTWFwIiwibGlzdCIsInN0YXRlcyIsInNlYXJjaGluZ0ZvciIsInNlYXJjaE1vZGVsIiwic2VsZWN0ZWRQYXRoIiwiZ2V0RGF0YSIsInRoaXNPYmoiLCJnZXQiLCJnZXREZWZhdWx0U3RhdGVzIiwibmVlZFRvU2VhcmNoIiwiZ2V0U3RhdGVzIiwic2V0U3RhdGVzIiwic3RhdGVPYmoiLCJzZXQiLCJyZWZyZXNoRGF0YSIsImRhdGFQcm92aWRlciIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiY3VycmVudFN0YXRlcyIsInNlYXJjaGluRm9yVGV4dCIsImVub3VnaFNlYXJjaFRleHRMZW5ndGgiLCJtb2RlbCIsInNlYXJjaCIsIkNvbHVtbkxpc3QiLCJzZXRTZWFyY2hpbmdGb3IiLCJ0ZXh0IiwiY3VycmVudFNlYXJjaGluZ0ZvciIsInJlZnJlc2giLCJsZXZlbCIsImlkIiwibGlzdE9mQ29sdW1ucyIsInBhdGgiLCJjbGVhbkxldmVsIiwic3BsaWNlIiwicHVzaCIsImxlbmd0aCIsImZvckVhY2giLCJzZWxlY3RlZElkIiwidGhpc0xldmVsIiwibmV4dExldmVsIiwiaXRlbSIsIml0ZW1zIiwiZmluZCIsImVsIiwiY2hpbGRyZW4iLCJwYXJlbnRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPLElBQUlDLE9BQUosRUFBYjtBQUNBLElBQU1DLE9BQU8sSUFBSUQsT0FBSixFQUFiO0FBQ0EsSUFBTUUsU0FBUyxJQUFJRixPQUFKLEVBQWY7QUFDQSxJQUFNRyxlQUFlLElBQUlILE9BQUosRUFBckI7QUFDQSxJQUFNSSxjQUFjLElBQUlKLE9BQUosRUFBcEI7QUFDQSxJQUFNSyxlQUFlLElBQUlMLE9BQUosRUFBckI7O0FBRUEsU0FB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QU81QyxLQUFLTyxHQUFMLENBQVMsSUFBVCxFQUFlNEIsTUFBdEI7QUFDRDs7O3dCQUVVO0FBQ1QsYUFBT25DLEtBQUtPLEdBQUwsQ0FBUyxJQUFULENBQVA7QUFDRDs7O3dCQUVrQjtBQUNqQixhQUFPSCxhQUFhRyxHQUFiLENBQWlCLElBQWpCLENBQVA7QUFDRDs7Ozs7O2tCQXRCa0JnQixVIiwiZmlsZSI6ImNvbHVtbi1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbHVtbkRhdGEgZnJvbSAnLi9jb2x1bW4tZGF0YSc7XHJcbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vYmFzZSc7XHJcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi4vc2VhcmNoJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGRhdGEgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBsaXN0ID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3Qgc3RhdGVzID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3Qgc2VhcmNoaW5nRm9yID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBzZWxlY3RlZFBhdGggPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSh0aGlzT2JqKSB7XHJcbiAgcmV0dXJuIGRhdGEuZ2V0KHRoaXNPYmopIHx8IFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0U3RhdGVzKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBuZWVkVG9TZWFyY2g6IGZhbHNlLFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN0YXRlcyh0aGlzT2JqKSB7XHJcbiAgcmV0dXJuIHN0YXRlcy5nZXQodGhpc09iaikgfHwge307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFN0YXRlcyh0aGlzT2JqLCBzdGF0ZU9iaikge1xyXG4gIHJldHVybiBzdGF0ZXMuc2V0KHRoaXNPYmosIHN0YXRlT2JqKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmcmVzaERhdGEodGhpc09iaikge1xyXG4gIGNvbnN0IGRhdGFQcm92aWRlciA9IHRoaXNPYmouZGF0YVNvdXJjZVByb3ZpZGVyO1xyXG5cclxuICBpZiAoZGF0YS5nZXQodGhpc09iaikgPT09IG51bGwpIHtcclxuICAgIGlmIChkYXRhUHJvdmlkZXIuaXNMb2FkZWQpIHtcclxuICAgICAgZGF0YS5zZXQodGhpc09iaiwgZGF0YVByb3ZpZGVyLmdldERhdGEoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoZGF0YS5nZXQodGhpc09iaikgIT09IG51bGwpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZXMgPSBnZXRTdGF0ZXModGhpc09iaik7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRTdGF0ZXMubmVlZFRvU2VhcmNoKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaGluRm9yVGV4dCA9IHNlYXJjaGluZ0Zvci5nZXQodGhpc09iaik7XHJcblxyXG4gICAgICBpZiAoVXRpbHMuZW5vdWdoU2VhcmNoVGV4dExlbmd0aChzZWFyY2hpbkZvclRleHQpKSB7XHJcbiAgICAgICAgY29uc3QgbW9kZWwgPSBzZWFyY2hNb2RlbC5nZXQodGhpc09iaik7XHJcbiAgICAgICAgZGF0YS5zZXQodGhpc09iaiwgbW9kZWwuc2VhcmNoKHNlYXJjaGluRm9yVGV4dCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGEuc2V0KHRoaXNPYmosIGRhdGFQcm92aWRlci5nZXREYXRhKCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjdXJyZW50U3RhdGVzLm5lZWRUb1NlYXJjaCA9IGZhbHNlO1xyXG4gICAgICBzZXRTdGF0ZXModGhpc09iaiwgY3VycmVudFN0YXRlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5MaXN0IGV4dGVuZHMgQmFzZU1vZGVsIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhU291cmNlUHJvdmlkZXIpIHtcclxuICAgIHN1cGVyKGRhdGFTb3VyY2VQcm92aWRlcik7XHJcblxyXG4gICAgZGF0YS5zZXQodGhpcywgbnVsbCk7XHJcbiAgICBsaXN0LnNldCh0aGlzLCBbXSk7XHJcbiAgICBzdGF0ZXMuc2V0KHRoaXMsIGdldERlZmF1bHRTdGF0ZXMoKSk7XHJcbiAgICBzZWFyY2hpbmdGb3Iuc2V0KHRoaXMsICcnKTtcclxuICAgIHNlYXJjaE1vZGVsLnNldCh0aGlzLCBuZXcgU2VhcmNoKGRhdGFTb3VyY2VQcm92aWRlcikpO1xyXG4gICAgc2VsZWN0ZWRQYXRoLnNldCh0aGlzLCBbXSk7XHJcbiAgfVxyXG5cclxuICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIGxpc3QuZ2V0KHRoaXMpLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIGdldCBsaXN0KCkge1xyXG4gICAgcmV0dXJuIGxpc3QuZ2V0KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlbGVjdGVkUGF0aCgpIHtcclxuICAgIHJldHVybiBzZWxlY3RlZFBhdGguZ2V0KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIHJldHVybiBnZXREYXRhKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VhcmNoaW5nRm9yID0gKHRleHQpID0+IHtcclxuICAgIGNvbnN0IHNlYXJjaGluRm9yVGV4dCA9IFV0aWxzLmVub3VnaFNlYXJjaFRleHRMZW5ndGgodGV4dCkgPyB0ZXh0IDogJyc7XHJcbiAgICBjb25zdCBjdXJyZW50U2VhcmNoaW5nRm9yID0gc2VhcmNoaW5nRm9yLmdldCh0aGlzKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFNlYXJjaGluZ0ZvciAhPT0gc2VhcmNoaW5Gb3JUZXh0KSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZXMgPSBnZXRTdGF0ZXModGhpcyk7XHJcbiAgICAgIGN1cnJlbnRTdGF0ZXMubmVlZFRvU2VhcmNoID0gdHJ1ZTtcclxuICAgICAgc2V0U3RhdGVzKHRoaXMsIGN1cnJlbnRTdGF0ZXMpO1xyXG4gICAgICBzZWFyY2hpbmdGb3Iuc2V0KHRoaXMsIHNlYXJjaGluRm9yVGV4dCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgcmVjYWxjdWxhdGUgc2VsZWN0ZWQgcGF0aHMgYW5kIGZpbGxzIGxpc3Qgb2YgY29sdW1uc1xyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCBUaGUgc2VsZWN0ZWQgbGV2ZWwgKGNvbHVtbilcclxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgVGhlIElEIG9mIHNlbGVjdGVkIGl0ZW0gaW4gYSBjb2x1bW5cclxuICAgKi9cclxuICByZWZyZXNoKGxldmVsLCBpZCA9IG51bGwpIHtcclxuICAgIGNvbnN0IGxpc3RPZkNvbHVtbnMgPSBsaXN0LmdldCh0aGlzKTtcclxuICAgIGNvbnN0IHBhdGggPSBzZWxlY3RlZFBhdGguZ2V0KHRoaXMpO1xyXG5cclxuICAgIGNvbnN0IGNsZWFuTGV2ZWwgPSBsZXZlbCAmJiBsZXZlbCA+IDAgPyBsZXZlbCAtIDEgOiAwO1xyXG5cclxuICAgIHJlZnJlc2hEYXRhKHRoaXMpO1xyXG5cclxuICAgIHBhdGguc3BsaWNlKGNsZWFuTGV2ZWwpO1xyXG4gICAgbGlzdE9mQ29sdW1ucy5zcGxpY2UoMCk7XHJcblxyXG4gICAgaWYgKGlkICE9PSBudWxsKSB7XHJcbiAgICAgIHBhdGgucHVzaChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxpc3RPZkNvbHVtbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGxpc3RPZkNvbHVtbnMucHVzaChuZXcgQ29sdW1uRGF0YShudWxsLCBnZXREYXRhKHRoaXMpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF0aC5mb3JFYWNoKChzZWxlY3RlZElkLCB0aGlzTGV2ZWwpID0+IHtcclxuICAgICAgY29uc3QgbmV4dExldmVsID0gdGhpc0xldmVsICsgMTtcclxuXHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0T2ZDb2x1bW5zW3RoaXNMZXZlbF0gP1xyXG4gICAgICAgIGxpc3RPZkNvbHVtbnNbdGhpc0xldmVsXS5pdGVtcy5maW5kKGVsID0+IChlbC5pZCA9PT0gc2VsZWN0ZWRJZCkpIDogbnVsbDtcclxuXHJcbiAgICAgIGlmIChpdGVtICYmIGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKG5leHRMZXZlbCA+PSBsaXN0T2ZDb2x1bW5zLmxlbmd0aCkge1xyXG4gICAgICAgICAgbGlzdE9mQ29sdW1ucy5wdXNoKG5ldyBDb2x1bW5EYXRhKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGlzdE9mQ29sdW1uc1tuZXh0TGV2ZWxdLnBhcmVudElkICE9PSBzZWxlY3RlZElkKSB7XHJcbiAgICAgICAgICBsaXN0T2ZDb2x1bW5zW25leHRMZXZlbF0ucGFyZW50SWQgPSBzZWxlY3RlZElkO1xyXG4gICAgICAgICAgbGlzdE9mQ29sdW1uc1tuZXh0TGV2ZWxdLml0ZW1zID0gaXRlbS5jaGlsZHJlbjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=