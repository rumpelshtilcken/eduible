import React from 'react';
import PropTypes from 'prop-types';

import UserBox from './UserBox';
import stylesheet from './index.css';

const users = [
  { username: 'You: ', usertext: 'Sorry, I cant hear you' },
  { username: 'Miguel: ', usertext: 'Without a beard i seem to be young, but i am still professional' }
];

const renderContent = users.map(x => (
  <UserBox user={x} />)
);

const DialogBox = () => (
  <div className="chatbox">
    {renderContent}
    {renderContent}
    {renderContent}
    {renderContent}
    <style jsx>{stylesheet}</style>
  </div>
);

DialogBox.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string)
};

export default DialogBox;
