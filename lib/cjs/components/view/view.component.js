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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInN0YW5kYWxvbmUiLCJncm91cE5hbWVMYWJlbCIsImdyb3VwTmFtZVBsYWNlSG9sZGVyIiwiZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciIsInNlbGVjdGVkSXRlbUxpc3RMYWJlbCIsInNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUhhbmRsZXIiLCJnZXRDYW5TZWxlY3RTdGF0dXMiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsIkVycm9yIiwiYWxsQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3QiLCJnZXRJZCIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJhZnRlckNoZWNrTGlzdENoYW5nZWQiLCJvbkNoZWNrTGlzdENoYW5nZWQiLCJzaG93Iiwic2hvd0luTW9kYWwiLCJ2aXNpYmxlIiwib25IZWxwIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsImhlbHBEaXNhYmxlZCIsInNldFByZWNoZWNrZWRJdGVtcyIsInByZUNoZWNrZWRJdGVtcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7K2VBZEE7O0FBaUJBLFNBQVNBLDJCQUFULENBQXFDQyxLQUFyQyxFQUE0QztBQUMxQyxNQUFNQyxpQkFBaUJDLE9BQU9DLElBQVAsQ0FBWUgsS0FBWixDQUF2Qjs7QUFFQSxNQUFJQyxlQUFlRyxNQUFmLEtBQTBCLENBQTlCLEVBQWlDLE9BQU8sSUFBUDs7QUFFakMsU0FBT0osTUFBTUMsZUFBZSxDQUFmLENBQU4sQ0FBUDtBQUNEOztJQUVvQkkscUI7OztBQUNuQixpQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWdCbkJDLHlCQWhCbUIsR0FnQlM7QUFBQSxhQUFNLEdBQU47QUFBQSxLQWhCVDs7QUFBQSxVQWtCbkJDLGtCQWxCbUIsR0FrQkUsWUFBTTtBQUN6QixVQUFNQyxRQUFRUCxPQUNYQyxJQURXLENBQ04sTUFBS08sS0FBTCxDQUFXQyxvQkFETCxFQUVYQyxHQUZXLENBRVA7QUFBQSxlQUFLLE1BQUtGLEtBQUwsQ0FBV0Msb0JBQVgsQ0FBZ0NFLENBQWhDLEVBQW1DTCxrQkFBbkMsRUFBTDtBQUFBLE9BRk8sRUFHWE0sSUFIVyxDQUdOLEdBSE0sQ0FBZDs7QUFLQSxhQUFPTCxLQUFQO0FBQ0QsS0F6QmtCOztBQUFBLFVBMkJuQk0sWUEzQm1CLEdBMkJKLFVBQUNDLFFBQUQsRUFBYztBQUFBLHdCQUNtQixNQUFLTixLQUR4QjtBQUFBLFVBQ25CTyxTQURtQixlQUNuQkEsU0FEbUI7QUFBQSxVQUNSQyxzQkFEUSxlQUNSQSxzQkFEUTs7QUFFM0IsYUFBTyxvQ0FBbUJELFNBQW5CLEVBQThCQyxzQkFBOUIsRUFBc0RGLFFBQXRELENBQVA7QUFDRCxLQTlCa0I7O0FBQUEsVUFnQ25CRyxVQWhDbUIsR0FnQ04sWUFBTTtBQUNqQixVQUFNQyxpQkFBaUIsTUFBS1YsS0FBTCxDQUFXQyxvQkFBbEM7QUFDQSxVQUFNVSxZQUFZLENBQUM7QUFDakJDLGVBQU8sRUFEVTtBQUVqQkMsNEJBQW9CLE1BQUtqQixLQUFMLENBQVdpQjtBQUZkLE9BQUQsQ0FBbEI7O0FBS0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLDRCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSw0QkFBZjtBQUNFO0FBQ0Usc0JBQVUsTUFBS2pCLEtBQUwsQ0FBV2tCLFFBRHZCO0FBRUUsbUJBQU9ILFNBRlQ7QUFHRSxvQ0FBd0IsTUFBS2YsS0FBTCxDQUFXbUIsc0JBSHJDO0FBSUUsK0JBQW1CLE1BQUtDLHNCQUoxQjtBQUtFLCtCQUxGO0FBTUUsK0JBQW1CLE1BQUtwQixLQUFMLENBQVdxQjtBQU5oQztBQURGLFNBREY7QUFXRTtBQUFBO0FBQUEsWUFBSyxXQUFVLDBDQUFmO0FBQ0csV0FBQyxNQUFLckIsS0FBTCxDQUFXc0IsVUFBWixJQUNEO0FBQ0UsbUJBQU8sTUFBS3RCLEtBQUwsQ0FBV3VCLGNBRHBCO0FBRUUseUJBQWEsTUFBS3ZCLEtBQUwsQ0FBV3dCLG9CQUYxQjtBQUdFLDBCQUFjLE1BQUtwQixLQUFMLENBQVdPLFNBSDNCO0FBSUUsc0JBQVUsTUFBS2M7QUFKakIsWUFGRjtBQVFFO0FBQ0Usc0JBQVUsTUFBS3pCLEtBQUwsQ0FBV2tCLFFBRHZCO0FBRUUsdUJBQVcsTUFBS2xCLEtBQUwsQ0FBVzBCLHFCQUZ4QjtBQUdFLDhCQUFrQjlCLE9BQU9DLElBQVAsQ0FBWWlCLGNBQVosRUFBNEJSLEdBQTVCLENBQWdDO0FBQUEscUJBQUtRLGVBQWVQLENBQWYsQ0FBTDtBQUFBLGFBQWhDLENBSHBCO0FBSUUsZ0NBQW9CLE1BQUtQLEtBQUwsQ0FBVzJCLDBCQUpqQztBQUtFLDBCQUFjLE1BQUtDO0FBTHJCO0FBUkY7QUFYRixPQURGO0FBOEJELEtBckVrQjs7QUFBQSxVQXVFbkJDLGtCQXZFbUIsR0F1RUUsVUFBQ2xCLFNBQUQsRUFBWWpCLEtBQVosRUFBc0I7QUFDekMsVUFBTW9DLGNBQWNDLE9BQU9wQixTQUFQLEVBQWtCcUIsSUFBbEIsT0FBNkIsRUFBakQ7QUFDQSxVQUFJQyxRQUFRLENBQVo7QUFDQXJDLGFBQU9DLElBQVAsQ0FBWUgsS0FBWixFQUFtQndDLE9BQW5CLENBQTJCLFVBQUNDLEdBQUQsRUFBUztBQUNsQ0YsaUJBQVN2QyxNQUFNeUMsR0FBTixFQUFXQyxvQkFBWCxFQUFUO0FBQ0QsT0FGRDs7QUFJQSxhQUFPTixlQUFlRyxRQUFRLENBQTlCO0FBQ0QsS0EvRWtCOztBQUFBLFVBaUZuQkksZ0JBakZtQixHQWlGQSxZQUFNO0FBQ3ZCO0FBQ0EsVUFBTUMsc0JBQXNCN0MsNEJBQTRCLE1BQUtXLEtBQUwsQ0FBV0Msb0JBQXZDLENBQTVCO0FBQ0EsVUFBSSxDQUFDaUMsbUJBQUwsRUFBMEIsT0FBTyxFQUFQOztBQUUxQixVQUFNQyxnQkFBZ0JELG9CQUFvQkQsZ0JBQXBCLEVBQXRCO0FBQ0EsVUFBTUcsYUFBYUQsY0FBY0UsT0FBZCxJQUF5QixFQUE1Qzs7QUFFQSxhQUFPRCxVQUFQO0FBQ0QsS0ExRmtCOztBQUFBLFVBNEZuQkUsa0JBNUZtQixHQTRGRSxZQUFNO0FBQ3pCO0FBQ0EsVUFBTUosc0JBQXNCN0MsNEJBQTRCLE1BQUtXLEtBQUwsQ0FBV0Msb0JBQXZDLENBQTVCO0FBQ0EsVUFBSSxDQUFDaUMsbUJBQUwsRUFBMEIsT0FBTyxFQUFQOztBQUUxQixVQUFNSyxlQUFlTCxvQkFBb0JJLGtCQUFwQixFQUFyQjs7QUFFQSxhQUFPQyxZQUFQO0FBQ0QsS0FwR2tCOztBQUFBLFVBc0duQkMsMEJBdEdtQixHQXNHVSxVQUFDM0Isa0JBQUQsRUFBd0I7QUFDbkQsVUFBTTRCLFdBQVcsRUFBakI7O0FBRUE1Qix5QkFBbUI2QixhQUFuQjtBQUNBRCxlQUFTNUIsbUJBQW1COEIsRUFBNUIsSUFBa0M5QixtQkFBbUIrQixVQUFuQixFQUFsQzs7QUFFQSxhQUFPSCxRQUFQO0FBQ0QsS0E3R2tCOztBQUFBLFVBK0duQnBCLHNCQS9HbUIsR0ErR00sVUFBQ3dCLFFBQUQsRUFBYztBQUNyQyxZQUFLQyxRQUFMLENBQWM7QUFDWkMsbUJBQVcsTUFBS3RCLGtCQUFMLENBQXdCb0IsUUFBeEIsRUFBa0MsTUFBSzdDLEtBQUwsQ0FBV0Msb0JBQTdDLENBREM7QUFFWk0sbUJBQVdzQyxRQUZDO0FBR1pyQyxnQ0FBd0I7QUFIWixPQUFkO0FBS0QsS0FySGtCOztBQUFBLFVBdUhuQndDLGFBdkhtQixHQXVISCxZQUFNO0FBQ3BCLFlBQUtwRCxLQUFMLENBQVdxRCxRQUFYO0FBQ0QsS0F6SGtCOztBQUFBLFVBMkhuQkMsYUEzSG1CLEdBMkhILFlBQU07QUFDcEIsVUFBSSxNQUFLbEQsS0FBTCxDQUFXTyxTQUFYLENBQXFCcUIsSUFBckIsT0FBZ0MsRUFBcEMsRUFBd0MsTUFBTSxJQUFJdUIsS0FBSixDQUFVLDBCQUFWLENBQU47O0FBRXhDLFVBQU1DLGtCQUFrQixNQUFLZCxrQkFBTCxFQUF4QjtBQUNBLFVBQU1ILGdCQUFnQixNQUFLRixnQkFBTCxFQUF0Qjs7QUFFQSxZQUFLckMsS0FBTCxDQUNHeUQsUUFESCxDQUNZLE1BQUtyRCxLQUFMLENBQVdPLFNBRHZCLEVBQ2tDNkMsZUFEbEMsRUFDbURqQixhQURuRDtBQUVELEtBbklrQjs7QUFBQSxVQXFJbkJuQixzQkFySW1CLEdBcUlNLFVBQUNrQixtQkFBRCxFQUF5QjtBQUNoRCxVQUFJQSxtQkFBSixFQUF5QjtBQUN2QixZQUFNNUMsUUFBUSxNQUFLVSxLQUFMLENBQVdDLG9CQUF6QjtBQUNBWCxjQUFNNEMsb0JBQW9Cb0IsS0FBcEIsRUFBTixJQUFxQ3BCLG1CQUFyQztBQUNBO0FBQ0EsWUFBTTNCLFlBQVksTUFBS0YsWUFBTCxDQUFrQmYsS0FBbEIsQ0FBbEI7O0FBRUEsY0FBS3dELFFBQUwsQ0FBYztBQUNadkMsOEJBRFk7QUFFWndDLHFCQUFXLE1BQUt0QixrQkFBTCxDQUF3QmxCLFNBQXhCLEVBQW1DakIsS0FBbkMsQ0FGQztBQUdaVyxnQ0FBc0JYLEtBSFY7QUFJWmlFLGtDQUF3QixNQUFLekQsa0JBQUw7QUFKWixTQUFkO0FBTUQ7QUFDRCxZQUFLMEQscUJBQUw7QUFDRCxLQXBKa0I7O0FBQUEsVUFzSm5CaEMsaUJBdEptQixHQXNKQyxZQUFNO0FBQ3hCLFVBQU1sQyxRQUFRLE1BQUtVLEtBQUwsQ0FBV0Msb0JBQXpCO0FBQ0EsVUFBTU0sWUFBWSxNQUFLRixZQUFMLENBQWtCZixLQUFsQixDQUFsQjtBQUNBLFlBQUt3RCxRQUFMLENBQWM7QUFDWnZDLDRCQURZO0FBRVp3QyxtQkFBVyxNQUFLdEIsa0JBQUwsQ0FBd0JsQixTQUF4QixFQUFtQ2pCLEtBQW5DLENBRkM7QUFHWmlFLGdDQUF3QixNQUFLekQsa0JBQUw7QUFIWixPQUFkO0FBS0EsWUFBSzBELHFCQUFMO0FBQ0QsS0EvSmtCOztBQUFBLFVBaUtuQkEscUJBakttQixHQWlLSyxZQUFNO0FBQzVCLFVBQU1wQixhQUFhLE1BQUtILGdCQUFMLEVBQW5CO0FBQ0EsWUFBS3JDLEtBQUwsQ0FBVzZELGtCQUFYLENBQThCckIsVUFBOUI7QUFDRCxLQXBLa0I7O0FBQUEsVUFzS25Cc0IsSUF0S21CLEdBc0taO0FBQUEsYUFBTSxNQUFLakQsVUFBTCxFQUFOO0FBQUEsS0F0S1k7O0FBQUEsVUF3S25Ca0QsV0F4S21CLEdBd0tMO0FBQUEsYUFDWjtBQUFBO0FBQUE7QUFDRSwyQkFBZ0IsbUNBRGxCO0FBRUUsZ0JBQU0sTUFBSzNELEtBQUwsQ0FBVzRELE9BRm5CO0FBR0Usa0JBQVEsTUFBS1osYUFIZjtBQUlFLG9CQUFVLEtBSlo7QUFLRSxvQkFBUztBQUxYO0FBT0U7QUFBQSxnQ0FBTyxNQUFQO0FBQUE7QUFDRTtBQUNFLDRCQUFnQixDQUFDLE1BQUtoRCxLQUFMLENBQVcrQyxTQUQ5QjtBQUVFLG1CQUFPLE1BQUtuRCxLQUFMLENBQVdnQixLQUZwQjtBQUdFLHNCQUFVLE1BQUtvQyxhQUhqQjtBQUlFLHNCQUFVLE1BQUtFLGFBSmpCO0FBS0Usb0JBQVEsTUFBS3RELEtBQUwsQ0FBV2lFLE1BTHJCO0FBTUUsNEJBQWdCLE1BQUtqRSxLQUFMLENBQVdrRSxjQU43QjtBQU9FLDRCQUFnQixNQUFLbEUsS0FBTCxDQUFXbUUsY0FQN0I7QUFRRSwwQkFBYyxNQUFLbkUsS0FBTCxDQUFXb0U7QUFSM0I7QUFERixTQVBGO0FBbUJFO0FBQUEsZ0NBQU8sSUFBUDtBQUFBO0FBQ0csZ0JBQUt2RCxVQUFMO0FBREg7QUFuQkYsT0FEWTtBQUFBLEtBeEtLOztBQUdqQmIsVUFBTWlCLGtCQUFOLENBQXlCb0Qsa0JBQXpCLENBQTRDckUsTUFBTXNFLGVBQWxEO0FBQ0EsUUFBTWpFLHVCQUF1QixNQUFLdUMsMEJBQUwsQ0FBZ0M1QyxNQUFNaUIsa0JBQXRDLENBQTdCOztBQUVBLFVBQUtiLEtBQUwsR0FBYTtBQUNYK0MsaUJBQVcsTUFBS3RCLGtCQUFMLENBQXdCN0IsTUFBTVcsU0FBOUIsRUFBeUNOLG9CQUF6QyxDQURBO0FBRVhNLGlCQUFXWCxNQUFNVyxTQUZOO0FBR1hDLDhCQUF3QlosTUFBTVcsU0FBTixDQUFnQnFCLElBQWhCLE9BQTJCLEVBSHhDO0FBSVgzQixnREFKVztBQUtYc0QsOEJBQXdCLE1BQUsxRCx5QkFBTCxFQUxiO0FBTVgrRCxlQUFTO0FBTkUsS0FBYjtBQU5pQjtBQWNsQjs7a0NBb0xETyxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLdkUsS0FBTCxDQUFXK0QsV0FBWCxJQUEwQixDQUFDLEtBQUsvRCxLQUFMLENBQVdzQixVQUF0QyxHQUFtRCxLQUFLeUMsV0FBTCxFQUFuRCxHQUF3RSxLQUFLRCxJQUFMLEVBQS9FO0FBQ0QsRzs7O0VBck1nRCxnQkFBTVUsYTs7a0JBQXBDekUscUI7OztBQStOckJBLHNCQUFzQjBFLFlBQXRCLEdBQXFDO0FBQ25DcEIsWUFBVSxvQkFBTSxDQUFFLENBRGlCO0FBRW5DUSxzQkFBb0IsOEJBQU0sQ0FBRSxDQUZPO0FBR25DSixZQUFVLG9CQUFNLENBQUUsQ0FIaUI7QUFJbkNRLFVBQVEsa0JBQU0sQ0FBRSxDQUptQjtBQUtuQ0YsZUFBYSxJQUxzQjtBQU1uQzdDLFlBQVUsS0FOeUI7QUFPbkNnRCxrQkFBZ0IsUUFQbUI7QUFRbkNDLGtCQUFnQixRQVJtQjtBQVNuQ3hELGFBQVcsRUFUd0I7QUFVbkNZLGtCQUFnQixZQVZtQjtBQVduQ0Msd0JBQXNCLDJCQVhhO0FBWW5DTCwwQkFBd0IsSUFaVztBQWFuQ21ELG1CQUFpQixJQWJrQjtBQWNuQ2pELHFCQUFtQixXQWRnQjtBQWVuQ0sseUJBQXVCLGdCQWZZO0FBZ0JuQ0MsOEJBQTRCLElBaEJPO0FBaUJuQ0wsY0FBWSxLQWpCdUI7QUFrQm5DTixTQUFPLEVBbEI0QjtBQW1CbkNvRCxnQkFBYztBQW5CcUIsQ0FBckMiLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmltcG9ydCBWaWV3VG9wQmFyIGZyb20gJy4vdG9wLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgVmlld1RhYnMgZnJvbSAnLi90YWJzLmNvbXBvbmVudCc7XHJcbmltcG9ydCBTZWxlY3RlZEl0ZW1zIGZyb20gJy4vc2VsZWN0ZWQtaXRlbXMnO1xyXG5pbXBvcnQgR3JvdXBOYW1lIGZyb20gJy4vZ3JvdXAtbmFtZSc7XHJcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcclxuaW1wb3J0IGNhbGN1bGF0ZUdyb3VwTmFtZSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ncm91cC1uYW1lLWNhbGN1bGF0aW9uJztcclxuXHJcbmltcG9ydCAnLi92aWV3LnNjc3MnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdChsaXN0cykge1xyXG4gIGNvbnN0IGRhdGFTb3VyY2VLZXlzID0gT2JqZWN0LmtleXMobGlzdHMpO1xyXG5cclxuICBpZiAoZGF0YVNvdXJjZUtleXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIGxpc3RzW2RhdGFTb3VyY2VLZXlzWzBdXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByb3BzLnByZUNoZWNrZWRJdGVtcyk7XHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0cyA9IHRoaXMuY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMocHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKHByb3BzLmdyb3VwTmFtZSwgY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxyXG4gICAgICBncm91cE5hbWU6IHByb3BzLmdyb3VwTmFtZSxcclxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogcHJvcHMuZ3JvdXBOYW1lLnRyaW0oKSAhPT0gJycsXHJcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzLFxyXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4gJzAnO1xyXG5cclxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzdGFtcCA9IE9iamVjdFxyXG4gICAgICAua2V5cyh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKVxyXG4gICAgICAubWFwKGkgPT4gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0c1tpXS5nZXRMYXN0VXBkYXRlU3RhbXAoKSlcclxuICAgICAgLmpvaW4oJy0nKTtcclxuXHJcbiAgICByZXR1cm4gc3RhbXA7XHJcbiAgfVxyXG5cclxuICBnZXRHcm91cE5hbWUgPSAoaGFzaExpc3QpID0+IHtcclxuICAgIGNvbnN0IHsgZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgcmV0dXJuIGNhbGN1bGF0ZUdyb3VwTmFtZShncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIsIGhhc2hMaXN0KTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsaXN0c0hhc2hBcnJheSA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XHJcbiAgICBjb25zdCB0YWJzSXRlbXMgPSBbe1xyXG4gICAgICB0aXRsZTogJycsXHJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcjogdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIsXHJcbiAgICB9XTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFic1wiPlxyXG4gICAgICAgICAgPFZpZXdUYWJzXHJcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxyXG4gICAgICAgICAgICBpdGVtcz17dGFic0l0ZW1zfVxyXG4gICAgICAgICAgICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XHJcbiAgICAgICAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlPXt0aGlzLmNoZWNrTGlzdENoYW5nZUhhbmRsZXJ9XHJcbiAgICAgICAgICAgIGhpZGVTaW5nbGVUYWJcclxuICAgICAgICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgeyF0aGlzLnByb3BzLnN0YW5kYWxvbmUgJiZcclxuICAgICAgICAgIDxHcm91cE5hbWVcclxuICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuZ3JvdXBOYW1lTGFiZWx9XHJcbiAgICAgICAgICAgIHBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLmdyb3VwTmFtZVBsYWNlSG9sZGVyfVxyXG4gICAgICAgICAgICBpbml0aWFsVmFsdWU9e3RoaXMuc3RhdGUuZ3JvdXBOYW1lfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5ncm91cE5hbWVDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgLz59XHJcbiAgICAgICAgICA8U2VsZWN0ZWRJdGVtc1xyXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgICAgICAgbGlzdExhYmVsPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbUxpc3RMYWJlbH1cclxuICAgICAgICAgICAgY2hlY2tlZEl0ZW1MaXN0cz17T2JqZWN0LmtleXMobGlzdHNIYXNoQXJyYXkpLm1hcChpID0+IGxpc3RzSGFzaEFycmF5W2ldKX1cclxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAgICAgICBvbkl0ZW1SZW1vdmU9e3RoaXMuaXRlbVJlbW92ZUhhbmRsZXJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRDYW5TZWxlY3RTdGF0dXMgPSAoZ3JvdXBOYW1lLCBsaXN0cykgPT4ge1xyXG4gICAgY29uc3QgaXNHcm91cE5hbWUgPSBTdHJpbmcoZ3JvdXBOYW1lKS50cmltKCkgIT09ICcnO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuICAgIE9iamVjdC5rZXlzKGxpc3RzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgY291bnQgKz0gbGlzdHNba2V5XS5nZXRDaGVja2VkSXRlbXNDb3VudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGlzR3JvdXBOYW1lICYmIGNvdW50ID4gMDtcclxuICB9XHJcblxyXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XHJcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xyXG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XHJcblxyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0TGlzdDtcclxuICB9XHJcblxyXG4gIGdldEFsbENoZWNrZWRJdGVtcyA9ICgpID0+IHtcclxuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XHJcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcclxuXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldEFsbENoZWNrZWRJdGVtcygpO1xyXG5cclxuICAgIHJldHVybiBjaGVja2VkSXRlbXM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyA9IChkYXRhU291cmNlUHJvdmlkZXIpID0+IHtcclxuICAgIGNvbnN0IGxpc3RIYXNoID0ge307XHJcblxyXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnByZUNoZWNrSXRlbXMoKTtcclxuICAgIGxpc3RIYXNoW2RhdGFTb3VyY2VQcm92aWRlci5pZF0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG5cclxuICAgIHJldHVybiBsaXN0SGFzaDtcclxuICB9XHJcblxyXG4gIGdyb3VwTmFtZUNoYW5nZUhhbmRsZXIgPSAobmV3VmFsdWUpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKG5ld1ZhbHVlLCB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKSxcclxuICAgICAgZ3JvdXBOYW1lOiBuZXdWYWx1ZSxcclxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsSGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5ncm91cE5hbWUudHJpbSgpID09PSAnJykgdGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBncm91cE5hbWUgaXMgZW1wdHknKTtcclxuXHJcbiAgICBjb25zdCBhbGxDaGVja2VkSXRlbXMgPSB0aGlzLmdldEFsbENoZWNrZWRJdGVtcygpO1xyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG5cclxuICAgIHRoaXMucHJvcHNcclxuICAgICAgLm9uU2VsZWN0KHRoaXMuc3RhdGUuZ3JvdXBOYW1lLCBhbGxDaGVja2VkSXRlbXMsIGNoZWNrZWRPdXRwdXQpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tMaXN0Q2hhbmdlSGFuZGxlciA9IChjaGVja2VkSXRlbUhhc2hMaXN0KSA9PiB7XHJcbiAgICBpZiAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkge1xyXG4gICAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XHJcbiAgICAgIGxpc3RzW2NoZWNrZWRJdGVtSGFzaExpc3QuZ2V0SWQoKV0gPSBjaGVja2VkSXRlbUhhc2hMaXN0O1xyXG4gICAgICAvKiBHZXR0aW5nIGdyb3VwIG5hbWUgYWZ0ZXIgbGlzdHMgY2hhbmdpbmcgKi9cclxuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXHJcbiAgICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHM6IGxpc3RzLFxyXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGl0ZW1SZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xyXG4gICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhncm91cE5hbWUsIGxpc3RzKSxcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdExpc3QgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcclxuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2VkKHJlc3VsdExpc3QpO1xyXG4gIH1cclxuXHJcbiAgc2hvdyA9ICgpID0+IHRoaXMuZ2V0Q29udGVudCgpO1xyXG5cclxuICBzaG93SW5Nb2RhbCA9ICgpID0+IChcclxuICAgIDxNb2RhbFxyXG4gICAgICBkaWFsb2dDbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlldy1kaWFsb2dcIlxyXG4gICAgICBzaG93PXt0aGlzLnN0YXRlLnZpc2libGV9XHJcbiAgICAgIG9uSGlkZT17dGhpcy5jYW5jZWxIYW5kbGVyfVxyXG4gICAgICBrZXlib2FyZD17ZmFsc2V9XHJcbiAgICAgIGJhY2tkcm9wPVwic3RhdGljXCJcclxuICAgID5cclxuICAgICAgPE1vZGFsLkhlYWRlcj5cclxuICAgICAgICA8Vmlld1RvcEJhclxyXG4gICAgICAgICAgc2VsZWN0RGlzYWJsZWQ9eyF0aGlzLnN0YXRlLmNhblNlbGVjdH1cclxuICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfVxyXG4gICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2FuY2VsSGFuZGxlcn1cclxuICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdEhhbmRsZXJ9XHJcbiAgICAgICAgICBvbkhlbHA9e3RoaXMucHJvcHMub25IZWxwfVxyXG4gICAgICAgICAgYnRuU2VsZWN0TGFiZWw9e3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XHJcbiAgICAgICAgICBidG5DYW5jZWxMYWJlbD17dGhpcy5wcm9wcy5idG5DYW5jZWxMYWJlbH1cclxuICAgICAgICAgIGhlbHBEaXNhYmxlZD17dGhpcy5wcm9wcy5oZWxwRGlzYWJsZWR9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgIHt0aGlzLmdldENvbnRlbnQoKX1cclxuICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgPC9Nb2RhbD5cclxuICApO1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG93SW5Nb2RhbCAmJiAhdGhpcy5wcm9wcy5zdGFuZGFsb25lID8gdGhpcy5zaG93SW5Nb2RhbCgpIDogdGhpcy5zaG93KCk7XHJcbiAgfVxyXG59XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxyXG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkNoZWNrTGlzdENoYW5nZWQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxyXG4gIHNob3dJbk1vZGFsOiBQcm9wVHlwZXMuYm9vbCxcclxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgZ3JvdXBOYW1lTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBzdGFuZGFsb25lOiBQcm9wVHlwZXMuYm9vbCxcclxuICBoZWxwRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LmRlZmF1bHRQcm9wcyA9IHtcclxuICBvbkNhbmNlbDogKCkgPT4ge30sXHJcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiAoKSA9PiB7fSxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgb25IZWxwOiAoKSA9PiB7fSxcclxuICBzaG93SW5Nb2RhbDogdHJ1ZSxcclxuICBhbGxMYWJlbDogJ0FsbCcsXHJcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxyXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcclxuICBncm91cE5hbWU6ICcnLFxyXG4gIGdyb3VwTmFtZUxhYmVsOiAnR3JvdXAgbmFtZScsXHJcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6ICdQbGVhc2UsIGZpbGwgYSBncm91cCBuYW1lJyxcclxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXHJcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiAnU2VsZWN0ZWQgaXRlbXMnLFxyXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIHN0YW5kYWxvbmU6IGZhbHNlLFxyXG4gIHRpdGxlOiAnJyxcclxuICBoZWxwRGlzYWJsZWQ6IHRydWUsXHJcbn07XHJcbiJdfQ==