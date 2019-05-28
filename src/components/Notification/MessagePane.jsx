import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import Button from '../../shared/components/Button';
import Dropdown from '../../shared/components/Dropdown';
import { Message } from '../../models';

import './styles.scss';

class MessagePane extends Component {
  constructor(props) {
    super(props);
    this.activeNode = React.createRef();
    this.replyRef = React.createRef();

    this.state = {
      activeMessage: null,
      reply: false,
      closingReply: false,
      replyText: '',
    };
  }

  viewMessage = (msg) => {
    const {
      onRead,
    } = this.props;
    this.setState({
      activeMessage: msg,
    }, () => { onRead(msg) });
  };

  messageContext = (e, id) => {
    e.preventDefault();
    e.persist();
    this.activeNode = { current: e.target, x: e.clientX, y: e.clientY };
    console.log('...', e.clientX, e.clientY);
    this.setState({
      activeMessage: null,
    });
  };

  displayEmail = (field) => {
    const {
      activeMessage,
    } = this.state;

    if (isEmpty(activeMessage)) {
      return '';
    }
    if (field === 'from') {
      return activeMessage.senderName ?
        (<span><b>{activeMessage.senderName}</b> &lt;{activeMessage.senderEmail}&gt;</span>) :
        (<span>{activeMessage.senderEmail}</span>);
    }
    if (field === 'subject') {
      return activeMessage.subject;
    }
    return null;
  };

  getRandomColours = () => {
    const letters = '0123456789ABCDEF'.split('');
    let colour = '#';
    const addDigitToColour = (limit) => {
      colour += letters[Math.round(Math.random() * limit)]
    };
    for (let i = 0; i < 6; i += 1) {
      addDigitToColour(15);
    }
    return colour;
  };

  replyMessage = () => {
    this.setState({
      reply: true,
    });
  };

  closeReplyPane = () => {
    this.setState({
      closingReply: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          reply: false,
          closingReply: false,
        });
      }, 400);
    });
  }

  sendEmail = () => {
    const {
      onSend,
    } = this.props;
    onSend({
      text: this.replyRef.current.value,
    });
    this.closeReplyPane();
  };

  render() {
    const {
      messages,
    } = this.props;
    const {
      activeMessage,
      reply,
      closingReply,
      replyText,
    } = this.state;

    return (
      <div className="messageContainer">
        <div className="conversations">
          <div className="title">Conversations</div>
          <div className="recipientList">
            {messages.map(msg => (
              <div key={msg.id}
                className={`sender ${activeMessage && activeMessage.id === msg.id ? 'active' : ''}`}
                onClick={() => { this.viewMessage(msg) }}
                onContextMenu={e => { this.messageContext(e, msg.id) }}
                role="button"
                tabIndex="0"
              >
                <div className="senderIcon" style={{ backgroundColor: this.getRandomColours() }}>
                  <i className={`${msg.senderIcon ? msg.senderIcon : 'fa fa-user'}`}></i>
                </div>
                <div className="senderContents">
                  <div className="senderName">
                    {msg.senderName}
                    {msg.status === 'UNREAD' ?
                      <span className="unreadTag">NEW</span> : null
                    }
                  </div>
                  <div className="messageSnippet">{msg.message}</div>
                </div>
              </div>
            ))}
            <Dropdown
              target={this.activeNode}
              event="contextmenu"
              options={[{ key: 'test', value: 'test' }]}
            />
          </div>
        </div>
        <div className="messageBody">
          <div className="messageMetadata">
            <div className="metadata">
              <div className="tag">From:</div>
              <div className="tagValue">
                {this.displayEmail('from')}
              </div>
            </div>
            <div className="metadata">
              <div className="tag">Subject:</div>
              <div className="tagValue">{this.displayEmail('subject')}</div>
            </div>
          </div>
          <div className="messageToolbar">
            <div
              className="toolbarIcon"
              title="Reply"
              onClick={this.replyMessage}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-reply"></i>
            </div>
            <div className="toolbarIcon" title="Reply All">
              <i className="fa fa-reply-all"></i>
            </div>
            <div className="toolbarIcon" title="Forward">
              <i className="fa fa-share"></i>
            </div>
          </div>
          {reply &&
            <div className={`replyPane ${closingReply ? 'closing' : ''}`}>
              <textarea ref={this.replyRef}></textarea>
              <div className="closeReplyPane" role="button" tabIndex="0" onClick={this.closeReplyPane}>
                <i className="fa fa-close"></i>
              </div>
              <Button type="primary" className="sendMsgBtn" onClick={this.sendEmail}>
                Send
              </Button>
            </div>
          }
          <div
            className="messagePreview"
            dangerouslySetInnerHTML={{ __html: activeMessage ? activeMessage.message : 'Please click on a notification' }}
          >
          </div>
        </div>
      </div>
    );
  }
}

MessagePane.propTypes = {
  messages: PropTypes.arrayOf(Message),
  onRead: PropTypes.func,
  onSend: PropTypes.func,
};

MessagePane.defaultProps = {
  messages: [],
  onRead: () => {},
  onSend: () => {},
};

export default MessagePane;
