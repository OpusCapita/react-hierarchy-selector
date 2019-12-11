function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-unused-state */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import ViewTopBar from './top-bar.component';
import ViewTabs from './tabs.component';
import SelectedItems from './selected-items';
import GroupName from './group-name';
import { preCheckedItemsListShape } from '../../types';
import { dataSourceProviderType } from '../../services/types';
import calculateGroupName from '../../services/group-name-calculation';

import './view.scss';

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

      return calculateGroupName(groupName, groupNameChangedByUser, hashList);
    };

    _this.getContent = function () {
      var listsHashArray = _this.state.checkedItemHashLists;
      var tabsItems = [{
        title: '',
        dataSourceProvider: _this.props.dataSourceProvider
      }];

      return React.createElement(
        'div',
        { className: 'oc-hierarchy-selector-view' },
        React.createElement(
          'div',
          { className: 'oc-hierarchy-selector-tabs' },
          React.createElement(ViewTabs, {
            allLabel: _this.props.allLabel,
            items: tabsItems,
            listItemRenderFunction: _this.props.listItemRenderFunction,
            onCheckListChange: _this.checkListChangeHandler,
            hideSingleTab: true,
            searchPlaceHolder: _this.props.searchPlaceHolder,
            searchTooltip: _this.props.searchTooltip
          })
        ),
        React.createElement(
          'div',
          { className: 'oc-hierarchy-selector-selected-container' },
          !_this.props.standalone && !_this.props.hideGroupNameInput && React.createElement(GroupName, {
            label: _this.props.groupNameLabel,
            placeHolder: _this.props.groupNamePlaceHolder,
            initialValue: _this.state.groupName,
            onChange: _this.groupNameChangeHandler
          }),
          React.createElement(SelectedItems, {
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
      return React.createElement(
        Modal,
        {
          dialogClassName: 'oc-hierarchy-selector-view-dialog',
          show: _this.state.visible,
          onHide: _this.cancelHandler,
          keyboard: false,
          backdrop: 'static'
        },
        React.createElement(
          Modal.Header,
          null,
          React.createElement(ViewTopBar, {
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
        React.createElement(
          Modal.Body,
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
}(React.PureComponent);

export { HierarchySelectorView as default };


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJWaWV3VG9wQmFyIiwiVmlld1RhYnMiLCJTZWxlY3RlZEl0ZW1zIiwiR3JvdXBOYW1lIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsImNhbGN1bGF0ZUdyb3VwTmFtZSIsImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJzdGFuZGFsb25lIiwiaGlkZUdyb3VwTmFtZUlucHV0IiwiZ3JvdXBOYW1lTGFiZWwiLCJncm91cE5hbWVQbGFjZUhvbGRlciIsImdyb3VwTmFtZUNoYW5nZUhhbmRsZXIiLCJzZWxlY3RlZEl0ZW1MaXN0TGFiZWwiLCJzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW1vdmVIYW5kbGVyIiwiZ2V0Q2FuU2VsZWN0U3RhdHVzIiwiaXNDbGVhcmFibGUiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsImZsYWdzIiwib25TZWxlY3QiLCJhbGxDaGVja2VkSXRlbXMiLCJFcnJvciIsImdldElkIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsImFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCIsIm9uQ2hlY2tMaXN0Q2hhbmdlZCIsInNob3ciLCJzaG93SW5Nb2RhbCIsInZpc2libGUiLCJvbkhlbHAiLCJidG5TZWxlY3RMYWJlbCIsImJ0bkNhbmNlbExhYmVsIiwiaGVscERpc2FibGVkIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwicHJlQ2hlY2tlZEl0ZW1zIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLGlCQUF0Qjs7QUFFQSxPQUFPQyxVQUFQLE1BQXVCLHFCQUF2QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsa0JBQXJCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixrQkFBMUI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLGNBQXRCO0FBQ0EsU0FBU0Msd0JBQVQsUUFBeUMsYUFBekM7QUFDQSxTQUFTQyxzQkFB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VUFBdEMsR0FBbUQsS0FBSzRDLFdBQUwsRUFBbkQsR0FBd0UsS0FBS0QsSUFBTCxFQUEvRTtBQUNELEc7OztFQWhOZ0RuRixNQUFNNkYsYTs7U0FBcEM3RSxxQjs7O0FBNk9yQkEsc0JBQXNCOEUsWUFBdEIsR0FBcUM7QUFDbkNyQixZQUFVLG9CQUFNLENBQUUsQ0FEaUI7QUFFbkNTLHNCQUFvQiw4QkFBTSxDQUFFLENBRk87QUFHbkNOLFlBQVUsb0JBQU0sQ0FBRSxDQUhpQjtBQUluQ1UsVUFBUSxrQkFBTSxDQUFFLENBSm1CO0FBS25DRixlQUFhLElBTHNCO0FBTW5DakQsWUFBVSxLQU55QjtBQU9uQ29ELGtCQUFnQixRQVBtQjtBQVFuQ0Msa0JBQWdCLFFBUm1CO0FBU25DNUQsYUFBVyxFQVR3QjtBQVVuQ2Msa0JBQWdCLFlBVm1CO0FBV25DQyx3QkFBc0IsMkJBWGE7QUFZbkNQLDBCQUF3QixJQVpXO0FBYW5DdUQsbUJBQWlCLElBYmtCO0FBY25DckQscUJBQW1CLFdBZGdCO0FBZW5DQyxpQkFBZSxJQWZvQjtBQWdCbkNNLHlCQUF1QixnQkFoQlk7QUFpQm5DQyw4QkFBNEIsSUFqQk87QUFrQm5DTixjQUFZLEtBbEJ1QjtBQW1CbkNQLFNBQU8sRUFuQjRCO0FBb0JuQ3dELGdCQUFjLElBcEJxQjtBQXFCbkNoRCxzQkFBb0IsS0FyQmU7QUFzQm5DUSxlQUFhO0FBdEJzQixDQUFyQyIsImZpbGUiOiJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcblxuaW1wb3J0IFZpZXdUb3BCYXIgZnJvbSAnLi90b3AtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgVmlld1RhYnMgZnJvbSAnLi90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgU2VsZWN0ZWRJdGVtcyBmcm9tICcuL3NlbGVjdGVkLWl0ZW1zJztcbmltcG9ydCBHcm91cE5hbWUgZnJvbSAnLi9ncm91cC1uYW1lJztcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgY2FsY3VsYXRlR3JvdXBOYW1lIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dyb3VwLW5hbWUtY2FsY3VsYXRpb24nO1xuXG5pbXBvcnQgJy4vdmlldy5zY3NzJztcblxuXG5mdW5jdGlvbiBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QobGlzdHMpIHtcbiAgY29uc3QgZGF0YVNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhsaXN0cyk7XG5cbiAgaWYgKGRhdGFTb3VyY2VLZXlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIGxpc3RzW2RhdGFTb3VyY2VLZXlzWzBdXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcm9wcy5wcmVDaGVja2VkSXRlbXMpO1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3RzID0gdGhpcy5jcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyhwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMocHJvcHMuZ3JvdXBOYW1lLCBjaGVja2VkSXRlbUhhc2hMaXN0cyksXG4gICAgICBncm91cE5hbWU6IHByb3BzLmdyb3VwTmFtZSxcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHByb3BzLmdyb3VwTmFtZS50cmltKCkgIT09ICcnLFxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHMsXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIGdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiAnMCc7XG5cbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YW1wID0gT2JqZWN0XG4gICAgICAua2V5cyh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKVxuICAgICAgLm1hcChpID0+IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHNbaV0uZ2V0TGFzdFVwZGF0ZVN0YW1wKCkpXG4gICAgICAuam9pbignLScpO1xuXG4gICAgcmV0dXJuIHN0YW1wO1xuICB9XG5cbiAgZ2V0R3JvdXBOYW1lID0gKGhhc2hMaXN0KSA9PiB7XG4gICAgY29uc3QgeyBncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIGNhbGN1bGF0ZUdyb3VwTmFtZShncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIsIGhhc2hMaXN0KTtcbiAgfVxuXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdHNIYXNoQXJyYXkgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xuICAgIGNvbnN0IHRhYnNJdGVtcyA9IFt7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI6IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLFxuICAgIH1dO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFic1wiPlxuICAgICAgICAgIDxWaWV3VGFic1xuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICBpdGVtcz17dGFic0l0ZW1zfVxuICAgICAgICAgICAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMuY2hlY2tMaXN0Q2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgIGhpZGVTaW5nbGVUYWJcbiAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgICAgICAgc2VhcmNoVG9vbHRpcD17dGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1jb250YWluZXJcIj5cbiAgICAgICAgICB7KCF0aGlzLnByb3BzLnN0YW5kYWxvbmUgJiYgIXRoaXMucHJvcHMuaGlkZUdyb3VwTmFtZUlucHV0KSAmJlxuICAgICAgICAgIDxHcm91cE5hbWVcbiAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLmdyb3VwTmFtZUxhYmVsfVxuICAgICAgICAgICAgcGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuZ3JvdXBOYW1lUGxhY2VIb2xkZXJ9XG4gICAgICAgICAgICBpbml0aWFsVmFsdWU9e3RoaXMuc3RhdGUuZ3JvdXBOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAvPn1cbiAgICAgICAgICA8U2VsZWN0ZWRJdGVtc1xuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICBsaXN0TGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtTGlzdExhYmVsfVxuICAgICAgICAgICAgY2hlY2tlZEl0ZW1MaXN0cz17T2JqZWN0LmtleXMobGlzdHNIYXNoQXJyYXkpLm1hcChpID0+IGxpc3RzSGFzaEFycmF5W2ldKX1cbiAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIG9uSXRlbVJlbW92ZT17dGhpcy5pdGVtUmVtb3ZlSGFuZGxlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRDYW5TZWxlY3RTdGF0dXMgPSAoZ3JvdXBOYW1lLCBsaXN0cykgPT4ge1xuICAgIGNvbnN0IHsgaXNDbGVhcmFibGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNHcm91cE5hbWUgPSBTdHJpbmcoZ3JvdXBOYW1lKS50cmltKCkgIT09ICcnO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgT2JqZWN0LmtleXMobGlzdHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY291bnQgKz0gbGlzdHNba2V5XS5nZXRDaGVja2VkSXRlbXNDb3VudCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzQ2xlYXJhYmxlICYmIGNvdW50ID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNHcm91cE5hbWUgJiYgY291bnQgPiAwO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZE91dHB1dCA9ICgpID0+IHtcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKTtcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgcmV0dXJuIHJlc3VsdExpc3Q7XG4gIH1cblxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldEFsbENoZWNrZWRJdGVtcygpO1xuXG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtcztcbiAgfVxuXG4gIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzID0gKGRhdGFTb3VyY2VQcm92aWRlcikgPT4ge1xuICAgIGNvbnN0IGxpc3RIYXNoID0ge307XG5cbiAgICBkYXRhU291cmNlUHJvdmlkZXIucHJlQ2hlY2tJdGVtcygpO1xuICAgIGxpc3RIYXNoW2RhdGFTb3VyY2VQcm92aWRlci5pZF0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuXG4gICAgcmV0dXJuIGxpc3RIYXNoO1xuICB9XG5cbiAgZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciA9IChuZXdWYWx1ZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhuZXdWYWx1ZSwgdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyksXG4gICAgICBncm91cE5hbWU6IG5ld1ZhbHVlLFxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9XG5cbiAgc2VsZWN0SGFuZGxlciA9IChmbGFncykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBncm91cE5hbWUgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBhbGxDaGVja2VkSXRlbXMgPSB0aGlzLmdldEFsbENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcblxuICAgIC8vIElmIHRoZXJlJ3Mgc2VsZWN0ZWQgaXRlbXMsIGdyb3VwTmFtZSBjYW4ndCBiZSBlbXB0eVxuICAgIGlmIChhbGxDaGVja2VkSXRlbXMgJiYgYWxsQ2hlY2tlZEl0ZW1zLmxlbmd0aCA+IDAgJiYgZ3JvdXBOYW1lLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RhdGUgZ3JvdXBOYW1lIGlzIGVtcHR5Jyk7XG4gICAgfVxuXG4gICAgb25TZWxlY3QoZ3JvdXBOYW1lLCBhbGxDaGVja2VkSXRlbXMsIGNoZWNrZWRPdXRwdXQsIGZsYWdzKTtcbiAgfVxuXG4gIGNoZWNrTGlzdENoYW5nZUhhbmRsZXIgPSAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkgPT4ge1xuICAgIGlmIChjaGVja2VkSXRlbUhhc2hMaXN0KSB7XG4gICAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgICBsaXN0c1tjaGVja2VkSXRlbUhhc2hMaXN0LmdldElkKCldID0gY2hlY2tlZEl0ZW1IYXNoTGlzdDtcbiAgICAgIC8qIEdldHRpbmcgZ3JvdXAgbmFtZSBhZnRlciBsaXN0cyBjaGFuZ2luZyAqL1xuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxuICAgICAgICBjaGVja2VkSXRlbUhhc2hMaXN0czogbGlzdHMsXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcbiAgfVxuXG4gIGl0ZW1SZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBncm91cE5hbWUsXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICB9KTtcbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xuICB9XG5cbiAgYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdExpc3QgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlZChyZXN1bHRMaXN0KTtcbiAgfVxuXG4gIHNob3cgPSAoKSA9PiB0aGlzLmdldENvbnRlbnQoKTtcblxuICBzaG93SW5Nb2RhbCA9ICgpID0+IChcbiAgICA8TW9kYWxcbiAgICAgIGRpYWxvZ0NsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3LWRpYWxvZ1wiXG4gICAgICBzaG93PXt0aGlzLnN0YXRlLnZpc2libGV9XG4gICAgICBvbkhpZGU9e3RoaXMuY2FuY2VsSGFuZGxlcn1cbiAgICAgIGtleWJvYXJkPXtmYWxzZX1cbiAgICAgIGJhY2tkcm9wPVwic3RhdGljXCJcbiAgICA+XG4gICAgICA8TW9kYWwuSGVhZGVyPlxuICAgICAgICA8Vmlld1RvcEJhclxuICAgICAgICAgIHNlbGVjdERpc2FibGVkPXshdGhpcy5zdGF0ZS5jYW5TZWxlY3R9XG4gICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2FuY2VsSGFuZGxlcn1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5zZWxlY3RIYW5kbGVyfVxuICAgICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XG4gICAgICAgICAgYnRuU2VsZWN0TGFiZWw9e3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XG4gICAgICAgICAgYnRuQ2FuY2VsTGFiZWw9e3RoaXMucHJvcHMuYnRuQ2FuY2VsTGFiZWx9XG4gICAgICAgICAgaGVscERpc2FibGVkPXt0aGlzLnByb3BzLmhlbHBEaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgIHt0aGlzLmdldENvbnRlbnQoKX1cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICA8L01vZGFsPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG93SW5Nb2RhbCAmJiAhdGhpcy5wcm9wcy5zdGFuZGFsb25lID8gdGhpcy5zaG93SW5Nb2RhbCgpIDogdGhpcy5zaG93KCk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxuICBzaG93SW5Nb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuU2VsZWN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGdyb3VwTmFtZUxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHN0YW5kYWxvbmU6IFByb3BUeXBlcy5ib29sLFxuICBoZWxwRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBoaWRlR3JvdXBOYW1lSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuICBpc0NsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcuZGVmYXVsdFByb3BzID0ge1xuICBvbkNhbmNlbDogKCkgPT4ge30sXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25IZWxwOiAoKSA9PiB7fSxcbiAgc2hvd0luTW9kYWw6IHRydWUsXG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXG4gIGdyb3VwTmFtZTogJycsXG4gIGdyb3VwTmFtZUxhYmVsOiAnR3JvdXAgbmFtZScsXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiAnUGxlYXNlLCBmaWxsIGEgZ3JvdXAgbmFtZScsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzdGFuZGFsb25lOiBmYWxzZSxcbiAgdGl0bGU6ICcnLFxuICBoZWxwRGlzYWJsZWQ6IHRydWUsXG4gIGhpZGVHcm91cE5hbWVJbnB1dDogZmFsc2UsXG4gIGlzQ2xlYXJhYmxlOiBmYWxzZSxcbn07XG4iXX0=