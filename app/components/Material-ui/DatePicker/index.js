import DatePicker from 'material-ui/DatePicker';
import PropTypes from 'prop-types';

const MuiDatePicker = ({ onChange, title, value }) => (
  <DatePicker
    floatingLabelText={title}
    floatingLabelFixed
    floatingLabelStyle={{ fontSize: '12px', color: '#626262' }}
    hintText={value}
    hintStyle={{ fontSize: '11px' }}
    inputStyle={{ fontSize: '11px' }}
    mode="portrait"
    fullWidth
    onChange={onChange}
    minDate={new Date()}
  />
);

MuiDatePicker.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string
};

export default MuiDatePicker;
