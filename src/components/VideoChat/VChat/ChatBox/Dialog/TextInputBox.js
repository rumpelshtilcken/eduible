import stylesheet from './index.css';

const imgUrl = '/static/sendButtonMobile.svg';

const TextInputBox = ({ sendMessageTest }) => (
  <div className="dialogbox-send">
    <div>
      <input className="input-elem" type="text" placeholder="I can't hear you!" />
    </div>
    <button onClick={sendMessageTest}>
      <img className="send-button" src={imgUrl} alt={'send-button'} />
    </button>
    <style jsx>{stylesheet}</style>
  </div>
);

export default TextInputBox;
