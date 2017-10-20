import { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import { CallRequest, StatefulView } from 'components';

import { getProfessional } from './Queries';

class CallRequestContainer extends Component {
  handleRequestCallClick = () => {
    // TODO: take params and send to server
  };

  render() {
    if (this.props.error) return <div>{`Error: ${this.props.error}`}</div>;

    return (
      <StatefulView loading={this.props.loading}>
        <CallRequest
          professional={this.props.professional}
          onBackButtonClick={this.props.onBackButtonClick}
          onRequestCallClick={this.handleRequestCallClick}
        />
      </StatefulView>
    );
  }
}

CallRequestContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired,
  professional: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
};

export default compose(
  graphql(getProfessional, {
    name: 'professional',
    skip: ({ professionalId }) => !professionalId,
    options: ({ professionalId }) => ({ variables: { id: professionalId } }),
    props: ({ professional: { Professional, loading, error } }) => ({
      professional: Professional, loading, error
    })
  })
)(CallRequestContainer);
