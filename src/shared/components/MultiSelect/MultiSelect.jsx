import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmpty, isFunction } from 'lodash';

import Checkbox from '../Checkbox';

import './styles.scss';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.searchBox = React.createRef();

    this.state = {
      dropdownVisible: false,
      searchValue: '',
      filteredOptions: props.options,
      cursor: 0,
      selectedOptions: [],
    };

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleKeyDown = (e) => {
    const {
      cursor,
      dropdownVisible,
    } = this.state;
    const {
      options
    } = this.props;
    if (!dropdownVisible) {
      this.showDropdown();
      return;
    }
    let newCursorValue;
    if (e.keyCode === 38) {
      newCursorValue = Math.abs(cursor - 1) % options.length;
      this.setState({
        cursor: newCursorValue,
      });
    } else if (e.keyCode === 40) {
      newCursorValue = (cursor + 1) % options.length;
      this.setState({
        cursor: newCursorValue,
      });
    } else if (e.keyCode === 13) {
      this.setState({
        dropdownVisible: false,
        searchValue: options[cursor].value,
      });
    }
  };

  hoverOption = (index) => {
    this.setState({
      cursor: index,
    });
  };

  showSelectedTags = () => {
    const {
      selectedOptions,
    } = this.state;
    if (selectedOptions.length > 3) {
      return [
        selectedOptions[selectedOptions.length - 1],
        {
          key: 'more',
          value: `+${selectedOptions.length - 1} more`,
        },
      ];
    }
    return [...selectedOptions];
  };

  handleClick(e) {
    if (isEmpty(this.node) || isEmpty(this.node.current) || this.node.current.contains(e.target)) {
      return;
    }
    this.hideDropdown();
  }

  showDropdown() {
    this.setState({
      dropdownVisible: true,
    });
  }

  hideDropdown() {
    this.setState({
      dropdownVisible: false,
    });
  }

  selectOption(e) {
    const {
      options,
      multi,
      onChange,
    } = this.props;
    const {
      selectedOptions,
    } = this.state;
    const selectedOption = options.filter(option => option.key === e.target.getAttribute('refkey'))[0];
    if (multi) {
      const newSelected = selectedOptions.filter(s => s.key === selectedOption.key).length >= 1 ?
        selectedOptions.filter(s => s.key !== selectedOption.key) :
        [ ...selectedOptions, selectedOption ];
      this.searchBox.current.value = '';
      this.setState({
        selectedOptions: newSelected,
        searchValue: '',
        filteredOptions: options,
      }, onChange);
    } else {
      this.setState({
        searchValue: selectedOption.value,
        dropdownVisible: false,
      }, onChange);
    }
  }

  render() {
    const {
      placeholder,
      options,
      selected,
      readonly,
      multi,
      maxShown,
      searchDelay,
    } = this.props;
    const {
      cursor,
      dropdownVisible,
      filteredOptions,
      searchValue,
      selectedOptions,
    } = this.state;

    let value;
    if (isEmpty(searchValue)) {
      if (isEmpty(selected)) {
        value = '';
      } else {
        value = selected.value;
      }
    } else {
      value = searchValue;
    }

    const searchUpdate = debounce((e) => {
      e.persist();
      const {
        searchCallback,
        minCharacters,
        async,
      } = this.props;
      if (async && isFunction(searchCallback)
        && this.searchBox.current.value.length >= minCharacters) {
        console.log('searching...', e);
        searchCallback(e);
      } else {
       console.log(e);
        this.setState({
          filteredOptions: options.filter(option => option.value.toLowerCase().includes(this.searchBox.current.value)),
        });
      }
    }, searchDelay);

    const dropdownStyle = {
      maxHeight: `${55 * maxShown}px`,
      overflowY: 'auto',
    };

    return (
      <div className="select-container" ref={this.node}>
        <div className="selectedTags">
          { this.showSelectedTags().map(opt =>
            <div key={opt.key} className="selectedTag">
              <i className="fa fa-close" refkey={opt.key} onClick={this.selectOption}></i> &nbsp;{opt.value}
            </div>
          )}
        </div>
        <input
          type="text"
          ref={this.searchBox}
          placeholder={placeholder}
          onClick={this.showDropdown}
          onChange={searchUpdate.bind(this)}
          onKeyDown={this.handleKeyDown}
          defaultValue={value}
          disabled={readonly}
        />
        <div className="select-arrow">
          <i className="fa fa-caret-down"></i>
        </div>
        { dropdownVisible &&
          <div className="select-dropdown" style={dropdownStyle}>
            { filteredOptions.map((option, index) => (
              <div
                key={option.key}
                id={option.key}
                refkey={option.key}
                role="row"
                tabIndex={index}
                className={`select-option${index === cursor ? ' active' : ''}`}
                onMouseEnter={() => this.hoverOption(index)}
                onClick={this.selectOption}
              >
                <div className="option-value">
                  {option.value}
                </div>
                { multi &&
                  (<Checkbox
                    checked={selectedOptions.filter(selectedOpt => selectedOpt.key === option.key).length >= 1}
                    refkey={option.key}
                   />)
                }
              </div>
            ))
            }
          </div>
        }
      </div>
    );
  }
}

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
  selected: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  multi: PropTypes.bool,
  readonly: PropTypes.bool,
  async: PropTypes.bool,
  searchCallback: PropTypes.func,
  onChange: PropTypes.func,
  minCharacters: PropTypes.number,
  searchDelay: PropTypes.number,
  maxShown: PropTypes.number,
};

MultiSelect.defaultProps = {
  options: [],
  selected: null,
  placeholder: null,
  multi: false,
  readonly: false,
  async: false,
  searchCallback: null,
  onChange: () => {},
  minCharacters: 1,
  searchDelay: 200,
  maxShown: 5,
};

export default MultiSelect;
