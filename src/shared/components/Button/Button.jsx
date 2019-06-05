import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { withTooltip } from '../Tooltip';

import './styles.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.btnRef = React.createRef();
  }

  getButtonClasses = () => {
    const {
      type,
      rounded,
      className,
    } = this.props;
    let btnClass = type;
    if (rounded) {
      btnClass += ' rounded';
    }
    if (!isEmpty(className)) {
      btnClass += ` ${className}`;
    }
    return btnClass;
  };

  render() {
    const {
      text,
      onClick,
      children,
      title,
    } = this.props;

    const ButtonComponent = () =>
      <button type="button" ref={this.btnRef} className={this.getButtonClasses()} onClick={onClick}>
        { text || children }
      </button>;
    const ButtonWithTooltip = withTooltip(() => <ButtonComponent />);

  	return title ? (
      <ButtonWithTooltip text={title} />
    ) : (<ButtonComponent />);
  }
}

Button.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'secondary', 'icon-clear']),
  rounded: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: null,
  title: null,
  type: 'default',
  rounded: false,
  className: '',
  children: null,
  onClick: () => {}
};

export default Button;
