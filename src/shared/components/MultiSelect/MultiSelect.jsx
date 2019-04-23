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
    if (!this.state.dropdownVisible) {
      this.showDropdown();
      return;
    }
    let newCursorValue;
    if (e.keyCode === 38) {
      newCursorValue = Math.abs(this.state.cursor - 1) % this.props.options.length;
      this.setState({
        cursor: newCursorValue,
      });
    } else if (e.keyCode === 40) {
      newCursorValue = (this.state.cursor + 1) % this.props.options.length;
      this.setState({
        cursor: newCursorValue,
      });
    } else if (e.keyCode === 13) {
      this.setState({
        dropdownVisible: false,
        searchValue: this.props.options[this.state.cursor].value,
      });
    }
  };

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
    const selectedOption = this.props.options.filter(option => option.key === e.target.id)[0];
    if (this.props.multi) {
      const newSelected = this.state.selectedOptions.filter(s => s.key === selectedOption.key).length >= 1 ?
        this.state.selectedOptions.filter(s => s.key !== selectedOption.key) :
        [ ...this.state.selectedOptions, selectedOption ];
      this.setState({
        searchValue: newSelected.map(o => o.value).join(', '),
        selectedOptions: newSelected,
      }, this.props.onChange);
    } else {
      this.setState({
        searchValue: selectedOption.value,
        dropdownVisible: false,
      }, this.props.onChange);
    }
  }

  hoverOption = (index) => {
    this.setState({
      cursor: index,
    });
  };



  render() {
    const {
      placeholder,
      options,
      selected,
      onChange,
      readonly,
      multi,
      maxShown,
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

    const dropdownStyle = {
      maxHeight: `${55 * maxShown}px`,
      overflowY: 'auto',
    };

    const tickboxClass = (option) => {
      return this.state.selectedOptions.filter(selected => selected.key === option.key).length >= 1 ?
        'tickbox checked' : 'tickbox';
    };

    return (
      <div className="select-container" ref={this.node}>
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
        { this.state.dropdownVisible &&
          <div className="select-dropdown" style={dropdownStyle}>
            { this.state.filteredOptions.map((option, index) => (
              <div
                key={option.key}
                id={option.key}
                className={`select-option${index === this.state.cursor ? ' active' : ''}`}
                onMouseEnter={() => this.hoverOption(index)}
                onClick={this.selectOption}
              >
                <div className="option-value">
                  {option.value}
                </div>
                { multi &&
                  (<div className={tickboxClass(option)}>
                  </div>)
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
