import React, { Component } from 'react';
import { Tab, Tabs } from '../../shared/components/Tabs';

import './styles.scss';

class Settings extends Component {
  render() {
    const settingsStyle = {
      width: '400px',
    };
    return (
      <div className="content-wrapper">
        <div className="pageTitle">Settings</div>
        <Tabs type="horizontal" style={settingsStyle}>
          <Tab title="Profile">Hello</Tab>
          <Tab title="System" active>Hello2</Tab>
          <Tab title="Third">Hello3</Tab>
        </Tabs>
      </div>
    );
  }
}

export default Settings;
