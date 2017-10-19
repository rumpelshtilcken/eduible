import { Component } from 'react';
import { connect } from 'react-redux';
import { hoistStatics } from 'recompact';
import Head from 'next/head';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Footer, Layout } from 'components';
import * as modalActions from 'actions/modal';
import getDisplayName from 'utils/getDisplayName';
import ModalRootContainer from 'containers/ModalRootContainer';
import PageHeaderContainer from 'containers/PageHeaderContainer';
import PropTypes from 'prop-types';
import SnackbarContainer from 'containers/SnackbarContainer';

const withLayout = hoistStatics((CompositeComponent) => {
  class WithLayout extends Component {
    static propTypes = {
      showSignUpProfessionalModal: PropTypes.func.isRequired,
      showSignUpStudentModal: PropTypes.func.isRequired
    }

    footerLinks = [
      {
        title: 'ABOUT',
        links: [
          { title: 'How it Works', url: '#' },
          { title: 'Success Stories', url: '#' }
        ]
      },
      {
        title: 'PROFESSIONALS',
        links: [
          { title: 'Join As Professional', onClick: this.props.showSignUpProfessionalModal },
          { title: 'Search For Professional', url: '/searchProfessional' }
        ]
      },
      {
        title: 'UNIVERSITIES',
        links: [
          { title: 'Create Account', onClick: this.props.showSignUpStudentModal },
          { title: 'Search For University', url: '/searchUniversity' }
        ]
      },
      {
        title: 'ANSWERS',
        links: [
          { title: 'FAQ´s', url: 'http://www.google.com' },
          { title: 'Privacy Policy', url: '/privacyPolicy' }
        ]
      }
    ];

    render() {
      return (
        <MuiThemeProvider>
          <div>
            <Layout>
              <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="static/Fonts/Effra" rel="stylesheet" />
                <link rel="icon" href="static/favicon.ico?v=1.1" />
              </Head>
              <ModalRootContainer />
              <PageHeaderContainer />
              <CompositeComponent {...this.props} />
              <SnackbarContainer />
            </Layout>
            <Footer urlsMenu={this.footerLinks} />
          </div>
        </MuiThemeProvider>
      );
    }
  }

  WithLayout.displayName = `WithLayout(${getDisplayName(CompositeComponent)})`;

  return connect(null, modalActions)(WithLayout);
});

export default withLayout;
