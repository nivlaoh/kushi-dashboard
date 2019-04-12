import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import styles from './styles.scss';

class Loader extends Component {
  constructor(props) {
    super(props);

    this.dismissLoader = this.dismissLoader.bind(this);

    this.dismissLoader(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activate) {
      console.log('dismiss', nextProps);
      this.dismissLoader(nextProps);
    }
  }

  dismissLoader(props) {
    if (isEmpty(this.timer) && props.timeout !== -1) {
      this.timer = setTimeout(() => {
        props.timeoutFn();
        clearTimeout(this.timer);
        this.timer = null;
      }, props.timeout);
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
