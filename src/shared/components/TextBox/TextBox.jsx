import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export const TextBox = (props) => {
  const {
    type,
    value,
    onChange,
    maxlength,
    placeholder,
    label,
    fluid,
    icon,
    errorMessage,
    onValidate,
  } = props;

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
      { errorMessage && !onValidate() &&
        <div className="errorMessage">
          {errorMessage}
        </div>
      }
    </div>
  );
};

TextBox.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
  maxlength: PropTypes.number,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fluid: PropTypes.bool,
  icon: PropTypes.string,
  errorMessage: PropTypes.string,
};

TextBox.defaultProps = {
  type: 'text',
  onChange: () => {},
  onValidate: () => true,
  maxlength: 999,
  placeholder: null,
  label: null,
  fluid: false,
  icon: null,
  errorMessage: 'error here',
};

export default TextBox;
