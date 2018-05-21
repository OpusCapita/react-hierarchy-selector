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
  selectedItemListLabel: 'Selected items',
  selectedItemRenderFunction: null,
  standalone: false,
  title: '',
  helpDisabled: true
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJWaWV3VG9wQmFyIiwiVmlld1RhYnMiLCJTZWxlY3RlZEl0ZW1zIiwiR3JvdXBOYW1lIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsImNhbGN1bGF0ZUdyb3VwTmFtZSIsImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInN0YW5kYWxvbmUiLCJncm91cE5hbWVMYWJlbCIsImdyb3VwTmFtZVBsYWNlSG9sZGVyIiwiZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciIsInNlbGVjdGVkSXRlbUxpc3RMYWJlbCIsInNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUhhbmRsZXIiLCJnZXRDYW5TZWxlY3RTdGF0dXMiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsIkVycm9yIiwiYWxsQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3QiLCJnZXRJZCIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJhZnRlckNoZWNrTGlzdENoYW5nZWQiLCJvbkNoZWNrTGlzdENoYW5nZWQiLCJzaG93Iiwic2hvd0luTW9kYWwiLCJ2aXNpYmxlIiwib25IZWxwIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsImhlbHBEaXNhYmxlZCIsInNldFByZWNoZWNrZWRJdGVtcyIsInByZUNoZWNrZWRJdGVtcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixpQkFBdEI7O0FBRUEsT0FBT0MsVUFBUCxNQUF1QixxQkFBdkI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGtCQUFyQjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsa0JBQTFCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixjQUF0QjtBQUNBLFNBQVNDLHdCQUFULFFBQXlDLGFBQXpDO0FBQ0EsU0FBU0Msc0JBQVQsUUFBdUMsc0JBQXZDO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsdUNBQS9COztBQUVBLE9BQU8sYUFB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V25DQyx3QkFBc0IsMkJBWGE7QUFZbkNMLDBCQUF3QixJQVpXO0FBYW5DbUQsbUJBQWlCLElBYmtCO0FBY25DakQscUJBQW1CLFdBZGdCO0FBZW5DSyx5QkFBdUIsZ0JBZlk7QUFnQm5DQyw4QkFBNEIsSUFoQk87QUFpQm5DTCxjQUFZLEtBakJ1QjtBQWtCbkNOLFNBQU8sRUFsQjRCO0FBbUJuQ29ELGdCQUFjO0FBbkJxQixDQUFyQyIsImZpbGUiOiJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuaW1wb3J0IFZpZXdUb3BCYXIgZnJvbSAnLi90b3AtYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCBWaWV3VGFicyBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcclxuaW1wb3J0IFNlbGVjdGVkSXRlbXMgZnJvbSAnLi9zZWxlY3RlZC1pdGVtcyc7XHJcbmltcG9ydCBHcm91cE5hbWUgZnJvbSAnLi9ncm91cC1uYW1lJztcclxuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xyXG5pbXBvcnQgY2FsY3VsYXRlR3JvdXBOYW1lIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dyb3VwLW5hbWUtY2FsY3VsYXRpb24nO1xyXG5cclxuaW1wb3J0ICcuL3ZpZXcuc2Nzcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KGxpc3RzKSB7XHJcbiAgY29uc3QgZGF0YVNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhsaXN0cyk7XHJcblxyXG4gIGlmIChkYXRhU291cmNlS2V5cy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gbGlzdHNbZGF0YVNvdXJjZUtleXNbMF1dO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJvcHMucHJlQ2hlY2tlZEl0ZW1zKTtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3RzID0gdGhpcy5jcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyhwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMocHJvcHMuZ3JvdXBOYW1lLCBjaGVja2VkSXRlbUhhc2hMaXN0cyksXHJcbiAgICAgIGdyb3VwTmFtZTogcHJvcHMuZ3JvdXBOYW1lLFxyXG4gICAgICBncm91cE5hbWVDaGFuZ2VkQnlVc2VyOiBwcm9wcy5ncm91cE5hbWUudHJpbSgpICE9PSAnJyxcclxuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHMsXHJcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldEluaXRpYWxMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiAnMCc7XHJcblxyXG4gIGdldExhc3RVcGRhdGVTdGFtcCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHN0YW1wID0gT2JqZWN0XHJcbiAgICAgIC5rZXlzKHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpXHJcbiAgICAgIC5tYXAoaSA9PiB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzW2ldLmdldExhc3RVcGRhdGVTdGFtcCgpKVxyXG4gICAgICAuam9pbignLScpO1xyXG5cclxuICAgIHJldHVybiBzdGFtcDtcclxuICB9XHJcblxyXG4gIGdldEdyb3VwTmFtZSA9IChoYXNoTGlzdCkgPT4ge1xyXG4gICAgY29uc3QgeyBncm91cE5hbWUsIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXIgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICByZXR1cm4gY2FsY3VsYXRlR3JvdXBOYW1lKGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciwgaGFzaExpc3QpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGxpc3RzSGFzaEFycmF5ID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcclxuICAgIGNvbnN0IHRhYnNJdGVtcyA9IFt7XHJcbiAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyOiB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcixcclxuICAgIH1dO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWJzXCI+XHJcbiAgICAgICAgICA8Vmlld1RhYnNcclxuICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XHJcbiAgICAgICAgICAgIGl0ZW1zPXt0YWJzSXRlbXN9XHJcbiAgICAgICAgICAgIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMuY2hlY2tMaXN0Q2hhbmdlSGFuZGxlcn1cclxuICAgICAgICAgICAgaGlkZVNpbmdsZVRhYlxyXG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VsZWN0ZWQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICB7IXRoaXMucHJvcHMuc3RhbmRhbG9uZSAmJlxyXG4gICAgICAgICAgPEdyb3VwTmFtZVxyXG4gICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5ncm91cE5hbWVMYWJlbH1cclxuICAgICAgICAgICAgcGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuZ3JvdXBOYW1lUGxhY2VIb2xkZXJ9XHJcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZT17dGhpcy5zdGF0ZS5ncm91cE5hbWV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmdyb3VwTmFtZUNoYW5nZUhhbmRsZXJ9XHJcbiAgICAgICAgICAvPn1cclxuICAgICAgICAgIDxTZWxlY3RlZEl0ZW1zXHJcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxyXG4gICAgICAgICAgICBsaXN0TGFiZWw9e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtTGlzdExhYmVsfVxyXG4gICAgICAgICAgICBjaGVja2VkSXRlbUxpc3RzPXtPYmplY3Qua2V5cyhsaXN0c0hhc2hBcnJheSkubWFwKGkgPT4gbGlzdHNIYXNoQXJyYXlbaV0pfVxyXG4gICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb259XHJcbiAgICAgICAgICAgIG9uSXRlbVJlbW92ZT17dGhpcy5pdGVtUmVtb3ZlSGFuZGxlcn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldENhblNlbGVjdFN0YXR1cyA9IChncm91cE5hbWUsIGxpc3RzKSA9PiB7XHJcbiAgICBjb25zdCBpc0dyb3VwTmFtZSA9IFN0cmluZyhncm91cE5hbWUpLnRyaW0oKSAhPT0gJyc7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgT2JqZWN0LmtleXMobGlzdHMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBjb3VudCArPSBsaXN0c1trZXldLmdldENoZWNrZWRJdGVtc0NvdW50KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaXNHcm91cE5hbWUgJiYgY291bnQgPiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2hlY2tlZE91dHB1dCA9ICgpID0+IHtcclxuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XHJcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcclxuXHJcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRDaGVja2VkT3V0cHV0KCk7XHJcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRMaXN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQ2hlY2tlZEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKTtcclxuICAgIGlmICghY2hlY2tlZEl0ZW1IYXNoTGlzdCkgcmV0dXJuIFtdO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XHJcblxyXG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtcztcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzID0gKGRhdGFTb3VyY2VQcm92aWRlcikgPT4ge1xyXG4gICAgY29uc3QgbGlzdEhhc2ggPSB7fTtcclxuXHJcbiAgICBkYXRhU291cmNlUHJvdmlkZXIucHJlQ2hlY2tJdGVtcygpO1xyXG4gICAgbGlzdEhhc2hbZGF0YVNvdXJjZVByb3ZpZGVyLmlkXSA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XHJcblxyXG4gICAgcmV0dXJuIGxpc3RIYXNoO1xyXG4gIH1cclxuXHJcbiAgZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciA9IChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMobmV3VmFsdWUsIHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxyXG4gICAgICBncm91cE5hbWU6IG5ld1ZhbHVlLFxyXG4gICAgICBncm91cE5hbWVDaGFuZ2VkQnlVc2VyOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjYW5jZWxIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0SGFuZGxlciA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmdyb3VwTmFtZS50cmltKCkgPT09ICcnKSB0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIGdyb3VwTmFtZSBpcyBlbXB0eScpO1xyXG5cclxuICAgIGNvbnN0IGFsbENoZWNrZWRJdGVtcyA9IHRoaXMuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XHJcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gdGhpcy5nZXRDaGVja2VkT3V0cHV0KCk7XHJcblxyXG4gICAgdGhpcy5wcm9wc1xyXG4gICAgICAub25TZWxlY3QodGhpcy5zdGF0ZS5ncm91cE5hbWUsIGFsbENoZWNrZWRJdGVtcywgY2hlY2tlZE91dHB1dCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0xpc3RDaGFuZ2VIYW5kbGVyID0gKGNoZWNrZWRJdGVtSGFzaExpc3QpID0+IHtcclxuICAgIGlmIChjaGVja2VkSXRlbUhhc2hMaXN0KSB7XHJcbiAgICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcclxuICAgICAgbGlzdHNbY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRJZCgpXSA9IGNoZWNrZWRJdGVtSGFzaExpc3Q7XHJcbiAgICAgIC8qIEdldHRpbmcgZ3JvdXAgbmFtZSBhZnRlciBsaXN0cyBjaGFuZ2luZyAqL1xyXG4gICAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBncm91cE5hbWUsXHJcbiAgICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhncm91cE5hbWUsIGxpc3RzKSxcclxuICAgICAgICBjaGVja2VkSXRlbUhhc2hMaXN0czogbGlzdHMsXHJcbiAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgaXRlbVJlbW92ZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XHJcbiAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKGdyb3VwTmFtZSwgbGlzdHMpLFxyXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZWQocmVzdWx0TGlzdCk7XHJcbiAgfVxyXG5cclxuICBzaG93ID0gKCkgPT4gdGhpcy5nZXRDb250ZW50KCk7XHJcblxyXG4gIHNob3dJbk1vZGFsID0gKCkgPT4gKFxyXG4gICAgPE1vZGFsXHJcbiAgICAgIGRpYWxvZ0NsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3LWRpYWxvZ1wiXHJcbiAgICAgIHNob3c9e3RoaXMuc3RhdGUudmlzaWJsZX1cclxuICAgICAgb25IaWRlPXt0aGlzLmNhbmNlbEhhbmRsZXJ9XHJcbiAgICAgIGtleWJvYXJkPXtmYWxzZX1cclxuICAgICAgYmFja2Ryb3A9XCJzdGF0aWNcIlxyXG4gICAgPlxyXG4gICAgICA8TW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxWaWV3VG9wQmFyXHJcbiAgICAgICAgICBzZWxlY3REaXNhYmxlZD17IXRoaXMuc3RhdGUuY2FuU2VsZWN0fVxyXG4gICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9XHJcbiAgICAgICAgICBvbkNhbmNlbD17dGhpcy5jYW5jZWxIYW5kbGVyfVxyXG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMuc2VsZWN0SGFuZGxlcn1cclxuICAgICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XHJcbiAgICAgICAgICBidG5TZWxlY3RMYWJlbD17dGhpcy5wcm9wcy5idG5TZWxlY3RMYWJlbH1cclxuICAgICAgICAgIGJ0bkNhbmNlbExhYmVsPXt0aGlzLnByb3BzLmJ0bkNhbmNlbExhYmVsfVxyXG4gICAgICAgICAgaGVscERpc2FibGVkPXt0aGlzLnByb3BzLmhlbHBEaXNhYmxlZH1cclxuICAgICAgICAvPlxyXG4gICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAge3RoaXMuZ2V0Q29udGVudCgpfVxyXG4gICAgICA8L01vZGFsLkJvZHk+XHJcbiAgICA8L01vZGFsPlxyXG4gICk7XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLnNob3dJbk1vZGFsICYmICF0aGlzLnByb3BzLnN0YW5kYWxvbmUgPyB0aGlzLnNob3dJbk1vZGFsKCkgOiB0aGlzLnNob3coKTtcclxuICB9XHJcbn1cclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5wcm9wVHlwZXMgPSB7XHJcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXHJcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgc2hvd0luTW9kYWw6IFByb3BUeXBlcy5ib29sLFxyXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBncm91cE5hbWVMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIHN0YW5kYWxvbmU6IFByb3BUeXBlcy5ib29sLFxyXG4gIGhlbHBEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcuZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcclxuICBvbkNoZWNrTGlzdENoYW5nZWQ6ICgpID0+IHt9LFxyXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcclxuICBvbkhlbHA6ICgpID0+IHt9LFxyXG4gIHNob3dJbk1vZGFsOiB0cnVlLFxyXG4gIGFsbExhYmVsOiAnQWxsJyxcclxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXHJcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxyXG4gIGdyb3VwTmFtZTogJycsXHJcbiAgZ3JvdXBOYW1lTGFiZWw6ICdHcm91cCBuYW1lJyxcclxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogJ1BsZWFzZSwgZmlsbCBhIGdyb3VwIG5hbWUnLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXHJcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgc3RhbmRhbG9uZTogZmFsc2UsXHJcbiAgdGl0bGU6ICcnLFxyXG4gIGhlbHBEaXNhYmxlZDogdHJ1ZSxcclxufTtcclxuIl19