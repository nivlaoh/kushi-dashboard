import React from 'react';
import { shallow } from 'enzyme';
import MultiSelect from './MultiSelect';

const wrapper = shallow(<MultiSelect />);

describe('MultiSelect', () => {
  it('should display textbox', () => {
    const textbox = wrapper.find('.select-container input');
    expect(textbox).exists();
  });
});
