import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resultsActions from '../../reducers/results';

class SurveyStats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			respondents: '',
			questions: []
		};

		this.shortAnswerResults = this.shortAnswerResults.bind(this);
		this.multipleChoiceResults = this.multipleChoiceResults.bind(this);
		this.agreeDisagreeResults = this.agreeDisagreeResults.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.results).length !== 0 && nextProps.results.constructor !== Object) {
			let respondents = 0;
			let questions = [];

			Object.keys(nextProps.results[0].results).map((res) => {
				questions.push({
					title: nextProps.results[0].results[res].question,
					type: nextProps.results[0].results[res].type,
					results: []
				});
			});

			Object.keys(nextProps.results).map((key) => {
				respondents++;
				Object.keys(nextProps.results[key].results).map((res) => {
					questions[res].results.push(nextProps.results[key].results[res].answer);
					res++;
				});
			});

			questions.map((question) => {
				let obj = {};
				let newArray = [];
				if (question.type === 'multiplechoice') {
					for (let i = 0, j = question.results.length; i < j; i++) {
						obj[question.results[i]] = (obj[question.results[i]] || 0) + 1;
					}

					for (let o in obj) {
						if (typeof obj[o] !== 'function') {
							newArray.push({ [o]: obj[o] });
						}
					}

					question.results = newArray;
				}
			});

			this.setState({ questions: questions });
		}
	}

	componentWillUnmount() {
		let empty = {};
		this.props.actions.unmountSearchResults(empty);
	}

	shortAnswerResults(answer, i) {
		return (
			<p key={i}>{answer}</p>
		);
	}

	multipleChoiceResults(answer) {
		for (let key in answer) {
			if (typeof answer[key] !== 'function') {
				return (<p>{key + ": " + answer[key]}</p>);
			}
		}
	}

	agreeDisagreeResults(question) {
		let stronglyagree;
		let agree;
		let disagree;
		let stronglydisagree;

		stronglyagree = question.results.reduce((count, answer) => {
			if (answer === "stronglyagree") {
				count++;
			}
			return count;
		}, 0);

		agree = question.results.reduce((count, answer) => {
			if (answer === "agree") {
				count++;
			}
			return count;
		}, 0);

		disagree = question.results.reduce((count, answer) => {
			if (answer === "disagree") {
				count++;
			}
			return count;
		}, 0);

		stronglydisagree = question.results.reduce((count, answer) => {
			if (answer === "stronglydisagree") {
				count++;
			}
			return count;
		}, 0);

		return (
			<div>
				<strong>Strongly Agree: </strong> {stronglyagree}
				<br />
				<strong>Agree: </strong>	{agree}
				<br />
				<strong>Disagree: </strong>	{disagree}
				<br />
				<strong>Strongly Disagree: </strong> {stronglydisagree}
			</div>
		);
	}

	render() {
		return (
			<div>
				<h1>Survey Stats</h1>
				<strong>Number of respondents:</strong> 
				{this.state.respondents ? this.state.respondents : null}
				{this.state.questions.length !== 0 ? this.state.questions.map((question, i=0) => {
					i++;
					return (
						<div key={i+'d'}>
							<strong>{question.title}</strong>
							<br />
							{
								question.type === 'agreedisagree' ?
									this.agreeDisagreeResults(question) : null
							}
							{
								question.type === 'multiplechoice' ?
									question.results.map((answer) => {
										return this.multipleChoiceResults(answer);
									}) : null
							}
							{
								question.type === 'shortanswer' ?
									question.results.map((answer, i) => {
										i++;
										return this.shortAnswerResults(answer);
									}) : null
							}
							<br />
						</div>
					);
				}) : <h1>No Surveys Submitted Yet</h1>}
			</div>
		);
	}
}

SurveyStats.propTypes = {
	actions: PropTypes.func,
	results: PropTypes.object
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(resultsActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		results: state.resultsList
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyStats);