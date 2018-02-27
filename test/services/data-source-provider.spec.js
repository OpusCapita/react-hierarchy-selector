/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

import { expect } from 'chai';
import getData from '../data';
import { HierarchySelectorDataSourceProvider } from '../../src';
import ItemEntity from '../../src/models/item.entity';
import DataIndex from '../../src/models/data-index';

const getPrecheckedItems = () => (
  [
    { id: 521, parentId: 10, isCheckedAll: false },
    { id: 525, parentId: 10, isCheckedAll: false },
    { id: 2, isCheckedAll: true },
  ]
);

const provider = new HierarchySelectorDataSourceProvider(() => (
  new Promise((resolve) => {
    resolve(getData());
  })
));

describe('Data source provider service', function () {
  it('Data loaded', function () {
    provider.loadData(function (data) {
      expect(data).not.to.be(null);
      expect(data).not.to.have.lengthOf(0);
    });
  });
  it('isData is true', function () {
    expect(provider.isData).to.equal(true);
  });
  it('isLoaded is true', function () {
    expect(provider.isLoaded).to.equal(true);
  });
  it('Getting data', function () {
    const data = provider.getData();
    expect(data).to.be.an('array');
    expect(data).not.to.have.lengthOf(0);
    /* Check at least the first level of hierarchies */
    expect(data.map(item => item.id)).to.include.members([1, 2]);
    expect(data.map(item => item.name)).to.include.members(['General group', 'Some other groups']);
  });
  it('Getting first item', function () {
    const firstItem = provider.getFirstItem();
    expect(firstItem).instanceof(ItemEntity);
    expect(firstItem.id).to.equal(1);
  });
  it('Getting index', function () {
    const index = provider.getIndex();
    const hashList = index.get();
    /* Random hash */
    const oneHash = '1_21_2466';
    /* Expected index object of the hash */
    const expectedObject = {
      parentHash: '1_21',
      item: { id: 2466, name: 'Company 2466', children: [] },
    };
    expect(index).instanceof(DataIndex);
    expect(hashList[oneHash]).to.be.an('object');
    expect(hashList[oneHash]).to.deep.equal(expectedObject);
  });
  it('Getting all checked items', function () {
    provider.setPrecheckedItems(getPrecheckedItems());
    const checkedItems = provider.getAllCheckedItems();
    expect(checkedItems).to.be.an('array');
    expect(checkedItems).to.have.lengthOf(27);
    expect(checkedItems.map(item => item.id)).to.include.members([521, 525]);
  });
  it('Getting checked output', function () {
    const output = provider.getCheckedOutput();
    expect(output).to.be.an('object');
    expect(output).to.have.property('checked');
    expect(output.checked.map(item => item.id)).to.include.members([2, 521, 525]);
  });
});
