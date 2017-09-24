import { Component } from 'react';

import { SignIn } from 'components';

import getWebAuth from 'lib/getWebAuth';

class SignInContainer extends Component {
  componentWillMount() {
    this.initAuth();
  }

  initAuth = async () => {
    this.webAuth = await getWebAuth();
  };

  handleContinueButtonClick = async ({ email, password }) => {
    try {
      this.webAuth.client.login({
        realm: 'Username-Password-Authentication',
        username: email,
        password,
        scope: 'openid profile',
        audience: 'urn:test'
      }, (err, authResult) => {
        if (err) return console.log('Error: ', err);
        // TODO: save to graphcool
        // authResult.accessToken;
        console.log('AuthResult: ', authResult);
        console.log('AuthResult: ', authResult.accessToken);
      });
    } catch (err) {
      console.log('Catch handler: ', err);
    }
  };

  handleFacebookButtonClick = () => {
    // TODO: facebook login
    this.webAuth.authorize({ connection: 'facebook' });
  };

  handleGoogleButtonClick = () => {
    // TODO: google login
    this.webAuth.authorize({ connection: 'google' });
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
