import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '../../models';
import MessagePane from './MessagePane';
import Toast from '../../shared/components/Toast';

const Notification = (props) => {
  const {
    showToast,
    messages,
    onRead,
    onSend,
  } = props;
  return (
    <div className="content-wrapper">
      <div className="pageTitle">Notifications</div>
      <Toast message="Email sent" show={showToast} />
      <div className="messageContentWrapper">
        <MessagePane messages={messages} onRead={onRead} onSend={onSend} />
      </div>
    </div>
  );
};

Notification.propTypes = {
  showToast: PropTypes.bool,
  messages: PropTypes.arrayOf(Message),
  onRead: PropTypes.func,
  onSend: PropTypes.func,
};

Notification.defaultProps = {
  showToast: false,
  messages: [],
  onRead: () => {},
  onSend: () => {},
};

export default Notification;
