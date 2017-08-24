import { Component } from 'react';
import PropTypes from 'prop-types';

import { SearchUniversity } from 'components';

class SearchUniversityContainer extends Component {
  FoundedUniver = [
    {
      logoUrl: '/static/',
      title: 'Univer Title',
      description:
        'long description long description long description long description long description long description long description long description long description long description long description long description long description long description',
      rank: 'RANKING',
      facts: ['FACT 1', 'FACT 2', 'FACT 3', 'FACT 4']
    },

    {
      logoUrl: '/static/',
      title: 'Univer Title 2',
      description:
        'long description long description long description long description long description long description long description long description long description long description long description long description long description long description',
      rank: 'RANKING',
      facts: ['FACT 1', 'FACT 2', 'FACT 3', 'FACT 4']
    }
  ];

  handleSubmitButtonClick = () => {};

  render() {
    return (
      <SearchUniversity
        onUniversityChoose={this.props.onUniversityChoose}
        onSubmitButtonClick={this.handleSubmitButtonClick}
        universities={this.FoundedUniver}
      />
    );
  }
}

SearchUniversityContainer.propTypes = {
  onUniversityChoose: PropTypes.func.isRequired
};

export default SearchUniversityContainer;
