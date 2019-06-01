import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import ProgressBar from '../ProgressBar';
import { getFileIcon } from '../../../utils/iconUtil';
import { formatFileSize } from '../../../utils/browserUtil';

import './styles.scss';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.uploadNode = React.createRef();
    this.state = {
      files: props.fileList,
      onDrag: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fileList !== undefined) {
      this.setState({
        files: nextProps.fileList,
      });
    }
  }

  chooseFiles = (e) => {
    this.uploadNode.current.click();
  };

  onChange = (e) => {
    console.log('change', e.target.files);
    const files = [ ...e.target.files ];
    const filesRef = files.map(file => ({
      ref: file,
      status: 'NEW',
      progress: 0,
    }));
    this.setState({
      files: filesRef,
    });
  };

  onDrag = (e) => {
    e.preventDefault();
    this.setState({
      onDrag: true,
    });
  };

  onDrop = (e) => {
    e.preventDefault();
    const files = [ ...e.dataTransfer.files ].map(file => ({
      ref: file,
      status: 'NEW',
      progress: 0,
    }));
    const {
      handleDrop,
    } = this.props;
    this.setState({
      onDrag: false,
      files: [ ...files ],
    }, () => {
      handleDrop(files);
    });
  };

  deleteFile = (file) => {
    console.log('file', file);
    const {
      files,
    } = this.state;
    const fileIndex = files.findIndex(f => f.ref.name === file.ref.name);
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
      fileTypes,
    } = this.props;
    const {
      files,
      onDrag,
    } = this.state;
    return (
      <div className={`fileUploadWrapper ${onDrag ? 'onDrag' : ''}`} onDragOver={this.onDrag} onDrop={this.onDrop}>
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
              <div key={file.ref.name} className="fileRow">
                <i className={`docIcon fa ${getFileIcon(file.ref.name)}`}></i>
                <div className="fileDetails">
                  <div className="filename">{ file.ref.name }</div>
                  <div className="filesize">{ formatFileSize(file.ref.size) }</div>
                </div>
                <div className="fileStatus">
                  { file.status === 'NEW' &&
                    <ProgressBar percentage={file.progress} showPercentage />
                  }
                  { file.status === 'UPLOADED' &&
                    <div className="success">{file.status}</div>
                  }
                  { file.status === 'ERROR' &&
                    <div className="error">{file.status}</div>
                  }
                </div>
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
          accept={fileTypes.join(',')}
          multiple
        />
      </div>
    );
  }
}

FileUpload.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  handleDrop: PropTypes.func,
  fileList: PropTypes.arrayOf(PropTypes.shape({})),
};

FileUpload.defaultProps = {
  title: 'TITLE',
  description: 'This is test description',
  fileTypes: [],
  handleDrop: () => {},
  fileList: [],
};

export default FileUpload;
