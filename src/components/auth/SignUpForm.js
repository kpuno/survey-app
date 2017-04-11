import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import renderField from './renderField';
import {signUpFields as FIELDS} from './formFields';

const SignUpForm = props => {
  const {handleSubmit, handleFormSubmit, error, submitting} = props;
  return (
    <form className="container" onSubmit = {handleSubmit(handleFormSubmit)}>
      <Field name="email" component={renderField} type="email" placeholder="Email" />
			<Field name="displayName" component={renderField} type="test" placeholder="Display Name" />
      <Field name="password" component={renderField} type="password" placeholder="Password" />
      <Field name="passwordConfirm" component={renderField} type="password" placeholder="Confirm Password" />
      {error && <strong>{error}</strong>}
			<br />
      <button action="submit" className="btn btn-primary" disabled={submitting}>Sign Up</button>
    </form>
  );
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  error: PropTypes.string,
  submitting: PropTypes.bool,
};

const validate = values => {
  const errors = {};
  for(let field in FIELDS){
    if(!values[field]){
      errors[field] = `${FIELDS[field].placeholder} must be entered.`;
    }
  }
  if(values.password != values.passwordConfirm){
    errors.passwordConfirm = 'Passwords do not match.';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate
})(SignUpForm);