import PropTypes from 'prop-types';

import { Spinner } from 'components';

const StatefulView = ({ loading, children }) => (loading
  ? <Spinner />
  :
  <div>
    {children}
  </div>
);

StatefulView.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default StatefulView;
