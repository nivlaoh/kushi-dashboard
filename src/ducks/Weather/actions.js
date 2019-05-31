import types from './types';

const getAirTemperature = (temperature) => {
  return {
    type: types.GET_AIR_TEMP,
    temperature,
  };
};

const getWeatherForecast = (areaForecast) => {
  return {
    type: types.GET_WEATHER_FORECAST,
    areaForecast,
  };
};

export default {
  getAirTemperature,
  getWeatherForecast,
};
