import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';

class MonthView extends Component {
  getDateItemClasses = (day) => {
    const {
      scale,
    } = this.props;
    let dateClasses = 'dateItem';
    const today = moment().startOf('day');
    if (!isEmpty(day.date) && day.date.isSame(today)) {
      dateClasses += ' today';
    }
    if (scale === 'large') {
      dateClasses += ' large';
    }
    if (day.dateLabel !== '') {
      dateClasses += ' valid';
    }
    if (day.selected) {
      dateClasses += ' selected';
    }
    return dateClasses;
  };

  parseDateRows = (curr = moment()) => {
    const {
      dayLabels,
      selected,
    } = this.props;

    const dateRows = [[]];
    const lastDayOfMonth = curr.endOf('month').startOf('day');
    let currWeek = 0;
    const lastDayDate = lastDayOfMonth.date();

    Array.from(Array(lastDayDate)).forEach((_, i) => {
      const dayIndex = dayLabels.findIndex(date => date === curr.date(i+1).format('dd'));
      // dates spacing
      while (dateRows[currWeek].length < dayIndex) {
        dateRows[currWeek].push({ id: `${i}`, dateLabel: '' });
      }

      const iDate = moment(lastDayOfMonth).date(i+1);
      dateRows[currWeek].push({
        id: `${i}`,
        dateLabel: i+1,
        date: iDate,
        selected: selected !== null && selected.isSame(iDate),
      });

      // create new week rows
      if (dayIndex === 6 && i !== lastDayDate - 1) {
        currWeek += 1;
        dateRows.push([]);
      }
    });
    // dates spacing
    while (dateRows[currWeek].length < 7) {
      const lastDayInRow = dateRows[currWeek][dateRows[currWeek].length - 1];
      dateRows[currWeek].push({ id: `${parseInt(lastDayInRow.id, 10) + 1}`, dateLabel: '' });
    }

    dateRows.forEach(row => row.forEach((dateSlot, index) => { dateSlot.id = `${index}`; }));
    return dateRows;
  };

  selectDay = (e) => {
    const {
      onSelect,
      viewDate,
    } = this.props;
    const dateIndex = e.target.getAttribute('tabIndex');
    if (dateIndex !== '') {
      const d = moment(viewDate).date(dateIndex);
      onSelect(d);
    }
  };

  render() {
    const {
      dayLabels,
      viewDate,
      scale,
      events,
    } = this.props;
    const dateRows = this.parseDateRows(viewDate);

    return (
      <div className="dates">
        <div className="dateRow heading">
          { dayLabels.map(day => (
            <div key={day} className="dateItem">{day}</div>
          ))}
        </div>
        { dateRows.map((row, index) => (
          <div key={`w-${index}`} className={`dateRow${scale === 'large' ? ' large' : ''}${ index % 2 === 0 ? ' even' : ' odd'}`}>
            { row.map((day) => (
              <div
                key={day.id}
                className={this.getDateItemClasses(day)}
                role="button"
                tabIndex={day.dateLabel}
                onClick={this.selectDay}
              >
                <div className="shownDate">{day.dateLabel}</div>
                { events.map(event => event.date.isSame(moment(viewDate).date(day.dateLabel)) && (
                  <div key={event.id} className="event">{event.label}</div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
};

MonthView.propTypes = {
  dayLabels: PropTypes.arrayOf(PropTypes.string),
  viewDate: PropTypes.shape({}),
  scale: PropTypes.oneOf(['small', 'large']),
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    date: PropTypes.shape({}),
  })),
  onSelect: PropTypes.func,
  selected: PropTypes.shape({}),
};

MonthView.defaultProps = {
  dayLabels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  viewDate: moment(),
  scale: 'small',
  events: [],
  onSelect: () => {},
  selected: null,
};

export default MonthView;
