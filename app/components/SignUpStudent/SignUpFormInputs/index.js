import { Component } from 'react';
import PropTypes from 'prop-types';

import { AuthForm } from 'components';

class SignUpFormInputs extends Component {
  static propTypes = {
    validation: PropTypes.shape({
      fullname: PropTypes.func,
      email: PropTypes.func,
      password: PropTypes.func
    }),
    onContinueButtonClick: PropTypes.func.isRequired
  };

  inputs = [
    {
      params: {
        name: 'fullname',
        title: 'FIRST AND LAST NAME',
        type: 'string',
        validation: this.props.validation.fullname,
        placeholder: 'John'
      }
    },
    {
      type: 'Date',
      params: {
        name: 'date',
        title: 'BIRTH DATE',
        placeholder: '13/11/1992'
      }
    },
    {
      params: {
        title: 'EMAIL',
        name: 'email',
        type: 'email',
        validation: this.props.validation.email,
        placeholder: 'john@mail.com'
      }
    },
    {
      params: {
        title: 'PASSWORD',
        name: 'password',
        type: 'password',
        validation: this.props.validation.password,
        placeholder: 'at least six characters'
      }
    }
  ];

  render() {
    return (
      <AuthForm inputs={this.inputs} onContinueButtonClick={this.props.onContinueButtonClick} />
    );
  }
}

export default SignUpFormInputs;
