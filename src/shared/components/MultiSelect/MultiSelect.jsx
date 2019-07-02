import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmpty, isFunction, uniqueId } from 'lodash';
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Checkbox from '../Checkbox';
import { accentFold } from '../../../utils/stringUtil';

import './styles.scss';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.searchBox = React.createRef();
    this.id = uniqueId('multiselect-');

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

  componentWillReceiveProps(nextProps) {
    const {
      options,
      selected,
    } = this.props;
    let stateChange = {};
    if (nextProps.options.length !== options.length) {
      stateChange = {
        filteredOptions: nextProps.options,
      };
    }
    if (nextProps.selected !== selected) {
      stateChange.searchValue = '';
    }
    this.setState(stateChange);
    return true;
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
    const refKey = e.target.getAttribute('refkey');
    const selectedOption = options.filter(option => option.key === refKey)[0];
    if (multi) {
      const newSelected = selectedOptions.filter(s => s.key === selectedOption.key).length >= 1 ?
        selectedOptions.filter(s => s.key !== selectedOption.key) :
        [ ...selectedOptions, selectedOption ];
      this.searchBox.current.value = '';
      this.setState({
        selectedOptions: newSelected,
        searchValue: '',
        filteredOptions: options,
      }, () => { onChange(selectedOption); });
    } else {
      this.searchBox.current.value = selectedOption.value;
      this.setState({
        searchValue: selectedOption.value,
        dropdownVisible: false,
      }, () => { onChange(selectedOption); });
    }
  }

  render() {
    const {
      placeholder,
      label,
      options,
      selected,
      readonly,
      multi,
      maxShown,
      searchDelay,
      searchable,
    } = this.props;
    const {
      cursor,
      dropdownVisible,
      filteredOptions,
      searchValue,
      selectedOptions,
    } = this.state;

    let inputVal;
    if (isEmpty(searchValue)) {
      if (isEmpty(selected)) {
        inputVal = '';
      } else {
        inputVal = selected.value;
      }
    } else if (isEmpty(selected)) {
      inputVal = searchValue;
    } else {
      inputVal = selected.value;
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
        searchCallback(e);
      } else {
        this.setState({
          filteredOptions: options.filter(option =>
            accentFold(option.value).toLowerCase().includes(this.searchBox.current.value)),
        });
      }
    }, searchDelay);

    const dropdownStyle = {
      maxHeight: `${55 * maxShown}px`,
      overflowY: 'auto',
    };

    return (
      <div className="selectWrapper">
        { label &&
          <div className="label" htmlFor={this.id}>{label}</div>
        }
        <div className="select-container" ref={this.node}>
          <div className="selectedTags">
            { this.showSelectedTags().map(opt =>
              <div key={opt.key} className="selectedTag">
                <FontAwesomeIcon
                  icon={faTimes}
                  refkey={opt.key}
                  onClick={this.selectOption}
                />
                 &nbsp;{opt.value}
              </div>
            )}
          </div>
          <input
            type="text"
            ref={this.searchBox}
            id={this.id}
            placeholder={placeholder}
            onClick={this.showDropdown}
            onChange={searchUpdate.bind(this)}
            onKeyDown={this.handleKeyDown}
            defaultValue={inputVal}
            readOnly={readonly || !searchable}
            autoComplete="off"
          />
          <div className="select-arrow" aria-hidden="true">
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          { dropdownVisible &&
            <div className="select-dropdown" style={dropdownStyle} role="listbox">
              { filteredOptions.map((option, index) => (
                <div
                  key={option.key}
                  id={option.key}
                  refkey={option.key}
                  role="option"
                  tabIndex={index}
                  className={`select-option${index === cursor ? ' active' : ''}`}
                  onMouseEnter={() => this.hoverOption(index)}
                  onClick={this.selectOption}
                  aria-selected={selectedOptions.filter(selectedOpt => selectedOpt.key === option.key).length >= 1}
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
              { filteredOptions.length === 0 &&
                <div className="select-option">No option found</div>
              }
            </div>
          }
        </div>
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
  label: PropTypes.string,
  multi: PropTypes.bool,
  readonly: PropTypes.bool,
  async: PropTypes.bool,
  searchable: PropTypes.bool,
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
  label: null,
  multi: false,
  readonly: false,
  async: false,
  searchable: true,
  searchCallback: null,
  onChange: () => {},
  minCharacters: 1,
  searchDelay: 200,
  maxShown: 5,
};

export default MultiSelect;
