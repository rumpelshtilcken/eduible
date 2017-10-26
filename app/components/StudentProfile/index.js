import { Component } from 'react';
import PropTypes from 'prop-types';

import AppointmentCard from './AppointmentCard';
import Profile from './Profile';

import stylesheet from './index.css';

class StudentProfile extends Component {
  static propTypes = {
    onEditButtonClick: PropTypes.func.isRequired,
    appointments: PropTypes.shape({
      dateTime: PropTypes.date,
      state: PropTypes.string,
      estimatedLength: PropTypes.number,
      professional: PropTypes.shape({
        user: PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }),
    student: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string
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
    const { student, appointments, onEditButtonClick } = this.props;

    let historyAppointment;
    let comingAppointment;
    let requestAppointment;

    if (appointments) {
      historyAppointment = appointments
        .filter(appointment => appointment.state === 'Ended');
      comingAppointment = appointments
        .filter(appointment => appointment.state === 'Approve');
      requestAppointment = appointments
        .filter(appointment => appointment.state === 'Request');
    }

    return (
      <div className="studentProfileContainer">
        <Profile
          student={student}
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
