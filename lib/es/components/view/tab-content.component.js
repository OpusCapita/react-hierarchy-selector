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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlNwaW5uZXIiLCJTZWFyY2hCYXIiLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwiQ29sdW1uTGlzdCIsIlV0aWxzIiwiVmlld0NvbHVtbiIsIlZpZXdUYWJDb250ZW50IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsImlkT2ZGaXJzdEl0ZW0iLCJnZXRJZE9mRmlyc3RJdGVtIiwic3RhdGUiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwic2VhcmNoaW5nRm9yIiwic2VsZWN0ZWRDb2x1bW4iLCJzZWxlY3RlZElkIiwiY29sdW1ucyIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImNoZWNrZWQiLCJnZXRDaGVja2VkIiwic2V0U3RhdGUiLCJsYXN0VXBkYXRlZCIsImdldExhc3RVcGRhdGVTdGFtcCIsImdldElzQ2hlY2tlZEFsbCIsInBhcmVudElkcyIsImNoZWNrZWRJdGVtSGFzaExpc3QiLCJnZXRDaGVja2VkSWRzIiwiZGF0YSIsInJlc3VsdCIsImdldENoZWNrZWRJdGVtcyIsIm1hcCIsImkiLCJpZCIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJjdXJyZW50UGFyZW50SWRzIiwic2xpY2UiLCJwdXNoIiwicmVuZGVyIiwiZ2V0Q29udGVudCIsImdldFNwaW5uZXIiLCJQdXJlQ29tcG9uZW50IiwiZmlyc3RJdGVtIiwiZ2V0Rmlyc3RJdGVtIiwicmVmcmVzaENvbnRlbnQiLCJsaXN0Iiwic2VsZWN0ZWRQYXRoIiwiYW55Q2hlY2tlZEFsbCIsInNlYXJjaFBsYWNlSG9sZGVyIiwic2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaENsZWFySGFuZGxlciIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJTdHJpbmciLCJwYXJlbnRSZWZlcmVuY2VJZHMiLCJpc0NoZWNrZWRBbGwiLCJjaGVja2VkSWRzIiwiYWxsTGFiZWwiLCJOdW1iZXIiLCJsaXN0SXRlbVJlbmRlckZ1bmN0aW9uIiwiY2hlY2tIYW5kbGVyIiwiY2hlY2tBbGxIYW5kbGVyIiwiY2xpY2tIYW5kbGVyIiwibGV2ZWwiLCJyZWZlcmVuY2VJZHMiLCJjaGVja1N0YXRlIiwiYWRkIiwicmVtb3ZlIiwib25DaGVja0xpc3RDaGFuZ2UiLCJwb3AiLCJFcnJvciIsImFkZEFsbCIsInJlbW92ZUFsbCIsImUiLCJzZWFyY2hpbmdWYWx1ZSIsInRhcmdldCIsInZhbHVlIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsInRoZW4iLCJzdGF0ZU9iamVjdCIsInNldFNlYXJjaGluZ0ZvciIsInJlZnJlc2giLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsT0FBT0MsT0FBUCxNQUFvQixZQUFwQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsZUFBdEI7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxzQkFBdkM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlDQUF2QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLDJCQUF2Qjs7SUFFcUJDLGM7OztBQUNuQiwwQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMsZ0JBQWdCLE1BQUtDLGdCQUFMLENBQXNCTCxLQUF0QixDQUF0Qjs7QUFFQSxVQUFLTSxLQUFMLEdBQWE7QUFDWEwsZ0NBRFc7QUFFWE0sOEJBQXdCLENBRmI7QUFHWEMsb0JBQWMsRUFISDtBQUlYQyxzQkFBZ0JMLGtCQUFrQixJQUFsQixHQUF5QixDQUF6QixHQUE2QixDQUpsQztBQUtYTSxrQkFBWU47QUFMRCxLQUFiOztBQVFBLFVBQUtPLE9BQUwsR0FBZSxJQUFJZixVQUFKLENBQWVJLE1BQU1FLGtCQUFyQixDQUFmO0FBZGlCO0FBZWxCOzsyQkFFRFUsa0IsaUNBQXFCO0FBQ25CLFFBQUksQ0FBQyxLQUFLTixLQUFMLENBQVdMLFlBQWhCLEVBQThCO0FBQzVCLFdBQUtZLFFBQUwsQ0FBYyxLQUFLYixLQUFuQjtBQUNEO0FBQ0YsRzs7MkJBRURjLHlCLHNDQUEwQkMsUyxFQUFXO0FBQUEsUUFDM0JaLFFBRDJCLEdBQ2RZLFVBQVViLGtCQURJLENBQzNCQyxRQUQyQjs7QUFFbkMsUUFBTWEsVUFBVUQsVUFBVWIsa0JBQVYsQ0FBNkJlLFVBQTdCLEVBQWhCOztBQUVBLFFBQUksS0FBS1gsS0FBTCxDQUFXTCxZQUFYLEtBQTRCRSxRQUFoQyxFQUEwQztBQUN4QyxXQUFLZSxRQUFMLENBQWM7QUFDWmpCLHNCQUFjRTtBQURGLE9BQWQ7QUFHRDs7QUFFRCxRQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNiLFdBQUtVLFFBQUwsQ0FBY0UsU0FBZDtBQUNEOztBQUVELFFBQUlDLE9BQUosRUFBYTtBQUNYLFVBQU1HLGNBQWNILFFBQVFJLGtCQUFSLEVBQXBCO0FBQ0EsVUFBSUQsZ0JBQWdCLEtBQUtiLEtBQUwsQ0FBV0Msc0JBQS9CLEVBQXVEO0FBQ3JELGFBQUtXLFFBQUwsQ0FBYztBQUNaWCxrQ0FBd0JZO0FBRFosU0FBZDtBQUdEO0FBQ0Y7QUFDRixHOzsyQkFVREUsZSw0QkFBZ0JDLFMsRUFBVztBQUN6QixRQUFNQyxzQkFBc0IsS0FBS3ZCLEtBQUwsQ0FBV0Usa0JBQVgsQ0FBOEJlLFVBQTlCLEVBQTVCO0FBQ0EsV0FBT00sb0JBQW9CRixlQUFwQixDQUFvQ0MsU0FBcEMsQ0FBUDtBQUNELEc7OzJCQUVERSxhLDBCQUFjRixTLEVBQVdHLEksRUFBTTtBQUFBOztBQUM3QixRQUFNRixzQkFBc0IsS0FBS3ZCLEtBQUwsQ0FBV0Usa0JBQVgsQ0FBOEJlLFVBQTlCLEVBQTVCO0FBQ0EsUUFBTVMsU0FBU0gsb0JBQW9CSSxlQUFwQixDQUFvQ0wsU0FBcEMsRUFBK0NNLEdBQS9DLENBQW1EO0FBQUEsYUFBS0MsRUFBRUMsRUFBUDtBQUFBLEtBQW5ELENBQWY7O0FBRUE7QUFDQSxRQUFJTCxRQUFRTSxNQUFNQyxPQUFOLENBQWNQLEtBQUtRLEtBQW5CLENBQVosRUFBdUM7QUFDckNSLFdBQUtRLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQixVQUFDQyxJQUFELEVBQVU7QUFDM0IsWUFBTUMsbUJBQW1CZCxVQUFVZSxLQUFWLEVBQXpCO0FBQ0FELHlCQUFpQkUsSUFBakIsQ0FBc0JILEtBQUtMLEVBQTNCO0FBQ0EsWUFBSSxPQUFLVCxlQUFMLENBQXFCZSxnQkFBckIsQ0FBSixFQUE0QztBQUMxQ1YsaUJBQU9ZLElBQVAsQ0FBWUgsS0FBS0wsRUFBakI7QUFDRDtBQUNGLE9BTkQ7QUFPRDs7QUFFRCxXQUFPSixNQUFQO0FBQ0QsRzs7MkJBc0lEYSxNLHFCQUFTO0FBQ1AsV0FDRSxLQUFLakMsS0FBTCxDQUFXTCxZQUFYLEdBQTBCLEtBQUt1QyxVQUFMLEVBQTFCLEdBQThDLEtBQUtDLFVBQUwsRUFEaEQ7QUFHRCxHOzs7RUF2TnlDbEQsTUFBTW1ELGE7OztPQWdEaERyQyxnQixHQUFtQixVQUFDTCxLQUFELEVBQVc7QUFBQSxRQUNwQkUsa0JBRG9CLEdBQ0dGLEtBREgsQ0FDcEJFLGtCQURvQjs7QUFFNUIsUUFBTXlDLFlBQVl6QyxtQkFBbUIwQyxZQUFuQixFQUFsQjtBQUNBLFFBQUlELGNBQWMsSUFBZCxJQUFzQixDQUFDQSxVQUFVYixFQUFyQyxFQUF5QyxPQUFPLElBQVA7O0FBRXpDLFdBQU9hLFVBQVViLEVBQWpCO0FBQ0QsRzs7T0F5QkRVLFUsR0FBYSxZQUFNO0FBQ2pCLFdBQUtLLGNBQUw7QUFDQSxRQUFNQyxPQUFPLE9BQUtuQyxPQUFMLENBQWFtQyxJQUFiLElBQXFCLEVBQWxDO0FBQ0EsUUFBTUMsZUFBZSxPQUFLcEMsT0FBTCxDQUFhb0MsWUFBYixJQUE2QixFQUFsRDtBQUNBLFFBQU16QixZQUFZLEVBQWxCO0FBQ0EsUUFBSTBCLGdCQUFnQixLQUFwQjs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsbUNBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLHNDQUFmO0FBQ0UsNEJBQUMsU0FBRDtBQUNFLDZCQUFtQixPQUFLaEQsS0FBTCxDQUFXaUQsaUJBRGhDO0FBRUUsMEJBQWdCLE9BQUtDLG1CQUZ2QjtBQUdFLHdCQUFjLE9BQUtDO0FBSHJCO0FBREYsT0FERjtBQVFFO0FBQUE7QUFBQSxVQUFLLFdBQVUsc0NBQWY7QUFDSUMsZUFBT0MsSUFBUCxDQUFZUCxJQUFaLEVBQWtCbEIsR0FBbEIsQ0FBc0IsVUFBQzBCLEdBQUQsRUFBUztBQUMvQixjQUFNN0IsT0FBT3FCLEtBQUtRLEdBQUwsQ0FBYjtBQUNBLGNBQU01QyxhQUFhcUMsYUFBYU8sR0FBYixJQUFvQkMsT0FBT1IsYUFBYU8sR0FBYixDQUFQLENBQXBCLEdBQWdELElBQW5FO0FBQ0EsY0FBTUUscUJBQXFCbEMsVUFBVWUsS0FBVixFQUEzQjtBQUNBLGNBQU1vQixlQUFlLE9BQUtwQyxlQUFMLENBQXFCQyxTQUFyQixDQUFyQjtBQUNBLGNBQU1vQyxhQUFhRCxlQUFlLEVBQWYsR0FBb0IsT0FBS2pDLGFBQUwsQ0FBbUJGLFNBQW5CLEVBQThCRyxJQUE5QixDQUF2Qzs7QUFFQXVCLDBCQUFnQkEsaUJBQWlCUyxZQUFqQztBQUNBbkMsb0JBQVVnQixJQUFWLENBQWU1QixVQUFmOztBQUVBLGlCQUNFLG9CQUFDLFVBQUQ7QUFDRSxzQkFBVSxPQUFLVixLQUFMLENBQVcyRCxRQUR2QjtBQUVFLHdCQUFZWCxpQkFBaUJTLFlBRi9CO0FBR0UsZ0NBQW9CVCxpQkFBaUIsQ0FBQ1MsWUFIeEM7QUFJRSw4QkFBa0JHLE9BQU9OLEdBQVAsTUFBZ0IsQ0FKcEM7QUFLRSx3QkFBWUksVUFMZDtBQU1FLGtCQUFNakMsSUFOUjtBQU9FLG1CQUFPbUMsT0FBT04sR0FBUCxJQUFjLENBUHZCO0FBUUUsZ0NBQW9CLE9BQUt0RCxLQUFMLENBQVc2RCxzQkFSakM7QUFTRSxpQkFBS0QsT0FBT04sR0FBUCxJQUFjLENBVHJCO0FBVUUsMEJBQWNFLGtCQVZoQjtBQVdFLHdCQUFZOUMsVUFYZDtBQVlFLHFCQUFTLE9BQUtvRCxZQVpoQjtBQWFFLHdCQUFZLE9BQUtDLGVBYm5CO0FBY0UscUJBQVMsT0FBS0M7QUFkaEIsWUFERjtBQWtCRCxTQTVCQztBQURKO0FBUkYsS0FERjtBQTBDRCxHOztPQUVEdkIsVSxHQUFhO0FBQUEsV0FBTTtBQUFBO0FBQUEsUUFBSyxXQUFVLG1DQUFmO0FBQW1ELDBCQUFDLE9BQUQ7QUFBbkQsS0FBTjtBQUFBLEc7O09BRWJ1QixZLEdBQWUsVUFBQ0MsS0FBRCxFQUFRbkMsRUFBUixFQUFlO0FBQzVCLFdBQUtaLFFBQUwsQ0FBYztBQUNaVCxzQkFBZ0J3RCxLQURKO0FBRVp2RCxrQkFBWW9CO0FBRkEsS0FBZDtBQUlELEc7O09BRURnQyxZLEdBQWUsVUFBQ0ksWUFBRCxFQUFlcEMsRUFBZixFQUFtQnFDLFVBQW5CLEVBQWtDO0FBQy9DLFFBQU01QyxzQkFBc0IsT0FBS3ZCLEtBQUwsQ0FBV0Usa0JBQVgsQ0FBOEJlLFVBQTlCLEVBQTVCO0FBQ0EsUUFBSWtELFVBQUosRUFBZ0I7QUFDZDVDLDBCQUFvQjZDLEdBQXBCLENBQXdCRixZQUF4QixFQUFzQ3BDLEVBQXRDO0FBQ0QsS0FGRCxNQUVPO0FBQ0xQLDBCQUFvQjhDLE1BQXBCLENBQTJCSCxZQUEzQixFQUF5Q3BDLEVBQXpDO0FBQ0Q7QUFDRCxXQUFLWixRQUFMLENBQWM7QUFDWlgsOEJBQXdCZ0Isb0JBQW9CSCxrQkFBcEI7QUFEWixLQUFkO0FBR0EsV0FBS3BCLEtBQUwsQ0FBV3NFLGlCQUFYLENBQTZCL0MsbUJBQTdCO0FBQ0QsRzs7T0FFRHdDLGUsR0FBa0IsVUFBQ0csWUFBRCxFQUFlQyxVQUFmLEVBQThCO0FBQzlDLFFBQU03QyxZQUFZNEMsYUFBYTdCLEtBQWIsRUFBbEI7QUFDQSxRQUFNUCxLQUFLUixVQUFVaUQsR0FBVixFQUFYOztBQUVBLFFBQUksQ0FBQ3pDLEVBQUwsRUFBUyxNQUFNLElBQUkwQyxLQUFKLENBQVUseUVBQVYsQ0FBTjs7QUFFVCxRQUFNakQsc0JBQXNCLE9BQUt2QixLQUFMLENBQVdFLGtCQUFYLENBQThCZSxVQUE5QixFQUE1QjtBQUNBLFFBQUlrRCxVQUFKLEVBQWdCO0FBQ2Q1QywwQkFBb0JrRCxNQUFwQixDQUEyQm5ELFNBQTNCLEVBQXNDUSxFQUF0QztBQUNELEtBRkQsTUFFTztBQUNMUCwwQkFBb0JtRCxTQUFwQixDQUE4QnBELFNBQTlCLEVBQXlDUSxFQUF6QztBQUNEO0FBQ0QsV0FBS1osUUFBTCxDQUFjO0FBQ1pYLDhCQUF3QmdCLG9CQUFvQkgsa0JBQXBCO0FBRFosS0FBZDtBQUdBLFdBQUtwQixLQUFMLENBQVdzRSxpQkFBWCxDQUE2Qi9DLG1CQUE3QjtBQUNELEc7O09BRUQyQixtQixHQUFzQixVQUFDeUIsQ0FBRCxFQUFPO0FBQzNCLFFBQU1DLGlCQUFpQkQsRUFBRUUsTUFBRixHQUFXRixFQUFFRSxNQUFGLENBQVNDLEtBQVQsSUFBa0IsRUFBN0IsR0FBa0MsRUFBekQ7QUFDQSxRQUFJdEUsZUFBZSxFQUFuQjs7QUFFQSxRQUFJWCxNQUFNa0Ysc0JBQU4sQ0FBNkJILGNBQTdCLENBQUosRUFBa0Q7QUFDaERwRSxxQkFBZW9FLGNBQWY7QUFDRDtBQUNELFdBQUsxRCxRQUFMLENBQWMsRUFBRVYsMEJBQUYsRUFBZDtBQUNELEc7O09BRUQyQyxrQixHQUFxQixZQUFNO0FBQ3pCLFdBQUtqQyxRQUFMLENBQWMsRUFBRVYsY0FBYyxFQUFoQixFQUFkO0FBQ0QsRzs7T0FFREssUSxHQUFXLFVBQUNiLEtBQUQsRUFBVztBQUFBLFFBQ1pFLGtCQURZLEdBQzhCRixLQUQ5QixDQUNaRSxrQkFEWTtBQUFBLFFBQ1FvRSxpQkFEUixHQUM4QnRFLEtBRDlCLENBQ1FzRSxpQkFEUjs7QUFFcEJwRSx1QkFBbUJXLFFBQW5CLEdBQThCbUUsSUFBOUIsQ0FBbUMsWUFBTTtBQUN2QyxVQUFNekQsc0JBQXNCckIsbUJBQW1CZSxVQUFuQixFQUE1QjtBQUNBLFVBQU1nRSxjQUFjO0FBQ2xCaEYsc0JBQWNDLG1CQUFtQkMsUUFEZjtBQUVsQkksZ0NBQXdCZ0Isb0JBQW9CSCxrQkFBcEI7QUFGTixPQUFwQjs7QUFLQSxVQUFNaEIsZ0JBQWdCLE9BQUtDLGdCQUFMLENBQXNCTCxLQUF0QixDQUF0QjtBQUNBLFVBQUlJLGtCQUFrQixJQUF0QixFQUE0QjtBQUMxQjZFLG9CQUFZeEUsY0FBWixHQUE2QixDQUE3QjtBQUNBd0Usb0JBQVl2RSxVQUFaLEdBQXlCTixhQUF6QjtBQUNEOztBQUVELGFBQUtjLFFBQUwsQ0FBYytELFdBQWQ7O0FBRUFYLHdCQUFrQi9DLG1CQUFsQjtBQUNELEtBaEJEO0FBaUJELEc7O09BRURzQixjLEdBQWlCLFlBQU07QUFBQSxpQkFDZ0MsT0FBS3ZDLEtBRHJDO0FBQUEsUUFDYkcsY0FEYSxVQUNiQSxjQURhO0FBQUEsUUFDR0MsVUFESCxVQUNHQSxVQURIO0FBQUEsUUFDZUYsWUFEZixVQUNlQSxZQURmOztBQUVyQixXQUFLRyxPQUFMLENBQWF1RSxlQUFiLENBQTZCMUUsWUFBN0I7QUFDQSxXQUFLRyxPQUFMLENBQWF3RSxPQUFiLENBQXFCMUUsY0FBckIsRUFBcUNDLFVBQXJDO0FBQ0QsRzs7U0FqTmtCWCxjOzs7QUFtT3JCQSxlQUFlcUYsWUFBZixHQUE4QjtBQUM1QnpCLFlBQVUsS0FEa0I7QUFFNUJFLDBCQUF3QixJQUZJO0FBRzVCWixxQkFBbUIsV0FIUztBQUk1QnFCLHFCQUFtQiw2QkFBTSxDQUFFO0FBSkMsQ0FBOUIiLCJmaWxlIjoidGFiLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xuaW1wb3J0IFNlYXJjaEJhciBmcm9tICcuLi9zZWFyY2gtYmFyJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgQ29sdW1uTGlzdCBmcm9tICcuLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgVmlld0NvbHVtbiBmcm9tICcuL2NvbHVtbi9jb2x1bW4uY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RhYkNvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBpc0RhdGFMb2FkZWQgPSBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQ7XG4gICAgY29uc3QgaWRPZkZpcnN0SXRlbSA9IHRoaXMuZ2V0SWRPZkZpcnN0SXRlbShwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEYXRhTG9hZGVkLFxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogMCxcbiAgICAgIHNlYXJjaGluZ0ZvcjogJycsXG4gICAgICBzZWxlY3RlZENvbHVtbjogaWRPZkZpcnN0SXRlbSAhPT0gbnVsbCA/IDEgOiAwLFxuICAgICAgc2VsZWN0ZWRJZDogaWRPZkZpcnN0SXRlbSxcbiAgICB9O1xuXG4gICAgdGhpcy5jb2x1bW5zID0gbmV3IENvbHVtbkxpc3QocHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgeyBpc0xvYWRlZCB9ID0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlcjtcbiAgICBjb25zdCBjaGVja2VkID0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQgIT09IGlzTG9hZGVkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNEYXRhTG9hZGVkOiBpc0xvYWRlZCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghaXNMb2FkZWQpIHtcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgY29uc3QgbGFzdFVwZGF0ZWQgPSBjaGVja2VkLmdldExhc3RVcGRhdGVTdGFtcCgpO1xuICAgICAgaWYgKGxhc3RVcGRhdGVkICE9PSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtc0xhc3RVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogbGFzdFVwZGF0ZWQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldElkT2ZGaXJzdEl0ZW0gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciB9ID0gcHJvcHM7XG4gICAgY29uc3QgZmlyc3RJdGVtID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEZpcnN0SXRlbSgpO1xuICAgIGlmIChmaXJzdEl0ZW0gPT09IG51bGwgfHwgIWZpcnN0SXRlbS5pZCkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gZmlyc3RJdGVtLmlkO1xuICB9XG5cbiAgZ2V0SXNDaGVja2VkQWxsKHBhcmVudElkcykge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0SXNDaGVja2VkQWxsKHBhcmVudElkcyk7XG4gIH1cblxuICBnZXRDaGVja2VkSWRzKHBhcmVudElkcywgZGF0YSkge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgY29uc3QgcmVzdWx0ID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRDaGVja2VkSXRlbXMocGFyZW50SWRzKS5tYXAoaSA9PiBpLmlkKTtcblxuICAgIC8vIEFkZHMgYWxsIGl0ZW1zIHRoYXQgaGF2ZSBjaGVja2VkQWxsIGluIGNoaWxkcmVuXG4gICAgaWYgKGRhdGEgJiYgQXJyYXkuaXNBcnJheShkYXRhLml0ZW1zKSkge1xuICAgICAgZGF0YS5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYXJlbnRJZHMgPSBwYXJlbnRJZHMuc2xpY2UoKTtcbiAgICAgICAgY3VycmVudFBhcmVudElkcy5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICBpZiAodGhpcy5nZXRJc0NoZWNrZWRBbGwoY3VycmVudFBhcmVudElkcykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChpdGVtLmlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XG4gICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNvbHVtbnMubGlzdCB8fCBbXTtcbiAgICBjb25zdCBzZWxlY3RlZFBhdGggPSB0aGlzLmNvbHVtbnMuc2VsZWN0ZWRQYXRoIHx8IFtdO1xuICAgIGNvbnN0IHBhcmVudElkcyA9IFtdO1xuICAgIGxldCBhbnlDaGVja2VkQWxsID0gZmFsc2U7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFiLWNvbnRlbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFiLXNlYXJjaC1iYXJcIj5cbiAgICAgICAgICA8U2VhcmNoQmFyXG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cbiAgICAgICAgICAgIG9uU2VhcmNoQ2hhbmdlPXt0aGlzLnNlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICBvbkNsb3NlQ2xpY2s9e3RoaXMuc2VhcmNoQ2xlYXJIYW5kbGVyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW4td3JhcHBlclwiPlxuICAgICAgICAgIHsgT2JqZWN0LmtleXMobGlzdCkubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBsaXN0W2tleV07XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZElkID0gc2VsZWN0ZWRQYXRoW2tleV0gPyBTdHJpbmcoc2VsZWN0ZWRQYXRoW2tleV0pIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFJlZmVyZW5jZUlkcyA9IHBhcmVudElkcy5zbGljZSgpO1xuICAgICAgICAgICAgY29uc3QgaXNDaGVja2VkQWxsID0gdGhpcy5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrZWRJZHMgPSBpc0NoZWNrZWRBbGwgPyBbXSA6IHRoaXMuZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpO1xuXG4gICAgICAgICAgICBhbnlDaGVja2VkQWxsID0gYW55Q2hlY2tlZEFsbCB8fCBpc0NoZWNrZWRBbGw7XG4gICAgICAgICAgICBwYXJlbnRJZHMucHVzaChzZWxlY3RlZElkKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPFZpZXdDb2x1bW5cbiAgICAgICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsPXthbnlDaGVja2VkQWxsIHx8IGlzQ2hlY2tlZEFsbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsRGlzYWJsZWQ9e2FueUNoZWNrZWRBbGwgJiYgIWlzQ2hlY2tlZEFsbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsSGlkZGVuPXtOdW1iZXIoa2V5KSA9PT0gMH1cbiAgICAgICAgICAgICAgICBjaGVja2VkSWRzPXtjaGVja2VkSWRzfVxuICAgICAgICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgICAgICAgaW5kZXg9e051bWJlcihrZXkpICsgMX1cbiAgICAgICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgICAgICBrZXk9e051bWJlcihrZXkpICsgMX1cbiAgICAgICAgICAgICAgICByZWZlcmVuY2VJZHM9e3BhcmVudFJlZmVyZW5jZUlkc31cbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkPXtzZWxlY3RlZElkfVxuICAgICAgICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgIG9uQ2hlY2tBbGw9e3RoaXMuY2hlY2tBbGxIYW5kbGVyfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBnZXRTcGlubmVyID0gKCkgPT4gPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFiLWNvbnRlbnRcIj48U3Bpbm5lciAvPjwvZGl2PjtcblxuICBjbGlja0hhbmRsZXIgPSAobGV2ZWwsIGlkKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZENvbHVtbjogbGV2ZWwsXG4gICAgICBzZWxlY3RlZElkOiBpZCxcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGlkLCBjaGVja1N0YXRlKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICBpZiAoY2hlY2tTdGF0ZSkge1xuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5hZGQocmVmZXJlbmNlSWRzLCBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucmVtb3ZlKHJlZmVyZW5jZUlkcywgaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcbiAgfVxuXG4gIGNoZWNrQWxsSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGNoZWNrU3RhdGUpID0+IHtcbiAgICBjb25zdCBwYXJlbnRJZHMgPSByZWZlcmVuY2VJZHMuc2xpY2UoKTtcbiAgICBjb25zdCBpZCA9IHBhcmVudElkcy5wb3AoKTtcblxuICAgIGlmICghaWQpIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gc2VsZWN0ZWQgcGFyZW50IGVsZW1lbnQgdG8gcGVyZm9ybSBjaGVja2luZyBvZiBhbGwgZWxlbWVudHMnKTtcblxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgaWYgKGNoZWNrU3RhdGUpIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QuYWRkQWxsKHBhcmVudElkcywgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LnJlbW92ZUFsbChwYXJlbnRJZHMsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XG4gIH1cblxuICBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gKGUpID0+IHtcbiAgICBjb25zdCBzZWFyY2hpbmdWYWx1ZSA9IGUudGFyZ2V0ID8gZS50YXJnZXQudmFsdWUgfHwgJycgOiAnJztcbiAgICBsZXQgc2VhcmNoaW5nRm9yID0gJyc7XG5cbiAgICBpZiAoVXRpbHMuZW5vdWdoU2VhcmNoVGV4dExlbmd0aChzZWFyY2hpbmdWYWx1ZSkpIHtcbiAgICAgIHNlYXJjaGluZ0ZvciA9IHNlYXJjaGluZ1ZhbHVlO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xuICB9XG5cbiAgc2VhcmNoQ2xlYXJIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3I6ICcnIH0pO1xuICB9XG5cbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgb25DaGVja0xpc3RDaGFuZ2UgfSA9IHByb3BzO1xuICAgIGRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgICBjb25zdCBzdGF0ZU9iamVjdCA9IHtcbiAgICAgICAgaXNEYXRhTG9hZGVkOiBkYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpZE9mRmlyc3RJdGVtID0gdGhpcy5nZXRJZE9mRmlyc3RJdGVtKHByb3BzKTtcbiAgICAgIGlmIChpZE9mRmlyc3RJdGVtICE9PSBudWxsKSB7XG4gICAgICAgIHN0YXRlT2JqZWN0LnNlbGVjdGVkQ29sdW1uID0gMTtcbiAgICAgICAgc3RhdGVPYmplY3Quc2VsZWN0ZWRJZCA9IGlkT2ZGaXJzdEl0ZW07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGVPYmplY3QpO1xuXG4gICAgICBvbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZnJlc2hDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb2x1bW4sIHNlbGVjdGVkSWQsIHNlYXJjaGluZ0ZvciB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmNvbHVtbnMuc2V0U2VhcmNoaW5nRm9yKHNlYXJjaGluZ0Zvcik7XG4gICAgdGhpcy5jb2x1bW5zLnJlZnJlc2goc2VsZWN0ZWRDb2x1bW4sIHNlbGVjdGVkSWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRTcGlubmVyKClcbiAgICApO1xuICB9XG59XG5cblZpZXdUYWJDb250ZW50LnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblZpZXdUYWJDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iXX0=