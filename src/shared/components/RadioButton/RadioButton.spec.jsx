import React from 'react';
import { mount } from 'enzyme';

import RadioButton from './RadioButton';

const wrapper = (props) => mount(<RadioButton {...props} />);

describe('RadioButton', () => {
  it('should show an unchecked circle by default', () => {
    const component = wrapper();
    expect(component.exists('.radio.selected')).toEqual(false);
    expect(component.exists('.radio')).toEqual(true);
    expect(component.exists('.radioLabel')).toEqual(false);
  });

  it('should show label if provided', () => {
    const component = wrapper({ label: 'Test' });
    const label = component.find('.radioLabel');
    expect(component.exists('.radio')).toEqual(true);
    expect(label.exists()).toEqual(true);
    expect(label.text()).toEqual('Test');
  });

  it('should show label on the left if specified', () => {
    const component = wrapper({ label: 'Test', textPosition: 'left' });
    const label = component.find('.radioLabel.left');
    expect(component.exists('.radio')).toEqual(true);
    expect(label.exists()).toEqual(true);
    expect(label.text()).toEqual('Test');
  });

  it('should show disabled checkbox', () => {
    const component = wrapper({ disabled: true });
    const radio = component.find('.radio.disabled');
    expect(radio.exists()).toEqual(true);
  });

  it('should call function on click', () => {
    const selectFn = jest.fn();
    const component = wrapper({ onSelect: selectFn });
    const radio = component.find('.radio');
    expect(radio.exists()).toEqual(true);
    radio.simulate('click');
    expect(selectFn).toHaveBeenCalled();
  });
});
