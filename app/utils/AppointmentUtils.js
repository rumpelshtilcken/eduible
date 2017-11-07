import _ from 'lodash';

const AppointmentUtils = {
  isArrayEqual: (x, y) => _.differenceWith(x, y, _.isEqual),
  isAppointmentNow: x => new Date(x) >= new Date(),
  isCallValid: (calls) => {
    const requestedCall = calls && calls.filter(call => call.state === 'Request');
    return requestedCall.length !== 0;
  },
  isAppointmentValid: ({ appointment, currentAuth0UserId }) => {
    const { student, professional, state } = appointment;

    if ((student.user.auth0UserId !== currentAuth0UserId
            && professional.user.auth0UserId !== currentAuth0UserId)
            || state !== 'Approve') {
      return false;
    }

    return true;
  }
};

export default AppointmentUtils;
