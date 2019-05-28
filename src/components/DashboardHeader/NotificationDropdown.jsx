import React, { Component } from 'react';
import PropTypes from 'prop-types';

import messages from '../Dashboard/messages.json';
import Dropdown from '../../shared/components/Dropdown';

class NotificationDropdown extends Component {
  render() {
    const {
      target,
      onSelected,
    } = this.props;

    const options = messages.map(msg => ({ key: msg.id, value: msg.message }));
    return (
      <div>
        <Dropdown target={target} options={options} onSelected={onSelected} />
      </div>
    );
  }
}

NotificationDropdown.propTypes = {
  target: PropTypes.shape({}).isRequired,
  onSelected: PropTypes.func,
};

NotificationDropdown.defaultProps = {
  onSelected: () => {},
};

export default NotificationDropdown;
