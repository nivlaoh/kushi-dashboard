import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import Alert from '../../Shared/components/Alert';
import Button from '../../shared/components/Button';
import { Card, CardTitle, CardBody, CardFooter } from '../../shared/components/Card';
import TextBox from '../../shared/components/TextBox';

import styles from './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Hi',
      password: 'pass',
      errorMessage: null,
    };

    this.updateVal = this.updateVal.bind(this);
    this.login = this.login.bind(this);
    this.dismissMsg = this.dismissMsg.bind(this);
  }

  updateVal(field, val) {
    this.setState({
      [field]: val
    });
  }

  login(e) {
    this.setState({
      errorMessage: 'Test',
    });
  }

  dismissMsg() {
    this.setState({
      errorMessage: null,
    });
  }

  render() {
    return (
      <div className="loginContainer">
        <Card className="loginCard">
          <CardBody className="loginCardBody">
            <div className="loginTitle">
              Welcome
            </div>
            <TextBox
              value={this.state.username}
              onChange={e => this.updateVal('username', e.target.value)}
              placeholder="Username"
              label="Username:"
              fluid
              icon="fa fa-user"
            />
            <TextBox
              type="password"
              value={this.state.password}
              onChange={e => this.updateVal('password', e.target.value)}
              placeholder="Password"
              label="Password:"
              fluid
              icon="fa fa-key"
            />
            <a href="#">Forgot your password?</a>
            { !isEmpty(this.state.errorMessage) &&
              <Alert errorMessage={this.state.errorMessage} onDismiss={this.dismissMsg} />
            }
          </CardBody>
          <CardFooter rightAligned>
            <Button text="Login" type="primary" onClick={this.login} />
          </CardFooter>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
