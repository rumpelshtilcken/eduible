import PropType from 'prop-types';

import stylesheet from './index.css';

const imgUrl = '/static/sendButtonMobile.svg';

const TextInputBox = () =>
  (<div className="dialogbox-send">
    <div>
      <input className="input-elem" type="text" placeholder="I can't hear you!" />
    </div>
    <div>
      <img className="send-button" src={imgUrl} alt={'send-button'} />
    </div>
    <style jsx>
      {stylesheet}
    </style>
  </div>);

TextInputBox.propType = {
  imgUrl: PropType.string.isRequired
};

export default TextInputBox;
