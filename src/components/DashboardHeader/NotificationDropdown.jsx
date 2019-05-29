import React, { Component } from 'react';
import PropTypes from 'prop-types';

import messages from '../Dashboard/messages.json';
import Dropdown from '../../shared/components/Dropdown';

import './styles.scss';

class NotificationDropdown extends Component {
  render() {
    const {
      target,
      onSelected,
    } = this.props;

    const options = messages.map(msg => ({ key: msg.id, message: msg }));
    const comp = ({ option, onClick }) => {
      const {
        message,
      } = option;
      return (
        <div key={message.id}
          className="sender"
          onClick={onClick}
          role="button"
          tabIndex="0"
        >
          <div className="senderIcon" style={{ backgroundColor: message.colour }}>
            <i className={`${message.senderIcon ? message.senderIcon : 'fa fa-user'}`}></i>
          </div>
          <div className="senderContents">
            <div className="senderName">
              { message.senderName }
              { message.status === 'UNREAD' ?
                <span className="unreadTag">NEW</span> : null
              }
            </div>
            <div className="messageSnippet">{message.message}</div>
          </div>
        </div>
      );
    };
    return (
      <div>
        <Dropdown
          target={target}
          options={options}
          onSelected={onSelected}
          width={300}
          RowComponent={comp}
        />
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
