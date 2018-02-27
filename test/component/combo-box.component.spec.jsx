/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import getData from '../data';
import { HierarchySelectorDataSourceProvider, HierarchySelectorComboBox } from '../../src';

const provider = new HierarchySelectorDataSourceProvider(() => (
  new Promise((resolve) => {
    resolve(getData());
  })
));

describe('HierarchySelectorComboBox component', () => {
  it('is rendered', () => {
    const wrapper = mount((
      <HierarchySelectorComboBox
        dataSourceProvider={provider}
        tooltipPlacement="bottom"
        viewOptions={{
          title: 'Select items',
        }}
      />
    ));
    expect(wrapper).to.exist;
  });
});
