import { Component } from 'react';

// import { RoundedButton, SideMoreLayout, SelectDropdown, TextInput } from 'components';

import stylesheet from './index.css';

class StudentProfileDetails extends Component {
  render() {
    return (
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
            <div className="firstConversation">
              <div className="first" >
                <img src="/static/profile.jpg" alt="" />
                <div className="fullName">
                  <p>MIGUEL CARRERA</p>
                  <p>15 minutes</p>
                </div>
              </div>
              <div className="second">
                <div className="together">
                  <div className="calendar">
                    <img src="/static/Calendar.svg" alt="" />
                    <p>16 AUG, 2017</p>
                  </div>
                  <div className="duration">
                    <img src="/static/clock.svg" alt="" />
                    <p>3:30 PM</p>
                  </div>
                </div>
                <button className="connectBtn">Connect</button>
              </div>
            </div>
            <div className="secondConversation">
              <div className="first" >
                <img src="/static/profile.jpg" alt="" />
                <div className="fullName">
                  <p>MIGUEL CARRERA</p>
                  <p>15 minutes</p>
                </div>
              </div>
              <div className="second">
                <div className="together">
                  <div className="calendar">
                    <img src="/static/Calendar.svg" alt="" />
                    <p>16 AUG, 2017</p>
                  </div>
                  <div className="duration">
                    <img src="/static/clock.svg" alt="" />
                    <p>3:30 PM</p>
                  </div>
                </div>
                <button className="connectBtn">Connect</button>
              </div>
            </div>
            <p>History</p>
            <div className="history">
              <div className="first" >
                <img src="/static/profile.jpg" alt="" />
                <div className="fullName">
                  <p>MIGUEL CARRERA</p>
                  <p>15 minutes</p>
                </div>
              </div>
              <div className="second">
                <div className="together">
                  <div className="calendar">
                    <img src="/static/Calendar.svg" alt="" />
                    <p>16 AUG, 2017</p>
                  </div>
                  <div className="duration">
                    <img src="/static/clock.svg" alt="" />
                    <p>3:30 PM</p>
                  </div>
                </div>
                <button className="connectBtn">History</button>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default StudentProfileDetails;
