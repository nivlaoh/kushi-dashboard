import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Alert = (props) => {
  const {
    errorMessage,
    message,
    onDismiss,
  } = props;
  const messageClasses = `response-msg ${errorMessage ? 'error' : 'info'}`;
  return (
    <div className={messageClasses}>
      {errorMessage}
      {message}
      <div role="button" tabIndex={0} className="dismiss-icon" onClick={onDismiss}>
        <i className="fa fa-times"></i>
      </div>
    </div>
  );
}

Alert.propTypes = {
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  onDismiss: PropTypes.func,
};

Alert.defaultProps = {
  errorMessage: null,
  message: null,
  onDismiss: () => {},
};

export default Alert;
