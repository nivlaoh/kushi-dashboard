import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import { Card, CardBody, CardFooter } from '../../shared/components/Card';
import TextBox from '../../shared/components/TextBox';

import { validateEmail } from '../../utils/stringUtil';

import './styles.scss';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetDone: false,
      emailAddress: '',
      showMsg: false,
      messageType: 'error',
    };
  }

  onReset = () => {
    const {
      resetPassword,
      successMessage,
    } = this.props;
    const {
      emailAddress,
    } = this.state;
    if (validateEmail(emailAddress)) {
      resetPassword(emailAddress, () => {
        console.log('reset');
        this.setState({
          emailAddress: '',
          showMsg: true,
          message: successMessage,
          messageType: 'info',
        }, () => {
          setTimeout(() => this.setState({ resetDone: true }), 3000);
        });
      });
    } else {
      this.setState({
        showMsg: true,
        message: 'Invalid email address',
        messageType: 'error',
      });
    }
  }

  updateEmail = (e) => {
    const email = e.target.value;
    this.setState({
      emailAddress: email,
    });
  }

  dismissMsg = () => {
    this.setState({
      showMsg: false,
      message: null,
    });
  }

  render() {
    const {
      resetDone,
      emailAddress,
      message,
      showMsg,
      messageType,
    } = this.state;
    const {
      location,
      history: { push },
    } = this.props;

    const cardStyle = resetDone ? 'loginCard fadeOut' : 'loginCard';
    const { from } = location.state || { from: { pathname: '/login' }};
    if (resetDone) {
      setTimeout(() => push(from), 400);
    }

    return (
      <div className="forgotPasswordContainer">
        <Card className={cardStyle}>
          <CardBody className="loginCardBody">
            <div className="loginTitle">
              Forgot Password?
            </div>
            <p>Please key in your email address to reset your password</p>
            <TextBox
              type="email"
              value={emailAddress}
              onChange={this.updateEmail}
              placeholder="Email Address"
              label="Email Address:"
              fluid
            />
            <Alert
              message={message}
              onDismiss={this.dismissMsg}
              type={messageType}
              isShowing={showMsg}
            />
            <Link to="/login">Back to Login Page</Link>
          </CardBody>
          <CardFooter rightAligned>
            <Button text="Reset Password" type="primary" onClick={this.onReset} style={{ width: '160px' }} />
          </CardFooter>
        </Card>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  resetPassword: PropTypes.func,
  successMessage: PropTypes.string,
};

ForgotPassword.defaultProps = {
  resetPassword: () => {},
  successMessage: 'Reset password email sent',
};

export default ForgotPassword;
