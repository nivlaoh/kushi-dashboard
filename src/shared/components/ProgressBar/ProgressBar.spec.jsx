import React from 'react';
import { mount } from 'enzyme';
import ProgressBar from './ProgressBar';

const wrapper = (props) => mount(<ProgressBar {...props} />);

describe('ProgressBar', () => {
  it('should show a 0% bar by default', () => {
    const component = wrapper();
    expect(component.exists('.progressBase')).toBe(true);
    const bar = component.find('.progressBar');
    expect(bar.prop('style').width).toEqual('0%');
    expect(component.exists('.progressText')).toBe(false);
  });

  it('should show progressBar according to percentage', () => {
    const component = wrapper({ percentage: 50, showPercentage: true });
    expect(component.exists('.progressBase')).toBe(true);
    const bar = component.find('.progressBar');
    expect(bar.prop('style').width).toEqual('50%');
    const text = component.find('.progressText');
    expect(text.exists()).toBe(true);
    expect(text.text()).toEqual('50%');
  });

  it('should round off percentage', () => {
    const component = wrapper({ percentage: 83.3333, showPercentage: true });
    const text = component.find('.progressText');
    expect(text.exists()).toBe(true);
    expect(text.text()).toEqual('83%');
  });

  it('should not show percentage beyond 100%', () => {
    const component = wrapper({ percentage: 500, showPercentage: true });
    const text = component.find('.progressText');
    expect(text.exists()).toBe(true);
    expect(text.text()).toEqual('100%');
  });
});
