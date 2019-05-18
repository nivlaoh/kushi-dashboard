import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const CardTitle = (props) => {
  const {
    children,
  } = props;
  return (
    <div className="title">
      {children}
    </div>
  );
}

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardTitle;
