import React from 'react';
import { shallow } from 'enzyme';
import MultiSelect from './MultiSelect';

const wrapper = (props) => shallow(<MultiSelect {...props} />);

describe('MultiSelect', () => {
  it('should display textbox by default', () => {
    const select = wrapper().find('.select-container input');
    expect(select.exists()).toEqual(true);
  });

  it('should display dropdown options', () => {
    const options = [
      { key: 'k1', value: 'v1' },
      { key: 'k2', value: 'v2' }
    ];
    const component = wrapper({ options });
    const input = component.find('.select-container input');
    input.simulate('click');
    const results = component.find('.select-dropdown');
    expect(results.exists()).toEqual(true);
    expect(results.children().length).toBe(options.length);
    const dropdownOptions = results.children().find('.option-value');
    expect(dropdownOptions.at(0).text()).toEqual('v1');
    expect(dropdownOptions.at(1).text()).toEqual('v2');
  });
});
