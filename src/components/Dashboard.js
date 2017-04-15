import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../reducers/survey';
import { Link, browserHistory } from 'react-router';
import { Button, Table } from 'react-bootstrap';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.getSurvey = this.getSurvey.bind(this);
		this.displaySurveys = this.displaySurveys.bind(this);
		this.removeSurvey = this.removeSurvey.bind(this);
	}

	getSurvey(title, email) {
		this.props.actions.getSurvey(title, email);
		browserHistory.push('/survey');
	}

	createSurvey() {
		browserHistory.push('/createsurvey');
	}

	removeSurvey(title, email) {
		this.props.actions.deleteSurvey(title, email);
	}

	displaySurveys() {
		return (
			<div className="row col-md-12 custyle">
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Title</th>
							<th>Exipry Date</th>
							<th>Delete</th>
							<th>View</th>
						</tr>
					</thead>
					<tbody>
					{this.props.user.surveys.map((survey, i = 0) => {
						i++;
						return (
							<tr key={i}>
								<td>{survey.title}</td>
								<td>{survey.expiryDate}</td>
								<td><button onClick={() => this.removeSurvey(survey.title, survey.email)} className="btn btn-danger btn-md"><span className="glyphicon glyphicon-remove"></span> Delete</button></td>
								<td><button onClick={() => this.getSurvey(survey.title, survey.email)} className="btn btn-info btn-md"><span className="glyphicon glyphicon-sunglasses"></span> View</button></td>
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
					<h1>Dashboard</h1>
					<Button className="btn-md" bsStyle="primary" onClick={this.createSurvey}>Create Survey</Button>
					{this.props.user.surveys !== undefined ? this.displaySurveys() : null}
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);