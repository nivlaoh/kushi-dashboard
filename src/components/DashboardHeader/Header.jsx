import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileDetails: false,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);
  }

  toggleSidebar() {
    this.props.toggleSidebar();
  }

  toggleProfile() {
    this.setState({
      showProfileDetails: !this.state.showProfileDetails,
    });
  }

  render() {
    const profileContentStyle = this.state.showProfileDetails ?
      'profile-content active' :
      'profile-content';

    return (
      <div className="header">
        <div className="menuToggle" onClick={this.toggleSidebar}>
          <i className="fa fa-bars"></i>
        </div>
        <div className="dashboard-title">
          Dashboard
        </div>
        <div className="dashboard-profile" onClick={this.toggleProfile}>
          <i className="fa fa-user"></i>
        </div>
        <div className="profile-popover">
          <div className={profileContentStyle}>
            Here
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  toggleSidebar: PropTypes.func,
};

Header.defaultProps = {
  toggleSidebar: () => {},
};

export default Header;
