var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import SearchBar from '../search-bar';
import { dataSourceProviderType } from '../../services/types';
import ColumnList from '../../models/column/column-list';
import Utils from '../../utils';
import ViewColumn from './column/column.component';

var ViewTabContent = (_temp = _class = function (_React$PureComponent) {
  _inherits(ViewTabContent, _React$PureComponent);

  function ViewTabContent(props) {
    _classCallCheck(this, ViewTabContent);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var isDataLoaded = props.dataSourceProvider.isLoaded;
    var idOfFirstItem = _this.getIdOfFirstItem(props);

    _this.state = {
      isDataLoaded: isDataLoaded,
      checkedItemsLastUpdate: 0,
      searchingFor: '',
      selectedColumn: idOfFirstItem !== null ? 1 : 0,
      selectedId: idOfFirstItem
    };

    _this.columns = new ColumnList(props.dataSourceProvider);
    return _this;
  }

  ViewTabContent.prototype.componentWillMount = function componentWillMount() {
    if (!this.state.isDataLoaded) {
      this.loadData(this.props);
    }
  };

  ViewTabContent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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

  ViewTabContent.prototype.getIsCheckedAll = function getIsCheckedAll(parentIds) {
    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    return checkedItemHashList.getIsCheckedAll(parentIds);
  };

  ViewTabContent.prototype.getCheckedIds = function getCheckedIds(parentIds, data) {
    var _this2 = this;

    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    var result = checkedItemHashList.getCheckedItems(parentIds).map(function (i) {
      return i.id;
    });

    // Adds all items that have checkedAll in children
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

  ViewTabContent.prototype.render = function render() {
    return this.state.isDataLoaded ? this.getContent() : this.getSpinner();
  };

  return ViewTabContent;
}(React.PureComponent), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getIdOfFirstItem = function (props) {
    var dataSourceProvider = props.dataSourceProvider;

    var firstItem = dataSourceProvider.getFirstItem();
    if (firstItem === null || !firstItem.id) return null;

    return firstItem.id;
  };

  this.getContent = function () {
    _this3.refreshContent();
    var list = _this3.columns.list || [];
    var selectedPath = _this3.columns.selectedPath || [];
    var parentIds = [];
    var anyCheckedAll = false;

    return React.createElement(
      'div',
      { className: 'oc-hierarchy-selector-tab-content' },
      React.createElement(
        'div',
        { className: 'oc-hierarchy-selector-tab-search-bar' },
        React.createElement(SearchBar, {
          searchPlaceHolder: _this3.props.searchPlaceHolder,
          onSearchChange: _this3.searchChangeHandler,
          onCloseClick: _this3.searchClearHandler
        })
      ),
      React.createElement(
        'div',
        { className: 'oc-hierarchy-selector-column-wrapper' },
        Object.keys(list).map(function (key) {
          var data = list[key];
          var selectedId = selectedPath[key] ? String(selectedPath[key]) : null;
          var parentReferenceIds = parentIds.slice();
          var isCheckedAll = _this3.getIsCheckedAll(parentIds);
          var checkedIds = isCheckedAll ? [] : _this3.getCheckedIds(parentIds, data);

          anyCheckedAll = anyCheckedAll || isCheckedAll;
          parentIds.push(selectedId);

          return React.createElement(ViewColumn, {
            allLabel: _this3.props.allLabel,
            checkedAll: anyCheckedAll || isCheckedAll,
            checkedAllDisabled: anyCheckedAll && !isCheckedAll,
            checkedAllHidden: Number(key) === 0,
            checkedIds: checkedIds,
            data: data,
            index: Number(key) + 1,
            itemRenderFunction: _this3.props.listItemRenderFunction,
            key: Number(key) + 1,
            referenceIds: parentReferenceIds,
            selectedId: selectedId,
            onCheck: _this3.checkHandler,
            onCheckAll: _this3.checkAllHandler,
            onClick: _this3.clickHandler
          });
        })
      )
    );
  };

  this.getSpinner = function () {
    return React.createElement(
      'div',
      { className: 'oc-hierarchy-selector-tab-content' },
      React.createElement(Spinner, null)
    );
  };

  this.clickHandler = function (level, id) {
    _this3.setState({
      selectedColumn: level,
      selectedId: id
    });
  };

  this.checkHandler = function (referenceIds, id, checkState) {
    var checkedItemHashList = _this3.props.dataSourceProvider.getChecked();
    if (checkState) {
      checkedItemHashList.add(referenceIds, id);
    } else {
      checkedItemHashList.remove(referenceIds, id);
    }
    _this3.setState({
      checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
    });
    _this3.props.onCheckListChange(checkedItemHashList);
  };

  this.checkAllHandler = function (referenceIds, checkState) {
    var parentIds = referenceIds.slice();
    var id = parentIds.pop();

    if (!id) throw new Error('There is no selected parent element to perform checking of all elements');

    var checkedItemHashList = _this3.props.dataSourceProvider.getChecked();
    if (checkState) {
      checkedItemHashList.addAll(parentIds, id);
    } else {
      checkedItemHashList.removeAll(parentIds, id);
    }
    _this3.setState({
      checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
    });
    _this3.props.onCheckListChange(checkedItemHashList);
  };

  this.searchChangeHandler = function (e) {
    var searchingValue = e.target ? e.target.value || '' : '';
    var searchingFor = '';

    if (Utils.enoughSearchTextLength(searchingValue)) {
      searchingFor = searchingValue;
    }
    _this3.setState({ searchingFor: searchingFor });
  };

  this.searchClearHandler = function () {
    _this3.setState({ searchingFor: '' });
  };

  this.loadData = function (props) {
    var dataSourceProvider = props.dataSourceProvider,
        onCheckListChange = props.onCheckListChange;

    dataSourceProvider.loadData().then(function () {
      var checkedItemHashList = dataSourceProvider.getChecked();
      var stateObject = {
        isDataLoaded: dataSourceProvider.isLoaded,
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
      };

      var idOfFirstItem = _this3.getIdOfFirstItem(props);
      if (idOfFirstItem !== null) {
        stateObject.selectedColumn = 1;
        stateObject.selectedId = idOfFirstItem;
      }

      _this3.setState(stateObject);

      onCheckListChange(checkedItemHashList);
    });
  };

  this.refreshContent = function () {
    var _state = _this3.state,
        selectedColumn = _state.selectedColumn,
        selectedId = _state.selectedId,
        searchingFor = _state.searchingFor;

    _this3.columns.setSearchingFor(searchingFor);
    _this3.columns.refresh(selectedColumn, selectedId);
  };
}, _temp);
export { ViewTabContent as default };


