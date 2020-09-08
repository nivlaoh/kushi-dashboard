import React from 'react';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

const Alert = (props) => {
  const {
    message,
    type,
    onDismiss,
    isShowing,
  } = props;
  const messageClasses = `response-msg ${type}`;
  return isShowing && (
    <div className={messageClasses}>
      {message}
      { onDismiss !== null &&
        <div role="button" tabIndex={0} className="dismiss-icon" onClick={onDismiss}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      }
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['info', 'error']),
  onDismiss: PropTypes.func,
  isShowing: PropTypes.bool,
};

Alert.defaultProps = {
  message: null,
  type: 'info',
  onDismiss: null,
  isShowing: true,
};

export default Alert;
