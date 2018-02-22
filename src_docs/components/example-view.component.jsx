/* eslint-disable no-console */

import React from 'react';
import { HierarchySelectorComboBox, HierarchySelectorDataSourceProvider } from '../../src';
import getData from './data';

const TIMEOUT = 200;

const getPrechecked = () => (
  [
    { id: 521, parentId: 10, isCheckedAll: false },
    { id: 525, parentId: 10, isCheckedAll: false },
    { id: 2, isCheckedAll: true },
  ]
);

function getDataPromise() {
  return () => (
    new Promise(resolve => (
      setTimeout(resolve, TIMEOUT, getData())
    ))
  );
}

export default class ExampleView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSourceProvider:
        new HierarchySelectorDataSourceProvider(getDataPromise()),
      dataSourceProviderPrecheckedItems: getPrechecked(),
    };
  }
  render() {
    return (
      <HierarchySelectorComboBox
        dataSourceProvider={this.state.dataSourceProvider}
        hideOnPopoverBlur={false}
        popoverVisible={false}
        popoverOptions={{
          btnOpenViewLabel: 'Select items...',
          searchPlaceHolder: 'Search for an item...',
          pinnedGroupLabel: 'My item groups',
          recentGroupLabel: 'Recent item groups',
        }}
        preCheckedGroupName="Prechecked group"
        preCheckedItems={this.state.dataSourceProviderPrecheckedItems}
        tooltipPlacement="bottom"
        viewOptions={{
          title: 'Select items',
          btnSelectLabel: 'Select',
          btnCancelLabel: 'Cancel',
          groupNameLabel: 'Item group name',
          groupNamePlaceHolder: 'Please, fill an item group name',
          selectedItemListLabel: 'Selected items',
          listItemRenderFunction: this.listItemRenderFunction,
        }}
        onSelect={(selectedItems) => {
          console.log(selectedItems);
        }}
      />
    );
  }
}
