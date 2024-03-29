import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { faCaretDown, faCaretUp, faReply, faReplyAll, faEnvelope, faShare, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    this.composeToRef = React.createRef();

    this.state = {
      activeMessage: null,
      reply: false,
      closingReply: false,
      compose: false,
      closingCompose: false,
      deleting: null,
      detailedMetadata: false,
      msgToSend: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      active,
    } = this.props;
    if (nextProps.active !== active) {
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
    if (field === 'cc') {
      return activeMessage.ccEmails.join(', ');
    }
    if (field === 'bcc') {
      return activeMessage.bccEmails.join(', ');
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
    this.setState({
      deleting: activeMessage.id,
    });
    setTimeout(() => {
      deleteMessage(activeMessage);
      this.setState({
        activeMessage: null,
        deleting: null,
      });
    }, 600);
  };

  showComposeWindow = () => {
    const {
      compose,
    } = this.state;
    if (!compose) {
      this.setState({
        compose: true,
      }, () => {
        this.composeToRef.current.focus();
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
    const {
      onSend,
    } = this.props;
    const {
      msgToSend,
    } = this.state;
    onSend({
      text: msgToSend.text,
    });
    this.setState({
      compose: false,
    });
  };

  cancelCompose = () => {
    this.setState({
      compose: false,
    });
  };

  getSenderClasses = (msg) => {
    const {
      activeMessage,
      deleting,
    } = this.state;
    let clz = 'sender';
    if (activeMessage && activeMessage.id === msg.id) {
      clz += ' active';
    }
    if (deleting === msg.id) {
      clz += ' deleting';
    }
    return clz;
  };

  showMore = () => {
    const {
      detailedMetadata,
    } = this.state;
    this.setState({
      detailedMetadata: !detailedMetadata,
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
      detailedMetadata,
    } = this.state;

    return (
      <div className="messageContainer">
        <div className="conversations">
          <div className="headerPane">
            <div className="title">Conversations</div>
            <button type="button" className="controlIcons" onClick={this.showComposeWindow}>
              <FontAwesomeIcon icon={faEnvelope} />
            </button>
          </div>
          <div className="recipientList">
            {messages.map(msg => (
              <div key={msg.id}
                className={this.getSenderClasses(msg)}
                onClick={() => { this.viewMessage(msg) }}
                onContextMenu={e => { this.messageContext(e, msg.id) }}
                role="button"
                tabIndex="0"
              >
                <div className="senderIcon" style={{ backgroundColor: msg.colour }}>
                  <FontAwesomeIcon icon={`${msg.senderIcon ? msg.senderIcon : 'user'}`} />
                </div>
                <div className="senderContents">
                  <div className="senderName">
                    {msg.senderName}
                    {msg.status === 'UNREAD' ?
                      <div className="unreadTag">NEW</div> : null
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
            { detailedMetadata && [
              <div key="cc" className="metadata">
                <div className="tag">Cc:</div>
                <div className="tagValue">
                  {this.displayEmail('cc')}
                </div>
              </div>,
              <div key="bcc" className="metadata">
                <div className="tag">Bcc:</div>
                <div className="tagValue">
                  {this.displayEmail('bcc')}
                </div>
              </div>
            ]}
            <div className="metadata">
              <div className="tag">Subject:</div>
              <div className="tagValue">{this.displayEmail('subject')}</div>
            </div>
            <div className="showMore">
              <button type="button" className="toolbarIcon more" title="More" onClick={this.showMore}>
                <FontAwesomeIcon icon={detailedMetadata ? faCaretUp : faCaretDown} />
              </button>
            </div>
          </div>
          <div className="messageToolbar">
            <button
              type="button"
              className="toolbarIcon"
              title="Reply"
              onClick={this.replyMessage}
              disabled={activeMessage === null}
            >
              <FontAwesomeIcon icon={faReply} />
            </button>
            <button
              type="button"
              className="toolbarIcon"
              title="Reply All"
              onClick={this.replyMessage}
              disabled={activeMessage === null}
            >
              <FontAwesomeIcon icon={faReplyAll} />
            </button>
            <button
              type="button"
              className="toolbarIcon"
              title="Forward"
              onClick={this.replyMessage}
              disabled={activeMessage === null}
            >
              <FontAwesomeIcon icon={faShare} />
            </button>
            <button
              type="button"
              className="toolbarIcon"
              title="Delete"
              onClick={this.deleteEmail}
              disabled={activeMessage === null}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div className="spacer"></div>
            <button type="button" className="toolbarIcon more" title="More">
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>
          {reply &&
            <div className={`replyPane ${closingReply ? 'closing' : ''}`}>
              <textarea ref={this.replyRef} placeholder="Type your reply here..."></textarea>
              <div className="closeReplyPane" role="button" tabIndex="0" onClick={this.closeReplyPane}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <Button type="primary" className="sendMsgBtn" onClick={this.sendEmail}>
                Send
              </Button>
            </div>
          }
          <div
            className="messagePreview"
            dangerouslySetInnerHTML={{ __html: activeMessage ?
              activeMessage.message :
              'Please click on a notification' }}
          >
          </div>
          <div className={`composeWindow ${compose ? 'visible' : ''} ${closingCompose ? 'hide' : ''}`}>
            <div className="composeMetaRow">
              <div className="infoRow">
                <TextBox ref={this.composeToRef} fluid placeholder="To" />
                <TextBox fluid placeholder="Cc" />
              </div>
            </div>
            <div className="composeMetaRow">
              <TextBox fluid placeholder="Subject" />
            </div>
            <textarea className="composeContent"></textarea>
            <div className="buttonsControl">
              <Button type="default" onClick={this.cancelCompose}>Cancel</Button>
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
  active: null,
};

export default MessagePane;
