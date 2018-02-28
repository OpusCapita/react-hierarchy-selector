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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJWaWV3VG9wQmFyIiwiVmlld1RhYnMiLCJTZWxlY3RlZEl0ZW1zIiwiR3JvdXBOYW1lIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsImNhbGN1bGF0ZUdyb3VwTmFtZSIsImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInN0YW5kYWxvbmUiLCJncm91cE5hbWVMYWJlbCIsImdyb3VwTmFtZVBsYWNlSG9sZGVyIiwiZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciIsInNlbGVjdGVkSXRlbUxpc3RMYWJlbCIsInNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUhhbmRsZXIiLCJnZXRDYW5TZWxlY3RTdGF0dXMiLCJpc0dyb3VwTmFtZSIsIlN0cmluZyIsInRyaW0iLCJjb3VudCIsImZvckVhY2giLCJrZXkiLCJnZXRDaGVja2VkSXRlbXNDb3VudCIsImdldENoZWNrZWRPdXRwdXQiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiY2hlY2tlZE91dHB1dCIsInJlc3VsdExpc3QiLCJjaGVja2VkIiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZEl0ZW1zIiwiY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJsaXN0SGFzaCIsInByZUNoZWNrSXRlbXMiLCJpZCIsImdldENoZWNrZWQiLCJuZXdWYWx1ZSIsInNldFN0YXRlIiwiY2FuU2VsZWN0IiwiY2FuY2VsSGFuZGxlciIsIm9uQ2FuY2VsIiwic2VsZWN0SGFuZGxlciIsIkVycm9yIiwiYWxsQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3QiLCJnZXRJZCIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJhZnRlckNoZWNrTGlzdENoYW5nZWQiLCJvbkNoZWNrTGlzdENoYW5nZWQiLCJzaG93Iiwic2hvd0luTW9kYWwiLCJ2aXNpYmxlIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsInNldFByZWNoZWNrZWRJdGVtcyIsInByZUNoZWNrZWRJdGVtcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixpQkFBdEI7O0FBRUEsT0FBT0MsVUFBUCxNQUF1QixxQkFBdkI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGtCQUFyQjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsa0JBQTFCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixjQUF0QjtBQUNBLFNBQVNDLHdCQUFULFFBQXlDLGFBQXpDO0FBQ0EsU0FBU0Msc0JBQVQsUUFBdUMsc0JBQXZDO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsdUNBQS9COztBQUVBLE9BQU8sYUFBUDs7QUFHQSxTQUFTQywyQkFBVCxDQUFx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LGNBQVksS0FoQnVCO0FBaUJuQ04sU0FBTztBQWpCNEIsQ0FBckMiLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCBWaWV3VG9wQmFyIGZyb20gJy4vdG9wLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IFZpZXdUYWJzIGZyb20gJy4vdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IFNlbGVjdGVkSXRlbXMgZnJvbSAnLi9zZWxlY3RlZC1pdGVtcyc7XG5pbXBvcnQgR3JvdXBOYW1lIGZyb20gJy4vZ3JvdXAtbmFtZSc7XG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IGNhbGN1bGF0ZUdyb3VwTmFtZSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ncm91cC1uYW1lLWNhbGN1bGF0aW9uJztcblxuaW1wb3J0ICcuL3ZpZXcuc2Nzcyc7XG5cblxuZnVuY3Rpb24gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KGxpc3RzKSB7XG4gIGNvbnN0IGRhdGFTb3VyY2VLZXlzID0gT2JqZWN0LmtleXMobGlzdHMpO1xuXG4gIGlmIChkYXRhU291cmNlS2V5cy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBsaXN0c1tkYXRhU291cmNlS2V5c1swXV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJvcHMucHJlQ2hlY2tlZEl0ZW1zKTtcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0cyA9IHRoaXMuY3JlYXRlQ2hlY2tlZEl0ZW1IYXNoTGlzdHMocHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKHByb3BzLmdyb3VwTmFtZSwgY2hlY2tlZEl0ZW1IYXNoTGlzdHMpLFxuICAgICAgZ3JvdXBOYW1lOiBwcm9wcy5ncm91cE5hbWUsXG4gICAgICBncm91cE5hbWVDaGFuZ2VkQnlVc2VyOiBwcm9wcy5ncm91cE5hbWUudHJpbSgpICE9PSAnJyxcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzLFxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wKCksXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4gJzAnO1xuXG4gIGdldExhc3RVcGRhdGVTdGFtcCA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFtcCA9IE9iamVjdFxuICAgICAgLmtleXModGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cylcbiAgICAgIC5tYXAoaSA9PiB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzW2ldLmdldExhc3RVcGRhdGVTdGFtcCgpKVxuICAgICAgLmpvaW4oJy0nKTtcblxuICAgIHJldHVybiBzdGFtcDtcbiAgfVxuXG4gIGdldEdyb3VwTmFtZSA9IChoYXNoTGlzdCkgPT4ge1xuICAgIGNvbnN0IHsgZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiBjYWxjdWxhdGVHcm91cE5hbWUoZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyLCBoYXNoTGlzdCk7XG4gIH1cblxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RzSGFzaEFycmF5ID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICBjb25zdCB0YWJzSXRlbXMgPSBbe1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyOiB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcixcbiAgICB9XTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYnNcIj5cbiAgICAgICAgICA8Vmlld1RhYnNcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgaXRlbXM9e3RhYnNJdGVtc31cbiAgICAgICAgICAgIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlPXt0aGlzLmNoZWNrTGlzdENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICBoaWRlU2luZ2xlVGFiXG4gICAgICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VsZWN0ZWQtY29udGFpbmVyXCI+XG4gICAgICAgICAgeyF0aGlzLnByb3BzLnN0YW5kYWxvbmUgJiZcbiAgICAgICAgICA8R3JvdXBOYW1lXG4gICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5ncm91cE5hbWVMYWJlbH1cbiAgICAgICAgICAgIHBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLmdyb3VwTmFtZVBsYWNlSG9sZGVyfVxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlPXt0aGlzLnN0YXRlLmdyb3VwTmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmdyb3VwTmFtZUNoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgLz59XG4gICAgICAgICAgPFNlbGVjdGVkSXRlbXNcbiAgICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgbGlzdExhYmVsPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbUxpc3RMYWJlbH1cbiAgICAgICAgICAgIGNoZWNrZWRJdGVtTGlzdHM9e09iamVjdC5rZXlzKGxpc3RzSGFzaEFycmF5KS5tYXAoaSA9PiBsaXN0c0hhc2hBcnJheVtpXSl9XG4gICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICBvbkl0ZW1SZW1vdmU9e3RoaXMuaXRlbVJlbW92ZUhhbmRsZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgZ2V0Q2FuU2VsZWN0U3RhdHVzID0gKGdyb3VwTmFtZSwgbGlzdHMpID0+IHtcbiAgICBjb25zdCBpc0dyb3VwTmFtZSA9IFN0cmluZyhncm91cE5hbWUpLnRyaW0oKSAhPT0gJyc7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBPYmplY3Qua2V5cyhsaXN0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb3VudCArPSBsaXN0c1trZXldLmdldENoZWNrZWRJdGVtc0NvdW50KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaXNHcm91cE5hbWUgJiYgY291bnQgPiAwO1xuICB9XG5cbiAgZ2V0Q2hlY2tlZE91dHB1dCA9ICgpID0+IHtcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IGdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCh0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKTtcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCByZXN1bHRMaXN0ID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgcmV0dXJuIHJlc3VsdExpc3Q7XG4gIH1cblxuICBnZXRBbGxDaGVja2VkSXRlbXMgPSAoKSA9PiB7XG4gICAgLy8gQXQgdGhpcyBtb21lbnQgd2UgcHJvdmlkZSByZXN1bHRzIG9ubHkgZm9yIG9uZSBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldEFsbENoZWNrZWRJdGVtcygpO1xuXG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtcztcbiAgfVxuXG4gIGNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzID0gKGRhdGFTb3VyY2VQcm92aWRlcikgPT4ge1xuICAgIGNvbnN0IGxpc3RIYXNoID0ge307XG5cbiAgICBkYXRhU291cmNlUHJvdmlkZXIucHJlQ2hlY2tJdGVtcygpO1xuICAgIGxpc3RIYXNoW2RhdGFTb3VyY2VQcm92aWRlci5pZF0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuXG4gICAgcmV0dXJuIGxpc3RIYXNoO1xuICB9XG5cbiAgZ3JvdXBOYW1lQ2hhbmdlSGFuZGxlciA9IChuZXdWYWx1ZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhuZXdWYWx1ZSwgdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyksXG4gICAgICBncm91cE5hbWU6IG5ld1ZhbHVlLFxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9XG5cbiAgc2VsZWN0SGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5ncm91cE5hbWUudHJpbSgpID09PSAnJykgdGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBncm91cE5hbWUgaXMgZW1wdHknKTtcblxuICAgIGNvbnN0IGFsbENoZWNrZWRJdGVtcyA9IHRoaXMuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuXG4gICAgdGhpcy5wcm9wc1xuICAgICAgLm9uU2VsZWN0KHRoaXMuc3RhdGUuZ3JvdXBOYW1lLCBhbGxDaGVja2VkSXRlbXMsIGNoZWNrZWRPdXRwdXQpO1xuICB9XG5cbiAgY2hlY2tMaXN0Q2hhbmdlSGFuZGxlciA9IChjaGVja2VkSXRlbUhhc2hMaXN0KSA9PiB7XG4gICAgaWYgKGNoZWNrZWRJdGVtSGFzaExpc3QpIHtcbiAgICAgIGNvbnN0IGxpc3RzID0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cztcbiAgICAgIGxpc3RzW2NoZWNrZWRJdGVtSGFzaExpc3QuZ2V0SWQoKV0gPSBjaGVja2VkSXRlbUhhc2hMaXN0O1xuICAgICAgLyogR2V0dGluZyBncm91cCBuYW1lIGFmdGVyIGxpc3RzIGNoYW5naW5nICovXG4gICAgICBjb25zdCBncm91cE5hbWUgPSB0aGlzLmdldEdyb3VwTmFtZShsaXN0cyk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBncm91cE5hbWUsXG4gICAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXG4gICAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzOiBsaXN0cyxcbiAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCgpO1xuICB9XG5cbiAgaXRlbVJlbW92ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xuICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuZ2V0R3JvdXBOYW1lKGxpc3RzKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiB0aGlzLmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgIH0pO1xuICAgIHRoaXMuYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkKCk7XG4gIH1cblxuICBhZnRlckNoZWNrTGlzdENoYW5nZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2VkKHJlc3VsdExpc3QpO1xuICB9XG5cbiAgc2hvdyA9ICgpID0+IHRoaXMuZ2V0Q29udGVudCgpO1xuXG4gIHNob3dJbk1vZGFsID0gKCkgPT4gKFxuICAgIDxNb2RhbFxuICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXctZGlhbG9nXCJcbiAgICAgIHNob3c9e3RoaXMuc3RhdGUudmlzaWJsZX1cbiAgICAgIG9uSGlkZT17dGhpcy5jYW5jZWxIYW5kbGVyfVxuICAgICAga2V5Ym9hcmQ9e2ZhbHNlfVxuICAgICAgYmFja2Ryb3A9XCJzdGF0aWNcIlxuICAgID5cbiAgICAgIDxNb2RhbC5IZWFkZXI+XG4gICAgICAgIDxWaWV3VG9wQmFyXG4gICAgICAgICAgc2VsZWN0RGlzYWJsZWQ9eyF0aGlzLnN0YXRlLmNhblNlbGVjdH1cbiAgICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICBvbkNhbmNlbD17dGhpcy5jYW5jZWxIYW5kbGVyfVxuICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdEhhbmRsZXJ9XG4gICAgICAgICAgYnRuU2VsZWN0TGFiZWw9e3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XG4gICAgICAgICAgYnRuQ2FuY2VsTGFiZWw9e3RoaXMucHJvcHMuYnRuQ2FuY2VsTGFiZWx9XG4gICAgICAgIC8+XG4gICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICB7dGhpcy5nZXRDb250ZW50KCl9XG4gICAgICA8L01vZGFsLkJvZHk+XG4gICAgPC9Nb2RhbD5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuc2hvd0luTW9kYWwgJiYgIXRoaXMucHJvcHMuc3RhbmRhbG9uZSA/IHRoaXMuc2hvd0luTW9kYWwoKSA6IHRoaXMuc2hvdygpO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlZDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgc2hvd0luTW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBncm91cE5hbWVMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlbGVjdGVkSXRlbUxpc3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBzdGFuZGFsb25lOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yVmlldy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcbiAgb25DaGVja0xpc3RDaGFuZ2VkOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBzaG93SW5Nb2RhbDogdHJ1ZSxcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcbiAgZ3JvdXBOYW1lOiAnJyxcbiAgZ3JvdXBOYW1lTGFiZWw6ICdHcm91cCBuYW1lJyxcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6ICdQbGVhc2UsIGZpbGwgYSBncm91cCBuYW1lJyxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIHNlbGVjdGVkSXRlbUxpc3RMYWJlbDogJ1NlbGVjdGVkIGl0ZW1zJyxcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHN0YW5kYWxvbmU6IGZhbHNlLFxuICB0aXRsZTogJycsXG59O1xuIl19