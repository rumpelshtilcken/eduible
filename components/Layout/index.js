import PropTypes from 'prop-types';
import stylesheet from './index.css';

const Layout = ({ children, session }) => (
  <div>
    <div>Header pass session {JSON.stringify(session)} to header</div>
    <div className="container">
      {children}
    </div>
    <div>Footer</div>
    <style jsx global>{stylesheet}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  session: PropTypes.object.isRequired
};

export default Layout;
