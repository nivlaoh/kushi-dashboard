import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

class TextBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      validationMessage: null,
    };
    library.add(faEnvelope, faKey, faPhone);
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
    if (type === 'tel') {
      return 'phone';
    }
    if (type === 'email') {
      return 'envelope';
    }
    if (type === 'password') {
      return 'key';
    }
    return null;
  };

  getTextClasses = () => {
    const {
      fluid,
      className,
    } = this.props;
    let textClass = 'text';
    if (fluid) {
      textClass += ' full';
    }
    if (className !== '') {
      textClass += ` ${className}`;
    }
    return textClass;
  };

  render() {
    const {
      type,
      value,
      tabIndex,
      maxlength,
      placeholder,
      label,
      readOnly,
      fluid,
      onKeyDown,
      innerRef,
    } = this.props;
    const {
      showError,
      validationMessage,
    } = this.state;

    const fieldIcon = this.getFieldIcon();

    return (
      <div className={`textContainer ${fluid ? 'full' : ''}`}>
        { label &&
          <div className="label">{label}</div>
        }
        <div className="textboxRow">
          <input
            type={type}
            ref={innerRef}
            className={this.getTextClasses()}
            value={value}
            tabIndex={tabIndex}
            onChange={this.textChange}
            onKeyDown={onKeyDown}
            maxLength={maxlength}
            placeholder={placeholder}
            readOnly={readOnly}
          />
          { fieldIcon &&
            <div className="textboxIcon">
              <FontAwesomeIcon icon={fieldIcon} />
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
  /** Specifies input type of TextBox */
  type: PropTypes.oneOf(['text', 'date', 'number', 'tel', 'email', 'password']),
  /** identifier to be used for form */
  fieldKey: PropTypes.string,
  /** class name to be added for styling */
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabIndex: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  /** Event handler for validation */
  onValidate: PropTypes.func,
  onError: PropTypes.func,
  maxlength: PropTypes.number,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  /** if it's fluid, it will take the entire width */
  fluid: PropTypes.bool,
  /** string for font icon */
  icon: PropTypes.string,
  readOnly: PropTypes.bool,
};

TextBox.defaultProps = {
  type: 'text',
  fieldKey: undefined,
  className: '',
  value: '',
  tabIndex: '0',
  onChange: () => {},
  onKeyDown: () => {},
  onValidate: null,
  onError: () => {},
  maxlength: 999,
  placeholder: null,
  label: null,
  fluid: false,
  icon: null,
  readOnly: false,
};

export default React.forwardRef((props, ref) => <TextBox innerRef={ref} {...props} />);
