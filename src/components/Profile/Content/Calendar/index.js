import { Component } from 'react';
import stylesheet from './index.css';

class About extends Component {
  render() {
    return (
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

        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default About;

