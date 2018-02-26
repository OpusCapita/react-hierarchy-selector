/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

import { expect } from 'chai';

import getData from '../data';
import DataIndex from '../../src/models/data-index';

const TOTAL_NUMBER_OF_ITEMS = 1529;
const parentIds = [1, 10];
const itemId = 507;
const itemPath = parentIds.concat([itemId]);
const expectedHash = itemPath.join('_');
const dataIndexModel = new DataIndex(getData());
const expectedIndexItem = {
  parentHash: '1_10',
  item: {
    id: 507,
    name: 'Company EU 507',
    children: [],
  },
};

describe('Data index', function () {
  it('Getting index, total number of items', function () {
    const ind = dataIndexModel.get();
    const length = ind ? Object.keys(ind).length : 0;
    expect(length).to.equal(TOTAL_NUMBER_OF_ITEMS);
  });
  it('Getting hash', function () {
    const hash = dataIndexModel.getHash(expectedIndexItem);
    expect(hash).to.be.equal(expectedHash);
  });
  it('Getting hash from ids', function () {
    const hash = dataIndexModel.getHashFromIds(itemPath);
    expect(hash).to.be.equal(expectedHash);
  });
  it('Getting parents', function () {
    const parents = dataIndexModel.getParents(expectedIndexItem);
    expect(parents.map(p => p.id)).to.eql(parentIds);
  });
  it('Getting parents by hash', function () {
    const parents = dataIndexModel.getParentsByHash(expectedHash);
    expect(parents.map(p => p.id)).to.eql(parentIds);
  });
  it('Getting from index by ids', function () {
    const item = dataIndexModel.getFromIndex(parentIds, itemId);
    expect(item).to.deep.include(expectedIndexItem);
  });
  it('Getting index, access to a known item', function () {
    const ind = dataIndexModel.get();
    const item = ind[expectedHash];
    expect(item).to.deep.include(expectedIndexItem);
  });
  it('Clone an index', function () {
    const clone = dataIndexModel.clone();
    expect(clone).not.to.equal(dataIndexModel);
    expect(clone.get()).to.eql(dataIndexModel.get());
  });
  it('forEach loop works', function () {
    let count = 0;
    dataIndexModel.forEach(function (item, parents) {
      if (Array.isArray(parents) && item.id) {
        count += 1;
      }
    });
    expect(count).to.equal(TOTAL_NUMBER_OF_ITEMS);
  });
});
