import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resultsActions from '../../reducers/results';
import { browserHistory } from 'react-router';
import { Table } from 'react-bootstrap';

class Analytics extends Component {
	constructor(props) {
		super(props);

		this.getSurvey = this.getSurvey.bind(this);
		this.displaySurveys = this.displaySurveys.bind(this);
	}

	getSurvey(title, email) {
		this.props.actions.searchResults(title, email);
		browserHistory.push('/analytics/' + title);
	}

	displaySurveys() {
		return (
			<div className="row col-md-12 custyle">
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Title</th>
							<th>View Statistics</th>
						</tr>
					</thead>
					<tbody>
						{this.props.user.surveys.map((survey, i = 0) => {
							i++;
							return (
								<tr key={i}>
									<td>{survey.title}</td>
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
					<h1>Analytics</h1>
					{this.props.user.surveys !== undefined ? this.displaySurveys() : null}
				</div>
			</div>
		);
	}
}

Analytics.propTypes = {
	actions: PropTypes.func,
	user: PropTypes.object
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(resultsActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);