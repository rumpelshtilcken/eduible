import { Component } from 'react';

import ProfileHeader from './ProfileHeader';
import Content from './Content';
import stylesheet from './index.css';


class ProfileOwner extends Component {
  render() {
    return (
      <div className="container">
        <ProfileHeader />
        <Content />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default ProfileOwner;
