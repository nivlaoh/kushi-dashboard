import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';

class Tabs extends Component {
  constructor(props) {
    super(props);
    const data = props.children.map(tab => ({
      id: tab.props.id,
      title: tab.props.title,
      body: tab.props.children,
      active: tab.props.active,
    }));
    this.state = {
      data,
      active: data.filter(tab => tab.active)[0].title,
    };
  }

  activateTab = (tab) => {
    this.setState({
      active: tab,
    });
  }

  render() {
    const {
      type,
      children,
      style,
    } = this.props;
    const {
      active,
    } = this.state;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        onActivate: this.activateTab,
        active: child.props.title === active,
      })
    );

    const activeTab = children.filter(child => child.props.title === active)[0];

    return (
      <div className={`tabs ${type}`} style={style}>
        <div className="tabTitleWrapper">
          {childrenWithProps}
        </div>
        <div className="tabBody">
          {activeTab ? activeTab.props.children : null}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  style: PropTypes.shape({}),
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== Tab) {
        error = new Error(`'${componentName}' children should be of type Tab`);
      }
    });
    return error;
  }
};

Tabs.defaultProps = {
  type: 'horizontal',
  children: [],
  style: {},
};

export default Tabs;
