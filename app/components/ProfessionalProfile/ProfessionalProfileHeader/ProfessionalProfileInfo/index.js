import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class ProfessionalProfileInfo extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      professional: PropTypes.shape({
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
  }

  prepareInfo = () => {
    const { user } = this.props;
    const { professional } = this.props.user;

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

    if (professional.majors && professional.majors[0]) {
      info.push({
        headerText: professional.majors[0].school.university.name,
        bodyText: professional.majors[0].name
      });
    }

    return info;
  };

  renderProfileInfo = ({ headerText, bodyText }) => (
    <div className="list">
      <div className="profileItem">
        {headerText && <p className="profileTitle">{headerText}</p>}
        {bodyText && <div className="profileContent">
          <img className="profileIcon" src={'static/ic_location.svg'} alt="location" />
          <span className="profileText">{bodyText}</span>
        </div>}
      </div>
      <style jsx>{stylesheet}</style>
    </div>
  )

  render() {
    const userInfo = this.prepareInfo();
    return (
      <div>
        {userInfo.map(this.renderProfileInfo)}
      </div>
    );
  }
}

export default ProfessionalProfileInfo;
