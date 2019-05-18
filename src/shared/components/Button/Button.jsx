import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Button = (props) => {
  const {
    text,
    type,
    onClick,
  } = props;

	return (
    <button type="button" className={type} onClick={onClick}>
      {text}
    </button>
  );
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
