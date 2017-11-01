/* eslint-disable */
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ChatFeed, Message } from 'react-chat-ui';

import TextInputBox from './Dialog';
import style from './index.css';

class ChatBox extends React.Component {
  state = {
    messages: [
      (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)", senderName: 'Motherfucker'})), // Gray bubble
      (new Message({ id: 0, message: "I'm you -- the blue bubble!" })), // Blue bubble
    ]
  }

  componentDidMount() {
    this.props.subscribeOnMessageReceive(this.handleMessageReceive);
  }

  handleMessageReceive = (chatMessage) => {
    const nMessage = { id: this.props.companionId, message: chatMessage };
    this.updateMessagesState(nMessage);
  };

  handleSubmitButtonClick = (message) => {
    const nMessage = new Message({ id: 0, message });
    console.log('qwerty: Chat', message);
    // this.props.sendMessage(message);
    const messageHistory = this.state.messages.slice();
    messageHistory.push({ id: 0, message: nMessage });
    this.setState({
      messages: messageHistory
    });
  }

  updateMessagesState = (message) => {
    const messageHistory = this.state.messages.slice();
    messageHistory.push(message);
    this.setState({
      messages: messageHistory
    });
  };

  render() {
    return (
      <div className="chatContainer" >
        <div className="chatInputContainer">
          <TextInputBox onSubmitButtonClick={this.handleSubmitButtonClick} />
        </div>
        <div className="chatHistory">
          <Scrollbars universal>
            <ChatFeed
              messages={this.state.messages}
              isTyping={this.state.is_typing}
              hasInputField={false}
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
