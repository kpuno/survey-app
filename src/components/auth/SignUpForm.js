import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import renderField from './renderField';
import { signUpFields as FIELDS } from './formFields';

const SignUpForm = props => {
	const { handleSubmit, handleFormSubmit, error, submitting } = props;
	return (
		<form className="form-group" onSubmit={handleSubmit(handleFormSubmit)}>
			<div className="form-group" >
				<div className="input-group">
					<span className="input-group-addon">
						<i className="glyphicon glyphicon-user"></i>
					</span>
					<Field className="form-control" name="email" component={renderField} type="email" placeholder="Email" />
				</div>
			</div >
			<div className="form-group" >
				<div className="input-group">
					<span className="input-group-addon">
						<i className="glyphicon glyphicon-user"></i>
					</span>
					<Field className="form-control" name="displayName" component={renderField} type="test" placeholder="Display Name" />
				</div>
			</div >
			<div className="form-group">
				<div className="input-group">
					<span className="input-group-addon">
						<i className="glyphicon glyphicon-lock"></i>
					</span>
					<Field className="form-control" name="password" component={renderField} type="password" placeholder="Password" />
				</div>
			</div>
			<div className="form-group">
				<div className="input-group">
					<span className="input-group-addon">
						<i className="glyphicon glyphicon-lock"></i>
					</span>
					<Field className="form-control" name="passwordConfirm" component={renderField} type="password" placeholder="Confirm Password" />
				</div>
			</div>
			{error && <strong>{error}</strong>}
			<div className="form-group">
				<button action="submit" className="btn btn-lg btn-primary btn-block" disabled={submitting}>Sign Up</button>
			</div>
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
	for (let field in FIELDS) {
		if (!values[field]) {
			errors[field] = `${FIELDS[field].placeholder} must be entered.`;
		}
	}
	if (values.password != values.passwordConfirm) {
		errors.passwordConfirm = 'Passwords do not match.';
	}
	return errors;
};

export default reduxForm({
	form: 'signup',
	validate
})(SignUpForm);