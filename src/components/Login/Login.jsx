import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import Alert from '../../Shared/components/Alert';
import Button from '../../shared/components/Button';
import { Card, CardTitle, CardBody, CardFooter } from '../../shared/components/Card';
import TextBox from '../../shared/components/TextBox';

import styles from './styles.scss';

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
      loginDone: true,
    });
    this.props.login(this.state.username, this.state.password);
    setTimeout(() => {
      this.props.history.push('/dashboard');
    }, 800);
  }

  dismissMsg() {
    this.setState({
      errorMessage: null,
    });
  }

  render() {
    const cardStyle = this.state.loginDone ? 'loginCard fadeOut' : 'loginCard';
    return (
      <div className="loginContainer">
        <Card className={cardStyle}>
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
            <Link to="/login">Forgot your password here?</Link>
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

Login.propTypes = {
  login: PropTypes.func,
};

Login.defaultProps = {
  login: () => {},
};

export default Login;
