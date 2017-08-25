import React, { Component } from 'react';
import stylesheet from './Dialog/index.css';
import { DialogBox, TextInputBox } from './Dialog';

class ChatBox extends Component {
  render() {
    return (
      <div className="section3" >
        <TextInputBox />
        <DialogBox />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default ChatBox;
