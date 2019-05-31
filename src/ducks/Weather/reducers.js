import { GET_AIR_TEMP, GET_WEATHER_FORECAST } from './types';

const weatherReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_AIR_TEMP:
      return {
        ...state,
        temperature: action.temperature,
      };
    case GET_WEATHER_FORECAST:
      return {
        ...state,
        forecast: action.areaForecast.forecast,
        area: action.areaForecast.area,
      };
    default:
      return state;
  }
};

export default weatherReducer;
