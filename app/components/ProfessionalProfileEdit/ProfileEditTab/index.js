/* eslint-disable */
import { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DatePickerContainer from 'containers/DatePickerContainer';
import TextFieldContainer from 'containers/TextFieldContainer';

import styles from './index.css';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';
const backgroundImage = '/static/prof/profileHeaderBackground.svg';

class ProfileEditTab extends Component {
  static propTypes = {
    onSaveButtonClick: PropTypes.func.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      birthday: PropTypes.string,
      professional: PropTypes.shape({
        about: PropTypes.string,
        price: PropTypes.number
      })
    })
  };

  handleBackgroundImageChange = () => {};

  openCalendar = (e) => {
    e.preventDefault();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log();
  };

  render() {
    const {
      name,
      birthday,
      professional
    } = this.props.user;
    console.log(this.props.user);
    const { about, price } = professional;

    return (
      <MuiThemeProvider>
        <div className="professionalProfileEditContainer">
          <div className="professionalProfileEditTitle">
            {'Profile Edit'}
          </div>
          <form className="professionalProfleEditFormContainer">
            <div className="profileImagesContainer">
              <div className="pickProfileImageContainer">
                <img
                  className="professionalProfileImage"
                  src={professionalImage}
                  alt="profileImage"
                />
                <button className="overlayButton" onClick={this.handleBackgroundImageChange}>
                  {'Change'}
                </button>
                {/* <input type="file" accept="image/*" className="inputH" id="inputBack" /> */}
              </div>
              <div className="pickProfileBackgroundImageContainer">
                <img
                  className="professionalBackgroundImage"
                  src={backgroundImage}
                  alt="profileBackground"
                />
                <button className="overlayButton" onClick={this.handleBackgroundImageChange}>
                  {'Upload image'}
                </button>
                {/* <input type="file" accept="image/*" className="inputH" id="inputBack" /> */}
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
            <TextFieldContainer
              name={'about'}
              placeholder={'Tell us about you'}
              title={'About'}
              type="text"
              validation={() => {}}
              multiLine
            />
            <div className="label">Set Estimated Cost</div>
            <div className="dollarSign">
              <input
                className="input small"
                ref={ref => (this.priceRef = ref)}
                defaultValue={price}
                type="text"
              />
              <div>{'Per Minute'}</div>
            </div>
            <div className="label">{'Suggest Day When You are Free to Talk'}</div>
            <div className="step2">
              <button className="button" onClick={this.openCalendar}>
                {'Open Calendar'}
              </button>
              <TextFieldContainer
                name={'calendarComment'}
                placeholder={''}
                type="string"
                validation={() => {}}
              />
            </div>
            <div className="label">{'Change Password'}</div>
            <div className="passwords">
              <input
                className="input pass"
                ref={ref => (this.currentPassRef = ref)}
                type="text"
                placeholder="Current Password"
              />
              <input
                className="input"
                ref={ref => (this.newPassRef = ref)}
                type="text"
                placeholder="New Password"
              />
            </div>
            <div className="buttons">
              <button className="button cancel" type="reset">
                {'Cancel'}
              </button>
              <button className="button save" type="submit" onClick={this.handleSubmit}>
                {'Save Updates'}
              </button>
            </div>
          </form>
          <style jsx>{styles}</style>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ProfileEditTab;
