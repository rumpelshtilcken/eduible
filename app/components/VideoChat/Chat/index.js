import { ChatFeed } from 'react-chat-ui';
import { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import TextInputBox from './Dialog';
import style from './index.css';

class ChatBox extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      senderName: PropTypes.string
    })),
    userId: PropTypes.string,
    onMessageSent: PropTypes.func.isRequired
  };

  handleSubmitButtonClick = (message) => {
    console.log('qwerty: MessageSend', message);
    this.props.onMessageSent({
      id: this.props.userId,
      message,
      senderName: 'You'
    });
  }

  render() {
    return (
      <div className="chatContainer" >
        <div className="chatInputContainer">
          <TextInputBox
            onSubmitButtonClick={this.handleSubmitButtonClick}
          />
        </div>
        <div className="chatHistory">
          <Scrollbars universal autohide>
            <ChatFeed
              messages={this.props.messages || []}
              hasInputField={false}
              showSenderName
              bubblesCentered={false}
              bubbleStyles={
                {
                  text: { fontSize: 10 },
                  chatbubble: { borderRadius: 20, padding: 7 }
                }
              }
            />
          </Scrollbars>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}
export default ChatBox;
