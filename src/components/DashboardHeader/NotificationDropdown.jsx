import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import messages from '../Dashboard/messages.json';
import Dropdown from '../../shared/components/Dropdown';

import './styles.scss';

class NotificationDropdown extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      target,
      onSelected,
    } = this.props;

    const options = messages.map(msg => ({ key: msg.id, message: msg }));
    const header = (props) => (<div className="dropdownHeader">Notifications</div>);
    const footer = (props) => (
      <div className="dropdownActions">
        <button type="button">Dismiss All</button>
      </div>
    );
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
            <FontAwesomeIcon icon={`${message.senderIcon ? message.senderIcon : 'user'}`} />
          </div>
          <div className="senderContents">
            <div className="senderName">
              { message.senderName }
              { message.status === 'UNREAD' ?
                <div className="unreadTag">NEW</div> : null
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
          stickTo="target"
          options={options}
          onSelected={onSelected}
          width={300}
          RowComponent={comp}
          Header={header}
          Footer={footer}
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
