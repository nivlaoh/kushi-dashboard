import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import TextBox from '../TextBox';

import './styles.scss';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptText: '',
    };
  }

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
    }, () => { onConfirm(promptText); });
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
          <div className="popupText">{text}</div>
          { mode === 'prompt' &&
            <TextBox
              type="text"
              className="popupReply"
              placeholder={defaultPrompt}
              value={promptText}
              onChange={this.updatePromptText}
            />
          }
          <div className="buttonsControl">
            { (mode === 'confirm' || mode === 'prompt') &&
              <Button onClick={onDismiss} style={btnStyles}>{btn2Text}</Button>
            }
            <Button type="primary" onClick={this.confirm} style={btnStyles}>{btn1Text}</Button>
          </div>
        </div>
      </div>
    ) : null;
  }
};

Popup.propTypes = {
  mode: PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  show: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  defaultPrompt: PropTypes.string,
  btn1Text: PropTypes.string,
  btn2Text: PropTypes.string,
  onConfirm: PropTypes.func,
  onDismiss: PropTypes.func,
};

Popup.defaultProps = {
  mode: 'alert',
  show: false,
  title: 'Hello',
  defaultPrompt: null,
  btn1Text: 'Ok',
  btn2Text: 'Cancel',
  onConfirm: () => {},
  onDismiss: () => {},
};

export default Popup;
