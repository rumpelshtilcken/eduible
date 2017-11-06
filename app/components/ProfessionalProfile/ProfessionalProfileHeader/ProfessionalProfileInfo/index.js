import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class ProfessionalProfileInfo extends Component {
  static propTypes = {
    professional: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        auth0UserId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }),
      id: PropTypes.string,
      about: PropTypes.string,
      price: PropTypes.number,
      location: PropTypes.shape({
        country: PropTypes.string
      }),
      job: PropTypes.shape({
        company: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
        jobTitle: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired
      }),
      educations: PropTypes.arrayOf(PropTypes.shape({
        major: PropTypes.shape({
          name: PropTypes.string.isRequired,
          school: PropTypes.shape({
            university: PropTypes.shape({ name: PropTypes.string.isRequired })
          })
        })
      }))
    })
  }

  prepareInfo = () => {
    const { professional } = this.props;
    const { user } = this.props.professional;

    const info = [];

    info.push({
      headerText: user.name,
      bodyText: professional.location && professional.location.country
    });

    if (professional.job) {
      info.push({
        headerText: professional.job.jobTitle && professional.job.jobTitle.title,
        bodyText: professional.job.company && professional.job.company.name
      });
    }

    if (professional.educations && professional.educations[0]) {
      info.push({
        headerText: professional.educations[0].major.name,
        bodyText: professional.educations[0].major.school.university.name
      });
    }

    return info;
  };

  renderProfileInfo = ({ headerText, bodyText }) => (
    <div className="list" key={headerText}>
      {headerText && <p className="profileTitle">{headerText}</p>}
      {bodyText && <div className="profileContent">
        <img className="profileIcon" src={'http://res.cloudinary.com/dsyyowxl0/image/upload/v1509976048/ic_location_ntugv6.svg'} alt="location" />
        <span className="profileText">{bodyText}</span>
        <hr />
      </div>}
      <style jsx>{stylesheet}</style>
    </div>
  )

  render() {
    const userInfo = this.prepareInfo();
    return (
      <div className="professionaProfileInfoContainer">
        {userInfo.map(this.renderProfileInfo)}
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default ProfessionalProfileInfo;
