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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJWaWV3VG9wQmFyIiwiVmlld1RhYnMiLCJTZWxlY3RlZEl0ZW1zIiwiR3JvdXBOYW1lIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsImNhbGN1bGF0ZUdyb3VwTmFtZSIsImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJzdGFuZGFsb25lIiwiaGlkZUdyb3VwTmFtZUlucHV0IiwiZ3JvdXBOYW1lTGFiZWwiLCJncm91cE5hbWVQbGFjZUhvbGRlciIsImdyb3VwTmFtZUNoYW5nZUhhbmRsZXIiLCJzZWxlY3RlZEl0ZW1MaXN0TGFiZWwiLCJzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW1vdmVIYW5kbGVyIiwiZ2V0Q2FuU2VsZWN0U3RhdHVzIiwiaXNDbGVhcmFibGUiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsImZsYWdzIiwiRXJyb3IiLCJhbGxDaGVja2VkSXRlbXMiLCJvblNlbGVjdCIsImdldElkIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsImFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCIsIm9uQ2hlY2tMaXN0Q2hhbmdlZCIsInNob3ciLCJzaG93SW5Nb2RhbCIsInZpc2libGUiLCJvbkhlbHAiLCJidG5TZWxlY3RMYWJlbCIsImJ0bkNhbmNlbExhYmVsIiwiaGVscERpc2FibGVkIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwicHJlQ2hlY2tlZEl0ZW1zIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLGlCQUF0Qjs7QUFFQSxPQUFPQyxVQUFQLE1BQXVCLHFCQUF2QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsa0JBQXJCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixrQkFBMUI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLGNBQXRCO0FBQ0EsU0FBU0Msd0JBQVQsUUFBeUMsYUFBekM7QUFDQSxTQUFTQyxzQkFB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Q0FBRSxDQURpQjtBQUVuQ1Msc0JBQW9CLDhCQUFNLENBQUUsQ0FGTztBQUduQ0osWUFBVSxvQkFBTSxDQUFFLENBSGlCO0FBSW5DUSxVQUFRLGtCQUFNLENBQUUsQ0FKbUI7QUFLbkNGLGVBQWEsSUFMc0I7QUFNbkNqRCxZQUFVLEtBTnlCO0FBT25Db0Qsa0JBQWdCLFFBUG1CO0FBUW5DQyxrQkFBZ0IsUUFSbUI7QUFTbkM1RCxhQUFXLEVBVHdCO0FBVW5DYyxrQkFBZ0IsWUFWbUI7QUFXbkNDLHdCQUFzQiwyQkFYYTtBQVluQ1AsMEJBQXdCLElBWlc7QUFhbkN1RCxtQkFBaUIsSUFia0I7QUFjbkNyRCxxQkFBbUIsV0FkZ0I7QUFlbkNDLGlCQUFlLElBZm9CO0FBZ0JuQ00seUJBQXVCLGdCQWhCWTtBQWlCbkNDLDhCQUE0QixJQWpCTztBQWtCbkNOLGNBQVksS0FsQnVCO0FBbUJuQ1AsU0FBTyxFQW5CNEI7QUFvQm5Dd0QsZ0JBQWMsSUFwQnFCO0FBcUJuQ2hELHNCQUFvQixLQXJCZTtBQXNCbkNRLGVBQWE7QUF0QnNCLENBQXJDIiwiZmlsZSI6InZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuXG5pbXBvcnQgVmlld1RvcEJhciBmcm9tICcuL3RvcC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBWaWV3VGFicyBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCBTZWxlY3RlZEl0ZW1zIGZyb20gJy4vc2VsZWN0ZWQtaXRlbXMnO1xuaW1wb3J0IEdyb3VwTmFtZSBmcm9tICcuL2dyb3VwLW5hbWUnO1xuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCBjYWxjdWxhdGVHcm91cE5hbWUgZnJvbSAnLi4vLi4vc2VydmljZXMvZ3JvdXAtbmFtZS1jYWxjdWxhdGlvbic7XG5cbmltcG9ydCAnLi92aWV3LnNjc3MnO1xuXG5cbmZ1bmN0aW9uIGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdChsaXN0cykge1xuICBjb25zdCBkYXRhU291cmNlS2V5cyA9IE9iamVjdC5rZXlzKGxpc3RzKTtcblxuICBpZiAoZGF0YVNvdXJjZUtleXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gbGlzdHNbZGF0YVNvdXJjZUtleXNbMF1dO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByb3BzLnByZUNoZWNrZWRJdGVtcyk7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSB0aGlzLmNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzKHByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhwcm9wcy5ncm91cE5hbWUsIGNoZWNrZWRJdGVtSGFzaExpc3RzKSxcbiAgICAgIGdyb3VwTmFtZTogcHJvcHMuZ3JvdXBOYW1lLFxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogcHJvcHMuZ3JvdXBOYW1lLnRyaW0oKSAhPT0gJycsXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0cyxcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCgpLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCA9ICgpID0+ICcwJztcblxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhbXAgPSBPYmplY3RcbiAgICAgIC5rZXlzKHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpXG4gICAgICAubWFwKGkgPT4gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0c1tpXS5nZXRMYXN0VXBkYXRlU3RhbXAoKSlcbiAgICAgIC5qb2luKCctJyk7XG5cbiAgICByZXR1cm4gc3RhbXA7XG4gIH1cblxuICBnZXRHcm91cE5hbWUgPSAoaGFzaExpc3QpID0+IHtcbiAgICBjb25zdCB7IGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gY2FsY3VsYXRlR3JvdXBOYW1lKGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciwgaGFzaExpc3QpO1xuICB9XG5cbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0c0hhc2hBcnJheSA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XG4gICAgY29uc3QgdGFic0l0ZW1zID0gW3tcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcjogdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIsXG4gICAgfV07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlld1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWJzXCI+XG4gICAgICAgICAgPFZpZXdUYWJzXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgIGl0ZW1zPXt0YWJzSXRlbXN9XG4gICAgICAgICAgICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICBvbkNoZWNrTGlzdENoYW5nZT17dGhpcy5jaGVja0xpc3RDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgaGlkZVNpbmdsZVRhYlxuICAgICAgICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XG4gICAgICAgICAgICBzZWFyY2hUb29sdGlwPXt0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHsoIXRoaXMucHJvcHMuc3RhbmRhbG9uZSAmJiAhdGhpcy5wcm9wcy5oaWRlR3JvdXBOYW1lSW5wdXQpICYmXG4gICAgICAgICAgPEdyb3VwTmFtZVxuICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuZ3JvdXBOYW1lTGFiZWx9XG4gICAgICAgICAgICBwbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5ncm91cE5hbWVQbGFjZUhvbGRlcn1cbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZT17dGhpcy5zdGF0ZS5ncm91cE5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5ncm91cE5hbWVDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgIC8+fVxuICAgICAgICAgIDxTZWxlY3RlZEl0ZW1zXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgIGxpc3RMYWJlbD17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1MaXN0TGFiZWx9XG4gICAgICAgICAgICBjaGVja2VkSXRlbUxpc3RzPXtPYmplY3Qua2V5cyhsaXN0c0hhc2hBcnJheSkubWFwKGkgPT4gbGlzdHNIYXNoQXJyYXlbaV0pfVxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgb25JdGVtUmVtb3ZlPXt0aGlzLml0ZW1SZW1vdmVIYW5kbGVyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGdldENhblNlbGVjdFN0YXR1cyA9IChncm91cE5hbWUsIGxpc3RzKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDbGVhcmFibGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBpc0dyb3VwTmFtZSA9IFN0cmluZyhncm91cE5hbWUpLnRyaW0oKSAhPT0gJyc7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBPYmplY3Qua2V5cyhsaXN0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb3VudCArPSBsaXN0c1trZXldLmdldENoZWNrZWRJdGVtc0NvdW50KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaXNHcm91cE5hbWUgJiYgY291bnQgPiAwO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZE91dHB1dCA9ICgpID0+IHtcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKTtcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgcmV0dXJuIHJlc3VsdExpc3Q7XG4gIH1cblxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldEFsbENoZWNrZWRJdGVtcygpO1xuXG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtcztcbiAgfVxuXG4gIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzID0gKGRhdGFTb3VyY2VQcm92aWRlcikgPT4ge1xuICAgIGNvbnN0IGxpc3RIYXNoID0ge307XG5cbiAgICBkYXRhU291cmNlUHJvdmlkZXIucHJlQ2hlY2tJdGVtcygpO1xuICAgIGxpc3RIYXNoW2RhdGFTb3VyY2VQcm92aWRlci5pZF0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuXG4gICAgcmV0dXJuIGxpc3RIYXNoO1xuICB9XG5cbiAgZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciA9IChuZXdWYWx1ZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhuZXdWYWx1ZSwgdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyksXG4gICAgICBncm91cE5hbWU6IG5ld1ZhbHVlLFxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9XG5cbiAgc2VsZWN0SGFuZGxlciA9IChmbGFncykgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLmdyb3VwTmFtZS50cmltKCkgPT09ICcnKSB0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIGdyb3VwTmFtZSBpcyBlbXB0eScpO1xuXG4gICAgY29uc3QgYWxsQ2hlY2tlZEl0ZW1zID0gdGhpcy5nZXRBbGxDaGVja2VkSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gdGhpcy5nZXRDaGVja2VkT3V0cHV0KCk7XG5cbiAgICB0aGlzLnByb3BzXG4gICAgICAub25TZWxlY3QodGhpcy5zdGF0ZS5ncm91cE5hbWUsIGFsbENoZWNrZWRJdGVtcywgY2hlY2tlZE91dHB1dCwgZmxhZ3MpO1xuICB9XG5cbiAgY2hlY2tMaXN0Q2hhbmdlSGFuZGxlciA9IChjaGVja2VkSXRlbUhhc2hMaXN0KSA9PiB7XG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3QpIHtcbiAgICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICAgIGxpc3RzW2NoZWNrZWRJdGVtSGFzaExpc3QuZ2V0SWQoKV0gPSBjaGVja2VkSXRlbUhhc2hMaXN0O1xuICAgICAgLyogR2V0dGluZyBncm91cCBuYW1lIGFmdGVyIGxpc3RzIGNoYW5naW5nICovXG4gICAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBncm91cE5hbWUsXG4gICAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXG4gICAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzOiBsaXN0cyxcbiAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xuICB9XG5cbiAgaXRlbVJlbW92ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xuICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgIH0pO1xuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XG4gIH1cblxuICBhZnRlckNoZWNrTGlzdENoYW5nZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2VkKHJlc3VsdExpc3QpO1xuICB9XG5cbiAgc2hvdyA9ICgpID0+IHRoaXMuZ2V0Q29udGVudCgpO1xuXG4gIHNob3dJbk1vZGFsID0gKCkgPT4gKFxuICAgIDxNb2RhbFxuICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXctZGlhbG9nXCJcbiAgICAgIHNob3c9e3RoaXMuc3RhdGUudmlzaWJsZX1cbiAgICAgIG9uSGlkZT17dGhpcy5jYW5jZWxIYW5kbGVyfVxuICAgICAga2V5Ym9hcmQ9e2ZhbHNlfVxuICAgICAgYmFja2Ryb3A9XCJzdGF0aWNcIlxuICAgID5cbiAgICAgIDxNb2RhbC5IZWFkZXI+XG4gICAgICAgIDxWaWV3VG9wQmFyXG4gICAgICAgICAgc2VsZWN0RGlzYWJsZWQ9eyF0aGlzLnN0YXRlLmNhblNlbGVjdH1cbiAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICBvbkNhbmNlbD17dGhpcy5jYW5jZWxIYW5kbGVyfVxuICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdEhhbmRsZXJ9XG4gICAgICAgICAgb25IZWxwPXt0aGlzLnByb3BzLm9uSGVscH1cbiAgICAgICAgICBidG5TZWxlY3RMYWJlbD17dGhpcy5wcm9wcy5idG5TZWxlY3RMYWJlbH1cbiAgICAgICAgICBidG5DYW5jZWxMYWJlbD17dGhpcy5wcm9wcy5idG5DYW5jZWxMYWJlbH1cbiAgICAgICAgICBoZWxwRGlzYWJsZWQ9e3RoaXMucHJvcHMuaGVscERpc2FibGVkfVxuICAgICAgICAvPlxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAge3RoaXMuZ2V0Q29udGVudCgpfVxuICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgIDwvTW9kYWw+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnNob3dJbk1vZGFsICYmICF0aGlzLnByb3BzLnN0YW5kYWxvbmUgPyB0aGlzLnNob3dJbk1vZGFsKCkgOiB0aGlzLnNob3coKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNoZWNrTGlzdENoYW5nZWQ6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dJbk1vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgdGl0bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuQ2FuY2VsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZ3JvdXBOYW1lTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGdyb3VwTmFtZVBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgc3RhbmRhbG9uZTogUHJvcFR5cGVzLmJvb2wsXG4gIGhlbHBEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGhpZGVHcm91cE5hbWVJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gIGlzQ2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICBzaG93SW5Nb2RhbDogdHJ1ZSxcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcbiAgZ3JvdXBOYW1lOiAnJyxcbiAgZ3JvdXBOYW1lTGFiZWw6ICdHcm91cCBuYW1lJyxcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6ICdQbGVhc2UsIGZpbGwgYSBncm91cCBuYW1lJyxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIHNlYXJjaFRvb2x0aXA6IG51bGwsXG4gIHNlbGVjdGVkSXRlbUxpc3RMYWJlbDogJ1NlbGVjdGVkIGl0ZW1zJyxcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHN0YW5kYWxvbmU6IGZhbHNlLFxuICB0aXRsZTogJycsXG4gIGhlbHBEaXNhYmxlZDogdHJ1ZSxcbiAgaGlkZUdyb3VwTmFtZUlucHV0OiBmYWxzZSxcbiAgaXNDbGVhcmFibGU6IGZhbHNlLFxufTtcbiJdfQ==