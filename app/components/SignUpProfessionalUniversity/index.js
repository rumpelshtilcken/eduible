import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

import { MuiButton } from 'components';

import SignUpFormInputs from './SignUpFormInputs';
import stylesheet from './index.css';

const SignUpProfessionalUniversity = ({ isOpen, onRequestClose, onAddButtonClick, onSkip }) => (
  <MuiThemeProvider>
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="SignUpProfessionalUniversity"
      overlayClassName="OverlayModal"
    >
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
    </Modal>
  </MuiThemeProvider>
);

SignUpProfessionalUniversity.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onSkip: PropTypes.func
};

export default SignUpProfessionalUniversity;
