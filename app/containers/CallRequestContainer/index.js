import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CallRequest, StatefulView } from 'components';
import { convertFromISOToObject, convertDateToISO, getCurrentUserData } from 'utils/auth';
import * as snackbarActions from 'actions/snackbar';

import {
  createAppointment,
  getProfessional,
  getStudentId
} from './Queries';

class CallRequestContainer extends Component {
  propTypes = {
    onBackButtonClick: PropTypes.func.isRequired,
    professional: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    form: PropTypes.shape({
      appointmentDate: PropTypes.date,
      appointmentTime: PropTypes.date,
      message: PropTypes.string
    }),
    user: PropTypes.shape({
      student: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    createAppointment: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func.isRequired,
    onDidAppointmentCreate: PropTypes.func.isRequired
  };

  state = {
    loading: false
  };

  handleRequestCallClick = async () => {
    try {
      this.setState({ loading: true });
      const params = this.prepareParams();
      await this.props.createAppointment({ ...params });
      this.props.showSnackbar({ type: 'success', message: 'Appointment successfully created' });
      this.props.onDidAppointmentCreate();
      this.setState({ loading: false });
    } catch (err) {
      this.props.showSnackbar({ type: 'error', message: 'Server error' });
      this.setState({ loading: false });
    }
  };

  prepareParams = () => {
    const { appointmentDate, appointmentTime, message } = this.props.form;
    const date = convertFromISOToObject(appointmentDate);
    const time = convertFromISOToObject(appointmentTime);

    const { year, month, dt } = date;
    const { hour, minute } = time;

    const dateTime = convertDateToISO(`${year}-${month}-${dt} ${hour}:${minute}`);
    const { id: professionalId } = this.props.professional;
    const { id: studentId } = this.props.user.student;

    return { dateTime, professionalId, studentId, message };
  };

  render() {
    if (this.props.error) return <div>{`Error: ${this.props.error}`}</div>;

    return (
      <StatefulView loading={this.props.loading || this.state.loading}>
        <CallRequest
          professional={this.props.professional}
          onBackButtonClick={this.props.onBackButtonClick}
          onRequestCallClick={this.handleRequestCallClick}
        />
      </StatefulView>
    );
  }
}

const mapStateToProps = ({ form }) => ({ form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(snackbarActions, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProfessional, {
    name: 'professional',
    skip: ({ professionalId }) => !professionalId,
    options: ({ professionalId }) => ({ variables: { id: professionalId } }),
    props: ({ professional: { Professional, loading, error } }) => ({
      professional: Professional, loading, error
    })
  }),
  graphql(getStudentId, {
    name: 'user',
    skip: professionalId => !professionalId,
    options: () => ({ variables: { id: getCurrentUserData('sub') } }),
    props: ({ user: { User, loading, error } }) => ({
      user: User, loading, error
    })
  }),
  graphql(createAppointment, { props: ({ mutate }) => ({
    createAppointment: ({
      dateTime,
      message,
      professionalId,
      studentId
    }) => mutate({ variables: {
      dateTime,
      message,
      professionalId,
      studentId
    }
    })
  })
  })
)(CallRequestContainer);
