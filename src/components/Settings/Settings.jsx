import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Tab, Tabs } from '../../shared/components/Tabs';
import FileUpload from '../../shared/components/FileUpload';
import MultiSelect from '../../shared/components/MultiSelect';
import TextBox from '../../shared/components/TextBox';
import Stepper from '../../shared/components/Stepper';
import Dialog from '../../shared/components/Dialog';
import Calendar from '../../shared/components/Calendar';
import System from './System';

import './styles.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.acceptedTypes = ['image/png', 'image/gif', 'image/jpeg'];
    this.state = {
      files: [],
      selectedCountry: null,
      showDialog: false,
    };
  }

  componentDidMount() {
    const {
      getProfilePic,
      getUserInfo,
      getCountries,
    } = this.props;
    
    getProfilePic();
    getUserInfo();
    getCountries();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.profilePic) {
      this.setState({
        files: [{
          ...nextProps.user.profilePic,
        }],
      });
    }
  }

  selectCountry = (selected) => {
    this.setState({
      selectedCountry: selected,
    });
  };

  uploadFiles = (fileList) => {
    console.log('Uploading...', fileList);
    this.setState({
      files: fileList,
    });

    this.increasePercentage = setInterval(() => {
      const {
        files,
      } = this.state;
      const {
        uploadProfilePic,
      } = this.props;
      if (files.every(file => file.progress >= 100)) {
        console.log('clear');
        clearInterval(this.increasePercentage);
        this.increasePercentage = null;
        uploadProfilePic(files[0]);
      } else {
        const updatedFiles = files.map(file => {
          if (file.status === 'ERROR') {
            clearInterval(this.increasePercentage);
            this.increasePercentage = null;
            return file;
          }
          const progressIncrement = Math.random()*20;
          return {
            ...file,
            progress: file.progress + progressIncrement > 100 ? 100 : file.progress + progressIncrement,
            status: file.progress + progressIncrement >= 100 ? 'UPLOADED' : 'NEW',
            uploadedAt: moment().format(),
          };
        });
        this.setState({
          files: updatedFiles,
        });
      }
    }, 1000);
  };

  dismissDialog = () => {
    this.setState({
      showDialog: false,
    });
  };

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
    const steps = [
      { title: 'Hey', description: 'Hello there' },
      { title: 'Step 2', description: 'Fill in' },
      { title: 'Step 3 Long Title Here', description: 'Sign and Print and many other procedures' },
    ];
    const {
      user,
      updateUserInfo,
      countries,
    } = this.props;
    const {
      files,
      selectedCountry,
      showDialog,
    } = this.state;

    return (
      <div className="content-wrapper">
        <div className="pageTitle">Settings</div>
        <div className="settingsWrapper">
          <Tabs type="horizontal" style={settingsStyle}>
            <Tab title="Profile" active>
              <div className="infoRow">
                <TextBox
                  label="First Name"
                  placeholder="First Name"
                  fluid
                  value={user.firstName}
                  onChange={e => { updateUserInfo('firstName', e.target.value); }}
                />
                <TextBox
                  label="Last Name"
                  placeholder="Last Name"
                  fluid
                  value={user.lastName}
                  onChange={e => { updateUserInfo('lastName', e.target.value); }}
                />
              </div>
              <TextBox
                label="Email Address"
                type="email"
                placeholder="Email Address"
                value={user.username}
                readOnly
              />
              <MultiSelect
                label="Country of Residence"
                placeholder="Please select your country of residence"
                options={countries}
                onChange={this.selectCountry}
                selected={selectedCountry}
              />
              <FileUpload
                title="Upload Profile Picture"
                description="Please upload an image for your profile picture"
                fileTypes={this.acceptedTypes}
                handleDrop={this.uploadFiles}
                fileList={files}
              />
            </Tab>
            <Tab title="System">
              <MultiSelect
                placeholder="Enter option"
                label="Test multi select"
                multi
                options={options}
                searchCallback={()=>{}}
              />
              <Calendar />
              <System />
            </Tab>
            <Tab title="Third">
              <Stepper steps={steps} />
              <button type="button" onClick={() => {this.setState({ showDialog: true })}}>Show</button>
              <Dialog text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, laudantium! Laborum in quibusdam iure labore impedit explicabo ea ipsum, corrupti odio blanditiis qui, facere voluptates assumenda, perferendis optio! Fuga, corporis!" show={showDialog} onConfirm={this.dismissDialog} onDismiss={this.dismissDialog} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.shape({}).isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape({})),
  uploadProfilePic: PropTypes.func,
  getProfilePic: PropTypes.func,
  getUserInfo: PropTypes.func,
  updateUserInfo: PropTypes.func,
};

Settings.defaultProps = {
  countries: [],
  uploadProfilePic: () => {},
  getProfilePic: () => {},
  getUserInfo: () => {},
  updateUserInfo: () => {},
};

export default Settings;
