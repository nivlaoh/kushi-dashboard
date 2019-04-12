import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../shared/components/Tooltip';

import styles from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileDetails: false,
    };
    this.node = React.createRef();
    this.toolTip = React.createRef();

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.processAnimationEnterExit = this.processAnimationEnterExit.bind(this);
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleOnMouseOut(evt) {
    this.toolTip.current.hide();
  }

  handleOnMouseOver(evt) {
    let el = evt.currentTarget;
    if (el != null) {
      let rect = el.getBoundingClientRect();
      this.toolTip.current.show(rect);
    }
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

    return (
      <div className="header">
        <div className="menuToggle" onClick={this.toggleSidebar}>
          <i className="fa fa-bars"></i>
        </div>
        <div className="dashboard-title">
          Dashboard
        </div>
        <div className={profileIconStyle} onClick={this.toggleProfile}>
          <i className="fa fa-user"></i>
        </div>
        <div className="profile-popover" ref={this.node}>
          <div className={profileContentStyle}>
            <div className="profileBg"></div>
            <div className="profileContentInner" onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>Here
            </div>
          </div>
        </div>
        <Tooltip ref={this.toolTip} text="Hello" />
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
