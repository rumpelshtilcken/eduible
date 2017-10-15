import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { MuiButton, StatefulView } from 'components';

import SignUpFormInputs from './SignUpFormInputs';
import stylesheet from './index.css';

const SignUpProfessionalUniversity = ({ onRequestClose, onAddButtonClick, onSkip, ...props }) => (
  <Modal
    isOpen
    onRequestClose={onRequestClose}
    className="SignUpProfessionalUniversity"
    overlayClassName="OverlayModal"
  >
    <StatefulView {...props}>
      <div className="container">
        <div className="headerTitle">{'Let’s add University, Major and Years studied to your profile.'}</div>
        <div className="description">
          {'It will increase attractiveness of your profile by users who are willing to take same academic pathway.'}
        </div>
        <SignUpFormInputs />
        <button className="skip" onClick={onSkip}>{'skip this step'}</button>
      </div>
      <div className="button">
        <MuiButton
          label="Add"
          onClick={onAddButtonClick}
        />
      </div>
      <style global jsx>{stylesheet}</style>
    </StatefulView>
  </Modal>
);

SignUpProfessionalUniversity.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onSkip: PropTypes.func
};

export default SignUpProfessionalUniversity;
