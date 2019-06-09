import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logger from '../../../utils/logger';

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
      document.body.classList.toggle('noscroll', true);
      this.dismissLoader(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      activate,
      timeout,
    } = this.props;
    if (activate && timeout !== -1) {
      this.dismissLoader(nextProps);
    }
  }

  componentWillUnmount() {
    logger('unmount');
    clearTimeout(this.timer);
    clearTimeout(this.loaderTimer);
  }

  dismissLoader(props) {
    if (isEmpty(this.timer) && props.timeout !== -1) {
      this.timer = setTimeout(() => {
        logger('clear timer');
        props.timeoutFn();
        clearTimeout(this.timer);
        this.timer = null;

        this.loaderTimer = setTimeout(() => this.setState({
          offLoader: true,
        }, () => {
          clearTimeout(this.loaderTimer);
          this.loaderTimer = null;
          document.body.classList.toggle('noscroll', false);
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
        <FontAwesomeIcon icon={faCircleNotch} size="3x" spin fixedWidth />
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
