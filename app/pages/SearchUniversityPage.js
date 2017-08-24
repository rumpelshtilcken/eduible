import { Component } from 'react';
import { Layout } from 'components';
import SearchUniversityContainer from 'containers/SearchUniversityContainer';

class SearchUniversityPage extends Component {
  handleUniversityChoose = () => {};

  headerLinks = [
    { label: 'menu1', link: '#' },
    { label: 'menu2', link: '#' },
    { label: 'menu3', link: '#' },
    { label: 'menu4', link: '#' }
  ];
  footerLinks = [
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
  render() {
    return (
      <Layout>
        <SearchUniversityContainer onUniversityChoose={this.handleUniversityChoose} />
      </Layout>
    );
  }
}

export default SearchUniversityPage;
