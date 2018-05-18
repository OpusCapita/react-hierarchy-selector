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
            onHelp: _this.props.onHelp,
            btnSelectLabel: _this.props.btnSelectLabel,
            btnCancelLabel: _this.props.btnCancelLabel,
            helpDisabled: _this.props.helpDisabled
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
  onHelp: function onHelp() {},
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
  title: '',
  helpDisabled: true
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInN0YW5kYWxvbmUiLCJncm91cE5hbWVMYWJlbCIsImdyb3VwTmFtZVBsYWNlSG9sZGVyIiwiZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciIsInNlbGVjdGVkSXRlbUxpc3RMYWJlbCIsInNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUhhbmRsZXIiLCJnZXRDYW5TZWxlY3RTdGF0dXMiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsIkVycm9yIiwiYWxsQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3QiLCJnZXRJZCIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJhZnRlckNoZWNrTGlzdENoYW5nZWQiLCJvbkNoZWNrTGlzdENoYW5nZWQiLCJzaG93Iiwic2hvd0luTW9kYWwiLCJ2aXNpYmxlIiwib25IZWxwIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsImhlbHBEaXNhYmxlZCIsInNldFByZWNoZWNrZWRJdGVtcyIsInByZUNoZWNrZWRJdGVtcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7K2VBZEE7O0FBaUJBLFNBQVNBLDJCQUFULENBQXFDQyxLQUFyQyxFQUE0QztBQUMxQyxNQUFNQyxpQkFBaUJDLE9BQU9DLElBQVAsQ0FBWUgsS0FBWixDQUF2Qjs7QUFFQSxNQUFJQyxlQUFlRyxNQUFmLEtBQTBCLENBQTlCLEVBQWlDLE9BQU8sSUFBUDs7QUFFakMsU0FBT0osTUFBTUMsZUFBZSxDQUFmLENBQU4sQ0FBUDtBQUNEOztJQUVvQkkscUI7OztBQUNuQixpQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWdCbkJDLHlCQWhCbUIsR0FnQlM7QUFBQSxhQUFNLEdBQU47QUFBQSxLQWhCVDs7QUFBQSxVQWtCbkJDLGtCQWxCbUIsR0FrQkUsWUFBTTtBQUN6QixVQUFNQyxRQUFRUCxPQUNYQyxJQURXLENB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QUFTO0FBTkUsS0FBYjtBQU5pQjtBQWNsQjs7a0NBb0xETyxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLdkUsS0FBTCxDQUFXK0QsV0FBWCxJQUEwQixDQUFDLEtBQUsvRCxLQUFMLENBQVdzQixVQUF0QyxHQUFtRCxLQUFLeUMsV0FBTCxFQUFuRCxHQUF3RSxLQUFLRCxJQUFMLEVBQS9FO0FBQ0QsRzs7O0VBck1nRCxnQkFBTVUsYTs7a0JBQXBDekUscUI7OztBQStOckJBLHNCQUFzQjBFLFlBQXRCLEdBQXFDO0FBQ25DcEIsWUFBVSxvQkFBTSxDQUFFLENBRGlCO0FBRW5DUSxzQkFBb0IsOEJBQU0sQ0FBRSxDQUZPO0FBR25DSixZQUFVLG9CQUFNLENBQUUsQ0FIaUI7QUFJbkNRLFVBQVEsa0JBQU0sQ0FBRSxDQUptQjtBQUtuQ0YsZUFBYSxJQUxzQjtBQU1uQzdDLFlBQVUsS0FOeUI7QUFPbkNnRCxrQkFBZ0IsUUFQbUI7QUFRbkNDLGtCQUFnQixRQVJtQjtBQVNuQ3hELGFBQVcsRUFUd0I7QUFVbkNZLGtCQUFnQixZQVZtQjtBQVduQ0Msd0JBQXNCLDJCQVhhO0FBWW5DTCwwQkFBd0IsSUFaVztBQWFuQ21ELG1CQUFpQixJQWJrQjtBQWNuQ2pELHFCQUFtQixXQWRnQjtBQWVuQ0sseUJBQXVCLGdCQWZZO0FBZ0JuQ0MsOEJBQTRCLElBaEJPO0FBaUJuQ0wsY0FBWSxLQWpCdUI7QUFrQm5DTixTQUFPLEVBbEI0QjtBQW1CbkNvRCxnQkFBYztBQW5CcUIsQ0FBckMiLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCBWaWV3VG9wQmFyIGZyb20gJy4vdG9wLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IFZpZXdUYWJzIGZyb20gJy4vdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IFNlbGVjdGVkSXRlbXMgZnJvbSAnLi9zZWxlY3RlZC1pdGVtcyc7XG5pbXBvcnQgR3JvdXBOYW1lIGZyb20gJy4vZ3JvdXAtbmFtZSc7XG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IGNhbGN1bGF0ZUdyb3VwTmFtZSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ncm91cC1uYW1lLWNhbGN1bGF0aW9uJztcblxuaW1wb3J0ICcuL3ZpZXcuc2Nzcyc7XG5cblxuZnVuY3Rpb24gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KGxpc3RzKSB7XG4gIGNvbnN0IGRhdGFTb3VyY2VLZXlzID0gT2JqZWN0LmtleXMobGlzdHMpO1xuXG4gIGlmIChkYXRhU291cmNlS2V5cy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBsaXN0c1tkYXRhU291cmNlS2V5c1swXV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJvcHMucHJlQ2hlY2tlZEl0ZW1zKTtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0cyA9IHRoaXMuY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMocHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKHByb3BzLmdyb3VwTmFtZSwgY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxuICAgICAgZ3JvdXBOYW1lOiBwcm9wcy5ncm91cE5hbWUsXG4gICAgICBncm91cE5hbWVDaGFuZ2VkQnlVc2VyOiBwcm9wcy5ncm91cE5hbWUudHJpbSgpICE9PSAnJyxcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzLFxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4gJzAnO1xuXG4gIGdldExhc3RVcGRhdGVTdGFtcCA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFtcCA9IE9iamVjdFxuICAgICAgLmtleXModGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cylcbiAgICAgIC5tYXAoaSA9PiB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzW2ldLmdldExhc3RVcGRhdGVTdGFtcCgpKVxuICAgICAgLmpvaW4oJy0nKTtcblxuICAgIHJldHVybiBzdGFtcDtcbiAgfVxuXG4gIGdldEdyb3VwTmFtZSA9IChoYXNoTGlzdCkgPT4ge1xuICAgIGNvbnN0IHsgZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiBjYWxjdWxhdGVHcm91cE5hbWUoZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyLCBoYXNoTGlzdCk7XG4gIH1cblxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RzSGFzaEFycmF5ID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICBjb25zdCB0YWJzSXRlbXMgPSBbe1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyOiB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcixcbiAgICB9XTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYnNcIj5cbiAgICAgICAgICA8Vmlld1RhYnNcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgaXRlbXM9e3RhYnNJdGVtc31cbiAgICAgICAgICAgIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlPXt0aGlzLmNoZWNrTGlzdENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICBoaWRlU2luZ2xlVGFiXG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VsZWN0ZWQtY29udGFpbmVyXCI+XG4gICAgICAgICAgeyF0aGlzLnByb3BzLnN0YW5kYWxvbmUgJiZcbiAgICAgICAgICA8R3JvdXBOYW1lXG4gICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5ncm91cE5hbWVMYWJlbH1cbiAgICAgICAgICAgIHBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLmdyb3VwTmFtZVBsYWNlSG9sZGVyfVxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlPXt0aGlzLnN0YXRlLmdyb3VwTmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmdyb3VwTmFtZUNoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgLz59XG4gICAgICAgICAgPFNlbGVjdGVkSXRlbXNcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgbGlzdExhYmVsPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbUxpc3RMYWJlbH1cbiAgICAgICAgICAgIGNoZWNrZWRJdGVtTGlzdHM9e09iamVjdC5rZXlzKGxpc3RzSGFzaEFycmF5KS5tYXAoaSA9PiBsaXN0c0hhc2hBcnJheVtpXSl9XG4gICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICBvbkl0ZW1SZW1vdmU9e3RoaXMuaXRlbVJlbW92ZUhhbmRsZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgZ2V0Q2FuU2VsZWN0U3RhdHVzID0gKGdyb3VwTmFtZSwgbGlzdHMpID0+IHtcbiAgICBjb25zdCBpc0dyb3VwTmFtZSA9IFN0cmluZyhncm91cE5hbWUpLnRyaW0oKSAhPT0gJyc7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBPYmplY3Qua2V5cyhsaXN0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb3VudCArPSBsaXN0c1trZXldLmdldENoZWNrZWRJdGVtc0NvdW50KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaXNHcm91cE5hbWUgJiYgY291bnQgPiAwO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZE91dHB1dCA9ICgpID0+IHtcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKTtcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgcmV0dXJuIHJlc3VsdExpc3Q7XG4gIH1cblxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldEFsbENoZWNrZWRJdGVtcygpO1xuXG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtcztcbiAgfVxuXG4gIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzID0gKGRhdGFTb3VyY2VQcm92aWRlcikgPT4ge1xuICAgIGNvbnN0IGxpc3RIYXNoID0ge307XG5cbiAgICBkYXRhU291cmNlUHJvdmlkZXIucHJlQ2hlY2tJdGVtcygpO1xuICAgIGxpc3RIYXNoW2RhdGFTb3VyY2VQcm92aWRlci5pZF0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuXG4gICAgcmV0dXJuIGxpc3RIYXNoO1xuICB9XG5cbiAgZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciA9IChuZXdWYWx1ZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhuZXdWYWx1ZSwgdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyksXG4gICAgICBncm91cE5hbWU6IG5ld1ZhbHVlLFxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9XG5cbiAgc2VsZWN0SGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5ncm91cE5hbWUudHJpbSgpID09PSAnJykgdGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBncm91cE5hbWUgaXMgZW1wdHknKTtcblxuICAgIGNvbnN0IGFsbENoZWNrZWRJdGVtcyA9IHRoaXMuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuXG4gICAgdGhpcy5wcm9wc1xuICAgICAgLm9uU2VsZWN0KHRoaXMuc3RhdGUuZ3JvdXBOYW1lLCBhbGxDaGVja2VkSXRlbXMsIGNoZWNrZWRPdXRwdXQpO1xuICB9XG5cbiAgY2hlY2tMaXN0Q2hhbmdlSGFuZGxlciA9IChjaGVja2VkSXRlbUhhc2hMaXN0KSA9PiB7XG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3QpIHtcbiAgICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICAgIGxpc3RzW2NoZWNrZWRJdGVtSGFzaExpc3QuZ2V0SWQoKV0gPSBjaGVja2VkSXRlbUhhc2hMaXN0O1xuICAgICAgLyogR2V0dGluZyBncm91cCBuYW1lIGFmdGVyIGxpc3RzIGNoYW5naW5nICovXG4gICAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBncm91cE5hbWUsXG4gICAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXG4gICAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzOiBsaXN0cyxcbiAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xuICB9XG5cbiAgaXRlbVJlbW92ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xuICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgIH0pO1xuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XG4gIH1cblxuICBhZnRlckNoZWNrTGlzdENoYW5nZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2VkKHJlc3VsdExpc3QpO1xuICB9XG5cbiAgc2hvdyA9ICgpID0+IHRoaXMuZ2V0Q29udGVudCgpO1xuXG4gIHNob3dJbk1vZGFsID0gKCkgPT4gKFxuICAgIDxNb2RhbFxuICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXctZGlhbG9nXCJcbiAgICAgIHNob3c9e3RoaXMuc3RhdGUudmlzaWJsZX1cbiAgICAgIG9uSGlkZT17dGhpcy5jYW5jZWxIYW5kbGVyfVxuICAgICAga2V5Ym9hcmQ9e2ZhbHNlfVxuICAgICAgYmFja2Ryb3A9XCJzdGF0aWNcIlxuICAgID5cbiAgICAgIDxNb2RhbC5IZWFkZXI+XG4gICAgICAgIDxWaWV3VG9wQmFyXG4gICAgICAgICAgc2VsZWN0RGlzYWJsZWQ9eyF0aGlzLnN0YXRlLmNhblNlbGVjdH1cbiAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICBvbkNhbmNlbD17dGhpcy5jYW5jZWxIYW5kbGVyfVxuICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdEhhbmRsZXJ9XG4gICAgICAgICAgb25IZWxwPXt0aGlzLnByb3BzLm9uSGVscH1cbiAgICAgICAgICBidG5TZWxlY3RMYWJlbD17dGhpcy5wcm9wcy5idG5TZWxlY3RMYWJlbH1cbiAgICAgICAgICBidG5DYW5jZWxMYWJlbD17dGhpcy5wcm9wcy5idG5DYW5jZWxMYWJlbH1cbiAgICAgICAgICBoZWxwRGlzYWJsZWQ9e3RoaXMucHJvcHMuaGVscERpc2FibGVkfVxuICAgICAgICAvPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAge3RoaXMuZ2V0Q29udGVudCgpfVxuICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgIDwvTW9kYWw+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnNob3dJbk1vZGFsICYmICF0aGlzLnByb3BzLnN0YW5kYWxvbmUgPyB0aGlzLnNob3dJbk1vZGFsKCkgOiB0aGlzLnNob3coKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNoZWNrTGlzdENoYW5nZWQ6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dJbk1vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgdGl0bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuQ2FuY2VsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZ3JvdXBOYW1lTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgc3RhbmRhbG9uZTogUHJvcFR5cGVzLmJvb2wsXG4gIGhlbHBEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcuZGVmYXVsdFByb3BzID0ge1xuICBvbkNhbmNlbDogKCkgPT4ge30sXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25IZWxwOiAoKSA9PiB7fSxcbiAgc2hvd0luTW9kYWw6IHRydWUsXG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXG4gIGdyb3VwTmFtZTogJycsXG4gIGdyb3VwTmFtZUxhYmVsOiAnR3JvdXAgbmFtZScsXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiAnUGxlYXNlLCBmaWxsIGEgZ3JvdXAgbmFtZScsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzdGFuZGFsb25lOiBmYWxzZSxcbiAgdGl0bGU6ICcnLFxuICBoZWxwRGlzYWJsZWQ6IHRydWUsXG59O1xuIl19