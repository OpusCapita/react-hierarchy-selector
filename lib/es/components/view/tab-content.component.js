var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '@opuscapita/react-searchbar';

import Spinner from '../spinner';
import { dataSourceProviderType } from '../../services/types';
import ColumnList from '../../models/column/column-list';
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
          onSearch: _this3.searchChangeHandler,
          searchPlaceHolder: _this3.props.searchPlaceHolder,
          onCloseClick: _this3.searchClearHandler,
          dynamicSearchStartsFrom: 3,
          value: _this3.state.searchingFor,
          tooltip: _this3.props.searchTooltip
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

  this.searchChangeHandler = function (searchingFor) {
    return _this3.setState({ searchingFor: searchingFor });
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
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlNlYXJjaEJhciIsIlNwaW5uZXIiLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwiQ29sdW1uTGlzdCIsIlZpZXdDb2x1bW4iLCJWaWV3VGFiQ29udGVudCIsInByb3BzIiwiaXNEYXRhTG9hZGVkIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJpZE9mRmlyc3RJdGVtIiwiZ2V0SWRPZkZpcnN0SXRlbSIsInN0YXRlIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlbGVjdGVkQ29sdW1uIiwic2VsZWN0ZWRJZCIsImNvbHVtbnMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjaGVja2VkIiwiZ2V0Q2hlY2tlZCIsInNldFN0YXRlIiwibGFzdFVwZGF0ZWQiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJnZXRJc0NoZWNrZWRBbGwiLCJwYXJlbnRJZHMiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiZ2V0Q2hlY2tlZElkcyIsImRhdGEiLCJyZXN1bHQiLCJnZXRDaGVja2VkSXRlbXMiLCJtYXAiLCJpIiwiaWQiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiY3VycmVudFBhcmVudElkcyIsInNsaWNlIiwicHVzaCIsInJlbmRlciIsImdldENvbnRlbnQiLCJnZXRTcGlubmVyIiwiUHVyZUNvbXBvbmVudCIsImZpcnN0SXRlbSIsImdldEZpcnN0SXRlbSIsInJlZnJlc2hDb250ZW50IiwibGlzdCIsInNlbGVjdGVkUGF0aCIsImFueUNoZWNrZWRBbGwiLCJzZWFyY2hDaGFuZ2VIYW5kbGVyIiwic2VhcmNoUGxhY2VIb2xkZXIiLCJzZWFyY2hDbGVhckhhbmRsZXIiLCJzZWFyY2hUb29sdGlwIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsIlN0cmluZyIsInBhcmVudFJlZmVyZW5jZUlkcyIsImlzQ2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJhbGxMYWJlbCIsIk51bWJlciIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJjaGVja0hhbmRsZXIiLCJjaGVja0FsbEhhbmRsZXIiLCJjbGlja0hhbmRsZXIiLCJsZXZlbCIsInJlZmVyZW5jZUlkcyIsImNoZWNrU3RhdGUiLCJhZGQiLCJyZW1vdmUiLCJvbkNoZWNrTGlzdENoYW5nZSIsInBvcCIsIkVycm9yIiwiYWRkQWxsIiwicmVtb3ZlQWxsIiwidGhlbiIsInN0YXRlT2JqZWN0Iiwic2V0U2VhcmNoaW5nRm9yIiwicmVmcmVzaCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsNkJBQXRCOztBQUVBLE9BQU9DLE9BQVAsTUFBb0IsWUFBcEI7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxzQkFBdkM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlDQUF2QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsMkJBQXZCOztJQUVxQkMsYzs7O0FBQ25CLDBCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBOztBQUdqQixRQUFNQyxlQUFlRCxNQUFNRSxrQkFBTixDQUF5QkMsUUFBOUM7QUFDQSxRQUFNQyxnQkFBZ0IsTUFBS0MsZ0JBQUwsQ0FBc0JMLEtBQXRCLENBQXRCOztBQUVBLFVBQUtNLEtBQUwsR0FBYTtBQUNYTCxnQ0FEVztBQUVYTSw4QkFBd0IsQ0FGYjtBQUdYQyxvQkFBYyxFQUhIO0FBSVhDLHNCQUFnQkwsa0JBQWtCLElBQWxCLEdBQXlCLENBQXpCLEdBQTZCLENBSmxDO0FBS1hNLGtC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LGdCQUFnQixPQUFLQyxnQkFBTCxDQUFzQkwsS0FBdEIsQ0FBdEI7QUFDQSxVQUFJSSxrQkFBa0IsSUFBdEIsRUFBNEI7QUFDMUJ5RSxvQkFBWXBFLGNBQVosR0FBNkIsQ0FBN0I7QUFDQW9FLG9CQUFZbkUsVUFBWixHQUF5Qk4sYUFBekI7QUFDRDs7QUFFRCxhQUFLYyxRQUFMLENBQWMyRCxXQUFkOztBQUVBTix3QkFBa0JoRCxtQkFBbEI7QUFDRCxLQWhCRDtBQWlCRCxHOztPQUVEc0IsYyxHQUFpQixZQUFNO0FBQUEsaUJBQ2dDLE9BQUt2QyxLQURyQztBQUFBLFFBQ2JHLGNBRGEsVUFDYkEsY0FEYTtBQUFBLFFBQ0dDLFVBREgsVUFDR0EsVUFESDtBQUFBLFFBQ2VGLFlBRGYsVUFDZUEsWUFEZjs7QUFFckIsV0FBS0csT0FBTCxDQUFhbUUsZUFBYixDQUE2QnRFLFlBQTdCO0FBQ0EsV0FBS0csT0FBTCxDQUFhb0UsT0FBYixDQUFxQnRFLGNBQXJCLEVBQXFDQyxVQUFyQztBQUNELEc7O1NBNU1rQlgsYzs7O0FBK05yQkEsZUFBZWlGLFlBQWYsR0FBOEI7QUFDNUJwQixZQUFVLEtBRGtCO0FBRTVCRSwwQkFBd0IsSUFGSTtBQUc1QloscUJBQW1CLFdBSFM7QUFJNUJFLGlCQUFlLElBSmE7QUFLNUJtQixxQkFBbUIsNkJBQU0sQ0FBRTtBQUxDLENBQTlCIiwiZmlsZSI6InRhYi1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlYXJjaGJhcic7XHJcblxyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcclxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcclxuaW1wb3J0IENvbHVtbkxpc3QgZnJvbSAnLi4vLi4vbW9kZWxzL2NvbHVtbi9jb2x1bW4tbGlzdCc7XHJcbmltcG9ydCBWaWV3Q29sdW1uIGZyb20gJy4vY29sdW1uL2NvbHVtbi5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RhYkNvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcclxuICAgIGNvbnN0IGlkT2ZGaXJzdEl0ZW0gPSB0aGlzLmdldElkT2ZGaXJzdEl0ZW0ocHJvcHMpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGlzRGF0YUxvYWRlZCxcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogMCxcclxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcclxuICAgICAgc2VsZWN0ZWRDb2x1bW46IGlkT2ZGaXJzdEl0ZW0gIT09IG51bGwgPyAxIDogMCxcclxuICAgICAgc2VsZWN0ZWRJZDogaWRPZkZpcnN0SXRlbSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb2x1bW5zID0gbmV3IENvbHVtbkxpc3QocHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCB7IGlzTG9hZGVkIH0gPSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyO1xyXG4gICAgY29uc3QgY2hlY2tlZCA9IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCAhPT0gaXNMb2FkZWQpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgaXNEYXRhTG9hZGVkOiBpc0xvYWRlZCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0xvYWRlZCkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgY29uc3QgbGFzdFVwZGF0ZWQgPSBjaGVja2VkLmdldExhc3RVcGRhdGVTdGFtcCgpO1xyXG4gICAgICBpZiAobGFzdFVwZGF0ZWQgIT09IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogbGFzdFVwZGF0ZWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldElkT2ZGaXJzdEl0ZW0gPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGZpcnN0SXRlbSA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRGaXJzdEl0ZW0oKTtcclxuICAgIGlmIChmaXJzdEl0ZW0gPT09IG51bGwgfHwgIWZpcnN0SXRlbS5pZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGZpcnN0SXRlbS5pZDtcclxuICB9XHJcblxyXG4gIGdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcclxuICB9XHJcblxyXG4gIGdldENoZWNrZWRJZHMocGFyZW50SWRzLCBkYXRhKSB7XHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRDaGVja2VkSXRlbXMocGFyZW50SWRzKS5tYXAoaSA9PiBpLmlkKTtcclxuXHJcbiAgICAvLyBBZGRzIGFsbCBpdGVtcyB0aGF0IGhhdmUgY2hlY2tlZEFsbCBpbiBjaGlsZHJlblxyXG4gICAgaWYgKGRhdGEgJiYgQXJyYXkuaXNBcnJheShkYXRhLml0ZW1zKSkge1xyXG4gICAgICBkYXRhLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50UGFyZW50SWRzID0gcGFyZW50SWRzLnNsaWNlKCk7XHJcbiAgICAgICAgY3VycmVudFBhcmVudElkcy5wdXNoKGl0ZW0uaWQpO1xyXG4gICAgICAgIGlmICh0aGlzLmdldElzQ2hlY2tlZEFsbChjdXJyZW50UGFyZW50SWRzKSkge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcclxuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcclxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNvbHVtbnMubGlzdCB8fCBbXTtcclxuICAgIGNvbnN0IHNlbGVjdGVkUGF0aCA9IHRoaXMuY29sdW1ucy5zZWxlY3RlZFBhdGggfHwgW107XHJcbiAgICBjb25zdCBwYXJlbnRJZHMgPSBbXTtcclxuICAgIGxldCBhbnlDaGVja2VkQWxsID0gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFiLWNvbnRlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItc2VhcmNoLWJhclwiPlxyXG4gICAgICAgICAgPFNlYXJjaEJhclxyXG4gICAgICAgICAgICBvblNlYXJjaD17dGhpcy5zZWFyY2hDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cclxuICAgICAgICAgICAgb25DbG9zZUNsaWNrPXt0aGlzLnNlYXJjaENsZWFySGFuZGxlcn1cclxuICAgICAgICAgICAgZHluYW1pY1NlYXJjaFN0YXJ0c0Zyb209ezN9XHJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcn1cclxuICAgICAgICAgICAgdG9vbHRpcD17dGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW4td3JhcHBlclwiPlxyXG4gICAgICAgICAgeyBPYmplY3Qua2V5cyhsaXN0KS5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbGlzdFtrZXldO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZElkID0gc2VsZWN0ZWRQYXRoW2tleV0gPyBTdHJpbmcoc2VsZWN0ZWRQYXRoW2tleV0pIDogbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50UmVmZXJlbmNlSWRzID0gcGFyZW50SWRzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZEFsbCA9IHRoaXMuZ2V0SXNDaGVja2VkQWxsKHBhcmVudElkcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrZWRJZHMgPSBpc0NoZWNrZWRBbGwgPyBbXSA6IHRoaXMuZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgYW55Q2hlY2tlZEFsbCA9IGFueUNoZWNrZWRBbGwgfHwgaXNDaGVja2VkQWxsO1xyXG4gICAgICAgICAgICBwYXJlbnRJZHMucHVzaChzZWxlY3RlZElkKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPFZpZXdDb2x1bW5cclxuICAgICAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbD17YW55Q2hlY2tlZEFsbCB8fCBpc0NoZWNrZWRBbGx9XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsRGlzYWJsZWQ9e2FueUNoZWNrZWRBbGwgJiYgIWlzQ2hlY2tlZEFsbH1cclxuICAgICAgICAgICAgICAgIGNoZWNrZWRBbGxIaWRkZW49e051bWJlcihrZXkpID09PSAwfVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZElkcz17Y2hlY2tlZElkc31cclxuICAgICAgICAgICAgICAgIGRhdGE9e2RhdGF9XHJcbiAgICAgICAgICAgICAgICBpbmRleD17TnVtYmVyKGtleSkgKyAxfVxyXG4gICAgICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XHJcbiAgICAgICAgICAgICAgICBrZXk9e051bWJlcihrZXkpICsgMX1cclxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZUlkcz17cGFyZW50UmVmZXJlbmNlSWRzfVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJZD17c2VsZWN0ZWRJZH1cclxuICAgICAgICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgb25DaGVja0FsbD17dGhpcy5jaGVja0FsbEhhbmRsZXJ9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrSGFuZGxlcn1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0U3Bpbm5lciA9ICgpID0+IDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1jb250ZW50XCI+PFNwaW5uZXIgLz48L2Rpdj47XHJcblxyXG4gIGNsaWNrSGFuZGxlciA9IChsZXZlbCwgaWQpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWxlY3RlZENvbHVtbjogbGV2ZWwsXHJcbiAgICAgIHNlbGVjdGVkSWQ6IGlkLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGVja0hhbmRsZXIgPSAocmVmZXJlbmNlSWRzLCBpZCwgY2hlY2tTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuICAgIGlmIChjaGVja1N0YXRlKSB7XHJcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QuYWRkKHJlZmVyZW5jZUlkcywgaWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5yZW1vdmUocmVmZXJlbmNlSWRzLCBpZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcclxuICB9XHJcblxyXG4gIGNoZWNrQWxsSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGNoZWNrU3RhdGUpID0+IHtcclxuICAgIGNvbnN0IHBhcmVudElkcyA9IHJlZmVyZW5jZUlkcy5zbGljZSgpO1xyXG4gICAgY29uc3QgaWQgPSBwYXJlbnRJZHMucG9wKCk7XHJcblxyXG4gICAgaWYgKCFpZCkgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyBzZWxlY3RlZCBwYXJlbnQgZWxlbWVudCB0byBwZXJmb3JtIGNoZWNraW5nIG9mIGFsbCBlbGVtZW50cycpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcbiAgICBpZiAoY2hlY2tTdGF0ZSkge1xyXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LmFkZEFsbChwYXJlbnRJZHMsIGlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucmVtb3ZlQWxsKHBhcmVudElkcywgaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICB9KTtcclxuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gc2VhcmNoaW5nRm9yID0+IHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3IgfSk7XHJcblxyXG4gIHNlYXJjaENsZWFySGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3I6ICcnIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBvbkNoZWNrTGlzdENoYW5nZSB9ID0gcHJvcHM7XHJcbiAgICBkYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcclxuICAgICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcbiAgICAgIGNvbnN0IHN0YXRlT2JqZWN0ID0ge1xyXG4gICAgICAgIGlzRGF0YUxvYWRlZDogZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxyXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCBpZE9mRmlyc3RJdGVtID0gdGhpcy5nZXRJZE9mRmlyc3RJdGVtKHByb3BzKTtcclxuICAgICAgaWYgKGlkT2ZGaXJzdEl0ZW0gIT09IG51bGwpIHtcclxuICAgICAgICBzdGF0ZU9iamVjdC5zZWxlY3RlZENvbHVtbiA9IDE7XHJcbiAgICAgICAgc3RhdGVPYmplY3Quc2VsZWN0ZWRJZCA9IGlkT2ZGaXJzdEl0ZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGVPYmplY3QpO1xyXG5cclxuICAgICAgb25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBzZWxlY3RlZENvbHVtbiwgc2VsZWN0ZWRJZCwgc2VhcmNoaW5nRm9yIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgdGhpcy5jb2x1bW5zLnNldFNlYXJjaGluZ0ZvcihzZWFyY2hpbmdGb3IpO1xyXG4gICAgdGhpcy5jb2x1bW5zLnJlZnJlc2goc2VsZWN0ZWRDb2x1bW4sIHNlbGVjdGVkSWQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQgPyB0aGlzLmdldENvbnRlbnQoKSA6IHRoaXMuZ2V0U3Bpbm5lcigpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuVmlld1RhYkNvbnRlbnQucHJvcFR5cGVzID0ge1xyXG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcclxuICBvbkNoZWNrTGlzdENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5WaWV3VGFiQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgYWxsTGFiZWw6ICdBbGwnLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxyXG4gIHNlYXJjaFRvb2x0aXA6IG51bGwsXHJcbiAgb25DaGVja0xpc3RDaGFuZ2U6ICgpID0+IHt9LFxyXG59O1xyXG4iXX0=