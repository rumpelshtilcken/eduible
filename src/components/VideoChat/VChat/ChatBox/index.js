import { DialogBox, TextInputBox } from './Dialog';

import stylesheet from './Dialog/index.css';

const ChatBox = () => (
  <div className="section3" >
    <TextInputBox />
    <DialogBox />
    <style jsx>{stylesheet}</style>
  </div>
);

export default ChatBox;
