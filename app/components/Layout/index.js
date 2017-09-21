import Head from 'next/head';
import { PropTypes } from 'react';

import Header from '../Header';
import Footer from '../Footer';
import stylesheet from './index.css';

const Layout = ({ children, title = 'Eduible', session = false, headerLinks, footerLinks } = {}) =>
  (<div className="content">
    <Head>
      <title>
        {title}
      </title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css?family=Effra" rel="stylesheet" />
    </Head>
    <Header headerLinks={headerLinks} />

    {children}
    <Footer
      footerLinks={footerLinks}
      copyright={'COPYRIGHT (C) 2017'}
    />

    <style jsx global>
      {stylesheet}
    </style>
  </div>);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
  session: PropTypes.object.isRequired,
  footerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link1: PropTypes.string.isRequired,
      label1: PropTypes.string.isRequired,
      link2: PropTypes.string.isRequired,
      label2: PropTypes.string.isRequired
    })
  ).isRequired,
  headerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string
    })
  )
};

export default Layout;