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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test@test.com',
      password: 'password',
      errorMessage: null,
      loginDone: false,
      form: {
        username: true,
        password: true,
      },
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
      form,
    } = this.state;

    console.log('from', location.state);
    if (Object.values(form).every(item => item)) {
      login(username, password, () => {
        this.setState({
          loginDone: true,
        });
      });
    }
  }

  validateField = (fieldKey, fieldValue) => {
    if (fieldKey === 'email') {
      const result = validateEmail(fieldValue);
      return {
        success: result,
        message: 'Please enter a valid email address',
      };
    }
    if (fieldKey === 'password') {
      if (fieldValue.length < 3) {
        return {
          success: false,
          message: 'Password is too short',
        };
      }
      return {
        success: true,
      };
    }
    return null;
  };

  updateForm = (fieldKey, result) => {
    const {
      form,
    } = this.state;

    this.setState({
      form: {
        ...form,
        [fieldKey]: result,
      },
    });
  };

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
      form,
    } = this.state;
    const {
      location,
      history,
    } = this.props;

    const cardStyle = loginDone ? 'loginCard fadeOut' : 'loginCard';
    const { from } = location.state || { from: { pathname: '/' }};
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
              type="email"
              formData={form}
              fieldKey="email"
              value={username}
              onChange={e => this.updateVal('username', e.target.value)}
              placeholder="Username"
              label="Username:"
              fluid
              onValidate={this.validateField}
              onError={this.updateForm}
            />
            <TextBox
              type="password"
              formData={form}
              fieldKey="password"
              value={password}
              onChange={e => this.updateVal('password', e.target.value)}
              placeholder="Password"
              label="Password:"
              fluid
              onValidate={this.validateField}
              onError={this.updateForm}
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
