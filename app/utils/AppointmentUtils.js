import _ from 'lodash';

const AppointmentUtils = {
  isArrayEqual: (x, y) => _.differenceWith(x, y, _.isEqual),
  isAppointmentNow: x => new Date(x) >= new Date(),
  isCallValid: (calls) => {
    const requestedCall = calls && calls.filter(call => call.state === 'Request');
    return requestedCall && requestedCall.length !== 0;
  },
  isAppointmentValid: ({ appointment, currentUserAuth0UserId }) => {
    const { student, professional, state } = appointment;

    if ((student.user.auth0UserId !== currentUserAuth0UserId
            && professional.user.auth0UserId !== currentUserAuth0UserId)
            || state !== 'Approve') {
      return false;
    }

    return true;
  },
  getCurrentUser: ({ student, professional, currentUserAuth0UserId }) => {
    if (currentUserAuth0UserId === student.user.auth0UserId) return student;
    if (currentUserAuth0UserId === professional.user.auth0UserId) return professional;
    return null;
  },
  getParticipant: ({ student, professional, currentUserAuth0UserId }) => {
    if (currentUserAuth0UserId !== student.user.auth0UserId) return student;
    if (currentUserAuth0UserId !== professional.user.auth0UserId) return professional;
    return null;
  }
};

export default AppointmentUtils;
