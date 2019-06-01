import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs } from '../../shared/components/Tabs';
import FileUpload from '../../shared/components/FileUpload';
import MultiSelect from '../../shared/components/MultiSelect';
import System from './System';
import { getBase64 } from '../../utils/browserUtil';

import './styles.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.acceptedTypes = ['image/png', 'image/gif', 'image/jpeg'];
    this.state = {
      files: [],
    };
  }

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
        getBase64(files[0].ref).then(data => uploadProfilePic(data));
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
          };
        });
        this.setState({
          files: updatedFiles,
        });
      }
    }, 1000);
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
    const {
      files,
    } = this.state;
    return (
      <div className="content-wrapper">
        <div className="pageTitle">Settings</div>
        <div className="settingsWrapper">
          <Tabs type="horizontal" style={settingsStyle}>
            <Tab title="Profile" active>
              <FileUpload
                title="Upload Profile Picture"
                description="Please upload an image for your profile picture"
                fileTypes={this.acceptedTypes}
                handleDrop={this.uploadFiles}
                fileList={files}
              />
            </Tab>
            <Tab title="System">
              <MultiSelect placeholder="Enter option" multi options={options} searchCallback={()=>{}} />
              <System />
            </Tab>
            <Tab title="Third">Hello3</Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.shape({}).isRequired,
  uploadProfilePic: PropTypes.func,
};

Settings.defaultProps = {
  uploadProfilePic: () => {},
};

export default Settings;
