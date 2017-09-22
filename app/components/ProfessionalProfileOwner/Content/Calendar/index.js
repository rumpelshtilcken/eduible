import stylesheet from './index.css';

const Calendar = () => (
  <div className="profileBox calendar">
    <div className="half" id="half">
      <div className="boxTitle">Availability calendar (date) (September 2017)</div>
    </div>
    <div>
      <div className="calendarCaption">
        Usually available during the lunch time and after 4pm, or bla-bla-bla-bla-bla-bla and bla.
      </div>
      <div>
        <button className="openCalendar">Open Calendar</button>
      </div>
    </div>

    <style jsx>{stylesheet}</style>
  </div>
);

export default Calendar;
