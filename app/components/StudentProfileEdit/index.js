import React from 'react';
import PropTypes from 'prop-types';

import { MuiButton, Image } from 'components';
import TextFieldContainer from 'containers/TextFieldContainer';
import DatePickerContainer from 'containers/DatePickerContainer';

import stylesheet from './index.css';

class StudentProfileEdit extends React.Component {
  static propTypes = {
    user: PropTypes.func,
    cloudinaryId: PropTypes.func,
    name: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    onSaveButtonClick: PropTypes.func.isRequired,
    onCancelButtonClick: PropTypes.func.isRequired,
    onRemoveAccountButtonClick: PropTypes.func.isRequired,
    onProfileAvatarChange: PropTypes.func.isRequired
  };

  handleProfileImageChange = (e) => {
    e.preventDefault();
    this.props.onProfileAvatarChange();
  };

  render() {
    const cloudinaryId = this.props.cloudinaryId || this.props.user.cloudinaryId;
    return (
      <div className="studentProfileContainer">
        <div className="profile">
          <p className="studentProfileTitle">{'Profile Edit'}</p>
          <div className="pickProfileImageContainer">
            {(cloudinaryId)
              ? (<div className="studentProfileImage">
                <Image publicId={cloudinaryId} />
              </div>)
              : (
                <img
                  className="studentProfileImage"
                  src={this.props.user.socialImageUrl}
                  alt="professional avatar"
                />
              )
            }
            <button className="overlayButton" onClick={this.handleProfileImageChange}>
              {'Change'}
            </button>
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
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default StudentProfileEdit;
