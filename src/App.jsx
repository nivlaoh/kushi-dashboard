import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import Button from './shared/components/Button';
import { Card, CardTitle, CardFooter } from './shared/components/Card';
import Login from './components/Login';

import './App.scss';

class App extends Component {
	render() {
		return (
			<div className="App">
        <Login />
			</div>
		);
	}
}

export default hot(App);
