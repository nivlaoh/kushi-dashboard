import React from 'react';
import { mount } from 'enzyme';
import Stepper from './Stepper';

const wrapper = (props) => mount(<Stepper {...props} />);
const steps = [
  { title: 'Title 1', description: 'Description 1' },
  { title: 'Title 2', description: 'Description 2' },
];

describe('Stepper component', () => {
  it('should show steps when provided', () => {
    const component = wrapper({ steps });
    const stepsFound = component.find('.step');
    expect(stepsFound.length).toEqual(2);
    expect(stepsFound.at(0).find('.stepCount').text()).toEqual('1');
    expect(stepsFound.at(0).find('.stepTitle').text()).toEqual('Title 1');
    expect(stepsFound.at(0).find('.description').text()).toEqual('Description 1');
  });

  it('should show first step to be active by default', () => {
    const component = wrapper({ steps });
    const stepsFound = component.find('.step');
    expect(stepsFound.length).toEqual(2);
    expect(stepsFound.at(0).hasClass('active')).toEqual(true);
    expect(stepsFound.at(1).hasClass('active')).toEqual(false);
  });

  it('should show next step to be navigable by default', () => {
    const component = wrapper({ steps });
    let stepsFound = component.find('.step');
    expect(stepsFound.length).toEqual(2);
    expect(stepsFound.at(0).hasClass('active')).toEqual(true);
    component.instance().goNextStep({ target: { id: '1' } });
    component.update();
    stepsFound = component.find('.step');
    expect(stepsFound.at(1).hasClass('next')).toEqual(true);
  });
});
