import { Component } from 'react';

import { AuthForm } from 'components';

class SignUpFormInputs extends Component {
  inputs = [
    {
      params: {
        title: 'University',
        type: 'string',
        name: 'university',
        placeholder: 'Some cool university'
      }
    },
    {
      params: {
        title: 'Major',
        type: 'string',
        name: 'major',
        placeholder: 'Computer Science'
      }
    },
    {
      type: 'Date',
      params: {
        title: 'Start year',
        name: 'startYear',
        placeholder: '13/11/1992'
      }
    },
    {
      type: 'Date',
      params: {
        title: 'End year',
        name: 'endYear',
        placeholder: '13/11/1996'
      }
    }
  ]

  render() {
    return <AuthForm inputs={this.inputs} />;
  }
}

export default SignUpFormInputs;
