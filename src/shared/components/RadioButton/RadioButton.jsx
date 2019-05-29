import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class RadioButton extends Component {
  radioClasses = () => {
    const {
      checked,
      captureClick,
      disabled,
    } = this.props;
    let classes = 'radio';
    if (checked) {
      classes += ' selected';
    }
    if (!captureClick) {
      classes += ' noclick';
    }
    if (disabled) {
      classes += ' disabled';
    }
    return classes;
  };

  clickRadio = (e) => {
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
    } = this.props;

    return (
      <div className={`radioWrapper ${captureClick ? '' : 'noclick'}`}>
        <div
          className={this.radioClasses()}
          onClick={this.clickRadio}
          role="button"
          tabIndex="0"
          style={{ order: textPosition === 'right' ? 1 : 2 }}
        >
        </div>
        { label &&
          <div
            className={`radioLabel ${textPosition === 'left' ? 'left' : ''}`}
            style={{ order: textPosition === 'right' ? 2 : 1 }}>
          { label }
          </div>
        }
      </div>
    );
  }
}

RadioButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  captureClick: PropTypes.bool,
  onCheck: PropTypes.func,
  label: PropTypes.string,
  textPosition: PropTypes.oneOf(['left', 'right']),
};

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
  captureClick: true,
  onCheck: () => {},
  label: null,
  textPosition: 'right',
};

export default RadioButton;
