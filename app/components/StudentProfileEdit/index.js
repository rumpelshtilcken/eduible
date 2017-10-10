// import { Component } from 'react';
// import PropTypes from 'prop-types';
import { MuiTextField, MuiButton } from 'components';
import stylesheet from './index.css';

const StudentProfileEdit = () => (
  <div className="container">
    <div className="profile-div">
      <p>Profile Edit</p>
      <img src="" alt="profileImg" />
      <div className="Mui-div">
        <MuiTextField
          title="Fullname"
          value="Miguel Carrera"
        />
      </div>
      <div>
        <MuiButton label="submit" />
      </div>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

export default StudentProfileEdit;
