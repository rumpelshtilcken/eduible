import PropTypes from 'prop-types';

import CallRequestHeader from './CallRequestHeader';
import CallRequestForm from './CallRequestForm';

const CallRequest = ({ professional, onBackButtonClick, onRequestCallClick }) => (
  <div>
    <CallRequestHeader professional={professional} onBackButtonClick={onBackButtonClick} />
    <CallRequestForm professional={professional} onRequestCallClick={onRequestCallClick} />
  </div>
);

CallRequest.propTypes = {
  professional: PropTypes.object,
  onBackButtonClick: PropTypes.func.isRequired,
  onRequestCallClick: PropTypes.func.isRequired
};

export default CallRequest;
