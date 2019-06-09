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
    getAirTemperature();
    getWeatherForecast();
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
        <div className="infoRow">
          { this.getWeatherIcon(forecast) }{ forecast }
        </div>
        <div className="infoRow">
          <FontAwesomeIcon className="marker" icon={faMapMarker} /> { area }
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
