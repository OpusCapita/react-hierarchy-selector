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
  const dataSourceKeys = Object.keys(lists);

  if (dataSourceKeys.length === 0) return null;

  return lists[dataSourceKeys[0]];
}

export default class HierarchySelectorView extends React.PureComponent {
  constructor(props) {
    super(props);

    props.dataSourceProvider.setPrecheckedItems(props.preCheckedItems);
    const checkedItemHashLists = this.createCheckedItemHashLists(props.dataSourceProvider);

    this.state = {
      canSelect: this.getCanSelectStatus(props.groupName, checkedItemHashLists),
      groupName: props.groupName,
      groupNameChangedByUser: props.groupName.trim() !== '',
      checkedItemHashLists,
      checkedItemsLastUpdate: this.getInitialLastUpdateStamp(),
      visible: true,
    };
  }

  getInitialLastUpdateStamp = () => '0';

  getLastUpdateStamp = () => {
    const stamp = Object
      .keys(this.state.checkedItemHashLists)
      .map(i => this.state.checkedItemHashLists[i].getLastUpdateStamp())
      .join('-');

    return stamp;
  }

  getGroupName = (hashList) => {
    const { groupName, groupNameChangedByUser } = this.state;
    return calculateGroupName(groupName, groupNameChangedByUser, hashList);
  }

  getContent = () => {
    const listsHashArray = this.state.checkedItemHashLists;
    const tabsItems = [{
      title: '',
      dataSourceProvider: this.props.dataSourceProvider,
    }];

    return (
      <div className="oc-hierarchy-selector-view">
        <div className="oc-hierarchy-selector-tabs">
          <ViewTabs
            allLabel={this.props.allLabel}
            items={tabsItems}
            listItemRenderFunction={this.props.listItemRenderFunction}
            onCheckListChange={this.checkListChangeHandler}
            hideSingleTab
            searchPlaceHolder={this.props.searchPlaceHolder}
            searchTooltip={this.props.searchTooltip}
          />
        </div>
        <div className="oc-hierarchy-selector-selected-container">
          {!this.props.standalone &&
          <GroupName
            label={this.props.groupNameLabel}
            placeHolder={this.props.groupNamePlaceHolder}
            initialValue={this.state.groupName}
            onChange={this.groupNameChangeHandler}
          />}
          <SelectedItems
            allLabel={this.props.allLabel}
            listLabel={this.props.selectedItemListLabel}
            checkedItemLists={Object.keys(listsHashArray).map(i => listsHashArray[i])}
            itemRenderFunction={this.props.selectedItemRenderFunction}
            onItemRemove={this.itemRemoveHandler}
          />
        </div>
      </div>
    );
  }

  getCanSelectStatus = (groupName, lists) => {
    const isGroupName = String(groupName).trim() !== '';
    let count = 0;
    Object.keys(lists).forEach((key) => {
      count += lists[key].getCheckedItemsCount();
    });

    return isGroupName && count > 0;
  }

  getCheckedOutput = () => {
    // At this moment we provide results only for one data source
    const checkedItemHashList = getFirstCheckedItemHashList(this.state.checkedItemHashLists);
    if (!checkedItemHashList) return [];

    const checkedOutput = checkedItemHashList.getCheckedOutput();
    const resultList = checkedOutput.checked || [];

    return resultList;
  }

  getAllCheckedItems = () => {
    // At this moment we provide results only for one data source
    const checkedItemHashList = getFirstCheckedItemHashList(this.state.checkedItemHashLists);
    if (!checkedItemHashList) return [];

    const checkedItems = checkedItemHashList.getAllCheckedItems();

    return checkedItems;
  }

  createCheckedItemHashLists = (dataSourceProvider) => {
    const listHash = {};

    dataSourceProvider.preCheckItems();
    listHash[dataSourceProvider.id] = dataSourceProvider.getChecked();

    return listHash;
  }

  groupNameChangeHandler = (newValue) => {
    this.setState({
      canSelect: this.getCanSelectStatus(newValue, this.state.checkedItemHashLists),
      groupName: newValue,
      groupNameChangedByUser: true,
    });
  }

  cancelHandler = () => {
    this.props.onCancel();
  }

  selectHandler = (flags) => {
    if (this.state.groupName.trim() === '') throw new Error('State groupName is empty');

    const allCheckedItems = this.getAllCheckedItems();
    const checkedOutput = this.getCheckedOutput();

    this.props
      .onSelect(this.state.groupName, allCheckedItems, checkedOutput, flags);
  }

  checkListChangeHandler = (checkedItemHashList) => {
    if (checkedItemHashList) {
      const lists = this.state.checkedItemHashLists;
      lists[checkedItemHashList.getId()] = checkedItemHashList;
      /* Getting group name after lists changing */
      const groupName = this.getGroupName(lists);

      this.setState({
        groupName,
        canSelect: this.getCanSelectStatus(groupName, lists),
        checkedItemHashLists: lists,
        checkedItemsLastUpdate: this.getLastUpdateStamp(),
      });
    }
    this.afterCheckListChanged();
  }

  itemRemoveHandler = () => {
    const lists = this.state.checkedItemHashLists;
    const groupName = this.getGroupName(lists);
    this.setState({
      groupName,
      canSelect: this.getCanSelectStatus(groupName, lists),
      checkedItemsLastUpdate: this.getLastUpdateStamp(),
    });
    this.afterCheckListChanged();
  }

  afterCheckListChanged = () => {
    const resultList = this.getCheckedOutput();
    this.props.onCheckListChanged(resultList);
  }

  show = () => this.getContent();

  showInModal = () => (
    <Modal
      dialogClassName="oc-hierarchy-selector-view-dialog"
      show={this.state.visible}
      onHide={this.cancelHandler}
      keyboard={false}
      backdrop="static"
    >
      <Modal.Header>
        <ViewTopBar
          selectDisabled={!this.state.canSelect}
          title={this.props.title}
          onCancel={this.cancelHandler}
          onSelect={this.selectHandler}
          onHelp={this.props.onHelp}
          btnSelectLabel={this.props.btnSelectLabel}
          btnCancelLabel={this.props.btnCancelLabel}
          helpDisabled={this.props.helpDisabled}
        />
      </Modal.Header>
      <Modal.Body>
        {this.getContent()}
      </Modal.Body>
    </Modal>
  );

  render() {
    return this.props.showInModal && !this.props.standalone ? this.showInModal() : this.show();
  }
}

HierarchySelectorView.propTypes = {
  dataSourceProvider: dataSourceProviderType.isRequired,
  onCancel: PropTypes.func,
  onCheckListChanged: PropTypes.func,
  onSelect: PropTypes.func,
  onHelp: PropTypes.func,
  showInModal: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  allLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  btnSelectLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  btnCancelLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  groupName: PropTypes.string,
  groupNameLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  groupNamePlaceHolder: PropTypes.string,
  listItemRenderFunction: PropTypes.func,
  preCheckedItems: preCheckedItemsListShape,
  searchPlaceHolder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  searchTooltip: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  selectedItemListLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  selectedItemRenderFunction: PropTypes.func,
  standalone: PropTypes.bool,
  helpDisabled: PropTypes.bool,
};

HierarchySelectorView.defaultProps = {
  onCancel: () => {},
  onCheckListChanged: () => {},
  onSelect: () => {},
  onHelp: () => {},
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
};
