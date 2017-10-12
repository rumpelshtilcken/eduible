import PropTypes from 'prop-types';
import cx from 'classnames';

import TextFieldContainer from 'containers/TextFieldContainer';
import DatePickerContainer from 'containers/DatePickerContainer';

import stylesheet from './index.css';

const AuthForm = ({ inputs }) => (
  <div className="formInputsContainer">
    {inputs.map(({ type, params }) => (
      (params.name === 'country' || params.name === 'zip')
        ? <div
          key={params.name}
          className={cx('input', {
            [params.name]: true
          })}
        >
          <TextFieldContainer
            name={params.name}
            title={params.title}
            type={params.type}
            validation={params.validation}
            placeholder={params.placeholder}
          />
        </div>
        :
        <div
          key={params.name}
          className={cx('input', {
            [params.name]: true
          })}
        >
          {type === 'Date'
            ? <DatePickerContainer
              name={params.name}
              title={params.title}
              placeholder={params.placeholder}
            />
            : <TextFieldContainer
              name={params.name}
              title={params.title}
              type={params.type}
              validation={params.validation}
              placeholder={params.placeholder}
            />}
        </div>
    ))
    }
    <style jsx>{stylesheet}</style>
  </div>
);

AuthForm.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['Date']),
      params: PropTypes.oneOf([
        PropTypes.shape({
          validation: PropTypes.func,
          name: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          placeholder: PropTypes.string
        }),
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          title: PropTypes.string,
          placeholder: PropTypes.string
        })
      ])
    })
  )
};

export default AuthForm;
