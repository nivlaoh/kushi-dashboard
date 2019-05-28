import { combineReducers } from 'redux';

import loginReducer from './ducks/Login';
import notificationReducer from './ducks/Notification';

const rootReducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
});

export default rootReducer;
