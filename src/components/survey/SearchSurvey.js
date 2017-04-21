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
			survey: [],
			today: new Date().toDateString()
		};

		this.renderList = this.renderList.bind(this);
		this.getSurvey = this.getSurvey.bind(this);
		// this.clearState = this.clearState.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// this.clearState();
		if (nextProps) {
			const obj = Object.keys(nextProps.surveyList).map(function (key) {
				let newObj = {
					title: nextProps.surveyList[key].title,
					email: nextProps.surveyList[key].email,
					expiryDate: new Date([nextProps.surveyList[key].expiryDate]).toDateString()
				};
				return newObj;
			});
			this.setState({ survey: obj });
		}
	}

	// clearState() {
	// 	let empty = [];
	// 	this.setState({ survey: empty });
	// }

	getSurvey(title, email) {
		this.props.actions.getSurvey(title, email);
		browserHistory.push('/survey');
	}

	expiredLink() {
		browserHistory.push('/surveyexipred');
	}

	renderList(title, i, email, expiryDate) {
		if (expiryDate > this.state.today) {
			let date = expiryDate.split(' ');
			let day = date[2];
			let month = date[1];
			let year = date[3];
			return (
				<li key={i}>
					<time datetime="2014-07-20">
						<span className="day">{day}</span>
						<span className="month">{month}</span>
						<span className="year">{year}</span>
					</time>
					<div className="info">
						<h2 className="title" onClick={() => this.getSurvey(title, email)}>{title}</h2>
						<p className="desc">Created by: {email} </p>
					</div>
				</li>
			);
		} else {
			return (
				<li key={i}>
					<time datetime="2014-07-20">
						<span className="exipred">&nbsp;</span>
						<span className="exipred">EXP</span>
						<span className="exipred">IRED</span>
					</time>
					<div className="info">
						<h2 className="title" onClick={() => this.expiredLink()}>{title}</h2>
						<p className="desc">Created by: {email}</p>
					</div>
				</li>
			);
		}
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<h1>Search Page Works</h1>
					<SearchBar />
				</div>
				<hr/>
				<div className="container">
					<div className="row">
						<div className="[ col-xs-12 col-sm-offset-2 col-sm-8 ]">
							{this.state.survey.length !== 0 ?
								<ul className="event-list">
									{this.state.survey.map((survey, i = 0) => {
										i++;
										return this.renderList(survey.title, i, survey.email, survey.expiryDate);
									}
									)}
								</ul>
								: null
							}
						</div>
					</div>
				</div>
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
	actions: PropTypes.func,
	surveyList: PropTypes.object
};

function mapStateToProps(state) {
	return {
		surveyList: state.surveyList
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSurvey);