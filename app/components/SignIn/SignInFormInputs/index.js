import { Component } from 'react';
import PropTypes from 'prop-types';

import { AuthForm } from 'components';

class SignUpFormInputs extends Component {
  static propTypes = {
    validation: PropTypes.shape({
      email: PropTypes.func,
      password: PropTypes.func
    })
  };

  inputs = [
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
  ]

  render() {
    return (
      <AuthForm inputs={this.inputs} />
    );
  }
}

export default SignUpFormInputs;
