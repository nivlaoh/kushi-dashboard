import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import TextBox from '../TextBox';

import './styles.scss';

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.replyRef = React.createRef();

    this.state = {
      promptText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      document.body.classList.toggle('noscroll', true);
      setTimeout(() => {
        this.replyRef.current.focus();
      }, 10);
    }
  }

  onKeyDown = (e) => {
    const {
      onDismiss,
    } = this.props;

    if (e.key === 'Enter') {
      this.confirm();
    }
    if (e.key === 'Escape') {
      onDismiss();
    }
  };

  updatePromptText = (e) => {
    this.setState({
      promptText: e.target.value,
    });
  };

  confirm = () => {
    const {
      onConfirm,
    } = this.props;
    const {
      promptText,
    } = this.state;

    this.setState({
      promptText: '',
    }, () => {
      onConfirm(promptText);
      document.body.classList.toggle('noscroll', false);
    });
  }

  dismiss = () => {
    const {
      onDismiss,
    } = this.props;
    onDismiss();
    document.body.classList.toggle('noscroll', false);
  }

  render() {
    const {
      show,
      mode,
      title,
      text,
      btn1Text,
      btn2Text,
      onDismiss,
      defaultPrompt,
      children,
    } = this.props;
    const {
      promptText,
    } = this.state;

    const btnStyles = {
      minWidth: '90px',
    };

    return show ? (
      <div className="popupContainer">
        <div className="popup">
          <div className="popupTitle">{title}</div>
          { children === null &&
            <div className="popupContent">
              <div className="popupText">{text}</div>
              { mode === 'prompt' &&
                <TextBox
                  ref={this.replyRef}
                  type="text"
                  className="popupReply"
                  placeholder={defaultPrompt}
                  value={promptText}
                  tabIndex="0"
                  onChange={this.updatePromptText}
                  onKeyDown={this.onKeyDown}
                />
              }
            </div>
          }
          { children && <div className="popupText">{children}</div> }
          <div className="buttonsControl">
            { (mode === 'confirm' || mode === 'prompt') &&
              <Button onClick={this.dismiss} style={btnStyles}>{btn2Text}</Button>
            }
            <Button type="primary" onClick={this.confirm} style={btnStyles}>{btn1Text}</Button>
          </div>
        </div>
      </div>
    ) : null;
  }
};

Dialog.propTypes = {
  mode: PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  show: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  defaultPrompt: PropTypes.string,
  btn1Text: PropTypes.string,
  btn2Text: PropTypes.string,
  onConfirm: PropTypes.func,
  onDismiss: PropTypes.func,
  children: PropTypes.node,
};

Dialog.defaultProps = {
  mode: 'alert',
  show: false,
  title: 'Hello',
  text: null,
  defaultPrompt: null,
  btn1Text: 'Ok',
  btn2Text: 'Cancel',
  onConfirm: () => {},
  onDismiss: () => {},
  children: null,
};

export default Dialog;
