import { Component } from 'react';

import SearchUniversityContainer from 'containers/SearchUniversityContainer';

class SearchUniversityPage extends Component {
  handleUniversityChoose = () => {};

  render() {
    return <SearchUniversityContainer onUniversityChoose={this.handleUniversityChoose} />;
  }
}

export default SearchUniversityPage;
