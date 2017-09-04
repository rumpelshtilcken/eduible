import React, { Component } from 'react';
import { VideoChat } from 'components';

class VideoChatContainer extends Component {
  user = {
    name: 'Miguel Carrera',
    imgUrl: '/static/miguel.jpg',
    icon: '/static/placeholderIcon.svg',
    city: 'Miami, Fl',
    timer: {
      hour: 0,
      minutes: 59
    }
  };

  render() {
    return <VideoChat user={this.user} />;
  }
}

export default VideoChatContainer;
