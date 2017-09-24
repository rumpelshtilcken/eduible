import { Component } from 'react';
import Head from 'next/head';

import withPage from 'hoc/withPage';
import SearchUniversityContainer from 'containers/SearchUniversityContainer';

class SearchUniversityPage extends Component {
  handleUniversityChoose = () => {};

  render() {
    return (
      <div>
        <Head>
          <title>{'Profile'}</title>
        </Head>
        <SearchUniversityContainer onUniversityChoose={this.handleUniversityChoose} />
      </div>
    );
  }
}

export default withPage(SearchUniversityPage);
