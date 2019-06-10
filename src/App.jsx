import React from 'react';
import { hot } from 'react-hot-loader/root';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faCog, faExclamationCircle, faHome, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

library.add(faCheckCircle, faCog, faExclamationCircle, faHome, faInfoCircle, faTimes);

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
