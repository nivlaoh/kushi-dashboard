import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '../../models';
import MessagePane from './MessagePane';

const Notification = (props) => {
  const {
    messages,
    onRead,
  } = props;
  return (
    <div className="content-wrapper">
      <div className="pageTitle">Notifications</div>
      <div className="messageContentWrapper">
        <MessagePane messages={messages} onRead={onRead} />
      </div>
    </div>
  );
};

Notification.propTypes = {
  messages: PropTypes.arrayOf(Message),
  onRead: PropTypes.func,
};

Notification.defaultProps = {
  messages: [],
  onRead: () => {},
};

export default Notification;
