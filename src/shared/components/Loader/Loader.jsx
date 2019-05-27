import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import './styles.scss';

class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offLoader: !props.activate,
    };

    this.dismissLoader = this.dismissLoader.bind(this);
  }

  componentDidMount() {
    const {
      activate,
      timeout,
    } = this.props;
    if (activate && timeout !== -1) {
      this.dismissLoader(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      activate,
      timeout,
    } = this.props;
    console.log('willReceive', activate, this.state.offLoader);
    if (activate && timeout !== -1) {
      console.log('here');
      this.dismissLoader(nextProps);
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    clearTimeout(this.timer);
    clearTimeout(this.loaderTimer);
  }

  dismissLoader(props) {
    console.log('dismissLoader', props.activate);
    if (isEmpty(this.timer) && props.timeout !== -1) {
      console.log('waiting');
      this.timer = setTimeout(() => {
        console.log('clear timer');
        props.timeoutFn();
        clearTimeout(this.timer);
        this.timer = null;

        this.loaderTimer = setTimeout(() => this.setState({
          offLoader: true,
        }, () => {
          clearTimeout(this.loaderTimer);
          this.loaderTimer = null;
        }), 400);

      }, props.timeout);
    }
  }

  render() {
    const {
      activate,
    } = this.props;
    const {
      offLoader,
    } = this.state;

    const loaderClasses = !activate ? 'loader-container fadeOut' : 'loader-container';
    return (
      !offLoader ?
      <div className={loaderClasses}>
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
  activate: false,
  timeoutFn: () => {},
  timeout: -1,
};

export default Loader;
