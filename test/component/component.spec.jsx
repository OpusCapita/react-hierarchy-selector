/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Example from '../../src/index';

describe('Example component', () => {
  it('is rendered', () => {
    const wrapper = mount(<Example />);
    expect(wrapper).to.exist;
  });
});
