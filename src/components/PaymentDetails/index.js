import { Component } from 'react';

import stylesheet from './index.css';

class PaymentDetails extends Component {
  render() {
    return (
      <div>
        <div className="container1">
          <div id="back">
            <img src="/static/gobackicon.svg" alt="back" />
            <p className="hidep">Back</p>
          </div>
          <div id="navs">
            <div>
              <img src="/static/miguel.jpg" alt="profile" />
            </div>
            <div id="smp">
              <p>15 minutes of conversation with
                    Migeul Carrera on August24,2017 at 18:30 PM</p>
            </div>
          </div>
        </div>
        <div className="container2">
          <div id="title">
            <p>Payment Details</p>
          </div>
          <div className="text">
            <p> Credit Card</p>
          </div>
          <div className="fo">
            <div>
              <input className="box" id="fo1" type="text" placeholder="1234 5678 9123 4567" />
            </div>
            <div>
              <input className="box" id="fo2" type="text" placeholder="CVV" />
            </div>
          </div>
          <div className="text">
            <p> Expiration</p>
          </div>
          <div className="fo">
            <div>
              <select id="fo3" className="box">
                <option value="Month">Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
            <div>
              <select id="fo4" className="box">
                <option value="Year">Year</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
          </div>
          <div className="text">
            <p> Cardholder Name</p>
          </div>
          <div>
            <input id="fo5" className="box" type="text" placeholder="John Doe" />
          </div>
          <div id="boxx">
            <input id="fo6" type="checkbox" />
            <p id="p1" className="text">Save my card information for future purchases</p>
          </div>
          <div id="end">
            <div>
              <p id="p2">Total: $75.00</p>
            </div>
            <div>
              <button className="box" id="btn" type="submit">Request a Call</button>
            </div>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default PaymentDetails;
