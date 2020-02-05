"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _columnData = _interopRequireDefault(require("./column-data"));

var _base = _interopRequireDefault(require("../base"));

var _search = _interopRequireDefault(require("../search"));

var _utils = _interopRequireDefault(require("../../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

      if (_utils["default"].enoughSearchTextLength(searchinForText)) {
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

var ColumnList =
/*#__PURE__*/
function (_BaseModel) {
  _inheritsLoose(ColumnList, _BaseModel);

  function ColumnList(dataSourceProvider) {
    var _this;

    _this = _BaseModel.call(this, dataSourceProvider) || this;

    _defineProperty(_assertThisInitialized(_this), "setSearchingFor", function (text) {
      var currentSearchingFor = searchingFor.get(_assertThisInitialized(_this));

      if (currentSearchingFor !== text) {
        var currentStates = getStates(_assertThisInitialized(_this));
        currentStates.needToSearch = true;
        setStates(_assertThisInitialized(_this), currentStates);
        searchingFor.set(_assertThisInitialized(_this), text);
      }
    });

    data.set(_assertThisInitialized(_this), null);
    list.set(_assertThisInitialized(_this), []);
    states.set(_assertThisInitialized(_this), getDefaultStates());
    searchingFor.set(_assertThisInitialized(_this), '');
    searchModel.set(_assertThisInitialized(_this), new _search["default"](dataSourceProvider));
    selectedPath.set(_assertThisInitialized(_this), []);
    return _this;
  }

  var _proto = ColumnList.prototype;

  _proto.getData = function getData() {
    return _getData(this);
  };

  /**
   * Method recalculate selected paths and fills list of columns
   * @param {number} level The selected level (column)
   * @param {number} id The ID of selected item in a column
   */
  _proto.refresh = function refresh(level, id) {
    if (id === void 0) {
      id = null;
    }

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
      listOfColumns.push(new _columnData["default"](null, _getData(this)));
    }

    path.forEach(function (selectedId, thisLevel) {
      var nextLevel = thisLevel + 1;
      var item = listOfColumns[thisLevel] ? listOfColumns[thisLevel].items.find(function (el) {
        return el.id === selectedId;
      }) : null;

      if (item && item.children && item.children.length > 0) {
        if (nextLevel >= listOfColumns.length) {
          listOfColumns.push(new _columnData["default"]());
        }

        if (listOfColumns[nextLevel].parentId !== selectedId) {
          listOfColumns[nextLevel].parentId = selectedId;
          listOfColumns[nextLevel].items = item.children;
        }
      }
    });
  };

  _createClass(ColumnList, [{
    key: "length",
    get: function get() {
      return list.get(this).length;
    }
  }, {
    key: "list",
    get: function get() {
      return list.get(this);
    }
  }, {
    key: "selectedPath",
    get: function get() {
      return selectedPath.get(this);
    }
  }]);

  return ColumnList;
}(_base["default"]);

exports["default"] = ColumnList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0LmpzIl0sIm5hbWVzIjpbImRhdGEiLCJXZWFrTWFwIiwibGlzdCIsInN0YXRlcyIsInNlYXJjaGluZ0ZvciIsInNlYXJjaE1vZGVsIiwic2VsZWN0ZWRQYXRoIiwiZ2V0RGF0YSIsInRoaXNPYmoiLCJnZXQiLCJnZXREZWZhdWx0U3RhdGVzIiwibmVlZFRvU2VhcmNoIiwiZ2V0U3RhdGVzIiwic2V0U3RhdGVzIiwic3RhdGVPYmoiLCJzZXQiLCJyZWZyZXNoRGF0YSIsImRhdGFQcm92aWRlciIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiY3VycmVudFN0YXRlcyIsInNlYXJjaGluRm9yVGV4dCIsIlV0aWxzIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsIm1vZGVsIiwic2VhcmNoIiwiQ29sdW1uTGlzdCIsInRleHQiLCJjdXJyZW50U2VhcmNoaW5nRm9yIiwiU2VhcmNoIiwicmVmcmVzaCIsImxldmVsIiwiaWQiLCJsaXN0T2ZDb2x1bW5zIiwicGF0aCIsImNsZWFuTGV2ZWwiLCJzcGxpY2UiLCJwdXNoIiwibGVuZ3RoIiwiQ29sdW1uRGF0YSIsImZvckVhY2giLCJzZWxlY3RlZElkIiwidGhpc0xldmVsIiwibmV4dExldmVsIiwiaXRlbSIsIml0ZW1zIiwiZmluZCIsImVsIiwiY2hpbGRyZW4iLCJwYXJlbnRJZCIsIkJhc2VNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUcsSUFBSUMsT0FBSixFQUFiO0FBQ0EsSUFBTUMsSUFBSSxHQUFHLElBQUlELE9BQUosRUFBYjtBQUNBLElBQU1FLE1BQU0sR0FBRyxJQUFJRixPQUFKLEVBQWY7QUFDQSxJQUFNRyxZQUFZLEdBQUcsSUFBSUgsT0FBSixFQUFyQjtBQUNBLElBQU1JLFdBQVcsR0FBRyxJQUFJSixPQUFKLEVBQXBC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QUFiLEdBQ1hULGFBQWEsQ0FBQ1MsU0FBRCxDQUFiLENBQXlCRyxLQUF6QixDQUErQkMsSUFBL0IsQ0FBb0MsVUFBQUMsRUFBRTtBQUFBLGVBQUtBLEVBQUUsQ0FBQ2YsRUFBSCxLQUFVUyxVQUFmO0FBQUEsT0FBdEMsQ0FEVyxHQUN5RCxJQUR0RTs7QUFHQSxVQUFJRyxJQUFJLElBQUlBLElBQUksQ0FBQ0ksUUFBYixJQUF5QkosSUFBSSxDQUFDSSxRQUFMLENBQWNWLE1BQWQsR0FBdUIsQ0FBcEQsRUFBdUQ7QUFDckQsWUFBSUssU0FBUyxJQUFJVixhQUFhLENBQUNLLE1BQS9CLEVBQXVDO0FBQ3JDTCxVQUFBQSxhQUFhLENBQUNJLElBQWQsQ0FBbUIsSUFBSUUsc0JBQUosRUFBbkI7QUFDRDs7QUFDRCxZQUFJTixhQUFhLENBQUNVLFNBQUQsQ0FBYixDQUF5Qk0sUUFBekIsS0FBc0NSLFVBQTFDLEVBQXNEO0FBQ3BEUixVQUFBQSxhQUFhLENBQUNVLFNBQUQsQ0FBYixDQUF5Qk0sUUFBekIsR0FBb0NSLFVBQXBDO0FBQ0FSLFVBQUFBLGFBQWEsQ0FBQ1UsU0FBRCxDQUFiLENBQXlCRSxLQUF6QixHQUFpQ0QsSUFBSSxDQUFDSSxRQUF0QztBQUNEO0FBQ0Y7QUFDRixLQWZEO0FBZ0JELEc7Ozs7d0JBbkVZO0FBQ1gsYUFBTzlDLElBQUksQ0FBQ08sR0FBTCxDQUFTLElBQVQsRUFBZTZCLE1BQXRCO0FBQ0Q7Ozt3QkFFVTtBQUNULGFBQU9wQyxJQUFJLENBQUNPLEdBQUwsQ0FBUyxJQUFULENBQVA7QUFDRDs7O3dCQUVrQjtBQUNqQixhQUFPSCxZQUFZLENBQUNHLEdBQWIsQ0FBaUIsSUFBakIsQ0FBUDtBQUNEOzs7O0VBdEJxQ3lDLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbHVtbkRhdGEgZnJvbSAnLi9jb2x1bW4tZGF0YSc7XG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9zZWFyY2gnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcblxuY29uc3QgZGF0YSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBsaXN0ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHN0YXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzZWFyY2hpbmdGb3IgPSBuZXcgV2Vha01hcCgpO1xuY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgV2Vha01hcCgpO1xuY29uc3Qgc2VsZWN0ZWRQYXRoID0gbmV3IFdlYWtNYXAoKTtcblxuZnVuY3Rpb24gZ2V0RGF0YSh0aGlzT2JqKSB7XG4gIHJldHVybiBkYXRhLmdldCh0aGlzT2JqKSB8fCBbXTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFN0YXRlcygpIHtcbiAgcmV0dXJuIHtcbiAgICBuZWVkVG9TZWFyY2g6IGZhbHNlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTdGF0ZXModGhpc09iaikge1xuICByZXR1cm4gc3RhdGVzLmdldCh0aGlzT2JqKSB8fCB7fTtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdGVzKHRoaXNPYmosIHN0YXRlT2JqKSB7XG4gIHJldHVybiBzdGF0ZXMuc2V0KHRoaXNPYmosIHN0YXRlT2JqKTtcbn1cblxuZnVuY3Rpb24gcmVmcmVzaERhdGEodGhpc09iaikge1xuICBjb25zdCBkYXRhUHJvdmlkZXIgPSB0aGlzT2JqLmRhdGFTb3VyY2VQcm92aWRlcjtcblxuICBpZiAoZGF0YS5nZXQodGhpc09iaikgPT09IG51bGwpIHtcbiAgICBpZiAoZGF0YVByb3ZpZGVyLmlzTG9hZGVkKSB7XG4gICAgICBkYXRhLnNldCh0aGlzT2JqLCBkYXRhUHJvdmlkZXIuZ2V0RGF0YSgpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZGF0YS5nZXQodGhpc09iaikgIT09IG51bGwpIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGVzID0gZ2V0U3RhdGVzKHRoaXNPYmopO1xuXG4gICAgaWYgKGN1cnJlbnRTdGF0ZXMubmVlZFRvU2VhcmNoKSB7XG4gICAgICBjb25zdCBzZWFyY2hpbkZvclRleHQgPSBzZWFyY2hpbmdGb3IuZ2V0KHRoaXNPYmopO1xuXG4gICAgICBpZiAoVXRpbHMuZW5vdWdoU2VhcmNoVGV4dExlbmd0aChzZWFyY2hpbkZvclRleHQpKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gc2VhcmNoTW9kZWwuZ2V0KHRoaXNPYmopO1xuICAgICAgICBkYXRhLnNldCh0aGlzT2JqLCBtb2RlbC5zZWFyY2goc2VhcmNoaW5Gb3JUZXh0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLnNldCh0aGlzT2JqLCBkYXRhUHJvdmlkZXIuZ2V0RGF0YSgpKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFN0YXRlcy5uZWVkVG9TZWFyY2ggPSBmYWxzZTtcbiAgICAgIHNldFN0YXRlcyh0aGlzT2JqLCBjdXJyZW50U3RhdGVzKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uTGlzdCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRhdGFTb3VyY2VQcm92aWRlcikge1xuICAgIHN1cGVyKGRhdGFTb3VyY2VQcm92aWRlcik7XG5cbiAgICBkYXRhLnNldCh0aGlzLCBudWxsKTtcbiAgICBsaXN0LnNldCh0aGlzLCBbXSk7XG4gICAgc3RhdGVzLnNldCh0aGlzLCBnZXREZWZhdWx0U3RhdGVzKCkpO1xuICAgIHNlYXJjaGluZ0Zvci5zZXQodGhpcywgJycpO1xuICAgIHNlYXJjaE1vZGVsLnNldCh0aGlzLCBuZXcgU2VhcmNoKGRhdGFTb3VyY2VQcm92aWRlcikpO1xuICAgIHNlbGVjdGVkUGF0aC5zZXQodGhpcywgW10pO1xuICB9XG5cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gbGlzdC5nZXQodGhpcykubGVuZ3RoO1xuICB9XG5cbiAgZ2V0IGxpc3QoKSB7XG4gICAgcmV0dXJuIGxpc3QuZ2V0KHRoaXMpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkUGF0aCgpIHtcbiAgICByZXR1cm4gc2VsZWN0ZWRQYXRoLmdldCh0aGlzKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIGdldERhdGEodGhpcyk7XG4gIH1cblxuICBzZXRTZWFyY2hpbmdGb3IgPSAodGV4dCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRTZWFyY2hpbmdGb3IgPSBzZWFyY2hpbmdGb3IuZ2V0KHRoaXMpO1xuXG4gICAgaWYgKGN1cnJlbnRTZWFyY2hpbmdGb3IgIT09IHRleHQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZXMgPSBnZXRTdGF0ZXModGhpcyk7XG4gICAgICBjdXJyZW50U3RhdGVzLm5lZWRUb1NlYXJjaCA9IHRydWU7XG4gICAgICBzZXRTdGF0ZXModGhpcywgY3VycmVudFN0YXRlcyk7XG4gICAgICBzZWFyY2hpbmdGb3Iuc2V0KHRoaXMsIHRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgcmVjYWxjdWxhdGUgc2VsZWN0ZWQgcGF0aHMgYW5kIGZpbGxzIGxpc3Qgb2YgY29sdW1uc1xuICAgKiBAcGFyYW0ge251bWJlcn0gbGV2ZWwgVGhlIHNlbGVjdGVkIGxldmVsIChjb2x1bW4pXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCBUaGUgSUQgb2Ygc2VsZWN0ZWQgaXRlbSBpbiBhIGNvbHVtblxuICAgKi9cbiAgcmVmcmVzaChsZXZlbCwgaWQgPSBudWxsKSB7XG4gICAgY29uc3QgbGlzdE9mQ29sdW1ucyA9IGxpc3QuZ2V0KHRoaXMpO1xuICAgIGNvbnN0IHBhdGggPSBzZWxlY3RlZFBhdGguZ2V0KHRoaXMpO1xuXG4gICAgY29uc3QgY2xlYW5MZXZlbCA9IGxldmVsICYmIGxldmVsID4gMCA/IGxldmVsIC0gMSA6IDA7XG5cbiAgICByZWZyZXNoRGF0YSh0aGlzKTtcblxuICAgIHBhdGguc3BsaWNlKGNsZWFuTGV2ZWwpO1xuICAgIGxpc3RPZkNvbHVtbnMuc3BsaWNlKDApO1xuXG4gICAgaWYgKGlkICE9PSBudWxsKSB7XG4gICAgICBwYXRoLnB1c2goaWQpO1xuICAgIH1cblxuICAgIGlmIChsaXN0T2ZDb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGlzdE9mQ29sdW1ucy5wdXNoKG5ldyBDb2x1bW5EYXRhKG51bGwsIGdldERhdGEodGhpcykpKTtcbiAgICB9XG5cbiAgICBwYXRoLmZvckVhY2goKHNlbGVjdGVkSWQsIHRoaXNMZXZlbCkgPT4ge1xuICAgICAgY29uc3QgbmV4dExldmVsID0gdGhpc0xldmVsICsgMTtcblxuICAgICAgY29uc3QgaXRlbSA9IGxpc3RPZkNvbHVtbnNbdGhpc0xldmVsXSA/XG4gICAgICAgIGxpc3RPZkNvbHVtbnNbdGhpc0xldmVsXS5pdGVtcy5maW5kKGVsID0+IChlbC5pZCA9PT0gc2VsZWN0ZWRJZCkpIDogbnVsbDtcblxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKG5leHRMZXZlbCA+PSBsaXN0T2ZDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgIGxpc3RPZkNvbHVtbnMucHVzaChuZXcgQ29sdW1uRGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdE9mQ29sdW1uc1tuZXh0TGV2ZWxdLnBhcmVudElkICE9PSBzZWxlY3RlZElkKSB7XG4gICAgICAgICAgbGlzdE9mQ29sdW1uc1tuZXh0TGV2ZWxdLnBhcmVudElkID0gc2VsZWN0ZWRJZDtcbiAgICAgICAgICBsaXN0T2ZDb2x1bW5zW25leHRMZXZlbF0uaXRlbXMgPSBpdGVtLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==