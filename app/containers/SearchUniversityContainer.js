import { Component } from 'react';
import PropTypes from 'prop-types';

import { SearchUniversity } from 'components';

class SearchUniversityContainer extends Component {
  foundUniversities = [
    {
      logoUrl: '/static/',
      title: '1',
      city: 'Miami, FL',
      description:
        'long description long description long description long description long description long description long description long description long description long description long description long description long description long description',
      priceYear: '19',
      received: '7'
    },
    {
      logoUrl: '/static/',
      title: '2',
      city: 'Miami, FL',
      description:
        'long description long description long description long description long description long description long description long description long description long description long description long description long description long description',
      priceYear: '15',
      received: '7'
    },
    {
      logoUrl: '/static/',
      title: '3',
      city: 'Miami, FL',
      description:
        'long description long description long description long description long description long description long description long description long description long description long description long description long description long description',
      priceYear: '11',
      received: '7'
    },
    {
      logoUrl: '/static/',
      title: '4',
      city: 'Miami, FL',
      description:
        'long description long description long description long description long description long description long description long description long description long description long description long description long description long description',
      priceYear: '18',
      received: '7'
    }
  ];

  universities = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' }
  ];

  handleSubmitButtonClick = () => {};

  render() {
    return (
      <SearchUniversity
        onUniversityChoose={this.props.onUniversityChoose}
        onSubmitButtonClick={this.handleSubmitButtonClick}
        foundUniversities={this.foundUniversities}
        universities={this.universities}
      />
    );
  }
}

SearchUniversityContainer.propTypes = {
  onUniversityChoose: PropTypes.func.isRequired
};

export default SearchUniversityContainer;
