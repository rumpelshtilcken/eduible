import PropTypes from 'prop-types';

import ProfessionalProfileHeader from './ProfessionalProfileHeader';
import Content from './Content';
import stylesheet from './index.css';

const ProfessionalProfile = ({
  user,
  isCurrentUser,
  onRequestCallClick,
  onEditButtonClick
}) => (
  <div className="container">
    <ProfessionalProfileHeader
      user={user}
      isCurrentUser={isCurrentUser}
      onRequestCallClick={onRequestCallClick}
      onEditButtonClick={onEditButtonClick}
    />
    <Content user={user} />
    <style jsx>{stylesheet}</style>
  </div>
);

ProfessionalProfile.propTypes = {
  onRequestCallClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  isCurrentUser: PropTypes.bool,
  user: PropTypes.shape({
    auth0UserId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    professional: PropTypes.shape({
      about: PropTypes.string,
      price: PropTypes.number,
      location: PropTypes.shape({
        country: PropTypes.string
      }),
      job: PropTypes.shape({
        company: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
        jobTitle: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired
      }),
      majors: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        school: PropTypes.shape({
          university: PropTypes.shape({
            name: PropTypes.string.isRequired
          })
        })
      }))
    })
  })
};

export default ProfessionalProfile;
