import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import MonthView from './MonthView';
import YearView from './YearView';

import './styles.scss';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDate: moment().startOf('day'),
      view: this.setView(props),
      selectedDate: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      view,
    } = this.props;
    if (nextProps.view !== view) {
      this.setState({
        view: this.setView(nextProps),
      });
    }
  }

  setView = (props) => {
    return props.mode === 'day' ? 'month' : 'year';
  };

  goPrevious = () => {
    const {
      viewDate,
      view,
    } = this.state;
    let prev;
    if (view === 'month') {
      prev = viewDate.subtract(1, 'months');
    } else if (view === 'year') {
      prev = viewDate.subtract(1, 'years');
    }
    this.setState({
      viewDate: prev,
    });
  };

  goNext = () => {
    const {
      viewDate,
      view,
    } = this.state;
    let next;
    if (view === 'month') {
      next = viewDate.add(1, 'months');
    } else if (view === 'year') {
      next = viewDate.add(1, 'years');
    }
    this.setState({
      viewDate: next,
    });
  };

  toggleView = () => {
    const {
      view,
    } = this.state;

    this.setState({
      view: view === 'month' ? 'year' : 'month',
    });
  };

  getHeadingLabel = () => {
    const {
      viewDate,
      view,
    } = this.state;

    if (view === 'month') {
      return viewDate.format('MMM YYYY');
    }
    return viewDate.format('YYYY');
  };

  selectMonth = (e) => {
    const month = e.target.getAttribute('tabindex');
    const {
      viewDate,
    } = this.state;
    const {
      mode,
    } = this.props;
    this.setState({
      viewDate: viewDate.month(month),
      view: mode === 'day' ? 'month' : 'year',
    });
  };

  selectDay = (date) => {
    const {
      onSelect,
    } = this.props;
    this.setState({
      selectedDate: date,
    }, () => {
      onSelect(date);
    });
  };

  render() {
    const {
      dayLabels,
      monthLabels,
      scale,
      events,
    } = this.props;
    const {
      viewDate,
      view,
      selectedDate,
    } = this.state;

    return (
      <div className="calendar">
        <div className="calHeader">
          <div className="monthControl">
            <button type="button" className="btn" onClick={this.goPrevious}>
              <FontAwesomeIcon icon={faArrowLeft} fixedWidth size="sm" />
            </button>
          </div>
          <div className="currMonth">
            <button type="button" onClick={this.toggleView}>
              { this.getHeadingLabel() }
            </button>
          </div>
          <div className="monthControl">
            <button type="button" className="btn" onClick={this.goNext}>
              <FontAwesomeIcon icon={faArrowRight} fixedWidth size="sm" />
            </button>
          </div>
        </div>
        { view === 'month' ?
          <MonthView
            viewDate={viewDate}
            dayLabels={dayLabels}
            onSelect={this.selectDay}
            selected={selectedDate}
            scale={scale}
            events={events}
          /> :
          <YearView
            viewDate={viewDate}
            monthLabels={monthLabels}
            onSelect={this.selectMonth}
          />
        }
      </div>
    );
  }
}

Calendar.propTypes = {
  mode: PropTypes.oneOf(['day', 'month']),
  dayLabels: PropTypes.arrayOf(PropTypes.string),
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  scale: PropTypes.oneOf(['small', 'large']),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  onSelect: PropTypes.func,
};

Calendar.defaultProps = {
  mode: 'day',
  dayLabels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  scale: 'small',
  events: [],
  onSelect: () => {},
};

export default Calendar;
