// import { Component } from 'react';
// import PropTypes from 'prop-types';
import stylesheet from './index.css';
// import PropTypes from 'prop-types';

import StudentProfile from './StudentProfile';
import StudentProfileDetails from './StudentProfileDetails';

const StudentProfileEdit = () => (
  <div className="container">
    <StudentProfile
      profileName={'ANNA STARK'}
      profileImageUrl={'/static/anna.jpg'}
      profileLocation={'MIAMI, FL'}
      profileLocUrl={'/static/loc.jpg'}
    />
    <StudentProfileDetails />
    <style jsx>{stylesheet}</style>
  </div>
);

export default StudentProfileEdit;
