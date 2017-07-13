import Page from '../components/Page';

class Homepage extends Page {
  render() {
    return <div session={this.props.session} />;
  }
}

export default Homepage;
