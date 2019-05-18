import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DashboardWidget as WidgetModel } from '../../models';
import './styles.scss';

class Widget extends Component {
  constructor(props) {
    super(props);

    this.drag = this.drag.bind(this);
  }

  drag(e) {
    const {
      draggable,
    } = this.props;
    if (!draggable) {
      return;
    }
    console.log('tata', e.target.id);
    e.dataTransfer.setData('text', e.target.id);
  }

  render() {
    const {
      widget,
      draggable,
    } = this.props;
    const style = {
      backgroundColor: widget.background,
      color: widget.color,
      // flexGrow: widget.columns,
      width: `${widget.columns * 250}px`,
      height: `${widget.rows * 200}px`,
    };
    return (
      <div
        key={`wid-${widget.id}`}
        id={`wid-${widget.id}`}
        className="widget"
        style={style}
        draggable={draggable}
        onDragStart={this.drag}
      >
        { widget.type === 'site' ?
          <iframe className="iframe" title="widget" src={widget.url} /> :
          widget.id
        }
      </div>
    );
  }
}

Widget.propTypes = {
  widget: WidgetModel.isRequired,
  draggable: PropTypes.bool,
};

Widget.defaultProps = {
  draggable: false,
};

export default Widget;
