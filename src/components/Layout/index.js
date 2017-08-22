import Head from 'next/head';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import stylesheet from './index.css';

const Layout = ({ children, title = 'Eduible', session = false } = {}) =>
  (<div className="content">
    <Head>
      <title>
        {title}
      </title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css?family=Effra" rel="stylesheet" />
    </Head>
    <Header session={session} />

    {children}
    <Footer
      urlsMenu={[
        { url: '/', title: 'Extra menu' },
        { url: '/PaymentRequest', title: 'Extra menu' }
      ]}
      copyright={'COPYRIGHT (C) 2017'}
    />

    <style jsx global>
      {stylesheet}
    </style>
  </div>);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
  session: PropTypes.object.isRequired
};

export default Layout;
