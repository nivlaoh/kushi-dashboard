import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DashboardWidget } from '../../models';
import Widget from './Widget';
import Button from '../../shared/components/Button';
import Dialog from '../../shared/components/Dialog';

class DashboardHome extends Component {
  constructor(props) {
    super(props);
    
    this.spaceWidth = window.innerWidth;
    this.widgetWidth = 250;
    this.widgetHeight = 200;
    this.margin = 15;

    this.state = {
      editable: false,
      showWidgetSettings: false,
      grid: this.calculateGrid(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    const {
      sidebarVisible,
    } = this.props;
    if (nextProps.sidebarVisible !== sidebarVisible) {
      this.updateDimensions(nextProps.sidebarVisible ? this.widgetWidth : 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  calculateGrid = () => {
    const {
      widgets,
    } = this.props;
    const grid = [[]];
    let currRow = 0;
    let currCol = 0;
    const colPerRow = Math.floor(this.spaceWidth / (this.widgetWidth + this.margin));

    const fillRow = (widget, index) => {
      for (let i=0; i < widget.columns; i+=1) {
        // console.log('assign', [currRow, currCol], index);
        grid[currRow][currCol] = index;
        if (widget.rows > 1) {
          for (let j=1; j<widget.rows; j+=1) {
            // console.log('filling', [currRow, currCol], index);
            grid[currRow + j][grid[currRow].length - 1] = index;
          }
        }
        if (grid[currRow].length < colPerRow) {
          // console.log('here', grid[currRow].length, [currRow, currCol]);
          currCol += (grid[currRow].length - currCol);
        }
      }
    };

    widgets.forEach((widget, index) => {
      if (grid[currRow].length < colPerRow) {
        if (widget.rows > 1) {
          // console.log('widget has more row space', currRow);
          grid.push([]);
        }
        fillRow(widget, index);
      } else {
        currRow += 1;
        currCol = 0;
        if (grid[currRow] === undefined) {
          // console.log('create new row', currRow);
          grid.push([]);
        }
        fillRow(widget, index);
      }
    });
    console.log('see grid', grid);
    return grid;
  };

  updateDimensions = (offset = 0) => {
    this.spaceWidth = window.innerWidth - offset;
    this.setState({
      grid: this.calculateGrid(),
    });
  }

  allowDrop = (e) => {
    e.preventDefault();
  }

  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    console.log('dropping', data, e);
    e.target.appendChild(document.getElementById(data));
  }

  toggleEdit = () => {
    const {
      editable,
    } = this.state;
    this.setState({
      editable: !editable,
    });
  };

  showDialog = () => {
    this.setState({
      showWidgetSettings: true,
    });
  };

  hideDialog = () => {
    this.setState({
      showWidgetSettings: false,
    });
  };

  render() {
    const {
      widgets,
    } = this.props;
    const {
      editable,
      showWidgetSettings,
      grid,
    } = this.state;

    const wrapperStyle = {
      height: `${grid.length * (this.widgetHeight + this.margin)}px`,
    };

    return (
      <div className="content-wrapper">
        <div className="pageTitle">
          <span>Home</span>
          <div className="widgetsControl">
            <Button type="icon-clear" rounded onClick={this.toggleEdit} title="Edit Widget">
              <i className="fa fa-pencil"></i>
            </Button>
            <Button type="icon-clear" rounded onClick={this.showDialog} title="Settings">
              <i className="fa fa-gear"></i>
            </Button>
          </div>
        </div>
        <Dialog
          mode="confirm"
          show={showWidgetSettings}
          title="Widgets Settings"
          onConfirm={this.hideDialog}
          onDismiss={this.hideDialog}
        >
          Hello Custom Text
        </Dialog>
        <div
          className="widgetsWrapper"
          onDragOver={this.allowDrop}
          onDrop={this.drop}
          style={wrapperStyle}
        >
          { widgets &&
            widgets.map((widget, index) =>
              <Widget
                key={`wid.${widget.id}`}
                index={index}
                widget={widget}
                gridData={grid}
                hasPadding={widget.hasPadding}
                draggable={editable}
              />)
          }
        </div>
      </div>
    );
  }
}

DashboardHome.propTypes = {
  widgets: PropTypes.arrayOf(DashboardWidget),
  sidebarVisible: PropTypes.bool,
};

DashboardHome.defaultProps = {
  widgets: [],
  sidebarVisible: false,
};

export default DashboardHome;
