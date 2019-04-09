import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class TextBox extends Component {
  render() {
    const {
      value,
      onChange,
      maxlength,
      placeholder,
    } = this.props;

    return (
      <div className="textContainer">
        <input
          type="text"
          className="text"
          value={value}
          onChange={onChange}
          maxLength={maxlength}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

TextBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  maxlength: PropTypes.number,
  placeholder: PropTypes.string,
};

TextBox.defaultProps = {
  onChange: () => {},
};

export default TextBox;
