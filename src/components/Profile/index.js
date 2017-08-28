import { Component } from 'react';

import ProfileHeader from './ProfileHeader';
import stylesheet from './index.css';


class Profile extends Component {
  render() {
    return (
      <div className="container">
        <ProfileHeader />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default Profile;
