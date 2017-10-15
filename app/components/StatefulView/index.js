import PropTypes from 'prop-types';

import Spinner from './Spinner';

const StatefulView = ({ loading, children }) => (
  <div>
    {loading && <Spinner />}
    {children}
  </div>
);

StatefulView.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default StatefulView;
