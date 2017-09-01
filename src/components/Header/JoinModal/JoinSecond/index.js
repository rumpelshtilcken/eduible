import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import style from './index.css';

const conf = [
  {
    title: 'JOB TITLE',
    input: {
      type: 'string',
      name: 'jobtitle',
      className: 'input',
      placeholder: 'IT developer'
    }
  },
  {
    title: 'COMPANY',
    input: {
      type: 'string',
      name: 'company',
      className: 'input',
      placeholder: 'Facebook'
    }
  }
];

class JoinSecond extends Component {
  renderInput = x => (
    <div className="boxie">
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
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.onRequestClose}
        className="JoinSecondModal"
        overlayClassName="OverlayModal"
      >
        <div className="container">
          <div className="head-text">
            <p className="sign">JOIN AS PROFESSIONAL</p>
            <p className="share share2">Share your knowledge and experience. Start now - it’s free</p>
          </div>
          <div className="container-box">
            <div className="box">
              <div>
                {conf.map(this.renderInput)}
              </div>
              <div className="p-box">
                <p className="share">Providing your job title and company name will help users find you on Eduible</p>
              </div>
            </div>
            <div className="box2">
              <div>
                <button className="btn">CONTINUE</button>
              </div>
              <div className="share-div">
                <a href="#" className="share">skip this step</a>
              </div>
            </div>
          </div>
          <style global>{style}</style>
        </div>
      </Modal>
    );
  }
}

JoinSecond.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default JoinSecond;
