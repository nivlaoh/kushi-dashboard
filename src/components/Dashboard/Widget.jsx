import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { isEmpty } from 'lodash';

import { DashboardWidget as WidgetModel } from '../../models';
import './styles.scss';

class Widget extends Component {
  constructor(props) {
    super(props);

    this.widgetRender = null;
  }

  componentDidMount() {
    const {
      widget,
    } = this.props;
    this.widgetRender = this.drawWidget(widget);
  }

  componentWillReceiveProps(nextProps) {
    if (this.widgetRender === null) {
      console.log('widget', nextProps);
      this.widgetRender = this.drawWidget(nextProps.widget);
    }
  }

  onDrag = (e) => {
    const {
      draggable,
    } = this.props;
    if (!draggable) {
      return;
    }
    console.log('tata', e.target.id);
    e.dataTransfer.setData('text', e.target.id);
  };

  drawWidget = (widget) => {
    if (widget.type === 'site') {
      return <iframe className="iframe" title="widget" src={widget.url} />;
    }
    if (widget.type === 'component') {
      const WidgetComponent = !isEmpty(widget.componentSrc) ? Loadable({
        loader: () => import(`../${widget.componentSrc}`),
        loading: () => <div>Loading...</div>
      }) : null;

      return <WidgetComponent />;
    }
    return widget.id;
  };

  calculateStartLeft = (index) => {
    const {
      gridData,
      widgetWidth,
      margin,
    } = this.props;
    const pos = gridData.map((rowArr, rowIndex) => [rowIndex, rowArr.findIndex(col => col === index)])
      .filter(pair => pair[1] !== -1)[0];
    return pos[1] * (widgetWidth + margin);
  };

  calculateStartTop = (index) => {
    const {
      gridData,
      widgetHeight,
      margin,
    } = this.props;
    const pos = gridData.map((rowArr, rowIndex) => [rowIndex, rowArr.findIndex(col => col === index)])
      .filter(pair => pair[1] !== -1)[0];
    return pos[0] * (widgetHeight + margin);
  };

  render() {
    const {
      widget,
      draggable,
      hasPadding,
      index,
      widgetWidth,
      widgetHeight,
      margin,
    } = this.props;

    const style = {
      backgroundColor: widget.background,
      color: widget.color,
      width: `${widget.columns * widgetWidth + margin * (widget.columns - 1)}px`,
      height: `${widget.rows * widgetHeight + margin * (widget.rows - 1)}px`,
      left: `${this.calculateStartLeft(index)}px`,
      top: `${this.calculateStartTop(index)}px`,
    };
    if (this.widgetRender === null) {
      this.widgetRender = this.drawWidget(widget);
    }
    
    return (
      <div
        key={`wid-${widget.id}`}
        id={`wid-${widget.id}`}
        className={`widget ${hasPadding ? 'padding' : ''}`}
        style={style}
        draggable={draggable}
        onDragStart={this.onDrag}
      >
        { this.widgetRender }
      </div>
    );
  }
}

Widget.propTypes = {
  widget: WidgetModel.isRequired,
  index: PropTypes.number.isRequired,
  gridData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  draggable: PropTypes.bool,
  hasPadding: PropTypes.bool,
  widgetWidth: PropTypes.number,
  widgetHeight: PropTypes.number,
  margin: PropTypes.number,
};

Widget.defaultProps = {
  draggable: false,
  gridData: [],
  hasPadding: true,
  widgetWidth: 250,
  widgetHeight: 200,
  margin: 15,
};

export default Widget;
