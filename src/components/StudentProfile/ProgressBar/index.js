import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import stylesheet from './index.css';

const ProgressBar = ({ percentage }) =>
  (<div>
    <CircularProgressbar
      percentage={percentage}
      strokeWidth={5}
    />
    <style jsx global>{stylesheet}</style>
  </div>);

ProgressBar.propTypes = {
  percentage: PropTypes.number
};

export default ProgressBar;
