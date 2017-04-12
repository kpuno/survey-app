import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../../reducers/survey';
import SearchBar from '../SearchBar';

class SearchSurvey extends Component {
	constructor(props) {
		super(props);

		this.state = {
			survey: []
		};

		this.renderList = this.renderList.bind(this);
		this.getSurvey = this.getSurvey.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps) {
			const obj = Object.keys(nextProps.surveyList).map(function (key) {
				let newObj = {
					title: nextProps.surveyList[key].title,
					email: nextProps.surveyList[key].email
				};
				return newObj;
			});
			this.setState({ survey: obj });
		}
	}

	getSurvey(title, email) {
		this.props.actions.getSurvey(title, email);
		browserHistory.push('/survey');
	}	

	renderList(title, i, email) {
		return (
			<li onClick={() => this.getSurvey(title, email)} key={i}>{title} by {email}</li>
		);
	}

	render() {
		return (
			<div>
				<h1>Search Page Works</h1>
				<SearchBar />
				{this.state.survey.length !== 0 ?  <ul>{this.state.survey.map((survey, i = 0) => { i++; return this.renderList(survey.title, i, survey.email); })}</ul> : null}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(surveyActions, dispatch)
	};
}

SearchSurvey.propTypes = {
	surveyList: PropTypes.obj,
	actions: PropTypes.func
};

function mapStateToProps(state) {
	return {
		surveyList: state.surveyList
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSurvey);