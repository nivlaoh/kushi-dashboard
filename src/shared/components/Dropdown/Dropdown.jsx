import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import './styles.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.dropdownNode = React.createRef();

    this.state = {
      showDropdown: false,
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    const {
      target,
      event,
    } = this.props;
    if (!isEmpty(target) && !isEmpty(target.current)) {
      console.log('attaching click', target.current);
      target.current.addEventListener(event, this.openDropdown, false);
    }
    document.addEventListener('mousedown', this.closeDropdown, false);
  }

  componentWillReceiveProps(nextProps) {
    const {
      target,
      event,
    } = this.props;
    if ((isEmpty(target) || isEmpty(target.current)) && !isEmpty(nextProps.target.current)) {
      console.log('attaching added click', nextProps.target.current);
      nextProps.target.current.addEventListener(event, this.openDropdown, false);
      this.setState({
        showDropdown: true,
        x: nextProps.x,
        y: nextProps.y,
      });
    }
    if (!isEmpty(target) && !isEmpty(target.current) && !isEmpty(nextProps.target)
      && nextProps.target.current !== target.current) {
      console.log('change attached click', nextProps.target.current);
      nextProps.target.current.addEventListener(event, this.openDropdown, false);
      this.setState({
        showDropdown: true,
      });
    }
  }

  componentWillUnmount() {
    const {
      target,
      event,
    } = this.props;
    if (!isEmpty(target.current)) {
      target.current.removeEventListener(event, this.openDropdown, false);
    }
    document.removeEventListener('mousedown', this.closeDropdown, false);
  }

  openDropdown = (e) => {
    console.log('showing at ', e.clientX, e.clientY);
    this.setState({
      showDropdown: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  closeDropdown = (e) => {
    const {
      target,
    } = this.props;

    if (isEmpty(this.dropdownNode.current) || e.target === target.current || this.dropdownNode.current.contains(e.target)) {
      return;
    }

    this.setState({
      showDropdown: false,
    });
  };

  selectOption = (e, item) => {
    const {
      onSelected,
    } = this.props;

    this.setState({
      showDropdown: false,
    }, () => { onSelected(item) });
  };

  calculateDropdownLeft = (target) => {
    const {
      width,
    } = this.props;
    const {
      x,
    } = this.state;
    if (isEmpty(target) || isEmpty(target.current)) {
      return 0;
    }
    if (x + width > window.innerWidth - 25) {
      return x - width + 30;
    }
    return x;
  };

  render() {
    const {
      target,
      options,
      maxShown,
      truncateOption,
      width,
      RowComponent,
    } = this.props;
    const {
      showDropdown,
      y,
    } = this.state;
    const dropdownRowHeight = RowComponent ? 80 : 46;
    const dropdownStyle = {
      left: this.calculateDropdownLeft(target),
      top: !isEmpty(target) && !isEmpty(target.current) ? y + 20 : 0,
      maxHeight: maxShown === -1 ? 'auto' : maxShown * dropdownRowHeight,
    };
    const optionStyle = {
      width: `${width}px`,
    };

    return showDropdown ? (
      <div className="dropdownMenu" style={dropdownStyle} ref={this.dropdownNode}>
        { RowComponent === null && options.map(option =>
          <div
            key={option.key}
            className={`dropdownOption ${truncateOption ? 'truncate' : ''}`}
            style={optionStyle}
            role="button"
            tabIndex="0"
            onClick={e => { this.selectOption(e, option); }}
          >
            {option.value}
          </div>)
        }
        { RowComponent && options.map(option =>
          <RowComponent
            key={option.key}
            option={option}
            onClick={e => { this.selectOption(e, option); }}
          />)
        }
      </div>
    ) : null;
  }
};

Dropdown.propTypes = {
  target: PropTypes.shape({}).isRequired,
  event: PropTypes.oneOf(['mousedown', 'contextmenu']),
  options: PropTypes.arrayOf(PropTypes.shape({})),
  onSelected: PropTypes.func,
  maxShown: PropTypes.number,
  width: PropTypes.number,
  truncateOption: PropTypes.bool,
  RowComponent: PropTypes.func,
};

Dropdown.defaultProps = {
  event: 'mousedown',
  options: [],
  onSelected: () => {},
  maxShown: 5,
  width: 150,
  truncateOption: true,
  RowComponent: null,
};

export default Dropdown;
