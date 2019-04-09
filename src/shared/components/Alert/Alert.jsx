import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class Alert extends Component {
  render() {
    const {
      errorMessage,
      onDismiss,
    } = this.props;
    return (
      <div className="response-msg info">
        {errorMessage}
        <div className="dismiss-icon" onClick={onDismiss}>
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  errorMessage: PropTypes.string,
  onDismiss: PropTypes.func,
};

Alert.defaultProps = {
  onDismiss: () => {},
};

export default Alert;
