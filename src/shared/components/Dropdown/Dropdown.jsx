import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import './styles.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.dropdownNode = React.createRef();
    this.xBuffer = 25;
    this.yBuffer = 25;
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
    if (!isEmpty(target) && !isEmpty(target.current)) {
      target.current.removeEventListener(event, this.openDropdown, false);
    }
    document.removeEventListener('mousedown', this.closeDropdown, false);
  }

  openDropdown = (e) => {
    console.log('showing at ', e.clientX, e.clientY);
    const {
      target,
      stickTo,
    } = this.props;
    const x = stickTo === 'cursor' ? e.clientX : target.current.getBoundingClientRect().left;
    const y = stickTo === 'cursor' ? e.clientY :
      target.current.getBoundingClientRect().top + (target.current.getBoundingClientRect().height/2);
    console.log('cal', x, y);
    this.setState({
      showDropdown: true,
      x,
      y,
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
    if (x + width > window.innerWidth) {
      return x - width/2 + this.xBuffer;
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
      Header,
      Footer,
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
      <div className="dropdownWrapper" style={dropdownStyle} ref={this.dropdownNode}>
        { Header &&
          <Header />
        }
        <div className="dropdownMenu">
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
        { Footer &&
          <Footer />
        }
      </div>
    ) : null;
  }
};

Dropdown.propTypes = {
  target: PropTypes.shape({}).isRequired,
  /** If stick to mouse, it will open where the cursor is, otherwise
  it will open with reference to target */
  stickTo: PropTypes.oneOf(['cursor', 'target']),
  event: PropTypes.oneOf(['mousedown', 'contextmenu']),
  /** Menu items */
  options: PropTypes.arrayOf(PropTypes.shape({})),
  onSelected: PropTypes.func,
  /** Number of items shown at one time */
  maxShown: PropTypes.number,
  width: PropTypes.number,
  truncateOption: PropTypes.bool,
  RowComponent: PropTypes.func,
  Header: PropTypes.func,
  Footer: PropTypes.func,
};

Dropdown.defaultProps = {
  stickTo: 'cursor',
  event: 'mousedown',
  options: [],
  onSelected: () => {},
  maxShown: 5,
  width: 150,
  truncateOption: true,
  RowComponent: null,
  Header: null,
  Footer: null,
};

export default Dropdown;
