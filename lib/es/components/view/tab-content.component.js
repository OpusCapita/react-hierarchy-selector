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
          defaltValue: _this3.state.searchingFor,
          isDynamic: true,
          isTooltipEnabled: true,
          minChars: 2,
          translations: {
            tooltip: _this3.props.searchTooltip,
            searchPlaceHolder: _this3.props.searchPlaceHolder
          },
          onSearch: _this3.searchChangeHandler,
          onClear: _this3.searchClearHandler
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlNlYXJjaEJhciIsIlNwaW5uZXIiLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwiQ29sdW1uTGlzdCIsIlZpZXdDb2x1bW4iLCJWaWV3VGFiQ29udGVudCIsInByb3BzIiwiaXNEYXRhTG9hZGVkIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJpZE9mRmlyc3RJdGVtIiwiZ2V0SWRPZkZpcnN0SXRlbSIsInN0YXRlIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlbGVjdGVkQ29sdW1uIiwic2VsZWN0ZWRJZCIsImNvbHVtbnMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjaGVja2VkIiwiZ2V0Q2hlY2tlZCIsInNldFN0YXRlIiwibGFzdFVwZGF0ZWQiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJnZXRJc0NoZWNrZWRBbGwiLCJwYXJlbnRJZHMiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiZ2V0Q2hlY2tlZElkcyIsImRhdGEiLCJyZXN1bHQiLCJnZXRDaGVja2VkSXRlbXMiLCJtYXAiLCJpIiwiaWQiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiY3VycmVudFBhcmVudElkcyIsInNsaWNlIiwicHVzaCIsInJlbmRlciIsImdldENvbnRlbnQiLCJnZXRTcGlubmVyIiwiUHVyZUNvbXBvbmVudCIsImZpcnN0SXRlbSIsImdldEZpcnN0SXRlbSIsInJlZnJlc2hDb250ZW50IiwibGlzdCIsInNlbGVjdGVkUGF0aCIsImFueUNoZWNrZWRBbGwiLCJ0b29sdGlwIiwic2VhcmNoVG9vbHRpcCIsInNlYXJjaFBsYWNlSG9sZGVyIiwic2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaENsZWFySGFuZGxlciIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJTdHJpbmciLCJwYXJlbnRSZWZlcmVuY2VJZHMiLCJpc0NoZWNrZWRBbGwiLCJjaGVja2VkSWRzIiwiYWxsTGFiZWwiLCJOdW1iZXIiLCJsaXN0SXRlbVJlbmRlckZ1bmN0aW9uIiwiY2hlY2tIYW5kbGVyIiwiY2hlY2tBbGxIYW5kbGVyIiwiY2xpY2tIYW5kbGVyIiwibGV2ZWwiLCJyZWZlcmVuY2VJZHMiLCJjaGVja1N0YXRlIiwiYWRkIiwicmVtb3ZlIiwib25DaGVja0xpc3RDaGFuZ2UiLCJwb3AiLCJFcnJvciIsImFkZEFsbCIsInJlbW92ZUFsbCIsInRoZW4iLCJzdGF0ZU9iamVjdCIsInNldFNlYXJjaGluZ0ZvciIsInJlZnJlc2giLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLDZCQUF0Qjs7QUFFQSxPQUFPQyxPQUFQLE1BQW9CLFlBQXBCO0FBQ0EsU0FBU0Msc0JBQVQsUUFBdUMsc0JBQXZDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixpQ0FBdkI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLDJCQUF2Qjs7SUFFcUJDLGM7OztBQUNuQiwwQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMsZ0JBQWdCLE1BQUtDLGdCQUFMLENBQXNCTCxLQUF0QixDQUF0Qjs7QUFFQSxVQUFLTSxLQUFMLEdBQWE7QUFDWEwsZ0NBRFc7QUFFWE0sOEJBQXdCLENBRmI7QUFHWEMsb0JBQWMsRUFISDtBQUlYQyxzQkFBZ0JMLGtCQUFrQixJQUFsQixHQUF5QixDQUF6QixHQUE2QixDQUps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LGdDQUF3QmdCLG9CQUFvQkgsa0JBQXBCO0FBRk4sT0FBcEI7O0FBS0EsVUFBTWhCLGdCQUFnQixPQUFLQyxnQkFBTCxDQUFzQkwsS0FBdEIsQ0FBdEI7QUFDQSxVQUFJSSxrQkFBa0IsSUFBdEIsRUFBNEI7QUFDMUIwRSxvQkFBWXJFLGNBQVosR0FBNkIsQ0FBN0I7QUFDQXFFLG9CQUFZcEUsVUFBWixHQUF5Qk4sYUFBekI7QUFDRDs7QUFFRCxhQUFLYyxRQUFMLENBQWM0RCxXQUFkOztBQUVBTix3QkFBa0JqRCxtQkFBbEI7QUFDRCxLQWhCRDtBQWlCRCxHOztPQUVEc0IsYyxHQUFpQixZQUFNO0FBQUEsaUJBQ2dDLE9BQUt2QyxLQURyQztBQUFBLFFBQ2JHLGNBRGEsVUFDYkEsY0FEYTtBQUFBLFFBQ0dDLFVBREgsVUFDR0EsVUFESDtBQUFBLFFBQ2VGLFlBRGYsVUFDZUEsWUFEZjs7QUFFckIsV0FBS0csT0FBTCxDQUFhb0UsZUFBYixDQUE2QnZFLFlBQTdCO0FBQ0EsV0FBS0csT0FBTCxDQUFhcUUsT0FBYixDQUFxQnZFLGNBQXJCLEVBQXFDQyxVQUFyQztBQUNELEc7O1NBaE5rQlgsYzs7O0FBbU9yQkEsZUFBZWtGLFlBQWYsR0FBOEI7QUFDNUJwQixZQUFVLEtBRGtCO0FBRTVCRSwwQkFBd0IsSUFGSTtBQUc1QloscUJBQW1CLFdBSFM7QUFJNUJELGlCQUFlLElBSmE7QUFLNUJzQixxQkFBbUIsNkJBQU0sQ0FBRTtBQUxDLENBQTlCIiwiZmlsZSI6InRhYi1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlYXJjaEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWFyY2hiYXInO1xuXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgQ29sdW1uTGlzdCBmcm9tICcuLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0JztcbmltcG9ydCBWaWV3Q29sdW1uIGZyb20gJy4vY29sdW1uL2NvbHVtbi5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VGFiQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcbiAgICBjb25zdCBpZE9mRmlyc3RJdGVtID0gdGhpcy5nZXRJZE9mRmlyc3RJdGVtKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RhdGFMb2FkZWQsXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiAwLFxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcbiAgICAgIHNlbGVjdGVkQ29sdW1uOiBpZE9mRmlyc3RJdGVtICE9PSBudWxsID8gMSA6IDAsXG4gICAgICBzZWxlY3RlZElkOiBpZE9mRmlyc3RJdGVtLFxuICAgIH07XG5cbiAgICB0aGlzLmNvbHVtbnMgPSBuZXcgQ29sdW1uTGlzdChwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGlzTG9hZGVkIH0gPSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCAhPT0gaXNMb2FkZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc0RhdGFMb2FkZWQ6IGlzTG9hZGVkLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0xvYWRlZCkge1xuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xuICAgIH1cblxuICAgIGlmIChjaGVja2VkKSB7XG4gICAgICBjb25zdCBsYXN0VXBkYXRlZCA9IGNoZWNrZWQuZ2V0TGFzdFVwZGF0ZVN0YW1wKCk7XG4gICAgICBpZiAobGFzdFVwZGF0ZWQgIT09IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBsYXN0VXBkYXRlZCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0SWRPZkZpcnN0SXRlbSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyIH0gPSBwcm9wcztcbiAgICBjb25zdCBmaXJzdEl0ZW0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Rmlyc3RJdGVtKCk7XG4gICAgaWYgKGZpcnN0SXRlbSA9PT0gbnVsbCB8fCAhZmlyc3RJdGVtLmlkKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiBmaXJzdEl0ZW0uaWQ7XG4gIH1cblxuICBnZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcbiAgfVxuXG4gIGdldENoZWNrZWRJZHMocGFyZW50SWRzLCBkYXRhKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICBjb25zdCByZXN1bHQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRJdGVtcyhwYXJlbnRJZHMpLm1hcChpID0+IGkuaWQpO1xuXG4gICAgLy8gQWRkcyBhbGwgaXRlbXMgdGhhdCBoYXZlIGNoZWNrZWRBbGwgaW4gY2hpbGRyZW5cbiAgICBpZiAoZGF0YSAmJiBBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpKSB7XG4gICAgICBkYXRhLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFBhcmVudElkcyA9IHBhcmVudElkcy5zbGljZSgpO1xuICAgICAgICBjdXJyZW50UGFyZW50SWRzLnB1c2goaXRlbS5pZCk7XG4gICAgICAgIGlmICh0aGlzLmdldElzQ2hlY2tlZEFsbChjdXJyZW50UGFyZW50SWRzKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcbiAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuY29sdW1ucy5saXN0IHx8IFtdO1xuICAgIGNvbnN0IHNlbGVjdGVkUGF0aCA9IHRoaXMuY29sdW1ucy5zZWxlY3RlZFBhdGggfHwgW107XG4gICAgY29uc3QgcGFyZW50SWRzID0gW107XG4gICAgbGV0IGFueUNoZWNrZWRBbGwgPSBmYWxzZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItY29udGVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItc2VhcmNoLWJhclwiPlxuICAgICAgICAgIDxTZWFyY2hCYXJcbiAgICAgICAgICAgIGRlZmFsdFZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcn1cbiAgICAgICAgICAgIGlzRHluYW1pY1xuICAgICAgICAgICAgaXNUb29sdGlwRW5hYmxlZFxuICAgICAgICAgICAgbWluQ2hhcnM9ezJ9XG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM9e3tcbiAgICAgICAgICAgICAgdG9vbHRpcDogdGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwLFxuICAgICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcjogdGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvblNlYXJjaD17dGhpcy5zZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgb25DbGVhcj17dGhpcy5zZWFyY2hDbGVhckhhbmRsZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWNvbHVtbi13cmFwcGVyXCI+XG4gICAgICAgICAgeyBPYmplY3Qua2V5cyhsaXN0KS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGxpc3Rba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSWQgPSBzZWxlY3RlZFBhdGhba2V5XSA/IFN0cmluZyhzZWxlY3RlZFBhdGhba2V5XSkgOiBudWxsO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50UmVmZXJlbmNlSWRzID0gcGFyZW50SWRzLnNsaWNlKCk7XG4gICAgICAgICAgICBjb25zdCBpc0NoZWNrZWRBbGwgPSB0aGlzLmdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpO1xuICAgICAgICAgICAgY29uc3QgY2hlY2tlZElkcyA9IGlzQ2hlY2tlZEFsbCA/IFtdIDogdGhpcy5nZXRDaGVja2VkSWRzKHBhcmVudElkcywgZGF0YSk7XG5cbiAgICAgICAgICAgIGFueUNoZWNrZWRBbGwgPSBhbnlDaGVja2VkQWxsIHx8IGlzQ2hlY2tlZEFsbDtcbiAgICAgICAgICAgIHBhcmVudElkcy5wdXNoKHNlbGVjdGVkSWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8Vmlld0NvbHVtblxuICAgICAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgICAgIGNoZWNrZWRBbGw9e2FueUNoZWNrZWRBbGwgfHwgaXNDaGVja2VkQWxsfVxuICAgICAgICAgICAgICAgIGNoZWNrZWRBbGxEaXNhYmxlZD17YW55Q2hlY2tlZEFsbCAmJiAhaXNDaGVja2VkQWxsfVxuICAgICAgICAgICAgICAgIGNoZWNrZWRBbGxIaWRkZW49e051bWJlcihrZXkpID09PSAwfVxuICAgICAgICAgICAgICAgIGNoZWNrZWRJZHM9e2NoZWNrZWRJZHN9XG4gICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgICAgICBpbmRleD17TnVtYmVyKGtleSkgKyAxfVxuICAgICAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgICAgIGtleT17TnVtYmVyKGtleSkgKyAxfVxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZUlkcz17cGFyZW50UmVmZXJlbmNlSWRzfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSWQ9e3NlbGVjdGVkSWR9XG4gICAgICAgICAgICAgICAgb25DaGVjaz17dGhpcy5jaGVja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgb25DaGVja0FsbD17dGhpcy5jaGVja0FsbEhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIGdldFNwaW5uZXIgPSAoKSA9PiA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItY29udGVudFwiPjxTcGlubmVyIC8+PC9kaXY+O1xuXG4gIGNsaWNrSGFuZGxlciA9IChsZXZlbCwgaWQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkQ29sdW1uOiBsZXZlbCxcbiAgICAgIHNlbGVjdGVkSWQ6IGlkLFxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tIYW5kbGVyID0gKHJlZmVyZW5jZUlkcywgaWQsIGNoZWNrU3RhdGUpID0+IHtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgIGlmIChjaGVja1N0YXRlKSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LmFkZChyZWZlcmVuY2VJZHMsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5yZW1vdmUocmVmZXJlbmNlSWRzLCBpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlKGNoZWNrZWRJdGVtSGFzaExpc3QpO1xuICB9XG5cbiAgY2hlY2tBbGxIYW5kbGVyID0gKHJlZmVyZW5jZUlkcywgY2hlY2tTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHBhcmVudElkcyA9IHJlZmVyZW5jZUlkcy5zbGljZSgpO1xuICAgIGNvbnN0IGlkID0gcGFyZW50SWRzLnBvcCgpO1xuXG4gICAgaWYgKCFpZCkgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyBzZWxlY3RlZCBwYXJlbnQgZWxlbWVudCB0byBwZXJmb3JtIGNoZWNraW5nIG9mIGFsbCBlbGVtZW50cycpO1xuXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICBpZiAoY2hlY2tTdGF0ZSkge1xuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5hZGRBbGwocGFyZW50SWRzLCBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucmVtb3ZlQWxsKHBhcmVudElkcywgaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcbiAgfVxuXG4gIHNlYXJjaENoYW5nZUhhbmRsZXIgPSBzZWFyY2hpbmdGb3IgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcblxuICBzZWFyY2hDbGVhckhhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvcjogJycgfSk7XG4gIH1cblxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBvbkNoZWNrTGlzdENoYW5nZSB9ID0gcHJvcHM7XG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICAgIGNvbnN0IHN0YXRlT2JqZWN0ID0ge1xuICAgICAgICBpc0RhdGFMb2FkZWQ6IGRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCxcbiAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlkT2ZGaXJzdEl0ZW0gPSB0aGlzLmdldElkT2ZGaXJzdEl0ZW0ocHJvcHMpO1xuICAgICAgaWYgKGlkT2ZGaXJzdEl0ZW0gIT09IG51bGwpIHtcbiAgICAgICAgc3RhdGVPYmplY3Quc2VsZWN0ZWRDb2x1bW4gPSAxO1xuICAgICAgICBzdGF0ZU9iamVjdC5zZWxlY3RlZElkID0gaWRPZkZpcnN0SXRlbTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZU9iamVjdCk7XG5cbiAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlKGNoZWNrZWRJdGVtSGFzaExpc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVmcmVzaENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENvbHVtbiwgc2VsZWN0ZWRJZCwgc2VhcmNoaW5nRm9yIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuY29sdW1ucy5zZXRTZWFyY2hpbmdGb3Ioc2VhcmNoaW5nRm9yKTtcbiAgICB0aGlzLmNvbHVtbnMucmVmcmVzaChzZWxlY3RlZENvbHVtbiwgc2VsZWN0ZWRJZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkID8gdGhpcy5nZXRDb250ZW50KCkgOiB0aGlzLmdldFNwaW5uZXIoKVxuICAgICk7XG4gIH1cbn1cblxuVmlld1RhYkNvbnRlbnQucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgb25DaGVja0xpc3RDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuVmlld1RhYkNvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcbiAgb25DaGVja0xpc3RDaGFuZ2U6ICgpID0+IHt9LFxufTtcbiJdfQ==