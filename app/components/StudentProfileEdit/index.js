import PropTypes from 'prop-types';

import { MuiButton } from 'components';
import TextFieldContainer from 'containers/TextFieldContainer';
import DatePickerContainer from 'containers/DatePickerContainer';

import stylesheet from './index.css';

const StudentProfileEdit = ({
  onSaveButtonClick,
  onCancelButtonClick,
  onRemoveAccountButtonClick
}) => (
  <div className="container">
    <div className="profile-div">
      <p id="title">{'Profile Edit'}</p>
      <img src="/static/user_profile_photo.jpeg" alt="profileImg" />
      <div className="MuiTextField-div">
        <TextFieldContainer
          title={'Fullname'}
          type={'string'}
          name={'name'}
          placeholder={'John Smith'}
          onContinueButtonClick={onSaveButtonClick}
        />
        <DatePickerContainer
          title={'Birthday'}
          name={'birthday'}
          placeholder={'13/11/1996'}
        />
      </div>
      <div
        onClick={onRemoveAccountButtonClick}
        role="button"
        tabIndex={0}
      >
         I want to remove my account
      </div>
      <div className="Muibtn-div">
        <div className="btn">
          <MuiButton
            label="Cancel"
            backgroundColor="#E8E8E8"
            labelStyle={{ color: 'black', fontSize: 11 }}
            onClick={onCancelButtonClick}
          />
        </div>
        <div className="btn">
          <MuiButton
            label="Save Changes"
            onClick={onSaveButtonClick}
          />
        </div>
      </div>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

StudentProfileEdit.propTypes = {
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onRemoveAccountButtonClick: PropTypes.func.isRequired
};

export default StudentProfileEdit;
