import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import './styles.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      searching: false,
      inputValue: '',
      dropdownVisible: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.length > 0 && nextProps.dropdownVisible) {
      this.setState({
        dropdownVisible: true,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  hideDropdown = () => {
    this.setState({
      dropdownVisible: false,
    });
  };

  handleClick = (e) => {
    if (isEmpty(this.node) || this.node.current.contains(e.target)) {
      return;
    }
    this.hideDropdown();
  };

  asyncSearch = (e) => {
    const {
      onChange,
    } = this.props;
    this.setState({
      searching: true,
      inputValue: e.target.value,
    });
    onChange(e);
    setTimeout(() => {
      this.setState({
        searching: false,
      });
    }, 50);
  };

  chooseResult = (result) => {
    this.setState({
      inputValue: result.value,
      dropdownVisible: false,
    });
  };

  render() {
    const {
      placeholder,
      onSearch,
      showSearchIcon,
      options,
    } = this.props;
    const {
      searching,
      inputValue,
      dropdownVisible,
    } = this.state;
    const textStyle = 'text';
    return (
      <div className="searchWrapper" ref={this.node}>
        <div className="searchContainer">
          <input
            type="text"
            className={textStyle}
            value={inputValue}
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
        { dropdownVisible &&
          <div className="searchResults">
            { options.map((result, resultIndex) =>
              <div key={result.key}
                role="button"
                tabIndex={resultIndex}
                className="searchResultRow"
                onClick={() => { this.chooseResult(result) }}
              >
                { result.value }
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  showSearchIcon: PropTypes.bool,
};

Search.defaultProps = {
  placeholder: 'Search...',
  options: [],
  onChange: () => {},
  onSearch: () => {},
  showSearchIcon: true,
};

export default Search;
