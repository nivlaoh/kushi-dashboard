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
    if (this.widgetRender === null) {
      this.widgetRender = this.drawWidget(widget);
    }
    
    return (
      <div
        key={`wid-${widget.id}`}
        id={`wid-${widget.id}`}
        className="widget"
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
  draggable: PropTypes.bool,
};

Widget.defaultProps = {
  draggable: false,
};

export default Widget;
