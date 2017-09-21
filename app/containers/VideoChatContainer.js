import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VideoChat } from 'components';
import fetch from 'isomorphic-fetch';
import withVideoChat from 'hoc/withVideoChat';

// TODO: fetch via graphql
class VideoChatContainer extends Component {
  componentDidMount() {
    this.generateToken();
  }

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

  generateToken = async () => {
    try {
      const res = await fetch('/api/v1/videochat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: 'John',
          expiresInSeconds: 5000
        })
      });

      const json = await res.json();
      this.props.onVideoChatParamsLoad({ vidyoToken: 'json.vidyoToken', resourceId: 'Test' });
    } catch (error) {
      console.log('Fetch error: ', error);
    }
  };

  render() {
    return (
      <VideoChat
        user={this.user}
        setVideoViewId={this.props.onVideoViewIdLoad}
        devices={this.props.devices}
        selectedDevices={this.props.selectedDevices}
        sendMessageTest={this.props.sendMessageTest}
      />
    );
  }
}

export default withVideoChat(VideoChatContainer);
