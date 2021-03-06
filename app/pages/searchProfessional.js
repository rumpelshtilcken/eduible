import { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import withPage from 'hoc/withPage';
import ProfessionalSearchContainer from '../containers/ProfessionalSearchContainer';

class ProfessionalSearchPage extends Component {
  handleRequestButtonClick = ({ professionalId }) => {
    Router.push({
      pathname: '/callRequest',
      query: {
        professionalId
      }
    });
  };

  handleProfessionalChoose = ({ userId }) => {
    Router.push({
      pathname: '/profile',
      query: {
        userId
      }
    });
  };

  render() {
    return (
      <div>
        <Head>
          <title>{'Professional search'}</title>
        </Head>
        <ProfessionalSearchContainer
          onRequestButtonClick={this.handleRequestButtonClick}
          onProfessionalChoose={this.handleProfessionalChoose}
        />
      </div>
    );
  }
}

export default withPage(ProfessionalSearchPage);
