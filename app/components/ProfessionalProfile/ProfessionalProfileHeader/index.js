import { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { RoundedButton } from 'components';

import ProfessionalProfileInfo from './ProfessionalProfileInfo';
import stylesheet from './index.css';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';
const professionalBackgroundImage =
  'http://res.cloudinary.com/dsyyowxl0/image/upload/v1509975928/profileHeaderBackground_f5ev0i.svg';

class ProfessionalProfileHeader extends Component {
  static propTypes = {
    onRequestCallClick: PropTypes.func,
    onEditButtonClick: PropTypes.func,
    isCurrentUser: PropTypes.bool,
    professional: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        auth0UserId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        socialImageUrl: PropTypes.string,
        cloudinaryId: PropTypes.string,
        cloudinaryBackgroundId: PropTypes.string
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
  };

  renderHeaderButton = () => {
    if (!this.props.professional) { return null; }

    return (this.props.isCurrentUser
      ? <RoundedButton title={'Edit Profile'} onClick={this.props.onEditButtonClick} />
      : <RoundedButton title={'Request call'} onClick={this.props.onRequestCallClick} />);
  }

  render() {
    const { professional } = this.props;
    const imageUrl = professional.user.cloudinaryId
      || professional.user.socialImageUrl
      || professionalImage;
    const backgroundImage = professional.cloudinaryBackgroundId || professionalBackgroundImage;

    return (
      <div className="professionalProfileHeader">
        <div className="professionalProfileheaderBackgroundImage">
          <div className="buttonContainer">
            {this.renderHeaderButton()}
          </div>
          <img
            className="professionalProfileBackgroundImage"
            src={backgroundImage}
            alt="profile background"
          />
        </div>

        <div className="professionalProfileHeaderInfo">
          <img
            className="professionalProfileImage"
            src={imageUrl}
            alt="profile"
          />

          <div className="professionalProfileBasicInfoContainer">
            <ProfessionalProfileInfo professional={professional} />
            <div className="mobileButtonWrapper">
              <div className="mobileButtonContainer">
                {this.renderHeaderButton()}
              </div>
            </div>
          </div>

          {professional.price && <div className={cx('additionalInfoContainer', {
            priceContainer: true
          })}
          >
            <div className="roundedContainer">
              <p className="additionalInfoContent">
                {professional.price}
              </p>
            </div>
            <p className="additionalInfo">price</p>
          </div>}

          <div className={cx('additionalInfoContainer', {
            ratingContainer: true
          })}
          >
            <div className="roundedContainer">
              <p className="additionalInfoContent">
                {professional.rating || 0}
              </p>
            </div>
            <p className="additionalInfo">rating</p>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}


export default ProfessionalProfileHeader;
