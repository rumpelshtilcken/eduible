import { Component } from 'react';
import stylesheet from './index.css';

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <div className="profile_header">
          <div> <div className="header__image">
            <img className="profile__edit" src="/static/prof/edit.svg" alt="edit" /></div>
          </div>
          <div className="profile__avatar" />
          <ul className="profile__list">
            <li className="profile__item">
              <p className="profile__title profile__nickname">MIGUEL CARRERA</p>
              <div className="profile__content">
                <img className="profile__icon" src="/static/prof/Location.svg" alt="location" />
                <span className="profile__text">Miami, Fl</span>
              </div>
            </li>
            <img className="profile_line" src="/static/prof/Line.svg" alt="line" />
            <li className="profile__item">
              <div className="profile__title profile__major">IT Developer</div>
              <div className="profile__content">
                <img className="profile__icon" src="/static/prof/Circle.svg" alt="cirle" />
                <span className="profile__text">Facebook</span>
              </div>
            </li>
            <img className="profile_line" src="/static/prof/Line.svg" alt="line" />
            <li className="profile__item">
              <p className="profile__title profile__education">IT with potions</p>
              <div className="profile__content">
                <img className="profile__icon" src="/static/prof/Education.svg" alt="education" />
                <span className="profile__text">Hogwarts 2001-2007</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div className="profile_box about">
            <div className="half"><div className="box_title">About </div>
              <button className="box__edit">
                <img className="box__edit" src="/static/prof/edit.svg" alt="edit" />
              </button>
            </div>
            <div className="about_content">Lorem ipsum dolor sit amet!
            consectetur adipiscing elit, sed do eiusmod
             tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
               eu fugiat nulla pariatur. </div>
          </div>
          <div className="profile_box meeting">
            <div className="half"><div className="box_title">Price</div>
              <button className="box__edit">
                <img className="box__edit" src="/static/prof/edit.svg" alt="edit" />
              </button>
            </div>
            <div className="meeting_clock">
              <img src="/static/clock.jpg" alt="" />
              <p>$5 per minute</p>
            </div>
          </div>
          <div className="profile_box calendar" >
            <div className="half" id="half"><div className="box_title">Availability calendar (date) <p>(September 2017)</p></div>
            </div>
            <div><div className="calendar_caption">Usually available during the lunch time and after 4pm</div>
              <div className="box_calendar">
                <div className="calendar_buttons">
                  <table className="calendar_table">
                    <tbody>
                      <tr>
                        <th />
                        <th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th><th>SUN</th>
                        <th />
                      </tr>
                      <tr>
                        <td><img className="calendar_left" src="/static/prof/left.svg" alt="left" /></td>
                        <td><button className="calendar_button mon">24</button></td>
                        <td><button className="calendar_button tue">25</button></td>
                        <td><button className="calendar_button wed">26</button></td>
                        <td><button className="calendar_button thu">27</button></td>
                        <td><button className="calendar_button friday">28</button></td>
                        <td><button className="calendar_button sat">29</button></td>
                        <td><button className="calendar_button sun">30</button></td>
                        <td><img src="/static/prof/right.svg" alt="right" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default Profile;
