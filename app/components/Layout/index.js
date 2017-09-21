import Head from 'next/head';
import { PropTypes } from 'react';

import Header from '../Header';
import Footer from '../Footer';
import stylesheet from './index.css';

const headerLinkss = [
  { label: 'menu1', link: '#' },
  { label: 'menu2', link: '#' },
  { label: 'menu3', link: '#' },
  { label: 'menu4', link: '#' }
];
const footerLinkss = [
  { title: 'ABOUT', label1: 'How It Works', link1: '#', label2: 'Succsess Stories', link2: '#' },
  {
    title: 'PROFESSIONALS',
    label1: 'Join As Professional',
    link1: '#',
    label2: 'Search For Professional',
    link2: '#'
  },
  {
    title: 'UNIVERSITIES',
    label1: 'Create Account',
    link1: '#',
    label2: 'Search University',
    link2: '#'
  },
  { title: 'ANSWERS', label1: "FAQ's", link1: '#', label2: 'Privacy Policy', link2: '#' }
];

const Layout = (
  { children, title = 'Eduible', session = false, headerLinks, footerLinks } = {}
) => (
  <div className="content">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css?family=Effra" rel="stylesheet" />
    </Head>
    <Header headerLinks={headerLinks || headerLinkss} />

    {children}
    <Footer footerLinks={footerLinks || footerLinkss} copyright={'COPYRIGHT (C) 2017'} />

    <style jsx global>
      {stylesheet}
    </style>
  </div>
);

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
