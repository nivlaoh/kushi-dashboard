import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { chunkArray } from './calendarUtil';

const getDateItemClasses = (month, viewDate) => {
  let dateClasses = 'dateItem';
  if (`${month} ${viewDate.format('YYYY')}` === moment().format('MMM YYYY')) {
    dateClasses += ' today';
  }
  if (month.dateLabel !== '') {
    dateClasses += ' valid';
  }
  return dateClasses;
};

const YearView = (props) => {
  const {
    monthLabels,
    columns,
    onSelect,
    viewDate,
  } = props;
  const yearView = chunkArray(monthLabels, columns);
  return (
    <div className="dates">
      { yearView.map((row, index) => (
        <div key={`y-${index}`} className={`dateRow${ index % 2 === 0 ? ' even' : ' odd'}`}>
          { row.map((month, monthIndex) => (
            <div
              key={month}
              className={getDateItemClasses(month, viewDate)}
              role="button"
              tabIndex={index*columns + monthIndex}
              onClick={onSelect}
            >
              {month}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

YearView.propTypes = {
  columns: PropTypes.number,
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  viewDate: PropTypes.shape({}),
  onSelect: PropTypes.func,
};

YearView.defaultProps = {
  columns: 3,
  monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  viewDate: moment(),
  onSelect: () => {},
};

export default YearView;
