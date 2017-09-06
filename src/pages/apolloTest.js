import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import withData from '../lib/withData';

const EmailList = (props) => console.log(props) || ( // eslint-disable-line
  <div>
    {props.someData && props.someData.hello}
    {props.data.emails && props.data.emails.map(email => <div>{email.id} {email.email}</div>)}
  </div>
);

const emails = gql`
query emails {
  emails {
    id
    email
  }
}
`;

const EmailListContainer = graphql(emails)(EmailList);

const mapStateToProps = state => console.log(state) || ({ someData: state.example });

export default withData(
  connect(mapStateToProps)(props => <EmailListContainer someData={props.someData} />)
);
