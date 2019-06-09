import React from 'react';
import { mount } from 'enzyme';

import TextBox from './TextBox';

const wrapper = (props) => mount(<TextBox {...props} />);

describe('TextBox', () => {
  it('should show an input text by default', () => {
    const component = wrapper();
    expect(component.find('input').exists()).toBe(true);
  });

  it('should show placeholder in input', () => {
    const component = wrapper({ placeholder: 'Placeholder' });
    const inputBox = component.find('input');
    expect(inputBox.prop('placeholder')).toEqual('Placeholder');
  });

  it('should have a label if specified', () => {
    const component = wrapper({ label: 'Label here' });
    const label = component.find('.label');
    expect(label.text()).toEqual('Label here');
  });

  it('should use set input readonly when TextBox is readonly', () => {
    const component = wrapper({ readOnly: true });
    const inputBox = component.find('input');
    expect(inputBox.prop('readOnly')).toBe(true);
  });

  it('should show icon if input type is non default', () => {
    let component = wrapper({ type: 'email' });
    let icon = component.find('.fa-envelope');
    expect(icon.exists()).toBe(true);

    component = wrapper({ type: 'tel' });
    icon = component.find('.fa-phone');
    expect(icon.exists()).toBe(true);

    component = wrapper({ type: 'password' });
    icon = component.find('.fa-key');
    expect(icon.exists()).toBe(true);
  });

  it('should show error message if onValidate returns false', () => {
    const validateFn = jest.fn(() => ({ success: false, message: 'Error here' }));
    const component = wrapper({ onValidate: validateFn });
    const event = { target: { value: 'wrong' } };
    const inputBox = component.find('input');
    inputBox.simulate('change', event);
    expect(validateFn).toHaveBeenCalled();
    expect(component.find('.errorMessage').text()).toEqual('Error here');
  });
});
