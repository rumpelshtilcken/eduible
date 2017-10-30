import { Component } from 'react';
import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { StudentProfile, StatefulView } from 'components';
import AppointmentUtils from 'utils/AppointmentUtils';

const appointmentSubscription = gql`
  subscription subscribeToAppointments($id: ID!) {
    Appointment (filter: {
      node: {
        student: { id: $id }
      }
    }) {
      node {
        id
        dateTime
        state
        estimatedLength
        professional {
          id
          user {
            id
            name
          }
        }
      }
    }
  }
`;

class StudentProfileContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    studentId: PropTypes.string,
    student: PropTypes.object,
    appointments: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      allAppointments: PropTypes.arrayOf({
        dateTime: PropTypes.date,
        state: PropTypes.string,
        estimatedLength: PropTypes.number,
        professional: PropTypes.shape({
          user: PropTypes.shape({ name: PropTypes.string })
        })
      })
    }),
    onEditButtonClick: PropTypes.func.isRequired
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.loading || !newProps.appointments.loading) {
      if (this.subscription) {
        if (AppointmentUtils.isArrayEqual(
          newProps.appointments.allAppointments,
          this.props.appointments.allAppointments
        )) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.subscription();
        } else {
          // we already have an active subscription with the right params
          return;
        }
      }
      this.subscription = newProps.appointments.subscribeToMore({
        document: appointmentSubscription,
        variables: { id: this.props.studentId },
        updateQuery: this.handleDidAppointmentsUpdate,
        onError: this.handleUpdateError
      });
    }
  }

  componentWillUnmount() {
    this.subscription();
  }

  handleDidAppointmentsUpdate = (
    previousState,
    { subscriptionData: { data: { Appointment: { node } } } }
  ) => {
    const appointments = previousState.allAppointments.map(appointment =>
      (appointment.id === node.id
        ? node
        : appointment)
    ).filter(appointment => appointment.id === node.id)
      ? appointments
      : appointments.push(node);

    return appointments;
  };

  handleUpdateError = err => console.error(err)

  render() {
    const {
      student,
      appointments,
      loading,
      error,
      onEditButtonClick
    } = this.props;
    if (error) return (<div>{`StudentProfileContainer Error: ${error}`}</div>);

    return (
      <StatefulView loading={loading} >
        {student && appointments && appointments.allAppointments &&
        <StudentProfile
          student={student}
          appointments={appointments.allAppointments}
          onEditButtonClick={onEditButtonClick}
        />}
      </StatefulView>
    );
  }
}

const getStudentById = gql`
  query getStudentById($id: ID!) {
    Student(id: $id) {
      id
      user {
        id
        name
      }
    }
  }
`;

const getAppointmentByStudentId = gql`
  query getAppointmentByStudentId($id: ID!) {
    allAppointments(filter: { student: { id: $id } }) {
      id
      dateTime
      state
      estimatedLength
      professional {
        id
        user {
          id
          name
        }
      }
    }
  }
`;

export default compose(
  graphql(getStudentById, {
    name: 'student',
    options: ({ studentId }) => ({
      variables: { id: studentId }
    }),
    props: ({ student: { Student, loading, error } }) => ({
      student: Student, loading, error
    })
  }),
  graphql(getAppointmentByStudentId, {
    name: 'appointments',
    options: ({ studentId }) => ({
      forcePolicy: 'cache-and-network',
      variables: { id: studentId }
    })
  })
)(StudentProfileContainer);
