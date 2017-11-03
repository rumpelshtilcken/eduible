import { ChatFeed, Message } from 'react-chat-ui';
import { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import TextInputBox from './Dialog';
import style from './index.css';

class ChatBox extends Component {
  static propTypes = {
    messagesHistory: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      senderName: PropTypes.string
    })),
    subscribeOnMessageReceive: PropTypes.func.isRequired,
    companion: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      }).isRequired
    }),
    userId: PropTypes.string,
    sendMessage: PropTypes.func.isRequired
  };

  state = {
    messagesHistory: this.props.messagesHistory || [
      new Message({ id: 0, message: 'Something', senderName: 'You' }),
      new Message({ id: 1, message: 'Answer', senderName: 'Nick' })
    ]
  };

  componentDidMount() {
    this.props.subscribeOnMessageReceive(this.handleMessageReceive);
  }

  handleMessageReceive = (message) => {
    console.log('qwerty: MessageReceived', message);
    this.updateMessagesState({
      id: this.props.companion.user.id,
      message,
      senderName: this.props.companion.user.name
    });
  };

  handleSubmitButtonClick = (message) => {
    console.log('qwerty: MessageSend', message);
    this.props.sendMessage(message);
    this.updateMessagesState({
      id: this.props.userId,
      message,
      senderName: 'You'
    });
    this.setState({ message: '' });
  }

  updateMessagesState = ({ id, message, senderName }) => {
    const nMessage = new Message({ id, message, senderName });
    const messageHistory = this.state.messagesHistory.slice();
    messageHistory.push(nMessage);
    this.setState({ messages: messageHistory });
  };

  render() {
    return (
      <div className="chatContainer" >
        <div className="chatInputContainer">
          <TextInputBox
            onSubmitButtonClick={this.handleSubmitButtonClick}
          />
        </div>
        <div className="chatHistory">
          <Scrollbars universal>
            <ChatFeed
              messages={this.state.messages}
              isTyping={this.state.is_typing}
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
