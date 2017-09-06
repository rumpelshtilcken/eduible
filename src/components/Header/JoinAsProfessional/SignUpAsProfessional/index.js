import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import JoinSecond from '../JoinSecond';
import style from './index.css';

class JoinFirst extends Component {
  state = {
    isModalSecondLive: false
  }

  handleJoinNextModal = () => {
    this.setState({ isModalSecondLive: true });
    this.props.onRequestClose();
  }

const SignUpAsProfessional = ({ isOpen, onRequestClose, openJobTitleModal }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="SignUpAsProfessional"
    overlayClassName="OverlayModal"
  >
    <div>
      <p>{x.title}</p>
      <input
        type={x.input.type}
        name={x.input.name}
        className={x.input.className}
        placeholder={x.input.placeholder}
      />
    </div>
  );

      <div className="signUp">
        <div>
          <div className="inputBox">
            {inpt.map(renderInput)}
          </div>
        </div>
        <div>
          <div className="inputBox1">
            {inpt2.map(renderInput)}
            <button className="continueButton" onClick={openJobTitleModal}>
           CONTINUE
            </button>
          </div>
          <div className="together">
            <div className="inputBox2">
              <p>OR JOIN WITH</p>
              <button className="facebookButton">LINKEDIN</button>
            </div>
            <div className="inputBox3">
              <img alt="" id="line" src="/static/Line.jpg" />
              <p>ALREADY A MEMBER?</p>
              <a href="#" className="loginButton">Log in here</a>
            </div>
            <style global>{style}</style>
          </div>
        </Modal>
        <JoinSecond
          isOpen={this.state.isModalSecondLive}
          onRequestClose={this.onCloseNextModal}
        />
      </div>
      <style global>{style}</style>
    </div>
  </Modal>
);

SignUpAsProfessional.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  openJobTitleModal: PropTypes.func.isRequired
};

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
      name: 'zip',
      className: 'input',
      placeholder: '16044728'
    }
  }
];

export default SignUpAsProfessional;
