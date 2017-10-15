import PropTypes from 'prop-types';

import stylesheet from './index.css';

const Layout = ({ children }) => (
  <div className="content">
    {children}
    <style jsx global>{stylesheet}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
