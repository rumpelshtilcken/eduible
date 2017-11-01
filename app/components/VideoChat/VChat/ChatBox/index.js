/* eslint-disable */
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ChatFeed, Message } from 'react-chat-ui';

import TextInputBox from './Dialog';
import style from './Dialog/index.css';

class ChatBox extends React.Component {
  state = {
    messages: [
      (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble
      (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble
      (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble
      (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble
      (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble
      (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble
      (new Message({ id: 0, message: "I'm you -- the blue bubble!" })),
      // Blue bubble,

      (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })) // Gray bubble

    ]
  }

  componentDidMount() {
    this.props.subscribeOnMessageReceive(this.handleMessageReceive);
  }

  handleMessageReceive = (participant, chatMessage) => {
    console.log('====================================');
    console.log('qwerty: ', chatMessage);
    console.log('====================================');
    const messageHistory = this.state.messages.slice();
    messageHistory.push({ id: 1, message: chatMessage });
    // this.setState({
    //   messages: messageHistory
    // });
  };

  handleSubmitButtonClick = (message) => {
    const nMessage = new Message({ id: 0, message });
    console.log('qwerty: Chat', message);
    this.props.sendMessage(message);
    const messageHistory = this.state.messages.slice();
    messageHistory.push({ id: 0, message: nMessage });
    // this.setState({
    //   messages: messageHistory
    // });
  }
  render() {
    return (
      <div className="section3" >
        <TextInputBox onSubmitButtonClick={this.handleSubmitButtonClick} />
        <Scrollbars universal autohide>
          <div className="chatbox">
            <ChatFeed
              messages={this.state.messages} // Boolean: list of message objects
              isTyping={this.state.is_typing} // Boolean: is the recipient typing
              hasInputField={false} // Boolean: use our input, or use your own
              bubblesCentered={false} // Boolean should the bubbles be centered in the feed?
              // JSON: Custom bubble styles
              bubbleStyles={
                {
                  text: {
                    fontSize: 10
                  },
                  chatbubble: {
                    borderRadius: 20,
                    padding: 7
                  }
                }
              }
            />
          </div>
        </Scrollbars>
        <style jsx>{style}</style>
      </div>
    );
  }
}
export default ChatBox;
