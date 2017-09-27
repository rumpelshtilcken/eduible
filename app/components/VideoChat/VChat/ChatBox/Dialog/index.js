import React from 'react';
import { Message } from 'react-chat-ui';

import stylesheet from './index.css';

const imgUrl = '/static/sendButtonMobile.svg';

class TextInputBox extends React.Component {
  state = {
    msg: ''
  }

  handleChange =e => this.setState({ msg: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ msg: '' });
    const newMessage = new Message({ id: 0, message: this.inputRef.value });
    this.props.onSubmitButtonClick(newMessage);
  }
  render() {
    return (
      <div className="dialogbox-send">
        <div className="input-div">
          <input
            className="input-elem"
            type="text"
            value={this.state.msg}
            onChange={this.handleChange}
            ref={node => this.inputRef = node}
            placeholder="Type message ..."
          />
        </div>
        <div>
          <img
            className="send-button"
            src={imgUrl}
            alt={'send-button'}
            onClick={this.handleSubmit}
          />
        </div>
        <style jsx>
          {stylesheet}
        </style>
      </div>
    );
  }
}

export default TextInputBox;
