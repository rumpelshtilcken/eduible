import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import style from './index.css';

class FileUploaderModal extends React.Component {
  static propTypes = {
    isFileUploaderModalOpen: PropTypes.bool.isRequired,
    onCloseFileUploaderModal: PropTypes.func.isRequired,
    previewImageUrl: PropTypes.string,
    onFileUrlChange: PropTypes.func.isRequired
  };

  state = {
    file: '',
    imgPreviewUrl: this.props.previewImageUrl || ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(!file){
      this.props.onCloseFileUploaderModal();
    }
  }

  handleChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imgPreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render(){
    let {imgPreviewUrl} = this.state;
    if (imgPreviewUrl) {
      this.props.onFileUrlChange(imgPreviewUrl);
    } 

    return(
      <Modal
        isOpen={this.props.isFileUploaderModalOpen}
        onRequestClose={this.props.onCloseFileUploaderModal}
        className='FileUploaderModal'
        overlayClassName='OverlayModal'
      >
        <div className="fileUploaderContainer"> 
          <div className="uploadHeader">
            <div className="uploadHeaderTitle"><p>upload new image</p></div>
            <div className="cancelUploadBtn" onClick={this.props.onCloseFileUploaderModal}>X</div>
          </div>
          <div className="uploadBody">
            <p>Real profile image helps you to be noticed and get more conenctions</p>
            <p>You can upload JPG, GIF and PNG format images</p>
            <div className="uploadButtons">
              <input type="file" id='upload' onChange={this.handleChange}/>
              {/* <label for ="upload">{label}</label> */}
              <input type="button" value="Upload" onSubmit={this.handleSubmit}/>
            </div>
          </div>
          <div className="uploadFooter">
            <p>In case you are having troubles, try to upload images with less amount of size</p>
          </div>
          <style global>{style}</style>
        </div>
      </Modal>
    )
  }
}

export default FileUploaderModal;