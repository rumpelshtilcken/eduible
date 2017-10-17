import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const MuiTextField = ({
  errorText,
  name,
  onChange,
  onEnterKeyPress,
  placeholder,
  title,
  type,
  value
}) => (
  <TextField
    errorText={errorText}
    floatingLabelFixed
    floatingLabelStyle={{ fontSize: '13px', color: '#626262', fontWeight: 'bold' }}
    floatingLabelText={title}
    fullWidth
    hintStyle={{ fontSize: '11px' }}
    hintText={placeholder}
    value={value}
    inputStyle={{ fontSize: '11px' }}
    mode="landscape"
    name={name}
    onChange={onChange}
    type={type}
    onKeyPress={onEnterKeyPress}
  />
);

MuiTextField.propTypes = {
  errorText: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnterKeyPress: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default MuiTextField;
