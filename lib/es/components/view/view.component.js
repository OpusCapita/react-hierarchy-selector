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
            searchPlaceHolder: _this.props.searchPlaceHolder
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
            btnSelectLabel: _this.props.btnSelectLabel,
            btnCancelLabel: _this.props.btnCancelLabel
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJWaWV3VG9wQmFyIiwiVmlld1RhYnMiLCJTZWxlY3RlZEl0ZW1zIiwiR3JvdXBOYW1lIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsImNhbGN1bGF0ZUdyb3VwTmFtZSIsImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInN0YW5kYWxvbmUiLCJncm91cE5hbWVMYWJlbCIsImdyb3VwTmFtZVBsYWNlSG9sZGVyIiwiZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciIsInNlbGVjdGVkSXRlbUxpc3RMYWJlbCIsInNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUhhbmRsZXIiLCJnZXRDYW5TZWxlY3RTdGF0dXMiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsIkVycm9yIiwiYWxsQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3QiLCJnZXRJZCIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJhZnRlckNoZWNrTGlzdENoYW5nZWQiLCJvbkNoZWNrTGlzdENoYW5nZWQiLCJzaG93Iiwic2hvd0luTW9kYWwiLCJ2aXNpYmxlIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsInNldFByZWNoZWNrZWRJdGVtcyIsInByZUNoZWNrZWRJdGVtcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixpQkFBdEI7O0FBRUEsT0FBT0MsVUFBUCxNQUF1QixxQkFBdkI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGtCQUFyQjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsa0JBQTFCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixjQUF0QjtBQUNBLFNBQVNDLHdCQUFULFFBQXlDLGFBQXpDO0FBQ0EsU0FBU0Msc0JBQVQsUUFBdUMsc0JBQXZDO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsdUNBQS9COztBQUVBLE9BQU8sYUFBUDs7QUFHQSxTQUFTQywyQkFBVCxDQUFx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LGNBQVksS0FoQnVCO0FBaUJuQ04sU0FBTztBQWpCNEIsQ0FBckMiLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmltcG9ydCBWaWV3VG9wQmFyIGZyb20gJy4vdG9wLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgVmlld1RhYnMgZnJvbSAnLi90YWJzLmNvbXBvbmVudCc7XHJcbmltcG9ydCBTZWxlY3RlZEl0ZW1zIGZyb20gJy4vc2VsZWN0ZWQtaXRlbXMnO1xyXG5pbXBvcnQgR3JvdXBOYW1lIGZyb20gJy4vZ3JvdXAtbmFtZSc7XHJcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcclxuaW1wb3J0IGNhbGN1bGF0ZUdyb3VwTmFtZSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ncm91cC1uYW1lLWNhbGN1bGF0aW9uJztcclxuXHJcbmltcG9ydCAnLi92aWV3LnNjc3MnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdChsaXN0cykge1xyXG4gIGNvbnN0IGRhdGFTb3VyY2VLZXlzID0gT2JqZWN0LmtleXMobGlzdHMpO1xyXG5cclxuICBpZiAoZGF0YVNvdXJjZUtleXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIGxpc3RzW2RhdGFTb3VyY2VLZXlzWzBdXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByb3BzLnByZUNoZWNrZWRJdGVtcyk7XHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0cyA9IHRoaXMuY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMocHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKHByb3BzLmdyb3VwTmFtZSwgY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxyXG4gICAgICBncm91cE5hbWU6IHByb3BzLmdyb3VwTmFtZSxcclxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogcHJvcHMuZ3JvdXBOYW1lLnRyaW0oKSAhPT0gJycsXHJcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzLFxyXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4gJzAnO1xyXG5cclxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzdGFtcCA9IE9iamVjdFxyXG4gICAgICAua2V5cyh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKVxyXG4gICAgICAubWFwKGkgPT4gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0c1tpXS5nZXRMYXN0VXBkYXRlU3RhbXAoKSlcclxuICAgICAgLmpvaW4oJy0nKTtcclxuXHJcbiAgICByZXR1cm4gc3RhbXA7XHJcbiAgfVxyXG5cclxuICBnZXRHcm91cE5hbWUgPSAoaGFzaExpc3QpID0+IHtcclxuICAgIGNvbnN0IHsgZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgcmV0dXJuIGNhbGN1bGF0ZUdyb3VwTmFtZShncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIsIGhhc2hMaXN0KTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsaXN0c0hhc2hBcnJheSA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XHJcbiAgICBjb25zdCB0YWJzSXRlbXMgPSBbe1xyXG4gICAgICB0aXRsZTogJycsXHJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcjogdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIsXHJcbiAgICB9XTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItdGFic1wiPlxyXG4gICAgICAgICAgPFZpZXdUYWJzXHJcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxyXG4gICAgICAgICAgICBpdGVtcz17dGFic0l0ZW1zfVxyXG4gICAgICAgICAgICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XHJcbiAgICAgICAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlPXt0aGlzLmNoZWNrTGlzdENoYW5nZUhhbmRsZXJ9XHJcbiAgICAgICAgICAgIGhpZGVTaW5nbGVUYWJcclxuICAgICAgICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgeyF0aGlzLnByb3BzLnN0YW5kYWxvbmUgJiZcclxuICAgICAgICAgIDxHcm91cE5hbWVcclxuICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuZ3JvdXBOYW1lTGFiZWx9XHJcbiAgICAgICAgICAgIHBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLmdyb3VwTmFtZVBsYWNlSG9sZGVyfVxyXG4gICAgICAgICAgICBpbml0aWFsVmFsdWU9e3RoaXMuc3RhdGUuZ3JvdXBOYW1lfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5ncm91cE5hbWVDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgLz59XHJcbiAgICAgICAgICA8U2VsZWN0ZWRJdGVtc1xyXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgICAgICAgbGlzdExhYmVsPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbUxpc3RMYWJlbH1cclxuICAgICAgICAgICAgY2hlY2tlZEl0ZW1MaXN0cz17T2JqZWN0LmtleXMobGlzdHNIYXNoQXJyYXkpLm1hcChpID0+IGxpc3RzSGFzaEFycmF5W2ldKX1cclxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAgICAgICBvbkl0ZW1SZW1vdmU9e3RoaXMuaXRlbVJlbW92ZUhhbmRsZXJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRDYW5TZWxlY3RTdGF0dXMgPSAoZ3JvdXBOYW1lLCBsaXN0cykgPT4ge1xyXG4gICAgY29uc3QgaXNHcm91cE5hbWUgPSBTdHJpbmcoZ3JvdXBOYW1lKS50cmltKCkgIT09ICcnO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuICAgIE9iamVjdC5rZXlzKGxpc3RzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgY291bnQgKz0gbGlzdHNba2V5XS5nZXRDaGVja2VkSXRlbXNDb3VudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGlzR3JvdXBOYW1lICYmIGNvdW50ID4gMDtcclxuICB9XHJcblxyXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XHJcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xyXG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XHJcblxyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0TGlzdDtcclxuICB9XHJcblxyXG4gIGdldEFsbENoZWNrZWRJdGVtcyA9ICgpID0+IHtcclxuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XHJcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcclxuXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldEFsbENoZWNrZWRJdGVtcygpO1xyXG5cclxuICAgIHJldHVybiBjaGVja2VkSXRlbXM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyA9IChkYXRhU291cmNlUHJvdmlkZXIpID0+IHtcclxuICAgIGNvbnN0IGxpc3RIYXNoID0ge307XHJcblxyXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnByZUNoZWNrSXRlbXMoKTtcclxuICAgIGxpc3RIYXNoW2RhdGFTb3VyY2VQcm92aWRlci5pZF0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG5cclxuICAgIHJldHVybiBsaXN0SGFzaDtcclxuICB9XHJcblxyXG4gIGdyb3VwTmFtZUNoYW5nZUhhbmRsZXIgPSAobmV3VmFsdWUpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKG5ld1ZhbHVlLCB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKSxcclxuICAgICAgZ3JvdXBOYW1lOiBuZXdWYWx1ZSxcclxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsSGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5ncm91cE5hbWUudHJpbSgpID09PSAnJykgdGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBncm91cE5hbWUgaXMgZW1wdHknKTtcclxuXHJcbiAgICBjb25zdCBhbGxDaGVja2VkSXRlbXMgPSB0aGlzLmdldEFsbENoZWNrZWRJdGVtcygpO1xyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG5cclxuICAgIHRoaXMucHJvcHNcclxuICAgICAgLm9uU2VsZWN0KHRoaXMuc3RhdGUuZ3JvdXBOYW1lLCBhbGxDaGVja2VkSXRlbXMsIGNoZWNrZWRPdXRwdXQpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tMaXN0Q2hhbmdlSGFuZGxlciA9IChjaGVja2VkSXRlbUhhc2hMaXN0KSA9PiB7XHJcbiAgICBpZiAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkge1xyXG4gICAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XHJcbiAgICAgIGxpc3RzW2NoZWNrZWRJdGVtSGFzaExpc3QuZ2V0SWQoKV0gPSBjaGVja2VkSXRlbUhhc2hMaXN0O1xyXG4gICAgICAvKiBHZXR0aW5nIGdyb3VwIG5hbWUgYWZ0ZXIgbGlzdHMgY2hhbmdpbmcgKi9cclxuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXHJcbiAgICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHM6IGxpc3RzLFxyXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGl0ZW1SZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xyXG4gICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhncm91cE5hbWUsIGxpc3RzKSxcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdExpc3QgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcclxuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2VkKHJlc3VsdExpc3QpO1xyXG4gIH1cclxuXHJcbiAgc2hvdyA9ICgpID0+IHRoaXMuZ2V0Q29udGVudCgpO1xyXG5cclxuICBzaG93SW5Nb2RhbCA9ICgpID0+IChcclxuICAgIDxNb2RhbFxyXG4gICAgICBkaWFsb2dDbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlldy1kaWFsb2dcIlxyXG4gICAgICBzaG93PXt0aGlzLnN0YXRlLnZpc2libGV9XHJcbiAgICAgIG9uSGlkZT17dGhpcy5jYW5jZWxIYW5kbGVyfVxyXG4gICAgICBrZXlib2FyZD17ZmFsc2V9XHJcbiAgICAgIGJhY2tkcm9wPVwic3RhdGljXCJcclxuICAgID5cclxuICAgICAgPE1vZGFsLkhlYWRlcj5cclxuICAgICAgICA8Vmlld1RvcEJhclxyXG4gICAgICAgICAgc2VsZWN0RGlzYWJsZWQ9eyF0aGlzLnN0YXRlLmNhblNlbGVjdH1cclxuICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfVxyXG4gICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2FuY2VsSGFuZGxlcn1cclxuICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdEhhbmRsZXJ9XHJcbiAgICAgICAgICBidG5TZWxlY3RMYWJlbD17dGhpcy5wcm9wcy5idG5TZWxlY3RMYWJlbH1cclxuICAgICAgICAgIGJ0bkNhbmNlbExhYmVsPXt0aGlzLnByb3BzLmJ0bkNhbmNlbExhYmVsfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICB7dGhpcy5nZXRDb250ZW50KCl9XHJcbiAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgIDwvTW9kYWw+XHJcbiAgKTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvd0luTW9kYWwgJiYgIXRoaXMucHJvcHMuc3RhbmRhbG9uZSA/IHRoaXMuc2hvd0luTW9kYWwoKSA6IHRoaXMuc2hvdygpO1xyXG4gIH1cclxufVxyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LnByb3BUeXBlcyA9IHtcclxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcclxuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgc2hvd0luTW9kYWw6IFByb3BUeXBlcy5ib29sLFxyXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBncm91cE5hbWVMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIHN0YW5kYWxvbmU6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JWaWV3LmRlZmF1bHRQcm9wcyA9IHtcclxuICBvbkNhbmNlbDogKCkgPT4ge30sXHJcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiAoKSA9PiB7fSxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgc2hvd0luTW9kYWw6IHRydWUsXHJcbiAgYWxsTGFiZWw6ICdBbGwnLFxyXG4gIGJ0blNlbGVjdExhYmVsOiAnU2VsZWN0JyxcclxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXHJcbiAgZ3JvdXBOYW1lOiAnJyxcclxuICBncm91cE5hbWVMYWJlbDogJ0dyb3VwIG5hbWUnLFxyXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiAnUGxlYXNlLCBmaWxsIGEgZ3JvdXAgbmFtZScsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICBwcmVDaGVja2VkSXRlbXM6IG51bGwsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxyXG4gIHNlbGVjdGVkSXRlbUxpc3RMYWJlbDogJ1NlbGVjdGVkIGl0ZW1zJyxcclxuICBzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICBzdGFuZGFsb25lOiBmYWxzZSxcclxuICB0aXRsZTogJycsXHJcbn07XHJcbiJdfQ==