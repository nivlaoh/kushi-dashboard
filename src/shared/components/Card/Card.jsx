import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Card = (props) => {
  const {
    className,
    children,
  } = props;
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: ''
};

export default Card;
