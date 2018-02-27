/* eslint-disable no-console */

import React from 'react';
import { HierarchySelectorView, HierarchySelectorDataSourceProvider } from '../../src';
import getData from './data';

const TIMEOUT = 200;

const getPrechecked = () => (
  [
    { id: 502, parentId: 10, isCheckedAll: false },
    { id: 521, parentId: 10, isCheckedAll: false },
    { id: 525, parentId: 10, isCheckedAll: false },
    { id: 2131, parentId: 21, isCheckedAll: false },
    { id: 2307, parentId: 21, isCheckedAll: false },
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
      <HierarchySelectorView
        dataSourceProvider={this.state.dataSourceProvider}
        preCheckedItems={this.state.dataSourceProviderPrecheckedItems}
        standalone
        onCheckListChanged={(selectedItems) => {
          console.log(selectedItems);
        }}
      />
    );
  }
}
