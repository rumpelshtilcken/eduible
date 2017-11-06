import React from 'react';
import PropTypes from 'prop-types';

import { MuiButton } from 'components';
import TextFieldContainer from 'containers/TextFieldContainer';
import DatePickerContainer from 'containers/DatePickerContainer';
import FileUploaderContainer from 'containers/FileUploaderContainer';

import stylesheet from './index.css';

class StudentProfileEdit extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    onSaveButtonClick: PropTypes.func.isRequired,
    onCancelButtonClick: PropTypes.func.isRequired,
    onRemoveAccountButtonClick: PropTypes.func.isRequired
  };

  state = {
    isOpenModal: false,
    imgUrl: 'http://res.cloudinary.com/dsyyowxl0/image/upload/v1509977540/user_profile_photo_usqtkm.png'
  }

  handleCloseModal = () => (this.setState({ isOpenModal: false }))
  handleImageChange = () => (this.setState({ isOpenModal: true }))

  render() {
    return (
      <div className="studentProfileContainer">
        <div className="profile">
          <p className="studentProfileTitle">{'Profile Edit'}</p>
          <div className="pickProfileImageContainer">
            <img src={this.state.imgUrl} alt="profileImg" className="studentProfileImage" />
            <input type="button" className="overlayButton" value="Change" onClick={this.handleImageChange} />
          </div>
          <div className="muiTextFieldBox">
            <TextFieldContainer
              title={'Full Name'}
              type={'string'}
              name={'name'}
              placeholder={this.props.name}
              onContinueButtonClick={this.props.onSaveButtonClick}
            />
            <DatePickerContainer
              title={'Birthday'}
              name={'birthday'}
              placeholder={this.props.birthday}
            />
            <TextFieldContainer
              title={'Change Password'}
              type={'password'}
              placeholder={'Current Password'}
              onContinueButtonClick={this.props.onSaveButtonClick}
            />
            <TextFieldContainer
              type={'password'}
              placeholder={'New Password'}
              onContinueButtonClick={this.props.onSaveButtonClick}
            />
          </div>
          <div
            className="removeAccount"
            onClick={this.props.onRemoveAccountButtonClick}
            role="button"
            tabIndex={0}
          >
           I want to remove my account
          </div>
          <div className="muibtnBox">
            <div className="btn">
              <MuiButton
                label="Cancel"
                backgroundColor="#E8E8E8"
                labelStyle={{ color: 'black', fontSize: 11 }}
                onClick={this.props.onCancelButtonClick}
              />
            </div>
            <div className="btn">
              <MuiButton
                label="Save Changes"
                onClick={this.props.onSaveButtonClick}
              />
            </div>
          </div>
        </div>
        <FileUploaderContainer
          isFileUploaderModalOpen={this.state.isOpenModal}
          onCloseFileUploaderModal={this.handleCloseModal}
          previewImageUrl={this.state.imgUrl}
        // onFileUrlChange={this.handleFileUrlChange}
        />
        <style jsx>{stylesheet}</style>
        <FileUploaderModal
          isFileUploaderModalOpen={this.state.isOpenModal}
          onCloseFileUploaderModal={this.handleCloseModal}
          previewImageUrl={this.state.imgUrl}
          onFileUrlChange={this.handleFileUrlChange}
        />
      </div>
    );
  }
}

export default StudentProfileEdit;
