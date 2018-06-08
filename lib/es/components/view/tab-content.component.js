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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlNlYXJjaEJhciIsIlNwaW5uZXIiLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwiQ29sdW1uTGlzdCIsIlZpZXdDb2x1bW4iLCJWaWV3VGFiQ29udGVudCIsInByb3BzIiwiaXNEYXRhTG9hZGVkIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJpZE9mRmlyc3RJdGVtIiwiZ2V0SWRPZkZpcnN0SXRlbSIsInN0YXRlIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlbGVjdGVkQ29sdW1uIiwic2VsZWN0ZWRJZCIsImNvbHVtbnMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjaGVja2VkIiwiZ2V0Q2hlY2tlZCIsInNldFN0YXRlIiwibGFzdFVwZGF0ZWQiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJnZXRJc0NoZWNrZWRBbGwiLCJwYXJlbnRJZHMiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiZ2V0Q2hlY2tlZElkcyIsImRhdGEiLCJyZXN1bHQiLCJnZXRDaGVja2VkSXRlbXMiLCJtYXAiLCJpIiwiaWQiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiY3VycmVudFBhcmVudElkcyIsInNsaWNlIiwicHVzaCIsInJlbmRlciIsImdldENvbnRlbnQiLCJnZXRTcGlubmVyIiwiUHVyZUNvbXBvbmVudCIsImZpcnN0SXRlbSIsImdldEZpcnN0SXRlbSIsInJlZnJlc2hDb250ZW50IiwibGlzdCIsInNlbGVjdGVkUGF0aCIsImFueUNoZWNrZWRBbGwiLCJzZWFyY2hDaGFuZ2VIYW5kbGVyIiwic2VhcmNoUGxhY2VIb2xkZXIiLCJzZWFyY2hDbGVhckhhbmRsZXIiLCJzZWFyY2hUb29sdGlwIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsIlN0cmluZyIsInBhcmVudFJlZmVyZW5jZUlkcyIsImlzQ2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJhbGxMYWJlbCIsIk51bWJlciIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJjaGVja0hhbmRsZXIiLCJjaGVja0FsbEhhbmRsZXIiLCJjbGlja0hhbmRsZXIiLCJsZXZlbCIsInJlZmVyZW5jZUlkcyIsImNoZWNrU3RhdGUiLCJhZGQiLCJyZW1vdmUiLCJvbkNoZWNrTGlzdENoYW5nZSIsInBvcCIsIkVycm9yIiwiYWRkQWxsIiwicmVtb3ZlQWxsIiwidGhlbiIsInN0YXRlT2JqZWN0Iiwic2V0U2VhcmNoaW5nRm9yIiwicmVmcmVzaCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsNkJBQXRCOztBQUVBLE9BQU9DLE9BQVAsTUFBb0IsWUFBcEI7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxzQkFBdkM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlDQUF2QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsMkJBQXZCOztJQUVxQkMsYzs7O0FBQ25CLDBCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBOztBQUdqQixRQUFNQyxlQUFlRCxNQUFNRSxrQkFBTixDQUF5QkMsUUFBOUM7QUFDQSxRQUFNQyxnQkFBZ0IsTUFBS0MsZ0JBQUwsQ0FBc0JMLEtBQXRCLENBQXRCOztBQUVBLFVBQUtNLEtBQUwsR0FBYTtBQUNYTCxnQ0FEVztBQUVYTSw4QkFBd0IsQ0FGYjtBQUdYQyxvQkFBYyxFQUhIO0FBSVhDLHNCQUFnQkwsa0JBQWtCLElBQWxCLEdBQXlCLENBQXpCLEdBQTZCLENBSmxDO0FBS1hNLGtC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LGdCQUFnQixPQUFLQyxnQkFBTCxDQUFzQkwsS0FBdEIsQ0FBdEI7QUFDQSxVQUFJSSxrQkFBa0IsSUFBdEIsRUFBNEI7QUFDMUJ5RSxvQkFBWXBFLGNBQVosR0FBNkIsQ0FBN0I7QUFDQW9FLG9CQUFZbkUsVUFBWixHQUF5Qk4sYUFBekI7QUFDRDs7QUFFRCxhQUFLYyxRQUFMLENBQWMyRCxXQUFkOztBQUVBTix3QkFBa0JoRCxtQkFBbEI7QUFDRCxLQWhCRDtBQWlCRCxHOztPQUVEc0IsYyxHQUFpQixZQUFNO0FBQUEsaUJBQ2dDLE9BQUt2QyxLQURyQztBQUFBLFFBQ2JHLGNBRGEsVUFDYkEsY0FEYTtBQUFBLFFBQ0dDLFVBREgsVUFDR0EsVUFESDtBQUFBLFFBQ2VGLFlBRGYsVUFDZUEsWUFEZjs7QUFFckIsV0FBS0csT0FBTCxDQUFhbUUsZUFBYixDQUE2QnRFLFlBQTdCO0FBQ0EsV0FBS0csT0FBTCxDQUFhb0UsT0FBYixDQUFxQnRFLGNBQXJCLEVBQXFDQyxVQUFyQztBQUNELEc7O1NBNU1rQlgsYzs7O0FBK05yQkEsZUFBZWlGLFlBQWYsR0FBOEI7QUFDNUJwQixZQUFVLEtBRGtCO0FBRTVCRSwwQkFBd0IsSUFGSTtBQUc1QloscUJBQW1CLFdBSFM7QUFJNUJFLGlCQUFlLElBSmE7QUFLNUJtQixxQkFBbUIsNkJBQU0sQ0FBRTtBQUxDLENBQTlCIiwiZmlsZSI6InRhYi1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlYXJjaEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWFyY2hiYXInO1xuXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgQ29sdW1uTGlzdCBmcm9tICcuLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0JztcbmltcG9ydCBWaWV3Q29sdW1uIGZyb20gJy4vY29sdW1uL2NvbHVtbi5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VGFiQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcbiAgICBjb25zdCBpZE9mRmlyc3RJdGVtID0gdGhpcy5nZXRJZE9mRmlyc3RJdGVtKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RhdGFMb2FkZWQsXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiAwLFxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcbiAgICAgIHNlbGVjdGVkQ29sdW1uOiBpZE9mRmlyc3RJdGVtICE9PSBudWxsID8gMSA6IDAsXG4gICAgICBzZWxlY3RlZElkOiBpZE9mRmlyc3RJdGVtLFxuICAgIH07XG5cbiAgICB0aGlzLmNvbHVtbnMgPSBuZXcgQ29sdW1uTGlzdChwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGlzTG9hZGVkIH0gPSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCAhPT0gaXNMb2FkZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc0RhdGFMb2FkZWQ6IGlzTG9hZGVkLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0xvYWRlZCkge1xuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xuICAgIH1cblxuICAgIGlmIChjaGVja2VkKSB7XG4gICAgICBjb25zdCBsYXN0VXBkYXRlZCA9IGNoZWNrZWQuZ2V0TGFzdFVwZGF0ZVN0YW1wKCk7XG4gICAgICBpZiAobGFzdFVwZGF0ZWQgIT09IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBsYXN0VXBkYXRlZCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0SWRPZkZpcnN0SXRlbSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyIH0gPSBwcm9wcztcbiAgICBjb25zdCBmaXJzdEl0ZW0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Rmlyc3RJdGVtKCk7XG4gICAgaWYgKGZpcnN0SXRlbSA9PT0gbnVsbCB8fCAhZmlyc3RJdGVtLmlkKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiBmaXJzdEl0ZW0uaWQ7XG4gIH1cblxuICBnZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcbiAgfVxuXG4gIGdldENoZWNrZWRJZHMocGFyZW50SWRzLCBkYXRhKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICBjb25zdCByZXN1bHQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRJdGVtcyhwYXJlbnRJZHMpLm1hcChpID0+IGkuaWQpO1xuXG4gICAgLy8gQWRkcyBhbGwgaXRlbXMgdGhhdCBoYXZlIGNoZWNrZWRBbGwgaW4gY2hpbGRyZW5cbiAgICBpZiAoZGF0YSAmJiBBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpKSB7XG4gICAgICBkYXRhLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFBhcmVudElkcyA9IHBhcmVudElkcy5zbGljZSgpO1xuICAgICAgICBjdXJyZW50UGFyZW50SWRzLnB1c2goaXRlbS5pZCk7XG4gICAgICAgIGlmICh0aGlzLmdldElzQ2hlY2tlZEFsbChjdXJyZW50UGFyZW50SWRzKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcbiAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuY29sdW1ucy5saXN0IHx8IFtdO1xuICAgIGNvbnN0IHNlbGVjdGVkUGF0aCA9IHRoaXMuY29sdW1ucy5zZWxlY3RlZFBhdGggfHwgW107XG4gICAgY29uc3QgcGFyZW50SWRzID0gW107XG4gICAgbGV0IGFueUNoZWNrZWRBbGwgPSBmYWxzZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItY29udGVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItc2VhcmNoLWJhclwiPlxuICAgICAgICAgIDxTZWFyY2hCYXJcbiAgICAgICAgICAgIG9uU2VhcmNoPXt0aGlzLnNlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cbiAgICAgICAgICAgIG9uQ2xvc2VDbGljaz17dGhpcy5zZWFyY2hDbGVhckhhbmRsZXJ9XG4gICAgICAgICAgICBkeW5hbWljU2VhcmNoU3RhcnRzRnJvbT17M31cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcn1cbiAgICAgICAgICAgIHRvb2x0aXA9e3RoaXMucHJvcHMuc2VhcmNoVG9vbHRpcH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItY29sdW1uLXdyYXBwZXJcIj5cbiAgICAgICAgICB7IE9iamVjdC5rZXlzKGxpc3QpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbGlzdFtrZXldO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHNlbGVjdGVkUGF0aFtrZXldID8gU3RyaW5nKHNlbGVjdGVkUGF0aFtrZXldKSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRSZWZlcmVuY2VJZHMgPSBwYXJlbnRJZHMuc2xpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZEFsbCA9IHRoaXMuZ2V0SXNDaGVja2VkQWxsKHBhcmVudElkcyk7XG4gICAgICAgICAgICBjb25zdCBjaGVja2VkSWRzID0gaXNDaGVja2VkQWxsID8gW10gOiB0aGlzLmdldENoZWNrZWRJZHMocGFyZW50SWRzLCBkYXRhKTtcblxuICAgICAgICAgICAgYW55Q2hlY2tlZEFsbCA9IGFueUNoZWNrZWRBbGwgfHwgaXNDaGVja2VkQWxsO1xuICAgICAgICAgICAgcGFyZW50SWRzLnB1c2goc2VsZWN0ZWRJZCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxWaWV3Q29sdW1uXG4gICAgICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbD17YW55Q2hlY2tlZEFsbCB8fCBpc0NoZWNrZWRBbGx9XG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbERpc2FibGVkPXthbnlDaGVja2VkQWxsICYmICFpc0NoZWNrZWRBbGx9XG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbEhpZGRlbj17TnVtYmVyKGtleSkgPT09IDB9XG4gICAgICAgICAgICAgICAgY2hlY2tlZElkcz17Y2hlY2tlZElkc31cbiAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgICAgIGluZGV4PXtOdW1iZXIoa2V5KSArIDF9XG4gICAgICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICAgICAga2V5PXtOdW1iZXIoa2V5KSArIDF9XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlSWRzPXtwYXJlbnRSZWZlcmVuY2VJZHN9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJZD17c2VsZWN0ZWRJZH1cbiAgICAgICAgICAgICAgICBvbkNoZWNrPXt0aGlzLmNoZWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgICBvbkNoZWNrQWxsPXt0aGlzLmNoZWNrQWxsSGFuZGxlcn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSkgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgZ2V0U3Bpbm5lciA9ICgpID0+IDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1jb250ZW50XCI+PFNwaW5uZXIgLz48L2Rpdj47XG5cbiAgY2xpY2tIYW5kbGVyID0gKGxldmVsLCBpZCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRDb2x1bW46IGxldmVsLFxuICAgICAgc2VsZWN0ZWRJZDogaWQsXG4gICAgfSk7XG4gIH1cblxuICBjaGVja0hhbmRsZXIgPSAocmVmZXJlbmNlSWRzLCBpZCwgY2hlY2tTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgaWYgKGNoZWNrU3RhdGUpIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QuYWRkKHJlZmVyZW5jZUlkcywgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LnJlbW92ZShyZWZlcmVuY2VJZHMsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XG4gIH1cblxuICBjaGVja0FsbEhhbmRsZXIgPSAocmVmZXJlbmNlSWRzLCBjaGVja1N0YXRlKSA9PiB7XG4gICAgY29uc3QgcGFyZW50SWRzID0gcmVmZXJlbmNlSWRzLnNsaWNlKCk7XG4gICAgY29uc3QgaWQgPSBwYXJlbnRJZHMucG9wKCk7XG5cbiAgICBpZiAoIWlkKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIHNlbGVjdGVkIHBhcmVudCBlbGVtZW50IHRvIHBlcmZvcm0gY2hlY2tpbmcgb2YgYWxsIGVsZW1lbnRzJyk7XG5cbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgIGlmIChjaGVja1N0YXRlKSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LmFkZEFsbChwYXJlbnRJZHMsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5yZW1vdmVBbGwocGFyZW50SWRzLCBpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlKGNoZWNrZWRJdGVtSGFzaExpc3QpO1xuICB9XG5cbiAgc2VhcmNoQ2hhbmdlSGFuZGxlciA9IHNlYXJjaGluZ0ZvciA9PiB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xuXG4gIHNlYXJjaENsZWFySGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yOiAnJyB9KTtcbiAgfVxuXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIG9uQ2hlY2tMaXN0Q2hhbmdlIH0gPSBwcm9wcztcbiAgICBkYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgICAgY29uc3Qgc3RhdGVPYmplY3QgPSB7XG4gICAgICAgIGlzRGF0YUxvYWRlZDogZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxuICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgaWRPZkZpcnN0SXRlbSA9IHRoaXMuZ2V0SWRPZkZpcnN0SXRlbShwcm9wcyk7XG4gICAgICBpZiAoaWRPZkZpcnN0SXRlbSAhPT0gbnVsbCkge1xuICAgICAgICBzdGF0ZU9iamVjdC5zZWxlY3RlZENvbHVtbiA9IDE7XG4gICAgICAgIHN0YXRlT2JqZWN0LnNlbGVjdGVkSWQgPSBpZE9mRmlyc3RJdGVtO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlT2JqZWN0KTtcblxuICAgICAgb25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICByZWZyZXNoQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ29sdW1uLCBzZWxlY3RlZElkLCBzZWFyY2hpbmdGb3IgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5jb2x1bW5zLnNldFNlYXJjaGluZ0ZvcihzZWFyY2hpbmdGb3IpO1xuICAgIHRoaXMuY29sdW1ucy5yZWZyZXNoKHNlbGVjdGVkQ29sdW1uLCBzZWxlY3RlZElkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQgPyB0aGlzLmdldENvbnRlbnQoKSA6IHRoaXMuZ2V0U3Bpbm5lcigpXG4gICAgKTtcbiAgfVxufVxuXG5WaWV3VGFiQ29udGVudC5wcm9wVHlwZXMgPSB7XG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBpbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICBvbkNoZWNrTGlzdENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5WaWV3VGFiQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxuICBvbkNoZWNrTGlzdENoYW5nZTogKCkgPT4ge30sXG59O1xuIl19