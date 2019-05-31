import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Weather from './Weather';
import operations from '../../ducks/Weather/operations';

const mapStateToProps = (state, ownProps) => {
  return {
    temperature: state.weather.temperature,
    forecast: state.weather.forecast,
    area: state.weather.area,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAirTemperature: () => operations.getAirTemperature()(dispatch),
  getWeatherForecast: () => operations.getWeatherForecast()(dispatch),
});

const WidgetContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Weather));

export default WidgetContainer;
