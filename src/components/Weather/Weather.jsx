import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import moment from 'moment';

import './styles.scss';

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('mount');
    this.refreshWidget();
  }

  refreshWidget = () => {
    const {
      getAirTemperature,
      getWeatherForecast,
    } = this.props;
    getAirTemperature();
    getWeatherForecast();
  };

  getWeatherIcon = (forecast) => {
    if (isEmpty(forecast)) {
      return null;
    }
    const isDay = moment().hour() > 5 && moment().hour() < 18;
    return <i className={`weatherIcon wi wi-${isDay ? 'day' : 'night'}-${forecast.toLowerCase()}`}></i>;
  };

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
        <div className="infoRow">
          { this.getWeatherIcon(forecast) }{ forecast }
        </div>
        <div className="infoRow">
          <i className="marker fa fa-map-marker"></i> { area }
        </div>
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
