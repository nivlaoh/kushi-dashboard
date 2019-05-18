import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
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
      isLoading: true,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.stopLoading = this.stopLoading.bind(this);
  }

  toggleSidebar() {
    const {
      sidebarVisible,
    } = this.state;
    this.setState({
      sidebarVisible: !sidebarVisible,
    });
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    console.log('dropping', data, e);
    e.target.appendChild(document.getElementById(data));
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
    } = this.props;
    const {
      isLoading,
      sidebarVisible,
    } = this.state;

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
          logout(() => {
            history.push('/logout');
          });
        },
      }
    ];
    
    return (
      <div className="dashboard">
        <Header toggleSidebar={this.toggleSidebar} {...this.props} />
        <div className="dashboardContents">
          <Sidebar links={links} visible={sidebarVisible} />
          <div className="content" onDragOver={this.allowDrop} onDrop={this.drop}>
            { widgets &&
              widgets.map(widget =>
                <Widget key={`wid.${widget.id}`} widget={widget} draggable />)
            }
          </div>
        </div>
        <Loader activate={isLoading} timeout={2000} timeoutFn={this.stopLoading} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  widgets: PropTypes.arrayOf(DashboardWidget),
  user: PropTypes.shape(),
};

Dashboard.defaultProps = {
  widgets: [],
  user: null,
};

export default Dashboard;
