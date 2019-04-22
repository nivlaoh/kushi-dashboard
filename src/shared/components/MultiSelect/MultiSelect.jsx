import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmpty, isFunction } from 'lodash';

import styles from './styles.scss';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.searchBox = React.createRef();

    this.state = {
      dropdownVisible: false,
      searchValue: '',
      filteredOptions: props.options,
      highlight: -1,
    };

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
    document.addEventListener('keydown', this.highlightOption, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if (isEmpty(this.node) || this.node.current.contains(e.target)) {
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
    const val = this.props.options.filter(option => option.key === e.target.id)[0].value;
    this.setState({
      searchValue: val,
      dropdownVisible: false,
    }, this.props.onChange);
  }

  highlightOption = (e) => {
    if (!this.state.dropdownVisible) {
      this.showDropdown();
      return;
    }
    const newHighlightValue = (this.state.highlight + 1) % this.props.options.length;
    this.setState({
      highlight: newHighlightValue,
    });
    console.log('new', newHighlightValue);
  };

  render() {
    const {
      placeholder,
      options,
      selected,
      onChange,
      readonly,
    } = this.props;

    let value;
    if (isEmpty(this.state.searchValue)) {
      if (isEmpty(selected)) {
        value = '';
      } else {
        value = selected.value;
      }
    } else {
      value = this.state.searchValue;
    }

    const searchUpdate = debounce((e) => {
      e.persist();
      const {
        searchCallback,
        minCharacters,
        async,
        options,
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
    }, this.props.searchDelay);

    return (
      <div className="select-container" ref={this.node}>
        <input
          type="text"
          ref={this.searchBox}
          placeholder={placeholder}
          onClick={this.showDropdown}
          onChange={searchUpdate.bind(this)}
          defaultValue={value}
          readOnly={readonly}
        />
        { this.state.dropdownVisible &&
          <div className="select-dropdown">
            { this.state.filteredOptions.map((option, index) => (
              <div
                key={option.key}
                id={option.key}
                className={`select-option${index===this.state.highlight ? ' active' : ''}`}
                onClick={this.selectOption}
              >
                {index} {option.value}
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
};

MultiSelect.defaultProps = {
  options: [],
  multi: false,
  readonly: false,
  async: false,
  searchCallback: null,
  onChange: () => {},
  minCharacters: 1,
  searchDelay: 200,
};

export default MultiSelect;
