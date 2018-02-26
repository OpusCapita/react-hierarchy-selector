/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

import { expect } from 'chai';

import getData from '../data';
import { HierarchySelectorDataSourceProvider } from '../../src';
import CheckedItemHashList from '../../src/models/checked-items/checked-item-hash-list';
import CheckedHashItem from '../../src/models/checked-items/checked-hash-item';

const NUMBER_OF_CHECKED_ALL = 1000;
const parentIds = [1, 10];
const itemId = 507;
const itemPath = parentIds.concat([itemId]);

const provider = new HierarchySelectorDataSourceProvider(() => (
  new Promise((resolve) => {
    resolve(getData());
  })
));

describe('Checked item hash list', function () {
  it('Data loaded', function () {
    provider.loadData(function (data) {
      expect(data).not.to.be(null);
      expect(data).not.to.have.lengthOf(0);
    });
  });
  it('Getting data source provider id', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    expect(checkedHashList.getId()).to.equal(provider.id);
  });
  it('Adding and getting correctly', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.add(parentIds, itemId);
    const hashItems = checkedHashList.get();
    const hashes = Object.keys(hashItems);
    expect(hashes).to.have.lengthOf(1);
    const item = hashItems[hashes[0]];
    expect(item).to.be.instanceof(CheckedHashItem);
    const checkedItems = item.getCheckedItems();
    expect(checkedItems).to.have.lengthOf(1);
    expect(checkedItems[0].id).to.equal(itemId);
  });
  it('Number of checked items correct', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.add(parentIds, itemId);
    expect(checkedHashList.getCheckedItemsCount()).to.equal(1);
  });
  it('"Adding all" and "getting all" works correctly', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.addAll(parentIds[0], parentIds[1]);
    expect(checkedHashList.getAllCheckedItems()).to.have.lengthOf(NUMBER_OF_CHECKED_ALL);
    const hashItems = checkedHashList.get();
    const hashes = Object.keys(hashItems);
    expect(hashes).to.have.lengthOf(1);
    expect(hashes[0]).to.equal(parentIds.join('_'));
  });
  it('Is checked all', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.addAll(parentIds[0], parentIds[1]);
    const isCheckedAll = checkedHashList.getIsCheckedAll(parentIds);
    expect(isCheckedAll).to.equal(true);
  });
  it('Getting hash item', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.add(parentIds, itemId);
    const hashItem = checkedHashList.getHashItem(parentIds);
    expect(hashItem).to.be.instanceof(CheckedHashItem);
    expect(hashItem.getCheckedItems()).to.be.lengthOf(1);
  });
  it('Getting the last stamp of an update', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    const stampBefore = checkedHashList.getLastUpdateStamp();
    checkedHashList.add(parentIds, itemId);
    const stampAfter = checkedHashList.getLastUpdateStamp();
    expect(stampAfter).to.be.above(stampBefore);
  });
  it('Clear all', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.addAll(parentIds[0], parentIds[1]);
    expect(checkedHashList.getCheckedItemsCount()).to.equal(NUMBER_OF_CHECKED_ALL);
    checkedHashList.clearAll();
    expect(checkedHashList.getCheckedItemsCount()).to.equal(0);
  });
  it('Remove one', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.add(parentIds, itemId);
    expect(checkedHashList.getCheckedItemsCount()).to.equal(1);
    checkedHashList.remove(parentIds, itemId);
    expect(checkedHashList.getCheckedItemsCount()).to.equal(0);
  });
  it('Remove all', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.addAll(parentIds[0], parentIds[1]);
    expect(checkedHashList.getCheckedItemsCount()).to.equal(NUMBER_OF_CHECKED_ALL);
    checkedHashList.removeAll(parentIds[0], parentIds[1]);
    expect(checkedHashList.getCheckedItemsCount()).to.equal(0);
  });
  it('Remove by hash', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.addAll(parentIds[0], parentIds[1]);
    expect(checkedHashList.getCheckedItemsCount()).to.equal(NUMBER_OF_CHECKED_ALL);
    checkedHashList.removeHash(parentIds.join('_'));
    expect(checkedHashList.getCheckedItemsCount()).to.equal(0);
  });
  it('getCheckedOutput', function () {
    const checkedHashList = new CheckedItemHashList(provider);
    checkedHashList.add(parentIds, itemId);
    const output = checkedHashList.getCheckedOutput();
    const expectedProperties = ['id', 'isCheckedAll', 'isChildren', 'level', 'name', 'parentId', 'parentIds'];
    expect(output).to.have.property('checked');
    expect(output.checked).to.be.lengthOf(1);
    expect(Object.keys(output.checked[0])).to.have.members(expectedProperties);
  });
});
