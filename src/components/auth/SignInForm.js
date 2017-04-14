import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import renderField from './renderField';
// import {signInFields as FIELDS} from './formFields';

const SignInForm = props => {
	const { handleSubmit, handleFormSubmit, error, submitting, invalid } = props;
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
			<div className="form-group">
				<div className="input-group">
					<span className="input-group-addon">
						<i className="glyphicon glyphicon-lock"></i>
					</span>
					<Field className="form-control" name="password" component={renderField} type="password" placeholder="Password" />
				</div>
			</div>
			{error && <strong>{error}</strong>}
			<div className="form-group">
				<button action="submit" className="btn btn-lg btn-primary btn-block" disabled={submitting || invalid}>Sign In</button>
			</div>
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