ViewTabContent.defaultProps = {
  allLabel: 'All',
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlNwaW5uZXIiLCJTZWFyY2hCYXIiLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwiQ29sdW1uTGlzdCIsIlV0aWxzIiwiVmlld0NvbHVtbiIsIlZpZXdUYWJDb250ZW50IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsImlkT2ZGaXJzdEl0ZW0iLCJnZXRJZE9mRmlyc3RJdGVtIiwic3RhdGUiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwic2VhcmNoaW5nRm9yIiwic2VsZWN0ZWRDb2x1bW4iLCJzZWxlY3RlZElkIiwiY29sdW1ucyIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImNoZWNrZWQiLCJnZXRDaGVja2VkIiwic2V0U3RhdGUiLCJsYXN0VXBkYXRlZCIsImdldExhc3RVcGRhdGVTdGFtcCIsImdldElzQ2hlY2tlZEFsbCIsInBhcmVudElkcyIsImNoZWNrZWRJdGVtSGFzaExpc3QiLCJnZXRDaGVja2VkSWRzIiwiZGF0YSIsInJlc3VsdCIsImdldENoZWNrZWRJdGVtcyIsIm1hcCIsImkiLCJpZCIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJjdXJyZW50UGFyZW50SWRzIiwic2xpY2UiLCJwdXNoIiwicmVuZGVyIiwiZ2V0Q29udGVudCIsImdldFNwaW5uZXIiLCJQdXJlQ29tcG9uZW50IiwiZmlyc3RJdGVtIiwiZ2V0Rmlyc3RJdGVtIiwicmVmcmVzaENvbnRlbnQiLCJsaXN0Iiwic2VsZWN0ZWRQYXRoIiwiYW55Q2hlY2tlZEFsbCIsInNlYXJjaFBsYWNlSG9sZGVyIiwic2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaENsZWFySGFuZGxlciIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJTdHJpbmciLCJwYXJlbnRSZWZlcmVuY2VJZHMiLCJpc0NoZWNrZWRBbGwiLCJjaGVja2VkSWRzIiwiYWxsTGFiZWwiLCJOdW1iZXIiLCJsaXN0SXRlbVJlbmRlckZ1bmN0aW9uIiwiY2hlY2tIYW5kbGVyIiwiY2hlY2tBbGxIYW5kbGVyIiwiY2xpY2tIYW5kbGVyIiwibGV2ZWwiLCJyZWZlcmVuY2VJZHMiLCJjaGVja1N0YXRlIiwiYWRkIiwicmVtb3ZlIiwib25DaGVja0xpc3RDaGFuZ2UiLCJwb3AiLCJFcnJvciIsImFkZEFsbCIsInJlbW92ZUFsbCIsImUiLCJzZWFyY2hpbmdWYWx1ZSIsInRhcmdldCIsInZhbHVlIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsInRoZW4iLCJzdGF0ZU9iamVjdCIsInNldFNlYXJjaGluZ0ZvciIsInJlZnJlc2giLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsT0FBT0MsT0FBUCxNQUFvQixZQUFwQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsZUFBdEI7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxzQkFBdkM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlDQUF2QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLDJCQUF2Qjs7SUFFcUJDLGM7OztBQUNuQiwwQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMsZ0JBQWdCLE1BQUtDLGdCQUFMLENBQXNCTCxLQUF0QixDQUF0Qjs7QUFFQSxVQUFLTSxLQUFMLEdBQWE7QUFDWEwsZ0NBRFc7QUFFWE0sOEJBQXdC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QkFBbUJXLFFBQW5CLEdBQThCbUUsSUFBOUIsQ0FBbUMsWUFBTTtBQUN2QyxVQUFNekQsc0JBQXNCckIsbUJBQW1CZSxVQUFuQixFQUE1QjtBQUNBLFVBQU1nRSxjQUFjO0FBQ2xCaEYsc0JBQWNDLG1CQUFtQkMsUUFEZjtBQUVsQkksZ0NBQXdCZ0Isb0JBQW9CSCxrQkFBcEI7QUFGTixPQUFwQjs7QUFLQSxVQUFNaEIsZ0JBQWdCLE9BQUtDLGdCQUFMLENBQXNCTCxLQUF0QixDQUF0QjtBQUNBLFVBQUlJLGtCQUFrQixJQUF0QixFQUE0QjtBQUMxQjZFLG9CQUFZeEUsY0FBWixHQUE2QixDQUE3QjtBQUNBd0Usb0JBQVl2RSxVQUFaLEdBQXlCTixhQUF6QjtBQUNEOztBQUVELGFBQUtjLFFBQUwsQ0FBYytELFdBQWQ7O0FBRUFYLHdCQUFrQi9DLG1CQUFsQjtBQUNELEtBaEJEO0FBaUJELEc7O09BRURzQixjLEdBQWlCLFlBQU07QUFBQSxpQkFDZ0MsT0FBS3ZDLEtBRHJDO0FBQUEsUUFDYkcsY0FEYSxVQUNiQSxjQURhO0FBQUEsUUFDR0MsVUFESCxVQUNHQSxVQURIO0FBQUEsUUFDZUYsWUFEZixVQUNlQSxZQURmOztBQUVyQixXQUFLRyxPQUFMLENBQWF1RSxlQUFiLENBQTZCMUUsWUFBN0I7QUFDQSxXQUFLRyxPQUFMLENBQWF3RSxPQUFiLENBQXFCMUUsY0FBckIsRUFBcUNDLFVBQXJDO0FBQ0QsRzs7U0FqTmtCWCxjOzs7QUFtT3JCQSxlQUFlcUYsWUFBZixHQUE4QjtBQUM1QnpCLFlBQVUsS0FEa0I7QUFFNUJFLDBCQUF3QixJQUZJO0FBRzVCWixxQkFBbUIsV0FIUztBQUk1QnFCLHFCQUFtQiw2QkFBTSxDQUFFO0FBSkMsQ0FBOUIiLCJmaWxlIjoidGFiLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXMgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcblxyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcclxuaW1wb3J0IFNlYXJjaEJhciBmcm9tICcuLi9zZWFyY2gtYmFyJztcclxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcclxuaW1wb3J0IENvbHVtbkxpc3QgZnJvbSAnLi4vLi4vbW9kZWxzL2NvbHVtbi9jb2x1bW4tbGlzdCc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCBWaWV3Q29sdW1uIGZyb20gJy4vY29sdW1uL2NvbHVtbi5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RhYkNvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcclxuICAgIGNvbnN0IGlkT2ZGaXJzdEl0ZW0gPSB0aGlzLmdldElkT2ZGaXJzdEl0ZW0ocHJvcHMpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGlzRGF0YUxvYWRlZCxcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogMCxcclxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcclxuICAgICAgc2VsZWN0ZWRDb2x1bW46IGlkT2ZGaXJzdEl0ZW0gIT09IG51bGwgPyAxIDogMCxcclxuICAgICAgc2VsZWN0ZWRJZDogaWRPZkZpcnN0SXRlbSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb2x1bW5zID0gbmV3IENvbHVtbkxpc3QocHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCB7IGlzTG9hZGVkIH0gPSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyO1xyXG4gICAgY29uc3QgY2hlY2tlZCA9IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCAhPT0gaXNMb2FkZWQpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgaXNEYXRhTG9hZGVkOiBpc0xvYWRlZCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0xvYWRlZCkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgY29uc3QgbGFzdFVwZGF0ZWQgPSBjaGVja2VkLmdldExhc3RVcGRhdGVTdGFtcCgpO1xyXG4gICAgICBpZiAobGFzdFVwZGF0ZWQgIT09IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogbGFzdFVwZGF0ZWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldElkT2ZGaXJzdEl0ZW0gPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGZpcnN0SXRlbSA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRGaXJzdEl0ZW0oKTtcclxuICAgIGlmIChmaXJzdEl0ZW0gPT09IG51bGwgfHwgIWZpcnN0SXRlbS5pZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGZpcnN0SXRlbS5pZDtcclxuICB9XHJcblxyXG4gIGdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcclxuICB9XHJcblxyXG4gIGdldENoZWNrZWRJZHMocGFyZW50SWRzLCBkYXRhKSB7XHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRDaGVja2VkSXRlbXMocGFyZW50SWRzKS5tYXAoaSA9PiBpLmlkKTtcclxuXHJcbiAgICAvLyBBZGRzIGFsbCBpdGVtcyB0aGF0IGhhdmUgY2hlY2tlZEFsbCBpbiBjaGlsZHJlblxyXG4gICAgaWYgKGRhdGEgJiYgQXJyYXkuaXNBcnJheShkYXRhLml0ZW1zKSkge1xyXG4gICAgICBkYXRhLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50UGFyZW50SWRzID0gcGFyZW50SWRzLnNsaWNlKCk7XHJcbiAgICAgICAgY3VycmVudFBhcmVudElkcy5wdXNoKGl0ZW0uaWQpO1xyXG4gICAgICAgIGlmICh0aGlzLmdldElzQ2hlY2tlZEFsbChjdXJyZW50UGFyZW50SWRzKSkge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcclxuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcclxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNvbHVtbnMubGlzdCB8fCBbXTtcclxuICAgIGNvbnN0IHNlbGVjdGVkUGF0aCA9IHRoaXMuY29sdW1ucy5zZWxlY3RlZFBhdGggfHwgW107XHJcbiAgICBjb25zdCBwYXJlbnRJZHMgPSBbXTtcclxuICAgIGxldCBhbnlDaGVja2VkQWxsID0gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFiLWNvbnRlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItc2VhcmNoLWJhclwiPlxyXG4gICAgICAgICAgPFNlYXJjaEJhclxyXG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cclxuICAgICAgICAgICAgb25TZWFyY2hDaGFuZ2U9e3RoaXMuc2VhcmNoQ2hhbmdlSGFuZGxlcn1cclxuICAgICAgICAgICAgb25DbG9zZUNsaWNrPXt0aGlzLnNlYXJjaENsZWFySGFuZGxlcn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItY29sdW1uLXdyYXBwZXJcIj5cclxuICAgICAgICAgIHsgT2JqZWN0LmtleXMobGlzdCkubWFwKChrZXkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGxpc3Rba2V5XTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHNlbGVjdGVkUGF0aFtrZXldID8gU3RyaW5nKHNlbGVjdGVkUGF0aFtrZXldKSA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFJlZmVyZW5jZUlkcyA9IHBhcmVudElkcy5zbGljZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBpc0NoZWNrZWRBbGwgPSB0aGlzLmdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2VkSWRzID0gaXNDaGVja2VkQWxsID8gW10gOiB0aGlzLmdldENoZWNrZWRJZHMocGFyZW50SWRzLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGFueUNoZWNrZWRBbGwgPSBhbnlDaGVja2VkQWxsIHx8IGlzQ2hlY2tlZEFsbDtcclxuICAgICAgICAgICAgcGFyZW50SWRzLnB1c2goc2VsZWN0ZWRJZCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxWaWV3Q29sdW1uXHJcbiAgICAgICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgICAgICAgICAgIGNoZWNrZWRBbGw9e2FueUNoZWNrZWRBbGwgfHwgaXNDaGVja2VkQWxsfVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbERpc2FibGVkPXthbnlDaGVja2VkQWxsICYmICFpc0NoZWNrZWRBbGx9XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsSGlkZGVuPXtOdW1iZXIoa2V5KSA9PT0gMH1cclxuICAgICAgICAgICAgICAgIGNoZWNrZWRJZHM9e2NoZWNrZWRJZHN9XHJcbiAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxyXG4gICAgICAgICAgICAgICAgaW5kZXg9e051bWJlcihrZXkpICsgMX1cclxuICAgICAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAgICAgICAgICAga2V5PXtOdW1iZXIoa2V5KSArIDF9XHJcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VJZHM9e3BhcmVudFJlZmVyZW5jZUlkc31cclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSWQ9e3NlbGVjdGVkSWR9XHJcbiAgICAgICAgICAgICAgICBvbkNoZWNrPXt0aGlzLmNoZWNrSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgIG9uQ2hlY2tBbGw9e3RoaXMuY2hlY2tBbGxIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGdldFNwaW5uZXIgPSAoKSA9PiA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItY29udGVudFwiPjxTcGlubmVyIC8+PC9kaXY+O1xyXG5cclxuICBjbGlja0hhbmRsZXIgPSAobGV2ZWwsIGlkKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgc2VsZWN0ZWRDb2x1bW46IGxldmVsLFxyXG4gICAgICBzZWxlY3RlZElkOiBpZCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tIYW5kbGVyID0gKHJlZmVyZW5jZUlkcywgaWQsIGNoZWNrU3RhdGUpID0+IHtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcbiAgICBpZiAoY2hlY2tTdGF0ZSkge1xyXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LmFkZChyZWZlcmVuY2VJZHMsIGlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucmVtb3ZlKHJlZmVyZW5jZUlkcywgaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICB9KTtcclxuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0FsbEhhbmRsZXIgPSAocmVmZXJlbmNlSWRzLCBjaGVja1N0YXRlKSA9PiB7XHJcbiAgICBjb25zdCBwYXJlbnRJZHMgPSByZWZlcmVuY2VJZHMuc2xpY2UoKTtcclxuICAgIGNvbnN0IGlkID0gcGFyZW50SWRzLnBvcCgpO1xyXG5cclxuICAgIGlmICghaWQpIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gc2VsZWN0ZWQgcGFyZW50IGVsZW1lbnQgdG8gcGVyZm9ybSBjaGVja2luZyBvZiBhbGwgZWxlbWVudHMnKTtcclxuXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG4gICAgaWYgKGNoZWNrU3RhdGUpIHtcclxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5hZGRBbGwocGFyZW50SWRzLCBpZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LnJlbW92ZUFsbChwYXJlbnRJZHMsIGlkKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlKGNoZWNrZWRJdGVtSGFzaExpc3QpO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoQ2hhbmdlSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBzZWFyY2hpbmdWYWx1ZSA9IGUudGFyZ2V0ID8gZS50YXJnZXQudmFsdWUgfHwgJycgOiAnJztcclxuICAgIGxldCBzZWFyY2hpbmdGb3IgPSAnJztcclxuXHJcbiAgICBpZiAoVXRpbHMuZW5vdWdoU2VhcmNoVGV4dExlbmd0aChzZWFyY2hpbmdWYWx1ZSkpIHtcclxuICAgICAgc2VhcmNoaW5nRm9yID0gc2VhcmNoaW5nVmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoQ2xlYXJIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvcjogJycgfSk7XHJcbiAgfVxyXG5cclxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIG9uQ2hlY2tMaXN0Q2hhbmdlIH0gPSBwcm9wcztcclxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuICAgICAgY29uc3Qgc3RhdGVPYmplY3QgPSB7XHJcbiAgICAgICAgaXNEYXRhTG9hZGVkOiBkYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXHJcbiAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IGlkT2ZGaXJzdEl0ZW0gPSB0aGlzLmdldElkT2ZGaXJzdEl0ZW0ocHJvcHMpO1xyXG4gICAgICBpZiAoaWRPZkZpcnN0SXRlbSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHN0YXRlT2JqZWN0LnNlbGVjdGVkQ29sdW1uID0gMTtcclxuICAgICAgICBzdGF0ZU9iamVjdC5zZWxlY3RlZElkID0gaWRPZkZpcnN0SXRlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZU9iamVjdCk7XHJcblxyXG4gICAgICBvbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IHNlbGVjdGVkQ29sdW1uLCBzZWxlY3RlZElkLCBzZWFyY2hpbmdGb3IgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICB0aGlzLmNvbHVtbnMuc2V0U2VhcmNoaW5nRm9yKHNlYXJjaGluZ0Zvcik7XHJcbiAgICB0aGlzLmNvbHVtbnMucmVmcmVzaChzZWxlY3RlZENvbHVtbiwgc2VsZWN0ZWRJZCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRTcGlubmVyKClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5WaWV3VGFiQ29udGVudC5wcm9wVHlwZXMgPSB7XHJcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBvbkNoZWNrTGlzdENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5WaWV3VGFiQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgYWxsTGFiZWw6ICdBbGwnLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxyXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiAoKSA9PiB7fSxcclxufTtcclxuIl19