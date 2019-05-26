import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Tab = (props) => {
  const {
    title,
    active,
    onActivate,
  } = props;
  return (
    <div
      className={`tab ${active ? 'active' : ''}`}
      onClick={() => { onActivate(title) }}
      role="button"
      tabIndex="0"
    >
      {title}
    </div>
  );
}

Tab.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  active: PropTypes.bool,
  onActivate: PropTypes.func,
};

Tab.defaultProps = {
  id: '',
  title: '',
  active: false,
  onActivate: () => {},
};

export default Tab;
