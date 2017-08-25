import { Component } from 'react';

import { VideoChat } from 'components';

const config = {
  name: 'Miguel Carrera',
  imgUrl: '/static/miguel.jpg',
  icon: '/static/placeholderIcon.svg',
  city: 'Miami, Fl',
  timer: {
    hour: 0,
    minutes: 59
  }
};

class VideoChatContainer extends Component {
  render() {
    return (
      <VideoChat
        name={config.name}
        city={config.city}
        icon={config.icon}
        imgUrl={config.imgUrl}
        timer={config.timer}
      />
    );
  }
}


export default VideoChatContainer;
