import axios from 'axios';

import actions from './actions';
import { getLocation, getNearestArea } from '../../utils/geolocation';

const getAirTemperature = () => (dispatch) => {
  axios.get('https://api.data.gov.sg/v1/environment/air-temperature')
    .then((response) => {
      console.log(response);
      dispatch(actions.getAirTemperature(response.data.items[0].readings[0].value));
    })
    .catch((error) => {
      console.log('error', error);
    });
};

const getWeatherForecast = () => (dispatch) => {
  let area = null;
  let myCoords = {
    latitude: 1.38,
    longitude: 103.839,
  };
  const locationCallback = (position) => {
    console.log('location', position);
    const {
      coords,
    } = position;
    if (position !== undefined) {
      myCoords = coords;
    }
  };
  axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
    .then((response) => {
      console.log('forecast', response);
      getLocation(locationCallback);
      area = getNearestArea(myCoords, response.data.area_metadata);
      const areaForecast = response.data.items[0].forecasts.filter(forecast => forecast.area === area);
      dispatch(actions.getWeatherForecast(areaForecast.length > 0 ? areaForecast[0] :
        response.data.items[0].forecasts[0]));
    })
    .catch((error) => {
      console.log('error', error);
    });
};

export default {
  getAirTemperature,
  getWeatherForecast,
};
