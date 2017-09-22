import { Component } from 'react';
import UserBox from './UserBox';

import stylesheet from './index.css';

class DialogBox extends Component {
  users = [
    { username: 'You: ', usertext: 'Sorry, I cant hear you' },
    {
      username: 'Miguel: ',
      usertext: 'Without a beard i seem to be young, but i am still professional'
    }
  ];

  renderContent = users =>
    users.map(x => <UserBox key={x.username} username={x.username} usertext={x.usertext} />);

  render() {
    return (
      <div className="chatbox">
        {this.renderContent(this.users)}
        {this.renderContent(this.users)}
        {this.renderContent(this.users)}
        {this.renderContent(this.users)}
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default DialogBox;
