import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
    };
  }

  asyncSearch = () => {
    const {
      onChange,
    } = this.props;
    this.setState({
      searching: true,
    });
    onChange();
    setTimeout(() => {
      this.setState({
        searching: false,
      });
    }, 50);
  };

  render() {
    const {
      value,
      placeholder,
      onSearch,
      showSearchIcon,
    } = this.props;
    const {
      searching,
    } = this.state;
    const textStyle = 'text';
    return (
      <div className="searchWrapper">
        <div className="searchContainer">
          <input
            type="text"
            className={textStyle}
            value={value}
            onChange={this.asyncSearch}
            placeholder={placeholder}
          />
          { searching && showSearchIcon &&
            <div className="searchIcon">
              <i className="fa fa-spinner fa-spin fa-fw"></i>
            </div>
          }
        </div>
        <button type="button" className="searchBtn" onClick={onSearch}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  showSearchIcon: PropTypes.bool,
};

Search.defaultProps = {
  value: '',
  placeholder: 'Search...',
  onChange: () => {},
  onSearch: () => {},
  showSearchIcon: true,
};

export default Search;
