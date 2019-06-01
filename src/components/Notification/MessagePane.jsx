import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import Button from '../../shared/components/Button';
import Dropdown from '../../shared/components/Dropdown';
import TextBox from '../../shared/components/TextBox';
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
      compose: false,
      closingCompose: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({
        activeMessage: nextProps.active,
      });
    }
  }

  viewMessage = (msg) => {
    const {
      onRead,
    } = this.props;
    this.setState({
      activeMessage: msg,
      reply: false,
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

  deleteEmail = () => {
    const {
      deleteMessage,
    } = this.props;
    const {
      activeMessage,
    } = this.state;
    deleteMessage(activeMessage);
    this.setState({
      activeMessage: null,
    });
  };

  showComposeWindow = () => {
    const {
      compose,
    } = this.state;
    if (!compose) {
      this.setState({
        compose: true,
      });
    } else {
      this.setState({
        closingCompose: true,
      }, () => {
        setTimeout(() => {
          this.setState({
            closingCompose: false,
            compose: false,
          });
        }, 400);
      });
    }
  };

  composeEmail = () => {
    this.setState({
      compose: false,
    });
  };

  render() {
    const {
      messages,
    } = this.props;
    const {
      activeMessage,
      reply,
      closingReply,
      compose,
      closingCompose,
    } = this.state;

    return (
      <div className="messageContainer">
        <div className="conversations">
          <div className="headerPane">
            <div className="title">Conversations</div>
            <button type="button" className="controlIcons" onClick={this.showComposeWindow}>
              <i className="fa fa-envelope"></i>
            </button>
          </div>
          <div className="recipientList">
            {messages.map(msg => (
              <div key={msg.id}
                className={`sender ${activeMessage && activeMessage.id === msg.id ? 'active' : ''}`}
                onClick={() => { this.viewMessage(msg) }}
                onContextMenu={e => { this.messageContext(e, msg.id) }}
                role="button"
                tabIndex="0"
              >
                <div className="senderIcon" style={{ backgroundColor: msg.colour }}>
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
            <button
              type="button"
              className="toolbarIcon"
              title="Reply"
              onClick={this.replyMessage}
            >
              <i className="fa fa-reply"></i>
            </button>
            <button type="button" className="toolbarIcon" title="Reply All">
              <i className="fa fa-reply-all"></i>
            </button>
            <button type="button" className="toolbarIcon" title="Forward">
              <i className="fa fa-share"></i>
            </button>
            <button
              type="button"
              className="toolbarIcon"
              title="Delete"
              onClick={this.deleteEmail}
            >
              <i className="fa fa-trash"></i>
            </button>
            <div className="spacer"></div>
            <button type="button" className="toolbarIcon more" title="More">
              <i className="fa fa-caret-down"></i>
            </button>
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
          <div className={`composeWindow ${compose ? 'visible' : ''} ${closingCompose ? 'hide' : ''}`}>
            <div className="composeMetaRow">
              <TextBox placeholder="To" />
              <TextBox placeholder="Cc" />
            </div>
            <div className="composeMetaRow">
              <TextBox placeholder="Subject" />
            </div>
            <textarea className="composeContent"></textarea>
            <div className="buttonsControl">
              <Button type="default" onClick={this.composeEmail}>Cancel</Button>
              <Button type="primary" onClick={this.composeEmail}>Send</Button>
            </div>
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
  deleteMessage: PropTypes.func,
  active: PropTypes.shape({}),
};

MessagePane.defaultProps = {
  messages: [],
  onRead: () => {},
  onSend: () => {},
  deleteMessage: () => {},
};

export default MessagePane;
