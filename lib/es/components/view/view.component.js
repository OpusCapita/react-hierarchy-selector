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
          !_this.props.standalone && React.createElement(GroupName, {
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
  helpDisabled: true
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJWaWV3VG9wQmFyIiwiVmlld1RhYnMiLCJTZWxlY3RlZEl0ZW1zIiwiR3JvdXBOYW1lIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsImNhbGN1bGF0ZUdyb3VwTmFtZSIsImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJzdGFuZGFsb25lIiwiZ3JvdXBOYW1lTGFiZWwiLCJncm91cE5hbWVQbGFjZUhvbGRlciIsImdyb3VwTmFtZUNoYW5nZUhhbmRsZXIiLCJzZWxlY3RlZEl0ZW1MaXN0TGFiZWwiLCJzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW1vdmVIYW5kbGVyIiwiZ2V0Q2FuU2VsZWN0U3RhdHVzIiwiaXNHcm91cE5hbWUiLCJTdHJpbmciLCJ0cmltIiwiY291bnQiLCJmb3JFYWNoIiwia2V5IiwiZ2V0Q2hlY2tlZEl0ZW1zQ291bnQiLCJnZXRDaGVja2VkT3V0cHV0IiwiY2hlY2tlZEl0ZW1IYXNoTGlzdCIsImNoZWNrZWRPdXRwdXQiLCJyZXN1bHRMaXN0IiwiY2hlY2tlZCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWRJdGVtcyIsImNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzIiwibGlzdEhhc2giLCJwcmVDaGVja0l0ZW1zIiwiaWQiLCJnZXRDaGVja2VkIiwibmV3VmFsdWUiLCJzZXRTdGF0ZSIsImNhblNlbGVjdCIsImNhbmNlbEhhbmRsZXIiLCJvbkNhbmNlbCIsInNlbGVjdEhhbmRsZXIiLCJFcnJvciIsImFsbENoZWNrZWRJdGVtcyIsIm9uU2VsZWN0IiwiZ2V0SWQiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwiYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkIiwib25DaGVja0xpc3RDaGFuZ2VkIiwic2hvdyIsInNob3dJbk1vZGFsIiwidmlzaWJsZSIsIm9uSGVscCIsImJ0blNlbGVjdExhYmVsIiwiYnRuQ2FuY2VsTGFiZWwiLCJoZWxwRGlzYWJsZWQiLCJzZXRQcmVjaGVja2VkSXRlbXMiLCJwcmVDaGVja2VkSXRlbXMiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsUUFBc0IsaUJBQXRCOztBQUVBLE9BQU9DLFVBQVAsTUFBdUIscUJBQXZCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixrQkFBckI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLGtCQUExQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxTQUFTQyx3QkFBVCxRQUF5QyxhQUF6QztBQUNBLFNBQVNDLHNCQUFULFFBQXVDLHNCQUF2QztBQUNBLE9BQU9DLGtCQUFQLE1BQStCLHVDQUEv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QkFBZ0IsUUFSbUI7QUFTbkN6RCxhQUFXLEVBVHdCO0FBVW5DYSxrQkFBZ0IsWUFWbUI7QUFXbkNDLHdCQUFzQiwyQkFYYTtBQVluQ04sMEJBQXdCLElBWlc7QUFhbkNvRCxtQkFBaUIsSUFia0I7QUFjbkNsRCxxQkFBbUIsV0FkZ0I7QUFlbkNDLGlCQUFlLElBZm9CO0FBZ0JuQ0sseUJBQXVCLGdCQWhCWTtBQWlCbkNDLDhCQUE0QixJQWpCTztBQWtCbkNMLGNBQVksS0FsQnVCO0FBbUJuQ1AsU0FBTyxFQW5CNEI7QUFvQm5DcUQsZ0JBQWM7QUFwQnFCLENBQXJDIiwiZmlsZSI6InZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuXG5pbXBvcnQgVmlld1RvcEJhciBmcm9tICcuL3RvcC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBWaWV3VGFicyBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCBTZWxlY3RlZEl0ZW1zIGZyb20gJy4vc2VsZWN0ZWQtaXRlbXMnO1xuaW1wb3J0IEdyb3VwTmFtZSBmcm9tICcuL2dyb3VwLW5hbWUnO1xuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCBjYWxjdWxhdGVHcm91cE5hbWUgZnJvbSAnLi4vLi4vc2VydmljZXMvZ3JvdXAtbmFtZS1jYWxjdWxhdGlvbic7XG5cbmltcG9ydCAnLi92aWV3LnNjc3MnO1xuXG5cbmZ1bmN0aW9uIGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdChsaXN0cykge1xuICBjb25zdCBkYXRhU291cmNlS2V5cyA9IE9iamVjdC5rZXlzKGxpc3RzKTtcblxuICBpZiAoZGF0YVNvdXJjZUtleXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gbGlzdHNbZGF0YVNvdXJjZUtleXNbMF1dO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByb3BzLnByZUNoZWNrZWRJdGVtcyk7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSB0aGlzLmNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzKHByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhwcm9wcy5ncm91cE5hbWUsIGNoZWNrZWRJdGVtSGFzaExpc3RzKSxcbiAgICAgIGdyb3VwTmFtZTogcHJvcHMuZ3JvdXBOYW1lLFxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogcHJvcHMuZ3JvdXBOYW1lLnRyaW0oKSAhPT0gJycsXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0cyxcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCgpLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCA9ICgpID0+ICcwJztcblxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhbXAgPSBPYmplY3RcbiAgICAgIC5rZXlzKHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpXG4gICAgICAubWFwKGkgPT4gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0c1tpXS5nZXRMYXN0VXBkYXRlU3RhbXAoKSlcbiAgICAgIC5qb2luKCctJyk7XG5cbiAgICByZXR1cm4gc3RhbXA7XG4gIH1cblxuICBnZXRHcm91cE5hbWUgPSAoaGFzaExpc3QpID0+IHtcbiAgICBjb25zdCB7IGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gY2FsY3VsYXRlR3JvdXBOYW1lKGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciwgaGFzaExpc3QpO1xuICB9XG5cbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0c0hhc2hBcnJheSA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgY29uc3QgdGFic0l0ZW1zID0gW3tcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcjogdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIsXG4gICAgfV07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlld1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWJzXCI+XG4gICAgICAgICAgPFZpZXdUYWJzXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgIGl0ZW1zPXt0YWJzSXRlbXN9XG4gICAgICAgICAgICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICBvbkNoZWNrTGlzdENoYW5nZT17dGhpcy5jaGVja0xpc3RDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgaGlkZVNpbmdsZVRhYlxuICAgICAgICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XG4gICAgICAgICAgICBzZWFyY2hUb29sdGlwPXt0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHshdGhpcy5wcm9wcy5zdGFuZGFsb25lICYmXG4gICAgICAgICAgPEdyb3VwTmFtZVxuICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuZ3JvdXBOYW1lTGFiZWx9XG4gICAgICAgICAgICBwbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5ncm91cE5hbWVQbGFjZUhvbGRlcn1cbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZT17dGhpcy5zdGF0ZS5ncm91cE5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5ncm91cE5hbWVDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgIC8+fVxuICAgICAgICAgIDxTZWxlY3RlZEl0ZW1zXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgIGxpc3RMYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1MaXN0TGFiZWx9XG4gICAgICAgICAgICBjaGVja2VkSXRlbUxpc3RzPXtPYmplY3Qua2V5cyhsaXN0c0hhc2hBcnJheSkubWFwKGkgPT4gbGlzdHNIYXNoQXJyYXlbaV0pfVxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgb25JdGVtUmVtb3ZlPXt0aGlzLml0ZW1SZW1vdmVIYW5kbGVyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGdldENhblNlbGVjdFN0YXR1cyA9IChncm91cE5hbWUsIGxpc3RzKSA9PiB7XG4gICAgY29uc3QgaXNHcm91cE5hbWUgPSBTdHJpbmcoZ3JvdXBOYW1lKS50cmltKCkgIT09ICcnO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgT2JqZWN0LmtleXMobGlzdHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY291bnQgKz0gbGlzdHNba2V5XS5nZXRDaGVja2VkSXRlbXNDb3VudCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzR3JvdXBOYW1lICYmIGNvdW50ID4gMDtcbiAgfVxuXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcblxuICAgIHJldHVybiByZXN1bHRMaXN0O1xuICB9XG5cbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xuICAgIGlmICghY2hlY2tlZEl0ZW1IYXNoTGlzdCkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRBbGxDaGVja2VkSXRlbXMoKTtcblxuICAgIHJldHVybiBjaGVja2VkSXRlbXM7XG4gIH1cblxuICBjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyA9IChkYXRhU291cmNlUHJvdmlkZXIpID0+IHtcbiAgICBjb25zdCBsaXN0SGFzaCA9IHt9O1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnByZUNoZWNrSXRlbXMoKTtcbiAgICBsaXN0SGFzaFtkYXRhU291cmNlUHJvdmlkZXIuaWRdID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcblxuICAgIHJldHVybiBsaXN0SGFzaDtcbiAgfVxuXG4gIGdyb3VwTmFtZUNoYW5nZUhhbmRsZXIgPSAobmV3VmFsdWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMobmV3VmFsdWUsIHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxuICAgICAgZ3JvdXBOYW1lOiBuZXdWYWx1ZSxcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBjYW5jZWxIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfVxuXG4gIHNlbGVjdEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuZ3JvdXBOYW1lLnRyaW0oKSA9PT0gJycpIHRocm93IG5ldyBFcnJvcignU3RhdGUgZ3JvdXBOYW1lIGlzIGVtcHR5Jyk7XG5cbiAgICBjb25zdCBhbGxDaGVja2VkSXRlbXMgPSB0aGlzLmdldEFsbENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcblxuICAgIHRoaXMucHJvcHNcbiAgICAgIC5vblNlbGVjdCh0aGlzLnN0YXRlLmdyb3VwTmFtZSwgYWxsQ2hlY2tlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KTtcbiAgfVxuXG4gIGNoZWNrTGlzdENoYW5nZUhhbmRsZXIgPSAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkgPT4ge1xuICAgIGlmIChjaGVja2VkSXRlbUhhc2hMaXN0KSB7XG4gICAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgICBsaXN0c1tjaGVja2VkSXRlbUhhc2hMaXN0LmdldElkKCldID0gY2hlY2tlZEl0ZW1IYXNoTGlzdDtcbiAgICAgIC8qIEdldHRpbmcgZ3JvdXAgbmFtZSBhZnRlciBsaXN0cyBjaGFuZ2luZyAqL1xuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxuICAgICAgICBjaGVja2VkSXRlbUhhc2hMaXN0czogbGlzdHMsXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcbiAgfVxuXG4gIGl0ZW1SZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBncm91cE5hbWUsXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICB9KTtcbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xuICB9XG5cbiAgYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdExpc3QgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlZChyZXN1bHRMaXN0KTtcbiAgfVxuXG4gIHNob3cgPSAoKSA9PiB0aGlzLmdldENvbnRlbnQoKTtcblxuICBzaG93SW5Nb2RhbCA9ICgpID0+IChcbiAgICA8TW9kYWxcbiAgICAgIGRpYWxvZ0NsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3LWRpYWxvZ1wiXG4gICAgICBzaG93PXt0aGlzLnN0YXRlLnZpc2libGV9XG4gICAgICBvbkhpZGU9e3RoaXMuY2FuY2VsSGFuZGxlcn1cbiAgICAgIGtleWJvYXJkPXtmYWxzZX1cbiAgICAgIGJhY2tkcm9wPVwic3RhdGljXCJcbiAgICA+XG4gICAgICA8TW9kYWwuSGVhZGVyPlxuICAgICAgICA8Vmlld1RvcEJhclxuICAgICAgICAgIHNlbGVjdERpc2FibGVkPXshdGhpcy5zdGF0ZS5jYW5TZWxlY3R9XG4gICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2FuY2VsSGFuZGxlcn1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5zZWxlY3RIYW5kbGVyfVxuICAgICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XG4gICAgICAgICAgYnRuU2VsZWN0TGFiZWw9e3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XG4gICAgICAgICAgYnRuQ2FuY2VsTGFiZWw9e3RoaXMucHJvcHMuYnRuQ2FuY2VsTGFiZWx9XG4gICAgICAgICAgaGVscERpc2FibGVkPXt0aGlzLnByb3BzLmhlbHBEaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgIHt0aGlzLmdldENvbnRlbnQoKX1cbiAgICAgIDwvTW9kYWwuQm9keT5cbiAgICA8L01vZGFsPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG93SW5Nb2RhbCAmJiAhdGhpcy5wcm9wcy5zdGFuZGFsb25lID8gdGhpcy5zaG93SW5Nb2RhbCgpIDogdGhpcy5zaG93KCk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxuICBzaG93SW5Nb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuU2VsZWN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGdyb3VwTmFtZUxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHN0YW5kYWxvbmU6IFByb3BUeXBlcy5ib29sLFxuICBoZWxwRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25DYW5jZWw6ICgpID0+IHt9LFxuICBvbkNoZWNrTGlzdENoYW5nZWQ6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uSGVscDogKCkgPT4ge30sXG4gIHNob3dJbk1vZGFsOiB0cnVlLFxuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGJ0blNlbGVjdExhYmVsOiAnU2VsZWN0JyxcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxuICBncm91cE5hbWU6ICcnLFxuICBncm91cE5hbWVMYWJlbDogJ0dyb3VwIG5hbWUnLFxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogJ1BsZWFzZSwgZmlsbCBhIGdyb3VwIG5hbWUnLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBwcmVDaGVja2VkSXRlbXM6IG51bGwsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcbiAgc2VsZWN0ZWRJdGVtTGlzdExhYmVsOiAnU2VsZWN0ZWQgaXRlbXMnLFxuICBzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc3RhbmRhbG9uZTogZmFsc2UsXG4gIHRpdGxlOiAnJyxcbiAgaGVscERpc2FibGVkOiB0cnVlLFxufTtcbiJdfQ==