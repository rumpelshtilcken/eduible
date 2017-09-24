import { Component } from 'react';

import { SignUpProfessional } from 'components';
import getWebAuth from 'lib/getWebAuth';

class SignUpProfessionalContainer extends Component {
  componentWillMount() {
    this.initWebAuth();
  }

  initWebAuth = async () => {
    this.webAuth = await getWebAuth();
  };

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
      await this.webAuth.signup({
        connection: 'Username-Password-Authentication',
        email,
        password
      }, (err) => {
        if (err) return console.log('Error:|| ', err);
        this.signIn({ email, password });
      });
    } catch (error) {
      console.log('Error catch: ', error);
    }
  };

  signIn = ({ email, password }) => {
    this.webAuth.client.login({
      realm: 'Username-Password-Authentication',
      username: email,
      password,
      scope: 'openid profile' },
    (err, authResult) => {
      if (err) return console.log('Error: ', err);
      // authResult.accessToken;
      // TODO: save data to graphcool
      console.log('AuthResult: ', authResult);
      console.log('AuthResult: ', authResult.accessToken);
    });
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
