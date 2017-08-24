import { Component } from 'react';
import fetch from 'isomorphic-fetch';

import styles from './index.css';

class ModalSuccess extends Component {
  state = {
    verificationCode: ''
  };

  handleChange = event =>
    this.setState({
      verificationCode: event.target.value
    });

  handleSubmit = () => {
    fetch('/api/v1/auth/local/verifyCode', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'adilkhankenzhetaev@gmail.com',
        verificationCode: this.state.verificationCode
      })
    })
      .then((res) => {
        console.log('Response: ', res);
      })
      .catch(err => console.log(('Error': err)));
  };

  render() {
    return (
      <div className="secondSign">
        <h1 className="signUpText">SIGN UP </h1>{' '}
        <div className="firstTxt">
          {' '}<p> A verification code has been sent to your email address. </p>{' '}
          <p>
            Please enter the code below to verify your email and finish the registration process{' '}
          </p>{' '}
        </div>{' '}
        <form className="codeForm">
          <input
            type="string"
            name="verificationCode"
            className="codeInput"
            placeholder="a233jnk4kl4k"
            onChange={this.handleChange}
          />{' '}
          <button className="sendAgain">Did not receive the code ? Send again </button>{' '}
        </form>{' '}
        <button onClick={this.handleSubmit} className="createButton">
          CREATE ACCOUNT{' '}
        </button>{' '}
        <p className="ssylka">
          By creating an account, you agree to & nbsp;{' '}
          <a href="">Eduible’ s Terms and Conditions and Privacy Policy. </a>{' '}
        </p>{' '}
        <style jsx> {styles} </style>{' '}
      </div>
    );
  }
}

export default ModalSuccess;
