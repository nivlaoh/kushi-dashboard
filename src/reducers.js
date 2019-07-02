import { combineReducers } from 'redux';

import loginReducer from './ducks/Login';
import dashboardReducer from './ducks/Dashboard';
import notificationReducer from './ducks/Notification';
import weatherReducer from './ducks/Weather';
import galleryReducer from './ducks/Gallery';
import settingReducer from './ducks/Settings';
import stockReducer from './ducks/Stock';

const rootReducer = combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
  notification: notificationReducer,
  weather: weatherReducer,
  gallery: galleryReducer,
  settings: settingReducer,
  stock: stockReducer,
});

export default rootReducer;
