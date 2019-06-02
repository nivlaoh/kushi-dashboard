import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';

import './styles.scss';

class TextBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      validationMessage: null,
    };
  }

  textChange = (e) => {
    e.persist();
    const {
      onChange,
      onValidate,
      fieldKey,
      onError,
    } = this.props;
    onChange(e);
    if (onValidate) {
      const validateResult = onValidate(fieldKey, e.target.value);
      if (isObject(validateResult)) {
        if (validateResult.success) {
          this.setState({
            showError: false,
          });
          onError(fieldKey, true);
          return;
        }
        onError(fieldKey, false);
        this.setState({
          showError: true,
          validationMessage: validateResult.message,
        });
      }
    }
  };

  getFieldIcon = () => {
    const {
      icon,
      type,
    } = this.props;
    if (icon !== null) {
      return icon;
    }
    if (type === 'phone') {
      return 'fa fa-phone';
    }
    if (type === 'email') {
      return 'fa fa-envelope-o';
    }
    if (type === 'password') {
      return 'fa fa-key';
    }
    return null;
  };

  render() {
    const {
      type,
      value,
      maxlength,
      placeholder,
      label,
      fluid,
      readOnly,
    } = this.props;
    const {
      showError,
      validationMessage,
    } = this.state;

    const textStyle = fluid ? 'text full' : 'text';
    const fieldIcon = this.getFieldIcon();

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
            onChange={this.textChange}
            maxLength={maxlength}
            placeholder={placeholder}
            readOnly={readOnly}
          />
          { fieldIcon &&
            <div className="textboxIcon">
              <i className={fieldIcon}></i>
            </div>
          }
        </div>
        { showError &&
          <div className="errorMessage">{ validationMessage }</div>
        }
      </div>
    );
  }
}

TextBox.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
  fieldKey: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
  onError: PropTypes.func,
  maxlength: PropTypes.number,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fluid: PropTypes.bool,
  icon: PropTypes.string,
  readOnly: PropTypes.bool,
};

TextBox.defaultProps = {
  type: 'text',
  fieldKey: undefined,
  value: undefined,
  onChange: () => {},
  onValidate: null,
  onError: () => {},
  maxlength: 999,
  placeholder: null,
  label: null,
  fluid: false,
  icon: null,
  readOnly: false,
};

export default TextBox;
