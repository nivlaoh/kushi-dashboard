import { combineReducers } from 'redux';

import loginReducer from './ducks/Login';
import notificationReducer from './ducks/Notification';
import weatherReducer from './ducks/Weather';

const rootReducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
  weather: weatherReducer,
});

export default rootReducer;
