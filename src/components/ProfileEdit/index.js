import { Component } from 'react';
import styles from './index.css';


const links = [{
  link: '/profile-edit',
  label: 'Profile Edit',
  className: 'link current'
},
{
  link: '/pay-out',
  label: 'Pay Out',
  className: 'link'
}];


class ProfileEdit extends Component {
  render() {
    return (
      <div className="component">
        <ul className="menu" items={links} >
          {links.map((item, index) =>
            <li><a className={item.className} href={item.link}>{item.label}</a></li>)}
        </ul>
        <div className="title"> Profile Edit</div>
        <div className="profile">
          <div className="photos">
            <label htmlFor="inputPhoto" className="photo" />
            <input type="file" accept="image/*" className="inputH" id="inputPhoto" />
            <label htmlFor="inputBack" className="uploadButton" />
            <input type="file" accept="image/*" className="inputH" id="inputBack" />
          </div>
          <div className="step"><div className="step_child">
            <div className="label">Full Name</div>
            <input className="input" type="text" placeholder="Miguel Carrera" /></div>
            <div className="step_child"><div className="label">Date Of Birth</div>
            <input className="input date" type="date" defaultValue="1994-08-27" />
          </div>
          </div>
          <div className="label">About</div>
          <textarea className="input about" placeholder="lalaland" />
          <div className="label">Set Estimated Coast</div>
          <div className="dollarSign"><input className="input small" type="text" pattert="\d" />
            <select className="input select" autoFocus>
              <option >Per minute</option>
              <option >Per hour</option>
              <option >Per day</option>
            </select>
          </div>
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


export default ProfileEdit;
