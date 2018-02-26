/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

import { expect } from 'chai';

import { HierarchySelectorDataSourceProvider } from '../../src';
import BaseModel from '../../src/models/base';

const provider = new HierarchySelectorDataSourceProvider(() => (
  new Promise((resolve) => {
    resolve([]);
  })
));

describe('Base model', function () {
  it('Getting data source provider', function () {
    const baseModel = new BaseModel(provider);
    const { dataSourceProvider } = baseModel;

    expect(dataSourceProvider).to.be.instanceof(HierarchySelectorDataSourceProvider);
  });
});
