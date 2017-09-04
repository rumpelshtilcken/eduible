import stylesheet from './Dialog/index.css';
import { DialogBox, TextInputBox } from './Dialog';

const ChatBox = () => (
  <div className="section3" >
    <TextInputBox />
    <DialogBox />
    <style jsx>{stylesheet}</style>
  </div>
);

export default ChatBox;
