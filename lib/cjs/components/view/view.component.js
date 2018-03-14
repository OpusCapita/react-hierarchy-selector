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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInN0YW5kYWxvbmUiLCJncm91cE5hbWVMYWJlbCIsImdyb3VwTmFtZVBsYWNlSG9sZGVyIiwiZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciIsInNlbGVjdGVkSXRlbUxpc3RMYWJlbCIsInNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUhhbmRsZXIiLCJnZXRDYW5TZWxlY3RTdGF0dXMiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsIkVycm9yIiwiYWxsQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3QiLCJnZXRJZCIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJhZnRlckNoZWNrTGlzdENoYW5nZWQiLCJvbkNoZWNrTGlzdENoYW5nZWQiLCJzaG93Iiwic2hvd0luTW9kYWwiLCJ2aXNpYmxlIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsInNldFByZWNoZWNrZWRJdGVtcyIsInByZUNoZWNrZWRJdGVtcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7K2VBZEE7O0FBaUJBLFNBQVNBLDJCQUFULENBQXFDQyxLQUFyQyxFQUE0QztBQUMxQyxNQUFNQyxpQkFBaUJDLE9BQU9DLElBQVAsQ0FBWUgsS0FBWixDQUF2Qjs7QUFFQSxNQUFJQyxlQUFlRyxNQUFmLEtBQTBCLENBQTlCLEVBQWlDLE9BQU8sSUFBUDs7QUFFakMsU0FBT0osTUFBTUMsZUFBZSxDQUFmLENBQU4sQ0FBUDtBQUNEOztJQUVvQkkscUI7OztBQUNuQixpQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWdCbkJDLHlCQWhCbUIsR0FnQlM7QUFBQSxhQUFNLEdBQU47QUFBQSxLQWhCVDs7QUFBQSxVQWtCbkJDLGtCQWxCbUIsR0FrQkUsWUFBTTtBQUN6QixVQUFNQyxRQUFRUCxPQUNYQyxJQURXLENBQ04sTUFBS08sS0FBTCxDQUFXQyxvQkFE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QUFMLENBQVdzQixVQUF0QyxHQUFtRCxLQUFLeUMsV0FBTCxFQUFuRCxHQUF3RSxLQUFLRCxJQUFMLEVBQS9FO0FBQ0QsRzs7O0VBbk1nRCxnQkFBTVEsYTs7a0JBQXBDdkUscUI7OztBQTJOckJBLHNCQUFzQndFLFlBQXRCLEdBQXFDO0FBQ25DbEIsWUFBVSxvQkFBTSxDQUFFLENBRGlCO0FBRW5DUSxzQkFBb0IsOEJBQU0sQ0FBRSxDQUZPO0FBR25DSixZQUFVLG9CQUFNLENBQUUsQ0FIaUI7QUFJbkNNLGVBQWEsSUFKc0I7QUFLbkM3QyxZQUFVLEtBTHlCO0FBTW5DK0Msa0JBQWdCLFFBTm1CO0FBT25DQyxrQkFBZ0IsUUFQbUI7QUFRbkN2RCxhQUFXLEVBUndCO0FBU25DWSxrQkFBZ0IsWUFUbUI7QUFVbkNDLHdCQUFzQiwyQkFWYTtBQVduQ0wsMEJBQXdCLElBWFc7QUFZbkNpRCxtQkFBaUIsSUFaa0I7QUFhbkMvQyxxQkFBbUIsV0FiZ0I7QUFjbkNLLHlCQUF1QixnQkFkWTtBQWVuQ0MsOEJBQTRCLElBZk87QUFnQm5DTCxjQUFZLEtBaEJ1QjtBQWlCbkNOLFNBQU87QUFqQjRCLENBQXJDIiwiZmlsZSI6InZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5pbXBvcnQgVmlld1RvcEJhciBmcm9tICcuL3RvcC1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IFZpZXdUYWJzIGZyb20gJy4vdGFicy5jb21wb25lbnQnO1xyXG5pbXBvcnQgU2VsZWN0ZWRJdGVtcyBmcm9tICcuL3NlbGVjdGVkLWl0ZW1zJztcclxuaW1wb3J0IEdyb3VwTmFtZSBmcm9tICcuL2dyb3VwLW5hbWUnO1xyXG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XHJcbmltcG9ydCBjYWxjdWxhdGVHcm91cE5hbWUgZnJvbSAnLi4vLi4vc2VydmljZXMvZ3JvdXAtbmFtZS1jYWxjdWxhdGlvbic7XHJcblxyXG5pbXBvcnQgJy4vdmlldy5zY3NzJztcclxuXHJcblxyXG5mdW5jdGlvbiBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QobGlzdHMpIHtcclxuICBjb25zdCBkYXRhU291cmNlS2V5cyA9IE9iamVjdC5rZXlzKGxpc3RzKTtcclxuXHJcbiAgaWYgKGRhdGFTb3VyY2VLZXlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiBsaXN0c1tkYXRhU291cmNlS2V5c1swXV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcm9wcy5wcmVDaGVja2VkSXRlbXMpO1xyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSB0aGlzLmNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzKHByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhwcm9wcy5ncm91cE5hbWUsIGNoZWNrZWRJdGVtSGFzaExpc3RzKSxcclxuICAgICAgZ3JvdXBOYW1lOiBwcm9wcy5ncm91cE5hbWUsXHJcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHByb3BzLmdyb3VwTmFtZS50cmltKCkgIT09ICcnLFxyXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0cyxcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCA9ICgpID0+ICcwJztcclxuXHJcbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhbXAgPSBPYmplY3RcclxuICAgICAgLmtleXModGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cylcclxuICAgICAgLm1hcChpID0+IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHNbaV0uZ2V0TGFzdFVwZGF0ZVN0YW1wKCkpXHJcbiAgICAgIC5qb2luKCctJyk7XHJcblxyXG4gICAgcmV0dXJuIHN0YW1wO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBOYW1lID0gKGhhc2hMaXN0KSA9PiB7XHJcbiAgICBjb25zdCB7IGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiBjYWxjdWxhdGVHcm91cE5hbWUoZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyLCBoYXNoTGlzdCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbGlzdHNIYXNoQXJyYXkgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xyXG4gICAgY29uc3QgdGFic0l0ZW1zID0gW3tcclxuICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI6IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLFxyXG4gICAgfV07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlld1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYnNcIj5cclxuICAgICAgICAgIDxWaWV3VGFic1xyXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgICAgICAgaXRlbXM9e3RhYnNJdGVtc31cclxuICAgICAgICAgICAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAgICAgICBvbkNoZWNrTGlzdENoYW5nZT17dGhpcy5jaGVja0xpc3RDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgICBoaWRlU2luZ2xlVGFiXHJcbiAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1jb250YWluZXJcIj5cclxuICAgICAgICAgIHshdGhpcy5wcm9wcy5zdGFuZGFsb25lICYmXHJcbiAgICAgICAgICA8R3JvdXBOYW1lXHJcbiAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLmdyb3VwTmFtZUxhYmVsfVxyXG4gICAgICAgICAgICBwbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5ncm91cE5hbWVQbGFjZUhvbGRlcn1cclxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlPXt0aGlzLnN0YXRlLmdyb3VwTmFtZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlcn1cclxuICAgICAgICAgIC8+fVxyXG4gICAgICAgICAgPFNlbGVjdGVkSXRlbXNcclxuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XHJcbiAgICAgICAgICAgIGxpc3RMYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1MaXN0TGFiZWx9XHJcbiAgICAgICAgICAgIGNoZWNrZWRJdGVtTGlzdHM9e09iamVjdC5rZXlzKGxpc3RzSGFzaEFycmF5KS5tYXAoaSA9PiBsaXN0c0hhc2hBcnJheVtpXSl9XHJcbiAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgICAgICAgb25JdGVtUmVtb3ZlPXt0aGlzLml0ZW1SZW1vdmVIYW5kbGVyfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FuU2VsZWN0U3RhdHVzID0gKGdyb3VwTmFtZSwgbGlzdHMpID0+IHtcclxuICAgIGNvbnN0IGlzR3JvdXBOYW1lID0gU3RyaW5nKGdyb3VwTmFtZSkudHJpbSgpICE9PSAnJztcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBPYmplY3Qua2V5cyhsaXN0cykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGNvdW50ICs9IGxpc3RzW2tleV0uZ2V0Q2hlY2tlZEl0ZW1zQ291bnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpc0dyb3VwTmFtZSAmJiBjb3VudCA+IDA7XHJcbiAgfVxyXG5cclxuICBnZXRDaGVja2VkT3V0cHV0ID0gKCkgPT4ge1xyXG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKTtcclxuICAgIGlmICghY2hlY2tlZEl0ZW1IYXNoTGlzdCkgcmV0dXJuIFtdO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRPdXRwdXQoKTtcclxuICAgIGNvbnN0IHJlc3VsdExpc3QgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdExpc3Q7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XHJcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xyXG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XHJcblxyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRBbGxDaGVja2VkSXRlbXMoKTtcclxuXHJcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSAoZGF0YVNvdXJjZVByb3ZpZGVyKSA9PiB7XHJcbiAgICBjb25zdCBsaXN0SGFzaCA9IHt9O1xyXG5cclxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5wcmVDaGVja0l0ZW1zKCk7XHJcbiAgICBsaXN0SGFzaFtkYXRhU291cmNlUHJvdmlkZXIuaWRdID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuXHJcbiAgICByZXR1cm4gbGlzdEhhc2g7XHJcbiAgfVxyXG5cclxuICBncm91cE5hbWVDaGFuZ2VIYW5kbGVyID0gKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhuZXdWYWx1ZSwgdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyksXHJcbiAgICAgIGdyb3VwTmFtZTogbmV3VmFsdWUsXHJcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHRydWUsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZ3JvdXBOYW1lLnRyaW0oKSA9PT0gJycpIHRocm93IG5ldyBFcnJvcignU3RhdGUgZ3JvdXBOYW1lIGlzIGVtcHR5Jyk7XHJcblxyXG4gICAgY29uc3QgYWxsQ2hlY2tlZEl0ZW1zID0gdGhpcy5nZXRBbGxDaGVja2VkSXRlbXMoKTtcclxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcclxuXHJcbiAgICB0aGlzLnByb3BzXHJcbiAgICAgIC5vblNlbGVjdCh0aGlzLnN0YXRlLmdyb3VwTmFtZSwgYWxsQ2hlY2tlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KTtcclxuICB9XHJcblxyXG4gIGNoZWNrTGlzdENoYW5nZUhhbmRsZXIgPSAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkgPT4ge1xyXG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3QpIHtcclxuICAgICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xyXG4gICAgICBsaXN0c1tjaGVja2VkSXRlbUhhc2hMaXN0LmdldElkKCldID0gY2hlY2tlZEl0ZW1IYXNoTGlzdDtcclxuICAgICAgLyogR2V0dGluZyBncm91cCBuYW1lIGFmdGVyIGxpc3RzIGNoYW5naW5nICovXHJcbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxyXG4gICAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzOiBsaXN0cyxcclxuICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBpdGVtUmVtb3ZlSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcclxuICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXHJcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBhZnRlckNoZWNrTGlzdENoYW5nZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gdGhpcy5nZXRDaGVja2VkT3V0cHV0KCk7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlZChyZXN1bHRMaXN0KTtcclxuICB9XHJcblxyXG4gIHNob3cgPSAoKSA9PiB0aGlzLmdldENvbnRlbnQoKTtcclxuXHJcbiAgc2hvd0luTW9kYWwgPSAoKSA9PiAoXHJcbiAgICA8TW9kYWxcclxuICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXctZGlhbG9nXCJcclxuICAgICAgc2hvdz17dGhpcy5zdGF0ZS52aXNpYmxlfVxyXG4gICAgICBvbkhpZGU9e3RoaXMuY2FuY2VsSGFuZGxlcn1cclxuICAgICAga2V5Ym9hcmQ9e2ZhbHNlfVxyXG4gICAgICBiYWNrZHJvcD1cInN0YXRpY1wiXHJcbiAgICA+XHJcbiAgICAgIDxNb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPFZpZXdUb3BCYXJcclxuICAgICAgICAgIHNlbGVjdERpc2FibGVkPXshdGhpcy5zdGF0ZS5jYW5TZWxlY3R9XHJcbiAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX1cclxuICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLmNhbmNlbEhhbmRsZXJ9XHJcbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5zZWxlY3RIYW5kbGVyfVxyXG4gICAgICAgICAgYnRuU2VsZWN0TGFiZWw9e3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XHJcbiAgICAgICAgICBidG5DYW5jZWxMYWJlbD17dGhpcy5wcm9wcy5idG5DYW5jZWxMYWJlbH1cclxuICAgICAgICAvPlxyXG4gICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAge3RoaXMuZ2V0Q29udGVudCgpfVxyXG4gICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICA8L01vZGFsPlxyXG4gICk7XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLnNob3dJbk1vZGFsICYmICF0aGlzLnByb3BzLnN0YW5kYWxvbmUgPyB0aGlzLnNob3dJbk1vZGFsKCkgOiB0aGlzLnNob3coKTtcclxuICB9XHJcbn1cclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5wcm9wVHlwZXMgPSB7XHJcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXHJcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIHNob3dJbk1vZGFsOiBQcm9wVHlwZXMuYm9vbCxcclxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgZ3JvdXBOYW1lTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBzdGFuZGFsb25lOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25DYW5jZWw6ICgpID0+IHt9LFxyXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogKCkgPT4ge30sXHJcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxyXG4gIHNob3dJbk1vZGFsOiB0cnVlLFxyXG4gIGFsbExhYmVsOiAnQWxsJyxcclxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXHJcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxyXG4gIGdyb3VwTmFtZTogJycsXHJcbiAgZ3JvdXBOYW1lTGFiZWw6ICdHcm91cCBuYW1lJyxcclxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogJ1BsZWFzZSwgZmlsbCBhIGdyb3VwIG5hbWUnLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXHJcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgc3RhbmRhbG9uZTogZmFsc2UsXHJcbiAgdGl0bGU6ICcnLFxyXG59O1xyXG4iXX0=