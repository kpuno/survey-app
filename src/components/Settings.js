// NOT IMPLEMENTING
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../reducers/survey';
import { Link, browserHistory } from 'react-router';
import { Button, Table } from 'react-bootstrap';

class Settings extends Component {
	constructor(props) {
		super(props);


		this.removeSurvey = this.removeSurvey.bind(this);
		this.displaySurveys = this.displaySurveys.bind(this);
		this.appendInput = this.appendInput.bind(this);
	}

	appendInput() {
		// let newInput = `question-${this.state.survey.length}`;
		let input = '';
		this.setState({ survey: this.state.survey.concat(input)});
	}

	removeSurvey(title, email) {
		this.props.actions.deleteSurvey(title, email);
	}

	createSurvey() {
		browserHistory.push('/createsurvey');
	}

	onSubmit(event) {
		event.preventDefault();
	}

	displaySurveys() {
		return (
			<div className="row col-md-12 custyle">
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Title</th>
							<th>Edit</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.user.surveys.map((survey, i = 0) => {
							i++;
							this.appendInput();
							return (
								<tr key={i}>
									<td>{survey.title}</td>
									<td>
										<form onSubmit={this.onSubmit}>
											<input ref="newDate" type="text" />
											<button className="btn btn-info btn-md"><span className="glyphicon glyphicon-edit"></span> Edit</button>
										</form>
									</td>
									<td><button onClick={() => this.removeSurvey(survey.title, survey.email)} className="btn btn-danger btn-md"><span className="glyphicon glyphicon-remove"></span> Delete</button></td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<h1>Settings</h1>
					{this.props.user.surveys !== undefined ? this.displaySurveys() : null}
				</div>
			</div>
		);
	}
}

Settings.propTypes = {
	actions: PropTypes.func,
	user: PropTypes.object
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(surveyActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);