import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import moment from 'moment';

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
    this.uploadNode.current.click(e);
  };

  onChange = (e) => {
    const filesRef = [ ...e.target.files ];
    const {
      handleDrop,
      numFiles,
    } = this.props;
    if (filesRef.length > numFiles) {
      this.setState({
        errorMessage: `Please select not more than ${numFiles} file(s)`,
      });
      return;
    }
    const files = this.checkAndInitFiles(filesRef);
    this.setState({
      files: [ ...files ],
    }, () => { handleDrop(files); });
  };

  onDrag = (e) => {
    e.preventDefault();
    this.setState({
      onDrag: true,
    });
  };

  onDrop = (e) => {
    e.preventDefault();
    const {
      handleDrop,
      numFiles,
    } = this.props;
    if (e.dataTransfer.files.length > numFiles) {
      this.setState({
        onDrag: false,
        errorMessage: `Please select not more than ${numFiles} file(s)`,
      });
      return;
    }
    const files = this.checkAndInitFiles([ ...e.dataTransfer.files ]);
    this.setState({
      onDrag: false,
      files: [ ...files ],
    }, () => {
      handleDrop(files);
    });
  };

  checkAndInitFiles = (files) => {
    const {
      maxSize,
    } = this.props;
    return files.map(file => ({
      ref: file,
      status: file.size <= maxSize ? 'NEW' : 'ERROR',
      errorMessage: file.size > maxSize ? `File size exceeds ${formatFileSize(maxSize)}` : undefined,
      progress: 0,
    }));
  };

  deleteFile = (file) => {
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

  getMessage = (errorMessage) => {
    const {
      numFiles,
    } = this.props;
    const {
      files,
    } = this.state;
    if (files.length === 0 && isEmpty(errorMessage)) {
      return numFiles > 1 ? 'Please select files' : 'Please choose a file';
    }
    return <div className="error">{errorMessage}</div>;
  };

  render() {
    const {
      title,
      description,
      fileTypes,
      numFiles,
    } = this.props;
    const {
      files,
      onDrag,
      errorMessage,
    } = this.state;
    return (
      <div className="fileUploadWrapper" onDragOver={this.onDrag} onDrop={this.onDrop}>
        <div className={`dragOverlay ${onDrag ? 'active' : ''}`}>
          <i className="fa fa-download"></i> &nbsp; Drop your file(s) here
        </div>
        <div className="uploadInfoPane">
          <div className="uploadTitle">{title}</div>
          <div className="infoRow">
            <div className="uploadDesc">{ description }</div>
              <div className="uploadPlaceholder">
                { this.getMessage(errorMessage) }
              </div>
            <Button
              className="uploadBtn"
              type="primary"
              text="Browse..."
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
                    <div className="success">
                      {file.status.toLowerCase()} {moment(file.uploadedAt).fromNow()}
                    </div>
                  }
                  { file.status === 'ERROR' &&
                    <div className="error">{file.errorMessage}</div>
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
          multiple={numFiles > 1}
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
  numFiles: PropTypes.number,
  maxSize: PropTypes.number,
};

FileUpload.defaultProps = {
  title: 'File Upload',
  description: 'Please drag and drop or click browse button to select files',
  fileTypes: [],
  handleDrop: () => {},
  fileList: [],
  numFiles: 1,
  maxSize: 10485760,
};

export default FileUpload;
