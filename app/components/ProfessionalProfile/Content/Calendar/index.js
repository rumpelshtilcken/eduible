import PropTypes from 'prop-types';

import stylesheet from './index.css';

const Calendar = ({ onOpenCalendarButtonClick }) => (
  <div className="profileBox calendar" >
    <div className="half" id="half">
      <div className="boxTitle">
        <p>{'Availability calendar (date) (October 2017)'}</p>
      </div>
    </div>
    <div>
      <div className="calendarCaption">
        {''}
      </div>

      <button className="openCalendar" onClick={onOpenCalendarButtonClick}>
        {'Open Calendar'}
      </button>
    </div>

    <style jsx>{stylesheet}</style>
  </div>
);

Calendar.propTypes = {
  onOpenCalendarButtonClick: PropTypes.func
};

export default Calendar;
