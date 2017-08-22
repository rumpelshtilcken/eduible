import { Component } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './index.css';

class StudentProfileEdit extends Component {
  render() {
    return (
      <div className="container">
        <div className="profile">
          <img src="/static/anna.jpg" alt="" />
          <div className="column">
            <p className="anna">ANNA STARK</p>
            <div className="row">
              <img src="/static/loc.jpg" alt="" />
              <p>MIAMI, FL</p>
            </div>
          </div>
          <button className="editBtn"><p id="edit">Edit Profile</p></button>
        </div>
        <div className="secondPart">
          <div className="navigation">
            <p>Universities</p>
            <img className="line" src="/static/Liine.jpg" alt="" />
            <p>Grades</p>
            <img className="line" src="/static/Liine.jpg" alt="" />
            <div className="conv"><p className="conv">Conversations</p><img src="/static/circlee.jpg" alt="" />
            </div>
          </div>
          <div className="conversations">
            <div className="confer">
              <p>Forthcoming Conferences</p>
            </div>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}
export default StudentProfileEdit;
