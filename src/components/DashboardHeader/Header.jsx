import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { withTooltip } from '../../shared/components/Tooltip';
import MultiSelect from '../../shared/components/MultiSelect';
import Search from '../../shared/components/Search';
import Dropdown from '../../shared/components/Dropdown';

import './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileDetails: false,
      searchOptions: [],
    };
    this.node = React.createRef();
    this.notificationIcon = React.createRef();

    this.toggleProfile = this.toggleProfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  processAnimationEnterExit = (baseClass, flag, enter, exit) => {
    if (flag) {
      return `${baseClass} ${enter}`;
    }
    return `${baseClass} ${exit}`;
  }

  handleClick(e) {
    if (this.node.current === null || this.node.current.contains(e.target)) {
      return;
    }
    this.handleOutsideClick();
  }

  handleOutsideClick() {
    const {
      showProfileDetails,
    } = this.state;
    if (showProfileDetails) {
      this.setState({
        showProfileDetails: false,
      });
    }
  }

  toggleProfile() {
    const {
      showProfileDetails,
    } = this.state;
    this.setState({
      showProfileDetails: !showProfileDetails,
    });
  }

  navigateNotification = () => {
    const {
      history,
    } = this.props;
    history.push('/notification');
  };

  render() {
    const {
      searchOptions,
      showProfileDetails,
    } = this.state;

    const {
      user,
      toggleSidebar,
    } = this.props;

    const profileContentStyle = showProfileDetails ?
      'profile-content active' :
      'profile-content';

    const profileIconStyle = this.processAnimationEnterExit(
      'dashboard-profile',
      showProfileDetails,
      'clicked',
      'exit'
    );

    const ProfileWithTooltip = withTooltip(() => (
      <div className="profile-popover" ref={this.node}>
        <div className={profileContentStyle}>
          <div className="profileBg"></div>
          <div className="profileContentInner">
            { isEmpty(user) ? '' : user.username }
          </div>
        </div>
      </div>
    ));

    const options = [
      { key: 'test', value: 'Hello' },
      { key: 'test2', value: 'World' },
      { key: 'test3', value: 'addfsf' },
      { key: 'test4', value: 'azzz' },
      { key: 'test5', value: 'fdsg' },
      { key: 'test6', value: '123124' },
      { key: 'test7', value: 'fdfsdf' },
      { key: 'test8', value: '329fs09' },
      { key: 'test9', value: 'mysteak' }
    ];

    const search = (e) => {
      this.setState({
        searchOptions: options.filter(option => option.value.toLowerCase().includes(e.target.value))
      });
    }

    return (
      <div className="header">
        <div className="menuToggle" role="button" tabIndex="0" onClick={toggleSidebar}>
          <i className="fa fa-bars"></i>
        </div>
        <div className="dashboard-title">
          Dashboard
        </div>
        <Search onChange={search} options={searchOptions} />
        <MultiSelect placeholder="test" multi options={options} searchCallback={()=>{}} />
        <div className="notification-icon" ref={this.notificationIcon}>
          <i className="fa fa-envelope"></i>
          <div className="new">2</div>
        </div>
        <Dropdown target={this.notificationIcon} options={options} onSelected={this.navigateNotification} />
        <div className="notification-icon">
          <i className="fa fa-bell"></i>
        </div>
        <div className={profileIconStyle} role="button" tabIndex="-1" onClick={this.toggleProfile}>
          <i className="fa fa-user"></i>
        </div>
        <ProfileWithTooltip text="Hello" />
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
