import PropTypes from 'prop-types';

const Loader = (props) => {
  let loader;
  if (process.browser) {
    const PulseLoader = require('halogen/PulseLoader');
    loader = <PulseLoader {...props} />;
  } else {
    loader = <div />;
  }
  return loader;
};

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  margin: PropTypes.string
};

Loader.defaultProps = {
  color: '#7262BF',
  size: '16px',
  margin: '4px'
};

export default Loader;
