import React from 'react';
import { mount } from 'enzyme';
import Loader from './Loader';

const wrapper = (props) => mount(<Loader {...props} />);

describe('Loader component', () => {
  it('should contain overlay and wait icon on activate', () => {
    const component = wrapper({ activate: true });
    expect(component.find('.loader-container').exists()).toBe(true);
    expect(component.find('.fa-circle-notch').exists()).toBe(true);
  });

  it('should not show anything if not activated', () => {
    const component = wrapper({});
    expect(component.exists('.loader-container')).toBe(false);
  });

  it('should dismiss Loader automatically if it has timeout', () => {
    const timeoutFn = jest.fn();
    const component = wrapper({ activate: true, timeout: 20, timeoutFn });
    setTimeout(() => {
      expect(timeoutFn).toHaveBeenCalled();
    }, 40);
  });
});
