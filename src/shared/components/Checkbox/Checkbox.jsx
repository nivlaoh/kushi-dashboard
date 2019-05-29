import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Checkbox extends Component {
  checkboxShape = () => {
    const {
      checked,
      shape,
      captureClick,
    } = this.props;
    let checkboxClasses = 'checkbox';
    if (checked) {
      checkboxClasses += ' checked';
    }
    if (shape === 'circle') {
      checkboxClasses += ' circle';
    }
    if (!captureClick) {
      checkboxClasses += ' noclick';
    }
    return checkboxClasses;
  };

  clickCheckbox = (e) => {
    const {
      disabled,
      onCheck,
    } = this.props;
    if (disabled) {
      e.preventDefault();
      return;
    }
    onCheck(e);
  };

  render() {
    const {
      label,
      textPosition,
      captureClick,
      refkey,
    } = this.props;

    return (
      <div className={`checkboxWrapper ${captureClick ? '' : 'noclick'}`}>
        <div
          className={this.checkboxShape()}
          onClick={this.clickCheckbox}
          role="button"
          tabIndex="0"
          style={{ order: textPosition === 'right' ? 1 : 2 }}
          refkey={refkey}
        >
        </div>
        { label &&
          <div
            className={`checkboxLabel ${textPosition === 'left' ? 'left' : ''}`}
            refkey={refkey}
            style={{ order: textPosition === 'right' ? 2 : 1 }}>
          { label }
          </div>
        }
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  captureClick: PropTypes.bool,
  onCheck: PropTypes.func,
  shape: PropTypes.oneOf(['square', 'circle']),
  label: PropTypes.string,
  textPosition: PropTypes.oneOf(['left', 'right']),
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  captureClick: true,
  onCheck: () => {},
  shape: 'square',
  label: null,
  textPosition: 'right',
};

export default Checkbox;
