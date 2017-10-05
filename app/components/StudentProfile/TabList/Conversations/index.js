import Conversation from './Conversation';

const user = {
  name: 'MIGUELL CARRERA',
  imgUrl: '',
  conversations: {
    duration: '15 minutes',
    date: '27.August.2017',
    time: '3:23PM',
    conference: true
  }
};

const Conversations = () => {
  <Conversation user={user} />;
};


export default Conversations;
