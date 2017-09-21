import PropTypes from 'prop-types';

import stylesheet from './index.css';

const Footer = ({ footerLinks }) =>
  (<div className="footerContainer">
    <div className="menu">
      {footerLinks.map(footerLink =>
        (<div key={footerLink.title}><h4 className="menuLinkTitle">{footerLink.title}</h4>
          <a className="menuLink" href={footerLink.link1}>
            {footerLink.label1}
          </a>
          <a className="menuLink" href={footerLink.link2}>
            {footerLink.label2}
          </a>
        </div>)
      )}
    </div>
    <div className="menuLinkTitle">
      FOLLOW US
      <div className="socialNetworks">
        <a href=""><img src="/../../static/Icons/Facebook.svg" alt="FACEBOOK" /></a>
        <a href=""><img src="../../static/Icons/LinkedIn.svg" alt="LINKEDIN" /></a>
        <a href=""><img src="../../static/Icons/Twitter.svg" alt="TWITTER" /></a>
      </div>
    </div>
    <style jsx>
      {stylesheet}
    </style>
  </div>);

Footer.propTypes = {
  footerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link1: PropTypes.string.isRequired,
      label1: PropTypes.string.isRequired,
      link2: PropTypes.string.isRequired,
      label2: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Footer;
