import { Component } from 'react';

import stylesheet from './index.css';

class CallRequest extends Component {
  render() {
    return (
      <div>
        <div className="container1">
          <div id="back">
            <img src="/static/gobackicon.svg" alt="Back" />
            <p className="hidep">Back</p>
          </div>
          <div id="navs">
            <div>
              <img src="/static/miguel.jpg" alt="profilePicture" />
            </div>
            <div>
              <p id="miguel">MIGUEL CARRERA</p>
            </div>
            <div id="smp">
              <p className="hidep">IT developer</p>
              <p className="hidep">HOGWARTS 2001-2007</p>
              <p>$5 per minute</p>
            </div>
          </div>
        </div>
        <div className="container2">
            <div id="title">
              <p>Request a Call</p>
            </div>
            <div className="text">
              <p>Message to Miguel</p>
            </div>
            <div className="fo">
              <div>
                <textarea className="box" id="textbox" placeholder="Your Message"></textarea>
              </div>
              <div className="text2">
                  <p>Tell Miguel what you want to talk with him about.</p>
              </div>
            </div>
            <div className="text">
              <p>Set Estimated Length</p>
            </div>
            <div className="fo">
              <div>
                <select className="box" id="fo1">
                  <option value="">15 minutes ($75.00)</option>
                  <option value="">30 minutes ($150.00)</option>
                  <option value="">60 minutes ($300.00)</option>
                </select>
              </div>
              <div className="hidep text2">
                  <p>How long do you want to talk with Miguel?</p>
              </div>
            </div>
            <div className="text">
                <p>Suggest Times When You're Free to Talk</p>
                <p id="text3">Please note that the times you choose will be 10 hours earlier for Miguel</p>
            </div>
            <div className="fo">
              <div>
                <select className="box" id="fo2">
                  <option value="">Thu, Aug 24 2017</option>
                  <option value="">Mon, Aug 14 2017</option>
                  <option value="">Sn, Aug 10 2017</option>
                </select>
              </div>
              <div>
                <select className="box" id="fo3">
                  <option value="">6:30 PM</option>
                  <option value="">6:30 PM</option>
                  <option value="">6:30 PM</option>
                </select>
              </div>
            </div>
            <div className="foo">
              <div>
                <p>By scheduling a call you agree with our <u>Terms of Service.</u></p>
              </div>
              <div id="fo4">
                <button className="box" id="btn" type ="submit">Request a Call</button>
              </div>
            </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default CallRequest;
