import { Component } from 'react';
import PropTypes from 'prop-types';

import { AuthForm } from 'components';

class SignUpFormInputs extends Component {
  inputs = [
    {
      params: {
        name: 'fullname',
        onChange: this.props.onChange,
        title: 'FIRST AND LAST NAME',
        type: 'string',
        validation: this.props.validation.fullname,
        value: this.props.params.fullname || 'John'
      }
    },
    {
      type: 'Date',
      params: {
        name: 'date',
        onChange: this.props.onChange,
        title: 'BIRTH DATE',
        value: this.props.params.date || '13/11/1992'
      }
    },
    {
      params: {
        title: 'EMAIL',
        name: 'email',
        onChange: this.props.onChange,
        type: 'email',
        validation: this.props.validation.email,
        value: this.props.params.email || 'john@mail.com'
      }
    },
    {
      params: {
        title: 'PASSWORD',
        name: 'password',
        onChange: this.props.onChange,
        type: 'password',
        validation: this.props.validation.password,
        value: this.props.params.password || 'at least six characters'
      }
    },
    {
      params: {
        title: 'COUNTRY',
        name: 'country',
        onChange: this.props.onChange,
        type: 'string',
        value: this.props.params.country || 'choose from the list'
      }
    },
    {
      params: {
        title: 'ZIP CODE',
        name: 'zipcode',
        onChange: this.props.onChange,
        type: 'string',
        value: this.props.params.zipcode || '16044728'
      }
    }
  ]

  render() {
    return (
      <AuthForm inputs={this.inputs} />
    );
  }
}

SignUpFormInputs.propTypes = {
  onChange: PropTypes.func,
  validation: PropTypes.shape({
    fullname: PropTypes.func,
    email: PropTypes.func,
    password: PropTypes.func
  }),
  params: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired
  }).isRequired
};

export default SignUpFormInputs;
