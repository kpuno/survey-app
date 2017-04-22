import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../reducers/user';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import toastr from 'toastr';

class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			confirmPassword: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	getValidationState(state) {
		const length = state.length;
		if (length > 0) return 'success';
		else if (length > 0) return 'warning';
		else if (length > 0) return 'error';
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit() {
		toastr.success('Updated password Success!');
		let email = this.props.user.email;
		let password = this.state.password;
		let displayName = this.props.user.displayName;
		if (this.state.password === this.state.confirmPassword && this.state.password !== null && this.state.password.length !== 0) {
			this.props.actions.changePassword(email, displayName, password);
			this.setState({ password: '', confirmPassword: '' });
		}
	}

	render() {
		return (
			<div>
				<form>
					<FormGroup
						validationState={this.getValidationState(this.state.password)}
					>
						<ControlLabel>Password</ControlLabel>
						<FormControl
							type="text"
							value={this.state.password}
							name="password"
							onChange={this.handleChange}
						/>
						<FormControl.Feedback />
					</FormGroup>
					<FormGroup
						validationState={this.getValidationState(this.state.confirmPassword)}
					>
						<ControlLabel>Confirm Password</ControlLabel>
						<FormControl
							type="text"
							value={this.state.confirmPassword}
							name="confirmPassword"
							onChange={this.handleChange}
						/>
						<FormControl.Feedback />
					</FormGroup>
					{this.state.password !== this.state.confirmPassword ? <div><strong>Passwords do not match</strong><br /></div> : null}
					<Button bsStyle="primary" onClick={this.onSubmit}>
						Submit
					</Button>
				</form>
			</div>
		);
	}

}

ChangePassword.propTypes = {
	user: PropTypes.obj
};

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);