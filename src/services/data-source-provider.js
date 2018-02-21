/* eslint-disable no-param-reassign */

import CheckedItemHashList from '../models/checked-items/checked-item-hash-list';
import DataIndex from '../models/data-index';
import ItemEntity from '../models/item.entity';
import HSUtils from '../utils';

const loaded = new WeakMap();
const data = new WeakMap();
const index = new WeakMap();
const checked = new WeakMap();
const preChecked = new WeakMap();
const dataSourcePromiseFunction = new WeakMap();
const callbackFunction = new WeakMap();

function isFunction(func, errorMessage) {
  if (func instanceof Function) {
    return true;
  }
  throw new Error(errorMessage);
}

function createIndex(items) {
  const dataIndex = new DataIndex(items);

  return dataIndex;
}

function createCheckedItemHashList(dataSourceProvider) {
  return new CheckedItemHashList(dataSourceProvider);
}

export default class HierarchySelectorDataSourceProvider {
  constructor(dataSourceFunction, id = null, callback = null) {
    this.id = id === null ? HSUtils.uId16() : id;
    this.init();
    if (isFunction(dataSourceFunction, 'A <HierarchySelectorDataSourceProvider> dataSourceFunction property should be a function that returns a promise object')) {
      dataSourcePromiseFunction.set(this, dataSourceFunction);
    }
    if (callback && isFunction(callback, 'A <HierarchySelectorDataSourceProvider> callback property should be a function')) {
      callbackFunction.set(this, callback);
    }
  }

  init() {
    loaded.set(this, false);
    data.set(this, null);
    index.set(this, null);
    preChecked.set(this, null);
    dataSourcePromiseFunction.set(this, () => new Promise(resolve => resolve(null)));
    callbackFunction.set(this, () => {});
    this.resetCheckedItemHashList();
  }

  resetCheckedItemHashList(checkedItemHashLists = null) {
    checked.delete(this);
    if (checkedItemHashLists && checkedItemHashLists[this.id]) {
      checked.set(this, checkedItemHashLists[this.id]);
    } else {
      checked.set(this, createCheckedItemHashList(this));
    }
  }

  preCheckItems() {
    const checkedItemHashList = checked.get(this);
    const preCheckedItems = preChecked.get(this);
    if (checkedItemHashList) {
      checkedItemHashList.preCheckItems(preCheckedItems);
    }
  }

  setPrecheckedItems(preCheckedItems) {
    preChecked.set(this, preCheckedItems);
    if (this.isLoaded) {
      this.preCheckItems();
    }
  }

  loadData = () => {
    const promise = dataSourcePromiseFunction.get(this)();

    if (typeof promise === 'object' && promise.then instanceof Function) {
      return promise.then((response) => {
        data.set(this, response);
        index.set(this, createIndex(response));
        this.resetCheckedItemHashList();
        this.preCheckItems();
        loaded.set(this, true);
        callbackFunction.get(this)(response);

        return response;
      });
    }
    throw new Error('A <HierarchySelectorDataSourceProvider> dataSourceFunction property didn\'t return a promise object');
  }

  get isLoaded() {
    return loaded.get(this);
  }

  get isData() {
    return data.get(this) !== null;
  }

  getData = () => data.get(this);

  getFirstItem = () => {
    const allItems = data.get(this);
    if (!this.isLoaded || !Array.isArray(allItems) || allItems.length === 0) return null;

    const firstElement = allItems[0];
    return new ItemEntity({ id: firstElement.id, name: firstElement.name });
  }

  getIndex = () => index.get(this);

  getChecked = () => checked.get(this);

  getAllCheckedItems = () => {
    const currentChecked = checked.get(this);
    return currentChecked instanceof CheckedItemHashList ? currentChecked.getAllCheckedItems() : [];
  }

  getCheckedOutput = () => {
    const currentChecked = checked.get(this);
    return currentChecked instanceof CheckedItemHashList ? currentChecked.getCheckedOutput() : {};
  }
}
