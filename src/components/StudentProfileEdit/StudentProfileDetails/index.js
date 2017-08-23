import { Component } from 'react';

// import { RoundedButton, SideMoreLayout, SelectDropdown, TextInput } from 'components';

import stylesheet from './index.css';

class StudentProfileDetails extends Component {
  // state = {
  //   creditCardholderName: '',
  //   creditCardNumber: '',
  //   creditCardCVV: '',
  //   expirationMonth: '',
  //   expirationYear: ''
  // };

  // month = [
  //   { value: 'january', label: 'January' },
  //   { value: 'february', label: 'February' },
  //   { value: 'march', label: 'March' },
  //   { value: 'april', label: 'April' },
  //   { value: 'may', label: 'May' },
  //   { value: 'june', label: 'June' },
  //   { value: 'july', label: 'July' },
  //   { value: 'august', label: 'August' },
  //   { value: 'september', label: 'September' },
  //   { value: 'october', label: 'October' },
  //   { value: 'november', label: 'November' },
  //   { value: 'december', label: 'December' }
  // ];

  // generateYear = () => {
  //   const MAX_EXPIRATION_YEAR = 2020;
  //   const MIN_EXPIRATION_YEAR = 1975;
  //   const year = [];
  //   let i = 0;

  //   for (i = MIN_EXPIRATION_YEAR; i < MAX_EXPIRATION_YEAR; i++) {
  //     year.push({ value: i, label: i });
  //   }

  //   return year;
  // };

  // handleExpirationMonthChoose = event => this.setState({ expirationMonth: event.target.value });
  // handleExpirationYearChoose = event => this.setState({ expirationYear: event.target.value });

  // handleCreditCardNumberType = event => this.setState({ creditCardNumber: event.target.value });
  // handleCreditCardCVVType = event => this.setState({ creditCardCVV: event.target.value });

  // handleCreditCardholderNameType = event =>
  //   this.setState({ creditCardholderName: event.target.value });

  // handleRequestCallClick = () => {};

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
