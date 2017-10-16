import { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Card, RoundedButton } from 'components';

import ProfessionalProfileHeader from './ProfessionalProfileHeader';
import stylesheet from './index.css';

class ProfessionalProfile extends Component {
  handleOpenCalendarClick = () => {};

  render() {
    const {
      user,
      isCurrentUser,
      onRequestCallClick,
      onEditButtonClick
    } = this.props;

    return (
      <div className="professionalProfileContainer">
        <ProfessionalProfileHeader
          user={user}
          isCurrentUser={isCurrentUser}
          onRequestCallClick={onRequestCallClick}
          onEditButtonClick={onEditButtonClick}
        />
        <div className="professionalInfoBody">
          <div className={cx('professionalInfoBodyItemContainer', {
            professionalProfileLeftItem: true
          })}
          >
            <Card>
              <div className="professionalInfoBodyItemContentContainer">
                <p className="professionalInfoBodyItemTitle">{'About'}</p>
                <p className="professionalProfileAbout">{user.professional.about}</p>
              </div>
            </Card>
          </div>
          <div className="professionalInfoBodyItemContainer">
            <Card>
              <div className="professionalInfoBodyItemContentContainer">
                <div className="professionalCalendarHeaderContainer">
                  <p className="professionalInfoBodyItemTitle">{'Availability calendar'}</p>
                  <p className="professionalProfileCalendar">{'(October 2017)'}</p>
                </div>
                <div className="openCalendarButtonContainer">
                  <div className="buttonContainer">
                    <RoundedButton onClick={this.handleOpenCalendarClick} title={'Open calendar'} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

ProfessionalProfile.propTypes = {
  onRequestCallClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  isCurrentUser: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
      educations: PropTypes.arrayOf(PropTypes.shape({
        major: PropTypes.shape({
          name: PropTypes.string.isRequired,
          school: PropTypes.shape({
            university: PropTypes.shape({ name: PropTypes.string.isRequired })
          })
        })
      }))
    })
  })
};

export default ProfessionalProfile;
