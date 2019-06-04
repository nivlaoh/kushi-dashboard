import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Stepper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.steps.length > 0 ? 0 : -1,
      focus: -1,
    };
  }

  goNextStep = (e) => {
    const {
      active,
    } = this.state;
    if (parseInt(e.target.id, 10) === active + 1) {
      this.setState({
        focus: active + 1,
      });
    }
  };

  deactivate = (e) => {
    this.setState({
      focus: -1,
    });
  }

  getStepClasses = (index) => {
    const {
      active,
      focus,
    } = this.state;

    let c = 'step';
    if (active === index) {
      c += ' active';
    }
    if (focus === index) {
      c += ' next';
    }
    return c;
  };

  render() {
    const {
      steps,
      nextStep,
    } = this.props;

    return (
      <div className="stepperContainer">
        { steps && steps.map((step, index) => (
          <div
            id={index}
            key={step.title}
            className={this.getStepClasses(index)}
            onMouseOver={this.goNextStep}
            onMouseOut={this.deactivate}
            onClick={this.nextStep}
          >
            <div className="stepCount">{index + 1}</div>
            <div className="stepTitle">{step.title}</div>
            <div className="description">{step.description}</div>
          </div>
          )
        )}
      </div>
    );
  }
}

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({})),
  nextStep: PropTypes.func,
};

Stepper.defaultProps = {
  steps: [],
  nextStep: () => {},
};

export default Stepper;
