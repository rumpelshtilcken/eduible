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

  onCloseNextModal = () => (
    this.setState({ isModalSecondLive: false })
  );
  renderInput = x => (
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

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          className="JoinModal"
          overlayClassName="OverlayModal"
        >
          <div>
            <p className="sign">JOIN AS PROFESSIONAL</p>
            <p className="share">Share your knowledge and experience. Start now - it’s free</p>

            <div className="signUp">
              <div>
                <div className="inputBox">
                  {config.map(this.renderInput)}
                </div>
              </div>
              <div>
                <div className="inputBox1">
                  {config2.map(this.renderInput)}
                  <button className="continueButton" onClick={this.handleJoinNextModal}>
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
            <style global>{style}</style>
          </div>
        </Modal>
        <JoinSecond
          isOpen={this.state.isModalSecondLive}
          onRequestClose={this.onCloseNextModal}
        />
      </div>
    );
  }
}

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

JoinFirst.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default JoinFirst;
