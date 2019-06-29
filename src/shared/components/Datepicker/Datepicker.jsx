import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import Dialog from '../Dialog';
import Calendar from '../Calendar';

class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCal: false,
      selectedDate: null,
      dateValue: this.parseDate(props),
      view: this.setView(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      value,
    } = this.props;
    const newState = {};
    if (nextProps.value !== value) {
      const dateVal = this.parseDate(nextProps);
      if (dateVal !== 'Invalid date') {
        newState.dateValue = dateVal;
      } else {
        newState.dateValue = dateVal;
      }
    }
    newState.view = this.setView(nextProps);
    this.setState(newState);
  }

  setView = (props) => {
    return props.dateFormat.includes('D') ? 'day' : 'month';
  };

  parseDate = (nextProps) => {
    const possibleDate = moment(nextProps.value, nextProps.dateFormat);
    if (possibleDate.isValid()) {
      return possibleDate.format(nextProps.dateFormat);
    }
    return 'Invalid date';
  };

  openCalendar = () => {
    this.setState({
      showCal: true,
    });
  };

  closeCalendar = () => {
    this.setState({
      showCal: false,
    });
  };

  chooseDateAndClose = () => {
    const {
      onChange,
    } = this.props;
    const {
      selectedDate,
    } = this.state;

    this.setState({
      showCal: false,
    });
    onChange(selectedDate);
  };

  selectDate = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  textChange = (e) => {
    e.persist();
    const {
      onChange,
    } = this.props;

    onChange(e);
  };

  getTextClasses = () => {
    const {
      fluid,
      className,
    } = this.props;
    let textClass = 'text';
    if (fluid) {
      textClass += ' full';
    }
    if (className !== '') {
      textClass += ` ${className}`;
    }
    return textClass;
  };

  render() {
    const {
      label,
      placeholder,
      maxlength,
      fluid,
      readOnly,
      onKeyDown,
      innerRef,
    } = this.props;
    const {
      showCal,
      dateValue,
      view,
    } = this.state;

    return (
      <div className={`textContainer ${fluid ? 'full' : ''}`}>
        { label &&
          <div className="label">{label}</div>
        }
        <div className="textboxRow">
          <input
            type="date"
            ref={innerRef}
            className={this.getTextClasses()}
            value={dateValue}
            onClick={this.openCalendar}
            onChange={this.textChange}
            onKeyDown={onKeyDown}
            maxLength={maxlength}
            placeholder={placeholder}
            readOnly={readOnly}
          />
          <div className="textboxIcon">
            <FontAwesomeIcon icon={faCalendarDay} />
          </div>
        </div>
        <Dialog
          mode="confirm"
          title="Pick a date"
          show={showCal}
          onConfirm={this.chooseDateAndClose}
          onDismiss={this.closeCalendar}
        >
          <Calendar onSelect={this.selectDate} mode={view} />
        </Dialog>
      </div>
    );
  }
}

Datepicker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  dateFormat: PropTypes.string,
  maxlength: PropTypes.number,
  fluid: PropTypes.bool,
  readOnly: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
};

Datepicker.defaultProps = {
  label: null,
  placeholder: null,
  value: '',
  dateFormat: 'YYYY-MM-DD',
  maxlength: 999,
  fluid: false,
  readOnly: false,
  onKeyDown: () => {},
  onChange: () => {},
};

export default React.forwardRef((props, ref) => <Datepicker innerRef={ref} {...props} />);
