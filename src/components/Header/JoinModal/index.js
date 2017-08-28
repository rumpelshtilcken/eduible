import PropTypes from 'prop-types';

import Form1 from './Form1';


const JoinModal = data => (
  <Form1
    isOpen={data.isOpen}
    onRequestClose={data.onRequestClose}
    className={data.className}
    overlayClassName={data.overlayClassName}
  />
);

JoinModal.propTypes = {
  data: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    overlayClassName: PropTypes.string.isRequired
  })
};

export default JoinModal;
