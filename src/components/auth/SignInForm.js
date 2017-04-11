import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import renderField from './renderField';
// import {signInFields as FIELDS} from './formFields';

const SignInForm = props => {
  const {handleSubmit, handleFormSubmit, error, submitting, invalid} = props;
  return (
    <form className="container" onSubmit = {handleSubmit(handleFormSubmit)}>
      <Field name="email" component={renderField} type="email" placeholder="Email" />
      <Field name="password" component={renderField} type="password" placeholder="Password" />
      {error && <strong>{error}</strong>}
			<br/>
      <button action="submit" className="btn btn-primary" disabled={submitting || invalid}>Sign In</button>
    </form>
  );
};

SignInForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleFormSubmit: PropTypes.func,
    error: PropTypes.string,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool
};

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};


export default reduxForm({
  form: 'signin',
  validate
})(SignInForm);