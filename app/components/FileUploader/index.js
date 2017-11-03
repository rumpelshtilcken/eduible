import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import style from './index.css';

class FileUploader extends React.Component {
  static propTypes = {
    isFileUploaderModalOpen: PropTypes.bool.isRequired,
    onCloseFileUploaderModal: PropTypes.func.isRequired,
    previewImageUrl: PropTypes.string
    // onFileUrlChange: PropTypes.func
  };

  state = {
    file: '',
    imgPreviewUrl: this.props.previewImageUrl || ''
    // uploadErrorMessage: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // const imgPreviewUrl = this.props;
    const file = this.state;

    // if (file === imgPreviewUrl) {
    //   this.setState({ uploadErrorMessage: 'Something went wrong' });
    // }
    if (file !== null) {
      this.props.onCloseFileUploaderModal();
    }
  }

  handleChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imgPreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imgPreviewUrl } = this.state;
    let $imgPreview = null;
    if (imgPreviewUrl) {
      // this.props.onFileUrlChange(imgPreviewUrl);
      $imgPreview = (<img src={imgPreviewUrl} alt="uploadedImg" />);
    }

    return (
      <Modal
        isOpen={this.props.isFileUploaderModalOpen}
        onRequestClose={this.props.onCloseFileUploaderModal}
        className="FileUploaderModal"
        overlayClassName="OverlayModal"
      >
        <div className="fileUploaderContainer">
          <div className="uploadHeader">
            <div className="uploadHeaderTitle"><p>upload new image</p></div>
            <div className="cancelUploadBtn" role="button" onClick={this.props.onCloseFileUploaderModal}>x</div>
          </div>
          <div className="uploadBody">
            <div className="uploadTitle">
              <p>Real profile image helps you to be noticed and get more conenctions</p>
              <p>You can upload JPG, GIF and PNG format images</p>
            </div>
            <input type="file" id="upload" className="uploadInput" onChange={this.handleChange} />
            <label htmlFor="upload">{'Choose File'}</label>
            {/* <label for ="upload">{label}</label> */}
            <div className="sampleUpload">{$imgPreview}</div>
            {/* <div className="uploadErrorMessage"> {uploadErrorMessage}</div> */}
            <button onClick={this.handleSubmit} >
              {'Upload'}
            </button>
          </div>
          <div className="uploadFooter">
            <p>In case you having troubles, try to upload images with less amount of size</p>
          </div>
          <style global>{style}</style>
        </div>
      </Modal>
    );
  }
}

export default FileUploader;
