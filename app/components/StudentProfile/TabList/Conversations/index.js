import React from 'react';

import History from './History';
import Conferece from './Conference';
import style from './index.css';

const user = [
  {
    name: 'MIGUELL CARRERA',
    imgUrl: '/static/profile.jpg',
    conversation: {
      duration: '15 minutes',
      date: '28 August, 2017',
      time: '3:23PM',
      conference: true
    }
  },
  {
    name: 'ANNA STARK',
    imgUrl: '/static/profile.jpg',
    conversation: {
      duration: '7 minutes',
      date: '22 August, 2017',
      time: '7:45PM',
      conference: true
    }
  },
  {
    name: 'John Doe',
    imgUrl: '/static/profile.jpg',
    conversation: {
      duration: '43 minutes',
      date: '04 August, 2017',
      time: '8:39PM',
      conference: false
    }
  }
];


class Conversations extends React.Component {
 state = {
   conferenceUsers: [],
   historyUsers: []
 }

  sortUsers = () => user.map(x => (x.conversation.conference ? this.state.conferenceUsers.push(x) : this.state.historyUsers.push(x)));

  renderConferenceUsers = () =>
    this.state.conferenceUsers.map(x => (
      <div className="conversation-divbox">
        <Conferece user={x} />
      </div>
    ));

  renderHistoryUsers = () =>
    this.state.historyUsers.map(x => (
      <div className="conversation-divbox">
        <History user={x} />
      </div>
    ));

  render() {
    this.sortUsers();

    return (
      <div>
        <div className="Conference">
          <h3>Forthcoming Conferences</h3>
          {this.renderConferenceUsers()}
        </div>
        <div className="History">
          <h3>History</h3>
          {this.renderHistoryUsers()}
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Conversations;
