import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Message } from '../../models';
import MessagePane from './MessagePane';
import Toast from '../../shared/components/Toast';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMessage: null,
    };
  }

  componentDidMount() {
    const {
      getMessages,
    } = this.props;
    getMessages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length > 0) {
      this.setState({
        activeMessage: nextProps.messages.find(msg => msg.id === nextProps.match.params.msgId),
      });
    }
  }

  render() {
    const {
      activeMessage,
    } = this.state;
    const {
      showToast,
      messages,
      onRead,
      onSend,
      deleteMessage,
    } = this.props;
    return (
      <div className="content-wrapper">
        <div className="pageTitle">Notifications</div>
        <Toast message="Email sent" show={showToast} />
        <div className="messageContentWrapper">
          <MessagePane
            messages={messages}
            onRead={onRead}
            onSend={onSend}
            deleteMessage={deleteMessage}
            active={activeMessage}
          />
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  showToast: PropTypes.bool,
  messages: PropTypes.arrayOf(Message),
  getMessages: PropTypes.func,
  deleteMessage: PropTypes.func,
  onRead: PropTypes.func,
  onSend: PropTypes.func,
};

Notification.defaultProps = {
  showToast: false,
  messages: [],
  getMessages: () => {},
  deleteMessage: () => {},
  onRead: () => {},
  onSend: () => {},
};

export default Notification;
