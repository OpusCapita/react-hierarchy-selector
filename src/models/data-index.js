/* eslint-disable no-param-reassign */

const index = new WeakMap();

function getHashFromIds(ids) {
  return ids.join('_');
}

function getIdsFromHash(hash) {
  return hash ? hash.split('_') : [];
}

function getFromIndex(obj, ids) {
  const dataIndex = index.get(obj);
  const hash = getHashFromIds(ids);
  return dataIndex[hash] ? Object.assign({}, dataIndex[hash]) : null;
}

function getParents(obj, hash, parents = []) {
  const ids = getIdsFromHash(hash);
  if (ids.length > 1) {
    ids.pop();
    const newHash = getHashFromIds(ids);
    const dataIndex = index.get(obj);
    if (dataIndex[newHash] === undefined) throw new Error(`Hash '${newHash}' is missed from an index`);
    parents.unshift(dataIndex[newHash].item);
    getParents(obj, newHash, parents);
  }
  return parents;
}

function addIdToHash(hash, addedId) {
  const ids = getIdsFromHash(hash);
  return getHashFromIds([...ids, addedId]);
}

function createIndex(items, indexResult = {}, parents = []) {
  Object.keys(items).forEach((key) => {
    const item = items[key];
    const allIds = [...parents, item.id];
    const hashKey = getHashFromIds(allIds);
    indexResult[hashKey] = {
      parentHash: getHashFromIds(parents),
      item,
    };
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      createIndex(item.children, indexResult, allIds);
    }
  });

  return indexResult;
}

export default class DataIndex {
  constructor(data) {
    if (data instanceof DataIndex) {
      index.set(this, data.get());
    } else {
      index.set(this, createIndex(data));
    }
  }

  get = () => Object.assign({}, index.get(this));

  getHash = (indexItem) => {
    if (!indexItem) throw new Error('DataIndex::getParents(): there is no indexItem');
    if (!indexItem.item) throw new Error('DataIndex::getParents(): item is not found in indexItem');

    return addIdToHash(indexItem.parentHash, indexItem.item.id);
  }

  getHashFromIds = ids => getHashFromIds(ids);

  getParentsByHash = hash => getParents(this, hash);

  getParents = indexItem => getParents(this, this.getHash(indexItem));

  getFromIndex = (parentIds, id) => getFromIndex(this, [...parentIds, id])

  clone = () => new DataIndex(this);

  forEach = (callBack) => {
    const dataIndex = index.get(this);
    Object.keys(dataIndex).forEach((key) => {
      const indexItem = dataIndex[key];
      callBack(indexItem.item, getIdsFromHash(indexItem.parentHash));
    });
  }
}
