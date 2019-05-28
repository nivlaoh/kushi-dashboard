import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Message } from '../../models';
import MessagePane from './MessagePane';
import Toast from '../../shared/components/Toast';

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      getMessages,
    } = this.props;
    getMessages();
  }

  render() {
    const {
      showToast,
      messages,
      onRead,
      onSend,
    } = this.props;
    return (
      <div className="content-wrapper">
        <div className="pageTitle">Notifications</div>
        <Toast message="Email sent" show={showToast} />
        <div className="messageContentWrapper">
          <MessagePane messages={messages} onRead={onRead} onSend={onSend} />
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  showToast: PropTypes.bool,
  messages: PropTypes.arrayOf(Message),
  getMessages: PropTypes.func,
  onRead: PropTypes.func,
  onSend: PropTypes.func,
};

Notification.defaultProps = {
  showToast: false,
  messages: [],
  getMessages: () => {},
  onRead: () => {},
  onSend: () => {},
};

export default Notification;
