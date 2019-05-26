import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import { Card, CardBody, CardFooter } from '../../shared/components/Card';
import TextBox from '../../shared/components/TextBox';

import './styles.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Hi',
      password: 'pass',
      errorMessage: null,
      loginDone: false,
    };

    this.updateVal = this.updateVal.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.dismissMsg = this.dismissMsg.bind(this);
  }

  onLogin() {
    const {
      location,
      login,
    } = this.props;
    const {
      username,
      password,
    } = this.state;

    console.log('from', location.state);
    login(username, password, () => {
      this.setState({
        loginDone: true,
      });
    });
  }

  updateVal(field, val) {
    this.setState({
      [field]: val
    });
  }

  dismissMsg() {
    this.setState({
      errorMessage: null,
    });
  }

  render() {
    const {
      username,
      password,
      errorMessage,
      loginDone,
    } = this.state;
    const {
      location,
      history,
    } = this.props;

    const cardStyle = loginDone ? 'loginCard fadeOut' : 'loginCard';
    const { from } = location.state || { from: { pathname: '/dashboard' }};
    if (loginDone) {
      setTimeout(() => history.push(from), 400);
    }

    return (
      <div className="loginContainer">
        <Card className={cardStyle}>
          <CardBody className="loginCardBody">
            <div className="loginTitle">
              Welcome
            </div>
            <TextBox
              value={username}
              onChange={e => this.updateVal('username', e.target.value)}
              placeholder="Username"
              label="Username:"
              fluid
              icon="fa fa-user"
            />
            <TextBox
              type="password"
              value={password}
              onChange={e => this.updateVal('password', e.target.value)}
              placeholder="Password"
              label="Password:"
              fluid
              icon="fa fa-key"
            />
            <Link to="/forgot-password">Forgot your password here?</Link>
            { !isEmpty(errorMessage) &&
              <Alert errorMessage={errorMessage} onDismiss={this.dismissMsg} />
            }
          </CardBody>
          <CardFooter rightAligned>
            <Button text="Login" type="primary" onClick={this.onLogin} />
          </CardFooter>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
};

Login.defaultProps = {
  login: () => {},
};

export default Login;
