import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PageHeader } from 'components';

class PageHeaderContainer extends Component {
  headerLinks = [
    { title: 'menu1', url: '/' },
    { title: 'menu2', url: '/' },
    { title: 'menu3', url: '/' },
    { title: 'menu4', url: '/' }
  ];

  handleModalOpen = ({ modalType }) => {
    this.props.showModal({
      modalType,
      modalProps: {
        onRequestClose: this.handleModalClose
      }
    });
  };

  handleModalClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div>
        <PageHeader onOpenModal={this.handleModalOpen} />
      </div>
    );
  }
}

PageHeaderContainer.propTypes = {
  showModal: PropTypes.func,
  hideModal: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  showModal: ({ modalType, modalProps }) => dispatch({ type: 'SHOW_MODAL', modalType, modalProps }),
  hideModal: () => dispatch({ type: 'HIDE_MODAL' })
});

export default connect(null, mapDispatchToProps)(PageHeaderContainer);
