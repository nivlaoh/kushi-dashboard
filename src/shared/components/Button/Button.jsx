import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Button = (props) => {
  const {
    text,
    type,
    onClick,
    children,
    className,
  } = props;

  const buttonProps = {
    ...props,
    className: `${type} ${className}`,
    type: 'button',
  };

	return (
    <button type="button" className={type} onClick={onClick} {...buttonProps}>
      { text || children }
    </button>
  );
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
