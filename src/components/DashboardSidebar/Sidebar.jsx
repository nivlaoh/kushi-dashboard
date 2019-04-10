import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { SidebarLink } from '../../models';
import styles from './styles.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeSidebar: !props.visible,
    };
    this.initSidebar = this.initSidebar.bind(this);
  }
  
  initSidebar() {
    setTimeout(() => {
      this.setState({
        removeSidebar: true,
      });
    }, 300);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible && !prevProps.visible) {
      this.setState({
        removeSidebar: false
      });
    }
    if (!this.props.visible && prevProps.visible) {
      this.initSidebar();
    }
  }

  render() {
    const {
      visible,
      links,
    } = this.props;
    const sidebarStyle = visible ? "sidebar visible" : "sidebar";
    return this.state.removeSidebar ? (<div></div>) : (
      <div className={sidebarStyle}>
        {links.map(link => (
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
            <a onClick={link.run}>
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
};

export default Sidebar;
