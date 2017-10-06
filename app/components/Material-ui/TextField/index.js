import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const MuiTextField = ({ type, name, title, value, errorText, onChange }) => (
  <TextField
    errorText={errorText}
    floatingLabelFixed
    floatingLabelStyle={{ fontSize: '13px', color: '#626262', fontWeight: 'bold' }}
    floatingLabelText={title}
    fullWidth
    hintStyle={{ fontSize: '11px' }}
    hintText={value}
    inputStyle={{ fontSize: '11px' }}
    mode="landscape"
    name={name}
    onChange={onChange}
    type={type}
  />
);

MuiTextField.propTypes = {
  errorText: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default MuiTextField;
