import React from 'react';
import UserBox from './UserBox';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

const users = [
  { username: 'You: ', usertext: 'Sorry, I cant hear you' },
  {
    username: 'Miguel: ',
    usertext: 'Without a beard i seem to be young, but i am still professional'
  }
];

const renderContent = users.map(x => (
  <UserBox key={x.username} username={x.username} usertext={x.usertext} />
));

const DialogBox = () => (
  <div className="chatbox">
    {renderContent}
    {renderContent}
    {renderContent}
    {renderContent}
    <style jsx>{stylesheet}</style>
  </div>
);

export default DialogBox;
