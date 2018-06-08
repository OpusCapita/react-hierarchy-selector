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
  searchTooltip: null,
  selectedItemListLabel: 'Selected items',
  selectedItemRenderFunction: null,
  standalone: false,
  title: '',
  helpDisabled: true
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJzdGFuZGFsb25lIiwiZ3JvdXBOYW1lTGFiZWwiLCJncm91cE5hbWVQbGFjZUhvbGRlciIsImdyb3VwTmFtZUNoYW5nZUhhbmRsZXIiLCJzZWxlY3RlZEl0ZW1MaXN0TGFiZWwiLCJzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW1vdmVIYW5kbGVyIiwiZ2V0Q2FuU2VsZWN0U3RhdHVzIiwiaXNHcm91cE5hbWUiLCJTdHJpbmciLCJ0cmltIiwiY291bnQiLCJmb3JFYWNoIiwia2V5IiwiZ2V0Q2hlY2tlZEl0ZW1zQ291bnQiLCJnZXRDaGVja2VkT3V0cHV0IiwiY2hlY2tlZEl0ZW1IYXNoTGlzdCIsImNoZWNrZWRPdXRwdXQiLCJyZXN1bHRMaXN0IiwiY2hlY2tlZCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWRJdGVtcyIsImNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzIiwibGlzdEhhc2giLCJwcmVDaGVja0l0ZW1zIiwiaWQiLCJnZXRDaGVja2VkIiwibmV3VmFsdWUiLCJzZXRTdGF0ZSIsImNhblNlbGVjdCIsImNhbmNlbEhhbmRsZXIiLCJvbkNhbmNlbCIsInNlbGVjdEhhbmRsZXIiLCJFcnJvciIsImFsbENoZWNrZWRJdGVtcyIsIm9uU2VsZWN0IiwiZ2V0SWQiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwiYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkIiwib25DaGVja0xpc3RDaGFuZ2VkIiwic2hvdyIsInNob3dJbk1vZGFsIiwidmlzaWJsZSIsIm9uSGVscCIsImJ0blNlbGVjdExhYmVsIiwiYnRuQ2FuY2VsTGFiZWwiLCJoZWxwRGlzYWJsZWQiLCJzZXRQcmVjaGVja2VkSXRlbXMiLCJwcmVDaGVja2VkSXRlbXMiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7OytlQWRBOztBQWlCQSxTQUFTQSwyQkFBVCxDQUFxQ0MsS0FBckMsRUFBNEM7QUFDMUMsTUFBTUMsaUJBQWlCQyxPQUFPQyxJQUFQLENBQVlILEtBQVosQ0FBdkI7O0FBRUEsTUFBSUMsZUFBZUcsTUFBZixLQUEwQixDQUE5QixFQUFpQyxPQUFPLElBQVA7O0FBRWpDLFNBQU9KLE1BQU1DLGVBQWUsQ0FBZixDQUFOLENBQVA7QUFDRDs7SUFFb0JJLHFCOzs7QUFDbkIsaUNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFnQm5CQyx5QkFoQm1CLEdBZ0JTO0FBQUEsYUFBTSxHQUFOO0FBQUEsS0FoQlQ7O0FBQUEsVUFrQm5CQyxrQkFsQm1CLEdBa0JFLFlBQU07QUFDekIsVUFBTUMsUUFB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QUFJWDVCLGdEQUpXO0FBS1h1RCw4QkFBd0IsTUFBSzNELHlCQUFMLEVBTGI7QUFNWGdFLGVBQVM7QUFORSxLQUFiO0FBTmlCO0FBY2xCOztrQ0FxTERPLE0scUJBQVM7QUFDUCxXQUFPLEtBQUt4RSxLQUFMLENBQVdnRSxXQUFYLElBQTBCLENBQUMsS0FBS2hFLEtBQUwsQ0FBV3VCLFVBQXRDLEdBQW1ELEtBQUt5QyxXQUFMLEVBQW5ELEdBQXdFLEtBQUtELElBQUwsRUFBL0U7QUFDRCxHOzs7RUF0TWdELGdCQUFNVSxhOztrQkFBcEMxRSxxQjs7O0FBaU9yQkEsc0JBQXNCMkUsWUFBdEIsR0FBcUM7QUFDbkNwQixZQUFVLG9CQUFNLENBQUUsQ0FEaUI7QUFFbkNRLHNCQUFvQiw4QkFBTSxDQUFFLENBRk87QUFHbkNKLFlBQVUsb0JBQU0sQ0FBRSxDQUhpQjtBQUluQ1EsVUFBUSxrQkFBTSxDQUFFLENBSm1CO0FBS25DRixlQUFhLElBTHNCO0FBTW5DOUMsWUFBVSxLQU55QjtBQU9uQ2lELGtCQUFnQixRQVBtQjtBQVFuQ0Msa0JBQWdCLFFBUm1CO0FBU25DekQsYUFBVyxFQVR3QjtBQVVuQ2Esa0JBQWdCLFlBVm1CO0FBV25DQyx3QkFBc0IsMkJBWGE7QUFZbkNOLDBCQUF3QixJQVpXO0FBYW5Db0QsbUJBQWlCLElBYmtCO0FBY25DbEQscUJBQW1CLFdBZGdCO0FBZW5DQyxpQkFBZSxJQWZvQjtBQWdCbkNLLHlCQUF1QixnQkFoQlk7QUFpQm5DQyw4QkFBNEIsSUFqQk87QUFrQm5DTCxjQUFZLEtBbEJ1QjtBQW1CbkNQLFNBQU8sRUFuQjRCO0FBb0JuQ3FELGdCQUFjO0FBcEJxQixDQUFyQyIsImZpbGUiOiJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuaW1wb3J0IFZpZXdUb3BCYXIgZnJvbSAnLi90b3AtYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCBWaWV3VGFicyBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcclxuaW1wb3J0IFNlbGVjdGVkSXRlbXMgZnJvbSAnLi9zZWxlY3RlZC1pdGVtcyc7XHJcbmltcG9ydCBHcm91cE5hbWUgZnJvbSAnLi9ncm91cC1uYW1lJztcclxuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xyXG5pbXBvcnQgY2FsY3VsYXRlR3JvdXBOYW1lIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dyb3VwLW5hbWUtY2FsY3VsYXRpb24nO1xyXG5cclxuaW1wb3J0ICcuL3ZpZXcuc2Nzcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KGxpc3RzKSB7XHJcbiAgY29uc3QgZGF0YVNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhsaXN0cyk7XHJcblxyXG4gIGlmIChkYXRhU291cmNlS2V5cy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gbGlzdHNbZGF0YVNvdXJjZUtleXNbMF1dO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJvcHMucHJlQ2hlY2tlZEl0ZW1zKTtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3RzID0gdGhpcy5jcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyhwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMocHJvcHMuZ3JvdXBOYW1lLCBjaGVja2VkSXRlbUhhc2hMaXN0cyksXHJcbiAgICAgIGdyb3VwTmFtZTogcHJvcHMuZ3JvdXBOYW1lLFxyXG4gICAgICBncm91cE5hbWVDaGFuZ2VkQnlVc2VyOiBwcm9wcy5ncm91cE5hbWUudHJpbSgpICE9PSAnJyxcclxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHMsXHJcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiAnMCc7XHJcblxyXG4gIGdldExhc3RVcGRhdGVTdGFtcCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHN0YW1wID0gT2JqZWN0XHJcbiAgICAgIC5rZXlzKHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpXHJcbiAgICAgIC5tYXAoaSA9PiB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzW2ldLmdldExhc3RVcGRhdGVTdGFtcCgpKVxyXG4gICAgICAuam9pbignLScpO1xyXG5cclxuICAgIHJldHVybiBzdGFtcDtcclxuICB9XHJcblxyXG4gIGdldEdyb3VwTmFtZSA9IChoYXNoTGlzdCkgPT4ge1xyXG4gICAgY29uc3QgeyBncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICByZXR1cm4gY2FsY3VsYXRlR3JvdXBOYW1lKGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciwgaGFzaExpc3QpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGxpc3RzSGFzaEFycmF5ID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcclxuICAgIGNvbnN0IHRhYnNJdGVtcyA9IFt7XHJcbiAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyOiB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcixcclxuICAgIH1dO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWJzXCI+XHJcbiAgICAgICAgICA8Vmlld1RhYnNcclxuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XHJcbiAgICAgICAgICAgIGl0ZW1zPXt0YWJzSXRlbXN9XHJcbiAgICAgICAgICAgIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMuY2hlY2tMaXN0Q2hhbmdlSGFuZGxlcn1cclxuICAgICAgICAgICAgaGlkZVNpbmdsZVRhYlxyXG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cclxuICAgICAgICAgICAgc2VhcmNoVG9vbHRpcD17dGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1jb250YWluZXJcIj5cclxuICAgICAgICAgIHshdGhpcy5wcm9wcy5zdGFuZGFsb25lICYmXHJcbiAgICAgICAgICA8R3JvdXBOYW1lXHJcbiAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLmdyb3VwTmFtZUxhYmVsfVxyXG4gICAgICAgICAgICBwbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5ncm91cE5hbWVQbGFjZUhvbGRlcn1cclxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlPXt0aGlzLnN0YXRlLmdyb3VwTmFtZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlcn1cclxuICAgICAgICAgIC8+fVxyXG4gICAgICAgICAgPFNlbGVjdGVkSXRlbXNcclxuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XHJcbiAgICAgICAgICAgIGxpc3RMYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1MaXN0TGFiZWx9XHJcbiAgICAgICAgICAgIGNoZWNrZWRJdGVtTGlzdHM9e09iamVjdC5rZXlzKGxpc3RzSGFzaEFycmF5KS5tYXAoaSA9PiBsaXN0c0hhc2hBcnJheVtpXSl9XHJcbiAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgICAgICAgb25JdGVtUmVtb3ZlPXt0aGlzLml0ZW1SZW1vdmVIYW5kbGVyfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FuU2VsZWN0U3RhdHVzID0gKGdyb3VwTmFtZSwgbGlzdHMpID0+IHtcclxuICAgIGNvbnN0IGlzR3JvdXBOYW1lID0gU3RyaW5nKGdyb3VwTmFtZSkudHJpbSgpICE9PSAnJztcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBPYmplY3Qua2V5cyhsaXN0cykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGNvdW50ICs9IGxpc3RzW2tleV0uZ2V0Q2hlY2tlZEl0ZW1zQ291bnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpc0dyb3VwTmFtZSAmJiBjb3VudCA+IDA7XHJcbiAgfVxyXG5cclxuICBnZXRDaGVja2VkT3V0cHV0ID0gKCkgPT4ge1xyXG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKTtcclxuICAgIGlmICghY2hlY2tlZEl0ZW1IYXNoTGlzdCkgcmV0dXJuIFtdO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRPdXRwdXQoKTtcclxuICAgIGNvbnN0IHJlc3VsdExpc3QgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdExpc3Q7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XHJcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xyXG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XHJcblxyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRBbGxDaGVja2VkSXRlbXMoKTtcclxuXHJcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSAoZGF0YVNvdXJjZVByb3ZpZGVyKSA9PiB7XHJcbiAgICBjb25zdCBsaXN0SGFzaCA9IHt9O1xyXG5cclxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5wcmVDaGVja0l0ZW1zKCk7XHJcbiAgICBsaXN0SGFzaFtkYXRhU291cmNlUHJvdmlkZXIuaWRdID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcclxuXHJcbiAgICByZXR1cm4gbGlzdEhhc2g7XHJcbiAgfVxyXG5cclxuICBncm91cE5hbWVDaGFuZ2VIYW5kbGVyID0gKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhuZXdWYWx1ZSwgdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyksXHJcbiAgICAgIGdyb3VwTmFtZTogbmV3VmFsdWUsXHJcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHRydWUsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZ3JvdXBOYW1lLnRyaW0oKSA9PT0gJycpIHRocm93IG5ldyBFcnJvcignU3RhdGUgZ3JvdXBOYW1lIGlzIGVtcHR5Jyk7XHJcblxyXG4gICAgY29uc3QgYWxsQ2hlY2tlZEl0ZW1zID0gdGhpcy5nZXRBbGxDaGVja2VkSXRlbXMoKTtcclxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcclxuXHJcbiAgICB0aGlzLnByb3BzXHJcbiAgICAgIC5vblNlbGVjdCh0aGlzLnN0YXRlLmdyb3VwTmFtZSwgYWxsQ2hlY2tlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KTtcclxuICB9XHJcblxyXG4gIGNoZWNrTGlzdENoYW5nZUhhbmRsZXIgPSAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkgPT4ge1xyXG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3QpIHtcclxuICAgICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xyXG4gICAgICBsaXN0c1tjaGVja2VkSXRlbUhhc2hMaXN0LmdldElkKCldID0gY2hlY2tlZEl0ZW1IYXNoTGlzdDtcclxuICAgICAgLyogR2V0dGluZyBncm91cCBuYW1lIGFmdGVyIGxpc3RzIGNoYW5naW5nICovXHJcbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxyXG4gICAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzOiBsaXN0cyxcclxuICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBpdGVtUmVtb3ZlSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcclxuICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXHJcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBhZnRlckNoZWNrTGlzdENoYW5nZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gdGhpcy5nZXRDaGVja2VkT3V0cHV0KCk7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlZChyZXN1bHRMaXN0KTtcclxuICB9XHJcblxyXG4gIHNob3cgPSAoKSA9PiB0aGlzLmdldENvbnRlbnQoKTtcclxuXHJcbiAgc2hvd0luTW9kYWwgPSAoKSA9PiAoXHJcbiAgICA8TW9kYWxcclxuICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXctZGlhbG9nXCJcclxuICAgICAgc2hvdz17dGhpcy5zdGF0ZS52aXNpYmxlfVxyXG4gICAgICBvbkhpZGU9e3RoaXMuY2FuY2VsSGFuZGxlcn1cclxuICAgICAga2V5Ym9hcmQ9e2ZhbHNlfVxyXG4gICAgICBiYWNrZHJvcD1cInN0YXRpY1wiXHJcbiAgICA+XHJcbiAgICAgIDxNb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgPFZpZXdUb3BCYXJcclxuICAgICAgICAgIHNlbGVjdERpc2FibGVkPXshdGhpcy5zdGF0ZS5jYW5TZWxlY3R9XHJcbiAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX1cclxuICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLmNhbmNlbEhhbmRsZXJ9XHJcbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5zZWxlY3RIYW5kbGVyfVxyXG4gICAgICAgICAgb25IZWxwPXt0aGlzLnByb3BzLm9uSGVscH1cclxuICAgICAgICAgIGJ0blNlbGVjdExhYmVsPXt0aGlzLnByb3BzLmJ0blNlbGVjdExhYmVsfVxyXG4gICAgICAgICAgYnRuQ2FuY2VsTGFiZWw9e3RoaXMucHJvcHMuYnRuQ2FuY2VsTGFiZWx9XHJcbiAgICAgICAgICBoZWxwRGlzYWJsZWQ9e3RoaXMucHJvcHMuaGVscERpc2FibGVkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICB7dGhpcy5nZXRDb250ZW50KCl9XHJcbiAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgIDwvTW9kYWw+XHJcbiAgKTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvd0luTW9kYWwgJiYgIXRoaXMucHJvcHMuc3RhbmRhbG9uZSA/IHRoaXMuc2hvd0luTW9kYWwoKSA6IHRoaXMuc2hvdygpO1xyXG4gIH1cclxufVxyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LnByb3BUeXBlcyA9IHtcclxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcclxuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcclxuICBzaG93SW5Nb2RhbDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgdGl0bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgYnRuU2VsZWN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgYnRuQ2FuY2VsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGdyb3VwTmFtZUxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXHJcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBzdGFuZGFsb25lOiBQcm9wVHlwZXMuYm9vbCxcclxuICBoZWxwRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LmRlZmF1bHRQcm9wcyA9IHtcclxuICBvbkNhbmNlbDogKCkgPT4ge30sXHJcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiAoKSA9PiB7fSxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgb25IZWxwOiAoKSA9PiB7fSxcclxuICBzaG93SW5Nb2RhbDogdHJ1ZSxcclxuICBhbGxMYWJlbDogJ0FsbCcsXHJcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxyXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcclxuICBncm91cE5hbWU6ICcnLFxyXG4gIGdyb3VwTmFtZUxhYmVsOiAnR3JvdXAgbmFtZScsXHJcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6ICdQbGVhc2UsIGZpbGwgYSBncm91cCBuYW1lJyxcclxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXHJcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcclxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXHJcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgc3RhbmRhbG9uZTogZmFsc2UsXHJcbiAgdGl0bGU6ICcnLFxyXG4gIGhlbHBEaXNhYmxlZDogdHJ1ZSxcclxufTtcclxuIl19