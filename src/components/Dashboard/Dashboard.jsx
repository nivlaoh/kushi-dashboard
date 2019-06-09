import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';
import { DashboardWidget } from '../../models';
import Header from '../DashboardHeader';
import Sidebar from '../DashboardSidebar';
import DashboardHome from './DashboardHome';
import Settings from '../../containers/Settings';
import Notification from '../../containers/Notification';
import Loader from '../../shared/components/Loader';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false,
      isLoading: true,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.stopLoading = this.stopLoading.bind(this);
    library.add(faHome, faCog, faSignOutAlt);
  }

  componentDidMount() {
    const {
      getWidgets,
    } = this.props;
    getWidgets();
  }

  toggleSidebar() {
    const {
      sidebarVisible,
    } = this.state;
    this.setState({
      sidebarVisible: !sidebarVisible,
    });
  }

  stopLoading() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const {
      widgets,
      logout,
      history,
      closeWidget,
    } = this.props;
    const {
      isLoading,
      sidebarVisible,
    } = this.state;

    const links = [
      {
        label: 'Home',
        route: '/',
        icon: 'home'
      },
      {
        label: 'Settings',
        route: '/settings',
        icon: 'cog'
      },
      {
        label: 'Logout',
        route: '/logout',
        icon: 'sign-out-alt',
        run: () => {
          logout(() => {
            history.push('/logout');
          });
        },
      }
    ];
    
    return (
      <div className="dashboard">
        <Header title="Kushi Dashboard" toggleSidebar={this.toggleSidebar} {...this.props} />
        <div className="dashboardContents">
          <Sidebar links={links} visible={sidebarVisible} />
          <Route path='/' exact render={(routeProps) => (
            <DashboardHome
              {...routeProps}
              widgets={widgets}
              closeWidget={closeWidget}
              sidebarVisible={sidebarVisible}
            />
          )} />
          <Route path='/settings' render={(routeProps) => (
            <Settings {...routeProps} />
          )} />
          <Route path='/notification' exact render={(routeProps) => (
            <Notification {...routeProps} />
          )} />
          <Route path='/notification/:msgId' render={(routeProps) => (
            <Notification {...routeProps} />
          )} />
        </div>
        <Loader activate={isLoading} timeout={2000} timeoutFn={this.stopLoading} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  widgets: PropTypes.arrayOf(DashboardWidget),
  closeWidget: PropTypes.func,
  user: PropTypes.shape(),
};

Dashboard.defaultProps = {
  widgets: [],
  closeWidget: () => {},
  user: null,
};

export default Dashboard;
