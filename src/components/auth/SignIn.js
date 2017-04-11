import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../reducers/auth';
import SignInForm from './SignInForm';
import {Link} from 'react-router';

class SignIn extends Component {
	handleFormSubmit({ email, password }) {
		this.props.signInUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> Wrong email and password combination.
				</div>
			);
		}	
	}

	render() {
		return (
			<div>
				<SignInForm handleFormSubmit={this.handleFormSubmit.bind(this)} />
				<br/>
				{this.renderAlert()}
				<br/>
				<Link to="/signup">Sign Up</Link>
			</div>
		);
	}
}

SignIn.propTypes = {
	actions: PropTypes.func,
	signInUser: PropTypes.func,
	errorMessage: PropTypes.string
};

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(SignIn);