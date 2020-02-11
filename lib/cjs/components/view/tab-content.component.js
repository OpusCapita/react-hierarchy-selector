"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSearchbar = _interopRequireDefault(require("@opuscapita/react-searchbar"));

var _spinner = _interopRequireDefault(require("../spinner"));

var _types = require("../../services/types");

var _columnList = _interopRequireDefault(require("../../models/column/column-list"));

var _column = _interopRequireDefault(require("./column/column.component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ViewTabContent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ViewTabContent, _React$PureComponent);

  function ViewTabContent(_props) {
    var _this;

    _this = _React$PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "getIdOfFirstItem", function (props) {
      var dataSourceProvider = props.dataSourceProvider;
      var firstItem = dataSourceProvider.getFirstItem();
      if (firstItem === null || !firstItem.id) return null;
      return firstItem.id;
    });

    _defineProperty(_assertThisInitialized(_this), "getContent", function () {
      _this.refreshContent();

      var list = _this.columns.list || [];
      var selectedPath = _this.columns.selectedPath || [];
      var parentIds = [];
      var anyCheckedAll = false;
      return _react["default"].createElement("div", {
        className: "oc-hierarchy-selector-tab-content"
      }, _react["default"].createElement("div", {
        className: "oc-hierarchy-selector-tab-search-bar"
      }, _react["default"].createElement(_reactSearchbar["default"], {
        defaltValue: _this.state.searchingFor,
        isDynamic: true,
        isTooltipEnabled: !!_this.props.searchTooltip,
        minChars: 2,
        translations: {
          tooltip: _this.props.searchTooltip,
          searchPlaceHolder: _this.props.searchPlaceHolder
        },
        onSearch: _this.searchChangeHandler,
        onClear: _this.searchClearHandler
      })), _react["default"].createElement("div", {
        className: "oc-hierarchy-selector-column-wrapper"
      }, Object.keys(list).map(function (key) {
        var data = list[key];
        var selectedId = selectedPath[key] ? String(selectedPath[key]) : null;
        var parentReferenceIds = parentIds.slice();

        var isCheckedAll = _this.getIsCheckedAll(parentIds);

        var checkedIds = isCheckedAll ? [] : _this.getCheckedIds(parentIds, data);
        anyCheckedAll = anyCheckedAll || isCheckedAll;
        parentIds.push(selectedId);
        return _react["default"].createElement(_column["default"], {
          allLabel: _this.props.allLabel,
          checkedAll: anyCheckedAll || isCheckedAll,
          checkedAllDisabled: anyCheckedAll && !isCheckedAll,
          checkedAllHidden: Number(key) === 0,
          checkedIds: checkedIds,
          data: data,
          index: Number(key) + 1,
          itemRenderFunction: _this.props.listItemRenderFunction,
          key: Number(key) + 1,
          referenceIds: parentReferenceIds,
          selectedId: selectedId,
          onCheck: _this.checkHandler,
          onCheckAll: _this.checkAllHandler,
          onClick: _this.clickHandler
        });
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getSpinner", function () {
      return _react["default"].createElement("div", {
        className: "oc-hierarchy-selector-tab-content"
      }, _react["default"].createElement(_spinner["default"], null));
    });

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (level, id) {
      _this.setState({
        selectedColumn: level,
        selectedId: id
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkHandler", function (referenceIds, id, checkState) {
      var checkedItemHashList = _this.props.dataSourceProvider.getChecked();

      if (checkState) {
        checkedItemHashList.add(referenceIds, id);
      } else {
        checkedItemHashList.remove(referenceIds, id);
      }

      _this.setState({
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
      });

      _this.props.onCheckListChange(checkedItemHashList);
    });

    _defineProperty(_assertThisInitialized(_this), "checkAllHandler", function (referenceIds, checkState) {
      var parentIds = referenceIds.slice();
      var id = parentIds.pop();
      if (!id) throw new Error('There is no selected parent element to perform checking of all elements');

      var checkedItemHashList = _this.props.dataSourceProvider.getChecked();

      if (checkState) {
        checkedItemHashList.addAll(parentIds, id);
      } else {
        checkedItemHashList.removeAll(parentIds, id);
      }

      _this.setState({
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
      });

      _this.props.onCheckListChange(checkedItemHashList);
    });

    _defineProperty(_assertThisInitialized(_this), "searchChangeHandler", function (searchingFor) {
      return _this.setState({
        searchingFor: searchingFor
      });
    });

    _defineProperty(_assertThisInitialized(_this), "searchClearHandler", function () {
      _this.setState({
        searchingFor: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadData", function (props) {
      var dataSourceProvider = props.dataSourceProvider,
          onCheckListChange = props.onCheckListChange;
      dataSourceProvider.loadData().then(function () {
        var checkedItemHashList = dataSourceProvider.getChecked();
        var stateObject = {
          isDataLoaded: dataSourceProvider.isLoaded,
          checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
        };

        var idOfFirstItem = _this.getIdOfFirstItem(props);

        if (idOfFirstItem !== null) {
          stateObject.selectedColumn = 1;
          stateObject.selectedId = idOfFirstItem;
        }

        _this.setState(stateObject);

        onCheckListChange(checkedItemHashList);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "refreshContent", function () {
      var _this$state = _this.state,
          selectedColumn = _this$state.selectedColumn,
          selectedId = _this$state.selectedId,
          searchingFor = _this$state.searchingFor;

      _this.columns.setSearchingFor(searchingFor);

      _this.columns.refresh(selectedColumn, selectedId);
    });

    var isDataLoaded = _props.dataSourceProvider.isLoaded;

    var _idOfFirstItem = _this.getIdOfFirstItem(_props);

    _this.state = {
      isDataLoaded: isDataLoaded,
      checkedItemsLastUpdate: 0,
      searchingFor: '',
      selectedColumn: _idOfFirstItem !== null ? 1 : 0,
      selectedId: _idOfFirstItem
    };
    _this.columns = new _columnList["default"](_props.dataSourceProvider);
    return _this;
  }

  var _proto = ViewTabContent.prototype;

  _proto.componentWillMount = function componentWillMount() {
    if (!this.state.isDataLoaded) {
      this.loadData(this.props);
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var isLoaded = nextProps.dataSourceProvider.isLoaded;
    var checked = nextProps.dataSourceProvider.getChecked();

    if (this.state.isDataLoaded !== isLoaded) {
      this.setState({
        isDataLoaded: isLoaded
      });
    }

    if (!isLoaded) {
      this.loadData(nextProps);
    }

    if (checked) {
      var lastUpdated = checked.getLastUpdateStamp();

      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated
        });
      }
    }
  };

  _proto.getIsCheckedAll = function getIsCheckedAll(parentIds) {
    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    return checkedItemHashList.getIsCheckedAll(parentIds);
  };

  _proto.getCheckedIds = function getCheckedIds(parentIds, data) {
    var _this2 = this;

    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    var result = checkedItemHashList.getCheckedItems(parentIds).map(function (i) {
      return i.id;
    }); // Adds all items that have checkedAll in children

    if (data && Array.isArray(data.items)) {
      data.items.forEach(function (item) {
        var currentParentIds = parentIds.slice();
        currentParentIds.push(item.id);

        if (_this2.getIsCheckedAll(currentParentIds)) {
          result.push(item.id);
        }
      });
    }

    return result;
  };

  _proto.render = function render() {
    return this.state.isDataLoaded ? this.getContent() : this.getSpinner();
  };

  return ViewTabContent;
}(_react["default"].PureComponent);

exports["default"] = ViewTabContent;
ViewTabContent.defaultProps = {
  allLabel: 'All',
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJWaWV3VGFiQ29udGVudCIsInByb3BzIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiZmlyc3RJdGVtIiwiZ2V0Rmlyc3RJdGVtIiwiaWQiLCJyZWZyZXNoQ29udGVudCIsImxpc3QiLCJjb2x1bW5zIiwic2VsZWN0ZWRQYXRoIiwicGFyZW50SWRzIiwiYW55Q2hlY2tlZEFsbCIsInN0YXRlIiwic2VhcmNoaW5nRm9yIiwic2VhcmNoVG9vbHRpcCIsInRvb2x0aXAiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaENoYW5nZUhhbmRsZXIiLCJzZWFyY2hDbGVhckhhbmRsZXIiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwiZGF0YSIsInNlbGVjdGVkSWQiLCJTdHJpbmciLCJwYXJlbnRSZWZlcmVuY2VJZHMiLCJzbGljZSIsImlzQ2hlY2tlZEFsbCIsImdldElzQ2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJnZXRDaGVja2VkSWRzIiwicHVzaCIsImFsbExhYmVsIiwiTnVtYmVyIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrSGFuZGxlciIsImNoZWNrQWxsSGFuZGxlciIsImNsaWNrSGFuZGxlciIsImxldmVsIiwic2V0U3RhdGUiLCJzZWxlY3RlZENvbHVtbiIsInJlZmVyZW5jZUlkcyIsImNoZWNrU3RhdGUiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiZ2V0Q2hlY2tlZCIsImFkZCIsInJlbW92ZSIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJvbkNoZWNrTGlzdENoYW5nZSIsInBvcCIsIkVycm9yIiwiYWRkQWxsIiwicmVtb3ZlQWxsIiwibG9hZERhdGEiLCJ0aGVuIiwic3RhdGVPYmplY3QiLCJpc0RhdGFMb2FkZWQiLCJpc0xvYWRlZCIsImlkT2ZGaXJzdEl0ZW0iLCJnZXRJZE9mRmlyc3RJdGVtIiwic2V0U2VhcmNoaW5nRm9yIiwicmVmcmVzaCIsIkNvbHVtbkxpc3QiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiY2hlY2tlZCIsImxhc3RVcGRhdGVkIiwicmVzdWx0IiwiZ2V0Q2hlY2tlZEl0ZW1zIiwiaSIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJjdXJyZW50UGFyZW50SWRzIiwicmVuZGVyIiwiZ2V0Q29udGVudCIsImdldFNwaW5uZXIiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7O0FBQ25CLDBCQUFZQyxNQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLDRDQUFNQSxNQUFOOztBQURpQix1RUErQ0EsVUFBQ0EsS0FBRCxFQUFXO0FBQUEsVUFDcEJDLGtCQURvQixHQUNHRCxLQURILENBQ3BCQyxrQkFEb0I7QUFFNUIsVUFBTUMsU0FBUyxHQUFHRCxrQkFBa0IsQ0FBQ0UsWUFBbkIsRUFBbEI7QUFDQSxVQUFJRCxTQUFTLEtBQUssSUFBZCxJQUFzQixDQUFDQSxTQUFTLENBQUNFLEVBQXJDLEVBQXlDLE9BQU8sSUFBUDtBQUV6QyxhQUFPRixTQUFTLENBQUNFLEVBQWpCO0FBQ0QsS0FyRGtCOztBQUFBLGlFQThFTixZQUFNO0FBQ2pCLFlBQUtDLGNBQUw7O0FBQ0EsVUFBTUMsSUFBSSxHQUFHLE1BQUtDLE9BQUwsQ0FBYUQsSUFBYixJQUFxQixFQUFsQztBQUNBLFVBQU1FLFlBQVksR0FBRyxNQUFLRCxPQUFMLENBQWFDLFlBQWIsSUFBNkIsRUFBbEQ7QUFDQSxVQUFNQyxTQUFTLEdBQUcsRUFBbEI7QUFDQSxVQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFFQSxhQUNFO0FBQUssUUFBQSxTQUFTLEVB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cEUsU0FBUyxDQUFDaUIsS0FBVixFQUF6QjtBQUNBbUQsUUFBQUEsZ0JBQWdCLENBQUM5QyxJQUFqQixDQUFzQjZDLElBQUksQ0FBQ3hFLEVBQTNCOztBQUNBLFlBQUksTUFBSSxDQUFDd0IsZUFBTCxDQUFxQmlELGdCQUFyQixDQUFKLEVBQTRDO0FBQzFDUixVQUFBQSxNQUFNLENBQUN0QyxJQUFQLENBQVk2QyxJQUFJLENBQUN4RSxFQUFqQjtBQUNEO0FBQ0YsT0FORDtBQU9EOztBQUVELFdBQU9pRSxNQUFQO0FBQ0QsRzs7U0FxSURTLE0sR0FBQSxrQkFBUztBQUNQLFdBQ0UsS0FBS25FLEtBQUwsQ0FBVzhDLFlBQVgsR0FBMEIsS0FBS3NCLFVBQUwsRUFBMUIsR0FBOEMsS0FBS0MsVUFBTCxFQURoRDtBQUdELEc7OztFQXROeUNDLGtCQUFNQyxhOzs7QUFtT2xEbkYsY0FBYyxDQUFDb0YsWUFBZixHQUE4QjtBQUM1Qm5ELEVBQUFBLFFBQVEsRUFBRSxLQURrQjtBQUU1QkUsRUFBQUEsc0JBQXNCLEVBQUUsSUFGSTtBQUc1Qm5CLEVBQUFBLGlCQUFpQixFQUFFLFdBSFM7QUFJNUJGLEVBQUFBLGFBQWEsRUFBRSxJQUphO0FBSzVCb0MsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQU0sQ0FBRTtBQUxDLENBQTlCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlYXJjaGJhcic7XG5cbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCBDb2x1bW5MaXN0IGZyb20gJy4uLy4uL21vZGVscy9jb2x1bW4vY29sdW1uLWxpc3QnO1xuaW1wb3J0IFZpZXdDb2x1bW4gZnJvbSAnLi9jb2x1bW4vY29sdW1uLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUYWJDb250ZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xuICAgIGNvbnN0IGlkT2ZGaXJzdEl0ZW0gPSB0aGlzLmdldElkT2ZGaXJzdEl0ZW0ocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGF0YUxvYWRlZCxcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IDAsXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxuICAgICAgc2VsZWN0ZWRDb2x1bW46IGlkT2ZGaXJzdEl0ZW0gIT09IG51bGwgPyAxIDogMCxcbiAgICAgIHNlbGVjdGVkSWQ6IGlkT2ZGaXJzdEl0ZW0sXG4gICAgfTtcblxuICAgIHRoaXMuY29sdW1ucyA9IG5ldyBDb2x1bW5MaXN0KHByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IHsgaXNMb2FkZWQgfSA9IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXI7XG4gICAgY29uc3QgY2hlY2tlZCA9IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkICE9PSBpc0xvYWRlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzRGF0YUxvYWRlZDogaXNMb2FkZWQsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzTG9hZGVkKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgIGNvbnN0IGxhc3RVcGRhdGVkID0gY2hlY2tlZC5nZXRMYXN0VXBkYXRlU3RhbXAoKTtcbiAgICAgIGlmIChsYXN0VXBkYXRlZCAhPT0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbXNMYXN0VXBkYXRlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGxhc3RVcGRhdGVkLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRJZE9mRmlyc3RJdGVtID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIgfSA9IHByb3BzO1xuICAgIGNvbnN0IGZpcnN0SXRlbSA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRGaXJzdEl0ZW0oKTtcbiAgICBpZiAoZmlyc3RJdGVtID09PSBudWxsIHx8ICFmaXJzdEl0ZW0uaWQpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIGZpcnN0SXRlbS5pZDtcbiAgfVxuXG4gIGdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgIHJldHVybiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0Q2hlY2tlZEl0ZW1zKHBhcmVudElkcykubWFwKGkgPT4gaS5pZCk7XG5cbiAgICAvLyBBZGRzIGFsbCBpdGVtcyB0aGF0IGhhdmUgY2hlY2tlZEFsbCBpbiBjaGlsZHJlblxuICAgIGlmIChkYXRhICYmIEFycmF5LmlzQXJyYXkoZGF0YS5pdGVtcykpIHtcbiAgICAgIGRhdGEuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50UGFyZW50SWRzID0gcGFyZW50SWRzLnNsaWNlKCk7XG4gICAgICAgIGN1cnJlbnRQYXJlbnRJZHMucHVzaChpdGVtLmlkKTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0SXNDaGVja2VkQWxsKGN1cnJlbnRQYXJlbnRJZHMpKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5pZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5jb2x1bW5zLmxpc3QgfHwgW107XG4gICAgY29uc3Qgc2VsZWN0ZWRQYXRoID0gdGhpcy5jb2x1bW5zLnNlbGVjdGVkUGF0aCB8fCBbXTtcbiAgICBjb25zdCBwYXJlbnRJZHMgPSBbXTtcbiAgICBsZXQgYW55Q2hlY2tlZEFsbCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1zZWFyY2gtYmFyXCI+XG4gICAgICAgICAgPFNlYXJjaEJhclxuICAgICAgICAgICAgZGVmYWx0VmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yfVxuICAgICAgICAgICAgaXNEeW5hbWljXG4gICAgICAgICAgICBpc1Rvb2x0aXBFbmFibGVkPXshIXRoaXMucHJvcHMuc2VhcmNoVG9vbHRpcH1cbiAgICAgICAgICAgIG1pbkNoYXJzPXsyfVxuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXt7XG4gICAgICAgICAgICAgIHRvb2x0aXA6IHRoaXMucHJvcHMuc2VhcmNoVG9vbHRpcCxcbiAgICAgICAgICAgICAgc2VhcmNoUGxhY2VIb2xkZXI6IHRoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXIsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25TZWFyY2g9e3RoaXMuc2VhcmNoQ2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgIG9uQ2xlYXI9e3RoaXMuc2VhcmNoQ2xlYXJIYW5kbGVyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW4td3JhcHBlclwiPlxuICAgICAgICAgIHsgT2JqZWN0LmtleXMobGlzdCkubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBsaXN0W2tleV07XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZElkID0gc2VsZWN0ZWRQYXRoW2tleV0gPyBTdHJpbmcoc2VsZWN0ZWRQYXRoW2tleV0pIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFJlZmVyZW5jZUlkcyA9IHBhcmVudElkcy5zbGljZSgpO1xuICAgICAgICAgICAgY29uc3QgaXNDaGVja2VkQWxsID0gdGhpcy5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrZWRJZHMgPSBpc0NoZWNrZWRBbGwgPyBbXSA6IHRoaXMuZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpO1xuXG4gICAgICAgICAgICBhbnlDaGVja2VkQWxsID0gYW55Q2hlY2tlZEFsbCB8fCBpc0NoZWNrZWRBbGw7XG4gICAgICAgICAgICBwYXJlbnRJZHMucHVzaChzZWxlY3RlZElkKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPFZpZXdDb2x1bW5cbiAgICAgICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsPXthbnlDaGVja2VkQWxsIHx8IGlzQ2hlY2tlZEFsbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsRGlzYWJsZWQ9e2FueUNoZWNrZWRBbGwgJiYgIWlzQ2hlY2tlZEFsbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsSGlkZGVuPXtOdW1iZXIoa2V5KSA9PT0gMH1cbiAgICAgICAgICAgICAgICBjaGVja2VkSWRzPXtjaGVja2VkSWRzfVxuICAgICAgICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgICAgICAgaW5kZXg9e051bWJlcihrZXkpICsgMX1cbiAgICAgICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgICAgICBrZXk9e051bWJlcihrZXkpICsgMX1cbiAgICAgICAgICAgICAgICByZWZlcmVuY2VJZHM9e3BhcmVudFJlZmVyZW5jZUlkc31cbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkPXtzZWxlY3RlZElkfVxuICAgICAgICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgIG9uQ2hlY2tBbGw9e3RoaXMuY2hlY2tBbGxIYW5kbGVyfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBnZXRTcGlubmVyID0gKCkgPT4gPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFiLWNvbnRlbnRcIj48U3Bpbm5lciAvPjwvZGl2PjtcblxuICBjbGlja0hhbmRsZXIgPSAobGV2ZWwsIGlkKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZENvbHVtbjogbGV2ZWwsXG4gICAgICBzZWxlY3RlZElkOiBpZCxcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGlkLCBjaGVja1N0YXRlKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICBpZiAoY2hlY2tTdGF0ZSkge1xuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5hZGQocmVmZXJlbmNlSWRzLCBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucmVtb3ZlKHJlZmVyZW5jZUlkcywgaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcbiAgfVxuXG4gIGNoZWNrQWxsSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGNoZWNrU3RhdGUpID0+IHtcbiAgICBjb25zdCBwYXJlbnRJZHMgPSByZWZlcmVuY2VJZHMuc2xpY2UoKTtcbiAgICBjb25zdCBpZCA9IHBhcmVudElkcy5wb3AoKTtcblxuICAgIGlmICghaWQpIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gc2VsZWN0ZWQgcGFyZW50IGVsZW1lbnQgdG8gcGVyZm9ybSBjaGVja2luZyBvZiBhbGwgZWxlbWVudHMnKTtcblxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgaWYgKGNoZWNrU3RhdGUpIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QuYWRkQWxsKHBhcmVudElkcywgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LnJlbW92ZUFsbChwYXJlbnRJZHMsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XG4gIH1cblxuICBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gc2VhcmNoaW5nRm9yID0+IHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3IgfSk7XG5cbiAgc2VhcmNoQ2xlYXJIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3I6ICcnIH0pO1xuICB9XG5cbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgb25DaGVja0xpc3RDaGFuZ2UgfSA9IHByb3BzO1xuICAgIGRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgICBjb25zdCBzdGF0ZU9iamVjdCA9IHtcbiAgICAgICAgaXNEYXRhTG9hZGVkOiBkYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpZE9mRmlyc3RJdGVtID0gdGhpcy5nZXRJZE9mRmlyc3RJdGVtKHByb3BzKTtcbiAgICAgIGlmIChpZE9mRmlyc3RJdGVtICE9PSBudWxsKSB7XG4gICAgICAgIHN0YXRlT2JqZWN0LnNlbGVjdGVkQ29sdW1uID0gMTtcbiAgICAgICAgc3RhdGVPYmplY3Quc2VsZWN0ZWRJZCA9IGlkT2ZGaXJzdEl0ZW07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGVPYmplY3QpO1xuXG4gICAgICBvbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZnJlc2hDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb2x1bW4sIHNlbGVjdGVkSWQsIHNlYXJjaGluZ0ZvciB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmNvbHVtbnMuc2V0U2VhcmNoaW5nRm9yKHNlYXJjaGluZ0Zvcik7XG4gICAgdGhpcy5jb2x1bW5zLnJlZnJlc2goc2VsZWN0ZWRDb2x1bW4sIHNlbGVjdGVkSWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRTcGlubmVyKClcbiAgICApO1xuICB9XG59XG5cblZpZXdUYWJDb250ZW50LnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblZpZXdUYWJDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIHNlYXJjaFRvb2x0aXA6IG51bGwsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iXX0=