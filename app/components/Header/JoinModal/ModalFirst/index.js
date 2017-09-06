import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './index.css';
import ModalSecond from '../ModalSecond';

const config2 = [
  {
    title: 'COUNTRY',
    input: {
      type: 'string',
      name: 'country',
      className: 'input',
      placeholder: 'choose from the list'
    }
  },
  {
    title: 'ZIP CODE',
    input: {
      type: 'string',
      name: 'code',
      className: 'input',
      placeholder: '16044728'
    }
  }
];
const config = [
  {
    title: 'FIRST AND LAST NAME',
    input: {
      type: 'string',
      name: 'fullname',
      className: 'input',
      placeholder: 'John Smith'
    }
  },
  {
    title: 'DATE OF BIRTH',
    input: {
      type: 'string',
      name: 'date',
      className: 'input',
      placeholder: '13/11/1992'
    }
  },
  {
    title: 'EMAIL',
    input: {
      type: 'string',
      name: 'email',
      className: 'input',
      placeholder: 'example@email.com'
    }
  },
  {
    title: 'PASSWORD',
    input: {
      type: 'string',
      name: 'email',
      className: 'input',
      placeholder: 'at least six characters'
    }
  }
];

class ModalFirst extends Component {
  renderInput = item => (
    <div>
      <p>{item.title}</p>
      <input
        type={item.input.type}
        name={item.input.name}
        className={item.input.className}
        placeholder={item.input.placeholder}
      />
      <style jsx>{styles}</style>
    </div>
  );

  handleOpenModalSecond = () => {

  }

  render() {
    return (
      <div>
        <p className="sign">JOIN AS PROFESSIONAL</p>
        <p className="share">Share your knowledge and experience. Start now - it’s free</p>

        <div className="signUp">
          <div className="firstColumn">
            <div className="inputBox">
              <div className="in1">
                {config.map(this.renderInput)}
              </div>
            </div>
          </div>
          <div className="secondColumn">
            <div className="inputBox1">
              <div className="in2">
                {config2.map(this.renderInput)}
              </div>
              <button className="continueButton" onClick={this.handleOpenModalSecond}>
                CONTINUE
              </button>
            </div>
            <div className="together">
              <div className="inputBox2">
                <p>OR JOIN WITH</p>
                <button className="facebookButton">LINKEDIN</button>
              </div>
              <div className="inputBox3">
                <img alt="" id="line" src="static/Line123.jpg" />
                <p>ALREADY A MEMBER?</p>
                <button className="loginButton">Log in here</button>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

ModalFirst.propTypes = {
  onOpenJoinModal: PropTypes.func.isRequired
};

export default ModalFirst;
