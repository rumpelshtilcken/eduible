import PropTypes from 'prop-types';

import Spinner from './Spinner';

const StatefulView = ({ loading, error, children, isRenderErrorView }) => {
  if (loading) return <Spinner />;

  if (error && isRenderErrorView) return <div>{error}</div>;

  return <div>{children}</div>;
};

StatefulView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  isRenderErrorView: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default StatefulView;
