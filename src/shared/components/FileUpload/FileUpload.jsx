import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { getFileIcon } from '../../../utils/iconUtil';

import './styles.scss';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.uploadNode = React.createRef();
    this.state = {
      files: [],
    };
  }

  chooseFiles = (e) => {
    this.uploadNode.current.click();
  };

  onChange = (e) => {
    console.log('change', e.target.files);
    this.setState({
      files: [...e.target.files],
    });
  };

  deleteFile = (file) => {
    console.log('file', file);
    const {
      files,
    } = this.state;
    const fileIndex = files.findIndex(f => f.name === file.name);
    this.setState({
      files: [
        ...files.slice(0, fileIndex),
        ...files.slice(fileIndex + 1),
      ],
    });
  };

  render() {
    const {
      title,
      description,
    } = this.props;
    const {
      files,
    } = this.state;
    return (
      <div className="fileUploadWrapper">
        <div className="uploadInfoPane">
          <div className="uploadTitle">{title}</div>
          <div className="infoRow">
            <div className="uploadDesc">{ description }</div>          
            { files.length === 0 &&
              <div className="uploadPlaceholder">Please choose a file</div>
            }
            <Button
              className="uploadBtn"
              type="primary"
              text="Choose files"
              onClick={this.chooseFiles}
            />
          </div>
        </div>
        { files.length > 0 &&
          <div className="fileList">
            { files.map(file =>
              <div key={file.name} className="fileRow">
                <i className={`docIcon fa ${getFileIcon(file.name)}`}></i>
                <div className="filename">{ file.name }</div>
                <div className="fileRowIcons">
                  {/* <i className="fa fa-pencil"></i> */}
                  <button type="button"
                    className="rowIcon fa fa-trash"
                    title="Delete File"
                    onClick={() => { this.deleteFile(file); }}>
                  </button>
                </div>
              </div>
            )}
          </div>
        }
        <input type="file"
          className="uploadInput"
          ref={this.uploadNode}
          onChange={this.onChange}
          multiple
        />
      </div>
    );
  }
}

FileUpload.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

FileUpload.defaultProps = {
  title: 'TITLE',
  description: 'This is test description',
};

export default FileUpload;
