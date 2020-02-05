function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    searchModel.set(_assertThisInitialized(_this), new Search(dataSourceProvider));
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
}(BaseModel);

export { ColumnList as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0LmpzIl0sIm5hbWVzIjpbIkNvbHVtbkRhdGEiLCJCYXNlTW9kZWwiLCJTZWFyY2giLCJVdGlscyIsImRhdGEiLCJXZWFrTWFwIiwibGlzdCIsInN0YXRlcyIsInNlYXJjaGluZ0ZvciIsInNlYXJjaE1vZGVsIiwic2VsZWN0ZWRQYXRoIiwiZ2V0RGF0YSIsInRoaXNPYmoiLCJnZXQiLCJnZXREZWZhdWx0U3RhdGVzIiwibmVlZFRvU2VhcmNoIiwiZ2V0U3RhdGVzIiwic2V0U3RhdGVzIiwic3RhdGVPYmoiLCJzZXQiLCJyZWZyZXNoRGF0YSIsImRhdGFQcm92aWRlciIsImRhdGFTb3VyY2VQcm92aWRlciIsImlzTG9hZGVkIiwiY3VycmVudFN0YXRlcyIsInNlYXJjaGluRm9yVGV4dCIsImVub3VnaFNlYXJjaFRleHRMZW5ndGgiLCJtb2RlbCIsInNlYXJjaCIsIkNvbHVtbkxpc3QiLCJ0ZXh0IiwiY3VycmVudFNlYXJjaGluZ0ZvciIsInJlZnJlc2giLCJsZXZlbCIsImlkIiwibGlzdE9mQ29sdW1ucyIsInBhdGgiLCJjbGVhbkxldmVsIiwic3BsaWNlIiwicHVzaCIsImxlbmd0aCIsImZvckVhY2giLCJzZWxlY3RlZElkIiwidGhpc0xldmVsIiwibmV4dExldmVsIiwiaXRlbSIsIml0ZW1zIiwiZmluZCIsImVsIiwiY2hpbGRyZW4iLCJwYXJlbnRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLFVBQVAsTUFBdUIsZUFBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFNBQXRCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixXQUFuQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFFQSxJQUFNQyxJQUFJLEdBQUcsSUFBSUMsT0FBSixFQUFiO0FBQ0EsSUFBTUMsSUFBSSxHQUFHLElBQUlELE9BQUosRUFBYjtBQUNBLElBQU1FLE1BQU0sR0FBRyxJQUFJRixPQUFK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bi1kYXRhJztcbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL3NlYXJjaCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5jb25zdCBkYXRhID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGxpc3QgPSBuZXcgV2Vha01hcCgpO1xuY29uc3Qgc3RhdGVzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHNlYXJjaGluZ0ZvciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzZWFyY2hNb2RlbCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzZWxlY3RlZFBhdGggPSBuZXcgV2Vha01hcCgpO1xuXG5mdW5jdGlvbiBnZXREYXRhKHRoaXNPYmopIHtcbiAgcmV0dXJuIGRhdGEuZ2V0KHRoaXNPYmopIHx8IFtdO1xufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0U3RhdGVzKCkge1xuICByZXR1cm4ge1xuICAgIG5lZWRUb1NlYXJjaDogZmFsc2UsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFN0YXRlcyh0aGlzT2JqKSB7XG4gIHJldHVybiBzdGF0ZXMuZ2V0KHRoaXNPYmopIHx8IHt9O1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0ZXModGhpc09iaiwgc3RhdGVPYmopIHtcbiAgcmV0dXJuIHN0YXRlcy5zZXQodGhpc09iaiwgc3RhdGVPYmopO1xufVxuXG5mdW5jdGlvbiByZWZyZXNoRGF0YSh0aGlzT2JqKSB7XG4gIGNvbnN0IGRhdGFQcm92aWRlciA9IHRoaXNPYmouZGF0YVNvdXJjZVByb3ZpZGVyO1xuXG4gIGlmIChkYXRhLmdldCh0aGlzT2JqKSA9PT0gbnVsbCkge1xuICAgIGlmIChkYXRhUHJvdmlkZXIuaXNMb2FkZWQpIHtcbiAgICAgIGRhdGEuc2V0KHRoaXNPYmosIGRhdGFQcm92aWRlci5nZXREYXRhKCkpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkYXRhLmdldCh0aGlzT2JqKSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZXMgPSBnZXRTdGF0ZXModGhpc09iaik7XG5cbiAgICBpZiAoY3VycmVudFN0YXRlcy5uZWVkVG9TZWFyY2gpIHtcbiAgICAgIGNvbnN0IHNlYXJjaGluRm9yVGV4dCA9IHNlYXJjaGluZ0Zvci5nZXQodGhpc09iaik7XG5cbiAgICAgIGlmIChVdGlscy5lbm91Z2hTZWFyY2hUZXh0TGVuZ3RoKHNlYXJjaGluRm9yVGV4dCkpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBzZWFyY2hNb2RlbC5nZXQodGhpc09iaik7XG4gICAgICAgIGRhdGEuc2V0KHRoaXNPYmosIG1vZGVsLnNlYXJjaChzZWFyY2hpbkZvclRleHQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEuc2V0KHRoaXNPYmosIGRhdGFQcm92aWRlci5nZXREYXRhKCkpO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U3RhdGVzLm5lZWRUb1NlYXJjaCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGVzKHRoaXNPYmosIGN1cnJlbnRTdGF0ZXMpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5MaXN0IGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgY29uc3RydWN0b3IoZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gICAgc3VwZXIoZGF0YVNvdXJjZVByb3ZpZGVyKTtcblxuICAgIGRhdGEuc2V0KHRoaXMsIG51bGwpO1xuICAgIGxpc3Quc2V0KHRoaXMsIFtdKTtcbiAgICBzdGF0ZXMuc2V0KHRoaXMsIGdldERlZmF1bHRTdGF0ZXMoKSk7XG4gICAgc2VhcmNoaW5nRm9yLnNldCh0aGlzLCAnJyk7XG4gICAgc2VhcmNoTW9kZWwuc2V0KHRoaXMsIG5ldyBTZWFyY2goZGF0YVNvdXJjZVByb3ZpZGVyKSk7XG4gICAgc2VsZWN0ZWRQYXRoLnNldCh0aGlzLCBbXSk7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiBsaXN0LmdldCh0aGlzKS5sZW5ndGg7XG4gIH1cblxuICBnZXQgbGlzdCgpIHtcbiAgICByZXR1cm4gbGlzdC5nZXQodGhpcyk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRQYXRoKCkge1xuICAgIHJldHVybiBzZWxlY3RlZFBhdGguZ2V0KHRoaXMpO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gZ2V0RGF0YSh0aGlzKTtcbiAgfVxuXG4gIHNldFNlYXJjaGluZ0ZvciA9ICh0ZXh0KSA9PiB7XG4gICAgY29uc3QgY3VycmVudFNlYXJjaGluZ0ZvciA9IHNlYXJjaGluZ0Zvci5nZXQodGhpcyk7XG5cbiAgICBpZiAoY3VycmVudFNlYXJjaGluZ0ZvciAhPT0gdGV4dCkge1xuICAgICAgY29uc3QgY3VycmVudFN0YXRlcyA9IGdldFN0YXRlcyh0aGlzKTtcbiAgICAgIGN1cnJlbnRTdGF0ZXMubmVlZFRvU2VhcmNoID0gdHJ1ZTtcbiAgICAgIHNldFN0YXRlcyh0aGlzLCBjdXJyZW50U3RhdGVzKTtcbiAgICAgIHNlYXJjaGluZ0Zvci5zZXQodGhpcywgdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCByZWNhbGN1bGF0ZSBzZWxlY3RlZCBwYXRocyBhbmQgZmlsbHMgbGlzdCBvZiBjb2x1bW5zXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCBUaGUgc2VsZWN0ZWQgbGV2ZWwgKGNvbHVtbilcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIFRoZSBJRCBvZiBzZWxlY3RlZCBpdGVtIGluIGEgY29sdW1uXG4gICAqL1xuICByZWZyZXNoKGxldmVsLCBpZCA9IG51bGwpIHtcbiAgICBjb25zdCBsaXN0T2ZDb2x1bW5zID0gbGlzdC5nZXQodGhpcyk7XG4gICAgY29uc3QgcGF0aCA9IHNlbGVjdGVkUGF0aC5nZXQodGhpcyk7XG5cbiAgICBjb25zdCBjbGVhbkxldmVsID0gbGV2ZWwgJiYgbGV2ZWwgPiAwID8gbGV2ZWwgLSAxIDogMDtcblxuICAgIHJlZnJlc2hEYXRhKHRoaXMpO1xuXG4gICAgcGF0aC5zcGxpY2UoY2xlYW5MZXZlbCk7XG4gICAgbGlzdE9mQ29sdW1ucy5zcGxpY2UoMCk7XG5cbiAgICBpZiAoaWQgIT09IG51bGwpIHtcbiAgICAgIHBhdGgucHVzaChpZCk7XG4gICAgfVxuXG4gICAgaWYgKGxpc3RPZkNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBsaXN0T2ZDb2x1bW5zLnB1c2gobmV3IENvbHVtbkRhdGEobnVsbCwgZ2V0RGF0YSh0aGlzKSkpO1xuICAgIH1cblxuICAgIHBhdGguZm9yRWFjaCgoc2VsZWN0ZWRJZCwgdGhpc0xldmVsKSA9PiB7XG4gICAgICBjb25zdCBuZXh0TGV2ZWwgPSB0aGlzTGV2ZWwgKyAxO1xuXG4gICAgICBjb25zdCBpdGVtID0gbGlzdE9mQ29sdW1uc1t0aGlzTGV2ZWxdID9cbiAgICAgICAgbGlzdE9mQ29sdW1uc1t0aGlzTGV2ZWxdLml0ZW1zLmZpbmQoZWwgPT4gKGVsLmlkID09PSBzZWxlY3RlZElkKSkgOiBudWxsO1xuXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAobmV4dExldmVsID49IGxpc3RPZkNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgbGlzdE9mQ29sdW1ucy5wdXNoKG5ldyBDb2x1bW5EYXRhKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0T2ZDb2x1bW5zW25leHRMZXZlbF0ucGFyZW50SWQgIT09IHNlbGVjdGVkSWQpIHtcbiAgICAgICAgICBsaXN0T2ZDb2x1bW5zW25leHRMZXZlbF0ucGFyZW50SWQgPSBzZWxlY3RlZElkO1xuICAgICAgICAgIGxpc3RPZkNvbHVtbnNbbmV4dExldmVsXS5pdGVtcyA9IGl0ZW0uY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19