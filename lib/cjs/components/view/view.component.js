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
            searchPlaceHolder: _this.props.searchPlaceHolder,
            searchTooltip: _this.props.searchTooltip
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'oc-hierarchy-selector-selected-container' },
          !_this.props.standalone && !_this.props.hideGroupNameInput && _react2.default.createElement(_groupName2.default, {
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
      var isClearable = _this.props.isClearable;

      var isGroupName = String(groupName).trim() !== '';
      var count = 0;
      Object.keys(lists).forEach(function (key) {
        count += lists[key].getCheckedItemsCount();
      });

      if (isClearable && count === 0) {
        return true;
      }

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

    _this.selectHandler = function (flags) {
      var onSelect = _this.props.onSelect;
      var groupName = _this.state.groupName;


      var allCheckedItems = _this.getAllCheckedItems();
      var checkedOutput = _this.getCheckedOutput();

      // If there's selected items, groupName can't be empty
      if (allCheckedItems && allCheckedItems.length > 0 && groupName.trim() === '') {
        throw new Error('State groupName is empty');
      }

      onSelect(groupName, allCheckedItems, checkedOutput, flags);
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
  searchTooltip: null,
  selectedItemListLabel: 'Selected items',
  selectedItemRenderFunction: null,
  standalone: false,
  title: '',
  helpDisabled: true,
  hideGroupNameInput: false,
  isClearable: false
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJzdGFuZGFsb25lIiwiaGlkZUdyb3VwTmFtZUlucHV0IiwiZ3JvdXBOYW1lTGFiZWwiLCJncm91cE5hbWVQbGFjZUhvbGRlciIsImdyb3VwTmFtZUNoYW5nZUhhbmRsZXIiLCJzZWxlY3RlZEl0ZW1MaXN0TGFiZWwiLCJzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW1vdmVIYW5kbGVyIiwiZ2V0Q2FuU2VsZWN0U3RhdHVzIiwiaXNDbGVhcmFibGUiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsImZsYWdzIiwib25TZWxlY3QiLCJhbGxDaGVja2VkSXRlbXMiLCJFcnJvciIsImdldElkIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsImFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCIsIm9uQ2hlY2tMaXN0Q2hhbmdlZCIsInNob3ciLCJzaG93SW5Nb2RhbCIsInZpc2libGUiLCJvbkhlbHAiLCJidG5TZWxlY3RMYWJlbCIsImJ0bkNhbmNlbExhYmVsIiwiaGVscERpc2FibGVkIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwicHJlQ2hlY2tlZEl0ZW1zIiwicmVuZGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7OytlQWRBOztBQWlCQSxTQUFTQSwyQkFBVCxDQUFxQ0MsS0FBckMsRUFBNEM7QUFDMUMsTUFBTUMsaUJBQWlCQyxPQUFPQyxJQUFQLENBQVlILEtBQVosQ0FBdkI7O0FBRUEsTUFBSUMsZUFBZUcsTUFBZixLQUEwQixDQUE5QixFQUFpQyxPQUFPLElBQVA7O0FBRWpDLFNBQU9KLE1BQU1DLGVBQWUsQ0FBZixDQUFOLENBQVA7QUFDRDs7SUFFb0JJLHFCOzs7QUFDbkIsaUNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFnQm5CQyx5QkFoQm1CLEdBZ0JTO0FBQUEsYUFBTSxHQUFOO0FBQUEsS0Fo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Q0Msd0JBQXNCLDJCQVhhO0FBWW5DUCwwQkFBd0IsSUFaVztBQWFuQ3VELG1CQUFpQixJQWJrQjtBQWNuQ3JELHFCQUFtQixXQWRnQjtBQWVuQ0MsaUJBQWUsSUFmb0I7QUFnQm5DTSx5QkFBdUIsZ0JBaEJZO0FBaUJuQ0MsOEJBQTRCLElBakJPO0FBa0JuQ04sY0FBWSxLQWxCdUI7QUFtQm5DUCxTQUFPLEVBbkI0QjtBQW9CbkN3RCxnQkFBYyxJQXBCcUI7QUFxQm5DaEQsc0JBQW9CLEtBckJlO0FBc0JuQ1EsZUFBYTtBQXRCc0IsQ0FBckMiLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCBWaWV3VG9wQmFyIGZyb20gJy4vdG9wLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IFZpZXdUYWJzIGZyb20gJy4vdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IFNlbGVjdGVkSXRlbXMgZnJvbSAnLi9zZWxlY3RlZC1pdGVtcyc7XG5pbXBvcnQgR3JvdXBOYW1lIGZyb20gJy4vZ3JvdXAtbmFtZSc7XG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IGNhbGN1bGF0ZUdyb3VwTmFtZSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ncm91cC1uYW1lLWNhbGN1bGF0aW9uJztcblxuaW1wb3J0ICcuL3ZpZXcuc2Nzcyc7XG5cblxuZnVuY3Rpb24gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KGxpc3RzKSB7XG4gIGNvbnN0IGRhdGFTb3VyY2VLZXlzID0gT2JqZWN0LmtleXMobGlzdHMpO1xuXG4gIGlmIChkYXRhU291cmNlS2V5cy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBsaXN0c1tkYXRhU291cmNlS2V5c1swXV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJvcHMucHJlQ2hlY2tlZEl0ZW1zKTtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0cyA9IHRoaXMuY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMocHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKHByb3BzLmdyb3VwTmFtZSwgY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxuICAgICAgZ3JvdXBOYW1lOiBwcm9wcy5ncm91cE5hbWUsXG4gICAgICBncm91cE5hbWVDaGFuZ2VkQnlVc2VyOiBwcm9wcy5ncm91cE5hbWUudHJpbSgpICE9PSAnJyxcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzLFxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4gJzAnO1xuXG4gIGdldExhc3RVcGRhdGVTdGFtcCA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFtcCA9IE9iamVjdFxuICAgICAgLmtleXModGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cylcbiAgICAgIC5tYXAoaSA9PiB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzW2ldLmdldExhc3RVcGRhdGVTdGFtcCgpKVxuICAgICAgLmpvaW4oJy0nKTtcblxuICAgIHJldHVybiBzdGFtcDtcbiAgfVxuXG4gIGdldEdyb3VwTmFtZSA9IChoYXNoTGlzdCkgPT4ge1xuICAgIGNvbnN0IHsgZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiBjYWxjdWxhdGVHcm91cE5hbWUoZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyLCBoYXNoTGlzdCk7XG4gIH1cblxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RzSGFzaEFycmF5ID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICBjb25zdCB0YWJzSXRlbXMgPSBbe1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyOiB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcixcbiAgICB9XTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYnNcIj5cbiAgICAgICAgICA8Vmlld1RhYnNcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgaXRlbXM9e3RhYnNJdGVtc31cbiAgICAgICAgICAgIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlPXt0aGlzLmNoZWNrTGlzdENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICBoaWRlU2luZ2xlVGFiXG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cbiAgICAgICAgICAgIHNlYXJjaFRvb2x0aXA9e3RoaXMucHJvcHMuc2VhcmNoVG9vbHRpcH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VsZWN0ZWQtY29udGFpbmVyXCI+XG4gICAgICAgICAgeyghdGhpcy5wcm9wcy5zdGFuZGFsb25lICYmICF0aGlzLnByb3BzLmhpZGVHcm91cE5hbWVJbnB1dCkgJiZcbiAgICAgICAgICA8R3JvdXBOYW1lXG4gICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5ncm91cE5hbWVMYWJlbH1cbiAgICAgICAgICAgIHBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLmdyb3VwTmFtZVBsYWNlSG9sZGVyfVxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlPXt0aGlzLnN0YXRlLmdyb3VwTmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmdyb3VwTmFtZUNoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgLz59XG4gICAgICAgICAgPFNlbGVjdGVkSXRlbXNcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgbGlzdExhYmVsPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbUxpc3RMYWJlbH1cbiAgICAgICAgICAgIGNoZWNrZWRJdGVtTGlzdHM9e09iamVjdC5rZXlzKGxpc3RzSGFzaEFycmF5KS5tYXAoaSA9PiBsaXN0c0hhc2hBcnJheVtpXSl9XG4gICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICBvbkl0ZW1SZW1vdmU9e3RoaXMuaXRlbVJlbW92ZUhhbmRsZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgZ2V0Q2FuU2VsZWN0U3RhdHVzID0gKGdyb3VwTmFtZSwgbGlzdHMpID0+IHtcbiAgICBjb25zdCB7IGlzQ2xlYXJhYmxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzR3JvdXBOYW1lID0gU3RyaW5nKGdyb3VwTmFtZSkudHJpbSgpICE9PSAnJztcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIE9iamVjdC5rZXlzKGxpc3RzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvdW50ICs9IGxpc3RzW2tleV0uZ2V0Q2hlY2tlZEl0ZW1zQ291bnQoKTtcbiAgICB9KTtcblxuICAgIGlmIChpc0NsZWFyYWJsZSAmJiBjb3VudCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzR3JvdXBOYW1lICYmIGNvdW50ID4gMDtcbiAgfVxuXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcblxuICAgIHJldHVybiByZXN1bHRMaXN0O1xuICB9XG5cbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xuICAgIGlmICghY2hlY2tlZEl0ZW1IYXNoTGlzdCkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRBbGxDaGVja2VkSXRlbXMoKTtcblxuICAgIHJldHVybiBjaGVja2VkSXRlbXM7XG4gIH1cblxuICBjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyA9IChkYXRhU291cmNlUHJvdmlkZXIpID0+IHtcbiAgICBjb25zdCBsaXN0SGFzaCA9IHt9O1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnByZUNoZWNrSXRlbXMoKTtcbiAgICBsaXN0SGFzaFtkYXRhU291cmNlUHJvdmlkZXIuaWRdID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcblxuICAgIHJldHVybiBsaXN0SGFzaDtcbiAgfVxuXG4gIGdyb3VwTmFtZUNoYW5nZUhhbmRsZXIgPSAobmV3VmFsdWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMobmV3VmFsdWUsIHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxuICAgICAgZ3JvdXBOYW1lOiBuZXdWYWx1ZSxcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBjYW5jZWxIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfVxuXG4gIHNlbGVjdEhhbmRsZXIgPSAoZmxhZ3MpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZ3JvdXBOYW1lIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgYWxsQ2hlY2tlZEl0ZW1zID0gdGhpcy5nZXRBbGxDaGVja2VkSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gdGhpcy5nZXRDaGVja2VkT3V0cHV0KCk7XG5cbiAgICAvLyBJZiB0aGVyZSdzIHNlbGVjdGVkIGl0ZW1zLCBncm91cE5hbWUgY2FuJ3QgYmUgZW1wdHlcbiAgICBpZiAoYWxsQ2hlY2tlZEl0ZW1zICYmIGFsbENoZWNrZWRJdGVtcy5sZW5ndGggPiAwICYmIGdyb3VwTmFtZS50cmltKCkgPT09ICcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIGdyb3VwTmFtZSBpcyBlbXB0eScpO1xuICAgIH1cblxuICAgIG9uU2VsZWN0KGdyb3VwTmFtZSwgYWxsQ2hlY2tlZEl0ZW1zLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBjaGVja0xpc3RDaGFuZ2VIYW5kbGVyID0gKGNoZWNrZWRJdGVtSGFzaExpc3QpID0+IHtcbiAgICBpZiAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkge1xuICAgICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xuICAgICAgbGlzdHNbY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRJZCgpXSA9IGNoZWNrZWRJdGVtSGFzaExpc3Q7XG4gICAgICAvKiBHZXR0aW5nIGdyb3VwIG5hbWUgYWZ0ZXIgbGlzdHMgY2hhbmdpbmcgKi9cbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhncm91cE5hbWUsIGxpc3RzKSxcbiAgICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHM6IGxpc3RzLFxuICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XG4gIH1cblxuICBpdGVtUmVtb3ZlSGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZ3JvdXBOYW1lLFxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhncm91cE5hbWUsIGxpc3RzKSxcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgfSk7XG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcbiAgfVxuXG4gIGFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCA9ICgpID0+IHtcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gdGhpcy5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZWQocmVzdWx0TGlzdCk7XG4gIH1cblxuICBzaG93ID0gKCkgPT4gdGhpcy5nZXRDb250ZW50KCk7XG5cbiAgc2hvd0luTW9kYWwgPSAoKSA9PiAoXG4gICAgPE1vZGFsXG4gICAgICBkaWFsb2dDbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlldy1kaWFsb2dcIlxuICAgICAgc2hvdz17dGhpcy5zdGF0ZS52aXNpYmxlfVxuICAgICAgb25IaWRlPXt0aGlzLmNhbmNlbEhhbmRsZXJ9XG4gICAgICBrZXlib2FyZD17ZmFsc2V9XG4gICAgICBiYWNrZHJvcD1cInN0YXRpY1wiXG4gICAgPlxuICAgICAgPE1vZGFsLkhlYWRlcj5cbiAgICAgICAgPFZpZXdUb3BCYXJcbiAgICAgICAgICBzZWxlY3REaXNhYmxlZD17IXRoaXMuc3RhdGUuY2FuU2VsZWN0fVxuICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfVxuICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLmNhbmNlbEhhbmRsZXJ9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMuc2VsZWN0SGFuZGxlcn1cbiAgICAgICAgICBvbkhlbHA9e3RoaXMucHJvcHMub25IZWxwfVxuICAgICAgICAgIGJ0blNlbGVjdExhYmVsPXt0aGlzLnByb3BzLmJ0blNlbGVjdExhYmVsfVxuICAgICAgICAgIGJ0bkNhbmNlbExhYmVsPXt0aGlzLnByb3BzLmJ0bkNhbmNlbExhYmVsfVxuICAgICAgICAgIGhlbHBEaXNhYmxlZD17dGhpcy5wcm9wcy5oZWxwRGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICB7dGhpcy5nZXRDb250ZW50KCl9XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgPC9Nb2RhbD5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvd0luTW9kYWwgJiYgIXRoaXMucHJvcHMuc3RhbmRhbG9uZSA/IHRoaXMuc2hvd0luTW9kYWwoKSA6IHRoaXMuc2hvdygpO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2hvd0luTW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBncm91cE5hbWVMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gIHNlbGVjdGVkSXRlbUxpc3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBzdGFuZGFsb25lOiBQcm9wVHlwZXMuYm9vbCxcbiAgaGVscERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgaGlkZUdyb3VwTmFtZUlucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNDbGVhcmFibGU6IFByb3BUeXBlcy5ib29sLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25DYW5jZWw6ICgpID0+IHt9LFxuICBvbkNoZWNrTGlzdENoYW5nZWQ6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uSGVscDogKCkgPT4ge30sXG4gIHNob3dJbk1vZGFsOiB0cnVlLFxuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGJ0blNlbGVjdExhYmVsOiAnU2VsZWN0JyxcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxuICBncm91cE5hbWU6ICcnLFxuICBncm91cE5hbWVMYWJlbDogJ0dyb3VwIG5hbWUnLFxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogJ1BsZWFzZSwgZmlsbCBhIGdyb3VwIG5hbWUnLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBwcmVDaGVja2VkSXRlbXM6IG51bGwsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiAnU2VsZWN0ZWQgaXRlbXMnLFxuICBzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc3RhbmRhbG9uZTogZmFsc2UsXG4gIHRpdGxlOiAnJyxcbiAgaGVscERpc2FibGVkOiB0cnVlLFxuICBoaWRlR3JvdXBOYW1lSW5wdXQ6IGZhbHNlLFxuICBpc0NsZWFyYWJsZTogZmFsc2UsXG59O1xuIl19