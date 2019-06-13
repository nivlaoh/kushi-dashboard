import React from 'react';
import { mount } from 'enzyme';

import Button from './Button';

const wrapper = (props) => mount(<Button {...props} />)

describe('Button', () => {
  it('should show a text button by default', () => {
    const component = wrapper({ text: 'Test' });
    expect(component.find('button.default').exists()).toBe(true);
    expect(component.text()).toEqual('Test');
  });

  it('should show a primary button', () => {
    const component = wrapper({ type: 'primary', text: 'Test' });
    expect(component.find('button.primary').exists()).toBe(true);
  });

  it('should show a secondary button', () => {
    const component = wrapper({ type: 'secondary', text: 'Test' });
    expect(component.find('button.secondary').exists()).toBe(true);
  });

  it('should show an icon button', () => {
    const component = wrapper({ type: 'icon-clear', text: 'Test' });
    expect(component.find('button.icon-clear').exists()).toBe(true);
  });

  it('should apply custom class names', () => {
    const component = wrapper({ className: 'custom', text: 'Test' });
    expect(component.find('button.custom').exists()).toBe(true);
  });

  it('should trigger click function when clicked', () => {
    const clickFn = jest.fn();
    const component = wrapper({ text: 'Test', onClick: clickFn });
    component.simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
