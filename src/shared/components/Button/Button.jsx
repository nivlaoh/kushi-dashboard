import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Button extends Component {
	render() {
    const {
      text,
      type,
      onClick,
    } = this.props;

		return (
      <button className={type} onClick={onClick}>
        {text}
      </button>
    );
	}
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'default',
  onClick: () => {}
};

export default Button;
