import { combineReducers } from 'redux';

import loginReducer from './ducks/Login';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
