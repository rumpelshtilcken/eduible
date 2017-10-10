import { Component } from 'react';
import Head from 'next/head';
import { hoistStatics } from 'recompact';

import { Footer, Layout } from 'components';
import ModalRootContainer from 'containers/ModalRootContainer';
import PageHeaderContainer from 'containers/PageHeaderContainer';
import getDisplayName from 'utils/getDisplayName';

const withLayout = hoistStatics((CompositeComponent) => {
  class WithLayout extends Component {
    footerLinks = [
      {
        title: 'ABOUT',
        firstLinkTitle: 'How it Works',
        firstLinkURL: '#',
        secondLinkTitle: 'Success Stories',
        secondLinkURL: '#',
        url: '/about'
      },
      {
        title: 'PROFESSIONALS',
        firstLinkTitle: 'Join As Professional',
        firstLinkURL: '#',
        secondLinkTitle: 'Search For Professional',
        secondLinkURL: '#',
        url: '/professionals'
      },
      {
        title: 'UNIVERSITIES',
        firstLinkTitle: 'Create Account',
        firstLinkURL: '#',
        secondLinkTitle: 'Search For University',
        secondLinkURL: '#',
        url: '/universities'
      },
      {
        title: 'ANSWERS',
        firstLinkTitle: 'FAQ´s',
        firstLinkURL: '#',
        secondLinkTitle: 'Privacy Policy',
        secondLinkURL: '#',
        url: '/answers'
      }
    ];

    handleOpenModal = () => {};
    render() {
      return (
        <Layout>
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="static/Fonts/Effra" rel="stylesheet" />
          </Head>
          <ModalRootContainer />
          <PageHeaderContainer />
          <CompositeComponent {...this.props} />
          <Footer urlsMenu={this.footerLinks} />
        </Layout>
      );
    }
  }

  WithLayout.displayName = `WithLayout(${getDisplayName(CompositeComponent)})`;

  return WithLayout;
});

export default withLayout;
