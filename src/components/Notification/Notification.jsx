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
      showToast: false,
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

  dismissToast = () => {
    this.setState({
      showToast: false,
    });
  };

  notifySuccess = () => {
    this.setState({
      showToast: true,
    });
  };

  sendMsg = (msg) => {
    const {
      onSend,
    } = this.props;
    onSend(msg, this.notifySuccess);
  };

  render() {
    const {
      activeMessage,
      showToast,
    } = this.state;
    const {
      messages,
      onRead,
      deleteMessage,
    } = this.props;
    return (
      <div className="content-wrapper">
        <div className="pageTitle">Notifications</div>
        <Toast message="Email sent" show={showToast} type="success" onDismiss={this.dismissToast} />
        <div className="messageContentWrapper">
          <MessagePane
            messages={messages}
            onRead={onRead}
            onSend={this.sendMsg}
            deleteMessage={deleteMessage}
            active={activeMessage}
          />
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  messages: PropTypes.arrayOf(Message),
  getMessages: PropTypes.func,
  deleteMessage: PropTypes.func,
  onRead: PropTypes.func,
  onSend: PropTypes.func,
};

Notification.defaultProps = {
  messages: [],
  getMessages: () => {},
  deleteMessage: () => {},
  onRead: () => {},
  onSend: () => {},
};

export default Notification;
