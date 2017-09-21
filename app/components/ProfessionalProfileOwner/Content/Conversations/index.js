import { Component } from 'react';
import stylesheet from './index.css';

const Conversations = () => (
  <div className="confer">
    <p id="zagolovok" className="zagolovok"> New Conversations </p>
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
        <div className="accept">
          <button className="declineBtn">Decline</button>
          <button className="acceptBtn">Accept</button></div>
      </div>
    </div>
    <p className="zagolovok">Forthcoming Conferences</p>
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
    <p className="zagolovok">History</p>
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
    <style jsx>{stylesheet}</style>
  </div>
);
export default Conversations;

