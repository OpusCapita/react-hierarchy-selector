import BaseModel from '../base';
import CheckedHashItem from './checked-hash-item';
import CheckedOutput from './checked-output';

const sourceProvider = new WeakMap();
const providerId = new WeakMap();
const checked = new WeakMap();
const index = new WeakMap();
const lastUpdate = new WeakMap();

function clearAll(list) {
  checked.set(list, {});
}

function getChildHashesOfCheckedItems(list, hash) {
  const checkedItems = checked.get(list);
  const hashes = [];
  Object.keys(checkedItems).forEach((currentHash) => {
    if (hash !== currentHash && currentHash.indexOf(hash) === 0) {
      hashes.push(currentHash);
    }
  });

  return hashes;
}

function removeItem(list, parentIds, id) {
  const checkedItems = checked.get(list);
  const dataIndex = index.get(list);
  const indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    const parentHash = indexItem.parentHash;

    if (checkedItems[parentHash]) {
      checkedItems[parentHash].removeCheckedItem(indexItem.item);
      // Checks if there is no checked items, then removes a hash
      if (checkedItems[parentHash].getCheckedItems().length === 0) {
        delete checkedItems[parentHash];
      }
    }
  }
}

function removeHash(list, hash) {
  const checkedItems = checked.get(list);
  if (checkedItems[hash]) {
    checkedItems[hash].uncheckAll();
    delete checkedItems[hash];
  }
}

function removeAllItems(list, parentIds, id) {
  const dataIndex = index.get(list);
  const indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    const hash = dataIndex.getHash(indexItem);
    removeHash(list, hash);
  }
}

function addItem(list, parentIds, id) {
  const checkedItems = checked.get(list);
  const dataIndex = index.get(list);
  const indexItem = dataIndex.getFromIndex(parentIds, id);

  if (indexItem) {
    const parentHash = indexItem.parentHash;
    const parents = dataIndex.getParents(indexItem);

    if (!checkedItems[parentHash]) checkedItems[parentHash] = new CheckedHashItem(parents);

    const hashItem = checkedItems[parentHash];
    hashItem.addCheckedItem(indexItem.item);
  }
}

function addAllItems(list, parentIds, id) {
  const checkedItems = checked.get(list);
  const dataIndex = index.get(list);
  const indexItem = dataIndex.getFromIndex(parentIds, id);
  if (indexItem) {
    const hash = dataIndex.getHash(indexItem);
    const parents = [...dataIndex.getParents(indexItem), indexItem.item];
    const childHashes = getChildHashesOfCheckedItems(list, hash) || [];

    childHashes.forEach((h) => { removeHash(list, h); });

    if (!checkedItems[hash]) checkedItems[hash] = new CheckedHashItem(parents);

    const hashItem = checkedItems[hash];
    hashItem.checkAll();
  }
}

function preCheckItems(list, preCheckedItems) {
  const dataIndex = index.get(list);
  const getHash = (parentId, id) => (
    parentId ? `${parentId}_${id}` : `${id}`
  );
  clearAll(list);

  if (dataIndex && preCheckedItems) {
    // creating a hash for pre-checked items to increase speed of searching
    const hashOfPreChecked = [];
    preCheckedItems.forEach((i) => {
      const hs = getHash(i.parentId, i.id);
      hashOfPreChecked[hs] = i;
    });

    dataIndex.forEach((item, parentIds) => {
      const hs = getHash(parentIds.length > 0 ? parentIds[parentIds.length - 1] : null, item.id);
      const found = hashOfPreChecked[hs];
      if (found) {
        if (found.isCheckedAll && Array.isArray(item.children) && item.children.length > 0) {
          addAllItems(list, parentIds, item.id);
        } else {
          addItem(list, parentIds, item.id);
        }
      }
    });
  }
}

function afterUpdate(list) {
  lastUpdate.set(list, Date.now());
}

