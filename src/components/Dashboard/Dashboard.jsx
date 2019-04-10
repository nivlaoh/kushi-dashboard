import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { DashboardWidget } from '../../models';
import Header from '../DashboardHeader';
import Sidebar from '../DashboardSidebar';
import Widget from './Widget';
import Loader from '../../shared/components/Loader';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false,
      isLoading: false,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.stopLoading = this.stopLoading.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    console.log('see', data, e);
    e.target.appendChild(document.getElementById(data));
  }

  stopLoading() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const links = [
      {
        label: 'Home',
        route: '/',
        icon: 'fa fa-home'
      },
      {
        label: 'Logout',
        route: '/logout',
        icon: 'fa fa-sign-out',
        run: () => {
          this.props.logout();
          this.props.history.push('/logout');
        },
      }
    ];
    const {
      widgets,
    } = this.props;

    return (
      <div className="dashboard">
        <Header toggleSidebar={this.toggleSidebar} />
        <div className="dashboardContents">
          <Sidebar links={links} visible={this.state.sidebarVisible} />
          <div className="content" onDragOver={this.allowDrop} onDrop={this.drop}>
            { widgets &&
              widgets.map(widget =>
                <Widget key={`wid.${widget.id}`} widget={widget} draggable />)
            }
          </div>
        </div>
        <Loader activate={this.state.isLoading} timeout={2000} timeoutFn={this.stopLoading} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  widgets: PropTypes.arrayOf(DashboardWidget),
};

export default Dashboard;
