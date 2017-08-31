import { Component } from 'react';

import ProfileHeader from './ProfileHeader';
import Content from './Content';
import stylesheet from './index.css';

const ProfessionalProfileOwner = () => (
  <div className="container">
    <ProfileHeader />
    <Content />
    <style jsx>{stylesheet}</style>
  </div>
);

export default ProfessionalProfileOwner;
