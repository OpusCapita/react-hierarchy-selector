/* eslint-disable no-console */

import React from 'react';
import { HierarchySelectorComboBox, HierarchySelectorDataSourceProvider } from '../../src';

const TIMEOUT = 300;

function getDataPromise() {
  return () => (
    new Promise(resolve => (
      setTimeout(resolve, TIMEOUT, [
        {
          id: 1,
          name: 'General companies',
          children: [
            {
              id: 12,
              name: 'Europe',
              children: [
                {
                  id: 113,
                  name: 'Company 1',
                  children: [],
                },
                {
                  id: 114,
                  name: 'Company 2',
                  children: [],
                },
              ],
            },
          ],
        },
      ])
    ))
  );
}

export default class ExampleView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSourceProvider:
        new HierarchySelectorDataSourceProvider(getDataPromise()),
      // dataSourceProviderPrecheckedItems: defaultPrechecked,
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
        // preCheckedGroupName="Important items"
        // preCheckedItems={this.state.dataSourceProviderPrecheckedItems}
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
