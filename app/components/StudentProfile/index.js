import { Component } from 'react';
import PropTypes from 'prop-types';

import AppointmentCard from './AppointmentCard';
import Profile from './Profile';

import stylesheet from './index.css';

class StudentProfile extends Component {
  static propTypes = {
    onEditButtonClick: PropTypes.func.isRequired,
    user: PropTypes.shape({
      student: PropTypes.shape({
        appointments: PropTypes.shape({
          dateTime: PropTypes.date,
          state: PropTypes.string,
          estimatedLength: PropTypes.number,
          professional: PropTypes.shape({
            user: PropTypes.shape({
              name: PropTypes.string.isRequired
            }).isRequired
          }).isRequired
        })
      }).isRequired
    })
  };

  renderAppointment = appointment => (
    <div className="appointmentCardContainer">
      <AppointmentCard appointment={appointment} />
      <style jsx>{stylesheet}</style>
    </div>
  );

  render() {
    const { user, onEditButtonClick } = this.props;

    let historyAppointment;
    let comingAppointment;
    let requestAppointment;

    if (user.student.appointments) {
      historyAppointment = user.student.appointments
        .filter(appointment => appointment.state === 'Ended');
      comingAppointment = user.student.appointments
        .filter(appointment => appointment.state === 'Approve');
      requestAppointment = user.student.appointments
        .filter(appointment => appointment.state === 'Request');
    }

    return (
      <div className="studentProfileContainer">
        <Profile
          user={user}
          onEditButtonClick={onEditButtonClick}
        />

        <p className="title">{'Forthcoming Conferences'}</p>
        {comingAppointment && comingAppointment.map(this.renderAppointment)}

        <p className="title">{'Requested Conferences'}</p>
        {requestAppointment && requestAppointment.map(this.renderAppointment)}

        <p className="title">{'History'}</p>
        {historyAppointment && historyAppointment.map(this.renderAppointment)}

        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default StudentProfile;
