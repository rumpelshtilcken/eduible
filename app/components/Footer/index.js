import { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'components';
import FollowUs from './followUs';
import stylesheet from './index.css';

class Footer extends Component {
  static propTypes = {
    urlsMenu: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string,
            onClick: PropTypes.func
          })
        )
      })
    ).isRequired
  };

  renderLinks = ({ title, url, onClick }, index) => (
    <div key={title}>
      {index !== 0 && <div className="gap" />}
      {onClick
        ? <button className="linkButton" onClick={onClick}>{title}</button>
        : <Link prefetch style={{ textDecoration: 'none', color: '#4f5362', fontSize: '14px', fontFamily: 'Effra', marginTop: '5px' }} href={url}>{title}</Link>}
      <style jsx>{stylesheet}</style>
    </div>);

  render() {
    const { urlsMenu } = this.props;

    return (
      <div className="footerContainer">
        <div className="menuLinks">
          {urlsMenu &&
            urlsMenu.map(urlMenu => (
              <div key={urlMenu.title} className="footerLinksBlock">
                <div className="linkBlockTitle"> {urlMenu.title} </div>
                {urlMenu.links.map(this.renderLinks)}
              </div>
            ))}
          <FollowUs className="footerLinksBlock" />
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default Footer;
