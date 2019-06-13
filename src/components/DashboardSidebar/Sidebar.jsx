import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SidebarLink } from '../../models';
import './styles.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeSidebar: !props.visible,
    };
    this.initSidebar = this.initSidebar.bind(this);
    this.sidebarTimer = null;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    const {
      visible,
    } = this.props;
    if (nextProps.visible && !visible) {
      this.setState({
        removeSidebar: false,
      });
    } else if (!nextProps.visible && visible) {
      this.initSidebar();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.sidebarTimer);
    this.sidebarTimer = null;
  }

  initSidebar() {
    if (this.sidebarTimer) {
      clearTimeout(this.sidebarTimer);
      this.sidebarTimer = null;
    }
    this.sidebarTimer = setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          removeSidebar: true,
        });
      }
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
        { links.map((link) => (
          <NavLink
            key={`link.${link.label}`}
            className="linkWrapper"
            exact
            to={link.route}
            onClick={link.run}
            activeClassName="selected"
          >
            { link.icon &&
              <div className="linkIcon">
                <FontAwesomeIcon icon={link.icon} fixedWidth />
              </div>
            }
            {link.label}
          </NavLink>
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
