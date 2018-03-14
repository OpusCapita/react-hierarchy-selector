'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _topBar = require('./top-bar.component');

var _topBar2 = _interopRequireDefault(_topBar);

var _tabs = require('./tabs.component');

var _tabs2 = _interopRequireDefault(_tabs);

var _selectedItems = require('./selected-items');

var _selectedItems2 = _interopRequireDefault(_selectedItems);

var _groupName = require('./group-name');

var _groupName2 = _interopRequireDefault(_groupName);

var _types = require('../../types');

var _types2 = require('../../services/types');

var _groupNameCalculation = require('../../services/group-name-calculation');

var _groupNameCalculation2 = _interopRequireDefault(_groupNameCalculation);

require('./view.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-unused-state */

function getFirstCheckedItemHashList(lists) {
  var dataSourceKeys = Object.keys(lists);

  if (dataSourceKeys.length === 0) return null;

  return lists[dataSourceKeys[0]];
}

var HierarchySelectorView = function (_React$PureComponent) {
  _inherits(HierarchySelectorView, _React$PureComponent);

  function HierarchySelectorView(props) {
    _classCallCheck(this, HierarchySelectorView);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getInitialLastUpdateStamp = function () {
      return '0';
    };

    _this.getLastUpdateStamp = function () {
      var stamp = Object.keys(_this.state.checkedItemHashLists).map(function (i) {
        return _this.state.checkedItemHashLists[i].getLastUpdateStamp();
      }).join('-');

      return stamp;
    };

    _this.getGroupName = function (hashList) {
      var _this$state = _this.state,
          groupName = _this$state.groupName,
          groupNameChangedByUser = _this$state.groupNameChangedByUser;

      return (0, _groupNameCalculation2.default)(groupName, groupNameChangedByUser, hashList);
    };

    _this.getContent = function () {
      var listsHashArray = _this.state.checkedItemHashLists;
      var tabsItems = [{
        title: '',
        dataSourceProvider: _this.props.dataSourceProvider
      }];

      return _react2.default.createElement(
        'div',
        { className: 'oc-hierarchy-selector-view' },
        _react2.default.createElement(
          'div',
          { className: 'oc-hierarchy-selector-tabs' },
          _react2.default.createElement(_tabs2.default, {
            allLabel: _this.props.allLabel,
            items: tabsItems,
            listItemRenderFunction: _this.props.listItemRenderFunction,
            onCheckListChange: _this.checkListChangeHandler,
            hideSingleTab: true,
            searchPlaceHolder: _this.props.searchPlaceHolder
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'oc-hierarchy-selector-selected-container' },
          !_this.props.standalone && _react2.default.createElement(_groupName2.default, {
            label: _this.props.groupNameLabel,
            placeHolder: _this.props.groupNamePlaceHolder,
            initialValue: _this.state.groupName,
            onChange: _this.groupNameChangeHandler
          }),
          _react2.default.createElement(_selectedItems2.default, {
            allLabel: _this.props.allLabel,
            listLabel: _this.props.selectedItemListLabel,
            checkedItemLists: Object.keys(listsHashArray).map(function (i) {
              return listsHashArray[i];
            }),
            itemRenderFunction: _this.props.selectedItemRenderFunction,
            onItemRemove: _this.itemRemoveHandler
          })
        )
      );
    };

    _this.getCanSelectStatus = function (groupName, lists) {
      var isGroupName = String(groupName).trim() !== '';
      var count = 0;
      Object.keys(lists).forEach(function (key) {
        count += lists[key].getCheckedItemsCount();
      });

      return isGroupName && count > 0;
    };

    _this.getCheckedOutput = function () {
      // At this moment we provide results only for one data source
      var checkedItemHashList = getFirstCheckedItemHashList(_this.state.checkedItemHashLists);
      if (!checkedItemHashList) return [];

      var checkedOutput = checkedItemHashList.getCheckedOutput();
      var resultList = checkedOutput.checked || [];

      return resultList;
    };

    _this.getAllCheckedItems = function () {
      // At this moment we provide results only for one data source
      var checkedItemHashList = getFirstCheckedItemHashList(_this.state.checkedItemHashLists);
      if (!checkedItemHashList) return [];

      var checkedItems = checkedItemHashList.getAllCheckedItems();

      return checkedItems;
    };

    _this.createCheckedItemHashLists = function (dataSourceProvider) {
      var listHash = {};

      dataSourceProvider.preCheckItems();
      listHash[dataSourceProvider.id] = dataSourceProvider.getChecked();

      return listHash;
    };

    _this.groupNameChangeHandler = function (newValue) {
      _this.setState({
        canSelect: _this.getCanSelectStatus(newValue, _this.state.checkedItemHashLists),
        groupName: newValue,
        groupNameChangedByUser: true
      });
    };

    _this.cancelHandler = function () {
      _this.props.onCancel();
    };

    _this.selectHandler = function () {
      if (_this.state.groupName.trim() === '') throw new Error('State groupName is empty');

      var allCheckedItems = _this.getAllCheckedItems();
      var checkedOutput = _this.getCheckedOutput();

      _this.props.onSelect(_this.state.groupName, allCheckedItems, checkedOutput);
    };

    _this.checkListChangeHandler = function (checkedItemHashList) {
      if (checkedItemHashList) {
        var lists = _this.state.checkedItemHashLists;
        lists[checkedItemHashList.getId()] = checkedItemHashList;
        /* Getting group name after lists changing */
        var groupName = _this.getGroupName(lists);

        _this.setState({
          groupName: groupName,
          canSelect: _this.getCanSelectStatus(groupName, lists),
          checkedItemHashLists: lists,
          checkedItemsLastUpdate: _this.getLastUpdateStamp()
        });
      }
      _this.afterCheckListChanged();
    };

    _this.itemRemoveHandler = function () {
      var lists = _this.state.checkedItemHashLists;
      var groupName = _this.getGroupName(lists);
      _this.setState({
        groupName: groupName,
        canSelect: _this.getCanSelectStatus(groupName, lists),
        checkedItemsLastUpdate: _this.getLastUpdateStamp()
      });
      _this.afterCheckListChanged();
    };

    _this.afterCheckListChanged = function () {
      var resultList = _this.getCheckedOutput();
      _this.props.onCheckListChanged(resultList);
    };

    _this.show = function () {
      return _this.getContent();
    };

    _this.showInModal = function () {
      return _react2.default.createElement(
        _reactBootstrap.Modal,
        {
          dialogClassName: 'oc-hierarchy-selector-view-dialog',
          show: _this.state.visible,
          onHide: _this.cancelHandler,
          keyboard: false,
          backdrop: 'static'
        },
        _react2.default.createElement(
          _reactBootstrap.Modal.Header,
          null,
          _react2.default.createElement(_topBar2.default, {
            selectDisabled: !_this.state.canSelect,
            title: _this.props.title,
            onCancel: _this.cancelHandler,
            onSelect: _this.selectHandler,
            btnSelectLabel: _this.props.btnSelectLabel,
            btnCancelLabel: _this.props.btnCancelLabel
          })
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Body,
          null,
          _this.getContent()
        )
      );
    };

    props.dataSourceProvider.setPrecheckedItems(props.preCheckedItems);
    var checkedItemHashLists = _this.createCheckedItemHashLists(props.dataSourceProvider);

    _this.state = {
      canSelect: _this.getCanSelectStatus(props.groupName, checkedItemHashLists),
      groupName: props.groupName,
      groupNameChangedByUser: props.groupName.trim() !== '',
      checkedItemHashLists: checkedItemHashLists,
      checkedItemsLastUpdate: _this.getInitialLastUpdateStamp(),
      visible: true
    };
    return _this;
  }

  HierarchySelectorView.prototype.render = function render() {
    return this.props.showInModal && !this.props.standalone ? this.showInModal() : this.show();
  };

  return HierarchySelectorView;
}(_react2.default.PureComponent);

exports.default = HierarchySelectorView;


HierarchySelectorView.defaultProps = {
  onCancel: function onCancel() {},
  onCheckListChanged: function onCheckListChanged() {},
  onSelect: function onSelect() {},
  showInModal: true,
  allLabel: 'All',
  btnSelectLabel: 'Select',
  btnCancelLabel: 'Cancel',
  groupName: '',
  groupNameLabel: 'Group name',
  groupNamePlaceHolder: 'Please, fill a group name',
  listItemRenderFunction: null,
  preCheckedItems: null,
  searchPlaceHolder: 'Search...',
  selectedItemListLabel: 'Selected items',
  selectedItemRenderFunction: null,
  standalone: false,
  title: ''
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInN0YW5kYWxvbmUiLCJncm91cE5hbWVMYWJlbCIsImdyb3VwTmFtZVBsYWNlSG9sZGVyIiwiZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciIsInNlbGVjdGVkSXRlbUxpc3RMYWJlbCIsInNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUhhbmRsZXIiLCJnZXRDYW5TZWxlY3RTdGF0dXMiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsIkVycm9yIiwiYWxsQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3QiLCJnZXRJZCIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJhZnRlckNoZWNrTGlzdENoYW5nZWQiLCJvbkNoZWNrTGlzdENoYW5nZWQiLCJzaG93Iiwic2hvd0luTW9kYWwiLCJ2aXNpYmxlIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsInNldFByZWNoZWNrZWRJdGVtcyIsInByZUNoZWNrZWRJdGVtcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7K2VBZEE7O0FBaUJBLFNBQVNBLDJCQUFULENBQXFDQyxLQUFyQyxFQUE0QztBQUMxQyxNQUFNQyxpQkFBaUJDLE9BQU9DLElBQVAsQ0FBWUgsS0FBWixDQUF2Qjs7QUFFQSxNQUFJQyxlQUFlRyxNQUFmLEtBQTBCLENBQTlCLEVBQWlDLE9BQU8sSUFBUDs7QUFFakMsU0FBT0osTUFBTUMsZUFBZSxDQUFmLENBQU4sQ0FBUDtBQUNEOztJQUVvQkkscUI7OztBQUNuQixpQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWdCbkJDLHlCQWhCbUIsR0FnQlM7QUFBQSxhQUFNLEdBQU47QUFBQSxLQWhCVDs7QUFBQSxVQWtCbkJDLGtCQWxCbUIsR0FrQkUsWUFBTTtBQUN6QixVQUFNQyxRQUFRUCxPQUNYQyxJQURXLENBQ04sTUFBS08sS0FBTCxDQUFXQyxvQkFE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QUFMLENBQVdzQixVQUF0QyxHQUFtRCxLQUFLeUMsV0FBTCxFQUFuRCxHQUF3RSxLQUFLRCxJQUFMLEVBQS9FO0FBQ0QsRzs7O0VBbk1nRCxnQkFBTVEsYTs7a0JBQXBDdkUscUI7OztBQTJOckJBLHNCQUFzQndFLFlBQXRCLEdBQXFDO0FBQ25DbEIsWUFBVSxvQkFBTSxDQUFFLENBRGlCO0FBRW5DUSxzQkFBb0IsOEJBQU0sQ0FBRSxDQUZPO0FBR25DSixZQUFVLG9CQUFNLENBQUUsQ0FIaUI7QUFJbkNNLGVBQWEsSUFKc0I7QUFLbkM3QyxZQUFVLEtBTHlCO0FBTW5DK0Msa0JBQWdCLFFBTm1CO0FBT25DQyxrQkFBZ0IsUUFQbUI7QUFRbkN2RCxhQUFXLEVBUndCO0FBU25DWSxrQkFBZ0IsWUFUbUI7QUFVbkNDLHdCQUFzQiwyQkFWYTtBQVduQ0wsMEJBQXdCLElBWFc7QUFZbkNpRCxtQkFBaUIsSUFaa0I7QUFhbkMvQyxxQkFBbUIsV0FiZ0I7QUFjbkNLLHlCQUF1QixnQkFkWTtBQWVuQ0MsOEJBQTRCLElBZk87QUFnQm5DTCxjQUFZLEtBaEJ1QjtBQWlCbkNOLFNBQU87QUFqQjRCLENBQXJDIiwiZmlsZSI6InZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuXG5pbXBvcnQgVmlld1RvcEJhciBmcm9tICcuL3RvcC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBWaWV3VGFicyBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCBTZWxlY3RlZEl0ZW1zIGZyb20gJy4vc2VsZWN0ZWQtaXRlbXMnO1xuaW1wb3J0IEdyb3VwTmFtZSBmcm9tICcuL2dyb3VwLW5hbWUnO1xuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCBjYWxjdWxhdGVHcm91cE5hbWUgZnJvbSAnLi4vLi4vc2VydmljZXMvZ3JvdXAtbmFtZS1jYWxjdWxhdGlvbic7XG5cbmltcG9ydCAnLi92aWV3LnNjc3MnO1xuXG5cbmZ1bmN0aW9uIGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdChsaXN0cykge1xuICBjb25zdCBkYXRhU291cmNlS2V5cyA9IE9iamVjdC5rZXlzKGxpc3RzKTtcblxuICBpZiAoZGF0YVNvdXJjZUtleXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gbGlzdHNbZGF0YVNvdXJjZUtleXNbMF1dO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByb3BzLnByZUNoZWNrZWRJdGVtcyk7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSB0aGlzLmNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzKHByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhwcm9wcy5ncm91cE5hbWUsIGNoZWNrZWRJdGVtSGFzaExpc3RzKSxcbiAgICAgIGdyb3VwTmFtZTogcHJvcHMuZ3JvdXBOYW1lLFxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogcHJvcHMuZ3JvdXBOYW1lLnRyaW0oKSAhPT0gJycsXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0cyxcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCgpLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCA9ICgpID0+ICcwJztcblxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhbXAgPSBPYmplY3RcbiAgICAgIC5rZXlzKHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpXG4gICAgICAubWFwKGkgPT4gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0c1tpXS5nZXRMYXN0VXBkYXRlU3RhbXAoKSlcbiAgICAgIC5qb2luKCctJyk7XG5cbiAgICByZXR1cm4gc3RhbXA7XG4gIH1cblxuICBnZXRHcm91cE5hbWUgPSAoaGFzaExpc3QpID0+IHtcbiAgICBjb25zdCB7IGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gY2FsY3VsYXRlR3JvdXBOYW1lKGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciwgaGFzaExpc3QpO1xuICB9XG5cbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0c0hhc2hBcnJheSA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgY29uc3QgdGFic0l0ZW1zID0gW3tcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcjogdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIsXG4gICAgfV07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlld1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWJzXCI+XG4gICAgICAgICAgPFZpZXdUYWJzXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgIGl0ZW1zPXt0YWJzSXRlbXN9XG4gICAgICAgICAgICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICBvbkNoZWNrTGlzdENoYW5nZT17dGhpcy5jaGVja0xpc3RDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgaGlkZVNpbmdsZVRhYlxuICAgICAgICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHshdGhpcy5wcm9wcy5zdGFuZGFsb25lICYmXG4gICAgICAgICAgPEdyb3VwTmFtZVxuICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuZ3JvdXBOYW1lTGFiZWx9XG4gICAgICAgICAgICBwbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5ncm91cE5hbWVQbGFjZUhvbGRlcn1cbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZT17dGhpcy5zdGF0ZS5ncm91cE5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5ncm91cE5hbWVDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgIC8+fVxuICAgICAgICAgIDxTZWxlY3RlZEl0ZW1zXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgIGxpc3RMYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1MaXN0TGFiZWx9XG4gICAgICAgICAgICBjaGVja2VkSXRlbUxpc3RzPXtPYmplY3Qua2V5cyhsaXN0c0hhc2hBcnJheSkubWFwKGkgPT4gbGlzdHNIYXNoQXJyYXlbaV0pfVxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgb25JdGVtUmVtb3ZlPXt0aGlzLml0ZW1SZW1vdmVIYW5kbGVyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGdldENhblNlbGVjdFN0YXR1cyA9IChncm91cE5hbWUsIGxpc3RzKSA9PiB7XG4gICAgY29uc3QgaXNHcm91cE5hbWUgPSBTdHJpbmcoZ3JvdXBOYW1lKS50cmltKCkgIT09ICcnO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgT2JqZWN0LmtleXMobGlzdHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY291bnQgKz0gbGlzdHNba2V5XS5nZXRDaGVja2VkSXRlbXNDb3VudCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzR3JvdXBOYW1lICYmIGNvdW50ID4gMDtcbiAgfVxuXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcblxuICAgIHJldHVybiByZXN1bHRMaXN0O1xuICB9XG5cbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xuICAgIGlmICghY2hlY2tlZEl0ZW1IYXNoTGlzdCkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRBbGxDaGVja2VkSXRlbXMoKTtcblxuICAgIHJldHVybiBjaGVja2VkSXRlbXM7XG4gIH1cblxuICBjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyA9IChkYXRhU291cmNlUHJvdmlkZXIpID0+IHtcbiAgICBjb25zdCBsaXN0SGFzaCA9IHt9O1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnByZUNoZWNrSXRlbXMoKTtcbiAgICBsaXN0SGFzaFtkYXRhU291cmNlUHJvdmlkZXIuaWRdID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcblxuICAgIHJldHVybiBsaXN0SGFzaDtcbiAgfVxuXG4gIGdyb3VwTmFtZUNoYW5nZUhhbmRsZXIgPSAobmV3VmFsdWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMobmV3VmFsdWUsIHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxuICAgICAgZ3JvdXBOYW1lOiBuZXdWYWx1ZSxcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBjYW5jZWxIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfVxuXG4gIHNlbGVjdEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuZ3JvdXBOYW1lLnRyaW0oKSA9PT0gJycpIHRocm93IG5ldyBFcnJvcignU3RhdGUgZ3JvdXBOYW1lIGlzIGVtcHR5Jyk7XG5cbiAgICBjb25zdCBhbGxDaGVja2VkSXRlbXMgPSB0aGlzLmdldEFsbENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcblxuICAgIHRoaXMucHJvcHNcbiAgICAgIC5vblNlbGVjdCh0aGlzLnN0YXRlLmdyb3VwTmFtZSwgYWxsQ2hlY2tlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KTtcbiAgfVxuXG4gIGNoZWNrTGlzdENoYW5nZUhhbmRsZXIgPSAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkgPT4ge1xuICAgIGlmIChjaGVja2VkSXRlbUhhc2hMaXN0KSB7XG4gICAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgICBsaXN0c1tjaGVja2VkSXRlbUhhc2hMaXN0LmdldElkKCldID0gY2hlY2tlZEl0ZW1IYXNoTGlzdDtcbiAgICAgIC8qIEdldHRpbmcgZ3JvdXAgbmFtZSBhZnRlciBsaXN0cyBjaGFuZ2luZyAqL1xuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxuICAgICAgICBjaGVja2VkSXRlbUhhc2hMaXN0czogbGlzdHMsXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcbiAgfVxuXG4gIGl0ZW1SZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBncm91cE5hbWUsXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICB9KTtcbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xuICB9XG5cbiAgYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdExpc3QgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlZChyZXN1bHRMaXN0KTtcbiAgfVxuXG4gIHNob3cgPSAoKSA9PiB0aGlzLmdldENvbnRlbnQoKTtcblxuICBzaG93SW5Nb2RhbCA9ICgpID0+IChcbiAgICA8TW9kYWxcbiAgICAgIGRpYWxvZ0NsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3LWRpYWxvZ1wiXG4gICAgICBzaG93PXt0aGlzLnN0YXRlLnZpc2libGV9XG4gICAgICBvbkhpZGU9e3RoaXMuY2FuY2VsSGFuZGxlcn1cbiAgICAgIGtleWJvYXJkPXtmYWxzZX1cbiAgICAgIGJhY2tkcm9wPVwic3RhdGljXCJcbiAgICA+XG4gICAgICA8TW9kYWwuSGVhZGVyPlxuICAgICAgICA8Vmlld1RvcEJhclxuICAgICAgICAgIHNlbGVjdERpc2FibGVkPXshdGhpcy5zdGF0ZS5jYW5TZWxlY3R9XG4gICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2FuY2VsSGFuZGxlcn1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5zZWxlY3RIYW5kbGVyfVxuICAgICAgICAgIGJ0blNlbGVjdExhYmVsPXt0aGlzLnByb3BzLmJ0blNlbGVjdExhYmVsfVxuICAgICAgICAgIGJ0bkNhbmNlbExhYmVsPXt0aGlzLnByb3BzLmJ0bkNhbmNlbExhYmVsfVxuICAgICAgICAvPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAge3RoaXMuZ2V0Q29udGVudCgpfVxuICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgIDwvTW9kYWw+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnNob3dJbk1vZGFsICYmICF0aGlzLnByb3BzLnN0YW5kYWxvbmUgPyB0aGlzLnNob3dJbk1vZGFsKCkgOiB0aGlzLnNob3coKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNoZWNrTGlzdENoYW5nZWQ6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dJbk1vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgdGl0bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuQ2FuY2VsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZ3JvdXBOYW1lTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgc3RhbmRhbG9uZTogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcuZGVmYXVsdFByb3BzID0ge1xuICBvbkNhbmNlbDogKCkgPT4ge30sXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgc2hvd0luTW9kYWw6IHRydWUsXG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXG4gIGdyb3VwTmFtZTogJycsXG4gIGdyb3VwTmFtZUxhYmVsOiAnR3JvdXAgbmFtZScsXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiAnUGxlYXNlLCBmaWxsIGEgZ3JvdXAgbmFtZScsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzdGFuZGFsb25lOiBmYWxzZSxcbiAgdGl0bGU6ICcnLFxufTtcbiJdfQ==