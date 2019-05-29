import React, { Component } from 'react';
import { Tab, Tabs } from '../../shared/components/Tabs';

import MultiSelect from '../../shared/components/MultiSelect';
import System from './System';

import './styles.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const settingsStyle = {
      maxWidth: '700px',
    };
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
      <div className="content-wrapper">
        <div className="pageTitle">Settings</div>
        <div className="settingsWrapper">
          <Tabs type="horizontal" style={settingsStyle}>
            <Tab title="Profile" active>
              <System />
            </Tab>
            <Tab title="System">
              <MultiSelect placeholder="Enter option" multi options={options} searchCallback={()=>{}} />
            </Tab>
            <Tab title="Third">Hello3</Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Settings;
