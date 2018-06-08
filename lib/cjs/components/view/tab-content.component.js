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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJWaWV3VGFiQ29udGVudCIsInByb3BzIiwiaXNEYXRhTG9hZGVkIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJpZE9mRmlyc3RJdGVtIiwiZ2V0SWRPZkZpcnN0SXRlbSIsInN0YXRlIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlbGVjdGVkQ29sdW1uIiwic2VsZWN0ZWRJZCIsImNvbHVtbnMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjaGVja2VkIiwiZ2V0Q2hlY2tlZCIsInNldFN0YXRlIiwibGFzdFVwZGF0ZWQiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJnZXRJc0NoZWNrZWRBbGwiLCJwYXJlbnRJZHMiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiZ2V0Q2hlY2tlZElkcyIsImRhdGEiLCJyZXN1bHQiLCJnZXRDaGVja2VkSXRlbXMiLCJtYXAiLCJpIiwiaWQiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiY3VycmVudFBhcmVudElkcyIsInNsaWNlIiwicHVzaCIsInJlbmRlciIsImdldENvbnRlbnQiLCJnZXRTcGlubmVyIiwiUHVyZUNvbXBvbmVudCIsImZpcnN0SXRlbSIsImdldEZpcnN0SXRlbSIsInJlZnJlc2hDb250ZW50IiwibGlzdCIsInNlbGVjdGVkUGF0aCIsImFueUNoZWNrZWRBbGwiLCJzZWFyY2hDaGFuZ2VIYW5kbGVyIiwic2VhcmNoUGxhY2VIb2xkZXIiLCJzZWFyY2hDbGVhckhhbmRsZXIiLCJzZWFyY2hUb29sdGlwIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsIlN0cmluZyIsInBhcmVudFJlZmVyZW5jZUlkcyIsImlzQ2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJhbGxMYWJlbCIsIk51bWJlciIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJjaGVja0hhbmRsZXIiLCJjaGVja0FsbEhhbmRsZXIiLCJjbGlja0hhbmRsZXIiLCJsZXZlbCIsInJlZmVyZW5jZUlkcyIsImNoZWNrU3RhdGUiLCJhZGQiLCJyZW1vdmUiLCJvbkNoZWNrTGlzdENoYW5nZSIsInBvcCIsIkVycm9yIiwiYWRkQWxsIiwicmVtb3ZlQWxsIiwidGhlbiIsInN0YXRlT2JqZWN0Iiwic2V0U2VhcmNoaW5nRm9yIiwicmVmcmVzaCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7cUNBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGM7OztBQUNuQiwwQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMsZ0JBQWdCLE1BQUtDLGdCQUFMLENBQXNCTCxLQUF0QixDQUF0Qjs7QUFFQSxVQUFLTSxLQUFMLEdBQWE7QUFDWEwsZ0NBRFc7QUFFWE0sOEJBQXdCLENBRmI7QUFHWEMsb0JBQWMsRUFISDtBQUlYQyxzQkFBZ0JMLGtCQUFrQixJQUFsQixHQUF5QixDQUF6QixHQUE2QixDQUpsQztBQUtYTSxrQkFBWU47QUFMRCxLQUFiOztBQVFBLFVBQUtPLE9BQUwsR0FBZSx5QkFBZVgsTUFBTUUsa0JBQXJCLENBQWY7QUFkaUI7QUFlbEI7OzJCQUVEVSxrQixpQ0FBcUI7QUFDbkIsUUFBSSxDQUFDLEtBQUtOLEtBQUwsQ0FBV0wsWUFBaEIsRUFBOEI7QUFDNUIsV0FBS1ksUUFBTCxDQUFjLEtBQUtiLEtBQW5CO0FBQ0Q7QUFDRixHOzsyQkFFRGMseUIsc0NBQTBCQyxTLEVBQVc7QUFBQSxRQUMzQlosUUFEMkIsR0FDZFksVUFB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RGE7QUFBQSxRQUNHQyxVQURILFVBQ0dBLFVBREg7QUFBQSxRQUNlRixZQURmLFVBQ2VBLFlBRGY7O0FBRXJCLFdBQUtHLE9BQUwsQ0FBYW1FLGVBQWIsQ0FBNkJ0RSxZQUE3QjtBQUNBLFdBQUtHLE9BQUwsQ0FBYW9FLE9BQWIsQ0FBcUJ0RSxjQUFyQixFQUFxQ0MsVUFBckM7QUFDRCxHOztrQkE1TWtCWCxjOzs7QUErTnJCQSxlQUFlaUYsWUFBZixHQUE4QjtBQUM1QnBCLFlBQVUsS0FEa0I7QUFFNUJFLDBCQUF3QixJQUZJO0FBRzVCWixxQkFBbUIsV0FIUztBQUk1QkUsaUJBQWUsSUFKYTtBQUs1Qm1CLHFCQUFtQiw2QkFBTSxDQUFFO0FBTEMsQ0FBOUIiLCJmaWxlIjoidGFiLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXMgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc2VhcmNoYmFyJztcclxuXHJcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xyXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xyXG5pbXBvcnQgQ29sdW1uTGlzdCBmcm9tICcuLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0JztcclxuaW1wb3J0IFZpZXdDb2x1bW4gZnJvbSAnLi9jb2x1bW4vY29sdW1uLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VGFiQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xyXG4gICAgY29uc3QgaWRPZkZpcnN0SXRlbSA9IHRoaXMuZ2V0SWRPZkZpcnN0SXRlbShwcm9wcyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgaXNEYXRhTG9hZGVkLFxyXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiAwLFxyXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxyXG4gICAgICBzZWxlY3RlZENvbHVtbjogaWRPZkZpcnN0SXRlbSAhPT0gbnVsbCA/IDEgOiAwLFxyXG4gICAgICBzZWxlY3RlZElkOiBpZE9mRmlyc3RJdGVtLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvbHVtbnMgPSBuZXcgQ29sdW1uTGlzdChwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMucHJvcHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IHsgaXNMb2FkZWQgfSA9IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXI7XHJcbiAgICBjb25zdCBjaGVja2VkID0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkICE9PSBpc0xvYWRlZCkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBpc0RhdGFMb2FkZWQ6IGlzTG9hZGVkLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTG9hZGVkKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hlY2tlZCkge1xyXG4gICAgICBjb25zdCBsYXN0VXBkYXRlZCA9IGNoZWNrZWQuZ2V0TGFzdFVwZGF0ZVN0YW1wKCk7XHJcbiAgICAgIGlmIChsYXN0VXBkYXRlZCAhPT0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbXNMYXN0VXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBsYXN0VXBkYXRlZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SWRPZkZpcnN0SXRlbSA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgZmlyc3RJdGVtID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEZpcnN0SXRlbSgpO1xyXG4gICAgaWYgKGZpcnN0SXRlbSA9PT0gbnVsbCB8fCAhZmlyc3RJdGVtLmlkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZmlyc3RJdGVtLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXNDaGVja2VkQWxsKHBhcmVudElkcykge1xyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuICAgIHJldHVybiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRJdGVtcyhwYXJlbnRJZHMpLm1hcChpID0+IGkuaWQpO1xyXG5cclxuICAgIC8vIEFkZHMgYWxsIGl0ZW1zIHRoYXQgaGF2ZSBjaGVja2VkQWxsIGluIGNoaWxkcmVuXHJcbiAgICBpZiAoZGF0YSAmJiBBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpKSB7XHJcbiAgICAgIGRhdGEuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYXJlbnRJZHMgPSBwYXJlbnRJZHMuc2xpY2UoKTtcclxuICAgICAgICBjdXJyZW50UGFyZW50SWRzLnB1c2goaXRlbS5pZCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0SXNDaGVja2VkQWxsKGN1cnJlbnRQYXJlbnRJZHMpKSB7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChpdGVtLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuY29sdW1ucy5saXN0IHx8IFtdO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRQYXRoID0gdGhpcy5jb2x1bW5zLnNlbGVjdGVkUGF0aCB8fCBbXTtcclxuICAgIGNvbnN0IHBhcmVudElkcyA9IFtdO1xyXG4gICAgbGV0IGFueUNoZWNrZWRBbGwgPSBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1zZWFyY2gtYmFyXCI+XHJcbiAgICAgICAgICA8U2VhcmNoQmFyXHJcbiAgICAgICAgICAgIG9uU2VhcmNoPXt0aGlzLnNlYXJjaENoYW5nZUhhbmRsZXJ9XHJcbiAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxyXG4gICAgICAgICAgICBvbkNsb3NlQ2xpY2s9e3RoaXMuc2VhcmNoQ2xlYXJIYW5kbGVyfVxyXG4gICAgICAgICAgICBkeW5hbWljU2VhcmNoU3RhcnRzRnJvbT17M31cclxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yfVxyXG4gICAgICAgICAgICB0b29sdGlwPXt0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWNvbHVtbi13cmFwcGVyXCI+XHJcbiAgICAgICAgICB7IE9iamVjdC5rZXlzKGxpc3QpLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBsaXN0W2tleV07XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSWQgPSBzZWxlY3RlZFBhdGhba2V5XSA/IFN0cmluZyhzZWxlY3RlZFBhdGhba2V5XSkgOiBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRSZWZlcmVuY2VJZHMgPSBwYXJlbnRJZHMuc2xpY2UoKTtcclxuICAgICAgICAgICAgY29uc3QgaXNDaGVja2VkQWxsID0gdGhpcy5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tlZElkcyA9IGlzQ2hlY2tlZEFsbCA/IFtdIDogdGhpcy5nZXRDaGVja2VkSWRzKHBhcmVudElkcywgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBhbnlDaGVja2VkQWxsID0gYW55Q2hlY2tlZEFsbCB8fCBpc0NoZWNrZWRBbGw7XHJcbiAgICAgICAgICAgIHBhcmVudElkcy5wdXNoKHNlbGVjdGVkSWQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8Vmlld0NvbHVtblxyXG4gICAgICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsPXthbnlDaGVja2VkQWxsIHx8IGlzQ2hlY2tlZEFsbH1cclxuICAgICAgICAgICAgICAgIGNoZWNrZWRBbGxEaXNhYmxlZD17YW55Q2hlY2tlZEFsbCAmJiAhaXNDaGVja2VkQWxsfVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbEhpZGRlbj17TnVtYmVyKGtleSkgPT09IDB9XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkSWRzPXtjaGVja2VkSWRzfVxyXG4gICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cclxuICAgICAgICAgICAgICAgIGluZGV4PXtOdW1iZXIoa2V5KSArIDF9XHJcbiAgICAgICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgICAgICAgICAgIGtleT17TnVtYmVyKGtleSkgKyAxfVxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlSWRzPXtwYXJlbnRSZWZlcmVuY2VJZHN9XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkPXtzZWxlY3RlZElkfVxyXG4gICAgICAgICAgICAgICAgb25DaGVjaz17dGhpcy5jaGVja0hhbmRsZXJ9XHJcbiAgICAgICAgICAgICAgICBvbkNoZWNrQWxsPXt0aGlzLmNoZWNrQWxsSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBnZXRTcGlubmVyID0gKCkgPT4gPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFiLWNvbnRlbnRcIj48U3Bpbm5lciAvPjwvZGl2PjtcclxuXHJcbiAgY2xpY2tIYW5kbGVyID0gKGxldmVsLCBpZCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHNlbGVjdGVkQ29sdW1uOiBsZXZlbCxcclxuICAgICAgc2VsZWN0ZWRJZDogaWQsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoZWNrSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGlkLCBjaGVja1N0YXRlKSA9PiB7XHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG4gICAgaWYgKGNoZWNrU3RhdGUpIHtcclxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5hZGQocmVmZXJlbmNlSWRzLCBpZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LnJlbW92ZShyZWZlcmVuY2VJZHMsIGlkKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlKGNoZWNrZWRJdGVtSGFzaExpc3QpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tBbGxIYW5kbGVyID0gKHJlZmVyZW5jZUlkcywgY2hlY2tTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgcGFyZW50SWRzID0gcmVmZXJlbmNlSWRzLnNsaWNlKCk7XHJcbiAgICBjb25zdCBpZCA9IHBhcmVudElkcy5wb3AoKTtcclxuXHJcbiAgICBpZiAoIWlkKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIHNlbGVjdGVkIHBhcmVudCBlbGVtZW50IHRvIHBlcmZvcm0gY2hlY2tpbmcgb2YgYWxsIGVsZW1lbnRzJyk7XHJcblxyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuICAgIGlmIChjaGVja1N0YXRlKSB7XHJcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QuYWRkQWxsKHBhcmVudElkcywgaWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5yZW1vdmVBbGwocGFyZW50SWRzLCBpZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcclxuICB9XHJcblxyXG4gIHNlYXJjaENoYW5nZUhhbmRsZXIgPSBzZWFyY2hpbmdGb3IgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcclxuXHJcbiAgc2VhcmNoQ2xlYXJIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvcjogJycgfSk7XHJcbiAgfVxyXG5cclxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIG9uQ2hlY2tMaXN0Q2hhbmdlIH0gPSBwcm9wcztcclxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuICAgICAgY29uc3Qgc3RhdGVPYmplY3QgPSB7XHJcbiAgICAgICAgaXNEYXRhTG9hZGVkOiBkYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXHJcbiAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IGlkT2ZGaXJzdEl0ZW0gPSB0aGlzLmdldElkT2ZGaXJzdEl0ZW0ocHJvcHMpO1xyXG4gICAgICBpZiAoaWRPZkZpcnN0SXRlbSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHN0YXRlT2JqZWN0LnNlbGVjdGVkQ29sdW1uID0gMTtcclxuICAgICAgICBzdGF0ZU9iamVjdC5zZWxlY3RlZElkID0gaWRPZkZpcnN0SXRlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZU9iamVjdCk7XHJcblxyXG4gICAgICBvbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IHNlbGVjdGVkQ29sdW1uLCBzZWxlY3RlZElkLCBzZWFyY2hpbmdGb3IgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICB0aGlzLmNvbHVtbnMuc2V0U2VhcmNoaW5nRm9yKHNlYXJjaGluZ0Zvcik7XHJcbiAgICB0aGlzLmNvbHVtbnMucmVmcmVzaChzZWxlY3RlZENvbHVtbiwgc2VsZWN0ZWRJZCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRTcGlubmVyKClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5WaWV3VGFiQ29udGVudC5wcm9wVHlwZXMgPSB7XHJcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxyXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcblZpZXdUYWJDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcclxuICBhbGxMYWJlbDogJ0FsbCcsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXHJcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcclxuICBvbkNoZWNrTGlzdENoYW5nZTogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==