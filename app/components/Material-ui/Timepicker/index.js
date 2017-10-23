import TimePicker from 'material-ui/TimePicker';
import PropTypes from 'prop-types';

const MuiTimePicker = ({ onChange, title, value }) => (
  <TimePicker
    floatingLabelText={title}
    floatingLabelFixed
    floatingLabelStyle={{ fontSize: '12px', color: '#626262' }}
    hintText={value}
    hintStyle={{ fontSize: '11px' }}
    inputStyle={{ fontSize: '11px' }}
    fullWidth
    onChange={onChange}
  />
);

MuiTimePicker.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string
};

export default MuiTimePicker;
