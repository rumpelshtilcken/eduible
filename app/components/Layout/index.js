import { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { Header, Footer } from 'components';
import stylesheet from './index.css';

class Layout extends Component {
  headerLinks = [
    { label: 'menu1', link: '/' },
    { label: 'menu2', link: '/' },
    { label: 'menu3', link: '/' },
    { label: 'menu4', link: '/' }
  ];
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

  render() {
    const { children, title = 'Eduible' } = this.props;

    return (
      <div className="content">
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="static/Fonts/Effra" rel="stylesheet" />
        </Head>

        <Header links={this.headerLinks} />
        {children}
        <Footer urlsMenu={this.footerLinks} copyright={'COPYRIGHT (C) 2017'} />

        <style jsx global>
          {stylesheet}
        </style>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string
};

export default Layout;
