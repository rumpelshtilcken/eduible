import PropTypes from 'prop-types';

import { BookingHeader } from 'components';

import PaymentDetailsHeader from './PaymentDetailsHeader';
import PaymnetDetailsForm from './PaymentDetailsForm';

const PaymentDetails = ({ onBackButtonClick, onRequestCallClick }) => (
  <div>
    <BookingHeader
      onBackButtonClick={onBackButtonClick}
      elements={[
        {
          key: `${1}_${333}`, // TODO: add profile id to the key
          component: (
            <PaymentDetailsHeader
              profileName={'Migeul Carrera'}
              profileImageUrl={'http://res.cloudinary.com/dsyyowxl0/image/upload/v1509975927/Bitmap_onb30b.jpg'}
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
    <PaymnetDetailsForm onRequestCallClick={onRequestCallClick} />
  </div>
);

PaymentDetails.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired,
  onRequestCallClick: PropTypes.func.isRequired
};

export default PaymentDetails;
