import PropTypes from 'prop-types';

import { Link } from 'components';

import stylesheet from './index.css';

const Footer = ({ urlsMenu, copyright }) => (
  <div className="footerContainer">
    <div className="menuLinks">
      {urlsMenu &&
        urlsMenu.map(urlMenu => (
          <Link
            key={urlMenu.url}
            href={urlMenu.url}
            style={{
              marginRight: '69px',
              border: 0,
              backgroundColor: 'transparent'
            }}
          >
            {urlMenu.title}
          </Link>
        ))}
    </div>

    <div className="copyright">{copyright}</div>
    <style jsx>{stylesheet}</style>
  </div>
);

Footer.propTypes = {
  urlsMenu: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  copyright: PropTypes.string.isRequired
};

export default Footer;
