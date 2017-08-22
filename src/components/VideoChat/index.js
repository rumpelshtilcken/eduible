import { Component } from 'react';
import stylesheet from './index.css';

class VideoChat extends Component {
  render() {
    return (
      <div className="container">
        <div className="section1" />
        <div className="section2">
          <div>
            <img id="profileImg" src="/static/miguel.jpg" alt="profileImg" />
          </div>
          <div id="profileDetails">
            <p id="name">MIGUEL CARRERA</p>
            <p><img src="/static/placeholderIconMobile.svg" alt="" /> <span id="smp">MIAMI, FL</span></p>
          </div>
          <div>
            <p id="smn">0:59</p>
          </div>
        </div>
        <div className="section3">
          <div id="fo">
            <div>
              <input id="fo1" type="text" placeholder="I can't hear you!" />
            </div>
            <div>
              <img id="fo2" src="/static/sendButtonMobile.svg" alt="" />
            </div>
          </div>
          <div id="chatbox">
            <div className="dialog">
              <div className="smp1">
                <h4>You</h4>
              </div>
              <div className="smp2">
                <p>Sorry, I can't hear you</p>
              </div>
            </div>
            <div className="dialog">
              <div className="smp1">
                <h4>Miguel</h4>
              </div>
              <div className="smp2">
                <p>Without a beard i seem younger, but i'm still professional</p>
              </div>
            </div>
            <div className="dialog">
              <div className="smp1">
                <h4>You</h4>
              </div>
              <div className="smp2">
                <p>Sorry, I can't hear you</p>
              </div>
            </div>
            <div className="dialog">
              <div className="smp1">
                <h4>Miguel</h4>
              </div>
              <div className="smp2">
                <p>Without a beard i seem younger, but i'm still professional</p>
              </div>
            </div>
            <div className="dialog">
              <div className="smp1">
                <h4>You</h4>
              </div>
              <div className="smp2">
                <p>Sorry, I can't hear you</p>
              </div>
            </div>
            <div className="dialog">
              <div className="smp1">
                <h4>Miguel</h4>
              </div>
              <div className="smp2">
                <p>Without a beard i seem younger, but i'm still professional</p>
              </div>
            </div>
            <div className="dialog">
              <div className="smp1">
                <h4>You</h4>
              </div>
              <div className="smp2">
                <p>Sorry, I can't hear you</p>
              </div>
            </div>
            <div className="dialog">
              <div className="smp1">
                <h4>Miguel</h4>
              </div>
              <div className="smp2">
                <p>Without a beard i seem younger, but i'm still professional</p>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default VideoChat;
