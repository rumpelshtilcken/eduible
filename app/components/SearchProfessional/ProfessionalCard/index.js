import PropTypes from 'prop-types';

import { Card, RoundedButton, Image } from 'components';

import ProfessionalRating from '../ProfessionalRating';

import stylesheet from './index.css';

const professionalImage = 'https://dontlosehair.com/wp-content/uploads/2016/02/3_Problems_that_Bald_People_Face_on_a_Regular_Basis.jpg';

const ProfessionalCard = ({ professional, onRequestButtonClick, onProfessionalChoose }) => (
  <div className="professionalCardContainer">
    <Card>
      <div
        role="button"
        tabIndex={professional.id}
        onClick={onProfessionalChoose}
        className="prof"
      >
        <div className="infoHeader">
          {professional.user.cloudinaryId
            ? (<div className="picture">
              <Image publicId={professional.user.cloudinaryId} />
            </div>)
            : (<img
              className="picture"
              src={professional.user.socialImageUrl || professionalImage}
              alt="professional avatar"
            />)
          }
          <div className="block">
            <div className="step2">
              <div className="name">{professional.user.name} </div>
              <div className="cityIcon">
                <img
                  className="placaholderIcon"
                  src="http://res.cloudinary.com/dsyyowxl0/image/upload/v1509976048/ic_location_ntugv6.svg"
                  alt="location"
                />
                {professional.location && professional.location.country}
              </div>
            </div>
            {professional.job && professional.job.jobTitle && professional.job.company &&
              <div
                key={professional.job.jobTitle.title + professional.job.company.name}
                className="major"
              >
                {professional.job.jobTitle && professional.job.jobTitle.title}
                {' at '}
                {professional.job.company && professional.job.company.name}
              </div>
            }
            <div className="about hidden">
              {professional.about && (professional.about.length > 100
                ? `${professional.about.substring(0, 100)}...`
                : professional.about)}
            </div>
          </div>
        </div>
        <div className="about unhidden">
          {professional.about && (professional.about.length > 100 ? `${professional.about.substring(0, 100)}...` : professional.about)}
        </div>
        <div className="infoFooter">
          <div className="cost">
            {professional.price && (<div>{`${professional.price}$ per minute`}</div>)}
            <div className="rating">
              <ProfessionalRating rating={professional.rating || 0} />

              <div className="reviews">&nbsp;({professional.reviews || 0} reviews)</div>
            </div>
          </div>
          <RoundedButton onClick={onRequestButtonClick} title={'Request a Call'} />
        </div>
      </div>
    </Card>
    <style jsx>{stylesheet}</style>
  </div>
);

ProfessionalCard.propTypes = {
  onRequestButtonClick: PropTypes.func,
  onProfessionalChoose: PropTypes.func,
  professional: PropTypes.shape({
    price: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    job: PropTypes.shape({
      jobTitle: PropTypes.shape({ title: PropTypes.string.isRequired }),
      company: PropTypes.shape({ name: PropTypes.string.isRequired })
    }),
    majors: PropTypes.shape({
      name: PropTypes.string,
      school: PropTypes.shape({
        university: PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      })
    }),
    location: PropTypes.shape({
      country: PropTypes.string.isRequired
    })
  })
};

export default ProfessionalCard;
