import PropTypes from 'prop-types';

import ProfessionalProfileHeader from './ProfessionalProfileHeader';
import Content from './Content';
import stylesheet from './index.css';

const ProfessionalProfileOwner = ({ user }) => (
  <div className="container">
    <ProfessionalProfileHeader user={user} />
    <Content />
    <style jsx>{stylesheet}</style>
  </div>
);

ProfessionalProfileOwner.propTypes = {
  user: PropTypes.shape({
    imgUrl: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

export default ProfessionalProfileOwner;
