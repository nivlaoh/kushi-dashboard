import { combineReducers } from 'redux';

import loginReducer from './ducks/Login';
import dashboardReducer from './ducks/Dashboard';
import notificationReducer from './ducks/Notification';
import weatherReducer from './ducks/Weather';
import settingReducer from './ducks/Settings';

const rootReducer = combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
  notification: notificationReducer,
  weather: weatherReducer,
  settings: settingReducer,
});

export default rootReducer;
