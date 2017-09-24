import { Component } from 'react';

import { PageHeader } from 'components';

class PageHeaderContainer extends Component {
  headerLinks = [
    { title: 'menu1', url: '/' },
    { title: 'menu2', url: '/' },
    { title: 'menu3', url: '/' },
    { title: 'menu4', url: '/' }
  ];


  handleModalOpen = () => {};
  handleModalClose = () => {};

  render() {
    return <PageHeader />;
  }
}

export default PageHeaderContainer;
