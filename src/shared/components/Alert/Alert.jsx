import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Alert = (props) => {
  const {
    errorMessage,
    onDismiss,
  } = props;
  return (
    <div className="response-msg info">
      {errorMessage}
      <div role="button" tabIndex={0} className="dismiss-icon" onClick={onDismiss}>
        <i className="fa fa-times"></i>
      </div>
    </div>
  );
}

Alert.propTypes = {
  errorMessage: PropTypes.string,
  onDismiss: PropTypes.func,
};

Alert.defaultProps = {
  errorMessage: null,
  onDismiss: () => {},
};

export default Alert;
