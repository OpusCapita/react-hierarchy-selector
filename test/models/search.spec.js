/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

import { expect } from 'chai';

import getData from '../data';
import { HierarchySelectorDataSourceProvider } from '../../src';
import Search from '../../src/models/search';
import GroupEntity from '../../src/models/group.entity';
import ItemEntity from '../../src/models/item.entity';

const provider = new HierarchySelectorDataSourceProvider(() => (
  new Promise((resolve) => {
    resolve(getData());
  })
));


describe('Search model', function () {
  it('Data loaded', function () {
    provider.loadData(function (data) {
      expect(data).not.to.be(null);
      expect(data).not.to.have.lengthOf(0);
    });
  });
  it('Found from hierarchy', function () {
    const searchModel = new Search(provider);

    const found = searchModel.getFoundFromHierarchy('EU 502');
    expect(found).to.be.an('array');
    expect(found.length).to.equal(1);

    const group = found[0];
    expect(group).to.be.instanceof(GroupEntity);

    const { items } = group;
    expect(items).to.be.an('array');
    expect(items.length).to.equal(1);

    const item = items[0];
    expect(item).to.be.instanceof(ItemEntity);
    expect(item).to.include({ id: 502, name: 'Company EU 502' });
  });
  it('Search works', function () {
    const searchModel = new Search(provider);
    const found = searchModel.search('EU 502');
    const expectedIds = [1, 10, 502];
    const getIds = (items) => {
      let ids = [];
      items.forEach((i) => {
        ids.push(i.id);
        if (Array.isArray(i.children) && i.children.length > 0) {
          ids = ids.concat(getIds(i.children));
        }
      });
      return ids;
    };
    const foundIds = getIds(found);
    expect(foundIds).to.eql(expectedIds);
  });
});

