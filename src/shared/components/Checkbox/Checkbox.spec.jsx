import React from 'react';
import { mount } from 'enzyme';

import Checkbox from './Checkbox';

const wrapper = (props) => mount(<Checkbox {...props} />);

describe('Checkbox', () => {
  it('should show an unchecked square box by default', () => {
    const component = wrapper();
    expect(component.exists('.checkbox .checked')).toEqual(false);
    expect(component.exists('.checkbox')).toEqual(true);
    expect(component.exists('.checkboxLabel')).toEqual(false);
  });

  it('should show label if provided', () => {
    const component = wrapper({ label: 'Test' });
    const label = component.find('.checkboxLabel');
    expect(component.exists('.checkbox')).toEqual(true);
    expect(label.exists()).toEqual(true);
    expect(label.text()).toEqual('Test');
  });

  it('should show label on the left if specified', () => {
    const component = wrapper({ label: 'Test', textPosition: 'left' });
    const label = component.find('.checkboxLabel.left');
    expect(component.exists('.checkbox')).toEqual(true);
    expect(label.exists()).toEqual(true);
    expect(label.text()).toEqual('Test');
  });

  it('should show circle checkbox', () => {
    const component = wrapper({ shape: 'circle' });
    const checkbox = component.find('.checkbox.circle');
    expect(checkbox.exists()).toEqual(true);
  });

  it('should call function on check', () => {
    const checkFn = jest.fn();
    const component = wrapper({ onCheck: checkFn });
    const checkbox = component.find('.checkbox');
    expect(checkbox.exists()).toEqual(true);
    checkbox.simulate('click');
    expect(checkFn).toHaveBeenCalled();
  });
});
