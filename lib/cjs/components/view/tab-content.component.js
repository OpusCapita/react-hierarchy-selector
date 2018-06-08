'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp, _initialiseProps; /* eslint-disable react/no-unused-prop-types */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSearchbar = require('@opuscapita/react-searchbar');

var _reactSearchbar2 = _interopRequireDefault(_reactSearchbar);

var _spinner = require('../spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _types = require('../../services/types');

var _columnList = require('../../models/column/column-list');

var _columnList2 = _interopRequireDefault(_columnList);

var _column = require('./column/column.component');

var _column2 = _interopRequireDefault(_column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    _this.columns = new _columnList2.default(props.dataSourceProvider);
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
}(_react2.default.PureComponent), _initialiseProps = function _initialiseProps() {
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

    return _react2.default.createElement(
      'div',
      { className: 'oc-hierarchy-selector-tab-content' },
      _react2.default.createElement(
        'div',
        { className: 'oc-hierarchy-selector-tab-search-bar' },
        _react2.default.createElement(_reactSearchbar2.default, {
          onSearch: _this3.searchChangeHandler,
          searchPlaceHolder: _this3.props.searchPlaceHolder,
          onCloseClick: _this3.searchClearHandler,
          dynamicSearchStartsFrom: 3,
          value: _this3.state.searchingFor,
          tooltip: _this3.props.searchTooltip
        })
      ),
      _react2.default.createElement(
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

          return _react2.default.createElement(_column2.default, {
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
    return _react2.default.createElement(
      'div',
      { className: 'oc-hierarchy-selector-tab-content' },
      _react2.default.createElement(_spinner2.default, null)
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
exports.default = ViewTabContent;


ViewTabContent.defaultProps = {
  allLabel: 'All',
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJWaWV3VGFiQ29udGVudCIsInByb3BzIiwiaXNEYXRhTG9hZGVkIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJpZE9mRmlyc3RJdGVtIiwiZ2V0SWRPZkZpcnN0SXRlbSIsInN0YXRlIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlbGVjdGVkQ29sdW1uIiwic2VsZWN0ZWRJZCIsImNvbHVtbnMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjaGVja2VkIiwiZ2V0Q2hlY2tlZCIsInNldFN0YXRlIiwibGFzdFVwZGF0ZWQiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJnZXRJc0NoZWNrZWRBbGwiLCJwYXJlbnRJZHMiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiZ2V0Q2hlY2tlZElkcyIsImRhdGEiLCJyZXN1bHQiLCJnZXRDaGVja2VkSXRlbXMiLCJtYXAiLCJpIiwiaWQiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiY3VycmVudFBhcmVudElkcyIsInNsaWNlIiwicHVzaCIsInJlbmRlciIsImdldENvbnRlbnQiLCJnZXRTcGlubmVyIiwiUHVyZUNvbXBvbmVudCIsImZpcnN0SXRlbSIsImdldEZpcnN0SXRlbSIsInJlZnJlc2hDb250ZW50IiwibGlzdCIsInNlbGVjdGVkUGF0aCIsImFueUNoZWNrZWRBbGwiLCJzZWFyY2hDaGFuZ2VIYW5kbGVyIiwic2VhcmNoUGxhY2VIb2xkZXIiLCJzZWFyY2hDbGVhckhhbmRsZXIiLCJzZWFyY2hUb29sdGlwIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsIlN0cmluZyIsInBhcmVudFJlZmVyZW5jZUlkcyIsImlzQ2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJhbGxMYWJlbCIsIk51bWJlciIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJjaGVja0hhbmRsZXIiLCJjaGVja0FsbEhhbmRsZXIiLCJjbGlja0hhbmRsZXIiLCJsZXZlbCIsInJlZmVyZW5jZUlkcyIsImNoZWNrU3RhdGUiLCJhZGQiLCJyZW1vdmUiLCJvbkNoZWNrTGlzdENoYW5nZSIsInBvcCIsIkVycm9yIiwiYWRkQWxsIiwicmVtb3ZlQWxsIiwidGhlbiIsInN0YXRlT2JqZWN0Iiwic2V0U2VhcmNoaW5nRm9yIiwicmVmcmVzaCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7cUNBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGM7OztBQUNuQiwwQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMsZ0JBQWdCLE1BQUtDLGdCQUFMLENBQXNCTCxLQUF0QixDQUF0Qjs7QUFFQSxVQUFLTSxLQUFMLEdBQWE7QUFDWEwsZ0NBRFc7QUFFWE0sOEJBQXdCLENBRmI7QUFHWEMsb0JBQWMsRUFISDtBQUlYQyxzQkFBZ0JMLGtCQUFrQixJQUFsQixHQUF5QixDQUF6QixHQUE2QixDQUpsQztBQUtYTSxrQkFBWU47QUFMRCxLQUFiOztBQVFBLFVBQUtPLE9BQUwsR0FBZSx5QkFBZVgsTUFBTUUsa0JBQXJCLENBQWY7QUFkaUI7QUFlbEI7OzJCQUVEVSxrQixpQ0FBcUI7QUFDbkIsUUFBSSxDQUFDLEtBQUtOLEtBQUwsQ0FBV0wsWUFBaEIsRUFBOEI7QUFDNUIsV0FBS1ksUUFBTCxDQUFjLEtBQUtiLEtBQW5CO0FBQ0Q7QUFDRixHOzsyQkFFRGMseUIsc0NBQTBCQyxTLEVBQVc7QUFBQSxRQUMzQlosUUFEMkIsR0FDZFksVUFB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RGE7QUFBQSxRQUNHQyxVQURILFVBQ0dBLFVBREg7QUFBQSxRQUNlRixZQURmLFVBQ2VBLFlBRGY7O0FBRXJCLFdBQUtHLE9BQUwsQ0FBYW1FLGVBQWIsQ0FBNkJ0RSxZQUE3QjtBQUNBLFdBQUtHLE9BQUwsQ0FBYW9FLE9BQWIsQ0FBcUJ0RSxjQUFyQixFQUFxQ0MsVUFBckM7QUFDRCxHOztrQkE1TWtCWCxjOzs7QUErTnJCQSxlQUFlaUYsWUFBZixHQUE4QjtBQUM1QnBCLFlBQVUsS0FEa0I7QUFFNUJFLDBCQUF3QixJQUZJO0FBRzVCWixxQkFBbUIsV0FIUztBQUk1QkUsaUJBQWUsSUFKYTtBQUs1Qm1CLHFCQUFtQiw2QkFBTSxDQUFFO0FBTEMsQ0FBOUIiLCJmaWxlIjoidGFiLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlYXJjaGJhcic7XG5cbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCBDb2x1bW5MaXN0IGZyb20gJy4uLy4uL21vZGVscy9jb2x1bW4vY29sdW1uLWxpc3QnO1xuaW1wb3J0IFZpZXdDb2x1bW4gZnJvbSAnLi9jb2x1bW4vY29sdW1uLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUYWJDb250ZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xuICAgIGNvbnN0IGlkT2ZGaXJzdEl0ZW0gPSB0aGlzLmdldElkT2ZGaXJzdEl0ZW0ocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGF0YUxvYWRlZCxcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IDAsXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxuICAgICAgc2VsZWN0ZWRDb2x1bW46IGlkT2ZGaXJzdEl0ZW0gIT09IG51bGwgPyAxIDogMCxcbiAgICAgIHNlbGVjdGVkSWQ6IGlkT2ZGaXJzdEl0ZW0sXG4gICAgfTtcblxuICAgIHRoaXMuY29sdW1ucyA9IG5ldyBDb2x1bW5MaXN0KHByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IHsgaXNMb2FkZWQgfSA9IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXI7XG4gICAgY29uc3QgY2hlY2tlZCA9IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkICE9PSBpc0xvYWRlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzRGF0YUxvYWRlZDogaXNMb2FkZWQsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzTG9hZGVkKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgIGNvbnN0IGxhc3RVcGRhdGVkID0gY2hlY2tlZC5nZXRMYXN0VXBkYXRlU3RhbXAoKTtcbiAgICAgIGlmIChsYXN0VXBkYXRlZCAhPT0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbXNMYXN0VXBkYXRlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGxhc3RVcGRhdGVkLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRJZE9mRmlyc3RJdGVtID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIgfSA9IHByb3BzO1xuICAgIGNvbnN0IGZpcnN0SXRlbSA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRGaXJzdEl0ZW0oKTtcbiAgICBpZiAoZmlyc3RJdGVtID09PSBudWxsIHx8ICFmaXJzdEl0ZW0uaWQpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIGZpcnN0SXRlbS5pZDtcbiAgfVxuXG4gIGdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgIHJldHVybiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0Q2hlY2tlZEl0ZW1zKHBhcmVudElkcykubWFwKGkgPT4gaS5pZCk7XG5cbiAgICAvLyBBZGRzIGFsbCBpdGVtcyB0aGF0IGhhdmUgY2hlY2tlZEFsbCBpbiBjaGlsZHJlblxuICAgIGlmIChkYXRhICYmIEFycmF5LmlzQXJyYXkoZGF0YS5pdGVtcykpIHtcbiAgICAgIGRhdGEuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50UGFyZW50SWRzID0gcGFyZW50SWRzLnNsaWNlKCk7XG4gICAgICAgIGN1cnJlbnRQYXJlbnRJZHMucHVzaChpdGVtLmlkKTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0SXNDaGVja2VkQWxsKGN1cnJlbnRQYXJlbnRJZHMpKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5pZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5jb2x1bW5zLmxpc3QgfHwgW107XG4gICAgY29uc3Qgc2VsZWN0ZWRQYXRoID0gdGhpcy5jb2x1bW5zLnNlbGVjdGVkUGF0aCB8fCBbXTtcbiAgICBjb25zdCBwYXJlbnRJZHMgPSBbXTtcbiAgICBsZXQgYW55Q2hlY2tlZEFsbCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1zZWFyY2gtYmFyXCI+XG4gICAgICAgICAgPFNlYXJjaEJhclxuICAgICAgICAgICAgb25TZWFyY2g9e3RoaXMuc2VhcmNoQ2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgICAgICAgb25DbG9zZUNsaWNrPXt0aGlzLnNlYXJjaENsZWFySGFuZGxlcn1cbiAgICAgICAgICAgIGR5bmFtaWNTZWFyY2hTdGFydHNGcm9tPXszfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yfVxuICAgICAgICAgICAgdG9vbHRpcD17dGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW4td3JhcHBlclwiPlxuICAgICAgICAgIHsgT2JqZWN0LmtleXMobGlzdCkubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBsaXN0W2tleV07XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZElkID0gc2VsZWN0ZWRQYXRoW2tleV0gPyBTdHJpbmcoc2VsZWN0ZWRQYXRoW2tleV0pIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFJlZmVyZW5jZUlkcyA9IHBhcmVudElkcy5zbGljZSgpO1xuICAgICAgICAgICAgY29uc3QgaXNDaGVja2VkQWxsID0gdGhpcy5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrZWRJZHMgPSBpc0NoZWNrZWRBbGwgPyBbXSA6IHRoaXMuZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpO1xuXG4gICAgICAgICAgICBhbnlDaGVja2VkQWxsID0gYW55Q2hlY2tlZEFsbCB8fCBpc0NoZWNrZWRBbGw7XG4gICAgICAgICAgICBwYXJlbnRJZHMucHVzaChzZWxlY3RlZElkKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPFZpZXdDb2x1bW5cbiAgICAgICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsPXthbnlDaGVja2VkQWxsIHx8IGlzQ2hlY2tlZEFsbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsRGlzYWJsZWQ9e2FueUNoZWNrZWRBbGwgJiYgIWlzQ2hlY2tlZEFsbH1cbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsSGlkZGVuPXtOdW1iZXIoa2V5KSA9PT0gMH1cbiAgICAgICAgICAgICAgICBjaGVja2VkSWRzPXtjaGVja2VkSWRzfVxuICAgICAgICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgICAgICAgaW5kZXg9e051bWJlcihrZXkpICsgMX1cbiAgICAgICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgICAgICBrZXk9e051bWJlcihrZXkpICsgMX1cbiAgICAgICAgICAgICAgICByZWZlcmVuY2VJZHM9e3BhcmVudFJlZmVyZW5jZUlkc31cbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkPXtzZWxlY3RlZElkfVxuICAgICAgICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgIG9uQ2hlY2tBbGw9e3RoaXMuY2hlY2tBbGxIYW5kbGVyfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBnZXRTcGlubmVyID0gKCkgPT4gPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFiLWNvbnRlbnRcIj48U3Bpbm5lciAvPjwvZGl2PjtcblxuICBjbGlja0hhbmRsZXIgPSAobGV2ZWwsIGlkKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZENvbHVtbjogbGV2ZWwsXG4gICAgICBzZWxlY3RlZElkOiBpZCxcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGlkLCBjaGVja1N0YXRlKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICBpZiAoY2hlY2tTdGF0ZSkge1xuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5hZGQocmVmZXJlbmNlSWRzLCBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucmVtb3ZlKHJlZmVyZW5jZUlkcywgaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcbiAgfVxuXG4gIGNoZWNrQWxsSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGNoZWNrU3RhdGUpID0+IHtcbiAgICBjb25zdCBwYXJlbnRJZHMgPSByZWZlcmVuY2VJZHMuc2xpY2UoKTtcbiAgICBjb25zdCBpZCA9IHBhcmVudElkcy5wb3AoKTtcblxuICAgIGlmICghaWQpIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXMgbm8gc2VsZWN0ZWQgcGFyZW50IGVsZW1lbnQgdG8gcGVyZm9ybSBjaGVja2luZyBvZiBhbGwgZWxlbWVudHMnKTtcblxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgaWYgKGNoZWNrU3RhdGUpIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QuYWRkQWxsKHBhcmVudElkcywgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LnJlbW92ZUFsbChwYXJlbnRJZHMsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XG4gIH1cblxuICBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gc2VhcmNoaW5nRm9yID0+IHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3IgfSk7XG5cbiAgc2VhcmNoQ2xlYXJIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3I6ICcnIH0pO1xuICB9XG5cbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgb25DaGVja0xpc3RDaGFuZ2UgfSA9IHByb3BzO1xuICAgIGRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgICBjb25zdCBzdGF0ZU9iamVjdCA9IHtcbiAgICAgICAgaXNEYXRhTG9hZGVkOiBkYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpZE9mRmlyc3RJdGVtID0gdGhpcy5nZXRJZE9mRmlyc3RJdGVtKHByb3BzKTtcbiAgICAgIGlmIChpZE9mRmlyc3RJdGVtICE9PSBudWxsKSB7XG4gICAgICAgIHN0YXRlT2JqZWN0LnNlbGVjdGVkQ29sdW1uID0gMTtcbiAgICAgICAgc3RhdGVPYmplY3Quc2VsZWN0ZWRJZCA9IGlkT2ZGaXJzdEl0ZW07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGVPYmplY3QpO1xuXG4gICAgICBvbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZnJlc2hDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb2x1bW4sIHNlbGVjdGVkSWQsIHNlYXJjaGluZ0ZvciB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmNvbHVtbnMuc2V0U2VhcmNoaW5nRm9yKHNlYXJjaGluZ0Zvcik7XG4gICAgdGhpcy5jb2x1bW5zLnJlZnJlc2goc2VsZWN0ZWRDb2x1bW4sIHNlbGVjdGVkSWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRTcGlubmVyKClcbiAgICApO1xuICB9XG59XG5cblZpZXdUYWJDb250ZW50LnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblZpZXdUYWJDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIHNlYXJjaFRvb2x0aXA6IG51bGwsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iXX0=