import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../reducers/user';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

class EditProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			displayName: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	getValidationState(state) {
		const length = state.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit() {
		let currentEmail = this.props.user.email;
		let email = this.state.email;
		let displayName = this.state.displayName;
		if(email == null || email.length === 0) { email = this.props.user.email;}
		if(displayName == null || displayName.length === 0) { displayName = this.props.user.displayName;}
		this.props.actions.updateUser(currentEmail, email, displayName);
		this.setState({email: '', displayName: ''});
	}

	render() {
		return (
			<div>
				<form>
					<FormGroup
						validationState={this.getValidationState(this.state.email)}
					>
						<ControlLabel>Email</ControlLabel>
						<FormControl
							type="email"
							value={this.state.email}
							placeholder={this.props.user.email}
							name="email"
							onChange={this.handleChange}
						/>
						<FormControl.Feedback />
						<HelpBlock>Validation is based on string length.</HelpBlock>
					</FormGroup>
					<FormGroup
						validationState={this.getValidationState(this.state.displayName)}
					>
						<ControlLabel>Display Name</ControlLabel>
						<FormControl
							type="text"
							value={this.state.displayName}
							placeholder={this.props.user.displayName}
							name="displayName"
							onChange={this.handleChange}
						/>
						<FormControl.Feedback />
						<HelpBlock>Validation is based on string length.</HelpBlock>
					</FormGroup>
					<Button onClick={this.onSubmit}>
						Submit
					</Button>
				</form>
			</div>
		);
	}

}

EditProfile.propTypes = {
	user: PropTypes.object,
	actions: PropTypes.func
};

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);