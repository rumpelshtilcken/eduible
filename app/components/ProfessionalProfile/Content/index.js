import PropTypes from 'prop-types';

import About from './About';
import Calendar from './Calendar';
import stylesheet from './index.css';

const Content = ({ user }) => (
  <div className="bottom">
    <About content={user.professional.about} />
    <Calendar avialable={user.professional.avialable} />
    <style jsx>{stylesheet}</style>
  </div>
);

Content.propTypes = {
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

export default Content;
