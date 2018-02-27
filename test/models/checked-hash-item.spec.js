/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

import { expect } from 'chai';

import getData from '../data';
import CheckedHashItem from '../../src/models/checked-items/checked-hash-item';

const data = getData();

const parent1 = data[0];
const parent10 = parent1.children[0];
const item = parent10.children[7];
const expectedItemId = item.id;

describe('Checked hash item', function () {
  const hashItem = new CheckedHashItem([parent1, parent10]);
  it('Getting parents', function () {
    const parents = hashItem.getParents();
    expect(parents.length).to.equal(2);
    expect(parents.map(p => p.id)).to.eql([1, 10]);
  });
  it('Getting checked items, should be empty list', function () {
    const itemList = hashItem.getCheckedItems();
    expect(itemList).to.be.an('array');
    expect(itemList.length).to.equal(0);
  });
  it('Check all', function () {
    hashItem.checkAll();
    const itemList = hashItem.getCheckedItems();
    expect(itemList).to.be.an('array');
    expect(itemList.length).to.equal(1000);
    expect(itemList[0].id).to.eql(500);
    expect(itemList[999].id).to.eql(1499);
  });
  it('Is checked all', function () {
    const checkedAll = hashItem.isCheckedAll();
    expect(checkedAll).to.equal(true);
  });
  it('Uncheck all', function () {
    let itemList = hashItem.getCheckedItems();
    expect(itemList).to.be.an('array');
    expect(itemList.length).to.equal(1000);
    hashItem.uncheckAll();
    itemList = hashItem.getCheckedItems();
    expect(itemList).to.be.an('array');
    expect(itemList.length).to.equal(0);
  });
  it('Add checked item', function () {
    hashItem.addCheckedItem(item);
    const itemList = hashItem.getCheckedItems();
    expect(itemList).to.be.an('array');
    expect(itemList.length).to.equal(1);
    const checkedItem = itemList.pop();
    expect(checkedItem.id).to.equal(expectedItemId);
  });
  it('Remove checked item', function () {
    let itemList = hashItem.getCheckedItems();
    expect(itemList).to.be.an('array');
    expect(itemList.length).to.equal(1);
    hashItem.removeCheckedItem(item);
    itemList = hashItem.getCheckedItems();
    expect(itemList).to.be.an('array');
    expect(itemList.length).to.equal(0);
  });
  it('Creating copy', function () {
    const copy = hashItem.createCopy();
    const copyParents = copy.getParents();
    const parents = hashItem.getParents();
    expect(copyParents).to.not.equal(parents);
    expect(copyParents).to.eql(parents);
  });
});
