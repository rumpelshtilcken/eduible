import { Component } from 'react';

import { SignUpProfessional } from 'components';
import getWebAuth from 'lib/getWebAuth';

class SignUpProfessionalContainer extends Component {
  /* eslint-disable no-unused-vars */
  handleContinueButtonClick = async ({
    fullname,
    date,
    email,
    password,
    country,
    zipCode
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
      <SignUpProfessional
        onContinueButtonClick={this.handleContinueButtonClick}
        onLinkedinButtonClick={this.handleLinkedinButtonClick}
        onLoginButtonClick={this.handleLoginButtonClick}
        {...this.props}
      />
    );
  }
}

export default SignUpProfessionalContainer;
