import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import Button from '../Button';

import './styles.scss';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.dates = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.state = {
      currDate: moment(),
      dateRows: this.parseDateRows(),
    };
  }

  parseDateRows = (curr = moment()) => {
    const dateRows = [[]];
    const lastDayOfMonth = curr.endOf('month');
    let currWeek = 0;
    const lastDayDate = lastDayOfMonth.date();
    Array.from(Array(lastDayDate)).forEach((_, i) => {
      const dayIndex = this.dates.findIndex(date => date === curr.date(i+1).format('dd'));
      // console.log('dayIndex', dayIndex, i);
      while (dateRows[currWeek].length < dayIndex) {
        dateRows[currWeek].push({ id: `${i}`, day: '' });
      }
      dateRows[currWeek].push({ id: `${i}`, day: i+1 });
      if (dayIndex === 6 && i !== lastDayDate - 1) {
        currWeek += 1;
        dateRows.push([]);
      }
    });
    while (dateRows[currWeek].length < 7) {
      const lastDayInRow = dateRows[currWeek][dateRows[currWeek].length - 1];
      dateRows[currWeek].push({ id: `${parseInt(lastDayInRow.id, 10) + 1}`, day: '' });
    }

    dateRows.forEach(row => row.forEach((dateSlot, index) => { dateSlot.id = index; }));
    return dateRows;
  };

  prevMonth = () => {
    const {
      currDate,
    } = this.state;
    const prev = currDate.subtract(1, 'months');
    this.setState({
      currDate: prev,
      dateRows: this.parseDateRows(prev),
    });
  };

  nextMonth = () => {
    const {
      currDate,
    } = this.state;
    const next = currDate.add(1, 'months');
    this.setState({
      currDate: next,
      dateRows: this.parseDateRows(next),
    });
  };

  render() {
    const {
      currDate,
      dateRows,
    } = this.state;
    const today = moment().date();

    return (
      <div className="calendar">
        <div className="calHeader">
          <div className="monthControl">
            <Button type="icon-clear" className="btn" rounded onClick={this.prevMonth}>
              <FontAwesomeIcon icon={faArrowLeft} fixedWidth size="sm" />
            </Button>
          </div>
          <div className="currMonth">{ currDate.format('MMM YYYY') }</div>
          <div className="monthControl">
            <Button type="icon-clear" className="btn" rounded onClick={this.nextMonth}>
              <FontAwesomeIcon icon={faArrowRight} fixedWidth size="sm" />
            </Button>
          </div>
        </div>
        <div className="dates">
          <div className="week heading">
            { this.dates.map(day => (
              <div key={day} className="day">{day}</div>
            ))}
          </div>
          { dateRows.map((row, index) => (
            <div key={`w-${index}`} className={`week${ index % 2 === 0 ? ' even' : ' odd'}`}>
              { row.map(day => (
                <div key={day.id} className={`day${day.day === today ? ' today' : ''}`}>
                  {day.day}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar;
