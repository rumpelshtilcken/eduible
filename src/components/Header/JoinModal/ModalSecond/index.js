import Modal from 'react-modal';
import styles from './index.css';

const ModalSecond = ({ isOpen }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={this.handleRequestClose}
    className="JoinModal"
    overlayClassName="OverlayModal"
  >
    <div className="secondSign">
      <p className="signUpText">JOIN AS PROFESSIONAL</p>
      <div className="firstTxt">
        <p className="share">Share your knowledge and experience. Start now - it’s free</p>
      </div>
      <div className="secondColumn">
        <p className="provide">
          Providing your job title and company name will help users find you on Eduible
        </p>
        <button className="continueButton" onClick="openThird()">
          CONTINUE
        </button>
        <a href="" className="ssylka">
          skip this step
        </a>
      </div>
      <style jsx>{styles}</style>
    </div>
  </Modal>
);

export default ModalSecond;
