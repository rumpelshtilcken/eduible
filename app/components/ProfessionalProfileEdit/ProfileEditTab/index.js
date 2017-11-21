import { Component } from 'react';
import PropTypes from 'prop-types';

import DatePickerContainer from 'containers/DatePickerContainer';
import TextFieldContainer from 'containers/TextFieldContainer';

import { MuiButton, Image } from 'components';

import styles from './index.css';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';
const professionalBackgroundImage =
  'http://res.cloudinary.com/dsyyowxl0/image/upload/v1509975928/profileHeaderBackground_f5ev0i.svg';

class ProfileEditTab extends Component {
  static propTypes = {
    onSaveButtonClick: PropTypes.func.isRequired,
    onCancelButtonClick: PropTypes.func.isRequired,
    onProfileAvatarChange: PropTypes.func.isRequired,
    onProfileBackgroundChagne: PropTypes.func.isRequired,
    profileAvaraId: PropTypes.string,
    profileBackgroundId: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cloudinaryId: PropTypes.string,
      socialImageUrl: PropTypes.string,
      cloudinaryBackgroundId: PropTypes.string,
      birthday: PropTypes.string,
      professional: PropTypes.shape({
        about: PropTypes.string,
        price: PropTypes.number
      })
    })
  };

  handleProfileImageChange = (e) => {
    e.preventDefault();
    this.props.onProfileAvatarChange();
  };

  handleBackgroundImageChange = (e) => {
    e.preventDefault();
    this.props.onProfileBackgroundChagne();
  };

  openCalendar = e => e.preventDefault();

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveButtonClick();
  };

  renderProfileAvatar = () => (
    <div>
      {(this.props.profileAvaraId || this.props.user.cloudinaryId)
        ? (<div className="professionalProfileImage">
          <Image publicId={this.props.profileAvaraId || this.props.user.cloudinaryId} />
        </div>)
        : (
          <img
            className="professionalProfileImage"
            src={this.props.user.socialImageUrl || professionalImage}
            alt="professional avatar"
          />
        )
      }
      <style jsx>{styles}</style>
    </div>
  );

  renderProfileBackground = () => (
    <div>
      {(this.props.profileBackgroundId || this.props.user.cloudinaryBackgroundId)
        ? (<div className="professionalBackgroundImage">
          <Image
            publicId={this.props.profileBackgroundId || this.props.user.cloudinaryBackgroundId}
          />
        </div>)
        : (
          <img
            className="professionalBackgroundImage"
            src={professionalBackgroundImage}
            alt="professional avatar"
          />
        )
      }
      <style jsx>{styles}</style>
    </div>
  );

  render() {
    const { birthday } = this.props.user;

    return (
      <div className="professionalProfileEditContainer">
        <div className="professionalProfileEditTitle">
          {'Profile Edit'}
        </div>
        <form className="professionalProfleEditFormContainer">
          <div className="profileImagesContainer">
            <div className="pickProfileImageContainer">
              {this.renderProfileAvatar()}
              <button className="overlayButton" onClick={this.handleProfileImageChange}>
                {'Change'}
              </button>
            </div>
            <div className="pickProfileBackgroundImageContainer">
              {this.renderProfileBackground()}
              <button className="overlayButton" onClick={this.handleBackgroundImageChange}>
                {'Upload image'}
              </button>
            </div>
          </div>
          <div className="step">
            <div className="step_child">
              <TextFieldContainer
                name={'name'}
                placeholder={'John Smith'}
                title={'Full Name'}
                type="string"
                validation={() => {}}
              />
            </div>
            <div className="step_child">
              <DatePickerContainer
                name={'date'}
                title={'Birthday'}
                placeholder={birthday || '1900-01-01'}
              />
            </div>
          </div>
          <div className="aboutTextAreaBox">
            <TextFieldContainer
              name={'about'}
              placeholder="Type your information"
              validation={() => {}}
              title={'About'}
              type="string"
            />
          </div>
          <div className="label">Set Estimated Cost</div>
          <div className="dollarSign">
            <TextFieldContainer
              name={'price'}
              validation={() => {}}
              title={'Price($)'}
              type="number"
            />
            <div className="perMinute">{'Per Minute'}</div>
          </div>
          <div className="label">{'Suggest Day When You are Free to Talk'}</div>
          <div className="step2">
            <button className="button" onClick={this.openCalendar}>
              {'Open Calendar'}
            </button>
            <div className="calendarComment">
              <TextFieldContainer
                name={'calendarComment'}
                placeholder={'Usually available during lunch time and ..'}
                type="string"
                validation={() => {}}
              />
            </div>
          </div>
          <div className="label">{'Change Password'}</div>
          <div className="passwords">
            <div className="passwordTextField">
              <TextFieldContainer
                name={'pwdCurrent'}
                placeholder={'Current Password'}
                type="password"
                validation={() => {}}
              />
            </div>
            <div className="passwordTextField">
              <TextFieldContainer
                name={'pwdNew'}
                placeholder={'New Password'}
                type="password"
                validation={() => {}}
              />
            </div>
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
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </form>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ProfileEditTab;
