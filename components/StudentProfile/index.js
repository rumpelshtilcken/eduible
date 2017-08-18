import { Component } from 'react';
import stylesheet from './index.css';

class StudentProfile extends Component {
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
          <div className="edit editIcon" />
          <div className="edit editButton">
            <button>Edit profile</button>
          </div>
        </div>
        <div className="pageBlockWrapper">
          <ul className="tabMenu pageBlock">
            <li className="active">Universities</li>
            <li>Grades</li>
            <li>Conversations
              <span className="notifyDot" />
            </li>
          </ul>
          <div className="universities pageBlock">
            <div className="universityLogo" />
            <a href="#" className="universityRemove">Remove from list</a>
            <div className="universityWrapper">
              <div className="universityInfo">
                <h2 className="universityHeading universityTitle">Hogwarts</h2>
                <p className="universityDescription">
                  Hogwarts Castle is a large, seven-storey high building
                  supported by magic, with a hundred and forty two staircases
                  throughout its many towers and turrets and very deep dungeons.
                </p>
                <a href="#" className="readMore">Read more</a>
              </div>
              <div className="universityCourse">
                <h2 className="universityHeading">Computer science</h2>
                <a href="#" className="change">Change</a>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default StudentProfile;

