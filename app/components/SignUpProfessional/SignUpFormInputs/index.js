import { Component } from 'react';
import PropTypes from 'prop-types';

import ValidationUtils from 'utils/ValidationUtils';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

class SignUpFormInputs extends Component {
  inputs = [
    {
      title: 'FIRST AND LAST NAME',
      input: {
        type: 'string',
        name: 'fullname',
        hintText: this.props.params.fullname || 'John',
        errorText: ''
      }
    },
    {
      title: 'BIRTH DATE',
      input: {
        name: 'date',
        hintText: this.props.params.date || '13/11/1992'
      }
    },
    {
      title: 'EMAIL',
      input: {
        type: 'string',
        name: 'email',
        hintText: this.props.params.email || 'john@mail.com',
        errorText: ''
      }
    },
    {
      title: 'PASSWORD',
      input: {
        type: 'password',
        name: 'password',
        hintText: this.props.params.password || 'at least six characters',
        errorText: ''
      }
    },
    {
      title: 'COUNTRY',
      input: {
        type: 'string',
        name: 'country',
        hintText: this.props.params.country || 'choose from the list',
        errorText: ''
      }
    },
    {
      title: 'ZIP CODE',
      input: {
        type: 'string',
        name: 'zipcode',
        hintText: this.props.params.zipcode || '16044728',
        errorText: ''
      }
    }
  ]


  renderInput = ({ title, input, i }) => (
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
          errorText={input.errorText[[input.errorText.length]]}
          floatingLabelFixed
          fullWidth
          hintText={input.hintText}
          hintStyle={{ fontSize: '11px' }}
          inputStyle={{ fontSize: '11px' }}
          floatingLabelStyle={{ fontSize: '12px', color: '#626262' }}
          mode="landscape"
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
    password: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired
  }).isRequired
};

export default SignUpFormInputs;
