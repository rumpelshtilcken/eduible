import { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Card, RoundedButton, AppointmentCard } from 'components';

import ProfessionalProfileHeader from './ProfessionalProfileHeader';
import stylesheet from './index.css';

class ProfessionalProfile extends Component {
  static propTypes = {
    onRequestCallClick: PropTypes.func,
    onEditButtonClick: PropTypes.func,
    isCurrentUser: PropTypes.bool,
    professional: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        auth0UserId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }),
      id: PropTypes.string,
      about: PropTypes.string,
      price: PropTypes.number,
      location: PropTypes.shape({
        country: PropTypes.string
      }),
      job: PropTypes.shape({
        company: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
        jobTitle: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired
      }),
      educations: PropTypes.arrayOf(PropTypes.shape({
        major: PropTypes.shape({
          name: PropTypes.string.isRequired,
          school: PropTypes.shape({
            university: PropTypes.shape({ name: PropTypes.string.isRequired })
          })
        })
      }))
    }),
    appointments: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      allAppointments: PropTypes.arrayOf({
        dateTime: PropTypes.date,
        state: PropTypes.string,
        estimatedLength: PropTypes.number,
        student: PropTypes.shape({
          user: PropTypes.shape({ name: PropTypes.string })
        })
      })
    }),
    onConnectButtonClick: PropTypes.func,
    onAccepButtonClick: PropTypes.func,
    onRejectButtonClick: PropTypes.func
  };

  handleOpenCalendarClick = () => {};

  renderAppointment = appointment => (
    <div className="appointmentCardContainer">
      <AppointmentCard
        isProfessional
        onConnectButtonClick={this.props.onConnectButtonClick}
        onAccepButtonClick={this.props.onAccepButtonClick}
        onRejectButtonClick={this.props.onRejectButtonClick}
        appointment={appointment}
        user={appointment.student.user}
      />
      <style jsx>{stylesheet}</style>
    </div>
  );

  renderAppointments = () => {
    const { appointments } = this.props;

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
      <div className="appointmentCardsContainer">
        <p className="title">{'Forthcoming Conferences'}</p>
        {comingAppointment && comingAppointment.map(this.renderAppointment)}

        <p className="title">{'Requested Conferences'}</p>
        {requestAppointment && requestAppointment.map(this.renderAppointment)}

        <p className="title">{'History'}</p>
        {historyAppointment && historyAppointment.map(this.renderAppointment)}
        <style jsx>{stylesheet}</style>
      </div>
    );
  };

  render() {
    const {
      appointments,
      professional,
      isCurrentUser,
      onRequestCallClick,
      onEditButtonClick
    } = this.props;

    return (
      <div className="professionalProfileContainer">
        <ProfessionalProfileHeader
          professional={professional}
          isCurrentUser={isCurrentUser}
          onRequestCallClick={onRequestCallClick}
          onEditButtonClick={onEditButtonClick}
        />
        <div className="professionalInfoBody">
          <div className={cx('professionalInfoBodyItemContainer', {
            professionalProfileLeftItem: true
          })}
          >
            <Card>
              <div className="professionalInfoBodyItemContentContainer">
                <p className="professionalInfoBodyItemTitle">{'About'}</p>
                <p className="professionalProfileAbout">{professional.about}</p>
              </div>
            </Card>
          </div>
          <div className="professionalInfoBodyItemContainer">
            <Card>
              <div className="professionalInfoBodyItemContentContainer">
                <div className="professionalCalendarHeaderContainer">
                  <p className="professionalInfoBodyItemTitle">{'Availability calendar'}</p>
                  <p className="professionalProfileCalendar">{'(October 2017)'}</p>
                </div>
                <div className="openCalendarButtonContainer">
                  <div className="buttonContainer">
                    <RoundedButton onClick={this.handleOpenCalendarClick} title={'Open calendar'} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {isCurrentUser && appointments && this.renderAppointments()}
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default ProfessionalProfile;
