import { Component } from 'react';
import styles from './index.css';

class ModalDefault extends Component {
  render() {
    return (
      <div className="component">
        <ul className="menu" >
          <li ><a href="" className="link current">Profile Edit</a></li>
          <li ><a href="" className="link">Pay Out</a></li>
        </ul>
        <div className="title"> Profile Edit</div>
        <div className="profile">
          <div className="photos">
            <img className="photo" src="/static/Profile Picture.svg" />
            <img className="uploadButton" src="/static/Profile Background Image.svg" />
          </div>
          <div className="step"><div className="step_child">
            <div className="label">Full Name</div>
            <input className="input" type="text" placeholder="Miguel Carrera" /></div>
          <div className="step_child"><div className="label">Date Of Birth</div>
            <input className="input" type="text" placeholder="04/08/1984" />
            <img className="calendar" src="/static/Calendar Icon.svg" /></div>
          </div>
          <div className="label">About</div>
          <textarea className="input about" placeholder="lalaland" />
          <div className="label">Set Estimated Coast</div>
          <input className="input small" type="text" placeholder="$5" />
          <select className="input select" autoFocus>
            <option >Per minute</option>
            <option >Per hour</option>
            <option >Per day</option>
          </select>
          <div className="label">Suggest Day When You're Free to Talk</div>
          <div className="step2">
            <button className="button">Open Calendar</button>
            <input className="input comment" type="text" placeholder="Blah Blah" /></div>
          <div className="label">Change Password</div>
          <div className="passwords">
            <input className="input pass" type="text" placeholder="Current Password" />
            <input className="input" type="text" placeholder="New Password" />
          </div>
          <div className="buttons">
            <button className="button cancel">Cancel</button>
            <button className="button save">Save Updates</button>
          </div>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    );
  }
}

export default ModalDefault;
