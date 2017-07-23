import Modal from 'react-modal';
import { Component } from 'react';

import fetch from 'isomorphic-fetch';
import stylesheet from './index.css';

const validator = require('email-validator');


require('isomorphic-fetch');

const customStyle = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: 0,
    right: 0,
    bottom: 0
  },
  content: {
    width: '400px',
    height: '20px',
    backgroundColor: 'white',
    top: '300px'
  }
};

class ComingSoon extends Component {
  state = {
    modalIsOpen: false
  }

  handleClick = () => {
    // TODO validate email

    validator.validate_async(this.input.value, ((err, isValidEmail) => {
      if (isValidEmail) {
        fetch('https://eduible.herokuapp.com/comingsoon', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.input.value
          })
        }).then(() => {
          this.input.value = null;
          this.setState({
            modalIsOpen: true
          });
          setTimeout(() => {
            this.setState({
              modalIsOpen: false
            });
          }, 2000);
        });
      }
    }));
  };
  // eslint-disable-no-return-assign
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyle}
          contentLabel="Example Modal"
        >
          <div className="modal">Thank you for subsribing!</div>
        </Modal>
        <div className="container">
          <h1>Our website is launching soon</h1>
          <p>Sign up now and be the first when we go live: </p>
          <input ref={el => (this.input = el)} type="string" name="email" className="input" placeholder="john.doe@example.com" />
          <button className="subscribeButton" onClick={this.handleClick}>NOTIFY ME</button>
          <style jsx>{stylesheet}</style>
        </div>
      </div>
    );
  }
}

export default ComingSoon;
