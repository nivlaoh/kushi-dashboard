import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const CardFooter = (props) => {
  const {
    children,
    rightAligned,
  } = props;
  return (
    <div className={`footer${rightAligned ? ' right' : ''}`}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  rightAligned: PropTypes.bool,
};

CardFooter.defaultProps = {
  rightAligned: false,
};

export default CardFooter;
