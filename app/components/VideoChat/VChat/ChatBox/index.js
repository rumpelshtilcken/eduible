import stylesheet from './Dialog/index.css';
import { DialogBox, TextInputBox } from './Dialog';

/* eslint-disable */
const ChatBox = ({ sendMessageTest }) => (
  <div className="section3">
    <TextInputBox sendMessageTest={sendMessageTest} />
    <DialogBox />
    <style jsx>{stylesheet}</style>
  </div>
);

export default ChatBox;
