import { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import BackButton from './BackButton';
import stylessheet from './index.css';

class BookingHeader extends Component {
  renderElement = element =>
    (<div
      key={element.key}
      className={cx('elementContainer', {
        hideElement: element.hideOnSmallScreen
      })}
    >
      {element.component}
      <style jsx>
        {stylessheet}
      </style>
    </div>);

  render() {
    return (
      <div className="container">
        <BackButton onBackButtonClick={this.props.onBackButtonClick} />
        <div className="elementsContainer">
          {this.props.elements.map(this.renderElement)}
        </div>
        <style jsx>
          {stylessheet}
        </style>
      </div>
    );
  }
}

BookingHeader.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      component: PropTypes.element.isRequired,
      hideOnSmallScreen: PropTypes.bool
    })
  ).isRequired
};

export default BookingHeader;
