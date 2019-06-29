import React from 'react';
import { mount } from 'enzyme';

import Datepicker from './Datepicker';

const wrapper = (props) => mount(<Datepicker {...props} />);

describe('Datepicker', () => {
  it('should show a textbox with date icon by default', () => {
    const component = wrapper();
    expect(component.exists('.text')).toEqual(true);
    const icon = component.find('.textboxIcon');
    expect(icon.exists()).toEqual(true);
    expect(icon.exists('.fa-calendar-day')).toEqual(true);
  });

  it('should show invalid date if date value is invalid', () => {
    const component = wrapper({ value: 'test' });
    const textbox = component.find('.text');
    expect(textbox.exists()).toEqual(true);
    expect(textbox.prop('value')).toEqual('Invalid date');
  });

  it('should show placeholder if provided', () => {
    const component = wrapper({ placeholder: 'Placeholder' });
    const textbox = component.find('.text');
    expect(textbox.exists()).toEqual(true);
    expect(textbox.prop('placeholder')).toEqual('Placeholder');
  });

  it('should show dialog when clicked', () => {
    const component = wrapper();
    const textbox = component.find('.text');
    expect(textbox.exists()).toEqual(true);
    textbox.simulate('click');
    expect(component.find('.popup').exists()).toEqual(true);
  });

  it('should return date value', () => {
    const changeFn = jest.fn();
    const component = wrapper({ onChange: changeFn });
    const textbox = component.find('.text');
    expect(textbox.exists()).toEqual(true);
    textbox.simulate('click');
    expect(component.find('.popup').exists()).toEqual(true);
    const firstDate = component.find('.dateItem.valid').at(0);
    firstDate.simulate('click');
    const okBtn = component.find('.primary');
    okBtn.simulate('click');
    expect(changeFn).toHaveBeenCalled();
    const changeResult = changeFn.mock.calls[0][0];
    expect(changeResult._isAMomentObject).toEqual(true);
  });
});
