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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdmlldy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJWaWV3VG9wQmFyIiwiVmlld1RhYnMiLCJTZWxlY3RlZEl0ZW1zIiwiR3JvdXBOYW1lIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsImNhbGN1bGF0ZUdyb3VwTmFtZSIsImdldEZpcnN0Q2hlY2tlZEl0ZW1IYXNoTGlzdCIsImxpc3RzIiwiZGF0YVNvdXJjZUtleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiSGllcmFyY2h5U2VsZWN0b3JWaWV3IiwicHJvcHMiLCJnZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwic3RhbXAiLCJzdGF0ZSIsImNoZWNrZWRJdGVtSGFzaExpc3RzIiwibWFwIiwiaSIsImpvaW4iLCJnZXRHcm91cE5hbWUiLCJoYXNoTGlzdCIsImdyb3VwTmFtZSIsImdyb3VwTmFtZUNoYW5nZWRCeVVzZXIiLCJnZXRDb250ZW50IiwibGlzdHNIYXNoQXJyYXkiLCJ0YWJzSXRlbXMiLCJ0aXRsZSIsImRhdGFTb3VyY2VQcm92aWRlciIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrTGlzdENoYW5nZUhhbmRsZXIiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJzdGFuZGFsb25lIiwiZ3JvdXBOYW1lTGFiZWwiLCJncm91cE5hbWVQbGFjZUhvbGRlciIsImdyb3VwTmFtZUNoYW5nZUhhbmRsZXIiLCJzZWxlY3RlZEl0ZW1MaXN0TGFiZWwiLCJzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW1vdmVIYW5kbGVyIiwiZ2V0Q2FuU2VsZWN0U3RhdHVzIiwiaXNHcm91cE5hbWUiLCJTdHJpbmciLCJ0cmltIiwiY291bnQiLCJmb3JFYWNoIiwia2V5IiwiZ2V0Q2hlY2tlZEl0ZW1zQ291bnQiLCJnZXRDaGVja2VkT3V0cHV0IiwiY2hlY2tlZEl0ZW1IYXNoTGlzdCIsImNoZWNrZWRPdXRwdXQiLCJyZXN1bHRMaXN0IiwiY2hlY2tlZCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWRJdGVtcyIsImNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzIiwibGlzdEhhc2giLCJwcmVDaGVja0l0ZW1zIiwiaWQiLCJnZXRDaGVja2VkIiwibmV3VmFsdWUiLCJzZXRTdGF0ZSIsImNhblNlbGVjdCIsImNhbmNlbEhhbmRsZXIiLCJvbkNhbmNlbCIsInNlbGVjdEhhbmRsZXIiLCJFcnJvciIsImFsbENoZWNrZWRJdGVtcyIsIm9uU2VsZWN0IiwiZ2V0SWQiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwiYWZ0ZXJDaGVja0xpc3RDaGFuZ2VkIiwib25DaGVja0xpc3RDaGFuZ2VkIiwic2hvdyIsInNob3dJbk1vZGFsIiwidmlzaWJsZSIsIm9uSGVscCIsImJ0blNlbGVjdExhYmVsIiwiYnRuQ2FuY2VsTGFiZWwiLCJoZWxwRGlzYWJsZWQiLCJzZXRQcmVjaGVja2VkSXRlbXMiLCJwcmVDaGVja2VkSXRlbXMiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsUUFBc0IsaUJBQXRCOztBQUVBLE9BQU9DLFVBQVAsTUFBdUIscUJBQXZCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixrQkFBckI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLGtCQUExQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxTQUFTQyx3QkFBVCxRQUF5QyxhQUF6QztBQUNBLFNBQVNDLHNCQUFULFFBQXVDLHNCQUF2QztBQUNBLE9BQU9DLGtCQUFQLE1BQStCLHVDQUEvQjs7QUFFQSxPQUFPLGFBQVA7O0FBR0EsU0FBU0MsMkJBQVQsQ0FBcUNDLEtBQXJDLEVBQTRDO0FBQzFDLE1BQU1DLGlCQUFpQkMsT0FBT0MsSUFBUCxDQUFZSCxLQUFaLENBQXZCOztBQUVBLE1BQUlDLGVBQWVHLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUMsT0FBTyxJQUFQOztBQUVqQyxTQUFPSixNQUFNQyxlQUFlLENBQWYsQ0FBTixDQUFQO0FBQ0Q7O0lBRW9CSSxxQjs7O0FBQ25CLGlDQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBZ0JuQkMseUJBaEJtQixHQWdCUztBQUFBLGFBQU0sR0FBTjtBQUFBLEtBaEJUOztBQUFBLFVBa0JuQkMsa0JBbEJtQixHQWtCRSxZQUFNO0FBQ3pCLFVBQU1DLFFBQVFQLE9BQ1hDLElBRFcsQ0FDTixNQUFLTyxLQUFMLENBQVdDLG9CQURMLEVBRVhDLEdBRlcsQ0FFUDtBQUFBLGVBQUssTUFBS0YsS0FBTCxDQUFXQyxvQkFBWCxDQUFnQ0UsQ0FBaEMsRUFBbUNMLGtCQUFuQyxFQUFMO0FBQUEsT0FGTyxFQUdYTSxJQUhXLENBR04sR0FITSxDQUFkOztBQUtBLGFBQU9MLEtBQVA7QUFDRCxLQXpCa0I7O0FBQUEsVUEyQm5CTSxZQTNCbUIsR0EyQkosVUFBQ0MsUUFBRCxFQUFjO0FBQUEsd0JBQ21CLE1BQUtOLEtBRHhCO0FBQUEsVUFDbkJPLFNBRG1CLGVBQ25CQSxTQURtQjtBQUFBLFVBQ1JDLHNCQURRLGVBQ1JBLHNCQURROztBQUUzQixhQUFPcEIsbUJBQW1CbUIsU0FBbkIsRUFBOEJDLHNCQUE5QixFQUFzREYsUUFBdEQsQ0FBUDtBQUNELEtBOUJrQjs7QUFBQSxVQWdDbkJHLFVBaENtQixHQWdDTixZQUFNO0FBQ2pCLFVBQU1DLGlCQUFpQixNQUFLVixLQUFMLENBQVdDLG9CQUFsQztBQUNBLFVBQU1VLFlBQVksQ0FBQztBQUNqQkMsZUFBTyxFQURVO0FBRWpCQyw0QkFBb0IsTUFBS2pCLEtBQUwsQ0FBV2lCO0FBRmQsT0FBRCxDQUFsQjs7QUFLQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsNEJBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLDRCQUFmO0FBQ0UsOEJBQUMsUUFBRDtBQUNFLHNCQUFVLE1BQUtqQixLQUFMLENBQVdrQixRQUR2QjtBQUVFLG1CQUFPSCxTQUZUO0FBR0Usb0NBQXdCLE1BQUtmLEtBQUwsQ0FBV21CLHNCQUhyQztBQUlFLCtCQUFtQixNQUFLQyxzQkFKMUI7QUFLRSwrQkFMRjtBQU1FLCtCQUFtQixNQUFLcEIsS0FBTCxDQUFXcUIsaUJBTmhDO0FBT0UsMkJBQWUsTUFBS3JCLEtBQUwsQ0FBV3NCO0FBUDVCO0FBREYsU0FERjtBQVlFO0FBQUE7QUFBQSxZQUFLLFdBQVUsMENBQWY7QUFDRyxXQUFDLE1BQUt0QixLQUFMLENBQVd1QixVQUFaLElBQ0Qsb0JBQUMsU0FBRDtBQUNFLG1CQUFPLE1BQUt2QixLQUFMLENBQVd3QixjQURwQjtBQUVFLHlCQUFhLE1BQUt4QixLQUFMLENBQVd5QixvQkFGMUI7QUFHRSwwQkFBYyxNQUFLckIsS0FBTCxDQUFXTyxTQUgzQjtBQUlFLHNCQUFVLE1BQUtlO0FBSmpCLFlBRkY7QUFRRSw4QkFBQyxhQUFEO0FBQ0Usc0JBQVUsTUFBSzFCLEtBQUwsQ0FBV2tCLFFBRHZCO0FBRUUsdUJBQVcsTUFBS2xCLEtBQUwsQ0FBVzJCLHFCQUZ4QjtBQUdFLDhCQUFrQi9CLE9BQU9DLElBQVAsQ0FBWWlCLGNBQVosRUFBNEJSLEdBQTVCLENBQWdDO0FBQUEscUJBQUtRLGVBQWVQLENBQWYsQ0FBTDtBQUFBLGFBQWhDLENBSHBCO0FBSUUsZ0NBQW9CLE1BQUtQLEtBQUwsQ0FBVzRCLDBCQUpqQztBQUtFLDBCQUFjLE1BQUtDO0FBTHJCO0FBUkY7QUFaRixPQURGO0FBK0JELEtBdEVrQjs7QUFBQSxVQXdFbkJDLGtCQXhFbUIsR0F3RUUsVUFBQ25CLFNBQUQsRUFBWWpCLEtBQVosRUFBc0I7QUFDekMsVUFBTXFDLGNBQWNDLE9BQU9yQixTQUFQLEVBQWtCc0IsSUFBbEIsT0FBNkIsRUFBakQ7QUFDQSxVQUFJQyxRQUFRLENBQVo7QUFDQXRDLGFBQU9DLElBQVAsQ0FBWUgsS0FBWixFQUFtQnlDLE9BQW5CLENBQTJCLFVBQUNDLEdBQUQsRUFBUztBQUNsQ0YsaUJBQVN4QyxNQUFNMEMsR0FBTixFQUFXQyxvQkFBWCxFQUFUO0FBQ0QsT0FGRDs7QUFJQSxhQUFPTixlQUFlRyxRQUFRLENBQTlCO0FBQ0QsS0FoRmtCOztBQUFBLFVBa0ZuQkksZ0JBbEZtQixHQWtGQSxZQUFNO0FBQ3ZCO0FBQ0EsVUFBTUMsc0JBQXNCOUMsNEJBQTRCLE1BQUtXLEtBQUwsQ0FBV0Msb0JBQXZDLENBQTVCO0FBQ0EsVUFBSSxDQUFDa0MsbUJBQUwsRUFBMEIsT0FBTyxFQUFQOztBQUUxQixVQUFNQyxnQkFBZ0JELG9CQUFvQkQsZ0JBQXBCLEVBQXRCO0FBQ0EsVUFBTUcsYUFBYUQsY0FBY0UsT0FBZCxJQUF5QixFQUE1Qzs7QUFFQSxhQUFPRCxVQUFQO0FBQ0QsS0EzRmtCOztBQUFBLFVBNkZuQkUsa0JBN0ZtQixHQTZGRSxZQUFNO0FBQ3pCO0FBQ0EsVUFBTUosc0JBQXNCOUMsNEJBQTRCLE1BQUtXLEtBQUwsQ0FBV0Msb0JBQXZDLENBQTVCO0FBQ0EsVUFBSSxDQUFDa0MsbUJBQUwsRUFBMEIsT0FBTyxFQUFQOztBQUUxQixVQUFNSyxlQUFlTCxvQkFBb0JJLGtCQUFwQixFQUFyQjs7QUFFQSxhQUFPQyxZQUFQO0FBQ0QsS0FyR2tCOztBQUFBLFVBdUduQkMsMEJBdkdtQixHQXVHVSxVQUFDNUIsa0JBQUQsRUFBd0I7QUFDbkQsVUFBTTZCLFdBQVcsRUFBakI7O0FBRUE3Qix5QkFBbUI4QixhQUFuQjtBQUNBRCxlQUFTN0IsbUJBQW1CK0IsRUFBNUIsSUFBa0MvQixtQkFBbUJnQyxVQUFuQixFQUFsQzs7QUFFQSxhQUFPSCxRQUFQO0FBQ0QsS0E5R2tCOztBQUFBLFVBZ0huQnBCLHNCQWhIbUIsR0FnSE0sVUFBQ3dCLFFBQUQsRUFBYztBQUNyQyxZQUFLQyxRQUFMLENBQWM7QUFDWkMsbUJBQVcsTUFBS3RCLGtCQUFMLENBQXdCb0IsUUFBeEIsRUFBa0MsTUFBSzlDLEtBQUwsQ0FBV0Msb0JBQTdDLENBREM7QUFFWk0sbUJBQVd1QyxRQUZDO0FBR1p0QyxnQ0FBd0I7QUFIWixPQUFkO0FBS0QsS0F0SGtCOztBQUFBLFVBd0huQnlDLGFBeEhtQixHQXdISCxZQUFNO0FBQ3BCLFlBQUtyRCxLQUFMLENBQVdzRCxRQUFYO0FBQ0QsS0ExSGtCOztBQUFBLFVBNEhuQkMsYUE1SG1CLEdBNEhILFlBQU07QUFDcEIsVUFBSSxNQUFLbkQsS0FBTCxDQUFXTyxTQUFYLENBQXFCc0IsSUFBckIsT0FBZ0MsRUFBcEMsRUFBd0MsTUFBTSxJQUFJdUIsS0FBSixDQUFVLDBCQUFWLENBQU47O0FBRXhDLFVBQU1DLGtCQUFrQixNQUFLZCxrQkFBTCxFQUF4QjtBQUNBLFVBQU1ILGdCQUFnQixNQUFLRixnQkFBTCxFQUF0Qjs7QUFFQSxZQUFLdEMsS0FBTCxDQUNHMEQsUUFESCxDQUNZLE1BQUt0RCxLQUFMLENBQVdPLFNBRHZCLEVBQ2tDOEMsZUFEbEMsRUFDbURqQixhQURuRDtBQUVELEtBcElrQjs7QUFBQSxVQXNJbkJwQixzQkF0SW1CLEdBc0lNLFVBQUNtQixtQkFBRCxFQUF5QjtBQUNoRCxVQUFJQSxtQkFBSixFQUF5QjtBQUN2QixZQUFNN0MsUUFBUSxNQUFLVSxLQUFMLENBQVdDLG9CQUF6QjtBQUNBWCxjQUFNNkMsb0JBQW9Cb0IsS0FBcEIsRUFBTixJQUFxQ3BCLG1CQUFyQztBQUNBO0FBQ0EsWUFBTTVCLFlBQVksTUFBS0YsWUFBTCxDQUFrQmYsS0FBbEIsQ0FBbEI7O0FBRUEsY0FBS3lELFFBQUwsQ0FBYztBQUNaeEMsOEJBRFk7QUFFWnlDLHFCQUFXLE1BQUt0QixrQkFBTCxDQUF3Qm5CLFNBQXhCLEVBQW1DakIsS0FBbkMsQ0FGQztBQUdaVyxnQ0FBc0JYLEtBSFY7QUFJWmtFLGtDQUF3QixNQUFLMUQsa0JBQUw7QUFKWixTQUFkO0FBTUQ7QUFDRCxZQUFLMkQscUJBQUw7QUFDRCxLQXJKa0I7O0FBQUEsVUF1Sm5CaEMsaUJBdkptQixHQXVKQyxZQUFNO0FBQ3hCLFVBQU1uQyxRQUFRLE1BQUtVLEtBQUwsQ0FBV0Msb0JBQXpCO0FBQ0EsVUFBTU0sWUFBWSxNQUFLRixZQUFMLENBQWtCZixLQUFsQixDQUFsQjtBQUNBLFlBQUt5RCxRQUFMLENBQWM7QUFDWnhDLDRCQURZO0FBRVp5QyxtQkFBVyxNQUFLdEIsa0JBQUwsQ0FBd0JuQixTQUF4QixFQUFtQ2pCLEtBQW5DLENBRkM7QUFHWmtFLGdDQUF3QixNQUFLMUQsa0JBQUw7QUFIWixPQUFkO0FBS0EsWUFBSzJELHFCQUFMO0FBQ0QsS0FoS2tCOztBQUFBLFVBa0tuQkEscUJBbEttQixHQWtLSyxZQUFNO0FBQzVCLFVBQU1wQixhQUFhLE1BQUtILGdCQUFMLEVBQW5CO0FBQ0EsWUFBS3RDLEtBQUwsQ0FBVzhELGtCQUFYLENBQThCckIsVUFBOUI7QUFDRCxLQXJLa0I7O0FBQUEsVUF1S25Cc0IsSUF2S21CLEdBdUtaO0FBQUEsYUFBTSxNQUFLbEQsVUFBTCxFQUFOO0FBQUEsS0F2S1k7O0FBQUEsVUF5S25CbUQsV0F6S21CLEdBeUtMO0FBQUEsYUFDWjtBQUFDLGFBQUQ7QUFBQTtBQUNFLDJCQUFnQixtQ0FEbEI7QUFFRSxnQkFBTSxNQUFLNUQsS0FBTCxDQUFXNkQsT0FGbkI7QUFHRSxrQkFBUSxNQUFLWixhQUhmO0FBSUUsb0JBQVUsS0FKWjtBQUtFLG9CQUFTO0FBTFg7QUFPRTtBQUFDLGVBQUQsQ0FBTyxNQUFQO0FBQUE7QUFDRSw4QkFBQyxVQUFEO0FBQ0UsNEJBQWdCLENBQUMsTUFBS2pELEtBQUwsQ0FBV2dELFNBRDlCO0FBRUUsbUJBQU8sTUFBS3BELEtBQUwsQ0FBV2dCLEtBRnBCO0FBR0Usc0JBQVUsTUFBS3FDLGFBSGpCO0FBSUUsc0JBQVUsTUFBS0UsYUFKakI7QUFLRSxvQkFBUSxNQUFLdkQsS0FBTCxDQUFXa0UsTUFMckI7QUFNRSw0QkFBZ0IsTUFBS2xFLEtBQUwsQ0FBV21FLGNBTjdCO0FBT0UsNEJBQWdCLE1BQUtuRSxLQUFMLENBQVdvRSxjQVA3QjtBQVFFLDBCQUFjLE1BQUtwRSxLQUFMLENBQVdxRTtBQVIzQjtBQURGLFNBUEY7QUFtQkU7QUFBQyxlQUFELENBQU8sSUFBUDtBQUFBO0FBQ0csZ0JBQUt4RCxVQUFMO0FBREg7QUFuQkYsT0FEWTtBQUFBLEtBektLOztBQUdqQmIsVUFBTWlCLGtCQUFOLENBQXlCcUQsa0JBQXpCLENBQTRDdEUsTUFBTXVFLGVBQWxEO0FBQ0EsUUFBTWxFLHVCQUF1QixNQUFLd0MsMEJBQUwsQ0FBZ0M3QyxNQUFNaUIsa0JBQXRDLENBQTdCOztBQUVBLFVBQUtiLEtBQUwsR0FBYTtBQUNYZ0QsaUJBQVcsTUFBS3RCLGtCQUFMLENBQXdCOUIsTUFBTVcsU0FBOUIsRUFBeUNOLG9CQUF6QyxDQURBO0FBRVhNLGlCQUFXWCxNQUFNVyxTQUZOO0FBR1hDLDhCQUF3QlosTUFBTVcsU0FBTixDQUFnQnNCLElBQWhCLE9BQTJCLEVBSHhDO0FBSVg1QixnREFKVztBQUtYdUQsOEJBQXdCLE1BQUszRCx5QkFBTCxFQUxiO0FBTVhnRSxlQUFTO0FBTkUsS0FBYjtBQU5pQjtBQWNsQjs7a0NBcUxETyxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLeEUsS0FBTCxDQUFXZ0UsV0FBWCxJQUEwQixDQUFDLEtBQUtoRSxLQUFMLENBQVd1QixVQUF0QyxHQUFtRCxLQUFLeUMsV0FBTCxFQUFuRCxHQUF3RSxLQUFLRCxJQUFMLEVBQS9FO0FBQ0QsRzs7O0VBdE1nRGhGLE1BQU0wRixhOztTQUFwQzFFLHFCOzs7QUFpT3JCQSxzQkFBc0IyRSxZQUF0QixHQUFxQztBQUNuQ3BCLFlBQVUsb0JBQU0sQ0FBRSxDQURpQjtBQUVuQ1Esc0JBQW9CLDhCQUFNLENBQUUsQ0FGTztBQUduQ0osWUFBVSxvQkFBTSxDQUFFLENBSGlCO0FBSW5DUSxVQUFRLGtCQUFNLENBQUUsQ0FKbUI7QUFLbkNGLGVBQWEsSUFMc0I7QUFNbkM5QyxZQUFVLEtBTnlCO0FBT25DaUQsa0JBQWdCLFFBUG1CO0FBUW5DQyxrQkFBZ0IsUUFSbUI7QUFTbkN6RCxhQUFXLEVBVHdCO0FBVW5DYSxrQkFBZ0IsWUFWbUI7QUFXbkNDLHdCQUFzQiwyQkFYYTtBQVluQ04sMEJBQXdCLElBWlc7QUFhbkNvRCxtQkFBaUIsSUFia0I7QUFjbkNsRCxxQkFBbUIsV0FkZ0I7QUFlbkNDLGlCQUFlLElBZm9CO0FBZ0JuQ0sseUJBQXVCLGdCQWhCWTtBQWlCbkNDLDhCQUE0QixJQWpCTztBQWtCbkNMLGNBQVksS0FsQnVCO0FBbUJuQ1AsU0FBTyxFQW5CNEI7QUFvQm5DcUQsZ0JBQWM7QUFwQnFCLENBQXJDIiwiZmlsZSI6InZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5pbXBvcnQgVmlld1RvcEJhciBmcm9tICcuL3RvcC1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IFZpZXdUYWJzIGZyb20gJy4vdGFicy5jb21wb25lbnQnO1xyXG5pbXBvcnQgU2VsZWN0ZWRJdGVtcyBmcm9tICcuL3NlbGVjdGVkLWl0ZW1zJztcclxuaW1wb3J0IEdyb3VwTmFtZSBmcm9tICcuL2dyb3VwLW5hbWUnO1xyXG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XHJcbmltcG9ydCBjYWxjdWxhdGVHcm91cE5hbWUgZnJvbSAnLi4vLi4vc2VydmljZXMvZ3JvdXAtbmFtZS1jYWxjdWxhdGlvbic7XHJcblxyXG5pbXBvcnQgJy4vdmlldy5zY3NzJztcclxuXHJcblxyXG5mdW5jdGlvbiBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QobGlzdHMpIHtcclxuICBjb25zdCBkYXRhU291cmNlS2V5cyA9IE9iamVjdC5rZXlzKGxpc3RzKTtcclxuXHJcbiAgaWYgKGRhdGFTb3VyY2VLZXlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiBsaXN0c1tkYXRhU291cmNlS2V5c1swXV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcm9wcy5wcmVDaGVja2VkSXRlbXMpO1xyXG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdHMgPSB0aGlzLmNyZWF0ZUNoZWNrZWRJdGVtSGFzaExpc3RzKHByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhwcm9wcy5ncm91cE5hbWUsIGNoZWNrZWRJdGVtSGFzaExpc3RzKSxcclxuICAgICAgZ3JvdXBOYW1lOiBwcm9wcy5ncm91cE5hbWUsXHJcbiAgICAgIGdyb3VwTmFtZUNoYW5nZWRCeVVzZXI6IHByb3BzLmdyb3VwTmFtZS50cmltKCkgIT09ICcnLFxyXG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0cyxcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRJbml0aWFsTGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5pdGlhbExhc3RVcGRhdGVTdGFtcCA9ICgpID0+ICcwJztcclxuXHJcbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhbXAgPSBPYmplY3RcclxuICAgICAgLmtleXModGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cylcclxuICAgICAgLm1hcChpID0+IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHNbaV0uZ2V0TGFzdFVwZGF0ZVN0YW1wKCkpXHJcbiAgICAgIC5qb2luKCctJyk7XHJcblxyXG4gICAgcmV0dXJuIHN0YW1wO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBOYW1lID0gKGhhc2hMaXN0KSA9PiB7XHJcbiAgICBjb25zdCB7IGdyb3VwTmFtZSwgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlciB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiBjYWxjdWxhdGVHcm91cE5hbWUoZ3JvdXBOYW1lLCBncm91cE5hbWVDaGFuZ2VkQnlVc2VyLCBoYXNoTGlzdCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbGlzdHNIYXNoQXJyYXkgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xyXG4gICAgY29uc3QgdGFic0l0ZW1zID0gW3tcclxuICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI6IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLFxyXG4gICAgfV07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlld1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYnNcIj5cclxuICAgICAgICAgIDxWaWV3VGFic1xyXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgICAgICAgaXRlbXM9e3RhYnNJdGVtc31cclxuICAgICAgICAgICAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAgICAgICBvbkNoZWNrTGlzdENoYW5nZT17dGhpcy5jaGVja0xpc3RDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgICBoaWRlU2luZ2xlVGFiXHJcbiAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxyXG4gICAgICAgICAgICBzZWFyY2hUb29sdGlwPXt0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgeyF0aGlzLnByb3BzLnN0YW5kYWxvbmUgJiZcclxuICAgICAgICAgIDxHcm91cE5hbWVcclxuICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuZ3JvdXBOYW1lTGFiZWx9XHJcbiAgICAgICAgICAgIHBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLmdyb3VwTmFtZVBsYWNlSG9sZGVyfVxyXG4gICAgICAgICAgICBpbml0aWFsVmFsdWU9e3RoaXMuc3RhdGUuZ3JvdXBOYW1lfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5ncm91cE5hbWVDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgLz59XHJcbiAgICAgICAgICA8U2VsZWN0ZWRJdGVtc1xyXG4gICAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgICAgICAgbGlzdExhYmVsPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbUxpc3RMYWJlbH1cclxuICAgICAgICAgICAgY2hlY2tlZEl0ZW1MaXN0cz17T2JqZWN0LmtleXMobGlzdHNIYXNoQXJyYXkpLm1hcChpID0+IGxpc3RzSGFzaEFycmF5W2ldKX1cclxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAgICAgICBvbkl0ZW1SZW1vdmU9e3RoaXMuaXRlbVJlbW92ZUhhbmRsZXJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRDYW5TZWxlY3RTdGF0dXMgPSAoZ3JvdXBOYW1lLCBsaXN0cykgPT4ge1xyXG4gICAgY29uc3QgaXNHcm91cE5hbWUgPSBTdHJpbmcoZ3JvdXBOYW1lKS50cmltKCkgIT09ICcnO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuICAgIE9iamVjdC5rZXlzKGxpc3RzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgY291bnQgKz0gbGlzdHNba2V5XS5nZXRDaGVja2VkSXRlbXNDb3VudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGlzR3JvdXBOYW1lICYmIGNvdW50ID4gMDtcclxuICB9XHJcblxyXG4gIGdldENoZWNrZWRPdXRwdXQgPSAoKSA9PiB7XHJcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB3ZSBwcm92aWRlIHJlc3VsdHMgb25seSBmb3Igb25lIGRhdGEgc291cmNlXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gZ2V0Rmlyc3RDaGVja2VkSXRlbUhhc2hMaXN0KHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHMpO1xyXG4gICAgaWYgKCFjaGVja2VkSXRlbUhhc2hMaXN0KSByZXR1cm4gW107XHJcblxyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGNoZWNrZWRJdGVtSGFzaExpc3QuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG4gICAgY29uc3QgcmVzdWx0TGlzdCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0TGlzdDtcclxuICB9XHJcblxyXG4gIGdldEFsbENoZWNrZWRJdGVtcyA9ICgpID0+IHtcclxuICAgIC8vIEF0IHRoaXMgbW9tZW50IHdlIHByb3ZpZGUgcmVzdWx0cyBvbmx5IGZvciBvbmUgZGF0YSBzb3VyY2VcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBnZXRGaXJzdENoZWNrZWRJdGVtSGFzaExpc3QodGhpcy5zdGF0ZS5jaGVja2VkSXRlbUhhc2hMaXN0cyk7XHJcbiAgICBpZiAoIWNoZWNrZWRJdGVtSGFzaExpc3QpIHJldHVybiBbXTtcclxuXHJcbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldEFsbENoZWNrZWRJdGVtcygpO1xyXG5cclxuICAgIHJldHVybiBjaGVja2VkSXRlbXM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaGVja2VkSXRlbUhhc2hMaXN0cyA9IChkYXRhU291cmNlUHJvdmlkZXIpID0+IHtcclxuICAgIGNvbnN0IGxpc3RIYXNoID0ge307XHJcblxyXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnByZUNoZWNrSXRlbXMoKTtcclxuICAgIGxpc3RIYXNoW2RhdGFTb3VyY2VQcm92aWRlci5pZF0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xyXG5cclxuICAgIHJldHVybiBsaXN0SGFzaDtcclxuICB9XHJcblxyXG4gIGdyb3VwTmFtZUNoYW5nZUhhbmRsZXIgPSAobmV3VmFsdWUpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjYW5TZWxlY3Q6IHRoaXMuZ2V0Q2FuU2VsZWN0U3RhdHVzKG5ld1ZhbHVlLCB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzKSxcclxuICAgICAgZ3JvdXBOYW1lOiBuZXdWYWx1ZSxcclxuICAgICAgZ3JvdXBOYW1lQ2hhbmdlZEJ5VXNlcjogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsSGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5ncm91cE5hbWUudHJpbSgpID09PSAnJykgdGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBncm91cE5hbWUgaXMgZW1wdHknKTtcclxuXHJcbiAgICBjb25zdCBhbGxDaGVja2VkSXRlbXMgPSB0aGlzLmdldEFsbENoZWNrZWRJdGVtcygpO1xyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHRoaXMuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG5cclxuICAgIHRoaXMucHJvcHNcclxuICAgICAgLm9uU2VsZWN0KHRoaXMuc3RhdGUuZ3JvdXBOYW1lLCBhbGxDaGVja2VkSXRlbXMsIGNoZWNrZWRPdXRwdXQpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tMaXN0Q2hhbmdlSGFuZGxlciA9IChjaGVja2VkSXRlbUhhc2hMaXN0KSA9PiB7XHJcbiAgICBpZiAoY2hlY2tlZEl0ZW1IYXNoTGlzdCkge1xyXG4gICAgICBjb25zdCBsaXN0cyA9IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1IYXNoTGlzdHM7XHJcbiAgICAgIGxpc3RzW2NoZWNrZWRJdGVtSGFzaExpc3QuZ2V0SWQoKV0gPSBjaGVja2VkSXRlbUhhc2hMaXN0O1xyXG4gICAgICAvKiBHZXR0aW5nIGdyb3VwIG5hbWUgYWZ0ZXIgbGlzdHMgY2hhbmdpbmcgKi9cclxuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAgIGNhblNlbGVjdDogdGhpcy5nZXRDYW5TZWxlY3RTdGF0dXMoZ3JvdXBOYW1lLCBsaXN0cyksXHJcbiAgICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHM6IGxpc3RzLFxyXG4gICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGl0ZW1SZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbGlzdHMgPSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtSGFzaExpc3RzO1xyXG4gICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5nZXRHcm91cE5hbWUobGlzdHMpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgY2FuU2VsZWN0OiB0aGlzLmdldENhblNlbGVjdFN0YXR1cyhncm91cE5hbWUsIGxpc3RzKSxcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZnRlckNoZWNrTGlzdENoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIGFmdGVyQ2hlY2tMaXN0Q2hhbmdlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdExpc3QgPSB0aGlzLmdldENoZWNrZWRPdXRwdXQoKTtcclxuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2VkKHJlc3VsdExpc3QpO1xyXG4gIH1cclxuXHJcbiAgc2hvdyA9ICgpID0+IHRoaXMuZ2V0Q29udGVudCgpO1xyXG5cclxuICBzaG93SW5Nb2RhbCA9ICgpID0+IChcclxuICAgIDxNb2RhbFxyXG4gICAgICBkaWFsb2dDbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlldy1kaWFsb2dcIlxyXG4gICAgICBzaG93PXt0aGlzLnN0YXRlLnZpc2libGV9XHJcbiAgICAgIG9uSGlkZT17dGhpcy5jYW5jZWxIYW5kbGVyfVxyXG4gICAgICBrZXlib2FyZD17ZmFsc2V9XHJcbiAgICAgIGJhY2tkcm9wPVwic3RhdGljXCJcclxuICAgID5cclxuICAgICAgPE1vZGFsLkhlYWRlcj5cclxuICAgICAgICA8Vmlld1RvcEJhclxyXG4gICAgICAgICAgc2VsZWN0RGlzYWJsZWQ9eyF0aGlzLnN0YXRlLmNhblNlbGVjdH1cclxuICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfVxyXG4gICAgICAgICAgb25DYW5jZWw9e3RoaXMuY2FuY2VsSGFuZGxlcn1cclxuICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdEhhbmRsZXJ9XHJcbiAgICAgICAgICBvbkhlbHA9e3RoaXMucHJvcHMub25IZWxwfVxyXG4gICAgICAgICAgYnRuU2VsZWN0TGFiZWw9e3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XHJcbiAgICAgICAgICBidG5DYW5jZWxMYWJlbD17dGhpcy5wcm9wcy5idG5DYW5jZWxMYWJlbH1cclxuICAgICAgICAgIGhlbHBEaXNhYmxlZD17dGhpcy5wcm9wcy5oZWxwRGlzYWJsZWR9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgIHt0aGlzLmdldENvbnRlbnQoKX1cclxuICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgPC9Nb2RhbD5cclxuICApO1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zaG93SW5Nb2RhbCAmJiAhdGhpcy5wcm9wcy5zdGFuZGFsb25lID8gdGhpcy5zaG93SW5Nb2RhbCgpIDogdGhpcy5zaG93KCk7XHJcbiAgfVxyXG59XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxyXG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkNoZWNrTGlzdENoYW5nZWQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxyXG4gIHNob3dJbk1vZGFsOiBQcm9wVHlwZXMuYm9vbCxcclxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgZ3JvdXBOYW1lTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgZ3JvdXBOYW1lUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcclxuICBzZWxlY3RlZEl0ZW1MaXN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgc2VsZWN0ZWRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIHN0YW5kYWxvbmU6IFByb3BUeXBlcy5ib29sLFxyXG4gIGhlbHBEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvclZpZXcuZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcclxuICBvbkNoZWNrTGlzdENoYW5nZWQ6ICgpID0+IHt9LFxyXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcclxuICBvbkhlbHA6ICgpID0+IHt9LFxyXG4gIHNob3dJbk1vZGFsOiB0cnVlLFxyXG4gIGFsbExhYmVsOiAnQWxsJyxcclxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXHJcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxyXG4gIGdyb3VwTmFtZTogJycsXHJcbiAgZ3JvdXBOYW1lTGFiZWw6ICdHcm91cCBuYW1lJyxcclxuICBncm91cE5hbWVQbGFjZUhvbGRlcjogJ1BsZWFzZSwgZmlsbCBhIGdyb3VwIG5hbWUnLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxyXG4gIHNlbGVjdGVkSXRlbUxpc3RMYWJlbDogJ1NlbGVjdGVkIGl0ZW1zJyxcclxuICBzZWxlY3RlZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICBzdGFuZGFsb25lOiBmYWxzZSxcclxuICB0aXRsZTogJycsXHJcbiAgaGVscERpc2FibGVkOiB0cnVlLFxyXG59O1xyXG4iXX0=