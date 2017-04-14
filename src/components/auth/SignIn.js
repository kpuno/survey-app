import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../reducers/auth';
import SignInForm from './SignInForm';
import { Link } from 'react-router';

const divStyle = {
	"margin-top": "40px"
};

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
			<div className="container" style={divStyle}>
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<div className="panel panel-default">
							<div className="panel-heading">
								<strong> Sign in to continue</strong>
							</div>
							<div className="panel-body">
								<form role="form" action="#" method="POST">
									<fieldset>
										<div className="row">
											<div className="center-block">
												<img className="profile-img"
													src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="" />
											</div>
										</div>
										<div className="row">
											<div className="col-sm-12 col-md-10  col-md-offset-1 ">
												<SignInForm handleFormSubmit={this.handleFormSubmit.bind(this)} />
												{this.renderAlert()}
											</div>
										</div>
									</fieldset>
								</form>
							</div>
							<div className="panel-footer ">
								Don't have an account! <Link to="/signup">Sign Up Here</Link>
							</div>
						</div>
					</div>
				</div>
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