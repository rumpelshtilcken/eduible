import stylesheet from './index.css';

const imgUrl = '/static/sendButtonMobile.svg';


const TextInputBox = () => (
  <div className="dialogbox-send">
    <div>
      <input className="input-elem" type="text" placeholder="I can't hear you!" />
    </div>
    <div>
      <img
        className="send-button"
        src={imgUrl}
        alt={'send-button'}
      />
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

export default TextInputBox;
