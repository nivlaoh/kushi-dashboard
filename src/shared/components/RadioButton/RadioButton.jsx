import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class RadioButton extends Component {
  radioClasses = () => {
    const {
      selected,
      captureClick,
      disabled,
    } = this.props;
    let classes = 'radio';
    if (selected) {
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
      onSelect,
    } = this.props;
    if (disabled) {
      e.preventDefault();
      return;
    }
    onSelect(e);
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
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  captureClick: PropTypes.bool,
  onSelect: PropTypes.func,
  label: PropTypes.string,
  textPosition: PropTypes.oneOf(['left', 'right']),
};

RadioButton.defaultProps = {
  selected: false,
  disabled: false,
  captureClick: true,
  onSelect: () => {},
  label: null,
  textPosition: 'right',
};

export default RadioButton;
