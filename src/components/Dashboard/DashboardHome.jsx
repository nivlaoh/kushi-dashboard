import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DashboardWidget } from '../../models';
import Widget from './Widget';

class DashboardHome extends Component {
  allowDrop = (e) => {
    e.preventDefault();
  }

  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    console.log('dropping', data, e);
    e.target.appendChild(document.getElementById(data));
  }

  render() {
    const {
      widgets,
    } = this.props;
    return (
      <div className="content" onDragOver={this.allowDrop} onDrop={this.drop}>
        { widgets &&
          widgets.map(widget =>
            <Widget key={`wid.${widget.id}`} widget={widget} />)
        }
      </div>
    );
  }
}

DashboardHome.propTypes = {
  widgets: PropTypes.arrayOf(DashboardWidget),
};

DashboardHome.defaultProps = {
  widgets: []
};

export default DashboardHome;
