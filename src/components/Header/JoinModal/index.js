import PropTypes from 'prop-types';

import JoinFirst from './JoinFirst';

const JoinModal = ({ isOpen, onRequestClose }) => (
  <JoinFirst
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  />
);

JoinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default JoinModal;
