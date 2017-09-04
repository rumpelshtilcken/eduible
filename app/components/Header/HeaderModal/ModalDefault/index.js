import PropTypes from 'prop-types';
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import styles from './index.css';

const config = [
  {
    title: 'FIRST AND LAST NAME',
    input: {
      type: 'string',
      name: 'fullname',
      placeholder: 'John Smith'
    }
  },
  {
    title: 'DATE OF BIRTH',
    input: {
      type: 'date',
      name: 'date',
      placeholder: '13/11/1992'
    }
  },
  {
    title: 'EMAIL',
    input: {
      type: 'email',
      name: 'email',
      placeholder: 'example@email.com'
    }
  },
  {
    title: 'PASSWORD',
    input: {
      type: 'password',
      name: 'password',
      placeholder: 'at least six characters'
    }
  }
];

class ModalDefault extends Component {
  state = {
    fullname: '',
    date: '',
    email: '',
    password: ''
  };

  handleContinueClick = (event) => {
    event.preventDefault();
    fetch('/api/v1/auth/local/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: this.state.fullname,
        date: this.state.date,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.password
      })
    })
      .then((res) => {
        console.log('Response: ', res);
        this.props.onOpenModal(this.state.email);
      })
      .catch(err => console.log(('Error': err)));
  };

  handleFacebookButtonClick = () => {
    fetch('/api/v1/auth/facebook/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log('Response: ', res);
        this.props.onOpenModal(this.state.email);
      })
      .catch(err => console.log(('Error': err)));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderInput = item =>
    (<div key={item.input.name}>
      <p>
        {item.title}
      </p>
      <input
        onChange={this.handleChange}
        type={item.input.type}
        name={item.input.name}
        className="input"
        placeholder={item.input.placeholder}
      />
      <style jsx>
        {styles}
      </style>
    </div>);

  render() {
    return (
      <div>
        <h1 className="sign">SIGN UP</h1>
        <div className="signUp">
          <form className="inputBox" onSubmit={this.handleContinueClick}>
            {config.map(this.renderInput)}

            <button className="continueButton" type="submit">
              CONTINUE
            </button>
          </form>
          <div className="together">
            <div className="inputBox2">
              <p>OR SIGN UP USING</p>
              <button className="facebookButton" onClick={this.handleFacebookButtonClick}>
                FACEBOOK
              </button>
              <button className="googleButton">GOOGLE</button>
              <img alt="" id="line" src="static/Line123.jpg" />
            </div>
            <div className="inputBox3">
              <p>ALREADY A MEMBER?</p>
              <button className="loginButton">Log in here</button>
            </div>
          </div>
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    );
  }
}

ModalDefault.propTypes = {
  onOpenModal: PropTypes.func.isRequired
};

export default ModalDefault;
