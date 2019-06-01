import { combineReducers } from 'redux';

import loginReducer from './ducks/Login';
import notificationReducer from './ducks/Notification';
import weatherReducer from './ducks/Weather';
import settingReducer from './ducks/Settings';

const rootReducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
  weather: weatherReducer,
  settings: settingReducer,
});

export default rootReducer;
