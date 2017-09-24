import { Component } from 'react';

import { SignUpStudent } from 'components';
import getWebAuth from 'lib/getWebAuth';

class SignUpStudentContainer extends Component {
  /* eslint-disable no-unused-vars */
  handleContinueButtonClick = async ({
    fullname,
    date,
    email,
    password
  }) => {
    /* eslint-enable no-unused-vars */
    try {
      const webAuth = await getWebAuth();
      const result = await webAuth.signup({
        connection: 'Username-Password-Authentication',
        email,
        password
      }, (err) => {
        if (err) return console.log('Error:|| ', err);
        // TODO: login user
        // TODO: save data to graphcool
        return console.log('success signup without login!');
      });

      console.log('Result: ', result);
      console.log('Result: ', result.response);
      console.log('Result: ', result.json());
    } catch (error) {
      console.log('Error catch: ', error);
    }
  };

  handleLinkedinButtonClick = () => {
    getWebAuth().authorize({
      connection: 'linkedin'
    });
  };

  handleLoginButtonClick = () => {
    // TODO: open Login modal
  };

  render() {
    return (
      <SignUpStudent
        onContinueButtonClick={this.handleContinueButtonClick}
        onLinkedinButtonClick={this.handleLinkedinButtonClick}
        onLoginButtonClick={this.handleLoginButtonClick}
        {...this.props}
      />
    );
  }
}

export default SignUpStudentContainer;
