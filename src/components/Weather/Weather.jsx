import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { faSync, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../shared/components/Button';
import './styles.scss';

class Weather extends Component {
  componentDidMount() {
    console.log('mount');
    this.refreshWidget();
  }

  refreshWidget = () => {
    const {
      getAirTemperature,
      getWeatherForecast,
    } = this.props;
    if (getAirTemperature) {
      getAirTemperature();
    }
    if (getWeatherForecast) {
      getWeatherForecast();
    }
  };

  getWeatherIcon = (forecast) => {
    if (isEmpty(forecast)) {
      return null;
    }
    const isDay = moment().hour() > 5 && moment().hour() < 18;
    let description = forecast.replace(/\s+/g, '-').toLowerCase();
    if (description.includes('cloudy')) {
      description = 'cloudy';
    } else if (description.includes('light-rain')) {
      description = 'rain-mix';
    } else if (description.includes('light-showers')) {
      description = 'showers';
    } else if (description.includes('thundery-showers')) {
      description = 'thunderstorm';
    } else if (description.includes('rain')) {
      description = 'rain';
    }
    return <i className={`weatherIcon wi wi-${isDay ? 'day' : 'night'}-${description}`}></i>;
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
          <div className="widgetSettings">
            <Button type="icon-clear" rounded className="refreshBtn" onClick={this.refreshWidget}>
              <FontAwesomeIcon icon={faSync} />
            </Button>
          </div>
        </div>
        <div className="tempReading">{ temperature }{`\u00b0\u0043`}</div>
        <div className="infoRow weatherRow">
          { this.getWeatherIcon(forecast) }{ forecast }
        </div>
        <div className="infoRow locationRow">
          <FontAwesomeIcon className="marker" fixedWidth icon={faMapMarker} /> { area }
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
