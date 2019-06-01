import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.btnRef = React.createRef();
  }

  clickEvt = (e) => {
    e.preventDefault();
    const {
      onClick,
    } = this.props;
    console.log('aaa');
    this.btnRef.focus();
    onClick(e);
  };

  render() {
    const {
      text,
      type,
      onClick,
      children,
      className,
    } = this.props;

    const buttonProps = {
      ...this.props,
      className: `${type} ${className}`,
      type: 'button',
    };

  	return (
      <button type="button" ref={this.btnRef} className={type} onClick={this.clickEvt} {...buttonProps}>
        { text || children }
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'secondary']),
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: null,
  type: 'default',
  className: '',
  onClick: () => {}
};

export default Button;
