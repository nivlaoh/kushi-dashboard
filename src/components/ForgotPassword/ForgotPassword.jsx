import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import { Card, CardBody, CardFooter } from '../../shared/components/Card';
import TextBox from '../../shared/components/TextBox';

import './styles.scss';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetDone: false,
      emailAddress: '',
      showMsg: false,
    };
  }

  onReset = () => {
    const {
      resetPassword,
    } = this.props;
    const {
      emailAddress,
    } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(emailAddress.toLowerCase())) {
      resetPassword(emailAddress, () => {
        console.log('reset');
        this.setState({
          emailAddress: '',
          showMsg: true,
        }, () => {
          setTimeout(() => this.setState({ resetDone: true }), 3000);
        });
      });
    } else {
      this.setState({
        errorMessage: 'Invalid email address',
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
      errorMessage: null,
    });
  }

  render() {
    const {
      resetDone,
      emailAddress,
      errorMessage,
      showMsg,
    } = this.state;
    const {
      location,
      history: { push },
      successMessage,
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
              icon="fa fa-envelope"
            />
            { !isEmpty(errorMessage) || showMsg &&
              <Alert
                message={successMessage}
                errorMessage={errorMessage}
                onDismiss={this.dismissMsg}
              />
            }
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
