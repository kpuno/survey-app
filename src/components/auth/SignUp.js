import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../reducers/auth';
import SignUpForm from './SignUpForm';

class SignUp extends Component {
  handleFormSubmit({email, password, passwordConfirm, displayName}){
    this.props.signUpUser({email, password, passwordConfirm, displayName});
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
      <div>
        <SignUpForm handleFormSubmit = {this.handleFormSubmit.bind(this)} />
				<br/>
				{this.renderAlert()}
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