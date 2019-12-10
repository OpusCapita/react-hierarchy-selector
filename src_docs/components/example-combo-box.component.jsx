/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
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

export default class ExampleComboBox extends React.PureComponent {
  static propTypes = {
    usePrechecked: PropTypes.bool,
    helpEnabled: PropTypes.bool,
    isClearable: PropTypes.bool,
    viewOptions: PropTypes.shape({}),
  }

  static defaultProps = {
    usePrechecked: false,
    helpEnabled: false,
    isClearable: false,
    viewOptions: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSourceProvider:
        new HierarchySelectorDataSourceProvider(getDataPromise()),
      dataSourceProviderPrecheckedItems: props.usePrechecked ? getPrechecked() : null,
    };
  }

  render() {
    const {
      usePrechecked,
      helpEnabled,
      isClearable,
      viewOptions,
    } = this.props;
    const { dataSourceProvider, dataSourceProviderPrecheckedItems } = this.state;
    let precheckedOptions = {};
    let helpOptions = {};

    if (usePrechecked) {
      precheckedOptions = {
        preCheckedGroupName: 'Prechecked group',
        preCheckedItems: dataSourceProviderPrecheckedItems,
      };
    }

    if (helpEnabled) {
      helpOptions = {
        onHelp: () => { alert('Help is on the way'); }, // eslint-disable-line no-alert
      };
    }

    return (
      <HierarchySelectorComboBox
        dataSourceProvider={dataSourceProvider}
        hideOnPopoverBlur={false}
        popoverVisible={false}
        isClearable={isClearable}
        popoverOptions={{
          btnOpenViewLabel: 'Select items...',
          searchPlaceHolder: 'Search for an item...',
          pinnedGroupLabel: 'My item groups',
          recentGroupLabel: 'Recent item groups',
        }}
        tooltipPlacement="bottom"
        viewOptions={{
          title: 'Select items',
          btnSelectLabel: 'Select',
          btnCancelLabel: 'Cancel',
          groupNameLabel: 'Item group name',
          groupNamePlaceHolder: 'Please, fill an item group name',
          selectedItemListLabel: 'Selected items',
          listItemRenderFunction: this.listItemRenderFunction,
          helpDisabled: !helpEnabled,
          ...viewOptions,
        }}
        onSelect={(selectedItems, groupName, flags) => {
          console.log(groupName, selectedItems, flags);
        }}
        {...precheckedOptions}
        {...helpOptions}
      />
    );
  }
}
