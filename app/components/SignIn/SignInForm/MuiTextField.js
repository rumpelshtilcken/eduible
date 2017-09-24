import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const MuiTextField = ({ onChange, type, name, title, value }) => (
  <TextField
    type={type}
    name={name}
    floatingLabelText={title}
    floatingLabelFixed
    fullWidth
    hintText={value}
    hintStyle={{ fontSize: '11px' }}
    inputStyle={{ fontSize: '11px' }}
    floatingLabelStyle={{ fontSize: '12px', color: '#626262' }}
    onChange={onChange}
  />
);

MuiTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default MuiTextField;
