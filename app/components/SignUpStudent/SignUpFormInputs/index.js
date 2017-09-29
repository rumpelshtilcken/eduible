import { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

class SignUpFormInputs extends Component {
  inputs = [
    {
      title: 'FIRST AND LAST NAME',
      input: {
        type: 'string',
        name: 'fullname',
        hintText: this.props.params.fullname || 'John'
      }
    },
    {
      title: 'DATE OF BIRTH',
      input: {
        name: 'date',
        hintText: this.props.params.date || '13/11/1992',
        errorText: []
      }
    },
    {
      title: 'EMAIL',
      input: {
        type: 'string',
        name: 'email',
        hintText: this.props.params.email || 'john@mail.com'
      }
    },
    {
      title: 'PASSWORD',
      input: {
        type: 'string',
        name: 'password',
        hintText: this.props.params.password || 'at least 6 characters'
      }
    }
  ];

  handleChange = (e) => {
    const { name, value } = e.target;
    return this.props.onChange && this.props.onChange({ name, value });
  };

  renderInput = ({ title, input }) => (
    input.name === 'date'
      ? <div key={input.name} className={input.name}>
        <DatePicker
          floatingLabelText={title}
          floatingLabelFixed
          floatingLabelStyle={{ fontSize: '12px', color: '#626262' }}
          hintText={input.hintText}
          hintStyle={{ fontSize: '11px' }}
          inputStyle={{ fontSize: '11px' }}
          mode="landscape"
          fullWidth
        />
      </div>
      : <div key={input.name} className={input.name}>
        <TextField
          type={input.type}
          name={input.name}
          floatingLabelText={title}
          floatingLabelFixed
          fullWidth
          hintText={input.hintText}
          hintStyle={{ fontSize: '11px' }}
          inputStyle={{ fontSize: '11px', color: '#AFAFAF' }}
          floatingLabelStyle={{ fontSize: '12px', color: '#626262', fontWeight: 'bold' }}
          onChange={this.handleChange}
        />
      </div>
  );

  render() {
    return (
      <div className="formInputsContainer">
        {this.inputs.map(this.renderInput)}
      </div>
    );
  }
}

SignUpFormInputs.propTypes = {
  onChange: PropTypes.func,
  params: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired
};

export default SignUpFormInputs;
