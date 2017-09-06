import Modal from 'react-modal';
import PropTypes from 'prop-types';

import style from './index.css';

const CodeVerificationModal = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="CodeVerificationModal"
    overlayClassName="OverlayModal"
  >
    <div className="container">
      <div className="head-text">
        <div className="sign"><p>JOIN AS PROFESSIONAL</p></div>
        <p className="share pshare">A verification code has been send to your email address.</p>
        <p className="share">Please enter the code below to verify your email and finish the registration process</p>
      </div>
      <div className="box">
        <div><input className="inpt" placeholder="A365GBK23" /></div>
        <div><p className="pcode">Didn't receive the code? send again</p></div>
      </div>
      <div>
        <button className="btn">CREATE ACCOUNT</button>
        <p className="term">By creating an account, you agree to <a href="#" className="edterms">Eduible's Terms and Conditions and Privacy Policy</a></p>
      </div>
      <style global>{style}</style>
    </div>
  </Modal>
);

CodeVerificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default CodeVerificationModal;
