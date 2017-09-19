import { Component } from 'react';
import { Layout } from 'components';
import SearchUniversityContainer from 'containers/SearchUniversityContainer';

class SearchUniversityPage extends Component {
  handleUniversityChoose = () => {};

  render() {
    return (
      <Layout>
        <SearchUniversityContainer onUniversityChoose={this.handleUniversityChoose} />
      </Layout>
    );
  }
}

export default SearchUniversityPage;
