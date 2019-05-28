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
    }
  }

  componentDidMount() {
    const {
      target,
    } = this.props;
    if (!isEmpty(target)) {
      target.current.addEventListener('mousedown', this.openDropdown, false);
    }
    document.addEventListener('mousedown', this.closeDropdown, false);
  }

  componentWillUnmount() {
    const {
      target,
    } = this.props;
    if (!isEmpty(target)) {
      target.current.removeEventListener('mousedown', this.openDropdown, false);
    }
    document.removeEventListener('mousedown', this.closeDropdown, false);
  }

  openDropdown = () => {
    this.setState({
      showDropdown: true,
    });
  };

  closeDropdown = (e) => {
    const {
      target,
    } = this.props;

    if (isEmpty(this.dropdownNode) || e.target === target.current || this.dropdownNode.current.contains(e.target)) {
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

  render() {
    const {
      target,
      options,
      maxShown,
    } = this.props;
    const {
      showDropdown,
    } = this.state;

    const dropdownStyle = {
      left: !isEmpty(target.current) ? target.current.offsetLeft : 0,
      top: !isEmpty(target.current) ? target.current.offsetTop + 40 : 0,
      height: maxShown === -1 ? 'auto' : maxShown * 46,
    };

    return showDropdown ? (
      <div className="dropdownMenu" style={dropdownStyle} ref={this.dropdownNode}>
        { options.map(option =>
          <div
            key={option.key}
            className="dropdownOption"
            role="button"
            tabIndex="0"
            onClick={e => { this.selectOption(e, option) }}
          >
            {option.value}
          </div>)
        }
      </div>
    ) : null;
  }
};

Dropdown.propTypes = {
  target: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
  onSelected: PropTypes.func,
  maxShown: PropTypes.number,
};

Dropdown.defaultProps = {
  options: [],
  onSelected: () => {},
  maxShown: 5,
};

export default Dropdown;
