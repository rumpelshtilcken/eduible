import { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class MuiTextField extends Component {
  state = {
    errorText: ''
  };

  handleChange = (event) => {
    if (this.props.validation) {
      const errorText = this.props.validation(event.target.value);
      this.setState({ errorText });
    }

    return this.props.onChange && this.props.onChange(event);
  };

  render() {
    const { type, name, title, value } = this.props;
    return (
      <TextField
        errorText={this.state.errorText}
        floatingLabelFixed
        floatingLabelStyle={{ fontSize: '13px', color: '#626262', fontWeight: 'bold' }}
        floatingLabelText={title}
        fullWidth
        hintStyle={{ fontSize: '11px' }}
        hintText={value}
        inputStyle={{ fontSize: '11px' }}
        mode="landscape"
        name={name}
        onChange={this.handleChange}
        type={type}
      />
    );
  }
}

MuiTextField.propTypes = {
  validation: PropTypes.func,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default MuiTextField;
