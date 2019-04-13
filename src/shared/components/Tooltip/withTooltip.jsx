import React from 'react';

import Tooltip from './Tooltip';

const withTooltip = (Component, propName = 'hovering') => {
  return class WithTooltip extends React.Component {
    state = { hovering: false };
    toolTip = React.createRef();
    mouseOver = (evt) => {
      this.setState({ hovering: true });
      let el = evt.currentTarget;
      if (el != null) {
        let rect = el.getBoundingClientRect();
        this.toolTip.current.show(rect);
      }
    };
    mouseOut = () => {
      this.setState({ hovering: false });
      this.toolTip.current.hide();
    };

    render() {
      const props = {
        [propName]: this.state.hovering,
        ...this.props,
      };
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
          <Tooltip ref={this.toolTip} text={this.props.text} />
        </div>
      );
    }
  }
};

export default withTooltip;
