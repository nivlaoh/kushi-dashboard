import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class TextBox extends Component {
  render() {
    const {
      type,
      value,
      onChange,
      maxlength,
      placeholder,
      label,
      fluid,
      icon,
    } = this.props;

    const textStyle = fluid ? 'text full' : 'text';

    return (
      <div className="textContainer">
        { label &&
          <div className="label">{label}</div>
        }
        <div className="textboxRow">
          <input
            type={type}
            className={textStyle}
            value={value}
            onChange={onChange}
            maxLength={maxlength}
            placeholder={placeholder}
          />
          { icon &&
            <div className="textboxIcon">
              <i className={icon}></i>
            </div>
          }
        </div>
      </div>
    );
  }
}

TextBox.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'password']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  maxlength: PropTypes.number,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fluid: PropTypes.bool,
  icon: PropTypes.string,
};

TextBox.defaultProps = {
  type: 'text',
  onChange: () => {},
};

export default TextBox;
