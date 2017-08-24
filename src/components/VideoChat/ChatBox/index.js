import React, { Component } from 'react';
import stylesheet from '../index.css';
import TextInputBox from './TextInputBox';
import DialogBox from './DialogBox';

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
