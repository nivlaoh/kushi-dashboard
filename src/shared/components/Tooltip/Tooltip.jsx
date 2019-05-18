import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible: false,
      x: 0,
      y: 0,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show(hoverRect) {
    this.setState({ visible: true }, this.pastShow.bind(this, hoverRect));
  }

  hide() {
    this.setState({ visible: false });
  }

  pastShow(hoverRect) {
    // position the tooltip after showing it
    const ttNode = this.node; // ReactDOM.findDOMNode(this);

    if (ttNode != null) {
      let x = 0;
      let y = 0;

      const docWidth = document.documentElement.clientWidth;
      const docHeight = document.documentElement.clientHeight;

      const rx = hoverRect.x + hoverRect.width; // most right x
      const lx = hoverRect.x; // most left x
      const ty = hoverRect.y; // most top y
      const by = hoverRect.y + hoverRect.height; // most bottom y

      // tooltip rectangle
      const ttRect = ttNode.getBoundingClientRect();

      const bRight = (rx + ttRect.width) <= (window.scrollX + docWidth);
      const bLeft = (lx - ttRect.width) >= 0;

      const bAbove = (ty - ttRect.height) >= 0;
      const bBellow = (by + ttRect.height) <= (window.scrollY + docHeight);

      let newState = {};

      // the tooltip doesn't fit to the right
      if (bRight) {
        x = rx;
        y = ty + (hoverRect.height - ttRect.height);

        if (y < 0) {
          y = ty;
        }
        newState.type = 'right';
      } else if (bBellow) {
        y = by;
        x = lx + (hoverRect.width - ttRect.width);

        if (x < 0) {
          x = lx;
        }
        newState.type = 'bottom';
      } else if (bLeft) {
        x = lx - ttRect.width;
        y = ty + (hoverRect.height - ttRect.height);

        if (y < 0) {
          y = ty;
        }
        newState.type = 'left';
      } else if (bAbove) {
        y = ty - ttRect.height;

        x = lx + (hoverRect.width - ttRect.width);

        if (x < 0) {
          x = lx;
        }

        newState.type = 'top';
      }
      newState = { ...newState, x, y };
      this.setState(newState);
    }
  }

  render() {
    const {
      text,
    } = this.props;
    const {
      x,
      y,
      visible,
    } = this.state;

    const tooltipStyle = {
      left: `${x + window.scrollX}px`,
      top: `${y + window.scrollY}px`,
    };

    const tooltipClass = visible ? 'tooltip active' : 'tooltip';
    
    return (
      <div
        className={tooltipClass}
        style={tooltipStyle}
        ref={node => { this.node = node }}
      >
        { text }
      </div>
    );
  }
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tooltip;
