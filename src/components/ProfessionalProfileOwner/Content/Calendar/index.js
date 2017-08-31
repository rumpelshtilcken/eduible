import { Component } from 'react';
import stylesheet from './index.css';

const Calendar = () => (
  <div className="profileBox calendar" >
    <div className="half" id="half"><div className="boxTitle">Availability calendar (date) (September 2017)</div>
    </div>
    <div><div className="calendarCaption">Usually available during the lunch time and after 4pm</div>
      <div className="boxCalendar">
        <div className="calendarButtons">
          <table className="calendarTable">
            <tbody>
              <tr>
                <th />
                <th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th><th>SUN</th>
                <th />
              </tr>
              <tr>
                <td><img className="calendarLeft" src="/static/prof/left.svg" alt="left" /></td>
                <td><button className="calendarButton mon">24</button></td>
                <td><button className="calendarButton tue">25</button></td>
                <td><button className="calendarButton wed">26</button></td>
                <td><button className="calendarButton thu">27</button></td>
                <td><button className="calendarButton friday">28</button></td>
                <td><button className="calendarButton sat">29</button></td>
                <td><button className="calendarButton sun">30</button></td>
                <td><img src="/static/prof/right.svg" alt="right" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <style jsx>{stylesheet}</style>
  </div>
);

export default Calendar;

