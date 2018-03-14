'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp, _initialiseProps; /* eslint-disable react/no-unused-prop-types */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _spinner = require('../spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _searchBar = require('../search-bar');

var _searchBar2 = _interopRequireDefault(_searchBar);

var _types = require('../../services/types');

var _columnList = require('../../models/column/column-list');

var _columnList2 = _interopRequireDefault(_columnList);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

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
        _react2.default.createElement(_searchBar2.default, {
          searchPlaceHolder: _this3.props.searchPlaceHolder,
          onSearchChange: _this3.searchChangeHandler,
          onCloseClick: _this3.searchClearHandler
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

  this.searchChangeHandler = function (e) {
    var searchingValue = e.target ? e.target.value || '' : '';
    var searchingFor = '';

    if (_utils2.default.enoughSearchTextLength(searchingValue)) {
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
exports.default = ViewTabContent;


ViewTabContent.defaultProps = {
  allLabel: 'All',
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJWaWV3VGFiQ29udGVudCIsInByb3BzIiwiaXNEYXRhTG9hZGVkIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJpZE9mRmlyc3RJdGVtIiwiZ2V0SWRPZkZpcnN0SXRlbSIsInN0YXRlIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlbGVjdGVkQ29sdW1uIiwic2VsZWN0ZWRJZCIsImNvbHVtbnMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjaGVja2VkIiwiZ2V0Q2hlY2tlZCIsInNldFN0YXRlIiwibGFzdFVwZGF0ZWQiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJnZXRJc0NoZWNrZWRBbGwiLCJwYXJlbnRJZHMiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiZ2V0Q2hlY2tlZElkcyIsImRhdGEiLCJyZXN1bHQiLCJnZXRDaGVja2VkSXRlbXMiLCJtYXAiLCJpIiwiaWQiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiY3VycmVudFBhcmVudElkcyIsInNsaWNlIiwicHVzaCIsInJlbmRlciIsImdldENvbnRlbnQiLCJnZXRTcGlubmVyIiwiUHVyZUNvbXBvbmVudCIsImZpcnN0SXRlbSIsImdldEZpcnN0SXRlbSIsInJlZnJlc2hDb250ZW50IiwibGlzdCIsInNlbGVjdGVkUGF0aCIsImFueUNoZWNrZWRBbGwiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaENoYW5nZUhhbmRsZXIiLCJzZWFyY2hDbGVhckhhbmRsZXIiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiU3RyaW5nIiwicGFyZW50UmVmZXJlbmNlSWRzIiwiaXNDaGVja2VkQWxsIiwiY2hlY2tlZElkcyIsImFsbExhYmVsIiwiTnVtYmVyIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrSGFuZGxlciIsImNoZWNrQWxsSGFuZGxlciIsImNsaWNrSGFuZGxlciIsImxldmVsIiwicmVmZXJlbmNlSWRzIiwiY2hlY2tTdGF0ZSIsImFkZCIsInJlbW92ZSIsIm9uQ2hlY2tMaXN0Q2hhbmdlIiwicG9wIiwiRXJyb3IiLCJhZGRBbGwiLCJyZW1vdmVBbGwiLCJlIiwic2VhcmNoaW5nVmFsdWUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImVub3VnaFNlYXJjaFRleHRMZW5ndGgiLCJ0aGVuIiwic3RhdGVPYmplY3QiLCJzZXRTZWFyY2hpbmdGb3IiLCJyZWZyZXNoIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztxQ0FBQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7QUFDbkIsMEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVELE1BQU1FLGtCQUFOLENBQXlCQyxRQUE5QztBQUNBLFFBQU1DLGdCQUFnQixNQUFLQyxnQkFBTCxDQUFzQkwsS0FBdEIsQ0FBdEI7O0FBRUEsVUFBS00sS0FBTCxHQUFhO0FBQ1hMLGdDQURXO0FBRVhNLDhCQUF3QixDQUZiO0FBR1hDLG9CQUFjLEVBSEg7QUFJWEMsc0JBQWdCTCxrQkFBa0IsSUFBbEIsR0FBeUIsQ0FBekIsR0FBNkIsQ0FKbEM7QUFLWE0sa0JBQVlOO0FBTEQsS0FBYjs7QUFRQSxVQUFLTyxPQUFMLEdBQWUseUJBQWVYLE1BQU1FLGtCQUFyQixDQUFmO0FBZGlCO0FBZWxCOzsyQkFFRFUsa0IsaUNBQXFCO0FBQ25CLFFBQUksQ0FBQyxLQUFLTixLQUFMLENBQVdMLFlBQWhCLEVBQThCO0FBQzVCLFdBQUtZLFFBQUwsQ0FBYyxLQUFLYixLQUFuQjtBQUNEO0FBQ0Ys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YUFBekI7QUFDRDs7QUFFRCxhQUFLYyxRQUFMLENBQWMrRCxXQUFkOztBQUVBWCx3QkFBa0IvQyxtQkFBbEI7QUFDRCxLQWhCRDtBQWlCRCxHOztPQUVEc0IsYyxHQUFpQixZQUFNO0FBQUEsaUJBQ2dDLE9BQUt2QyxLQURyQztBQUFBLFFBQ2JHLGNBRGEsVUFDYkEsY0FEYTtBQUFBLFFBQ0dDLFVBREgsVUFDR0EsVUFESDtBQUFBLFFBQ2VGLFlBRGYsVUFDZUEsWUFEZjs7QUFFckIsV0FBS0csT0FBTCxDQUFhdUUsZUFBYixDQUE2QjFFLFlBQTdCO0FBQ0EsV0FBS0csT0FBTCxDQUFhd0UsT0FBYixDQUFxQjFFLGNBQXJCLEVBQXFDQyxVQUFyQztBQUNELEc7O2tCQWpOa0JYLGM7OztBQW1PckJBLGVBQWVxRixZQUFmLEdBQThCO0FBQzVCekIsWUFBVSxLQURrQjtBQUU1QkUsMEJBQXdCLElBRkk7QUFHNUJaLHFCQUFtQixXQUhTO0FBSTVCcUIscUJBQW1CLDZCQUFNLENBQUU7QUFKQyxDQUE5QiIsImZpbGUiOiJ0YWItY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlcyAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuXHJcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xyXG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJy4uL3NlYXJjaC1iYXInO1xyXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xyXG5pbXBvcnQgQ29sdW1uTGlzdCBmcm9tICcuLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0JztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IFZpZXdDb2x1bW4gZnJvbSAnLi9jb2x1bW4vY29sdW1uLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VGFiQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xyXG4gICAgY29uc3QgaWRPZkZpcnN0SXRlbSA9IHRoaXMuZ2V0SWRPZkZpcnN0SXRlbShwcm9wcyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgaXNEYXRhTG9hZGVkLFxyXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiAwLFxyXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxyXG4gICAgICBzZWxlY3RlZENvbHVtbjogaWRPZkZpcnN0SXRlbSAhPT0gbnVsbCA/IDEgOiAwLFxyXG4gICAgICBzZWxlY3RlZElkOiBpZE9mRmlyc3RJdGVtLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvbHVtbnMgPSBuZXcgQ29sdW1uTGlzdChwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMucHJvcHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IHsgaXNMb2FkZWQgfSA9IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXI7XHJcbiAgICBjb25zdCBjaGVja2VkID0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkICE9PSBpc0xvYWRlZCkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBpc0RhdGFMb2FkZWQ6IGlzTG9hZGVkLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTG9hZGVkKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hlY2tlZCkge1xyXG4gICAgICBjb25zdCBsYXN0VXBkYXRlZCA9IGNoZWNrZWQuZ2V0TGFzdFVwZGF0ZVN0YW1wKCk7XHJcbiAgICAgIGlmIChsYXN0VXBkYXRlZCAhPT0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbXNMYXN0VXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBsYXN0VXBkYXRlZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SWRPZkZpcnN0SXRlbSA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgZmlyc3RJdGVtID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEZpcnN0SXRlbSgpO1xyXG4gICAgaWYgKGZpcnN0SXRlbSA9PT0gbnVsbCB8fCAhZmlyc3RJdGVtLmlkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZmlyc3RJdGVtLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXNDaGVja2VkQWxsKHBhcmVudElkcykge1xyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuICAgIHJldHVybiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldElzQ2hlY2tlZEFsbChwYXJlbnRJZHMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRJdGVtcyhwYXJlbnRJZHMpLm1hcChpID0+IGkuaWQpO1xyXG5cclxuICAgIC8vIEFkZHMgYWxsIGl0ZW1zIHRoYXQgaGF2ZSBjaGVja2VkQWxsIGluIGNoaWxkcmVuXHJcbiAgICBpZiAoZGF0YSAmJiBBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpKSB7XHJcbiAgICAgIGRhdGEuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYXJlbnRJZHMgPSBwYXJlbnRJZHMuc2xpY2UoKTtcclxuICAgICAgICBjdXJyZW50UGFyZW50SWRzLnB1c2goaXRlbS5pZCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0SXNDaGVja2VkQWxsKGN1cnJlbnRQYXJlbnRJZHMpKSB7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChpdGVtLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuY29sdW1ucy5saXN0IHx8IFtdO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRQYXRoID0gdGhpcy5jb2x1bW5zLnNlbGVjdGVkUGF0aCB8fCBbXTtcclxuICAgIGNvbnN0IHBhcmVudElkcyA9IFtdO1xyXG4gICAgbGV0IGFueUNoZWNrZWRBbGwgPSBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1zZWFyY2gtYmFyXCI+XHJcbiAgICAgICAgICA8U2VhcmNoQmFyXHJcbiAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxyXG4gICAgICAgICAgICBvblNlYXJjaENoYW5nZT17dGhpcy5zZWFyY2hDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgICBvbkNsb3NlQ2xpY2s9e3RoaXMuc2VhcmNoQ2xlYXJIYW5kbGVyfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW4td3JhcHBlclwiPlxyXG4gICAgICAgICAgeyBPYmplY3Qua2V5cyhsaXN0KS5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbGlzdFtrZXldO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZElkID0gc2VsZWN0ZWRQYXRoW2tleV0gPyBTdHJpbmcoc2VsZWN0ZWRQYXRoW2tleV0pIDogbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50UmVmZXJlbmNlSWRzID0gcGFyZW50SWRzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZEFsbCA9IHRoaXMuZ2V0SXNDaGVja2VkQWxsKHBhcmVudElkcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrZWRJZHMgPSBpc0NoZWNrZWRBbGwgPyBbXSA6IHRoaXMuZ2V0Q2hlY2tlZElkcyhwYXJlbnRJZHMsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgYW55Q2hlY2tlZEFsbCA9IGFueUNoZWNrZWRBbGwgfHwgaXNDaGVja2VkQWxsO1xyXG4gICAgICAgICAgICBwYXJlbnRJZHMucHVzaChzZWxlY3RlZElkKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPFZpZXdDb2x1bW5cclxuICAgICAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbD17YW55Q2hlY2tlZEFsbCB8fCBpc0NoZWNrZWRBbGx9XHJcbiAgICAgICAgICAgICAgICBjaGVja2VkQWxsRGlzYWJsZWQ9e2FueUNoZWNrZWRBbGwgJiYgIWlzQ2hlY2tlZEFsbH1cclxuICAgICAgICAgICAgICAgIGNoZWNrZWRBbGxIaWRkZW49e051bWJlcihrZXkpID09PSAwfVxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZElkcz17Y2hlY2tlZElkc31cclxuICAgICAgICAgICAgICAgIGRhdGE9e2RhdGF9XHJcbiAgICAgICAgICAgICAgICBpbmRleD17TnVtYmVyKGtleSkgKyAxfVxyXG4gICAgICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XHJcbiAgICAgICAgICAgICAgICBrZXk9e051bWJlcihrZXkpICsgMX1cclxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZUlkcz17cGFyZW50UmVmZXJlbmNlSWRzfVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJZD17c2VsZWN0ZWRJZH1cclxuICAgICAgICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgb25DaGVja0FsbD17dGhpcy5jaGVja0FsbEhhbmRsZXJ9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrSGFuZGxlcn1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0U3Bpbm5lciA9ICgpID0+IDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1jb250ZW50XCI+PFNwaW5uZXIgLz48L2Rpdj47XHJcblxyXG4gIGNsaWNrSGFuZGxlciA9IChsZXZlbCwgaWQpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWxlY3RlZENvbHVtbjogbGV2ZWwsXHJcbiAgICAgIHNlbGVjdGVkSWQ6IGlkLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGVja0hhbmRsZXIgPSAocmVmZXJlbmNlSWRzLCBpZCwgY2hlY2tTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuICAgIGlmIChjaGVja1N0YXRlKSB7XHJcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QuYWRkKHJlZmVyZW5jZUlkcywgaWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5yZW1vdmUocmVmZXJlbmNlSWRzLCBpZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZShjaGVja2VkSXRlbUhhc2hMaXN0KTtcclxuICB9XHJcblxyXG4gIGNoZWNrQWxsSGFuZGxlciA9IChyZWZlcmVuY2VJZHMsIGNoZWNrU3RhdGUpID0+IHtcclxuICAgIGNvbnN0IHBhcmVudElkcyA9IHJlZmVyZW5jZUlkcy5zbGljZSgpO1xyXG4gICAgY29uc3QgaWQgPSBwYXJlbnRJZHMucG9wKCk7XHJcblxyXG4gICAgaWYgKCFpZCkgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyBzZWxlY3RlZCBwYXJlbnQgZWxlbWVudCB0byBwZXJmb3JtIGNoZWNraW5nIG9mIGFsbCBlbGVtZW50cycpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcbiAgICBpZiAoY2hlY2tTdGF0ZSkge1xyXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LmFkZEFsbChwYXJlbnRJZHMsIGlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QucmVtb3ZlQWxsKHBhcmVudElkcywgaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICB9KTtcclxuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hDaGFuZ2VIYW5kbGVyID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHNlYXJjaGluZ1ZhbHVlID0gZS50YXJnZXQgPyBlLnRhcmdldC52YWx1ZSB8fCAnJyA6ICcnO1xyXG4gICAgbGV0IHNlYXJjaGluZ0ZvciA9ICcnO1xyXG5cclxuICAgIGlmIChVdGlscy5lbm91Z2hTZWFyY2hUZXh0TGVuZ3RoKHNlYXJjaGluZ1ZhbHVlKSkge1xyXG4gICAgICBzZWFyY2hpbmdGb3IgPSBzZWFyY2hpbmdWYWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3IgfSk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hDbGVhckhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yOiAnJyB9KTtcclxuICB9XHJcblxyXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgb25DaGVja0xpc3RDaGFuZ2UgfSA9IHByb3BzO1xyXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG4gICAgICBjb25zdCBzdGF0ZU9iamVjdCA9IHtcclxuICAgICAgICBpc0RhdGFMb2FkZWQ6IGRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCxcclxuICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgaWRPZkZpcnN0SXRlbSA9IHRoaXMuZ2V0SWRPZkZpcnN0SXRlbShwcm9wcyk7XHJcbiAgICAgIGlmIChpZE9mRmlyc3RJdGVtICE9PSBudWxsKSB7XHJcbiAgICAgICAgc3RhdGVPYmplY3Quc2VsZWN0ZWRDb2x1bW4gPSAxO1xyXG4gICAgICAgIHN0YXRlT2JqZWN0LnNlbGVjdGVkSWQgPSBpZE9mRmlyc3RJdGVtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlT2JqZWN0KTtcclxuXHJcbiAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlKGNoZWNrZWRJdGVtSGFzaExpc3QpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoQ29udGVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb2x1bW4sIHNlbGVjdGVkSWQsIHNlYXJjaGluZ0ZvciB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHRoaXMuY29sdW1ucy5zZXRTZWFyY2hpbmdGb3Ioc2VhcmNoaW5nRm9yKTtcclxuICAgIHRoaXMuY29sdW1ucy5yZWZyZXNoKHNlbGVjdGVkQ29sdW1uLCBzZWxlY3RlZElkKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkID8gdGhpcy5nZXRDb250ZW50KCkgOiB0aGlzLmdldFNwaW5uZXIoKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblZpZXdUYWJDb250ZW50LnByb3BUeXBlcyA9IHtcclxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBpbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcblZpZXdUYWJDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcclxuICBhbGxMYWJlbDogJ0FsbCcsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXHJcbiAgb25DaGVja0xpc3RDaGFuZ2U6ICgpID0+IHt9LFxyXG59O1xyXG4iXX0=