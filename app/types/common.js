/* eslint-disable */
import PropTypes from 'prop-types';

const UniversityType = PropTypes.shape({
  logoUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  rank: PropTypes.string,
  facts: PropTypes.arrayOf(PropTypes.string)
}).isRequired;

export { UniversityType };
