import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DashboardWidget as WidgetModel } from '../../models';
import styles from './styles.scss';

class Widget extends Component {
  constructor(props) {
    super(props);

    this.drag = this.drag.bind(this);
  }

  drag(e) {
    if (!this.props.draggable) {
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
      flexGrow: widget.columns,
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
        {widget.id}
      </div>
    );
  }
}

Widget.propTypes = {
  widget: WidgetModel,
  draggable: PropTypes.bool,
};

export default Widget;
