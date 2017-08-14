import { Component } from 'react';
import stylesheet from './index.css';

class Profile extends Component {
  render() {
    return (
        <div className="container">
          <div className="header">
            <div> <div className="header__image">
              <img className="profile_edit" src="/static/prof/edit.svg"/></div>
          </div>
              <div className="profile__avatar" />
              <ul className="profile__list">
                <li className="profile__item">
                  <p className="profile__title profile__nickname">MIGUEL CARRERA</p>
                      <div className="profile__content">
                    <img className="profile__icon" src="/static/prof/Location.svg" />
                    <span className="profile__text">Miami, Fl</span>
                  </div>
                </li>
                <img className="profile_line" src="/static/prof/Line.svg"/>
                  <li className="profile__item">
                  <p className="profile__title profile__major">IT Developer</p>
                
                  <div className="profile__content">
                    <img className="profile__icon" src="/static/prof/Circle.svg" />
                    <span className="profile__text">Facebook</span>
                  </div>
                </li>
                <img className="profile_line" src="/static/prof/Line.svg"/>
                  <li className="profile__item">
                  <p className="profile__title profile__education">IT with potions</p>
                  <div className="profile__content">
                    <img className="profile__icon" src="/static/prof/Education.svg" />
                    <span className="profile__text">Hogwarts 2001-2007</span>
                  </div>
                </li>
              </ul>
            </div>
       

            <div className="bottom">
            <div className="profile_box">
              <div>  <div className="box_title">About </div> <img className="box_edit" src="/static/prof/edit.svg" /></div>
                <br/>
                <br/>
                <div className="about_content">
              Вводные материалы:
              — Кратко про GraphQL: https://vk.cc/6YoNKZ
              — Документация GraphQL: https://vk.cc/6YoNUX
              — Введение в GraphQL: https://vk.cc/6BT7Mo
              — Интерактивные материалы по GraphQL: https://vk.cc/6YoO6g
              — Учебное пособие по GraphQL: https://vk.cc/6YoObC
              — Обучающие материалы по использованию GraphQL с React: https://vk.cc/6YoOgE</div>
              </div>
              <div className="profile_box">
                <div className="box_title">Meeting </div> <img className="box_edit" src="/static/prof/edit.svg" />
                <div className="meeting_buttons">
                  <button className="meeting_button_inperson">In person</button>
                  <button className="meeting_button_online active">online</button>
                </div>
              </div>
              <div className="profile_box" >
              <div>  <div className="box_title">Availability calendar (date)</div>  <img className="box_edit" src="/static/prof/edit.svg" /></div>
                <br/>
                <br/><div className="calendar_caption">Usually available during the lunch time and after 4pm</div>
                <div className="box_calendar">
                <div className="calendar_buttons">
                <table className="calendar_table">
                <tbody>
               <tr> <th></th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th><th>SUN</th><th></th></tr>
                <tr>
                <td><img className="calendar_left" src="/static/prof/left.svg"/></td>
                <td><button className="calendar_button mon">24</button></td>
                <td><button className="calendar_button tue">25</button></td>
                <td><button className="calendar_button wed">26</button></td>
                <td><button className="calendar_button thu">27</button></td>
                <td><button className="calendar_button friday">28</button></td>
                <td><button className="calendar_button sat">29</button></td>
                <td><button className="calendar_button sun">30</button></td>
                <td><img src="/static/prof/right.svg"/></td>
                </tr>
                </tbody>
                </table>
                </div>
                </div>
                <br/>
              </div>
            </div>
        
          <style jsx>{stylesheet}</style>
        </div>
    );
  }
}

export default Profile;
