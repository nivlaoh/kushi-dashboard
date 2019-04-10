import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Loader extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('aaa', nextProps);
    if (nextProps.timeout !== -1 && this.props.activate) {
      setTimeout(() => {
        this.props.timeoutFn();
      }, this.props.timeout);
    }
  }

  render() {
    const {
      activate,
    } = this.props;
    return (
      activate ?
      <div className="loader-container">
        <i className="fa fa-circle-o-notch fa-3x fa-spin fa-fw"></i>
      </div> :
      null
    );
  }
}

Loader.propTypes = {
  activate: PropTypes.bool,
  timeoutFn: PropTypes.func,
  timeout: PropTypes.number,
};

Loader.defaultProps = {
  timeoutFn: () => {},
  timeout: -1,
};

export default Loader;
