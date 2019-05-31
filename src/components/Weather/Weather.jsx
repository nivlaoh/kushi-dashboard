import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      getAirTemperature,
      getWeatherForecast,
    } = this.props;
    console.log('mount');
    getAirTemperature();
    getWeatherForecast();
  }

  refreshWidget = () => {};

  render() {
    const {
      temperature,
      forecast,
      area,
    } = this.props;
    return (
      <div className="widgetWrapper">
        <div className="infoRow">
          <div className="widgetName">Weather</div>
          <button type="button" className="refreshBtn fa fa-refresh" onClick={this.refreshWidget}>
          </button>
        </div>
        <div className="tempReading">{ temperature }{`\u00b0\u0043`}</div>
        { forecast } - { area }
      </div>
    );
  }
}

Weather.propTypes = {
  getAirTemperature: PropTypes.func.isRequired,
  getWeatherForecast: PropTypes.func.isRequired,
  temperature: PropTypes.number,
  area: PropTypes.string,
};

Weather.defaultProps = {
  temperature: 0,
  area: '',
};

export default Weather;
