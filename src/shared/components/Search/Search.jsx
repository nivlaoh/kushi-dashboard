import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, uniqueId } from 'lodash';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.searchBox = React.createRef();
    this.id = uniqueId('search-');
    this.state = {
      searching: false,
      inputValue: '',
      dropdownVisible: false,
      selecting: null,
      hint: null,
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
      options,
    } = this.props;
    const typedWords = e.target.value;
    let hint;
    if (options.length > 0 && options[0].value.toLowerCase().startsWith(typedWords.toLowerCase())) {
      const untypedParts = options[0].value.toLowerCase().substring(typedWords.length);
      hint = typedWords + untypedParts;
    }
    if (typedWords === '') {
      hint = null;
    }
    this.setState({
      searching: true,
      inputValue: typedWords,
    });
    onChange(e);
    setTimeout(() => {
      this.setState({
        searching: false,
        dropdownVisible: true,
        hint,
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
    const {
      selecting,
    } = this.state;

    if (e.key === 'Enter') {
      if (options.length > 0) {
        if (selecting !== null) {
          this.setState({
            inputValue: options[selecting].value,
            dropdownVisible: false,
            selecting: null,
            hint: null,
          });
        }
      }
      onSearch(e);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (options.length > 0) {
        const next = selecting === null ? 0 : selecting;
        this.setState({
          selecting: next,
          inputValue: options[next].value,
          hint: null,
        });
      }
    } else if (e.key === 'Escape') {
      this.setState({
        dropdownVisible: false,
        selecting: null,
        hint: null,
      });
    } else if (e.key === 'ArrowDown') {
      if (options.length > 0) {
        const next = selecting === null ? 0 : (selecting + 1) % options.length;
        this.setState({
          selecting: next,
        });
      }
    } else if (e.key === 'ArrowUp') {
      if (options.length > 0) {
        const next = selecting === null ? options.length - 1 : (selecting - 1 + options.length) % options.length;
        this.setState({
          selecting: next,
        });
      }
    }
  };

  getResultClasses = (index) => {
    let rowClass = 'searchResultRow valid';
    const {
      selecting,
    } = this.state;
    if (selecting === index) {
      rowClass += ' selected';
    }
    return rowClass;
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
      hint,
      selecting,
    } = this.state;
    const resultStyle = {
      width: this.node.current === null ? 'auto' : this.node.current.clientWidth,
    };
    return (
      <div className="searchWrapper" ref={this.node}>
        <div className="searchContainer" role="search">
          <input
            type="text"
            ref={this.searchBox}
            id={this.id}
            className="search"
            value={inputValue}
            onChange={this.asyncSearch}
            onKeyDown={this.checkKeystroke}
            placeholder={placeholder}
          />
          { options.length > 0 && hint !== null &&
            <div className="searchHint" aria-hidden="true">
              { hint }
            </div>
          }
          <FontAwesomeIcon className="innericon" icon={faSearch} />
          { searching && showSearchIcon &&
            <div className="searchIcon" role="presentation">
              <FontAwesomeIcon icon={faSpinner} spin fixedWidth />
            </div>
          }
        </div>
        { dropdownVisible &&
          <div
            className="searchResults"
            style={resultStyle}
            role="listbox"
            tabIndex="0"
            aria-activedescendant={`result-${selecting}`}
          >
            { options.map((result, resultIndex) =>
              <div key={result.key}
                role="option"
                id={`result-${resultIndex}`}
                tabIndex={resultIndex + 1}
                className={this.getResultClasses(resultIndex)}
                onClick={() => { this.chooseResult(result) }}
                aria-selected={resultIndex === selecting}
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
