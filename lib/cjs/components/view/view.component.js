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
  helpDisabled: true
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJzdGFuZGFsb25lIiwiZ3JvdXBOYW1lTGFiZWwiLCJncm91cE5hbWVQbGFjZUhvbGRlciIsImdyb3VwTmFtZUNoYW5nZUhhbmRsZXIiLCJzZWxlY3RlZEl0ZW1MaXN0TGFiZWwiLCJzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW1vdmVIYW5kbGVyIiwiZ2V0Q2FuU2VsZWN0U3RhdHVzIiwiaXNHcm91cE5hbWUiLCJTdHJpbmciLCJ0cmltIiwiY291bnQiLCJmb3JFYWNoIiwia2V5IiwiZ2V0Q2hlY2tlZEl0ZW1zQ291bnQiLCJnZXRDaGVja2VkT3V0cHV0IiwiY2hlY2tlZEl0ZW1IYXNoTGlzdCIsImNoZWNrZWRPdXRwdXQiLCJyZXN1bHRMaXN0IiwiY2hlY2tlZCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWRJdGVtcyIsImNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzIiwibGlzdEhhc2giLCJwcmVDaGVja0l0ZW1zIiwiaWQiLCJnZXRDaGVja2VkIiwibmV3VmFsdWUiLCJzZXRTdGF0ZSIsImNhblNlbGVjdCIsImNhbmNlbEhhbmRsZXIiLCJvbkNhbmNlbCIsInNlbGVjdEhhbmRsZXIiLCJmbGFncyIsIkVycm9yIiwiYWxsQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3QiLCJnZXRJZCIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJhZnRlckNoZWNrTGlzdENoYW5nZWQiLCJvbkNoZWNrTGlzdENoYW5nZWQiLCJzaG93Iiwic2hvd0luTW9kYWwiLCJ2aXNpYmxlIiwib25IZWxwIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsImhlbHBEaXNhYmxlZCIsInNldFByZWNoZWNrZWRJdGVtcyIsInByZUNoZWNrZWRJdGVtcyIsInJlbmRlciIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7OzsrZUFkQTs7QUFpQkEsU0FBU0EsMkJBQVQsQ0FBcUNDLEtBQXJDLEVBQTRDO0FBQzFDLE1BQU1DLGlCQUFpQkMsT0FBT0MsSUFBUCxDQUFZSCxLQUFaLENBQXZCOztBQUVBLE1BQUlDLGVBQWVHLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUMsT0FBTyxJQUFQOztBQUVqQyxTQUFPSixNQUFNQyxlQUFlLENBQWYsQ0FBTixDQUFQO0FBQ0Q7O0lBRW9CSSxxQjs7O0FBQ25CLGlDQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBZ0JuQkMseUJBaEJtQixHQWdCUztBQUFBLGFBQU0sR0FBTjtBQUFBLEtBaEJUOztBQUFBLFVBa0JuQkMsa0JBbEJtQixHQWtCRSxZQUFN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YWN0L25vLXVudXNlZC1zdGF0ZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcblxuaW1wb3J0IFZpZXdUb3BCYXIgZnJvbSAnLi90b3AtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgVmlld1RhYnMgZnJvbSAnLi90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgU2VsZWN0ZWRJdGVtcyBmcm9tICcuL3NlbGVjdGVkLWl0ZW1zJztcbmltcG9ydCBHcm91cE5hbWUgZnJvbSAnLi9ncm91cC1uYW1lJztcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgY2FsY3VsYXRlR3JvdXBOYW1lIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dyb3VwLW5hbWUtY2FsY3VsYXRpb24nO1xuXG5pbXBvcnQgJy4vdmlldy5zY3NzJztcblxuXG5mdW5jdGlvbiBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QobGlzdHMpIHtcbiAgY29uc3QgZGF0YVNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhsaXN0cyk7XG5cbiAgaWYgKGRhdGFTb3VyY2VLZXlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIGxpc3RzW2RhdGFTb3VyY2VLZXlzWzBdXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcm9wcy5wcmVDaGVja2VkSXRlbXMpO1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3RzID0gdGhpcy5jcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyhwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMocHJvcHMuZ3JvdXBOYW1lLCBjaGVja2VkSXRlbUhhc2hMaXN0cyksXG4gICAgICBncm91cE5hbWU6IHByb3BzLmdyb3VwTmFtZSxcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHByb3BzLmdyb3VwTmFtZS50cmltKCkgIT09ICcnLFxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHMsXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIGdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiAnMCc7XG5cbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YW1wID0gT2JqZWN0XG4gICAgICAua2V5cyh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKVxuICAgICAgLm1hcChpID0+IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHNbaV0uZ2V0TGFzdFVwZGF0ZVN0YW1wKCkpXG4gICAgICAuam9pbignLScpO1xuXG4gICAgcmV0dXJuIHN0YW1wO1xuICB9XG5cbiAgZ2V0R3JvdXBOYW1lID0gKGhhc2hMaXN0KSA9PiB7XG4gICAgY29uc3QgeyBncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIGNhbGN1bGF0ZUdyb3VwTmFtZShncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIsIGhhc2hMaXN0KTtcbiAgfVxuXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdHNIYXNoQXJyYXkgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xuICAgIGNvbnN0IHRhYnNJdGVtcyA9IFt7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI6IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLFxuICAgIH1dO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFic1wiPlxuICAgICAgICAgIDxWaWV3VGFic1xuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICBpdGVtcz17dGFic0l0ZW1zfVxuICAgICAgICAgICAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMuY2hlY2tMaXN0Q2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgIGhpZGVTaW5nbGVUYWJcbiAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgICAgICAgc2VhcmNoVG9vbHRpcD17dGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1jb250YWluZXJcIj5cbiAgICAgICAgICB7IXRoaXMucHJvcHMuc3RhbmRhbG9uZSAmJlxuICAgICAgICAgIDxHcm91cE5hbWVcbiAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLmdyb3VwTmFtZUxhYmVsfVxuICAgICAgICAgICAgcGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuZ3JvdXBOYW1lUGxhY2VIb2xkZXJ9XG4gICAgICAgICAgICBpbml0aWFsVmFsdWU9e3RoaXMuc3RhdGUuZ3JvdXBOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAvPn1cbiAgICAgICAgICA8U2VsZWN0ZWRJdGVtc1xuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICBsaXN0TGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtTGlzdExhYmVsfVxuICAgICAgICAgICAgY2hlY2tlZEl0ZW1MaXN0cz17T2JqZWN0LmtleXMobGlzdHNIYXNoQXJyYXkpLm1hcChpID0+IGxpc3RzSGFzaEFycmF5W2ldKX1cbiAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIG9uSXRlbVJlbW92ZT17dGhpcy5pdGVtUmVtb3ZlSGFuZGxlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRDYW5TZWxlY3RTdGF0dXMgPSAoZ3JvdXBOYW1lLCBsaXN0cykgPT4ge1xuICAgIGNvbnN0IGlzR3JvdXBOYW1lID0gU3RyaW5nKGdyb3VwTmFtZSkudHJpbSgpICE9PSAnJztcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIE9iamVjdC5rZXlzKGxpc3RzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvdW50ICs9IGxpc3RzW2tleV0uZ2V0Q2hlY2tlZEl0ZW1zQ291bnQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpc0dyb3VwTmFtZSAmJiBjb3VudCA+IDA7XG4gIH1cblxuICBnZXRDaGVja2VkT3V0cHV0ID0gKCkgPT4ge1xuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xuICAgIGlmICghY2hlY2tlZEl0ZW1IYXNoTGlzdCkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuICAgIGNvbnN0IHJlc3VsdExpc3QgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XG5cbiAgICByZXR1cm4gcmVzdWx0TGlzdDtcbiAgfVxuXG4gIGdldEFsbENoZWNrZWRJdGVtcyA9ICgpID0+IHtcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKTtcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XG5cbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1zO1xuICB9XG5cbiAgY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSAoZGF0YVNvdXJjZVByb3ZpZGVyKSA9PiB7XG4gICAgY29uc3QgbGlzdEhhc2ggPSB7fTtcblxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5wcmVDaGVja0l0ZW1zKCk7XG4gICAgbGlzdEhhc2hbZGF0YVNvdXJjZVByb3ZpZGVyLmlkXSA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG5cbiAgICByZXR1cm4gbGlzdEhhc2g7XG4gIH1cblxuICBncm91cE5hbWVDaGFuZ2VIYW5kbGVyID0gKG5ld1ZhbHVlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKG5ld1ZhbHVlLCB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKSxcbiAgICAgIGdyb3VwTmFtZTogbmV3VmFsdWUsXG4gICAgICBncm91cE5hbWVDaGFuZ2VkQnlVc2VyOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsSGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH1cblxuICBzZWxlY3RIYW5kbGVyID0gKGZsYWdzKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuZ3JvdXBOYW1lLnRyaW0oKSA9PT0gJycpIHRocm93IG5ldyBFcnJvcignU3RhdGUgZ3JvdXBOYW1lIGlzIGVtcHR5Jyk7XG5cbiAgICBjb25zdCBhbGxDaGVja2VkSXRlbXMgPSB0aGlzLmdldEFsbENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcblxuICAgIHRoaXMucHJvcHNcbiAgICAgIC5vblNlbGVjdCh0aGlzLnN0YXRlLmdyb3VwTmFtZSwgYWxsQ2hlY2tlZEl0ZW1zLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBjaGVja0xpc3RDaGFuZ2VIYW5kbGVyID0gKGNoZWNrZWRJdGVtSGFzaExpc3QpID0+IHtcbiAgICBpZiAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkge1xuICAgICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xuICAgICAgbGlzdHNbY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRJZCgpXSA9IGNoZWNrZWRJdGVtSGFzaExpc3Q7XG4gICAgICAvKiBHZXR0aW5nIGdyb3VwIG5hbWUgYWZ0ZXIgbGlzdHMgY2hhbmdpbmcgKi9cbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhncm91cE5hbWUsIGxpc3RzKSxcbiAgICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHM6IGxpc3RzLFxuICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XG4gIH1cblxuICBpdGVtUmVtb3ZlSGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZ3JvdXBOYW1lLFxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhncm91cE5hbWUsIGxpc3RzKSxcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgfSk7XG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcbiAgfVxuXG4gIGFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCA9ICgpID0+IHtcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gdGhpcy5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZWQocmVzdWx0TGlzdCk7XG4gIH1cblxuICBzaG93ID0gKCkgPT4gdGhpcy5nZXRDb250ZW50KCk7XG5cbiAgc2hvd0luTW9kYWwgPSAoKSA9PiAoXG4gICAgPE1vZGFsXG4gICAgICBkaWFsb2dDbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlldy1kaWFsb2dcIlxuICAgICAgc2hvdz17dGhpcy5zdGF0ZS52aXNpYmxlfVxuICAgICAgb25IaWRlPXt0aGlzLmNhbmNlbEhhbmRsZXJ9XG4gICAgICBrZXlib2FyZD17ZmFsc2V9XG4gICAgICBiYWNrZHJvcD1cInN0YXRpY1wiXG4gICAgPlxuICAgICAgPE1vZGFsLkhlYWRlcj5cbiAgICAgICAgPFZpZXdUb3BCYXJcbiAgICAgICAgICBzZWxlY3REaXNhYmxlZD17IXRoaXMuc3RhdGUuY2FuU2VsZWN0fVxuICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfVxuICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLmNhbmNlbEhhbmRsZXJ9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMuc2VsZWN0SGFuZGxlcn1cbiAgICAgICAgICBvbkhlbHA9e3RoaXMucHJvcHMub25IZWxwfVxuICAgICAgICAgIGJ0blNlbGVjdExhYmVsPXt0aGlzLnByb3BzLmJ0blNlbGVjdExhYmVsfVxuICAgICAgICAgIGJ0bkNhbmNlbExhYmVsPXt0aGlzLnByb3BzLmJ0bkNhbmNlbExhYmVsfVxuICAgICAgICAgIGhlbHBEaXNhYmxlZD17dGhpcy5wcm9wcy5oZWxwRGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICB7dGhpcy5nZXRDb250ZW50KCl9XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgPC9Nb2RhbD5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvd0luTW9kYWwgJiYgIXRoaXMucHJvcHMuc3RhbmRhbG9uZSA/IHRoaXMuc2hvd0luTW9kYWwoKSA6IHRoaXMuc2hvdygpO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2hvd0luTW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBncm91cE5hbWVMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gIHNlbGVjdGVkSXRlbUxpc3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBzdGFuZGFsb25lOiBQcm9wVHlwZXMuYm9vbCxcbiAgaGVscERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICBzaG93SW5Nb2RhbDogdHJ1ZSxcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcbiAgZ3JvdXBOYW1lOiAnJyxcbiAgZ3JvdXBOYW1lTGFiZWw6ICdHcm91cCBuYW1lJyxcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6ICdQbGVhc2UsIGZpbGwgYSBncm91cCBuYW1lJyxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIHNlYXJjaFRvb2x0aXA6IG51bGwsXG4gIHNlbGVjdGVkSXRlbUxpc3RMYWJlbDogJ1NlbGVjdGVkIGl0ZW1zJyxcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHN0YW5kYWxvbmU6IGZhbHNlLFxuICB0aXRsZTogJycsXG4gIGhlbHBEaXNhYmxlZDogdHJ1ZSxcbn07XG4iXX0=