import PropTypes from 'prop-types';

import { Card, RoundedButton } from 'components';

import ProfessionalRating from '../ProfessionalRating';

import stylesheet from './index.css';

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
          <img
            className="picture"
            alt="avatar"
            src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0lIiAdHx8kKDosJCY7JysfLT0tLzU9Ojo6Iys1Oz84TTRCRUEBCgoKDQwNDgUNEy0ZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIADwAPAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAHCAAGAQQFAwL/xAA3EAABAwIEAwUFBgcAAAAAAAABAgMEBREABhIhEzFBB1FSYZEUFSKB0SMyQnGxwQhTYoKh8PH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwA4YnXExCcBOuM4H9bz3U36lIpOSqKqrSo6tD8latLDK/De4ufmMVer5m7XqYC9IoUUtAXIjs8YAf2rJwBnxBgAU3t3rEeRorVIiOoBsoMFTS0+pP7YLuUM50fN0QvUp8lxA+1juCzjf5ju8xtgLEMTGcTAYxyM0yJLNGfRADhlvDhshoXXc8ykHa4FyL7bb2x18VavM1KqJlP0F5CZMZCo7XGUpKFqO6/iTuLEJFx4VDa98B55DqMAxXKJHpr9KlQAOJDkW1kHk5cbKueZ78WzFWoDpjo49TbSZqC3G1pUXChS9OpAWSSRq+K1zYW32sOfmaoxJlVTTxXqtBdOopENbSQCj7xsRrUB16bHuOA3835BoOa2lmdES1LI+GWyNLgPmfxfkcLzVIda7Mc4pSy/Z9mzjLqb6Xmz3juNiCPLDN0FFUYZcj1WQ3M0WLMxCAgupPiSNgod42NxywuXbbXE1nPMltsEN09PsouOZSSVH1JHywDC5KzNFzXQGKpFskr+F1q9y0sc0n/eRGO9hcf4f68uBmxdJWo+z1Bo2TfYOIBUD6ah6YY/AYPI4rtBckOUmCwjd1LTbkpZFgorGpQB77m//bgF1XtszVNWfYzEgtm4Aba1n5lV/wBBgrzKzVIWQKBWqYzIfSiOwuWzHSkrU2psXIuk8jY9Nr7jAWKoRkhpgU5hfEpjvHQzoKUukoUnSFEWJOo7772vjak0Kmyp6Kg9ER7ahBQmQglDlj01Ag2xWsp57NelNR002cUuJJLyoi20tn+q9028wrn0xcISnlxW1SkhDxF1JHTAfLq41Mp63F6WYsZok9AhCR+wwoVaj1SpvTswOwJQiSZC3FSC0rh3Wom2rlhvZ4irjqZmoQ408CgtKTqDmxJFuuwO2At20ZgSaS5TeGptLjmmO04jQoNjhnVp52uk8+eodxsFD7IIz0ntEo/AB+zcU4sjokJN7/p88NgMLl2K5kytlf2yTWpa2Z8izaDwVKShsb8wDuT+gwbYudMrymUvM16nFB5apKUn0JBGATzDddnzq3Ml5d4PCWx7A0lxWvdJCQNtt9wQeWFf91MeJz1H0wR+ymTLgRKy3GnSUojRTIZQXLpQsc/h5G/W4xKlMBbGhMqbbLpjx0mRL/koP3fNR/CPM/K/LGhTZMltnU9IXIWsaip0AW8gEgD/ABjxrlTkstMNsKS0X5CGlLSPiSDzIvtfClVntczicv5dEZnSuqvnhodb2EdWndST4gDt1GoH81ulSX5b635TzjzyzdTjiipSj5k4LfbTHbeqVNigFtliMVpSk81KWdRJNySbDfA491MeJz1H0wpXFxMdr3Ux4nPUfTE91MeJz1H0wpX/2Q=='}
          />
          <div className="block">
            <div className="step2">
              <div className="name">{professional.user.name} </div>
              <div className="cityIcon">
                <img
                  className="placaholderIcon"
                  src="../../static/placeholderIcon.svg"
                  alt=""
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
