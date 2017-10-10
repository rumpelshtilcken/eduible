// import { Component } from 'react';
// import PropTypes from 'prop-types';
import { MuiTextField, MuiButton, MuiDatePicker } from 'components';
import stylesheet from './index.css';

const StudentProfileEdit = () => (
  <div className="container">
    <div className="profile-div">
      <p id="title">Profile Edit</p>
      <img src="/static/user_profile_photo.jpeg" alt="profileImg" />
      <div className="MuiTextField-div">
        <MuiTextField
          title="Full Name"
          value="Miguel Carrera"
        />
        <MuiDatePicker
          title="Birth Date"
          value="11/13/2017"
        />
        <div className="pwd-div">
          <MuiTextField
            title="Password"
            value="Current Password"
            type="password"
          />
          <MuiTextField
            type="password"
            value="New Password"
          />
        </div>
      </div>
      <a href="#"> I want to remove my account</a>
      <div className="Muibtn-div">
        <div className="btn"><MuiButton label="Cancel" backgroundColor="#E8E8E8" labelColor="#000000" /></div>
        <div className="btn"><MuiButton label="Save Changes" /></div>
      </div>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

export default StudentProfileEdit;
