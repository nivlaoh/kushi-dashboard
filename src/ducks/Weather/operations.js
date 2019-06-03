import axios from 'axios';

import actions from './actions';
import { getLocation, getNearestArea } from '../../utils/geolocation';
import logger from '../../utils/logger';

const getAirTemperature = () => (dispatch) => {
  axios.get('https://api.data.gov.sg/v1/environment/air-temperature')
    .then((response) => {
      dispatch(actions.getAirTemperature(response.data.items[0].readings[0].value));
    })
    .catch((error) => {
      logger(error, 'ERROR');
    });
};

const getWeatherForecast = () => (dispatch) => {
  let area = null;
  let myCoords = {
    latitude: 1.38,
    longitude: 103.839,
  };
  const locationCallback = (position) => {
    logger(`location ${position}`);
    const {
      coords,
    } = position;
    if (position !== undefined) {
      myCoords = coords;
    }
  };
  axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
    .then((response) => {
      getLocation(locationCallback);
      area = getNearestArea(myCoords, response.data.area_metadata);
      const areaForecast = response.data.items[0].forecasts.filter(forecast => forecast.area === area);
      dispatch(actions.getWeatherForecast(areaForecast.length > 0 ? areaForecast[0] :
        response.data.items[0].forecasts[0]));
    })
    .catch((error) => {
      logger(error, 'ERROR');
    });
};

export default {
  getAirTemperature,
  getWeatherForecast,
};
