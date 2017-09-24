import { Component } from 'react';

import { SignIn } from 'components';

import getWebAuth from 'lib/getWebAuth';

class SignInContainer extends Component {
  handleContinueButtonClick = async ({ email, password }) => {
    try {
      const webAuth = await getWebAuth();
      console.log(email, password);
      webAuth.client.login({

        username: email,
        password,
        scope: 'openid profile',
        audience: 'urn:test'
      }, (err, authResult) => {
        // Auth tokens in the result or an error
        if (err) return console.log('Error: ', err);
        // TODO: save to graphcool
        console.log('AuthResult: ', authResult);
      });
    } catch (err) {
      console.log('Catch handler: ', err);
    }
  };

  handleFacebookButtonClick = () => {
    // TODO: facebook login
  };

  handleGoogleButtonClick = () => {
    // TODO: google login
  };

  render() {
    return (
      <SignIn
        onContinueButtonClick={this.handleContinueButtonClick}
        onFacebookButtonClick={this.handleFacebookButtonClick}
        onGoogleButtonClick={this.handleGoogleButtonClick}
        {...this.props}
      />
    );
  }
}

export default SignInContainer;
