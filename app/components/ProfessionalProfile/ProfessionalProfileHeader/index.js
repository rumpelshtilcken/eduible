import { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { RoundedButton } from 'components';

import ProfessionalProfileInfo from './ProfessionalProfileInfo';
import stylesheet from './index.css';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';

class ProfessionalProfileHeader extends Component {
  static propTypes = {
    onRequestCallClick: PropTypes.func,
    onEditButtonClick: PropTypes.func,
    isCurrentUser: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      professional: PropTypes.shape({
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

  renderHeaderButton = () => (this.props.isCurrentUser
    ? <RoundedButton title={'Request call'} onClick={this.props.onRequestCallClick} />
    : <RoundedButton title={'Edit Profile'} onClick={this.props.onEditButtonClick} />)

  render() {
    const { user } = this.props;

    return (
      <div className="professionalProfileHeader">
        <div className="professionalProfileheaderBackgroundImage">
          <div className="buttonContainer">
            {this.renderHeaderButton()}
          </div>
        </div>

        <div className="professionalProfileHeaderInfo">
          <img
            className="professionalProfileImage"
            src={professionalImage}
            alt="profile"
          />

          <div className="professionalProfileBasicInfoContainer">
            <ProfessionalProfileInfo user={user} />
            <div className="mobileButtonWrapper">
              <div className="mobileButtonContainer">
                {this.renderHeaderButton()}
              </div>
            </div>
          </div>

          {user.professional.price && <div className={cx('additionalInfoContainer', {
            priceContainer: true
          })}
          >
            <div className="roundedContainer">
              <p className="additionalInfoContent">
                {user.professional.price}
              </p>
            </div>
            <p className="additionalInfo">price</p>
          </div>}

          {user.professional.rating &&
          <div className={cx('additionalInfoContainer', {
            ratingContainer: true
          })}
          >
            <div className="roundedContainer">
              <p className="additionalInfoContent">
                {user.professional.rating}
              </p>
            </div>
            <p className="additionalInfo">rating</p>
          </div>}
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}


export default ProfessionalProfileHeader;
