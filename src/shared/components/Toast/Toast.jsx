import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

class Toast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showToast: props.show,
      dismissing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showToast: nextProps.show,
    }, () => {
      if (!nextProps.dismissible) {
        if (this.toastTimer) {
          clearTimeout(this.toastTimer);
          this.toastTimer = null;
        }
        this.toastTimer = setTimeout(() => {
          this.closeToast();
        }, nextProps.timeout);
      }
    });
  }

  componentWillUnmount() {
    clearTimeout(this.toastTimer);
    this.toastTimer = null;
  }

  closeToast = () => {
    const {
      onDismiss,
    } = this.props;
    this.setState({
      dismissing: true,
    }, () => {
      this.toastTimer = setTimeout(() => {
        this.setState({
          showToast: false,
          dismissing: false,
        }, () => {
          clearTimeout(this.toastTimer);
          this.toastTimer = null;
          onDismiss();
        });
      }, 400);
    });
  };

  getToastIcon = () => {
    const {
      icon,
      type,
    } = this.props;
    if (icon === null) {
      if (type === 'success') {
        return 'check-circle';
      }
      if (type === 'info') {
        return 'info-circle';
      }
      if (type === 'error') {
        return 'exclamation-circle';
      }
    }
    return icon;
  };

  render() {
    const {
      message,
      dismissible,
      type,
    } = this.props;
    const {
      showToast,
      dismissing,
    } = this.state;

    const toastStyle = {
      left: (document.documentElement.clientWidth / 2) - 250,
    };

    const showIcon = this.getToastIcon();

    return showToast ? (
      <div className={`toast ${type} ${dismissing ? 'dismiss' : ''}`} style={toastStyle}>
        { showIcon &&
          <div className="toastIcon">
            <FontAwesomeIcon icon={showIcon} size="2x" />
          </div>
        }
        <div className="toastMsg">{message}</div>
        { dismissible &&
          <button type="button" className="toastClose" onClick={this.closeToast}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        }
      </div>
    ) : null;
  }
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  show: PropTypes.bool,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  type: PropTypes.oneOf(['info', 'success', 'error']),
  icon: PropTypes.string,
};

Toast.defaultProps = {
  timeout: 3000,
  show: false,
  dismissible: true,
  onDismiss: () => {},
  type: 'success',
  icon: null,
};

export default Toast;
