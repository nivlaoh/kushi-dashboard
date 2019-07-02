import React from 'react';
import { mount } from 'enzyme';
import { faInfoCircle, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import Toast from './Toast';

const wrapper = (props) => mount(<Toast {...props} />);

beforeAll(() => {
  library.add(faInfoCircle, faExclamationCircle, faCheckCircle);
});

describe('Toast', () => {
  it ('should hide Toast by default', () => {
    const component = wrapper({ message: 'test' });
    expect(component.find('.toast').exists()).toBe(false);
  });

  it('should show toast in the centre', () => {
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 1000);
    const component = wrapper({ message: 'test', show: true });
    expect(component.find('.toast').prop('style')).toHaveProperty('left', 250);
  });

  it('should show dismissible info toast by default', () => {
    const component = wrapper({ show: true, message: 'Sample message' });
    expect(component.find('.toastClose').exists()).toBe(true);
    expect(component.find('.toast.info').exists()).toBe(true);
    expect(component.find('.fa-info-circle').exists()).toBe(true);
    expect(component.find('.toastMsg').text()).toEqual('Sample message');
  });

  it('should show error toast', () => {
    const component = wrapper({ message: 'test', type: 'error', show: true });
    expect(component.find('.toastClose').exists()).toBe(true);
    expect(component.find('.toast.error').exists()).toBe(true);
    expect(component.find('.fa-exclamation-circle').exists()).toBe(true);
  });

  it('should show success toast', () => {
    const component = wrapper({ message: 'test', type: 'success', show: true });
    expect(component.find('.toastClose').exists()).toBe(true);
    expect(component.find('.toast.success').exists()).toBe(true);
    expect(component.find('.fa-check-circle').exists()).toBe(true);
  });

  it('should show disappearing toast if not dismissible', () => {
    const component = wrapper({ message: 'test', show: true, dismissible: false });
    expect(component.exists('.toast')).toBe(true);
    setTimeout(() => {
      expect(component.exists('.toast')).toBe(false);
    }, 3500);
  });
});
