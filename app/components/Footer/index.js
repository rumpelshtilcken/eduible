import PropTypes from 'prop-types';

import { Link } from 'components';

import FollowUs from './followUs';

import stylesheet from './index.css';

const Footer = ({ urlsMenu }) => (
  <div className="footerContainer">
    <div className="menuLinks">
      {urlsMenu &&
        urlsMenu.map(urlMenu => (
          <div className="footerLinksBlock">
            <div className="linkBlockTitle"> {urlMenu.title} </div>
            <Link
              key={urlMenu.firstLinkTitle}
              href={urlMenu.firstLinkURL}
              style={{
                border: 0,
                textDecoration: 'none',
                color: '#4F5362',
                fontSize: '14px',
                backgroundColor: 'transparent'
              }}
            >
              {urlMenu.firstLinkTitle}
            </Link>
            <div className="gap" />
            <Link
              key={urlMenu.secondLinkTitle}
              href={urlMenu.secondLinkURL}
              style={{
                border: 0,
                textDecoration: 'none',
                color: '#4F5362',
                marginTop: '50px',
                fontSize: '14px',
                backgroundColor: 'transparent'
              }}
            >
              {urlMenu.secondLinkTitle}
            </Link>
          </div>
        ))}
      <FollowUs className="footerLinksBlock" />
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

Footer.propTypes = {
  urlsMenu: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired

};

export default Footer;
