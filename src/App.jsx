import React from 'react';
import { hot } from 'react-hot-loader/root';

import './App.scss';

const App = (props) => {
  const {
    children,
  } = props;
	return (
		<div className="App">
      {children}
		</div>
	);
}

export default hot(App);
