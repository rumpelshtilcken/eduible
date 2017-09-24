import { Component } from 'react';
import Head from 'next/head';

import withPage from 'hoc/withPage';
import StudentProfileContainer from 'containers/StudentProfileContainer';

class StudentProfilePage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return (
      <div>
        <Head>
          <title>{'Profile'}</title>
        </Head>
        <StudentProfileContainer onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />
      </div>
    );
  }
}

export default withPage(StudentProfilePage);
