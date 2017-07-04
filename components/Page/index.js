import { Component } from 'react';
import Session from '../Session';

class Page extends Component {
  // Expose session to all pages
  static async getInitialProps({ req }) {
    const session = new Session({ req });
    return { session: await session.getSession() };
  }
}

export default Page;
