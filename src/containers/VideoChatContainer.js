import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VideoChat } from 'components';

class VideoChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Miguel Carrera',
        imgUrl: '/static/miguel.jpg',
        icon: '/static/placeholderIcon.svg',
        city: 'Miami, Fl',
        timer: {
          hour: 0,
          minutes: 59
        }
      }
    };
  }

  render() {
    return (
      <VideoChat
        name={this.state.user.name}
        city={this.state.user.city}
        icon={this.state.user.icon}
        imgUrl={this.state.user.imgUrl}
        timer={this.state.user.timer}
      />
    );
  }
}

VideoChatContainer.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    timer: PropTypes.objectOf(PropTypes.number) }) };

export default VideoChatContainer;
