import _ from 'lodash';

const AppointmentUtils = {
  isArrayEqual: (x, y) => _.differenceWith(x, y, _.isEqual),
  isAppointmentNow: x => new Date(x) >= new Date()
};

export default AppointmentUtils;
