import { Component } from 'react';
import stylesheet from './index.css';

class UserProfile extends Component {
  render() {
    return (
      <div className="container">
        <div className="userProfileWrapper pageBlock pageBlock_halfRound">
          <div className="userProfile">
            <div className="userPhoto" />
            <div className="userInfo">
              <h2 className="userName">Anna Stark</h2>
              <img
                className="locationIcon"
                src="/static/ic_location.svg"
                alt="location"
              />
              <p className="userLocation">Miami, FL</p>
            </div>
          </div>
          <div className="editIcon" />
          <div className="editButton">
            <button>Edit profile</button>
          </div>
        </div>
        <div className="pageBlockWrapper">
          <div className="tabMenu pageBlock" />
          <div className="universities pageBlock" />
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default UserProfile;

