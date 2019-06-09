import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.searchBox = React.createRef();
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
        dropdownVisible: true,
      });
    }, 50);
  };

  chooseResult = (result) => {
    this.setState({
      inputValue: result.value,
      dropdownVisible: false,
    });
  };

  checkKeystroke = (e) => {
    const {
      onSearch,
      options,
    } = this.props;
    if (e.keyCode === 13) {
      onSearch(e);
    } else if (e.keyCode === 9) {
      e.preventDefault();
      if (options.length > 0) {
        this.setState({
          inputValue: options[0].value,
        });
      }
    }
  };

  render() {
    const {
      placeholder,
      showSearchIcon,
      options,
    } = this.props;
    const {
      searching,
      inputValue,
      dropdownVisible,
    } = this.state;
    const resultStyle = {
      width: this.node.current === null ? 'auto' : this.node.current.clientWidth,
    };
    return (
      <div className="searchWrapper" ref={this.node}>
        <div className="searchContainer">
          <input
            type="text"
            ref={this.searchBox}
            className="search"
            value={inputValue}
            onChange={this.asyncSearch}
            onKeyDown={this.checkKeystroke}
            placeholder={placeholder}
          />
          <FontAwesomeIcon className="innericon" icon={faSearch} />
          { searching && showSearchIcon &&
            <div className="searchIcon">
              <FontAwesomeIcon icon={faSpinner} spin fixedWidth />
            </div>
          }
        </div>
        { dropdownVisible &&
          <div className="searchResults" style={resultStyle}>
            { options.map((result, resultIndex) =>
              <div key={result.key}
                role="button"
                tabIndex={resultIndex}
                className="searchResultRow valid"
                onClick={() => { this.chooseResult(result) }}
              >
                { result.value }
              </div>
            )}
            { options.length === 0 &&
              <div className="searchResultRow">No results found</div>
            }
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
