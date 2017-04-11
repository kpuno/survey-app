import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../reducers/survey';
import { Link, browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

class Dashboard extends Component {
	constructor(props){
		super(props);

		this.getSurvey = this.getSurvey.bind(this);
		this.displaySurveys = this.displaySurveys.bind(this);
	}

	getSurvey(title) {
		this.props.actions.getSurvey(title);
		browserHistory.push('/survey');
	}	

	displaySurveys() {
		return( 
			<ul>
				{this.props.user.surveys.map((survey, i = 0) => {
					i++;
					return (
						<li key={i} onClick={() => this.getSurvey(survey.title)}>{survey.title}</li>
					)
				})}
			</ul>
		)
	}

	render() {
		return(
			<div>
				<h1>Dashboard</h1>
					<Button><Link to="/createsurvey">Create Survey</Link></Button>
					{this.props.user.surveys !== undefined ? this.displaySurveys() : null}
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(surveyActions, dispatch)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);