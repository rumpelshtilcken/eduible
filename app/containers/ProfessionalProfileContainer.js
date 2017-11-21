import { Component } from 'react';

import { compose, graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import { ProfessionalProfile, StatefulView } from 'components';
import AppointmentUtils from 'utils/AppointmentUtils';

const appointmentSubscription = gql`
  subscription subscribeToAppointments($id: ID!) {
    Appointment (filter: {
      node: {
        professional: { id: $id }
      }
      mutation_in: [CREATED, UPDATED]
    }) {
      node {
        id
        dateTime
        state
        estimatedLength
        student {
          id
          user {
            id
            name
            socialImageUrl
            cloudinaryId
          }
        }
      }
    }
  }
`;

class ProfessionalProfileContainer extends Component {
  static propTypes = {
    professionalId: PropTypes.string.isRequired,
    updateAppointment: PropTypes.func,
    isCurrentUser: PropTypes.bool,
    onRequestCallClick: PropTypes.func,
    onEditButtonClick: PropTypes.func,
    onConnectButtonClick: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.object,
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
    })
  };

  componentWillReceiveProps(newProps) {
    if ((!newProps.loading || !newProps.appointments.loading) && newProps.isCurrentUser) {
      if (this.subscription) {
        if (AppointmentUtils.isArrayEqual(
          newProps.appointments.allAppointments,
          this.props.appointments.allAppointments
        )
        ) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.subscription();
        } else {
          // we already have an active subscription with the right params
          return;
        }
      }
      this.subscription = newProps.appointments.subscribeToMore({
        document: appointmentSubscription,
        skip: !this.props.isCurrentUser,
        variables: { id: this.props.professionalId },
        updateQuery: this.handleDidAppointmentsUpdate,
        onError: this.handleUpdateError
      });
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription();
    }
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

  handleRequestCallClick = () =>
    this.props.onRequestCallClick({
      professionalId: this.props.professional.id
    });

  handleAcceptButtonClick = appointmentId =>
    this.props.updateAppointment({ id: appointmentId, state: 'Approve' });

  handleRejectButtonClick = appointmentId =>
    this.props.updateAppointment({ id: appointmentId, state: 'Reject' });

  render() {
    const {
      appointments,
      professional,
      loading,
      error,
      isCurrentUser
    } = this.props;
    if (error) return <div>{error}</div>;

    return (
      <StatefulView loading={loading}>
        {professional &&
          <ProfessionalProfile
            professional={professional}
            appointments={appointments && appointments.allAppointments}
            onRequestCallClick={this.handleRequestCallClick}
            onEditButtonClick={this.props.onEditButtonClick}
            onConnectButtonClick={this.props.onConnectButtonClick}
            onAccepButtonClick={this.handleAcceptButtonClick}
            onRejectButtonClick={this.handleRejectButtonClick}
            isCurrentUser={isCurrentUser}
          />}
      </StatefulView>
    );
  }
}

const getProfessionalById = gql`
  query Professional($id: ID!) {
    Professional(id: $id) {
      user {
        id
        auth0UserId
        name
        socialImageUrl
        cloudinaryId
        cloudinaryBackgroundId
      }
      id
      price
      location {
        id
        country
      }
      job {
        id
        company { 
          id
          name 
        }
        jobTitle { 
          id
          title 
        }
      }
      educations {
        id
        major {
          id
          name
          school {
            id
            university {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const getAppointmentByProfessionalId = gql`
  query getAppointmentByProfessionalId($id: ID!) {
    allAppointments(filter: { professional: { id: $id } }) {
      id
      dateTime
      state
      estimatedLength
      student {
        id
        user {
          id
          name
          socialImageUrl
          cloudinaryId
          cloudinaryBackgroundId
        }
      }
    }
  }
`;

const updateAppointment = gql`
  mutation updateAppointment($id: ID!, $state: AppointmentState!) {
      updateAppointment( id: $id, state: $state) {
      id
    }
  }
`;

export default compose(
  graphql(getProfessionalById, {
    name: 'professional',
    options: ({ professionalId }) => ({ variables: { id: professionalId } }),
    props: ({ professional: { Professional, loading, error } }) => ({
      professional: Professional, loading, error
    })
  }),
  graphql(getAppointmentByProfessionalId, {
    name: 'appointments',
    skip: ({ isCurrentUser }) => !isCurrentUser,
    options: ({ professionalId }) => ({
      forcePolicy: 'network-only',
      variables: { id: professionalId }
    })
  }),
  graphql(updateAppointment, { props: ({ mutate }) =>
    ({
      updateAppointment: ({ id, state }) => mutate({ variables: { id, state } })
    })
  })
)(ProfessionalProfileContainer);
