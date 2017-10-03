import PropTypes from 'prop-types';
import cx from 'classnames';

import { MuiTextField, MuiDatePicker } from 'components';

import stylesheet from './index.css';

const AuthForm = ({ inputs }) => (
  <div className="formInputsContainer">
    {inputs.map(({ type, params }) => {
      switch (type) {
        case 'Date':
          return (
            <div
              key={params.name}
              className={cx('input', {
                [params.name]: true
              })}
            >
              <MuiDatePicker
                onChange={params.onChange}
                title={params.title}
                value={params.value}
              />
            </div>
          );
        default:
          return (
            <div
              key={params.name}
              className={cx('input', {
                [params.name]: true
              })}
            >
              <MuiTextField
                errorText={params.errorText}
                name={params.name}
                onChange={params.onChange}
                title={params.title}
                type={params.type}
                value={params.value}
              />
            </div>
          );
      }
    })}
    <style jsx>{stylesheet}</style>
  </div>
);

AuthForm.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['Date']),
      params: PropTypes.oneOf([
        PropTypes.shape({
          errorText: PropTypes.string,
          name: PropTypes.string.isRequired,
          onChange: PropTypes.func.isRequired,
          title: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        }),
        PropTypes.shape({
          onChange: PropTypes.func,
          title: PropTypes.string,
          value: PropTypes.string
        })
      ]
      )
    })
  )
};

export default AuthForm;
