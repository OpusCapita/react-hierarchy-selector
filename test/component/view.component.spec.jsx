/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import getData from '../data';
import { HierarchySelectorDataSourceProvider, HierarchySelectorView } from '../../src';

const provider = new HierarchySelectorDataSourceProvider(() => (
  new Promise((resolve) => {
    resolve(getData());
  })
));

describe('HierarchySelectorView component', () => {
  it('is rendered', () => {
    const wrapper = mount((
      <HierarchySelectorView
        dataSourceProvider={provider}
        standalone
      />
    ));
    expect(wrapper).to.exist;
  });
});