class CheckedItemHashList extends BaseModel {
  constructor(dataSourceProvider) {
    super(dataSourceProvider);
    sourceProvider.set(this, dataSourceProvider);
    providerId.set(this, dataSourceProvider.id);
    lastUpdate.set(this, 0);
    checked.set(this, {});
    index.set(this, dataSourceProvider.getIndex());
  }

  get = () => checked.get(this);

  getAllCheckedItems = () => {
    const checkedHashArray = checked.get(this);
    let list = [];
    Object.keys(checkedHashArray).forEach((key) => {
      list = list.concat(checkedHashArray[key].getCheckedItems());
    });
    return list;
  }

  getCheckedItems = (parentIds = []) => {
    const checkedHashItem = this.getHashItem(parentIds);
    let result = [];
    if (checkedHashItem) {
      result = checkedHashItem.getCheckedItems();
    }
    return result;
  }

  getIsCheckedAll = (parentIds = []) => {
    const checkedHashItem = this.getHashItem(parentIds);
    return checkedHashItem ? checkedHashItem.isCheckedAll() : false;
  }

  getCheckedItemsCount = () => {
    const checkedHashArray = checked.get(this);
    let count = 0;
    Object.keys(checkedHashArray).forEach((key) => {
      count += checkedHashArray[key].getCheckedItems().length;
    });
    return count;
  }

  getId = () => providerId.get(this);

  getHashItem = (parentIds = []) => {
    const checkedHashArray = checked.get(this);
    const dataIndex = index.get(this);
    const hash = dataIndex.getHashFromIds(parentIds);

    if (hash === '' || !checkedHashArray[hash]) {
      return null;
    }
    return checkedHashArray[hash];
  };

  getLastUpdateStamp = () => lastUpdate.get(this);

  getCheckedOutput = () => {
    const resultObject = {
      dataSourceProviderId: this.getId(),
      checked: [],
    };
    const checkedOutput = new CheckedOutput();
    const hashes = checked.get(this);

    Object.keys(hashes).forEach((hash) => {
      const checkedHashItem = hashes[hash];
      checkedOutput.add(checkedHashItem);
    });

    resultObject.checked = checkedOutput.get();

    return resultObject;
  }

  add = (parentIds, id) => {
    addItem(this, parentIds, id);
    afterUpdate(this);
  }

  addAll = (parentIds, id) => {
    addAllItems(this, parentIds, id);
    afterUpdate(this);
  }

  createCopy = () => {
    const copy = new CheckedItemHashList(sourceProvider.get(this));

    providerId.set(copy, providerId.get(this));
    lastUpdate.set(copy, lastUpdate.get(this));
    index.set(copy, index.get(this).clone());

    const chkd = Object.assign({}, checked.get(this));
    Object.keys(chkd).forEach((key) => { chkd[key] = chkd[key].createCopy(); });
    checked.set(copy, chkd);

    return copy;
  }

  clearAll = () => {
    clearAll(this);
  }

  preCheckItems = (preCheckedItems) => {
    preCheckItems(this, preCheckedItems);
    afterUpdate(this);
  }

  remove = (parentIds, id) => {
    removeItem(this, parentIds, id);
    afterUpdate(this);
  }

  removeAll = (parentIds, id) => {
    removeAllItems(this, parentIds, id);
    afterUpdate(this);
  }

  removeHash = (hash) => {
    removeHash(this, hash);
    afterUpdate(this);
  }

  toString = () => {
    const list = checked.get(this);
    const result = {};
    Object.keys(list).forEach((key) => {
      const item = list[key];
      result[key] = {
        checkedAll: item.isCheckedAll(),
        checkedItems: item.getCheckedItems(),
      };
    });
    return JSON.stringify({
      id: this.getId(),
      lastUpdateStamp: this.getLastUpdateStamp(),
      checked: result,
    }, null, 2);
  }
}

export default CheckedItemHashList;
