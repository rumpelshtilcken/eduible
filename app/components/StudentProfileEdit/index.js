import PropTypes from 'prop-types';

import { MuiButton } from 'components';
import TextFieldContainer from 'containers/TextFieldContainer';
import DatePickerContainer from 'containers/DatePickerContainer';

import stylesheet from './index.css';

const handleBackgroundImageChange = () => {};

const StudentProfileEdit = ({
  name,
  birthday,
  onSaveButtonClick,
  onCancelButtonClick,
  onRemoveAccountButtonClick
}) => (
  <div className="studentProfileContainer">
    <div className="profile">
      <p className="studentProfileTitle">{'Profile Edit'}</p>
      <div className="pickProfileImageContainer">
        <img src="/static/user_profile_photo.jpeg" alt="profileImg" className="studentProfileImage" />
        <button className="overlayButton" onClick={handleBackgroundImageChange}>
          {'Change'}
        </button>
      </div>
      <div className="muiTextFieldBox">
        <TextFieldContainer
          title={'Fullname'}
          type={'string'}
          name={'name'}
          placeholder={name}
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
      <div className="muibtnBox">
        <div className="btn">
          <MuiButton
            label="Cancel"
            backgroundColor="#E8E8E8"
            labelStyle={{ color: 'black', fontSize: 11 }}
            // onClick={onCancelButtonClick}
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
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onRemoveAccountButtonClick: PropTypes.func.isRequired
};

export default StudentProfileEdit;
