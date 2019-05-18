import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { SidebarLink } from '../../models';
import './styles.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeSidebar: !props.visible,
    };
    this.initSidebar = this.initSidebar.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      visible,
    } = this.props;
    if (visible && !prevProps.visible) {
      this.setState({
        removeSidebar: false
      });
    }
    if (!visible && prevProps.visible) {
      this.initSidebar();
    }
  }

  initSidebar() {
    setTimeout(() => {
      this.setState({
        removeSidebar: true,
      });
    }, 300);
  }

  render() {
    const {
      visible,
      links,
    } = this.props;
    const {
      removeSidebar,
    } = this.state;
    const sidebarStyle = visible ? "sidebar visible" : "sidebar";
    return removeSidebar ? (<div></div>) : (
      <div className={sidebarStyle}>
        { links.map((link, linkIndex) => (
          <div key={`wrapper.${link.label}`} className="linkWrapper">
            { !link.run ?
            <Link key={`link.${link.label}`} to={link.route}>
              {link.icon &&
                <div className="linkIcon">
                  <i className={link.icon}></i>
                </div>
              }
              {link.label}
            </Link> :
            <a href="javascript:void(0)" tabIndex={linkIndex} onClick={link.run}>
              {link.icon &&
                <div className="linkIcon">
                  <i className={link.icon}></i>
                </div>
              }
              {link.label}
            </a>
          }
          </div>
        ))}
      </div>
    );
  }
}

Sidebar.propTypes = {
  visible: PropTypes.bool,
  links: PropTypes.arrayOf(SidebarLink),
};

Sidebar.defaultProps = {
  visible: true,
  links: [],
};

export default Sidebar;
