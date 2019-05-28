import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Toast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showToast: props.show,
      dismissing: false,
    };
  }

  componentDidMount() {
    const {
      show,
      timeout,
    } = this.props;
    if (show && timeout !== -1) {
      this.toastTimer = setTimeout(() => {
        this.setState({
          showToast: false,
        }, () => {
          clearTimeout(this.toastTimer);
        });
      }, timeout);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      show,
    } = this.props;
    if (nextProps.show !== show) {
      this.setState({
        showToast: nextProps.show,
      });
    }
  }

  componentWillUnmount() {
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
        }, () => {
          clearTimeout(this.toastTimer);
          onDismiss();
        });
      }, 400);
    });
  };

  render() {
    const {
      message,
      dismissible,
    } = this.props;
    const {
      showToast,
      dismissing,
    } = this.state;

    const toastStyle = {
      left: (document.documentElement.clientWidth / 2) - 250,
    };

    return showToast ? (
      <div className={`toast ${dismissing ? 'dismiss' : ''}`} style={toastStyle}>
        <div className="toastMsg">{message}</div>
        { dismissible &&
          <button type="button" className="toastClose" onClick={this.closeToast}>
            <i className="fa fa-close"></i>
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
};

Toast.defaultProps = {
  timeout: -1,
  show: false,
  dismissible: true,
  onDismiss: () => {},
};

export default Toast;
