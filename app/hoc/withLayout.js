import { Component } from 'react';
import Head from 'next/head';
import { hoistStatics } from 'recompact';

import { Footer, Layout } from 'components';
import PageHeaderContainer from 'containers/PageHeaderContainer';
import getDisplayName from 'utils/getDisplayName';

const withLayout = hoistStatics((CompositeComponent) => {
  class WithLayout extends Component {
    footerLinks = [
      { title: 'ABOUT', label1: 'How It Works', url: '#', label2: 'Succsess Stories', link2: '#' },
      {
        title: 'PROFESSIONALS',
        label1: 'Join As Professional',
        url: '/',
        label2: 'Search For Professional',
        link2: '/'
      },
      {
        title: 'UNIVERSITIES',
        label1: 'Create Account',
        url: '/',
        label2: 'Search University',
        link2: '/'
      },
      { title: 'ANSWERS', label1: "FAQ's", url: '/', label2: 'Privacy Policy', link2: '/' }
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
          <PageHeaderContainer />
          <CompositeComponent {...this.props} />
          <Footer urlsMenu={this.footerLinks} copyright={'COPYRIGHT (C) 2017'} />
        </Layout>
      );
    }
  }

  WithLayout.displayName = `WithLayout(${getDisplayName(CompositeComponent)})`;

  return WithLayout;
});

export default withLayout;
