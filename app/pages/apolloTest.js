import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import withData from '../lib/withData';

const EmailList = (props) => console.log(props) || ( // eslint-disable-line
  <div>
    {props.counter}
    <button onClick={props.increment}>+</button>
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

const mapStateToProps = state => ({ counter: state.counter });
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' })
});

export default withData(
  connect(mapStateToProps, mapDispatchToProps)(props =>
    (<EmailListContainer
      counter={props.counter}
      increment={props.increment}
    />)
  )
);
