import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';

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
    let ttNode = ReactDOM.findDOMNode(this);

    if (ttNode != null) {
      let x = 0, y = 0;

      const docWidth = document.documentElement.clientWidth,
            docHeight = document.documentElement.clientHeight;

      let rx = hoverRect.x + hoverRect.width, // most right x
          lx = hoverRect.x, // most left x
          ty = hoverRect.y, // most top y
          by = hoverRect.y + hoverRect.height; // most bottom y

      // tool tip rectange
      let ttRect = ttNode.getBoundingClientRect();

      let bRight = (rx + ttRect.width) <= (window.scrollX + docWidth);
      let bLeft = (lx - ttRect.width) >= 0;

      let bAbove = (ty - ttRect.height) >= 0;
      let bBellow = (by + ttRect.height) <= (window.scrollY + docHeight);

      let newState = {};

      // the tooltip doesn't fit to the right
      if(bRight) {
        x = rx;
        y = ty + (hoverRect.height - ttRect.height);

        if (y < 0) {
          y = ty;
        }
        newState.type = 'right';
      } else if(bBellow) {
        y = by;
        x = lx + (hoverRect.width - ttRect.width);

        if (x < 0) {
          x = lx;
        }
        newState.type = 'bottom';
      } else if(bLeft) {
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

    const tooltipStyle = {
      left: `${this.state.x + window.scrollX}px`,
      top: `${this.state.y + window.scrollY}px`,
    };

    const tooltipClass = this.state.visible ? 'tooltip active' : 'tooltip';
    
    return (
      <div className={tooltipClass} style={tooltipStyle}>
        { text }
      </div>
    );
  }
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tooltip;
