/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

import { expect } from 'chai';
import getData from '../data';
import { HierarchySelectorDataSourceProvider } from '../../src';
import calculateGroupName from '../../src/services/group-name-calculation';
import CheckedItemHashList from '../../src/models/checked-items/checked-item-hash-list';

const getPrecheckedItems = () => (
  [
    { id: 521, parentId: 10, isCheckedAll: false },
    { id: 525, parentId: 10, isCheckedAll: false },
  ]
);

const CALCULATED_GROUP_NAME = 'General group / EU';

const provider = new HierarchySelectorDataSourceProvider(() => (
  new Promise((resolve) => {
    resolve(getData());
  })
));

describe('Group name calculation service', function () {
  it('Data loaded', function () {
    provider.loadData(function (data) {
      expect(data).not.to.be(null);
      expect(data).not.to.have.lengthOf(0);
    });
  });
  it('Checked hashes of a data provider is OK', function () {
    provider.setPrecheckedItems(getPrecheckedItems());
    const checkedItemHashList = provider.getChecked();
    expect(checkedItemHashList).instanceof(CheckedItemHashList);
  });
  it('Group name calculation is OK', function () {
    const checkedItemHashList = provider.getChecked();
    const groupName = calculateGroupName('', false, { 'source-provider-id': checkedItemHashList });
    expect(groupName).to.equal(CALCULATED_GROUP_NAME);
  });
});
