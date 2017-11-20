import { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'components';

import MobileBurgerMenu from './MobileBurgerMenu';
import stylesheet from './index.css';

class ResponsiveMenu extends Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
      profile: PropTypes.bool,
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })),
    links: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      prefetch: PropTypes.bool
    }))
  };

  state = {
    isMenuHidden: true
  };

  handleBurgerMenuClick = () => this.setState({ isMenuHidden: !this.state.isMenuHidden });

  renderLinks = ({ url, title, prefetch }) => (
    <div
      key={title}
      className={'linkContainer'}
    >
      <Link key={url} href={url} prefetch={prefetch} style={{ fontSize: '13px', color: '#7262bf' }} purple>
        {title}
      </Link>
      <style jsx>{stylesheet}</style>
    </div>
  );

  renderProfileButton = ({ title, onClick }) => (
    <div key={title}>
      <div
        className={cx('linkContainer', { hidden: true })}
      >
        <button
          className="button"
          onClick={onClick}
        >
          {title}
        </button>
        <style jsx>{stylesheet}</style>
      </div>
      <div
        className={cx('linkContainer', { profile: true })}
      >
        <button
          className="button"
          onClick={onClick}
        >
          {'Profile'}
        </button>
        <style jsx>{stylesheet}</style>
      </div>
    </div>
  );

  renderButtons = ({ title, onClick, profile }) => (profile
    ? this.renderProfileButton({ title, onClick, profile })
    : (
      <div
        key={title}
        className="linkContainer"
      >
        <button
          className="button"
          onClick={onClick}
        >
          {title}
        </button>
        <style jsx>{stylesheet}</style>
      </div>
    ));

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
          {links && links.map(this.renderLinks)}
          {buttons && buttons.map(this.renderButtons)}
        </div>

        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default ResponsiveMenu;
