import React, { Component } from 'react';
import PropTypes from 'prop-types';

import JoinFirst from './JoinFirst';
import JoinSecond from './JoinSecond';
import JoinThird from './JoinThird';


class JoinModal extends Component {
  state = {
    isModalSecondLive: false,
    isModalThirdLive: false
  }

  handleJoinSecondModal = () => {
    this.props.onRequestClose();
    this.setState({ isModalSecondLive: true });
  }

  handleJoinSecondModalClose = () => this.setState({ isModalSecondLive: false });

  handleJoinThirdModal= () => {
    this.handleJoinSecondModalClose();
    this.setState({ isModalThirdLive: true });
  }

  handleJoinThirdModalClose= () => this.setState({ isModalThirdLive: false });

  render() {
    return (
      <div>
        <JoinFirst
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          openJoinSecondModal={this.handleJoinSecondModal}
        />
        <JoinSecond
          isOpen={this.state.isModalSecondLive}
          onRequestClose={this.handleJoinSecondModalClose}
          openJoinThirdModal={this.handleJoinThirdModal}
        />
        <JoinThird
          isOpen={this.state.isModalThirdLive}
          onRequestClose={this.handleJoinThirdModalClose}
        />
      </div>);
  }
}

JoinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default JoinModal;
