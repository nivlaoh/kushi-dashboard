import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

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

  render() {
    return (
      <div className="loginContainer">
        <Card className="loginCard">
          <CardTitle>
            Welcome
          </CardTitle>
          <CardBody>
            { !isEmpty(this.state.errorMessage) &&
              <div className="response-msg info">
                {this.state.errorMessage}
              </div>
            }
            Username:
            <TextBox
              value={this.state.username}
              onChange={e => this.updateVal('username', e.target.value)}
              placeholder="Username"
            />
            Password:
            <TextBox
              value={this.state.password}
              onChange={e => this.updateVal('password', e.target.value)}
              placeholder="Password"
            />
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
