import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			displayName: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
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
					<Button>
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
	return	{
		user: state.user
	};
}

export default connect(mapStateToProps)(ChangePassword);