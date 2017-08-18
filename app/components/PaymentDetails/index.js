import PropTypes from 'prop-types';

import { BookingHeader } from 'components';

import PaymentDetailsHeader from './PaymentDetailsHeader';
import PaymnetDetailsForm from './PaymentDetailsForm';

const PaymentDetails = ({ onBackButtonClick }) => (
  <div>
    <BookingHeader
      onBackButtonClick={onBackButtonClick}
      elements={[
        {
          key: `${1}_${333}`, // TODO: add profile id to the key
          component: (
            <PaymentDetailsHeader
              profileName={'Migeul Carrera'}
              profileImageUrl={'/static/miguel.jpg'}
              conversationDetails={{
                estimatedLength: '15 minutes',
                date: 'August24,2017',
                time: '18:30 PM'
              }}
            />
          )
        }
      ]}
    />
    <PaymnetDetailsForm />
  </div>
);

PaymentDetails.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default PaymentDetails;
