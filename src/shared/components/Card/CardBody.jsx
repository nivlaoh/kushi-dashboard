import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const CardBody = (props) => {
  const {
    className,
    children,
  } = props;
  return (
    <div className={`body ${className}`}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardBody.defaultProps = {
  className: '',
};

export default CardBody;
