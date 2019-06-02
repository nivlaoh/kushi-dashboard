import React from 'react';
import { shallow } from 'enzyme';
import MultiSelect from './MultiSelect';
import Checkbox from '../Checkbox';

const wrapper = (props) => shallow(<MultiSelect {...props} />);
const options = [
  { key: 'k1', value: 'v1' },
  { key: 'k2', value: 'v2' }
];

describe('MultiSelect component', () => {
  it('should display textbox by default', () => {
    const select = wrapper().find('.select-container input');
    expect(select.exists()).toEqual(true);
  });

  it('should display dropdown options', () => {
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

  it('should highlight dropdown option when mouse moves over', () => {
    const component = wrapper({ options });
    const input = component.find('.select-container input');
    input.simulate('click');
    const results = component.find('.select-dropdown');
    expect(results.exists()).toEqual(true);
    expect(results.children().length).toBe(options.length);
    const dropdownOptions = results.children().find('.select-option');
    expect(dropdownOptions.at(0).text()).toEqual('v1');
    dropdownOptions.first().simulate('mouseover');
    expect(dropdownOptions.first().hasClass('active')).toEqual(true);
  });

  it('should display selected and close dropdown when option is selected', () => {
    const onChange = jest.fn();
    const component = wrapper({ options, onChange });
    const input = component.find('.select-container input');
    input.simulate('click');
    const results = component.find('.select-dropdown');
    expect(results.exists()).toEqual(true);
    expect(results.children().length).toBe(options.length);
    const dropdownOptions = results.children().find('.select-option');
    expect(dropdownOptions.at(0).text()).toEqual('v1');
    dropdownOptions.first().simulate('click', { target: { getAttribute: () => 'k1'}});
    expect(onChange).toHaveBeenCalled();
    expect(component.find('.select-dropdown').exists()).toEqual(false);
  });

  it('should show checkbox in MultiSelect mode', () => {
    const component = wrapper({ options, multi: true });
    const input = component.find('.select-container input');
    input.simulate('click');
    const results = component.find('.select-dropdown');
    expect(results.exists()).toEqual(true);
    expect(results.children().length).toBe(options.length);
    const dropdownOptions = results.children().find('.select-option');
    expect(dropdownOptions.first().find(Checkbox).exists()).toEqual(true);
  });
});
