import UserBox from './UserBox';
import PropTypes from 'prop-types';

import stylesheet from '../index.css';


const users = [
  { username: 'You: ', usertext: 'Sorry, I cant hear you' },
  { username: 'Miguel: ', usertext: 'Without a beard i seem to be young, but i am still professional' }
];

const DialogBox = () => (
  <div className="chatbox">
    <UserBox username={users[0].username} usertext={users[0].usertext} />
    <UserBox username={users[1].username} usertext={users[1].usertext} />
    <UserBox username={users[0].username} usertext={users[0].usertext} />
    <UserBox username={users[1].username} usertext={users[1].usertext} />
    <UserBox username={users[0].username} usertext={users[0].usertext} />
    <UserBox username={users[1].username} usertext={users[1].usertext} />
    <UserBox username={users[0].username} usertext={users[0].usertext} />
    <UserBox username={users[1].username} usertext={users[1].usertext} />
    <style jsx>{stylesheet}</style>
  </div>
);

DialogBox.propTypes = {
  users: PropTypes.shape({
    username: PropTypes.string.isRequired,
    usertext: PropTypes.string.isRequired
  }).isRequired
};

export default DialogBox;
