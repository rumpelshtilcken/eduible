import { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, RoundedButton } from 'components';
import { convertFromISOToObject } from 'utils/auth';

import stylesheet from './index.css';

const CALENDAR_ICON = '/static/Calendar.svg';
const CLOCK_ICON = '/static/clock.svg';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';

class AppointmentCard extends Component {
  static propTypes = {
    appointment: PropTypes.shape({
      dateTime: PropTypes.date,
      state: PropTypes.string,
      estimatedLength: PropTypes.number,
      professional: PropTypes.shape({
        user: PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  };

  getHours = () => {
    // TODO: define AM OR PM
    const { hour, minute } = convertFromISOToObject(this.props.appointment.dateTime);
    return `${hour}: ${minute}`;
  }

  getDay = () => {
    // TODO: define month with words
    const { year, month, dt } = convertFromISOToObject(this.props.appointment.dateTime);
    return `${dt} ${month},${year}`;
  };

  isConnectButtonDisabled = () => this.props.appointment.state !== 'Approve';

  render() {
    const { estimatedLength } = this.props.appointment;
    const { name } = this.props.appointment.professional.user;
    return (
      <Card>
        <div className="appointmentContainer">
          <div className="professionalInfoContainer">
            <img
              className="appointmentProfileImage"
              alt="appointment profile"
              src={professionalImage}
            />
            <div>
              <p>{name}</p>
              <p>{`${estimatedLength} min`}</p>
            </div>
          </div>
          <div className="appointmentInfoContainer">
            <div className="appointmentDayInfo">
              <div className="appointmentDay">
                <img
                  className="appointmentDayIcon"
                  src={CALENDAR_ICON}
                  alt="calendar"
                />
                <p>{this.getDay()}</p>
              </div>

              <div className="appointmentDay">
                <img
                  className="appointmentDayIcon"
                  src={CLOCK_ICON}
                  alt="clock"
                />
                <p>{this.getHours()}</p>
              </div>
            </div>

            <div className="connectButtonContainer">
              <RoundedButton
                disabled={this.isConnectButtonDisabled()}
                title={'Connect'}
                onClick={() => {}}
              />
            </div>
          </div>
          <style jsx>{stylesheet}</style>
        </div>
      </Card>
    );
  }
}

export default AppointmentCard;
