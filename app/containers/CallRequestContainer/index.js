import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';


import { mailingConfig } from 'config';
import { CallRequest, StatefulView } from 'components';
import { convertFromISOToObject, convertDateToISO, getCurrentUserData } from 'utils/auth';
import * as snackbarActions from 'actions/snackbar';

import {
  createAppointment,
  getProfessional,
  getStudentId
} from './Queries';

class CallRequestContainer extends Component {
  static propTypes = {
    onBackButtonClick: PropTypes.func.isRequired,
    professional: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    form: PropTypes.shape({
      appointmentDate: PropTypes.date,
      appointmentTime: PropTypes.date,
      message: PropTypes.string,
      appointmentLength: PropTypes.number
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
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
      this.sendAcknowledgements(params);
      this.props.onDidAppointmentCreate();
      this.setState({ loading: false });
    } catch (err) {
      this.props.showSnackbar({ type: 'error', message: 'Server error' });
      this.setState({ loading: false });
    }
  };

  prepareParams = () => {
    const { appointmentDate, appointmentTime, message, appointmentLength } = this.props.form;
    const date = convertFromISOToObject(appointmentDate);
    const time = convertFromISOToObject(appointmentTime);

    const { year, month, dt } = date;
    const { hour, minute } = time;

    const dateTime = convertDateToISO(`${year}-${month}-${dt} ${hour}:${minute}`);
    const { id: professionalId } = this.props.professional;
    const { id: studentId } = this.props.user.student;

    return {
      estimatedLength: parseInt(appointmentLength, 10),
      dateTime,
      professionalId,
      studentId,
      message
    };
  };

  sendAcknowledgements = async ({
    estimatedLength,
    dateTime,
    message
  }) => {
    const encodedKey = btoa(mailingConfig.key);

    const { name } = this.props.user;
    const { user, price } = this.props.professional;
    const { year, month, dt, hour, minute } = convertFromISOToObject(dateTime);
    const date = `${year}-${month}-${dt} ${hour}:${minute}`;

    const init = {
      method: 'POST',
      headers: {
        Authorization: encodedKey,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        professionalEmail: user.email,
        professionalName: user.name,
        studentName: name,
        message,
        appointmentLength: estimatedLength,
        appointmentPrice: estimatedLength * price,
        appointmentDate: date
      })
    };

    try {
      const response = await fetch('/api/v1/acknowledgements', init);

      if (response.status !== 200) {
        throw new Error('Error');
      }

      return this.props.showSnackbar('success', 'Email sended');
    } catch (error) {
      return this.props.showSnackbar('error', 'Email not sent');
    }
  };

  render() {
    if (this.props.error) return <div>{`Error: ${this.props.error}`}</div>;

    return (
      <StatefulView loading={this.props.loading || this.state.loading}>
        {this.props.professional && <CallRequest
          professional={this.props.professional}
          onBackButtonClick={this.props.onBackButtonClick}
          onRequestCallClick={this.handleRequestCallClick}
        />}
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
      studentId,
      estimatedLength
    }) => mutate({ variables: {
      dateTime,
      message,
      professionalId,
      studentId,
      estimatedLength
    }
    })
  })
  })
)(CallRequestContainer);
