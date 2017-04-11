import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resultsActions from '../../reducers/results';
import { browserHistory } from 'react-router';

class Analytics extends Component {
	constructor(props){
		super(props);

		this.getSurvey = this.getSurvey.bind(this);
		this.displaySurveys = this.displaySurveys.bind(this);
	}

	getSurvey(title, email) {
		this.props.actions.searchResults(title, email);
		browserHistory.push('/analytics/' + title);
	}	

	displaySurveys() {
		return( 
			<ul>
				{this.props.user.surveys.map((survey, i = 0) => {
					i++;
					return (
						<li key={i} onClick={() => this.getSurvey(survey.title, survey.email)}>{survey.title}</li>
					);
				})}
			</ul>
		);
	}

	render() {
		return(
			<div>
				<h1>Analytics</h1>
					{this.props.user.surveys !== undefined ? this.displaySurveys() : null}
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