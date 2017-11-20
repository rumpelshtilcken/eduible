import { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, RoundedButton } from 'components';
import { convertFromISOToObject } from 'utils/auth';
import AppointmentUtils from 'utils/AppointmentUtils';

import stylesheet from './index.css';

const CALENDAR_ICON = '/static/Calendar.svg';
const CLOCK_ICON = '/static/clock.svg';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';

class AppointmentCard extends Component {
  static propTypes = {
    isProfessional: PropTypes.bool,
    appointment: PropTypes.shape({
      id: PropTypes.string,
      dateTime: PropTypes.date,
      state: PropTypes.string,
      estimatedLength: PropTypes.number
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      socialImageUrl: PropTypes.string,
      cloudinaryId: PropTypes.string
    }).isRequired,
    onConnectButtonClick: PropTypes.func,
    onAccepButtonClick: PropTypes.func,
    onRejectButtonClick: PropTypes.func
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

  isConnectButtonDisabled = () => (
    this.props.appointment.state !== 'Approve' ||
    AppointmentUtils.isAppointmentNow(this.props.appointment.dateTime)
  );

  handleConnectButtonClick = () =>
    this.props.onConnectButtonClick(this.props.appointment.id);

  handleAcceptButtonClick = () => {
    this.props.onAccepButtonClick(this.props.appointment.id);
  };

  handleRejectButtonClick = () => {
    this.props.onRejectButtonClick(this.props.appointment.id);
  };

  renderAppointmentButtons = () => {
    const { state } = this.props.appointment;
    const { isProfessional } = this.props;

    if (state === 'Request' && isProfessional) {
      return this.renderAppointmentOptions();
    }

    return (
      <div className="connectButtonContainer">
        <RoundedButton
          disabled={this.isConnectButtonDisabled()}
          title={'Connect'}
          onClick={this.handleConnectButtonClick}
        />
        <style jsx>{stylesheet}</style>
      </div>
    );
  };

  renderAppointmentOptions = () => (
    <div className="appointmentOptionsContainer">
      <div className="connectButtonContainer">
        <RoundedButton
          title={'Accept'}
          style={{ backgroundColor: '#73DF58' }}
          onClick={this.handleAcceptButtonClick}
        />
      </div>
      <div className="connectButtonContainer">
        <RoundedButton
          title={'Reject'}
          style={{ backgroundColor: 'red' }}
          onClick={this.handleRejectButtonClick}
        />
      </div>
      <style jsx>{stylesheet}</style>
    </div>
  );

  render() {
    const { estimatedLength } = this.props.appointment;
    const {
      name,
      socialImageUrl,
      cloudinaryId
    } = this.props.user;
    const profileImage = cloudinaryId || socialImageUrl || professionalImage;

    return (
      <Card key={this.props.appointment.id}>
        <div className="appointmentContainer">
          <div className="professionalInfoContainer">
            <img
              className="appointmentProfileImage"
              alt="appointment profile"
              src={profileImage}
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


            {this.renderAppointmentButtons()}
          </div>

          <style jsx>{stylesheet}</style>
        </div>
      </Card>
    );
  }
}

export default AppointmentCard;
