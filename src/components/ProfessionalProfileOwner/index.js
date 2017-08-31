import { Component } from 'react';
import PropTypes from 'prop-types';

import ProfileHeader from './ProfileHeader';
import Content from './Content';
import stylesheet from './index.css';

const ProfessionalProfileOwner = ({ user }) => (
  <div className="container">
    <ProfileHeader user={user} />
    <Content />
    <style jsx>{stylesheet}</style>
  </div>
);

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    imgUrl: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string).isRequired })
};


export default ProfessionalProfileOwner;
