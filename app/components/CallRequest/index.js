import PropTypes from 'prop-types';

import CallRequestHeader from './CallRequestHeader';
import CallRequestForm from './CallRequestForm';

const CallRequest = ({ onBackButtonClick, onRequestCallClick }) => (
  <div>
    <CallRequestHeader onBackButtonClick={onBackButtonClick} />
    <CallRequestForm onRequestCallClick={onRequestCallClick} />
  </div>
);

CallRequest.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired,
  onRequestCallClick: PropTypes.func.isRequired
};

export default CallRequest;
