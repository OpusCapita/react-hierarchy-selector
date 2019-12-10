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
      if (_this.props.isClearable) {
        return true;
      }
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

    _this.selectHandler = function (flags) {
      if (_this.state.groupName.trim() === '') throw new Error('State groupName is empty');

      var allCheckedItems = _this.getAllCheckedItems();
      var checkedOutput = _this.getCheckedOutput();

      _this.props.onSelect(_this.state.groupName, allCheckedItems, checkedOutput, flags);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJzdGFuZGFsb25lIiwiaGlkZUdyb3VwTmFtZUlucHV0IiwiZ3JvdXBOYW1lTGFiZWwiLCJncm91cE5hbWVQbGFjZUhvbGRlciIsImdyb3VwTmFtZUNoYW5nZUhhbmRsZXIiLCJzZWxlY3RlZEl0ZW1MaXN0TGFiZWwiLCJzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW1vdmVIYW5kbGVyIiwiZ2V0Q2FuU2VsZWN0U3RhdHVzIiwiaXNDbGVhcmFibGUiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsImZsYWdzIiwiRXJyb3IiLCJhbGxDaGVja2VkSXRlbXMiLCJvblNlbGVjdCIsImdldElkIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsImFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCIsIm9uQ2hlY2tMaXN0Q2hhbmdlZCIsInNob3ciLCJzaG93SW5Nb2RhbCIsInZpc2libGUiLCJvbkhlbHAiLCJidG5TZWxlY3RMYWJlbCIsImJ0bkNhbmNlbExhYmVsIiwiaGVscERpc2FibGVkIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwicHJlQ2hlY2tlZEl0ZW1zIiwicmVuZGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7OytlQWRBOztBQWlCQSxTQUFTQSwyQkFBVCxDQUFxQ0MsS0FBckMsRUFBNEM7QUFDMUMsTUFBTUMsaUJBQWlCQyxPQUFPQyxJQUFQLENBQVlILEtBQVosQ0FBdkI7O0FBRUEsTUFBSUMsZUFBZUcsTUFBZixLQUEwQixDQUE5QixFQUFpQyxPQUFPLElBQVA7O0FBRWpDLFNBQU9KLE1BQU1DLGVBQWUsQ0FBZixDQUFOLENBQVA7QUFDRDs7SUFFb0JJLHFCOzs7QUFDbkIsaUNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFnQm5CQyx5QkFoQm1CLEdBZ0JTO0FBQUEsYUFBTSxHQUFOO0FBQUEsS0FoQlQ7O0FBQUEsVUFrQm5CQyxrQkFsQm1CLEdBa0JFLFlBQU07QUFDekIsVUFBTUMsUUFBUVAsT0FDWEMsSUFEVyxDQUNOLE1BQUtPLEtBQUwsQ0FBV0Msb0JBREwsRUFFWEMsR0FGVyxDQUVQO0FBQUEsZUFBSyxNQUFLRixLQUFMLENBQVdDLG9CQUFYLENBQWdDRSxDQUFoQyxFQUFtQ0wsa0JBQW5DLEVBQUw7QUFBQSxPQUZPLEVBR1hNLElBSFcsQ0FHTixHQUhNLENBQWQ7O0FBS0EsYUFBT0wsS0FBUDtBQUNELEtBekJrQjs7QUFBQSxVQTJCbkJNLFlBM0JtQixHQTJCSixVQUFDQyxRQUFELEVBQWM7QUFBQSx3QkFDbUIsTUFBS04sS0FEeEI7QUFBQSxVQUNuQk8sU0FEbUIsZUFDbkJBLFNBRG1CO0FBQUEsVUFDUkMsc0JBRFEsZUFDUkEsc0JBRFE7O0FBRTNCLGFBQU8sb0NBQW1CRCxTQUFuQixFQUE4QkMsc0JBQTlCLEVBQXNERixRQUF0RCxDQUFQO0FBQ0QsS0E5QmtCOztBQUFBLFVBZ0NuQkcsVUFoQ21CLEdBZ0NOLFlBQU07QUFDakIsVUFBTUMsaUJBQWlCLE1BQUtWLEtBQUwsQ0FBV0Msb0JBQWxDO0FBQ0EsVUFBTVUsWUFBWSxDQUFDO0FBQ2pCQyxlQUFPLEVBRFU7QUFFakJDLDRCQUFvQixNQUFLakIsS0FBTCxDQUFXaUI7QUFGZCxPQUFELENBQWxCOztBQUtBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSw0QkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsNEJBQWY7QUFDRSx3Q0FBQyxjQUFEO0FBQ0Usc0JBQVUsTUFBS2pCLEtBQUwsQ0FBV2tCLFFBRHZCO0FBRUUsbUJBQU9ILFNBRlQ7QUFHRSxvQ0FBd0IsTUFBS2YsS0FBTCxDQUFXbUIsc0JBSHJDO0FBSUUsK0JBQW1CLE1BQUtDLHNCQUoxQjtBQUtFLCtCQUxGO0FBTUUsK0JBQW1CLE1BQUtwQixLQUFMLENBQVdxQixpQkFOaEM7QUFPRSwyQkFBZSxNQUFLckIsS0FBTCxDQUFXc0I7QUFQNUI7QUFERixTQURGO0FBWUU7QUFBQTtBQUFBLFlBQUssV0FBVSwwQ0FBZjtBQUNJLFdBQUMsTUFBS3RCLEtBQUwsQ0FBV3VCLFVBQVosSUFBMEIsQ0FBQyxNQUFLdkIsS0FBTCxDQUFXd0Isa0JBQXZDLElBQ0QsOEJBQUMsbUJBQUQ7QUFDRSxtQkFBTyxNQUFLeEIsS0FBTCxDQUFXeUIsY0FEcEI7QUFFRSx5QkFBYSxNQUFLekIsS0FBTCxDQUFXMEIsb0JBRjFCO0FBR0UsMEJBQWMsTUFBS3RCLEtBQUwsQ0FBV08sU0FIM0I7QUFJRSxzQkFBVSxNQUFLZ0I7QUFKakIsWUFGRjtBQVFFLHdDQUFDLHVCQUFEO0FBQ0Usc0JBQVUsTUFBSzNCLEtBQUwsQ0FBV2tCLFFBRHZCO0FBRUUsdUJBQVcsTUFBS2xCLEtBQUwsQ0FBVzRCLHFCQUZ4QjtBQUdFLDhCQUFrQmhDLE9BQU9DLElBQVAsQ0FBWWlCLGNBQVosRUFBNEJSLEdBQTVCLENBQWdDO0FBQUEscUJBQUtRLGVBQWVQLENBQWYsQ0FBTDtBQUFBLGFBQWhDLENBSHBCO0FBSUUsZ0NBQW9CLE1BQUtQLEtBQUwsQ0FBVzZCLDBCQUpqQztBQUtFLDBCQUFjLE1BQUtDO0FBTHJCO0FBUkY7QUFaRixPQURGO0FBK0JELEtBdEVrQjs7QUFBQSxVQXdFbkJDLGtCQXhFbUIsR0F3RUUsVUFBQ3BCLFNBQUQsRUFBWWpCLEtBQVosRUFBc0I7QUFDekMsVUFBSSxNQUFLTSxLQUFMLENBQVdnQyxXQUFmLEVBQTRCO0FBQzFCLGVBQU8sSUFBUDtBQUNEO0FBQ0QsVUFBTUMsY0FBY0MsT0FBT3ZCLFNBQVAsRUFBa0J3QixJQUFsQixPQUE2QixFQUFqRDtBQUNBLFVBQUlDLFFBQVEsQ0FBWjtBQUNBeEMsYUFBT0MsSUFBUCxDQUFZSCxLQUFaLEVBQW1CMkMsT0FBbkIsQ0FBMkIsVUFBQ0MsR0FBRCxFQUFTO0FBQ2xDRixpQkFBUzFDLE1BQU00QyxHQUFOLEVBQVdDLG9CQUFYLEVBQVQ7QUFDRCxPQUZEOztBQUlBLGFBQU9OLGVBQWVHLFFBQVEsQ0FBOUI7QUFDRCxLQW5Ga0I7O0FBQUEsVUFxRm5CSSxnQkFyRm1CLEdBcUZBLFlBQU07QUFDdkI7QUFDQSxVQUFNQyxzQkFBc0JoRCw0QkFBNEIsTUFBS1csS0FBTCxDQUFXQyxvQkFBdkMsQ0FBNUI7QUFDQSxVQUFJLENBQUNvQyxtQkFBTCxFQUEwQixPQUFPLEVBQVA7O0FBRTFCLFVBQU1DLGdCQUFnQkQsb0JBQW9CRCxnQkFBcEIsRUFBdEI7QUFDQSxVQUFNRyxhQUFhRCxjQUFjRSxPQUFkLElBQXlCLEVBQTVDOztBQUVBLGFBQU9ELFVBQVA7QUFDRCxLQTlGa0I7O0FBQUEsVUFnR25CRSxrQkFoR21CLEdBZ0dFLFlBQU07QUFDekI7QUFDQSxVQUFNSixzQkFBc0JoRCw0QkFBNEIsTUFBS1csS0FBTCxDQUFXQyxvQkFBdkMsQ0FBNUI7QUFDQSxVQUFJLENBQUNvQyxtQkFBTCxFQUEwQixPQUFPLEVBQVA7O0FBRTFCLFVBQU1LLGVBQWVMLG9CQUFvQkksa0JBQXBCLEVBQXJCOztBQUVBLGFBQU9DLFlBQVA7QUFDRCxLQXhHa0I7O0FBQUEsVUEwR25CQywwQkExR21CLEdBMEdVLFVBQUM5QixrQkFBRCxFQUF3QjtBQUNuRCxVQUFNK0IsV0FBVyxFQUFqQjs7QUFFQS9CLHlCQUFtQmdDLGFBQW5CO0FBQ0FELGVBQVMvQixtQkFBbUJpQyxFQUE1QixJQUFrQ2pDLG1CQUFtQmtDLFVBQW5CLEVBQWxDOztBQUVBLGFBQU9ILFFBQVA7QUFDRCxLQWpIa0I7O0FBQUEsVUFtSG5CckIsc0JBbkhtQixHQW1ITSxVQUFDeUIsUUFBRCxFQUFjO0FBQ3JDLFlBQUtDLFFBQUwsQ0FBYztBQUNaQyxtQkFBVyxNQUFLdkIsa0JBQUwsQ0FBd0JxQixRQUF4QixFQUFrQyxNQUFLaEQsS0FBTCxDQUFXQyxvQkFBN0MsQ0FEQztBQUVaTSxtQkFBV3lDLFFBRkM7QUFHWnhDLGdDQUF3QjtBQUhaLE9BQWQ7QUFLRCxLQXpIa0I7O0FBQUEsVUEySG5CMkMsYUEzSG1CLEdBMkhILFlBQU07QUFDcEIsWUFBS3ZELEtBQUwsQ0FBV3dELFFBQVg7QUFDRCxLQTdIa0I7O0FBQUEsVUErSG5CQyxhQS9IbUIsR0ErSEgsVUFBQ0MsS0FBRCxFQUFXO0FBQ3pCLFVBQUksTUFBS3RELEtBQUwsQ0FBV08sU0FBWCxDQUFxQndCLElBQXJCLE9BQWdDLEVBQXBDLEVBQXdDLE1BQU0sSUFBSXdCLEtBQUosQ0FBVSwwQkFBVixDQUFOOztBQUV4QyxVQUFNQyxrQkFBa0IsTUFBS2Ysa0JBQUwsRUFBeEI7QUFDQSxVQUFNSCxnQkFBZ0IsTUFBS0YsZ0JBQUwsRUFBdEI7O0FBRUEsWUFBS3hDLEtBQUwsQ0FDRzZELFFBREgsQ0FDWSxNQUFLekQsS0FBTCxDQUFXTyxTQUR2QixFQUNrQ2lELGVBRGxDLEVBQ21EbEIsYUFEbkQsRUFDa0VnQixLQURsRTtBQUVELEtBdklrQjs7QUFBQSxVQXlJbkJ0QyxzQkF6SW1CLEdBeUlNLFVBQUNxQixtQkFBRCxFQUF5QjtBQUNoRCxVQUFJQSxtQkFBSixFQUF5QjtBQUN2QixZQUFNL0MsUUFBUSxNQUFLVSxLQUFMLENBQVdDLG9CQUF6QjtBQUNBWCxjQUFNK0Msb0JBQW9CcUIsS0FBcEIsRUFBTixJQUFxQ3JCLG1CQUFyQztBQUNBO0FBQ0EsWUFBTTlCLFlBQVksTUFBS0YsWUFBTCxDQUFrQmYsS0FBbEIsQ0FBbEI7O0FBRUEsY0FBSzJELFFBQUwsQ0FBYztBQUNaMUMsOEJBRFk7QUFFWjJDLHFCQUFXLE1BQUt2QixrQkFBTCxDQUF3QnBCLFNBQXhCLEVBQW1DakIsS0FBbkMsQ0FGQztBQUdaVyxnQ0FBc0JYLEtBSFY7QUFJWnFFLGtDQUF3QixNQUFLN0Qsa0JBQUw7QUFKWixTQUFkO0FBTUQ7QUFDRCxZQUFLOEQscUJBQUw7QUFDRCxLQXhKa0I7O0FBQUEsVUEwSm5CbEMsaUJBMUptQixHQTBKQyxZQUFNO0FBQ3hCLFVBQU1wQyxRQUFRLE1BQUtVLEtBQUwsQ0FBV0Msb0JBQXpCO0FBQ0EsVUFBTU0sWUFBWSxNQUFLRixZQUFMLENBQWtCZixLQUFsQixDQUFsQjtBQUNBLFlBQUsyRCxRQUFMLENBQWM7QUFDWjFDLDRCQURZO0FBRVoyQyxtQkFBVyxNQUFLdkIsa0JBQUwsQ0FBd0JwQixTQUF4QixFQUFtQ2pCLEtBQW5DLENBRkM7QUFHWnFFLGdDQUF3QixNQUFLN0Qsa0JBQUw7QUFIWixPQUFkO0FBS0EsWUFBSzhELHFCQUFMO0FBQ0QsS0FuS2tCOztBQUFBLFVBcUtuQkEscUJBckttQixHQXFLSyxZQUFNO0FBQzVCLFVBQU1yQixhQUFhLE1BQUtILGdCQUFMLEVBQW5CO0FBQ0EsWUFBS3hDLEtBQUwsQ0FBV2lFLGtCQUFYLENBQThCdEIsVUFBOUI7QUFDRCxLQXhLa0I7O0FBQUEsVUEwS25CdUIsSUExS21CLEdBMEtaO0FBQUEsYUFBTSxNQUFLckQsVUFBTCxFQUFOO0FBQUEsS0ExS1k7O0FBQUEsVUE0S25Cc0QsV0E1S21CLEdBNEtMO0FBQUEsYUFDWjtBQUFDLDZCQUFEO0FBQUE7QUFDRSwyQkFBZ0IsbUNBRGxCO0FBRUUsZ0JBQU0sTUFBSy9ELEtBQUwsQ0FBV2dFLE9BRm5CO0FBR0Usa0JBQVEsTUFBS2IsYUFIZjtBQUlFLG9CQUFVLEtBSlo7QUFLRSxvQkFBUztBQUxYO0FBT0U7QUFBQywrQkFBRCxDQUFPLE1BQVA7QUFBQTtBQUNFLHdDQUFDLGdCQUFEO0FBQ0UsNEJBQWdCLENBQUMsTUFBS25ELEtBQUwsQ0FBV2tELFNBRDlCO0FBRUUsbUJBQU8sTUFBS3RELEtBQUwsQ0FBV2dCLEtBRnBCO0FBR0Usc0JBQVUsTUFBS3VDLGFBSGpCO0FBSUUsc0JBQVUsTUFBS0UsYUFKakI7QUFLRSxvQkFBUSxNQUFLekQsS0FBTCxDQUFXcUUsTUFMckI7QUFNRSw0QkFBZ0IsTUFBS3JFLEtBQUwsQ0FBV3NFLGNBTjdCO0FBT0UsNEJBQWdCLE1BQUt0RSxLQUFMLENBQVd1RSxjQVA3QjtBQVFFLDBCQUFjLE1BQUt2RSxLQUFMLENBQVd3RTtBQVIzQjtBQURGLFNBUEY7QUFtQkU7QUFBQywrQkFBRCxDQUFPLElBQVA7QUFBQTtBQUNHLGdCQUFLM0QsVUFBTDtBQURIO0FBbkJGLE9BRFk7QUFBQSxLQTVLSzs7QUFHakJiLFVBQU1pQixrQkFBTixDQUF5QndELGtCQUF6QixDQUE0Q3pFLE1BQU0wRSxlQUFsRDtBQUNBLFFBQU1yRSx1QkFBdUIsTUFBSzBDLDBCQUFMLENBQWdDL0MsTUFBTWlCLGtCQUF0QyxDQUE3Qjs7QUFFQSxVQUFLYixLQUFMLEdBQWE7QUFDWGtELGlCQUFXLE1BQUt2QixrQkFBTCxDQUF3Qi9CLE1BQU1XLFNBQTlCLEVBQXlDTixvQkFBekMsQ0FEQTtBQUVYTSxpQkFBV1gsTUFBTVcsU0FGTjtBQUdYQyw4QkFBd0JaLE1BQU1XLFNBQU4sQ0FBZ0J3QixJQUFoQixPQUEyQixFQUh4QztBQUlYOUIsZ0RBSlc7QUFLWDBELDhCQUF3QixNQUFLOUQseUJBQUwsRUFMYjtBQU1YbUUsZUFBUztBQU5FLEtBQWI7QUFOaUI7QUFjbEI7O2tDQXdMRE8sTSxxQkFBUztBQUNQLFdBQU8sS0FBSzNFLEtBQUwsQ0FBV21FLFdBQVgsSUFBMEIsQ0FBQyxLQUFLbkUsS0FBTCxDQUFXdUIsVUFBdEMsR0FBbUQsS0FBSzRDLFdBQUwsRUFBbkQsR0FBd0UsS0FBS0QsSUFBTCxFQUEvRTtBQUNELEc7OztFQXpNZ0RVLGdCQUFNQyxhOztrQkFBcEM5RSxxQjs7O0FBc09yQkEsc0JBQXNCK0UsWUFBdEIsR0FBcUM7QUFDbkN0QixZQUFVLG9CQUFNLENBQUUsQ0FEaUI7QUFFbkNTLHNCQUFvQiw4QkFBTSxDQUFFLENBRk87QUFHbkNKLFlBQVUsb0JBQU0sQ0FBRSxDQUhpQjtBQUluQ1EsVUFBUSxrQkFBTSxDQUFFLENBSm1CO0FBS25DRixlQUFhLElBTHNCO0FBTW5DakQsWUFBVSxLQU55QjtBQU9uQ29ELGtCQUFnQixRQVBtQjtBQVFuQ0Msa0JBQWdCLFFBUm1CO0FBU25DNUQsYUFBVyxFQVR3QjtBQVVuQ2Msa0JBQWdCLFlBVm1CO0FBV25DQyx3QkFBc0IsMkJBWGE7QUFZbkNQLDBCQUF3QixJQVpXO0FBYW5DdUQsbUJBQWlCLElBYmtCO0FBY25DckQscUJBQW1CLFdBZGdCO0FBZW5DQyxpQkFBZSxJQWZvQjtBQWdCbkNNLHlCQUF1QixnQkFoQlk7QUFpQm5DQyw4QkFBNEIsSUFqQk87QUFrQm5DTixjQUFZLEtBbEJ1QjtBQW1CbkNQLFNBQU8sRUFuQjRCO0FBb0JuQ3dELGdCQUFjLElBcEJxQjtBQXFCbkNoRCxzQkFBb0IsS0FyQmU7QUFzQm5DUSxlQUFhO0FBdEJzQixDQUFyQyIsImZpbGUiOiJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcblxuaW1wb3J0IFZpZXdUb3BCYXIgZnJvbSAnLi90b3AtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgVmlld1RhYnMgZnJvbSAnLi90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgU2VsZWN0ZWRJdGVtcyBmcm9tICcuL3NlbGVjdGVkLWl0ZW1zJztcbmltcG9ydCBHcm91cE5hbWUgZnJvbSAnLi9ncm91cC1uYW1lJztcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgY2FsY3VsYXRlR3JvdXBOYW1lIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dyb3VwLW5hbWUtY2FsY3VsYXRpb24nO1xuXG5pbXBvcnQgJy4vdmlldy5zY3NzJztcblxuXG5mdW5jdGlvbiBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QobGlzdHMpIHtcbiAgY29uc3QgZGF0YVNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhsaXN0cyk7XG5cbiAgaWYgKGRhdGFTb3VyY2VLZXlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIGxpc3RzW2RhdGFTb3VyY2VLZXlzWzBdXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcm9wcy5wcmVDaGVja2VkSXRlbXMpO1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3RzID0gdGhpcy5jcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyhwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMocHJvcHMuZ3JvdXBOYW1lLCBjaGVja2VkSXRlbUhhc2hMaXN0cyksXG4gICAgICBncm91cE5hbWU6IHByb3BzLmdyb3VwTmFtZSxcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHByb3BzLmdyb3VwTmFtZS50cmltKCkgIT09ICcnLFxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHMsXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIGdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiAnMCc7XG5cbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YW1wID0gT2JqZWN0XG4gICAgICAua2V5cyh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKVxuICAgICAgLm1hcChpID0+IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHNbaV0uZ2V0TGFzdFVwZGF0ZVN0YW1wKCkpXG4gICAgICAuam9pbignLScpO1xuXG4gICAgcmV0dXJuIHN0YW1wO1xuICB9XG5cbiAgZ2V0R3JvdXBOYW1lID0gKGhhc2hMaXN0KSA9PiB7XG4gICAgY29uc3QgeyBncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIGNhbGN1bGF0ZUdyb3VwTmFtZShncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIsIGhhc2hMaXN0KTtcbiAgfVxuXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdHNIYXNoQXJyYXkgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xuICAgIGNvbnN0IHRhYnNJdGVtcyA9IFt7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI6IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLFxuICAgIH1dO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFic1wiPlxuICAgICAgICAgIDxWaWV3VGFic1xuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICBpdGVtcz17dGFic0l0ZW1zfVxuICAgICAgICAgICAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMuY2hlY2tMaXN0Q2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgIGhpZGVTaW5nbGVUYWJcbiAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgICAgICAgc2VhcmNoVG9vbHRpcD17dGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1jb250YWluZXJcIj5cbiAgICAgICAgICB7KCF0aGlzLnByb3BzLnN0YW5kYWxvbmUgJiYgIXRoaXMucHJvcHMuaGlkZUdyb3VwTmFtZUlucHV0KSAmJlxuICAgICAgICAgIDxHcm91cE5hbWVcbiAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLmdyb3VwTmFtZUxhYmVsfVxuICAgICAgICAgICAgcGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuZ3JvdXBOYW1lUGxhY2VIb2xkZXJ9XG4gICAgICAgICAgICBpbml0aWFsVmFsdWU9e3RoaXMuc3RhdGUuZ3JvdXBOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAvPn1cbiAgICAgICAgICA8U2VsZWN0ZWRJdGVtc1xuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICBsaXN0TGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtTGlzdExhYmVsfVxuICAgICAgICAgICAgY2hlY2tlZEl0ZW1MaXN0cz17T2JqZWN0LmtleXMobGlzdHNIYXNoQXJyYXkpLm1hcChpID0+IGxpc3RzSGFzaEFycmF5W2ldKX1cbiAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIG9uSXRlbVJlbW92ZT17dGhpcy5pdGVtUmVtb3ZlSGFuZGxlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRDYW5TZWxlY3RTdGF0dXMgPSAoZ3JvdXBOYW1lLCBsaXN0cykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ2xlYXJhYmxlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgaXNHcm91cE5hbWUgPSBTdHJpbmcoZ3JvdXBOYW1lKS50cmltKCkgIT09ICcnO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgT2JqZWN0LmtleXMobGlzdHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY291bnQgKz0gbGlzdHNba2V5XS5nZXRDaGVja2VkSXRlbXNDb3VudCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzR3JvdXBOYW1lICYmIGNvdW50ID4gMDtcbiAgfVxuXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcblxuICAgIHJldHVybiByZXN1bHRMaXN0O1xuICB9XG5cbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xuICAgIGlmICghY2hlY2tlZEl0ZW1IYXNoTGlzdCkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRBbGxDaGVja2VkSXRlbXMoKTtcblxuICAgIHJldHVybiBjaGVja2VkSXRlbXM7XG4gIH1cblxuICBjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyA9IChkYXRhU291cmNlUHJvdmlkZXIpID0+IHtcbiAgICBjb25zdCBsaXN0SGFzaCA9IHt9O1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnByZUNoZWNrSXRlbXMoKTtcbiAgICBsaXN0SGFzaFtkYXRhU291cmNlUHJvdmlkZXIuaWRdID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcblxuICAgIHJldHVybiBsaXN0SGFzaDtcbiAgfVxuXG4gIGdyb3VwTmFtZUNoYW5nZUhhbmRsZXIgPSAobmV3VmFsdWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMobmV3VmFsdWUsIHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxuICAgICAgZ3JvdXBOYW1lOiBuZXdWYWx1ZSxcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBjYW5jZWxIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfVxuXG4gIHNlbGVjdEhhbmRsZXIgPSAoZmxhZ3MpID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5ncm91cE5hbWUudHJpbSgpID09PSAnJykgdGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBncm91cE5hbWUgaXMgZW1wdHknKTtcblxuICAgIGNvbnN0IGFsbENoZWNrZWRJdGVtcyA9IHRoaXMuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuXG4gICAgdGhpcy5wcm9wc1xuICAgICAgLm9uU2VsZWN0KHRoaXMuc3RhdGUuZ3JvdXBOYW1lLCBhbGxDaGVja2VkSXRlbXMsIGNoZWNrZWRPdXRwdXQsIGZsYWdzKTtcbiAgfVxuXG4gIGNoZWNrTGlzdENoYW5nZUhhbmRsZXIgPSAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkgPT4ge1xuICAgIGlmIChjaGVja2VkSXRlbUhhc2hMaXN0KSB7XG4gICAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgICBsaXN0c1tjaGVja2VkSXRlbUhhc2hMaXN0LmdldElkKCldID0gY2hlY2tlZEl0ZW1IYXNoTGlzdDtcbiAgICAgIC8qIEdldHRpbmcgZ3JvdXAgbmFtZSBhZnRlciBsaXN0cyBjaGFuZ2luZyAqL1xuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxuICAgICAgICBjaGVja2VkSXRlbUhhc2hMaXN0czogbGlzdHMsXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcbiAgfVxuXG4gIGl0ZW1SZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBncm91cE5hbWUsXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICB9KTtcbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xuICB9XG5cbiAgYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdExpc3QgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlZChyZXN1bHRMaXN0KTtcbiAgfVxuXG4gIHNob3cgPSAoKSA9PiB0aGlzLmdldENvbnRlbnQoKTtcblxuICBzaG93SW5Nb2RhbCA9ICgpID0+IChcbiAgICA8TW9kYWxcbiAgICAgIGRpYWxvZ0NsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3LWRpYWxvZ1wiXG4gICAgICBzaG93PXt0aGlzLnN0YXRlLnZpc2libGV9XG4gICAgICBvbkhpZGU9e3RoaXMuY2FuY2VsSGFuZGxlcn1cbiAgICAgIGtleWJvYXJkPXtmYWxzZX1cbiAgICAgIGJhY2tkcm9wPVwic3RhdGljXCJcbiAgICA+XG4gICAgICA8TW9kYWwuSGVhZGVyPlxuICAgICAgICA8Vmlld1RvcEJhclxuICAgICAgICAgIHNlbGVjdERpc2FibGVkPXshdGhpcy5zdGF0ZS5jYW5TZWxlY3R9XG4gICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2FuY2VsSGFuZGxlcn1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5zZWxlY3RIYW5kbGVyfVxuICAgICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XG4gICAgICAgICAgYnRuU2VsZWN0TGFiZWw9e3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XG4gICAgICAgICAgYnRuQ2FuY2VsTGFiZWw9e3RoaXMucHJvcHMuYnRuQ2FuY2VsTGFiZWx9XG4gICAgICAgICAgaGVscERpc2FibGVkPXt0aGlzLnByb3BzLmhlbHBEaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgIHt0aGlzLmdldENvbnRlbnQoKX1cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICA8L01vZGFsPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG93SW5Nb2RhbCAmJiAhdGhpcy5wcm9wcy5zdGFuZGFsb25lID8gdGhpcy5zaG93SW5Nb2RhbCgpIDogdGhpcy5zaG93KCk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxuICBzaG93SW5Nb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuU2VsZWN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGdyb3VwTmFtZUxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHN0YW5kYWxvbmU6IFByb3BUeXBlcy5ib29sLFxuICBoZWxwRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBoaWRlR3JvdXBOYW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICBpc0NsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcuZGVmYXVsdFByb3BzID0ge1xuICBvbkNhbmNlbDogKCkgPT4ge30sXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25IZWxwOiAoKSA9PiB7fSxcbiAgc2hvd0luTW9kYWw6IHRydWUsXG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXG4gIGdyb3VwTmFtZTogJycsXG4gIGdyb3VwTmFtZUxhYmVsOiAnR3JvdXAgbmFtZScsXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiAnUGxlYXNlLCBmaWxsIGEgZ3JvdXAgbmFtZScsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzdGFuZGFsb25lOiBmYWxzZSxcbiAgdGl0bGU6ICcnLFxuICBoZWxwRGlzYWJsZWQ6IHRydWUsXG4gIGhpZGVHcm91cE5hbWVJbnB1dDogZmFsc2UsXG4gIGlzQ2xlYXJhYmxlOiBmYWxzZSxcbn07XG4iXX0=