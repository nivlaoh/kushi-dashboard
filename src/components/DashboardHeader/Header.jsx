import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import Tooltip, { withTooltip } from '../../shared/components/Tooltip';
import Button from '../../shared/components/Button';
import MultiSelect from '../../shared/components/MultiSelect';

import styles from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileDetails: false,
    };
    this.node = React.createRef();

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.processAnimationEnterExit = this.processAnimationEnterExit.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if (this.node.current === null || this.node.current.contains(e.target)) {
      return;
    }
    this.handleOutsideClick();
  }

  handleOutsideClick() {
    if (this.state.showProfileDetails) {
      this.setState({
        showProfileDetails: false,
      });
    }
  }

  toggleSidebar() {
    this.props.toggleSidebar();
  }

  toggleProfile() {
    this.setState({
      showProfileDetails: !this.state.showProfileDetails,
    });
  }

  processAnimationEnterExit(baseClass, flag, enter, exit) {
    if (flag) {
      return `${baseClass} ${enter}`;
    } else {
      return `${baseClass} ${exit}`;
    }
  }

  render() {
    const profileContentStyle = this.state.showProfileDetails ?
      'profile-content active' :
      'profile-content';

    const profileIconStyle = this.processAnimationEnterExit(
      'dashboard-profile',
      this.state.showProfileDetails,
      'clicked',
      'exit'
    );

    const ProfileWithTooltip = withTooltip(() => (
      <div className="profile-popover" ref={this.node}>
        <div className={profileContentStyle}>
          <div className="profileBg"></div>
          <div className="profileContentInner">
            { isEmpty(this.props.user) ? '' : this.props.user.username }
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

    return (
      <div className="header">
        <div className="menuToggle" onClick={this.toggleSidebar}>
          <i className="fa fa-bars"></i>
        </div>
        <div className="dashboard-title">
          Dashboard
        </div>
        <MultiSelect placeholder="test" multi options={options} searchCallback={()=>{}} />
        <div className={profileIconStyle} onClick={this.toggleProfile}>
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
