import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../reducers/auth';
import SignUpForm from './SignUpForm';

const divStyle = {
	"margin-top": "40px"
};

class SignUp extends Component {
	handleFormSubmit({ email, password, passwordConfirm, displayName }) {
		this.props.signUpUser({ email, password, passwordConfirm, displayName });
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> Email already in use!
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
								<strong> Welcome please sign up!</strong>
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
												<SignUpForm handleFormSubmit={this.handleFormSubmit.bind(this)} />
												{this.renderAlert()}
											</div>
										</div>
									</fieldset>
								</form>
							</div>
							<div className="panel-footer ">
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SignUp.propTypes = {
	signUpUser: PropTypes.func,
	errorMessage: PropTypes.string
};

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(SignUp);