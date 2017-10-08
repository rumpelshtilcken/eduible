import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { PageHeader } from 'components';
import { getCurrentUserData } from 'utils/auth';
import * as actions from 'actions/modal';

class PageHeaderContainer extends Component {
  links = [
    { url: '/searchUniversity', title: 'Search university', prefetch: true },
    { url: '/searchProfessional', title: 'Search professional', prefetch: true }
  ];

  render() {
    const buttons = [
      { title: 'Join as professional', onClick: this.props.showSignUpProfessionalModal },
      { title: 'Sign up', onClick: this.props.showSignUpStudentModal },
      { title: 'Login', onClick: this.props.showSignInModal }
    ];

    if (this.props.authenticated) {
      const nickname = getCurrentUserData('nickname');
      this.links.push({ url: '/', title: 'Log Out', prefetch: false });
      this.links.push({ url: '/profile', title: `Hi, ${nickname}`, prefetch: true });
    }

    return (
      <div>
        <PageHeader
          authenticated={this.props.authenticated}
          links={this.links}
          buttons={buttons}
        />
      </div>
    );
  }
}

PageHeaderContainer.propTypes = {
  authenticated: PropTypes.bool,
  showSignInModal: PropTypes.func.isRequired,
  showSignUpProfessionalModal: PropTypes.func.isRequired,
  showSignUpStudentModal: PropTypes.func.isRequired
};

PageHeaderContainer.defaultProps = {
  authenticated: false
};

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageHeaderContainer);
