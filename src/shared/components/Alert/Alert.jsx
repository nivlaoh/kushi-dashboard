import React from 'react';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <FontAwesomeIcon icon={faTimes} />
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
