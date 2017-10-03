import { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'components';

import MobileBurgerMenu from './MobileBurgerMenu';
import stylesheet from './index.css';

class ResponsiveMenu extends Component {
  state = {
    isMenuHidden: true
  };

  handleBurgerMenuClick = () => this.setState({ isMenuHidden: !this.state.isMenuHidden });

  render() {
    const { links, buttons } = this.props;
    return (
      <div>
        <div className="mobileMenuContainer">
          <MobileBurgerMenu
            onClick={this.handleBurgerMenuClick}
            isCloseState={!this.state.isMenuHidden}
          />
        </div>
        <div className={cx('linksContainer', {
          hideLinks: this.state.isMenuHidden
        })}
        >
          {links && links.map(({ url, title, prefetch }) => (
            <div key={title} className={url === '/profile' ? 'linkContainer hidden' : 'linkContainer'} >
              <Link href={url} prefetch={prefetch} purple>
                {title}
              </Link>
            </div>
          ))}
          <div key="profile" className="linkContainer profile">
            <Link href="/profile" purple>
              Profile
            </Link>
          </div>

          {buttons && buttons.map(({ title, onClick }) => (
            <div key={title} className="linkContainer">
              <button
                className="button"
                onClick={onClick}
              >
                {title.toUpperCase()}
              </button>
            </div>
          ))}
        </div>

        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

ResponsiveMenu.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })),
  links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    prefetch: PropTypes.bool
  }))
};

export default ResponsiveMenu;
